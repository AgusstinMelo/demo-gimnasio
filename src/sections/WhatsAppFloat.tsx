import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { hero } from "../content";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { openWhatsApp } from "../lib/conversion";

/**
 * Botón flotante de WhatsApp (siempre visible) y, en mobile, barra inferior «Escribinos»
 * que aparece al pasar el hero. En mobile la barra reemplaza al botón para no tapar contenido.
 */
export function WhatsAppFloat() {
  const [pastHero, setPastHero] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    // Tooltip de bienvenida unos segundos después de cargar
    const t1 = setTimeout(() => setTip(true), 4000);
    const t2 = setTimeout(() => setTip(false), 9000);
    return () => {
      window.removeEventListener("scroll", on);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const open = (source: string) => openWhatsApp(hero.primaryMessage, source);

  return (
    <>
      <div className={`fixed right-5 bottom-5 z-50 transition-transform duration-500 ${pastHero ? "max-lg:translate-y-32" : ""}`}>
        <AnimatePresence>
          {tip && (
            <m.span
              role="status"
              className="glass absolute right-[calc(100%+12px)] bottom-3 rounded-full border border-line px-4 py-2 text-sm whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              ¿Dudas? Escribinos 👋
            </m.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => open("float")}
          onMouseEnter={() => setTip(true)}
          onMouseLeave={() => setTip(false)}
          onFocus={() => setTip(true)}
          onBlur={() => setTip(false)}
          className="glass relative grid size-16 place-items-center rounded-full border border-accent/40 text-accent shadow-[0_10px_40px_-10px_rgba(198,255,0,0.45)]"
          aria-label="Abrir chat de WhatsApp"
        >
          <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" aria-hidden />
          <WhatsAppIcon size={28} />
        </button>
      </div>

      {/* Barra inferior mobile */}
      <AnimatePresence>
        {pastHero && (
          <m.div
            className="glass fixed inset-x-0 bottom-0 z-50 border-t border-line px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" onClick={() => open("mobile_bar")} className="btn-accent w-full py-3.5 text-base">
              <WhatsAppIcon size={20} /> Escribinos · {hero.badge}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
