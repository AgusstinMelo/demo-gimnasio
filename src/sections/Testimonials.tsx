import { ArrowLeft, ArrowRight, Star, TrendingUp } from "lucide-react";
import { animate, m, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { progress, testimonials } from "../content";
import { Img } from "../components/Img";
import { Reveal } from "../components/motion";
import { SectionHeading } from "../components/SectionHeading";

/** Carrusel con arrastre (mouse o dedo) y flechas para teclado */
function Carousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setMax(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = (dir: 1 | -1) => {
    const card = track.current?.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 400) + 20;
    const to = Math.min(0, Math.max(-max, x.get() - dir * w));
    animate(x, to, { type: "spring", stiffness: 260, damping: 32 });
  };

  return (
    <div>
      <div ref={viewport} className="-mx-[var(--gutter)] overflow-hidden px-[var(--gutter)]">
        <m.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.08}
          style={{ x }}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
          aria-label="Testimonios (arrastrá para ver más)"
        >
          {testimonials.map((t) => (
            <figure key={t.name} className="flex w-[82vw] max-w-[520px] shrink-0 flex-col rounded-card border border-line bg-surface p-7 select-none sm:p-9">
              <div className="flex gap-1 text-accent" role="img" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 text-[clamp(22px,2.4vw,30px)] leading-snug font-medium">“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="duo size-14 overflow-hidden rounded-full">
                  <Img src={t.photo} alt="" width={112} height={112} sizes="56px" draggable={false} className="size-full object-cover" />
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-sm text-muted">{t.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </m.div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="label-caps text-muted">Arrastrá para ver más · testimonios de ejemplo</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-accent hover:text-accent" aria-label="Testimonio anterior">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => step(1)} className="grid size-12 place-items-center rounded-full border border-line hover:border-accent hover:text-accent" aria-label="Testimonio siguiente">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonios-title" className="wrap section-y overflow-x-clip">
      <SectionHeading index="05" label="Comunidad" title="Lo dicen ellos" id="testimonios-title" />
      <Carousel />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {progress.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="rounded-card border border-line bg-surface p-7 sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <p className="display text-3xl">
                {p.name} · {p.months} meses
              </p>
              <TrendingUp className="text-accent" aria-hidden />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {p.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-bg p-5">
                  <dt className="label-caps text-muted">{s.label}</dt>
                  <dd className="mt-3 flex items-baseline gap-2">
                    <span className="text-muted line-through decoration-1">{s.before}</span>
                    <ArrowRight size={14} className="text-muted" aria-label="pasó a" />
                    <span className="display text-4xl text-accent">{s.after}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted">Progreso de ejemplo (ficticio).</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
