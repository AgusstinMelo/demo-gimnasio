// ─────────────────────────────────────────────────────────────
//  FORJA · Todo el contenido de la landing
//  Textos, planes, precios, horarios, testimonios y datos de contacto.
//  El título, la descripción y el JSON-LD de index.html también salen de acá (ver vite.config.ts).
// ─────────────────────────────────────────────────────────────

/** Foto de Unsplash. Para usar fotos propias, reemplazá la función por la URL directa. */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const site = {
  name: "FORJA",
  tagline: "Gimnasio en Palermo",
  url: "https://forja-gym.vercel.app",
  title: "FORJA · Gimnasio en Palermo | Musculación, funcional y clases",
  description:
    "Entrená en FORJA, el gimnasio de Palermo con sala de musculación, funcional, clases grupales y personal trainer. Primera clase gratis: escribinos por WhatsApp.",
  /** Formato internacional sin + ni espacios */
  whatsapp: "5491100000000",
  phone: "+54 11 0000-0000",
  email: "hola@forja-ejemplo.com.ar",
  address: { street: "Av. Ejemplo 1234", area: "Palermo", city: "Buenos Aires", postalCode: "C1414", country: "AR" },
  geo: { lat: -34.5889, lng: -58.4306 },
  mapQuery: "Palermo, Buenos Aires",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  hours: [
    { days: "Lunes a viernes", time: "6 a 23 h" },
    { days: "Sábados", time: "8 a 20 h" },
    { days: "Domingos y feriados", time: "9 a 14 h" },
  ],
  demoBanner: "Demo de propuesta — contenido de ejemplo",
};

