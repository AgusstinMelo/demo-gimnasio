import { AnimatePresence, m, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { facilities } from "../content";
import { Img } from "../components/Img";
import { Reveal } from "../components/motion";
import { SectionHeading } from "../components/SectionHeading";
import { useFinePointer, useMedia, useReduced } from "../hooks/motion";

type Slide = (typeof facilities.slides)[number];

function SlideCard({ s, i, className = "" }: { s: Slide; i: number; className?: string }) {
  return (
    <figure className={`shrink-0 ${className}`}>
      <div className="duo duo-hover aspect-[4/5] overflow-hidden rounded-card lg:aspect-[16/11]">
        <Img src={s.image} alt={s.title} width={1200} height={825} sizes="(min-width: 1024px) 60vw, 85vw" className="size-full object-cover" />
      </div>
      <figcaption className="mt-4 flex items-baseline gap-4">
        <span className="label-caps text-accent">{String(i + 1).padStart(2, "0")}</span>
        <span>
          <span className="display block text-3xl sm:text-4xl">{s.title}</span>
          <span className="text-muted">{s.caption}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Desktop: la sección se fija y el scroll vertical mueve las fotos en horizontal */
function PinnedGallery() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => track.current && setDistance(track.current.scrollWidth - window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // La altura extra es el "recorrido" del scroll horizontal
    <div ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[calc(var(--header-h)+24px)]">
        <m.div ref={track} style={{ x }} className="flex w-max gap-8 pr-[var(--gutter)] pl-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))]">
          {facilities.slides.map((s, i) => (
            <SlideCard key={s.title} s={s} i={i} className="w-[min(58vw,92vh)] max-w-[860px]" />
          ))}
        </m.div>
        <div className="wrap mt-8">
          <div className="h-px bg-line">
            <m.div className="h-px bg-accent" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile (o movimiento reducido): carrusel nativo con scroll-snap */
function SnapGallery() {
  return (
    <div className="snap-row flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2" tabIndex={0} aria-label="Fotos de las instalaciones (deslizá)">
      {facilities.slides.map((s, i) => (
        <SlideCard key={s.title} s={s} i={i} className="w-[82vw] max-w-[520px] snap-start scroll-ml-[var(--gutter)]" />
      ))}
    </div>
  );
}

/** Lista de equipamiento: al pasar por un ítem aparece su foto siguiendo al cursor (desktop) */
function EquipmentList() {
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {facilities.equipment.map((eq, i) => (
          <Reveal as="li" key={eq.name} delay={i * 0.05}>
            <div
              className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors sm:py-7"
              onPointerEnter={() => setActive(i)}
            >
              <span className="flex items-center gap-4">
                {!fine && (
                  <span className="duo size-14 shrink-0 overflow-hidden rounded-2xl">
                    <Img src={eq.image} alt="" width={112} height={112} className="size-full object-cover" />
                  </span>
                )}
                <span className={`display text-[clamp(28px,4.5vw,64px)] transition-colors duration-300 ${active === i ? "text-accent" : ""}`}>{eq.name}</span>
              </span>
              <span className="label-caps hidden text-right text-muted sm:block">{eq.detail}</span>
            </div>
          </Reveal>
        ))}
      </ul>
      {fine && (
        <AnimatePresence>
          {active !== null && (
            <m.div
              key="preview"
              className="pointer-events-none absolute top-0 left-0 z-10 -mt-32 -ml-28 h-64 w-56 overflow-hidden rounded-3xl"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
            >
              {facilities.equipment.map((eq, i) => (
                <Img
                  key={eq.name}
                  src={eq.image}
                  alt=""
                  width={448}
                  height={512}
                  sizes="224px"
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function Facilities() {
  const desktop = useMedia("(min-width: 1024px)");
  const reduced = useReduced();
  return (
    <section id="instalaciones" aria-labelledby="instalaciones-title" className="pt-[var(--section-y)]">
      <div className="wrap">
        <SectionHeading index="02" label="Instalaciones" title="900 m² para darlo todo" id="instalaciones-title">
          Luz natural, equipamiento de competencia y todo ordenado para que no pierdas tiempo.
        </SectionHeading>
      </div>
      {desktop && !reduced ? <PinnedGallery /> : <SnapGallery />}
      <div className="wrap pt-[var(--section-y)]">
        <p className="label-caps mb-6 text-muted">Equipamiento</p>
        <EquipmentList />
      </div>
    </section>
  );
}
