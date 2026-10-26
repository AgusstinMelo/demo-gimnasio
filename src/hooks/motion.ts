// Hooks de movimiento. Todos respetan prefers-reduced-motion para poder desactivarlos de una vez.
import Lenis from "lenis";
import { useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

/** true si el usuario pidió menos movimiento */
export const useReduced = () => useReducedMotion() ?? false;

/** Media query reactiva (p. ej. "(min-width: 1024px)") */
export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Puntero fino (mouse/trackpad): habilita cursor propio y efecto magnético */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

/** Scroll suave con Lenis. Se desactiva con movimiento reducido. Los anclas (#planes) también se suavizan. */
export function useLenis() {
  const reduced = useReduced();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, autoRaf: true, anchors: { offset: -64 } });
    return () => lenis.destroy();
  }, [reduced]);
}

/** Parallax vertical: devuelve un MotionValue `y` para la imagen dentro de `ref` */
export function useParallax(ref: RefObject<HTMLElement | null>, distance = 80): MotionValue<number> {
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-distance, distance]);
}

/** Efecto magnético: el elemento se desplaza hacia el puntero (solo desktop) */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const fine = useFinePointer();
  const reduced = useReduced();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduced, strength, x, y]);

  return { ref, style: { x, y } };
}
