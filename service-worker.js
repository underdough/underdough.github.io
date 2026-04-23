/* =====================================================
   service-worker.js
   Service Worker para PWA - Permite instalar como app
   ===================================================== */

const CACHE_NAME = 'para-sol-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/front/app.js',
  '/front/player.js',
  '/front/canciones.js',
  '/front/frases.js',
  '/components/styles.css',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Dancing+Script:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  // No cachear YouTube API ni videos
  if (event.request.url.includes('youtube.com') || 
      event.request.url.includes('googlevideo.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver del caché si existe, sino hacer fetch
        return response || fetch(event.request);
      })
  );
});
