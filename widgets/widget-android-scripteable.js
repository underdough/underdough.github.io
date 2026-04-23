// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heart;

/* =====================================================
   Widget Android - Para Sol
   Compatible con Scriptable (Android)

   INSTALACIÓN:
   1. Descarga "Scriptable" desde Google Play Store
   2. Abre Scriptable y toca el + para crear nuevo script
   3. Copia y pega todo este código
   4. Guarda con el nombre "Para Sol"
   5. Toca los tres puntos → "Add to Home Screen"
   6. Elige el tamaño del widget y confirma
   ===================================================== */

// ── Configuración ─────────────────────────────────────
const SITIO_URL   = "https://underdough.github.io/index";
const ZONA_BOGOTA = "America/Bogota";

const C_FONDO    = new Color("#5c1a2b");
const C_FONDO2   = new Color("#3d1220");
const C_TEXTO    = new Color("#fce4ec");
const C_ACENTO   = new Color("#e88fa3");
const C_DORADO   = new Color("#d4af7a");
const C_BLANCO   = new Color("#ffffff");

// ── Catálogo completo de frases ───────────────────────
const MOTIVACIONALES = [
  { texto: "Recuerda: eres luz incluso los días en que el cielo se olvida de brillar.", autor: "" },
  { texto: "No existe tormenta que apague lo que eres, Sol.", autor: "" },
  { texto: "Respira. Hoy también eres suficiente.", autor: "" },
  { texto: "Cada pétalo de loto nace del barro, igual que tu fuerza nace de tu ternura.", autor: "" },
  { texto: "Tus sueños no son demasiado grandes; tú eres exactamente del tamaño correcto para lograrlos.", autor: "" },
  { texto: "Hoy, sé amable contigo como eres amable con todos los demás.", autor: "" },
  { texto: "No tienes que tenerlo todo resuelto. Basta con un paso más.", autor: "" },
  { texto: "Permítete descansar. También eso es avanzar.", autor: "" },
  { texto: "Nada de lo que sientes hoy dura para siempre; pero tú sí.", autor: "" },
  { texto: "No camines con prisa: el tiempo también quiere mirarte.", autor: "" },
  { texto: "Si hoy solo puedes existir, con eso basta. Yo te admiro igual.", autor: "" },
  { texto: "El amor propio también se riega; hoy recuerda florecer para ti.", autor: "" },
  { texto: "Confía en tu intuición: ella también te ama.", autor: "" },
  { texto: "Tu ritmo es sagrado. Ni más lento, ni más rápido: el tuyo.", autor: "" },
  { texto: "Que hoy las cosas buenas te encuentren primero.", autor: "" },
  { texto: "Tu corazón es un jardín; hoy elige qué flor regar.", autor: "" },
  { texto: "Que tus miedos sean pequeños al lado de tus ganas.", autor: "" },
  { texto: "Sol, cuando dudes de ti, mira cualquier flor: ninguna compite con la de al lado, y todas son bellas.", autor: "" },
  { texto: "Quien tiene un porqué para vivir, puede soportar casi cualquier cómo.", autor: "Friedrich Nietzsche" },
  { texto: "En medio del invierno, descubrí que había dentro de mí un verano invencible.", autor: "Albert Camus" },
  { texto: "La belleza comienza en el momento en que decides ser tú misma.", autor: "Coco Chanel" },
  { texto: "El loto crece en el lodo y, aun así, florece.", autor: "Proverbio budista" },
  { texto: "La mariposa no recuerda haber sido oruga.", autor: "Proverbio" },
  { texto: "Vida, nada me debes; vida, estamos en paz.", autor: "Amado Nervo" },
];

const ROMANTICAS = [
  { texto: "Eres mi lugar favorito del mundo, y hoy también te elijo a ti.", autor: "" },
  { texto: "El universo conspiró bonito el día que te trajo a mi vida.", autor: "" },
  { texto: "Me enamoro de ti en todos los tiempos verbales.", autor: "" },
  { texto: "Me enseñaste que el hogar puede tener nombre y mirada.", autor: "" },
  { texto: "Tu sonrisa es mi motivo favorito para creer en los milagros pequeños.", autor: "" },
  { texto: "Eres la razón por la que 'para siempre' dejó de asustarme.", autor: "" },
  { texto: "Aunque estemos lejos, siempre estoy cerca de ti.", autor: "" },
  { texto: "Eres primavera en forma de persona.", autor: "" },
  { texto: "Mereces todo lo bonito que esta vida aún te tiene guardado.", autor: "" },
  { texto: "Tus manos hacen hogar de cualquier lugar.", autor: "" },
  { texto: "Gracias por ser tú. Gracias por existir hoy.", autor: "" },
  { texto: "Eres mi motivo y mi calma.", autor: "" },
  { texto: "Hoy también quiero ser parte de tu día, aunque sea desde aquí.", autor: "" },
  { texto: "Quien camina contigo se vuelve afortunado; yo lo sé muy bien.", autor: "" },
  { texto: "Que es poesía? Poesía... eres tú.", autor: "Gustavo Adolfo Bécquer" },
  { texto: "Podré nublarse el sol eternamente... pero jamás en mí podrá apagarse la llama de tu amor.", autor: "Gustavo Adolfo Bécquer" },
  { texto: "Gracias... totales.", autor: "Gustavo Cerati" },
  { texto: "Yo te haré puente, para que puedas pasar.", autor: "Gustavo Cerati" },
  { texto: "I'd love to see me from your point of view.", autor: "Ariana Grande — pov" },
  { texto: "Contigo siempre es Felicilandia.", autor: "Álvaro Díaz" },
  { texto: "Tu eres mi vudú, lo único que me hechiza.", autor: "Álvaro Díaz" },
  { texto: "Se me pasaron las horas pensando en ti.", autor: "Álvaro Díaz" },
];