export const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#instalaciones", label: "Instalaciones" },
  { href: "#planes", label: "Planes" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export const hero = {
  eyebrow: "Palermo · Buenos Aires",
  titleLines: ["Entrená con", "más"],
  rotatingWords: ["FUERZA", "DISCIPLINA", "RESULTADOS"],
  subtitle: "Sala de 900 m², coaches que te corrigen de verdad y una comunidad que no te deja aflojar.",
  primaryCta: "Quiero mi clase gratis",
  primaryMessage: "¡Hola FORJA! Quiero reservar mi clase gratis 💪",
  secondaryCta: "Ver planes",
  badge: "Primera clase gratis",
  image: unsplash("1605296867304-46d5465a13f1"),
  imageAlt: "Persona realizando peso muerto en una sala de entrenamiento oscura",
};

export const marquee = ["Musculación", "Funcional", "Cross training", "Boxeo", "Movilidad", "Personal trainer", "Open box 24/7"];

export const stats = [
  { value: 1200, suffix: "+", label: "socios activos" },
  { value: 900, suffix: " m²", label: "de sala de entrenamiento" },
  { value: 12, suffix: "", label: "años en el barrio" },
  { value: 17, suffix: " h", label: "abierto por día" },
];

export const services = [
  {
    title: "Musculación",
    text: "Racks, plataformas olímpicas y más de 4.000 kg en discos y mancuernas. Te armamos la rutina y la ajustamos cada mes.",
    image: unsplash("1541534741688-6078c6bfb5c5"),
    alt: "Mujer realizando press con barra en un rack",
  },
  {
    title: "Funcional",
    text: "Circuitos intensos de 45 minutos con sogas, kettlebells y trineos.",
    image: unsplash("1599058917212-d750089bc07e"),
    alt: "Entrenamiento con sogas de batalla",
  },
  {
    title: "Clases grupales",
    text: "Más de 40 clases por semana: cross, boxeo, spinning y movilidad.",
    image: unsplash("1517130038641-a774d04afb3c"),
    alt: "Clase grupal con bandas elásticas",
  },
  {
    title: "Personal trainer",
    text: "Plan 1 a 1 con seguimiento, evaluación y objetivos medibles.",
    image: unsplash("1584466977773-e625c37cdd50"),
    alt: "Entrenador asistiendo a un socio en press de banca",
  },
];

export const facilities = {
  slides: [
    { title: "Sala principal", caption: "900 m² con luz natural y techos altos.", image: unsplash("1623874514711-0f321325f318") },
    { title: "Zona de cardio", caption: "Cintas, remos y bicis de aire con vista a la calle.", image: unsplash("1593079831268-3381b0db4a77") },
    { title: "Peso libre", caption: "Mancuernas de 2 a 50 kg, siempre ordenadas.", image: unsplash("1534438327276-14e5300c3a48") },
    { title: "Racks de potencia", caption: "Seis estaciones con plataformas y barras olímpicas.", image: unsplash("1558611848-73f7eb4001a1") },
    { title: "Box funcional", caption: "Césped sintético, trineos y sogas.", image: unsplash("1571902943202-507ec2618e8f") },
  ],
  equipment: [
    { name: "Racks y barras olímpicas", detail: "6 estaciones", image: unsplash("1517836357463-d25dfeac3438") },
    { name: "Mancuernas de 2 a 50 kg", detail: "4 juegos", image: unsplash("1583454110551-21f2fa2afe61") },
    { name: "Máquinas de palanca", detail: "22 equipos", image: unsplash("1540497077202-7c8a3999166f") },
    { name: "Cardio", detail: "Cintas, remos, bicis de aire", image: unsplash("1593079831268-3381b0db4a77") },
    { name: "Zona funcional", detail: "Trineos, sogas, kettlebells", image: unsplash("1599058917212-d750089bc07e") },
    { name: "Vestuarios con lockers", detail: "Duchas con agua caliente", image: unsplash("1544033527-b192daee1f5b") },
  ],
};

export type Billing = "monthly" | "yearly";
export const plans = [
  {
    name: "Mensual",
    pitch: "Sin permanencia. Probá y quedate.",
    monthly: 45000,
    features: ["Pase libre a sala", "Clases grupales", "Rutina personalizada", "Acceso app FORJA"],
    featured: false,
  },
  {
    name: "Trimestral",
    pitch: "El punto justo para ver cambios reales.",
    monthly: 39000,
    features: ["Todo lo del Mensual", "Evaluación física inicial", "1 sesión de personal trainer", "10% off en bebidas y suplementos"],
    featured: true,
  },
  {
    name: "Anual",
    pitch: "El mejor precio, todo el año.",
    monthly: 33000,
    features: ["Todo lo del Trimestral", "Evaluación cada 3 meses", "Remera y botella FORJA", "Invitá a un amigo por mes"],
    featured: false,
  },
];

export const schedule: Record<string, { time: string; name: string; coach: string; level: string }[]> = {
  Lun: [
    { time: "07:00", name: "Cross", coach: "Lucas", level: "Todos" },
    { time: "09:00", name: "Movilidad", coach: "Sofi", level: "Inicial" },
    { time: "18:30", name: "Boxeo", coach: "Nico", level: "Intermedio" },
    { time: "20:00", name: "Funcional", coach: "Meli", level: "Todos" },
  ],
  Mar: [
    { time: "07:00", name: "Spinning", coach: "Caro", level: "Todos" },
    { time: "12:30", name: "Funcional express", coach: "Lucas", level: "Todos" },
    { time: "19:00", name: "Cross", coach: "Meli", level: "Avanzado" },
    { time: "20:30", name: "Movilidad", coach: "Sofi", level: "Inicial" },
  ],
  Mié: [
    { time: "07:00", name: "Cross", coach: "Lucas", level: "Todos" },
    { time: "10:00", name: "Glúteos y core", coach: "Caro", level: "Todos" },
    { time: "18:30", name: "Boxeo", coach: "Nico", level: "Inicial" },
    { time: "20:00", name: "Funcional", coach: "Meli", level: "Todos" },
  ],
  Jue: [
    { time: "07:00", name: "Spinning", coach: "Caro", level: "Todos" },
    { time: "12:30", name: "Funcional express", coach: "Lucas", level: "Todos" },
    { time: "19:00", name: "Halterofilia", coach: "Nico", level: "Intermedio" },
    { time: "20:30", name: "Movilidad", coach: "Sofi", level: "Inicial" },
  ],
  Vie: [
    { time: "07:00", name: "Cross", coach: "Meli", level: "Todos" },
    { time: "18:00", name: "Boxeo", coach: "Nico", level: "Todos" },
    { time: "19:30", name: "Funcional", coach: "Lucas", level: "Todos" },
  ],
  Sáb: [
    { time: "10:00", name: "Cross en equipos", coach: "Meli", level: "Todos" },
    { time: "11:30", name: "Movilidad", coach: "Sofi", level: "Inicial" },
  ],
};

export const testimonials = [
  {
    name: "Martina R.",
    detail: "Socia hace 2 años",
    quote: "Llegué sin saber agarrar una barra. Hoy hago peso muerto con 90 kg y no falto nunca.",
    photo: unsplash("1494790108377-be9c29b29330"),
  },
  {
    name: "Juan Pablo G.",
    detail: "Plan anual",
    quote: "Probé cinco gimnasios en Palermo. Este es el único donde el coach se acuerda de mi nombre y de mi rodilla.",
    photo: unsplash("1500648767791-00dcc994a43e"),
  },
  {
    name: "Camila S.",
    detail: "Clases de boxeo",
    quote: "Las clases de las 7 me cambiaron el día. Salgo con otra energía a trabajar.",
    photo: unsplash("1438761681033-6461ffad8d80"),
  },
  {
    name: "Tomás L.",
    detail: "Personal trainer",
    quote: "En seis meses bajé 11 kg y por fin entiendo qué hago en cada ejercicio.",
    photo: unsplash("1506794778202-cad84cf45f1d"),
  },
  {
    name: "Lucía M.",
    detail: "Funcional",
    quote: "La comunidad es lo mejor. Te escriben si faltás dos días seguidos, en serio.",
    photo: unsplash("1544005313-94ddf0286df2"),
  },
];

/** Progresos de ejemplo (ficticios) */
export const progress = [
  { name: "Juan Pablo", months: 6, stats: [{ label: "Peso", before: "92 kg", after: "81 kg" }, { label: "Sentadilla", before: "60 kg", after: "110 kg" }] },
  { name: "Martina", months: 12, stats: [{ label: "Peso muerto", before: "30 kg", after: "90 kg" }, { label: "% grasa", before: "29%", after: "22%" }] },
];

export const faq = [
  { q: "¿La primera clase es gratis de verdad?", a: "Sí. Escribinos por WhatsApp, elegís día y horario y venís a entrenar sin pagar nada. Si te gusta, te asociás ahí mismo." },
  { q: "Nunca entrené. ¿Puedo arrancar igual?", a: "Obvio. El primer día te hacemos una evaluación y un coach te arma una rutina para tu nivel. En la sala siempre hay alguien para ayudarte." },
  { q: "¿Qué medios de pago aceptan?", a: "Efectivo, transferencia, débito y crédito. Los planes trimestral y anual se pueden pagar en cuotas." },
  { q: "¿Tengo que reservar las clases grupales?", a: "Sí, desde la app FORJA, hasta 10 minutos antes. Así nos aseguramos de que haya lugar y equipamiento para todos." },
  { q: "¿Hay lockers y duchas?", a: "Sí, vestuarios con duchas con agua caliente y lockers con candado (traé el tuyo o lo comprás en recepción)." },
  { q: "¿Puedo congelar el plan?", a: "Los planes trimestral y anual se pueden pausar hasta 30 días por viaje o lesión, con aviso previo." },
];

export const finalCta = {
  title: "Tu próximo entrenamiento empieza hoy",
  button: "Escribinos por WhatsApp",
  message: "¡Hola FORJA! Quiero empezar a entrenar. ¿Me pasan info?",
};

export const contact = {
  title: "Vení a conocernos",
  text: "Dejanos tus datos y te respondemos por WhatsApp en minutos.",
  goals: ["Bajar de peso", "Ganar fuerza", "Mejorar mi salud", "Volver a entrenar", "Otro"],
};
