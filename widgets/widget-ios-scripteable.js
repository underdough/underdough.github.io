// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heart;

/* =====================================================
   Widget iOS — Para Sol  (v2)
   Scriptable · App Store (gratis)

   INSTALACIÓN:
   1. Descarga "Scriptable" desde el App Store
   2. Abre Scriptable y toca el + para crear nuevo script
   3. Copia y pega todo este código
   4. Guarda con el nombre "Para Sol"
   5. Mantén presionado la pantalla de inicio → +
   6. Busca "Scriptable" → elige tamaño → Agregar widget
   7. Mantén presionado el widget → Editar widget
   8. Script: "Para Sol"  |  When Interacting: "Open URL"
   ===================================================== */

// ── Configuración ──────────────────────────────────────
const SITIO_URL   = "https://underdough.github.io/index";
const ZONA_BOGOTA = "America/Bogota";

// Paleta de colores
const C_FONDO    = new Color("#5c1a2b");
const C_FONDO2   = new Color("#3d1220");
const C_TEXTO    = new Color("#fce4ec");
const C_ACENTO   = new Color("#e88fa3");
const C_DORADO   = new Color("#d4af7a");
const C_SUAVE    = new Color("#f7c9d3");

// ── Catálogo completo de frases ────────────────────────
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
  { texto: "La vida es lo que hacemos de ella. Los viajes son los viajeros.", autor: "Fernando Pessoa" },
  { texto: "No hay camino para la paz: la paz es el camino.", autor: "Mahatma Gandhi" },
  { texto: "El loto crece en el lodo y, aun así, florece.", autor: "Proverbio budista" },
  { texto: "La mariposa no recuerda haber sido oruga.", autor: "Proverbio" },
  { texto: "La belleza comienza en el momento en que decides ser tú misma.", autor: "Coco Chanel" },
  { texto: "Vida, nada me debes; vida, estamos en paz.", autor: "Amado Nervo" },
  { texto: "Porque veo al final de mi rudo camino que yo fui el arquitecto de mi propio destino.", autor: "Amado Nervo" },
  { texto: "Yo soy como la loba: rompí con el rebaño y me fui a la montaña fatigada del llano.", autor: "Alfonsina Storni" },
  { texto: "Cultivo una rosa blanca en julio como en enero, para el amigo sincero que me da su mano franca.", autor: "José Martí" },
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
  { texto: "Si hoy el día es difícil, yo sigo aquí, sin condiciones.", autor: "" },
  { texto: "¿Qué es poesía? Poesía... eres tú.", autor: "Gustavo Adolfo Bécquer" },
  { texto: "Podrá nublarse el sol eternamente... pero jamás en mí podrá apagarse la llama de tu amor.", autor: "Gustavo Adolfo Bécquer" },
  { texto: "Por una mirada, un mundo; por una sonrisa, un cielo; por un beso... yo no sé qué te diera.", autor: "Gustavo Adolfo Bécquer" },
  { texto: "El día que me quieras tendrá más luz que junio.", autor: "Amado Nervo" },
  { texto: "Me caeré del cielo una noche con ganas de que me recoja tu mano liviana.", autor: "Alfonsina Storni" },
  { texto: "Yo te haré puente, para que puedas pasar.", autor: "Gustavo Cerati" },
  { texto: "En mis ojos me verás volver.", autor: "Soda Stereo" },
  { texto: "Gracias... totales.", autor: "Gustavo Cerati" },
  { texto: "I'd love to see me from your point of view.", autor: "Ariana Grande — pov" },
  { texto: "When I'm not with you, I'm weaker.", autor: "Ariana Grande — My Everything" },
  { texto: "Contigo siempre es Felicilandia.", autor: "Álvaro Díaz" },
  { texto: "Tu eres mi vudú, lo único que me hechiza.", autor: "Álvaro Díaz" },
  { texto: "Se me pasaron las horas pensando en ti.", autor: "Álvaro Díaz" },
  { texto: "Y ahí vivir, y ahí morir, enrrolladito a ti como un gongolí.", autor: "Álvaro Díaz — Gongolí" },
];

// ── Canciones del día ──────────────────────────────────
const CANCIONES = [
  "Gongolí — Álvaro Díaz",
  "Amor Amarillo — Gustavo Cerati",
  "POV — Ariana Grande",
  "Tattooed Heart — Ariana Grande",
  "R U Mine? — Arctic Monkeys",
  "I Wanna Be Yours — Arctic Monkeys",
  "Sueños — Rocko",
  "Beautiful — Gustavo Cerati",
];

