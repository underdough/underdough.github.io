/* =====================================================
   service-worker.js
   Service Worker para PWA "Para ti, Sol"

   Estrategia:
     - NETWORK-FIRST para HTML/CSS/JS de la app:
         siempre intenta traer la version mas reciente
         desde la red; solo usa cache como respaldo offline.
         => los cambios que hagas se reflejan al recargar.
     - STALE-WHILE-REVALIDATE para fuentes y CDNs
       externos que casi nunca cambian.
     - YouTube nunca se cachea.
     - Al instalar un SW nuevo:
         * skipWaiting() -> toma el control de inmediato
         * clients.claim() -> controla pestanas ya abiertas
         * se borran TODAS las caches viejas.
     - Sube BUILD_ID en cada deploy importante: eso cambia
       el nombre de la cache y fuerza purga automatica.
   ===================================================== */

const CACHE_VERSION = 'v3';
const BUILD_ID      = '2026-04-24-01';            // sube esto en cada deploy
const CACHE_NAME    = `para-sol-${CACHE_VERSION}-${BUILD_ID}`;

// Precachear solo el shell minimo para funcionar offline.
// Todo lo demas se guarda al vuelo cuando se pide por primera vez.
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/components/styles.css',
  '/front/frases.js',
  '/front/canciones.js',
  '/front/player.js',
  '/front/app.js'
];

/* ---------------- Install ---------------- */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[SW] No se pudo precachear', url, err);
          })
        )
      );
    })
  );
});

/* ---------------- Activate ---------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((n) => n !== CACHE_NAME)
        .map((n) => {
          console.log('[SW] Eliminando cache vieja:', n);
          return caches.delete(n);
        })
    );
    await self.clients.claim();
    const clientsList = await self.clients.matchAll({ type: 'window' });
    for (const client of clientsList) {
      client.postMessage({ type: 'SW_ACTIVATED', cache: CACHE_NAME });
    }
  })());
});

/* ---------------- Helpers ---------------- */
function esMismaOrigen(url) {
  try { return new URL(url).origin === self.location.origin; }
  catch (_) { return false; }
}

function esYouTube(url) {
  return /(?:^|\.)youtube\.com|(?:^|\.)ytimg\.com|(?:^|\.)googlevideo\.com|youtube-nocookie\.com/.test(url);
}

function esAssetExterno(url) {
  return /fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com/.test(url);
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresco = await fetch(request, { cache: 'no-store' });
    if (fresco && fresco.status === 200 && fresco.type !== 'opaque') {
      cache.put(request, fresco.clone());
    }
    return fresco;
  } catch (err) {
    const cacheado = await cache.match(request);
    if (cacheado) return cacheado;
    if (request.mode === 'navigate') {
      const index = await cache.match('/index.html');
      if (index) return index;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cacheado = await cache.match(request);
  const redPromise = fetch(request)
    .then((resp) => {
      if (resp && resp.status === 200) cache.put(request, resp.clone());
      return resp;
    })
    .catch(() => cacheado);
  return cacheado || redPromise;
}

/* ---------------- Fetch ---------------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = req.url;
  if (esYouTube(url)) return;

  if (!esMismaOrigen(url) && esAssetExterno(url)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  if (esMismaOrigen(url)) {
    event.respondWith(networkFirst(req));
    return;
  }
});

/* ---------------- Mensajes desde la pagina ---------------- */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))))
    );
  }
});