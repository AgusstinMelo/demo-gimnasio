import { ArrowDown, ArrowUpRight } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "../content";
import { Img } from "../components/Img";
import { Magnetic, RotatingWord, SplitWords } from "../components/motion";
import { useReduced } from "../hooks/motion";
import { openWhatsApp } from "../lib/conversion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: la foto baja más lento que el contenido y se acerca levemente
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.08, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0]);

  const fadeUp = (delay: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } };

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pt-32 pb-14 sm:pb-20">
      {/* Fondo */}
      <m.div className="absolute inset-0 -z-10" style={{ y: imgY, scale: imgScale }}>
        <Img src={hero.image} alt={hero.imageAlt} width={2000} height={1333} priority sizes="100vw" className="size-full object-cover object-[60%_center] grayscale-[0.4]" />
      </m.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/60 to-bg/30" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/75 to-transparent" aria-hidden />
      <div className="glow -bottom-40 -left-40 -z-10 size-[600px]" aria-hidden />

      <m.div className="wrap relative" style={{ opacity: fade }}>
        <m.p className="label-caps mb-6 flex items-center gap-3 text-accent" {...fadeUp(0)}>
          <span className="h-px w-10 bg-accent" aria-hidden /> {hero.eyebrow}
        </m.p>

        <h1 className="display text-[length:var(--t-hero)]">
          <SplitWords text={hero.titleLines[0]} className="block" delay={0.1} />
          <span className="block">
            <SplitWords text={hero.titleLines[1]} delay={0.25} />{" "}
            <m.span
              className="inline-block text-accent"
              initial={reduced ? false : { opacity: 0, y: "40%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            >
              <RotatingWord words={hero.rotatingWords} />
            </m.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lg text-text/80 sm:text-xl">{hero.subtitle}</p>
          <m.div className="flex flex-wrap items-center gap-3" {...fadeUp(0.7)}>
            <Magnetic>
              <button type="button" onClick={() => openWhatsApp(hero.primaryMessage, "hero")} className="btn-accent px-7 py-4 text-base">
                {hero.primaryCta} <ArrowUpRight size={18} aria-hidden />
              </button>
            </Magnetic>
            <a href="#planes" className="btn-outline px-7 py-4 text-base">
              {hero.secondaryCta}
            </a>
          </m.div>
        </div>
      </m.div>

      {/* Badge giratorio */}
      <m.div
        className="absolute top-[22%] right-[var(--gutter)] hidden size-36 md:block lg:size-44"
        initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        aria-hidden
      >
        <m.svg viewBox="0 0 100 100" className="size-full" animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <defs>
            <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-text" style={{ font: "600 9.2px var(--f-body)", letterSpacing: "0.32em", textTransform: "uppercase" }}>
            <textPath href="#badge-circle">{hero.badge} · {hero.badge} ·</textPath>
          </text>
        </m.svg>
        <span className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-accent text-accent-ink lg:size-16">
          <ArrowUpRight size={26} />
        </span>
      </m.div>
      <m.p
        className="label-caps absolute top-[calc(var(--header-h)+48px)] right-[var(--gutter)] rounded-full bg-accent px-3 py-2 text-accent-ink md:hidden"
        {...fadeUp(0.9)}
      >
        {hero.badge}
      </m.p>

      {/* Indicador de scroll */}
      <a href="#servicios" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex" aria-label="Bajar a servicios">
        <span className="flex h-10 w-6 justify-center rounded-full border border-line pt-2">
          <span className="scroll-dot block size-1.5 rounded-full bg-accent" />
        </span>
        <ArrowDown size={14} aria-hidden />
      </a>
    </section>
  );
}
