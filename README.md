# FORJA · Landing de gimnasio (demo)

Landing page para un gimnasio de Palermo, pensada para captar socios y generar consultas por WhatsApp. Diseño oscuro con acento lima, tipografía display gigante y animaciones ligadas al scroll, sin resignar velocidad: **Lighthouse mobile 93 / 100 / 100 / 100** (rendimiento, accesibilidad, buenas prácticas, SEO) y CLS 0,002.

Vite + React + TypeScript + Tailwind CSS, Motion (framer-motion) para animaciones y Lenis para el scroll suave. Sin backend.

## Detalles de la propuesta

Hola, mi nombre es Agustín, soy desarrollador web especializado en sitios y aplicaciones a medida. Para que veas desde el primer momento cómo podría quedar la web del gimnasio, preparé una demo funcional: [enlace a la demo].

En la demo podés recorrer todo lo que necesita una landing que convierte:

- **Primer impacto:** pantalla completa con un título enorme que entra animado, una palabra que rota (FUERZA / DISCIPLINA / RESULTADOS) y el botón «Quiero mi clase gratis», que abre WhatsApp con el mensaje ya escrito.
- **Servicios e instalaciones:** tarjetas con fotos para musculación, funcional, clases grupales y personal trainer, cifras que suben al aparecer, una galería que se desliza en horizontal al hacer scroll y la lista de equipamiento con fotos que aparecen al pasar el mouse.
- **Planes y horarios:** tres planes con precio por mes o por año, el más elegido destacado, y la grilla de clases por día. Cada plan abre WhatsApp con el nombre del plan en el mensaje.
- **Confianza y contacto:** testimonios que se arrastran, progresos de socios, preguntas frecuentes, mapa y un formulario que arma la consulta y la manda por WhatsApp.
- **Conversión siempre a mano:** botón flotante de WhatsApp y, en el celular, una barra «Escribinos» fija abajo.

Está hecha con tecnologías actuales (React y TypeScript), carga rápido en el celular (93 de rendimiento en Lighthouse mobile), está optimizada para Google y lista para medir conversiones con Meta Pixel y Google Analytics. Todo el contenido se cambia desde un solo archivo y la adapto a la marca, las fotos, los precios y los horarios del gimnasio.

En mi perfil vas a encontrar otros trabajos destacados. Puedo entregarte el proyecto en 14 días, con hasta 2 rondas de revisiones, y te entrego el código completo y los accesos a todo. ¡Estamos en contacto!

