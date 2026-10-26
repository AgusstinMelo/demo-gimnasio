// Componentes de animación reutilizables. Para quitar una animación, reemplazá el componente por su contenido.
import { animate, type HTMLMotionProps, m, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFinePointer, useMagnetic, useReduced } from "../hooks/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Aparece al entrar en pantalla (opacidad + desplazamiento) */
export function Reveal({ children, delay = 0, y = 40, className, as = "div" }: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
}) {
  const reduced = useReduced();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Título que entra palabra por palabra (máscara + desplazamiento) */
export function SplitWords({ text, className = "", delay = 0, inView = false }: { text: string; className?: string; delay?: number; inView?: boolean }) {
  const reduced = useReduced();
  const words = text.split(" ");
  const trigger = inView ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } } : { animate: "show" };
  return (
    <m.span className={className} initial={reduced ? false : "hidden"} {...trigger} transition={{ staggerChildren: 0.08, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i} className="-mt-[0.18em] inline-block overflow-hidden pt-[0.18em] pb-[0.06em] align-bottom">
          <m.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
          >
            {w}
          </m.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </m.span>
  );
}

/** Palabra que rota cada pocos segundos (FUERZA / DISCIPLINA / RESULTADOS) */
export function RotatingWord({ words, className = "", interval = 2200 }: { words: string[]; className?: string; interval?: number }) {
  const reduced = useReduced();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduced, words.length, interval]);
  // La palabra más larga reserva el ancho: el título no "salta" al cambiar
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));
  return (
    <span className={`relative -mt-[0.18em] inline-grid overflow-hidden pt-[0.18em] align-bottom ${className}`} aria-live="off">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w, n) => (
        <m.span
          key={w}
          aria-hidden
          className="col-start-1 row-start-1"
          initial={false}
          animate={n === i ? { y: "0%", opacity: 1 } : { y: n === (i - 1 + words.length) % words.length ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {w}
        </m.span>
      ))}
    </span>
  );
}

/** Contador que sube al entrar en pantalla */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReduced();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, { duration: 2, ease: EASE, onUpdate: (n) => setV(Math.round(n)) });
    return () => controls.stop();
  }, [inView, reduced, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {new Intl.NumberFormat("es-AR").format(v)}
      {suffix}
    </span>
  );
}

/** Marquee infinito (CSS). Con movimiento reducido queda estático. */
export function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          {it}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Envoltorio magnético para botones principales (solo desktop) */
export function Magnetic({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLMotionProps<"span">) {
  const { ref, style } = useMagnetic<HTMLSpanElement>();
  return (
    <m.span ref={ref} style={style} className={className || "inline-block"} {...rest}>
      {children}
    </m.span>
  );
}

/** Cursor propio: punto que sigue al mouse y crece sobre elementos interactivos. Solo con puntero fino. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReduced();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [hover, setHover] = useState(false);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as Element).closest?.("a, button, [role=button], input, select, textarea, label"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] -mt-[22px] -ml-[22px] size-11 rounded-full bg-accent mix-blend-difference"
      style={{ x: sx, y: sy }}
      initial={{ scale: 12 / 44 }}
      animate={{ scale: hover ? 1 : 12 / 44 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}
