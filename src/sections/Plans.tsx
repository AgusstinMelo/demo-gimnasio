import { Check } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { plans, type Billing } from "../content";
import { Reveal } from "../components/motion";
import { SectionHeading } from "../components/SectionHeading";
import { openWhatsApp } from "../lib/conversion";

const ars = (n: number) => new Intl.NumberFormat("es-AR").format(n);

export function Plans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <section id="planes" aria-labelledby="planes-title" className="wrap section-y relative overflow-x-clip">
      <div className="glow top-1/3 left-1/2 size-[640px] -translate-x-1/2" aria-hidden />
      <SectionHeading index="03" label="Planes" title="Sin letra chica" id="planes-title">
        Precios finales en pesos, sin matrícula. Pagás con efectivo, transferencia o tarjeta.
      </SectionHeading>

      <Reveal className="mb-10 flex justify-center">
        <div role="radiogroup" aria-label="Ver precios" className="relative inline-flex rounded-full border border-line bg-surface p-1">
          {(
            [
              ["monthly", "Por mes"],
              ["yearly", "Por año"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={billing === value}
              onClick={() => setBilling(value)}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${billing === value ? "text-accent-ink" : "text-muted hover:text-text"}`}
            >
              {billing === value && <m.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const price = billing === "monthly" ? p.monthly : p.monthly * 12;
          return (
            <Reveal key={p.name} delay={i * 0.1} className={p.featured ? "lg:-my-4" : ""}>
              <article className={`flex h-full flex-col rounded-card p-7 sm:p-9 ${p.featured ? "gradient-border shadow-[0_30px_80px_-30px_rgba(198,255,0,0.35)]" : "border border-line bg-surface"}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display text-4xl sm:text-5xl">{p.name}</h3>
                  {p.featured && <span className="label-caps rounded-full bg-accent px-3 py-1.5 text-accent-ink">Más elegido</span>}
                </div>
                <p className="mt-2 text-muted">{p.pitch}</p>

                <div className="mt-8 flex items-end gap-2" aria-live="polite">
                  <span className="display text-3xl text-muted">$</span>
                  <span className="relative inline-flex h-[1em] overflow-hidden text-[clamp(56px,6vw,80px)]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <m.span
                        key={price}
                        className="display block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {ars(price)}
                      </m.span>
                    </AnimatePresence>
                  </span>
                  <span className="pb-2 text-sm text-muted">/ {billing === "monthly" ? "mes" : "año"}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {billing === "monthly" ? `Equivale a $ ${ars(p.monthly * 12)} por año` : `Equivale a $ ${ars(p.monthly)} por mes`}
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openWhatsApp(`¡Hola FORJA! Me interesa el plan ${p.name} ($ ${ars(p.monthly)} por mes). ¿Cómo me asocio?`, `plan_${p.name.toLowerCase()}`)}
                  className={`mt-8 w-full py-4 text-base ${p.featured ? "btn-accent" : "btn-outline"}`}
                >
                  Quiero el plan {p.name}
                </button>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-muted">Precios de ejemplo para la demo.</p>
    </section>
  );
}