// ── Helpers de tiempo (Bogotá) ─────────────────────────
function horaDecimalBogota() {
  const s = new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, hour: "numeric", minute: "numeric", hour12: false,
  });
  const [h, m] = s.split(":").map(Number);
  return h + m / 60;
}

function obtenerSaludo() {
  const h = horaDecimalBogota();
  if (h >= 5.5 && h < 12)   return "Buenos días";
  if (h >= 12   && h < 18.5) return "Buenas tardes";
  return "Buenas noches";
}

function obtenerHora() {
  return new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function obtenerFecha() {
  return new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, weekday: "long", day: "numeric", month: "long",
  });
}

// ── Frase del día (determinista por fecha) ─────────────
function fraseDelDia() {
  const h = horaDecimalBogota();
  const esTarde = h >= 18 || h < 6;
  const lista   = esTarde ? ROMANTICAS : MOTIVACIONALES;

  const hoy   = new Date();
  const inicio = new Date(hoy.getFullYear(), 0, 0);
  const dia   = Math.floor((hoy - inicio) / 86_400_000);
  const offset = esTarde ? 7 : 0;

  return { ...lista[(dia + offset) % lista.length], tipo: esTarde ? "romantica" : "motivacional" };
}

// ── Construcción del widget ────────────────────────────
async function construirWidget(familia) {
  const widget = new ListWidget();

  const grad = new LinearGradient();
  grad.colors    = [C_FONDO, C_FONDO2];
  grad.locations = [0, 1];
  widget.backgroundGradient = grad;
  widget.url = SITIO_URL;

  // Padding según tamaño
  const esSmall  = familia === "small";
  const esMedium = familia === "medium";
  const pad      = esSmall ? 12 : 16;
  widget.setPadding(pad, pad, pad, pad);

  // ── Cabecera ──
  const saludo     = obtenerSaludo();
  const tSaludo    = widget.addText(`${saludo}, Sol ♥`);
  tSaludo.font      = Font.boldSystemFont(esSmall ? 14 : 17);
  tSaludo.textColor = C_TEXTO;
  tSaludo.lineLimit = 1;

  widget.addSpacer(3);

  const tHora     = widget.addText(obtenerHora());
  tHora.font       = Font.mediumSystemFont(esSmall ? 12 : 14);
  tHora.textColor  = C_ACENTO;

  if (!esSmall) {
    const tFecha    = widget.addText(obtenerFecha());
    tFecha.font      = Font.systemFont(11);
    tFecha.textColor = C_ACENTO;
    tFecha.textOpacity = 0.85;
  }

  widget.addSpacer(esSmall ? 8 : 12);

  // ── Frase ──
  const { texto, autor, tipo } = fraseDelDia();

  // Ícono según tipo
  const icono     = tipo === "romantica" ? "♥" : "✦";
  const tIcono    = widget.addText(icono);
  tIcono.font      = Font.systemFont(esSmall ? 10 : 12);
  tIcono.textColor = C_DORADO;

  widget.addSpacer(4);

  const tFrase     = widget.addText(`"${texto}"`);
  tFrase.font       = Font.italicSystemFont(esSmall ? 11 : 13);
  tFrase.textColor  = C_TEXTO;
  tFrase.minimumScaleFactor = 0.75;
  tFrase.lineLimit  = esSmall ? 4 : (esMedium ? 5 : 8);

  if (autor && !esSmall) {
    widget.addSpacer(5);
    const tAutor     = widget.addText(`— ${autor}`);
    tAutor.font       = Font.systemFont(10);
    tAutor.textColor  = C_ACENTO;
    tAutor.textOpacity = 0.8;
    tAutor.lineLimit  = 1;
  }

  widget.addSpacer(null); // empuja el pie hacia abajo

  // ── Pie ──
  if (!esSmall) {
    const tPie      = widget.addText("Hecho con ♥ solo para ti");
    tPie.font        = Font.systemFont(9);
    tPie.textColor   = C_ACENTO;
    tPie.textOpacity = 0.55;
    tPie.lineLimit   = 1;
  }

  return widget;
}

// ── Ejecución ──────────────────────────────────────────
const familia = config.widgetFamily || "medium";
const widget  = await construirWidget(familia);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  // Vista previa en la app según familia elegida
  if (familia === "small")  widget.presentSmall();
  else if (familia === "large") widget.presentLarge();
  else widget.presentMedium();
}

Script.complete();