## Cómo correrlo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # chequeo de tipos + build de producción en dist/
npm run preview   # sirve dist/ para probar el build
```

## Desplegar en Vercel

1. Subí el proyecto a un repositorio de GitHub.
2. En [vercel.com/new](https://vercel.com/new) importá el repositorio y pulsá **Deploy**. Vercel detecta Vite solo (build `npm run build`, salida `dist`).
3. Cambiá `site.url` en `src/content.ts` y la URL de `public/robots.txt` y `public/sitemap.xml` por el dominio final (se usan en el canonical, Open Graph y JSON-LD).

> Sin GitHub: `npx vercel` desde la carpeta del proyecto.

## Editar contenido

Todo está en **`src/content.ts`**:

| Bloque | Qué contiene |
| --- | --- |
| `site` | Nombre, título y descripción SEO, **número de WhatsApp**, dirección, coordenadas, redes, horarios y texto del banner de demo |
| `nav` | Links del menú |
| `hero` | Títulos, palabras rotativas, subtítulo, CTAs, mensaje de WhatsApp, badge y foto |
| `marquee`, `stats` | Franja de disciplinas y contadores |
| `services` | Las 4 tarjetas del bento (la primera es la grande) |
| `facilities` | Fotos de la galería horizontal y lista de equipamiento |
| `plans` | Planes y **precio mensual** (el anual se calcula ×12) |
| `schedule` | Clases por día |
| `testimonials`, `progress` | Testimonios y progresos (de ejemplo) |
| `faq`, `finalCta`, `contact` | Preguntas, bloque final y opciones del formulario |

- **Fotos**: son de Unsplash (`unsplash("id")`). Para fotos propias, poné la URL completa; si no es de Unsplash, ajustá `src/components/Img.tsx`, que arma el `srcset`.
- **Título, descripción, Open Graph y JSON-LD `ExerciseGym`** se generan desde `content.ts` al compilar (plugin en `vite.config.ts`). Los horarios del JSON-LD están en ese mismo plugin.
- **Analítica**: `src/lib/conversion.ts` → `track()` tiene comentadas las llamadas a Meta Pixel (`fbq`) y GA4 (`gtag`). Se llama en cada clic a WhatsApp (con el origen: hero, plan, barra mobile…) y en el envío del formulario. Agregá los scripts de cada proveedor en `index.html`.

## Editar colores y tipografías

Todos los tokens están en **`src/styles/tokens.css`**: colores (`--c-accent` es el lima), fuentes, tamaños de títulos (`clamp`), radios y espaciados. Tailwind los expone como `bg-accent`, `text-muted`, `font-display`, `rounded-card`…

Las fuentes (Anton e Inter Tight) se sirven desde el propio sitio con Fontsource (`src/main.tsx`), sin bloquear el render. Para cambiarlas, instalá el paquete `@fontsource/…` correspondiente y actualizá `--f-display` / `--f-body`.

## Animaciones

Están encapsuladas para poder quitarlas o trasladarlas:

| Pieza | Archivo | Qué hace |
| --- | --- | --- |
| `<Reveal>` | `src/components/motion.tsx` | Aparición al entrar en pantalla |
| `<SplitWords>` / `<RotatingWord>` | ídem | Título palabra por palabra y palabra rotativa |
| `<Counter>`, `<Marquee>`, `<Magnetic>`, `<Cursor>` | ídem | Contadores, franja infinita, botón magnético, cursor propio |
| `useParallax`, `useMagnetic`, `useLenis` | `src/hooks/motion.ts` | Parallax, efecto magnético y scroll suave |

Con `prefers-reduced-motion` se desactivan el scroll suave, el parallax, el marquee, la galería fijada (pasa a carrusel) y el cursor propio. Motion se carga con `LazyMotion`, así sus funciones se descargan después del primer pintado.

## Cómo replicarlo en Elementor Pro

| Sección | Cómo armarla en Elementor Pro |
| --- | --- |
| Tokens (colores, fuentes) | **Site Settings → Global Colors** (fondo `#0A0A0A`, grafito `#141414`, texto `#F5F1E8`, acento `#C6FF00`) y **Global Fonts** (Anton para títulos, Inter Tight para textos). Radios de 28 px en los estilos de contenedor. Grano: CSS custom en *Site Settings → Custom CSS* con la regla `.grain::after` de `src/index.css` |
| Header | **Theme Builder → Header** con contenedor *Sticky* y *Motion Effects → Sticky* + *Scrolling Effects*. Fondo transparente que cambia con la clase `elementor-sticky--effects` y CSS custom `backdrop-filter: blur(18px)` |
| Menú mobile pantalla completa | Widget **Nav Menu** en modo *Dropdown → Full Width*, o un **Popup** a pantalla completa disparado por el ícono de menú, con *Entrance Animation* en cada link |
| Hero | Contenedor de 100 vh con imagen de fondo + **Background Overlay** en gradiente; **Animated Headline** (estilo *Rotating*) para FUERZA / DISCIPLINA / RESULTADOS; *Motion Effects → Scrolling → Vertical Scroll* para el parallax; badge giratorio con **Text Path** + CSS `animation: spin` |
| Marquee | Widget **Text Editor** dentro de un contenedor con CSS custom (`@keyframes marquee`) y `transform: rotate(-2deg)`; o un **Loop Carousel** con *Autoplay* continuo y velocidad lineal |
| Cifras | Widget **Counter** (cuenta al entrar en pantalla) en un contenedor grid de 4 columnas |
| Servicios (bento) | **Contenedor Grid** de 3 columnas: la primera tarjeta con *Row span 2*, la última con *Column span 2*. Imagen de fondo + overlay, *Hover → Transform* para la flecha y filtro CSS `grayscale(1)` que se quita en hover |
| Galería horizontal fijada | **Loop Carousel** en mobile (scroll-snap nativo). En desktop requiere JS custom (GSAP ScrollTrigger con `pin: true`) cargado con **Custom Code** |
| Equipamiento con imagen en hover | **Icon List** o contenedores con CSS custom; la imagen que sigue al cursor necesita JS custom (snippet en **Custom Code**) |
| Planes + toggle | **Price Table** ×3 dentro de un widget **Toggle/Tabs** (por mes / por año). Borde animado del destacado con CSS custom (`conic-gradient` + `@property --angle`). Botón con link `https://wa.me/<número>?text=...` |
| Horarios | Widget **Tabs** horizontal (un tab por día) con una lista de contenedores dentro |
| Testimonios | **Loop Carousel** o **Testimonial Carousel** con *Draggable* activado; tarjetas de progreso en un **Contenedor Grid** |
| FAQ | Widget **Accordion** (activá el *FAQ Schema*) |
| CTA final | Contenedor 90 vh con fondo acento, título con *Entrance Animation* y botón a WhatsApp |
| Contacto | **Form** con estilo *Floating labels* (CSS custom) y **Actions After Submit → Redirect** a `https://wa.me/<número>?text=[field id="nombre"]...` usando los *shortcodes* de campos; **Google Maps** con filtro CSS `invert(0.92) hue-rotate(180deg)` |
| Footer | **Theme Builder → Footer**; el logo gigante es un **Heading** de 34vw con `overflow: hidden` en el contenedor |
| WhatsApp flotante y barra mobile | **Popup** sin cierre, posición *bottom-right*, disparador *On Page Load*; la barra mobile como segundo Popup con *Advanced Rules → Show on devices: Mobile* y disparador *On Scroll (40%)* |
| Scroll suave (Lenis) y cursor propio | **Custom Code** (`</body>`) con el script de Lenis y un snippet para el cursor; envolvé ambos en `matchMedia('(prefers-reduced-motion: no-preference)')` |
| Eventos de conversión | Integración nativa de **Meta Pixel / GA4** (Site Settings → Integrations) o **Custom Code** con `fbq('track','Contact')` / `gtag('event','contact')` en el clic de los botones de WhatsApp |

> Demo de propuesta: textos, precios, testimonios y progresos son de ejemplo. Fotos de Unsplash.
