/* =====================================================
   app.js — lógica de la página para Sol
   Requiere:
     - window.FRASES (definido en frases.js)
     - tsParticles  (CDN)
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Config ---------- */
  const INTERVALO_AUTO_MS = 30_000;   // 30 s
  const DURACION_FADE_MS  = 400;

  const FRASES = Array.isArray(window.FRASES) ? window.FRASES : [];

  /* ---------- Referencias al DOM ---------- */
  const $fecha  = document.getElementById('fecha');
  const $frase  = document.getElementById('frase');
  const $autor  = document.getElementById('autor');
  const $btnNew = document.getElementById('btn-nueva');
  const $btnDay = document.getElementById('btn-hoy');

  /* ---------- Helpers ---------- */

  /** Día del año (0–365). Determinista por fecha local. */
  function diaDelAno(fecha = new Date()) {
    const inicio = new Date(fecha.getFullYear(), 0, 0);
    const diff   = fecha - inicio;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Selecciona la frase del día de forma determinista. */
  function fraseDelDia() {
    if (FRASES.length === 0) return { texto: '', autor: '' };
    return FRASES[diaDelAno() % FRASES.length];
  }

  /** Selecciona una frase aleatoria, distinta a la actual si es posible. */
  function fraseAleatoria(actualTxt) {
    if (FRASES.length <= 1) return FRASES[0];
    let f;
    do {
      f = FRASES[Math.floor(Math.random() * FRASES.length)];
    } while (f.texto === actualTxt);
    return f;
  }

  /** Pinta la fecha formateada en español. */
  function renderFecha() {
    const fmt = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric'
    });
    $fecha.textContent = fmt.format(new Date());
  }

  /** Muestra una frase con transición suave. */
  function mostrarFrase(frase) {
    $frase.classList.add('fade-out');
    $autor.classList.remove('visible');

    setTimeout(() => {
      $frase.textContent = '“' + frase.texto + '”';
      $autor.textContent = frase.autor ? '— ' + frase.autor : '';
      $frase.classList.remove('fade-out');
      if (frase.autor) $autor.classList.add('visible');
    }, DURACION_FADE_MS);
  }

  function textoActual() {
    return $frase.textContent.replace(/^[“"]|[”"]$/g, '');
  }

  /* ---------- Eventos ---------- */
  function bindEvents() {
    $btnNew.addEventListener('click', () => {
      mostrarFrase(fraseAleatoria(textoActual()));
    });

    $btnDay.addEventListener('click', () => {
      mostrarFrase(fraseDelDia());
    });
  }

  /* ---------- tsParticles: pétalos/destellos ---------- */
  function iniciarParticulas() {
    if (typeof tsParticles === 'undefined') return;

    tsParticles.load('tsparticles', {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit:   60,
      particles: {
        number:  { value: 45, density: { enable: true, area: 900 } },
        color:   { value: ['#f7c9d3', '#e88fa3', '#fce4ec', '#d4af7a'] },
        shape:   { type: 'circle' },
        opacity: {
          value: { min: 0.2, max: 0.7 },
          animation: { enable: true, speed: 0.6, sync: false }
        },
        size: {
          value: { min: 1, max: 4 },
          animation: { enable: true, speed: 2, sync: false }
        },
        move: {
          enable:    true,
          direction: 'top',
          speed:     { min: 0.3, max: 1.2 },
          random:    true,
          straight:  false,
          outModes:  { default: 'out' }
        },
        links: { enable: false }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'bubble' } },
        modes:  { bubble: { distance: 120, size: 6, duration: 2, opacity: 0.9 } }
      },
      detectRetina: true
    });
  }

  /* ---------- Arranque ---------- */
  function init() {
    renderFecha();
    mostrarFrase(fraseDelDia());
    bindEvents();
    iniciarParticulas();

    // Si la pestaña queda abierta, rotamos frases de vez en cuando.
    setInterval(() => {
      mostrarFrase(fraseAleatoria(textoActual()));
    }, INTERVALO_AUTO_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();