/* =====================================================
   app.js -- lógica principal para Sol
   Saludo dinámico, hora de Bogotá, frases del día
   ===================================================== */

(function () {
  'use strict';

  const FRASES = window.FRASES || { motivacional: [], romantica: [] };

  const $saludo      = document.querySelector('.saludo');
  const $fecha       = document.getElementById('fecha');
  const $etiquetaTipo = document.getElementById('etiqueta-tipo');
  const $frase       = document.getElementById('frase');
  const $autor       = document.getElementById('autor');
  const $tabMotiv    = document.getElementById('tab-motiv');
  const $tabRomant   = document.getElementById('tab-romant');
  const $btnNueva    = document.getElementById('btn-nueva');
  const $btnHoy      = document.getElementById('btn-hoy');

  let tipoActual = 'motivacional';
  let esFraseDelDia = true;
  let intervalFraseId = null;

  let indicesMezclados = { motivacional: [], romantica: [] };
  let punteros = { motivacional: 0, romantica: 0 };

  function inicializarMezcla(tipo, total) {
    let arr = Array.from({length: total}, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    indicesMezclados[tipo] = arr;
    punteros[tipo] = 0;
  }

  function iniciarRotacionFrases() {
    detenerRotacionFrases();
    // Cambiar cada 20 segundos (1/3 minutos)
    intervalFraseId = setInterval(() => {
      const frase = obtenerFraseAleatoria(tipoActual);
      mostrarFrase(frase, true);
    }, 20000);
  }

  function detenerRotacionFrases() {
    if (intervalFraseId) {
      clearInterval(intervalFraseId);
      intervalFraseId = null;
    }
  }

  /* =====================================================
     SALUDO Y HORA DE BOGOTÁ (GMT-5)
     ===================================================== */
  function actualizarSaludoYHora() {
    const ahora = new Date();
    
    // Convertir a hora de Bogotá (GMT-5)
    const opciones = { 
      timeZone: 'America/Bogota',
      hour: 'numeric',
      minute: 'numeric',
      seconds:'numeric',
      hour12: false
    };
    
    const horaStr = ahora.toLocaleString('es-CO', opciones);
    const [hora, minutos, segundos] = horaStr.split(':').map(Number);
    const horaDecimal = hora + (minutos / 60);
    
    // Determinar saludo según la hora
    // 5:30 AM - 11:59 AM = Buenos días
    // 12:00 PM - 6:29 PM = Buenas tardes
    // 6:30 PM - 5:29 AM = Buenas noches
    let saludo = 'Buenas noches';
    
    if (horaDecimal >= 5.5 && horaDecimal < 12) {
      saludo = 'Buenos días';
    } else if (horaDecimal >= 12 && horaDecimal < 18.5) {
      saludo = 'Buenas tardes';
    }
    
    if ($saludo) {
      $saludo.innerHTML = `${saludo}, Sol <span class="corazon" aria-hidden="true">&#9829;</span>`;
    }
    
    // Actualizar fecha y hora completa
    if ($fecha) {
      const opcionesFecha = {
        timeZone: 'America/Bogota',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      const fechaCompleta = ahora.toLocaleString('es-CO', opcionesFecha);
      $fecha.textContent = fechaCompleta;
    }
  }

  /* =====================================================
     FRASES
     ===================================================== */
  function obtenerFraseDelDia(tipo) {
    const lista = FRASES[tipo] || [];
    if (lista.length === 0) return { texto: 'Cargando...', autor: '' };
    
    // Usar el día del año para obtener siempre la misma frase cada día
    const ahora = new Date();
    const inicio = new Date(ahora.getFullYear(), 0, 0);
    const diff = ahora - inicio;
    const diaDelAno = Math.floor(diff / 86400000);
    
    // Offset diferente para cada tipo para que no coincidan
    const offset = tipo === 'romantica' ? 7 : 0;
    const indice = (diaDelAno + offset) % lista.length;
    
    return lista[indice];
  }

  function obtenerFraseAleatoria(tipo) {
    const lista = FRASES[tipo] || [];
    if (lista.length === 0) return { texto: 'Cargando...', autor: '' };
    
    if (!indicesMezclados[tipo] || indicesMezclados[tipo].length !== lista.length) {
      inicializarMezcla(tipo, lista.length);
    }

    if (punteros[tipo] >= indicesMezclados[tipo].length) {
      inicializarMezcla(tipo, lista.length);
    }

    const indice = indicesMezclados[tipo][punteros[tipo]++];
    return lista[indice];
  }

  function mostrarFrase(fraseObj, animacion = true) {
    if (!$frase || !$autor) return;
    
    if (animacion) {
      $frase.classList.add('fade-out');
      $autor.classList.remove('visible');
      
      setTimeout(() => {
        $frase.textContent = fraseObj.texto;
        $autor.textContent = fraseObj.autor ? `— ${fraseObj.autor}` : '';
        
        $frase.classList.remove('fade-out');
        if (fraseObj.autor) {
          setTimeout(() => $autor.classList.add('visible'), 300);
        }
      }, 400);
    } else {
      $frase.textContent = fraseObj.texto;
      $autor.textContent = fraseObj.autor ? `— ${fraseObj.autor}` : '';
      if (fraseObj.autor) {
        $autor.classList.add('visible');
      }
    }
  }

  function cambiarTipo(nuevoTipo) {
    if (nuevoTipo === tipoActual) return;
    
    tipoActual = nuevoTipo;
    
    // Actualizar pestañas
    if ($tabMotiv && $tabRomant) {
      $tabMotiv.classList.toggle('activa', tipoActual === 'motivacional');
      $tabRomant.classList.toggle('activa', tipoActual === 'romantica');
      
      $tabMotiv.setAttribute('aria-selected', String(tipoActual === 'motivacional'));
      $tabRomant.setAttribute('aria-selected', String(tipoActual === 'romantica'));
    }
    
    // Actualizar etiqueta
    if ($etiquetaTipo) {
      $etiquetaTipo.textContent = tipoActual === 'romantica' 
        ? 'Un mensaje para ti' 
        : 'Tu motivación de hoy';
    }
    
    // Mostrar frase según el estado actual
    if (esFraseDelDia) {
      const frase = obtenerFraseDelDia(tipoActual);
      mostrarFrase(frase, true);
    } else {
      const frase = obtenerFraseAleatoria(tipoActual);
      mostrarFrase(frase, true);
      iniciarRotacionFrases(); // Reiniciar el temporizador al cambiar de tipo
    }
  }

  /* =====================================================
     EVENTOS
     ===================================================== */
  function bindEventos() {
    if ($tabMotiv) {
      $tabMotiv.addEventListener('click', () => cambiarTipo('motivacional'));
    }
    
    if ($tabRomant) {
      $tabRomant.addEventListener('click', () => cambiarTipo('romantica'));
    }
    
    if ($btnNueva) {
      $btnNueva.addEventListener('click', () => {
        esFraseDelDia = false;
        const frase = obtenerFraseAleatoria(tipoActual);
        mostrarFrase(frase, true);
        iniciarRotacionFrases();
      });
    }
    
    if ($btnHoy) {
      $btnHoy.addEventListener('click', () => {
        esFraseDelDia = true;
        detenerRotacionFrases();
        const frase = obtenerFraseDelDia(tipoActual);
        mostrarFrase(frase, true);
      });
    }
  }

  /* =====================================================
     PARTÍCULAS (tsParticles)
     ===================================================== */
  function iniciarParticulas() {
    if (typeof tsParticles === 'undefined') return;
    
    tsParticles.load('tsparticles', {
      fullScreen: false,
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: ['#f7c9d3', '#e88fa3', '#d4af7a', '#fce4ec']
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 5 },
          animation: {
            enable: true,
            speed: 1.5,
            minimumValue: 0.5,
            sync: false
          }
        },
        links: {
          enable: true,
          distance: 120,
          color: '#f7c9d3',
          opacity: 0.08,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          outModes: 'out',
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ['bubble', 'repulse'],
            parallax: {
              enable: true,
              force: 40,
              smooth: 20
            }
          }
        },
        modes: {
          bubble: {
            distance: 150,
            size: 8,
            duration: 2,
            opacity: 0.8
          },
          repulse: {
            distance: 100,
            duration: 0.4,
            speed: 0.5
          }
        }
      },
      detectRetina: true
    });
  }

  /* =====================================================
     GALERÍA — animación al hacer scroll
     ===================================================== */
  function iniciarGaleria() {
    const items = document.querySelectorAll('.galeria-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach((item) => observer.observe(item));

    // Click-to-play para vídeos de la galería
    document.querySelectorAll('.galeria-item--video').forEach((item) => {
      const video = item.querySelector('video');
      if (!video) return;

      item.addEventListener('click', () => {
        if (video.paused) {
          video.muted = false;
          video.play();
          item.classList.add('playing');
        } else {
          video.pause();
          item.classList.remove('playing');
        }
      });

      video.addEventListener('ended', () => {
        item.classList.remove('playing');
      });
    });
  }

  /* =====================================================
     INICIALIZACIÓN
     ===================================================== */
  function init() {
    // Actualizar saludo y hora inmediatamente
    actualizarSaludoYHora();
    
    // Actualizar cada segundo
    setInterval(actualizarSaludoYHora, 1000);
    
    // Mostrar frase del día inicial
    const fraseInicial = obtenerFraseDelDia(tipoActual);
    mostrarFrase(fraseInicial, false);
    
    // Bind eventos
    bindEventos();
    
    // Iniciar partículas
    setTimeout(iniciarParticulas, 100);

    // Iniciar galería con scroll reveal
    iniciarGaleria();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
