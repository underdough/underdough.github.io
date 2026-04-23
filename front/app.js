/* =====================================================
   app.js -- logica de la pagina para Sol.
   Pestanas motivacional / romantica + frase del dia
   determinista + rotacion automatica + particulas.

   Requiere:
     - window.FRASES   (frases.js)
     - tsParticles     (CDN)
   ===================================================== */

(function () {
  'use strict';

  const INTERVALO_AUTO_MS = 45000;
  const DURACION_FADE_MS  = 400;

  const FRASES = (window.FRASES && typeof window.FRASES === 'object')
    ? window.FRASES
    : { motivacional: [], romantica: [] };

  const $fecha  = document.getElementById('fecha');
  const $frase  = document.getElementById('frase');
  const $autor  = document.getElementById('autor');
  const $etiq   = document.getElementById('etiqueta-tipo');
  const $btnNew = document.getElementById('btn-nueva');
  const $btnDay = document.getElementById('btn-hoy');
  const $tabs   = document.querySelectorAll('.pestana');
  const $saludo = document.querySelector('.saludo');

  let tipoActual = 'motivacional';

  function diaDelAno(f) {
    f = f || new Date();
    const inicio = new Date(f.getFullYear(), 0, 0);
    return Math.floor((f - inicio) / 86400000);
  }

  function listaActual() {
    return Array.isArray(FRASES[tipoActual]) ? FRASES[tipoActual] : [];
  }

  function fraseDelDia() {
    const lista = listaActual();
    if (lista.length === 0) return { texto: '', autor: '' };
    const offset = tipoActual === 'romantica' ? 7 : 0;
    return lista[(diaDelAno() + offset) % lista.length];
  }

  function fraseAleatoria(actualTxt) {
    const lista = listaActual();
    if (lista.length === 0) return { texto: '', autor: '' };
    if (lista.length === 1) return lista[0];
    let f;
    do { f = lista[Math.floor(Math.random() * lista.length)]; }
    while (f.texto === actualTxt);
    return f;
  }

  function obtenerSaludo() {
    // Obtener hora en Bogotá
    const ahora = new Date();
    const horaStr = new Intl.DateTimeFormat('es-CO', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'America/Bogota'
    }).format(ahora);
    
    const [hora, minutos] = horaStr.split(':').map(Number);
    const horaDecimal = hora + (minutos / 60);
    
    // 6:00 AM - 11:59 AM = Buenos días
    // 12:00 PM - 6:29 PM = Buenas tardes
    // 6:30 PM - 5:59 AM = Buenas noches
    
    if (horaDecimal >= 6 && horaDecimal < 12) {
      return 'Buenos días';
    } else if (horaDecimal >= 12 && horaDecimal < 18.5) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }
  
  function actualizarSaludo() {
    if (!$saludo) return;
    const saludo = obtenerSaludo();
    $saludo.innerHTML = `${saludo}, Sol <span class="corazon" aria-hidden="true">&#9829;</span>`;
  }
  
  function renderFecha() {
    // Obtener fecha y hora en horario de Bogotá (GMT-5)
    const ahora = new Date();
    
    // Formato de fecha
    const fmtFecha = new Intl.DateTimeFormat('es-CO', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Bogota'
    });
    
    // Formato de hora
    const fmtHora = new Intl.DateTimeFormat('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Bogota'
    });
    
    const fecha = fmtFecha.format(ahora);
    const hora = fmtHora.format(ahora);
    
    $fecha.textContent = `${fecha} • ${hora}`;
  }
  
  function actualizarHora() {
    renderFecha();
    actualizarSaludo();
  }

  function mostrarFrase(frase) {
    $frase.classList.add('fade-out');
    $autor.classList.remove('visible');
    setTimeout(() => {
      $frase.textContent = '"' + frase.texto + '"';
      $autor.textContent = frase.autor ? '-- ' + frase.autor : '';
      $frase.classList.remove('fade-out');
      if (frase.autor) $autor.classList.add('visible');
    }, DURACION_FADE_MS);
  }

  function textoActual() {
    return ($frase.textContent || '').replace(/^["]|["]$/g, '');
  }

  function actualizarEtiqueta() {
    $etiq.textContent = tipoActual === 'motivacional'
      ? 'Tu motivacion de hoy'
      : 'Tu mensaje de amor de hoy';
  }

  function cambiarTab(nuevoTipo) {
    if (!(nuevoTipo in FRASES)) return;
    tipoActual = nuevoTipo;
    $tabs.forEach((b) => {
      const activa = b.dataset.tipo === nuevoTipo;
      b.classList.toggle('activa', activa);
      b.setAttribute('aria-selected', String(activa));
    });
    actualizarEtiqueta();
    mostrarFrase(fraseDelDia());
  }

  function bindEvents() {
    $btnNew.addEventListener('click', () => mostrarFrase(fraseAleatoria(textoActual())));
    $btnDay.addEventListener('click', () => mostrarFrase(fraseDelDia()));
    $tabs.forEach((b) => b.addEventListener('click', () => cambiarTab(b.dataset.tipo)));
  }

  function iniciarParticulas() {
    if (typeof tsParticles === 'undefined') return;
    tsParticles.load('tsparticles', {
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      particles: {
        number:  { value: 45, density: { enable: true, area: 900 } },
        color:   { value: ['#f7c9d3', '#e88fa3', '#fce4ec', '#d4af7a'] },
        shape:   { type: 'circle' },
        opacity: { value: { min: 0.2, max: 0.7 }, animation: { enable: true, speed: 0.6, sync: false } },
        size:    { value: { min: 1, max: 4 },    animation: { enable: true, speed: 2,   sync: false } },
        move: {
          enable: true, direction: 'top',
          speed:  { min: 0.3, max: 1.2 },
          random: true, straight: false,
          outModes: { default: 'out' }
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

  function init() {
    renderFecha();
    actualizarSaludo();
    actualizarEtiqueta();
    mostrarFrase(fraseDelDia());
    bindEvents();
    iniciarParticulas();
    
    // Actualizar hora y saludo cada segundo
    setInterval(actualizarHora, 1000);
    
    // Rotar frases cada 45 segundos
    setInterval(() => mostrarFrase(fraseAleatoria(textoActual())), INTERVALO_AUTO_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();