// ── Helpers de tiempo ─────────────────────────────────
function horaDecimalBogota() {
  const s = new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, hour: "numeric", minute: "numeric", hour12: false,
  });
  const [h, m] = s.split(":").map(Number);
  return h + m / 60;
}

function obtenerSaludo() {
  const h = horaDecimalBogota();
  if (h >= 5.5 && h < 12)    return "Buenos días";
  if (h >= 12   && h < 18.5) return "Buenas tardes";
  return "Buenas noches";
}

function obtenerHora() {
  return new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function obtenerFechaCorta() {
  return new Date().toLocaleString("es-CO", {
    timeZone: ZONA_BOGOTA, weekday: "long", day: "numeric", month: "long",
  });
}

// ── Frase y canción del día ────────────────────────────
function fraseDelDia() {
  const h        = horaDecimalBogota();
  const esTarde  = h >= 18 || h < 6;
  const lista    = esTarde ? ROMANTICAS : MOTIVACIONALES;

  const hoy    = new Date();
  const inicio = new Date(hoy.getFullYear(), 0, 0);
  const dia    = Math.floor((hoy - inicio) / 86_400_000);
  const offset = esTarde ? 11 : 0;   // offset distinto → frases diferentes cada bloque

  return { ...lista[(dia + offset) % lista.length], tipo: esTarde ? "romantica" : "motivacional" };
}

function cancionDelDia() {
  const hoy    = new Date();
  const inicio = new Date(hoy.getFullYear(), 0, 0);
  const dia    = Math.floor((hoy - inicio) / 86_400_000);
  return CANCIONES[dia % CANCIONES.length];
}

// ── Widget pequeño ─────────────────────────────────────
async function widgetSmall() {
  const w = new ListWidget();
  aplicarFondo(w);
  w.setPadding(14, 14, 14, 14);
  w.url = SITIO_URL;

  const tSaludo    = w.addText(`${obtenerSaludo()}, Sol ♥`);
  tSaludo.font      = Font.boldSystemFont(14);
  tSaludo.textColor = C_TEXTO;

  w.addSpacer(4);

  const tHora      = w.addText(obtenerHora());
  tHora.font        = Font.mediumSystemFont(13);
  tHora.textColor   = C_ACENTO;

  w.addSpacer(10);

  const { texto, tipo } = fraseDelDia();
  const icono           = tipo === "romantica" ? "♥" : "✦";

  const tIc = w.addText(icono);
  tIc.font   = Font.systemFont(10);
  tIc.textColor = C_DORADO;

  w.addSpacer(3);

  const tF = w.addText(`"${texto}"`);
  tF.font   = Font.italicSystemFont(11);
  tF.textColor = C_TEXTO;
  tF.minimumScaleFactor = 0.7;
  tF.lineLimit = 5;

  return w;
}

// ── Widget mediano ─────────────────────────────────────
async function widgetMedium() {
  const w = new ListWidget();
  aplicarFondo(w);
  w.setPadding(16, 18, 14, 18);
  w.url = SITIO_URL;

  // Fila cabecera
  const stack = w.addStack();
  stack.layoutHorizontally();
  stack.centerAlignContent();

  const tSaludo    = stack.addText(`${obtenerSaludo()}, Sol ♥`);
  tSaludo.font      = Font.boldSystemFont(16);
  tSaludo.textColor = C_TEXTO;

  stack.addSpacer(null);

  const tHora      = stack.addText(obtenerHora());
  tHora.font        = Font.mediumSystemFont(13);
  tHora.textColor   = C_ACENTO;

  w.addSpacer(2);

  const tFecha     = w.addText(obtenerFechaCorta());
  tFecha.font       = Font.systemFont(11);
  tFecha.textColor  = C_ACENTO;
  tFecha.textOpacity = 0.8;

  w.addSpacer(10);

  // Separador decorativo
  const sep = w.addText("· · ·");
  sep.font   = Font.systemFont(9);
  sep.textColor = C_DORADO;
  sep.textOpacity = 0.6;

  w.addSpacer(8);

  // Frase
  const { texto, autor, tipo } = fraseDelDia();
  const icono = tipo === "romantica" ? "♥" : "✦";

  const tTipo = w.addText(`${icono} ${tipo === "romantica" ? "Para ti" : "Motivación"}`);
  tTipo.font   = Font.systemFont(10);
  tTipo.textColor = C_DORADO;
  tTipo.textOpacity = 0.85;

  w.addSpacer(4);

  const tF = w.addText(`"${texto}"`);
  tF.font   = Font.italicSystemFont(13);
  tF.textColor = C_TEXTO;
  tF.minimumScaleFactor = 0.78;
  tF.lineLimit = 4;

  if (autor) {
    w.addSpacer(4);
    const tA = w.addText(`— ${autor}`);
    tA.font   = Font.systemFont(10);
    tA.textColor = C_ACENTO;
    tA.textOpacity = 0.8;
    tA.lineLimit = 1;
  }

  w.addSpacer(null);

  const tPie = w.addText("Hecho con ♥ solo para ti · " + cancionDelDia());
  tPie.font   = Font.systemFont(9);
  tPie.textColor = C_SUAVE;
  tPie.textOpacity = 0.45;
  tPie.lineLimit = 1;
  tPie.minimumScaleFactor = 0.7;

  return w;
}

// ── Widget grande ──────────────────────────────────────
async function widgetLarge() {
  const w = new ListWidget();
  aplicarFondo(w);
  w.setPadding(20, 20, 20, 20);
  w.url = SITIO_URL;

  // Cabecera grande
  const tSaludo    = w.addText(`${obtenerSaludo()}, Sol ♥`);
  tSaludo.font      = Font.boldSystemFont(22);
  tSaludo.textColor = C_TEXTO;

  w.addSpacer(4);

  const tFecha     = w.addText(obtenerFechaCorta());
  tFecha.font       = Font.systemFont(13);
  tFecha.textColor  = C_ACENTO;

  const tHora      = w.addText(obtenerHora());
  tHora.font        = Font.mediumSystemFont(16);
  tHora.textColor   = C_DORADO;

  w.addSpacer(16);

  // Separador
  const sep = w.addText("✦  ·  ♥  ·  ✦");
  sep.font   = Font.systemFont(12);
  sep.textColor = C_DORADO;
  sep.textOpacity = 0.55;

  w.addSpacer(16);

  // Frase del día
  const { texto, autor, tipo } = fraseDelDia();
  const icono = tipo === "romantica" ? "♥" : "✦";

  const tTipo = w.addText(`${icono} ${tipo === "romantica" ? "Para ti hoy" : "Tu motivación de hoy"}`);
  tTipo.font   = Font.semiboldSystemFont(12);
  tTipo.textColor = C_DORADO;

  w.addSpacer(8);

  const tF = w.addText(`"${texto}"`);
  tF.font   = Font.italicSystemFont(16);
  tF.textColor = C_TEXTO;
  tF.minimumScaleFactor = 0.8;
  tF.lineLimit = 7;

  if (autor) {
    w.addSpacer(8);
    const tA = w.addText(`— ${autor}`);
    tA.font   = Font.systemFont(12);
    tA.textColor = C_ACENTO;
    tA.textOpacity = 0.85;
  }

  w.addSpacer(null);

  // Canción del día
  const sep2 = w.addText("· · ·");
  sep2.font   = Font.systemFont(10);
  sep2.textColor = C_DORADO;
  sep2.textOpacity = 0.4;

  w.addSpacer(6);

  const tCancion = w.addText("♫  " + cancionDelDia());
  tCancion.font   = Font.semiboldSystemFont(12);
  tCancion.textColor = C_ACENTO;
  tCancion.lineLimit = 1;
  tCancion.minimumScaleFactor = 0.75;

  w.addSpacer(4);

  const tPie = w.addText("Hecho con ♥ solo para ti");
  tPie.font   = Font.systemFont(10);
  tPie.textColor = C_SUAVE;
  tPie.textOpacity = 0.4;

  return w;
}

// ── Fondo con degradado ────────────────────────────────
function aplicarFondo(widget) {
  const grad = new LinearGradient();
  grad.colors    = [C_FONDO, C_FONDO2, new Color("#2a0d18")];
  grad.locations = [0, 0.6, 1];
  widget.backgroundGradient = grad;
}

// ── Ejecución ──────────────────────────────────────────
let widget;
const familia = config.widgetFamily || "medium";

if      (familia === "small")  widget = await widgetSmall();
else if (familia === "large")  widget = await widgetLarge();
else                           widget = await widgetMedium();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  if      (familia === "small") widget.presentSmall();
  else if (familia === "large") widget.presentLarge();
  else widget.presentMedium();
}

Script.complete();