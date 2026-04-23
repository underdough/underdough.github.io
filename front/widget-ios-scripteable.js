// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heart;

/* =====================================================
   Widget iOS - Para Sol
   
   Widget para mostrar frases motivacionales/románticas
   y la hora de Bogotá en la pantalla de inicio de iOS.
   
   INSTALACIÓN:
   1. Descarga la app "Scriptable" (gratis en App Store)
   2. Abre Scriptable
   3. Toca el + para crear nuevo script
   4. Copia y pega todo este código
   5. Guarda con el nombre "Para Sol"
   6. Vuelve a la pantalla de inicio
   7. Mantén presionado → Agregar widget → Scriptable
   8. Toca el widget → Elige "Para Sol"
   ===================================================== */

// URL de tu sitio en GitHub Pages
const SITIO_URL = "https://underdough.github.io/index";

// Configuración de colores (ajusta según tu diseño)
const COLOR_FONDO = new Color("#5c1a2b");
const COLOR_TEXTO = new Color("#fce4ec");
const COLOR_ACENTO = new Color("#e88fa3");

// Frases motivacionales
const FRASES_MOTIVACIONALES = [
  { texto: "Eres más fuerte de lo que crees", autor: "" },
  { texto: "Cada día es una nueva oportunidad", autor: "" },
  { texto: "Tu luz brilla incluso en los días nublados", autor: "" },
  { texto: "Eres capaz de lograr cosas increíbles", autor: "" },
  { texto: "Confía en ti, Sol", autor: "" },
];

// Frases románticas
const FRASES_ROMANTICAS = [
  { texto: "Eres mi Sol en cada amanecer", autor: "" },
  { texto: "Tu sonrisa ilumina mi mundo", autor: "" },
  { texto: "Contigo, cada momento es especial", autor: "" },
  { texto: "Eres mi persona favorita", autor: "" },
  { texto: "Te quiero más de lo que las palabras pueden expresar", autor: "" },
];

// Función para obtener saludo según la hora de Bogotá
function obtenerSaludo() {
  const ahora = new Date();
  
  // Convertir a hora de Bogotá (GMT-5)
  const opciones = { 
    timeZone: 'America/Bogota',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  
  const horaStr = ahora.toLocaleString('es-CO', opciones);
  const [hora, minutos] = horaStr.split(':').map(Number);
  const horaDecimal = hora + (minutos / 60);
  
  // 5:30 AM - 11:59 AM = Buenos días
  // 12:00 PM - 6:29 PM = Buenas tardes
  // 6:30 PM - 5:29 AM = Buenas noches
  
  if (horaDecimal >= 5.5 && horaDecimal < 12) {
    return "Buenos días";
  } else if (horaDecimal >= 12 && horaDecimal < 18.5) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}

// Función para obtener la hora de Bogotá
function obtenerHoraBogota() {
  const ahora = new Date();
  
  const opciones = {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  return ahora.toLocaleString('es-CO', opciones);
}

// Función para obtener la fecha en español
function obtenerFecha() {
  const ahora = new Date();
  
  const opciones = {
    timeZone: 'America/Bogota',
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  
  return ahora.toLocaleString('es-CO', opciones);
}

// Función para obtener frase del día (determinista)
function obtenerFraseDelDia(tipo = "motivacional") {
  const frases = tipo === "romantica" ? FRASES_ROMANTICAS : FRASES_MOTIVACIONALES;
  
  const ahora = new Date();
  const inicio = new Date(ahora.getFullYear(), 0, 0);
  const diff = ahora - inicio;
  const diaDelAno = Math.floor(diff / 86400000);
  
  const offset = tipo === "romantica" ? 7 : 0;
  const indice = (diaDelAno + offset) % frases.length;
  
  return frases[indice];
}

// Crear el widget
async function crearWidget() {
  const widget = new ListWidget();
  
  // Fondo con gradiente
  const gradient = new LinearGradient();
  gradient.colors = [COLOR_FONDO, new Color("#3d1220")];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;
  
  widget.setPadding(16, 16, 16, 16);
  
  // Saludo
  const saludo = obtenerSaludo();
  const textoSaludo = widget.addText(`${saludo}, Sol ♥`);
  textoSaludo.font = Font.boldSystemFont(18);
  textoSaludo.textColor = COLOR_TEXTO;
  
  widget.addSpacer(4);
  
  // Fecha y hora
  const fecha = obtenerFecha();
  const hora = obtenerHoraBogota();
  const textoFecha = widget.addText(`${fecha}`);
  textoFecha.font = Font.systemFont(12);
  textoFecha.textColor = COLOR_ACENTO;
  textoFecha.textOpacity = 0.9;
  
  const textoHora = widget.addText(hora);
  textoHora.font = Font.mediumSystemFont(14);
  textoHora.textColor = COLOR_ACENTO;
  
  widget.addSpacer(12);
  
  // Determinar tipo de frase según la hora
  const ahora = new Date();
  const horaActual = ahora.getHours();
  const tipoFrase = (horaActual >= 18 || horaActual < 6) ? "romantica" : "motivacional";
  
  // Frase del día
  const frase = obtenerFraseDelDia(tipoFrase);
  const textoFrase = widget.addText(`"${frase.texto}"`);
  textoFrase.font = Font.italicSystemFont(14);
  textoFrase.textColor = COLOR_TEXTO;
  textoFrase.textOpacity = 0.95;
  textoFrase.minimumScaleFactor = 0.8;
  
  if (frase.autor) {
    widget.addSpacer(4);
    const textoAutor = widget.addText(`— ${frase.autor}`);
    textoAutor.font = Font.systemFont(11);
    textoAutor.textColor = COLOR_ACENTO;
    textoAutor.textOpacity = 0.8;
  }
  
  widget.addSpacer(8);
  
  // Etiqueta del tipo de frase
  const etiqueta = tipoFrase === "romantica" ? "♥ Para ti" : "✦ Motivación";
  const textoEtiqueta = widget.addText(etiqueta);
  textoEtiqueta.font = Font.systemFont(10);
  textoEtiqueta.textColor = COLOR_ACENTO;
  textoEtiqueta.textOpacity = 0.7;
  
  // Al tocar el widget, abre el sitio
  widget.url = SITIO_URL;
  
  return widget;
}

// Ejecutar
const widget = await crearWidget();

// Mostrar el widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  // Vista previa en la app
  widget.presentMedium();
}

Script.complete();
