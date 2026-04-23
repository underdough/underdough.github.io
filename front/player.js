/* =====================================================
   player.js -- reproductor de YouTube optimizado para GitHub Pages
   ===================================================== */

(function () {
  'use strict';

  const VOLUMEN_INICIAL = 60;
  const ACTUALIZA_MS    = 500;

  const CANCIONES = Array.isArray(window.CANCIONES) ? window.CANCIONES : [];

  let player        = null;
  let playerReady   = false;
  let indiceActual  = 0;
  let timerProgreso = null;

  const $lista        = document.getElementById('lista-canciones');
  const $videoWrap    = document.getElementById('yt-video-wrapper');
  const $titulo       = document.getElementById('yt-titulo');
  const $tiempo       = document.getElementById('yt-tiempo');
  const $progreso     = document.getElementById('yt-progreso');
  const $btnPrev      = document.getElementById('yt-prev');
  const $btnPlay      = document.getElementById('yt-play');
  const $btnNext      = document.getElementById('yt-next');
  const $vol          = document.getElementById('yt-vol');
  const $btnToggleVid = document.getElementById('yt-toggle-video');

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60).toString().padStart(2, '0');
    return m + ':' + r;
  }

  function cancionActual() {
    return CANCIONES[indiceActual] || null;
  }

  function renderLista() {
    if (!$lista) return;
    $lista.innerHTML = '';
    CANCIONES.forEach((c, i) => {
      const li  = document.createElement('li');
      const btn = document.createElement('button');
      btn.type        = 'button';
      btn.textContent = c.titulo || '-';
      btn.dataset.idx = String(i);
      btn.addEventListener('click', () => cargar(i, true));
      li.appendChild(btn);
      $lista.appendChild(li);
    });
    marcarActiva();
  }

  function marcarActiva() {
    if (!$lista) return;
    $lista.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('activa', i === indiceActual);
    });
  }

  function actualizarTitulo() {
    const c = cancionActual();
    if (c && $titulo) $titulo.textContent = c.titulo || '-';
  }

  function cargar(idx, reproducir) {
    if (idx < 0 || idx >= CANCIONES.length) return;
    indiceActual = idx;
    marcarActiva();
    const c = cancionActual();
    if (!c || !player || !playerReady) return;
    
    try {
      if (c.videoId) {
        if (reproducir) {
          player.loadVideoById({ videoId: c.videoId, startSeconds: 0 });
        } else {
          player.cueVideoById({ videoId: c.videoId });
        }
      } else if (c.playlistId) {
        if (reproducir) {
          player.loadPlaylist({ list: c.playlistId, listType: 'playlist', index: 0 });
        } else {
          player.cuePlaylist({ list: c.playlistId, listType: 'playlist', index: 0 });
        }
      }
      actualizarTitulo();
    } catch (err) {
      console.error('[Player] Error:', err);
    }
  }

  function bindControles() {
    if ($btnPlay) {
      $btnPlay.addEventListener('click', () => {
        if (!playerReady) return;
        const estado = player.getPlayerState();
        if (estado === 1) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      });
    }

    if ($btnNext) {
      $btnNext.addEventListener('click', () => {
        const n = (indiceActual + 1) % Math.max(CANCIONES.length, 1);
        cargar(n, true);
      });
    }

    if ($btnPrev) {
      $btnPrev.addEventListener('click', () => {
        const n = (indiceActual - 1 + CANCIONES.length) % Math.max(CANCIONES.length, 1);
        cargar(n, true);
      });
    }

    if ($vol) {
      $vol.addEventListener('input', (e) => {
        if (playerReady) player.setVolume(Number(e.target.value));
      });
    }

    if ($progreso) {
      $progreso.addEventListener('input', (e) => {
        if (!playerReady) return;
        const dur = player.getDuration();
        if (dur > 0) {
          player.seekTo((Number(e.target.value) / 100) * dur, true);
        }
      });
    }

    if ($btnToggleVid && $videoWrap) {
      $btnToggleVid.addEventListener('click', () => {
        const visible = $videoWrap.classList.toggle('visible');
        $btnToggleVid.setAttribute('aria-pressed', String(visible));
        $btnToggleVid.textContent = visible ? 'Ocultar video' : 'Mostrar video';
      });
    }
  }

  function iniciarTimer() {
    if (timerProgreso) clearInterval(timerProgreso);
    timerProgreso = setInterval(() => {
      if (!playerReady) return;
      try {
        const cur = player.getCurrentTime();
        const dur = player.getDuration();
        if ($tiempo) {
          $tiempo.textContent = fmtTime(cur) + ' / ' + fmtTime(dur);
        }
        if ($progreso && dur > 0) {
          $progreso.value = String((cur / dur) * 100);
        }
      } catch (e) {
        // Ignorar errores temporales
      }
    }, ACTUALIZA_MS);
  }

  function onReady() {
    playerReady = true;
    player.setVolume(VOLUMEN_INICIAL);
    if ($vol) $vol.value = String(VOLUMEN_INICIAL);
    iniciarTimer();
    actualizarTitulo();
  }

  function onStateChange(e) {
    if (!$btnPlay) return;
    
    if (e.data === 1) {
      $btnPlay.textContent = '\u23F8';
      $btnPlay.setAttribute('aria-label', 'Pausar');
    } else if (e.data === 2 || e.data === 3) {
      $btnPlay.textContent = '\u25B6';
      $btnPlay.setAttribute('aria-label', 'Reproducir');
    } else if (e.data === 0) {
      $btnPlay.textContent = '\u25B6';
      const n = (indiceActual + 1) % Math.max(CANCIONES.length, 1);
      setTimeout(() => cargar(n, true), 500);
    }
  }

  function onError(e) {
    console.warn('[Player] Error:', e.data);
    if ($titulo) {
      $titulo.textContent = 'Error - Intentando siguiente...';
    }
    setTimeout(() => {
      const n = (indiceActual + 1) % Math.max(CANCIONES.length, 1);
      if (n !== indiceActual) {
        cargar(n, true);
      }
    }, 2000);
  }

  window.onYouTubeIframeAPIReady = function () {
    if (CANCIONES.length === 0) {
      if ($titulo) $titulo.textContent = 'No hay canciones';
      return;
    }

    const primera = CANCIONES[0];
    player = new YT.Player('yt-player', {
      width: '100%',
      height: '100%',
      videoId: primera.videoId || undefined,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        fs: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: onReady,
        onStateChange: onStateChange,
        onError: onError
      }
    });

    if (primera.playlistId && !primera.videoId) {
      setTimeout(() => {
        if (playerReady) {
          try {
            player.cuePlaylist({
              list: primera.playlistId,
              listType: 'playlist',
              index: 0
            });
          } catch (e) {}
        }
      }, 1000);
    }
  };

  window.ParaSolPlayer = {
    play()        { if (playerReady) player.playVideo(); },
    pause()       { if (playerReady) player.pauseVideo(); },
    toggle()      { if ($btnPlay) $btnPlay.click(); },
    next()        { if ($btnNext) $btnNext.click(); },
    prev()        { if ($btnPrev) $btnPrev.click(); },
    load(i)       { cargar(i, true); },
    current()     { return { indice: indiceActual, cancion: cancionActual() }; }
  };

  function init() {
    renderLista();
    bindControles();
    actualizarTitulo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
