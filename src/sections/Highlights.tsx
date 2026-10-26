import { ArrowUpRight, Asterisk } from "lucide-react";
import { m } from "motion/react";
import { useRef } from "react";
import { marquee, services, stats } from "../content";
import { Img } from "../components/Img";
import { Counter, Marquee, Reveal } from "../components/motion";
import { SectionHeading } from "../components/SectionHeading";
import { useParallax } from "../hooks/motion";

/** Franja inclinada con servicios separados por un ícono de acento */
export function ServicesMarquee() {
  return (
    // El contenedor recorta en horizontal las esquinas de la franja inclinada (sin cortar en vertical)
    <div className="relative z-10 -my-6 overflow-x-clip sm:-my-8">
      <div className="-mx-4 -rotate-2 border-y border-line bg-surface py-5 sm:py-7" aria-label="Disciplinas">
        <Marquee
          items={marquee.map((m) => (
            <span key={m} className="display flex items-center gap-8 px-4 text-[clamp(32px,5vw,64px)] sm:gap-12 sm:px-6">
              {m}
              <Asterisk className="size-8 text-accent sm:size-12" strokeWidth={2.5} aria-hidden />
            </span>
          ))}
        />
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="FORJA en números" className="wrap pt-[var(--section-y)]">
      <ul className="grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal as="li" key={s.label} delay={i * 0.08} className="bg-bg px-1 py-8 sm:px-6 sm:py-12">
            <p className="display text-[clamp(44px,7vw,104px)]">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="label-caps mt-3 text-muted">{s.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function ServiceCard({ s, index, big = false }: { s: (typeof services)[number]; index: number; big?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const y = useParallax(ref, big ? 50 : 30);
  return (
    <Reveal delay={index * 0.08} className={`min-w-0 ${big ? "md:row-span-2" : index === 3 ? "md:col-span-2" : ""}`}>
      <article ref={ref} className="group duo duo-hover relative h-full min-h-[340px] min-w-0 overflow-hidden rounded-card sm:min-h-[380px]">
        <m.div className="absolute -inset-y-16 inset-x-0" style={{ y }}>
          <Img src={s.image} alt={s.alt} width={big ? 1000 : 900} height={big ? 1300 : 700} sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="size-full object-cover group-hover:scale-105" />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
          <span className="label-caps text-text/70">0{index + 1}</span>
          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className={`display min-w-0 break-words ${big ? "text-[clamp(44px,7vw,112px)]" : "text-[length:var(--t-h3)]"}`}>{s.title}</h3>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-text/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight size={20} aria-hidden />
              </span>
            </div>
            <p className={`mt-3 max-w-md text-text/80 ${big ? "text-lg" : ""}`}>{s.text}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="wrap section-y relative">
      <div className="glow -top-20 right-0 size-[520px]" aria-hidden />
      <SectionHeading index="01" label="Servicios" title="Elegí cómo entrenar" id="servicios-title">
        Cuatro formas de entrenar, un mismo objetivo: que vuelvas mañana con ganas.
      </SectionHeading>
      {/* Bento asimétrico: la tarjeta principal ocupa dos filas */}
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[minmax(380px,auto)_minmax(380px,auto)] lg:gap-5">
        <ServiceCard s={services[0]} index={0} big />
        <ServiceCard s={services[1]} index={1} />
        <ServiceCard s={services[2]} index={2} />
        <ServiceCard s={services[3]} index={3} />
      </div>
    </section>
  );
}
