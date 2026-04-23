/* =====================================================
   player.js — integración con el IFrame API de Spotify.

   Requiere:
     - window.CANCIONES (definido en canciones.js)
     - El script https://open.spotify.com/embed/iframe-api/v1
       cargado en el HTML (llama a window.onSpotifyIframeApiReady).

   Expone:
     window.ParaSolPlayer = {
       cargar({ tipo, id, titulo }),
       togglePlay(),
     }
   ===================================================== */

(function () {
  'use strict';

  const CANCIONES = Array.isArray(window.CANCIONES) ? window.CANCIONES : [];

  const $lista      = document.getElementById('lista-canciones');
  const $embedHost  = document.getElementById('spotify-embed');

  let controller = null;    // referencia al EmbedController de Spotify
  let pendiente  = null;    // canción a cargar cuando el controller esté listo

  /* ---------- Render de la lista ---------- */

  function renderLista() {
    if (!$lista) return;
    $lista.innerHTML = '';

    CANCIONES.forEach((c, i) => {
      const li  = document.createElement('li');
      const btn = document.createElement('button');
      btn.type        = 'button';
      btn.textContent = c.titulo || (c.tipo + ': ' + c.id);
      btn.dataset.idx = String(i);
      btn.addEventListener('click', () => seleccionar(i));
      li.appendChild(btn);
      $lista.appendChild(li);
    });
  }

  function marcarActiva(idx) {
    if (!$lista) return;
    $lista.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('activa', i === idx);
    });
  }

  /* ---------- Interacción ---------- */

  function construirURI(cancion) {
    // Formato estándar: spotify:<tipo>:<id>
    return 'spotify:' + cancion.tipo + ':' + cancion.id;
  }

  function seleccionar(idx) {
    const cancion = CANCIONES[idx];
    if (!cancion) return;

    marcarActiva(idx);

    if (controller) {
      controller.loadUri(construirURI(cancion));
      // No llamamos play() automáticamente: los navegadores suelen bloquear
      // el autoplay con sonido. El usuario pulsa play en el propio widget.
    } else {
      // El controller aún no está listo; guardamos la intención.
      pendiente = cancion;
    }
  }

  /* ---------- Hook del API de Spotify ---------- */

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    if (!$embedHost || CANCIONES.length === 0) return;

    const inicial = pendiente || CANCIONES[0];

    IFrameAPI.createController(
      $embedHost,
      {
        uri:    construirURI(inicial),
        width:  '100%',
        height: 152
      },
      function (EmbedController) {
        controller = EmbedController;
        marcarActiva(CANCIONES.indexOf(inicial));

        if (pendiente && pendiente !== inicial) {
          controller.loadUri(construirURI(pendiente));
        }
        pendiente = null;
      }
    );
  };

  /* ---------- API pública ---------- */

  window.ParaSolPlayer = {
    cargar(cancion) {
      if (!cancion) return;
      if (controller) {
        controller.loadUri(construirURI(cancion));
      } else {
        pendiente = cancion;
      }
    },
    togglePlay() {
      if (controller) controller.togglePlay();
    }
  };

  /* ---------- Arranque ---------- */

  function init() {
    renderLista();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();