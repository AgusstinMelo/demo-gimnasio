import { Menu, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { hero, nav, site } from "../content";
import { Magnetic } from "../components/motion";
import { useReduced } from "../hooks/motion";
import { openWhatsApp } from "../lib/conversion";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`display flex items-center gap-2 text-[26px] leading-none ${className}`}>
      <span className="grid size-7 place-items-center rounded-md bg-accent text-[18px] text-accent-ink" aria-hidden>
        {site.name[0]}
      </span>
      {site.name}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReduced();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const join = () => openWhatsApp(hero.primaryMessage, "header");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <p className="bg-accent py-1 text-center text-[11px] font-semibold tracking-wide text-accent-ink">{site.demoBanner}</p>
        <div className={`border-b transition-[background-color,border-color] duration-500 ${scrolled || open ? "glass border-line" : "border-transparent"}`}>
          <div className="wrap flex h-[var(--header-h)] items-center gap-6">
            <a href="#top" aria-label={`${site.name}, volver arriba`} className="relative z-10">
              <Logo />
            </a>
            <nav className="ml-auto hidden lg:block" aria-label="Principal">
              <ul className="flex gap-1">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="label-caps rounded-full px-4 py-2 text-muted transition-colors hover:text-text">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Magnetic className="hidden lg:inline-block">
              <button type="button" onClick={join} className="btn-accent py-2.5">
                Sumate
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 ml-auto grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile a pantalla completa */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg px-[var(--gutter)] pt-[calc(var(--header-h)+48px)] pb-10 lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glow -top-20 -right-32 size-96" aria-hidden />
            <nav aria-label="Principal">
              <m.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}>
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-line">
                    <m.a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline justify-between py-4 text-[44px]"
                      variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                    >
                      {n.label}
                      <span className="label-caps font-sans text-muted">0{i + 1}</span>
                    </m.a>
                  </li>
                ))}
              </m.ul>
            </nav>
            <button type="button" onClick={join} className="btn-accent mt-auto w-full py-4 text-base">
              {hero.primaryCta}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
