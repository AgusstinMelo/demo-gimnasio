import { AnimatePresence, m } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { schedule } from "../content";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/motion";

const DAYS = Object.keys(schedule);
/** Día de hoy (lunes = 0); el domingo muestra el lunes */
const today = () => Math.min(Math.max(new Date().getDay() - 1, 0), DAYS.length - 1);

export function Schedule() {
  const [day, setDay] = useState(() => DAYS[today()]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Navegación con flechas entre pestañas (patrón ARIA tabs)
  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + DAYS.length) % DAYS.length;
    setDay(DAYS[n]);
    tabs.current[n]?.focus();
  };

  return (
    <section id="horarios" aria-labelledby="horarios-title" className="border-y border-line bg-surface">
      <div className="wrap section-y">
        <SectionHeading index="04" label="Horarios" title="Clases toda la semana" id="horarios-title">
          La sala está abierta de 6 a 23 h. Las clases grupales se reservan desde la app.
        </SectionHeading>

        <Reveal>
          <div role="tablist" aria-label="Día de la semana" className="snap-row mb-8 flex gap-1 overflow-x-auto border-b border-line">
            {DAYS.map((d, i) => (
              <button
                key={d}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${i}`}
                aria-selected={day === d}
                aria-controls="schedule-panel"
                tabIndex={day === d ? 0 : -1}
                onClick={() => setDay(d)}
                onKeyDown={(e) => onKey(e, i)}
                className={`display relative shrink-0 px-5 pb-4 text-3xl transition-colors sm:px-8 sm:text-4xl ${day === d ? "text-text" : "text-muted hover:text-text"}`}
              >
                {d}
                {day === d && <m.span layoutId="day-underline" className="absolute inset-x-0 -bottom-px h-[3px] bg-accent" />}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="schedule-panel" role="tabpanel" aria-labelledby={`tab-${DAYS.indexOf(day)}`} className="min-h-[360px]">
          <AnimatePresence mode="wait">
            <m.ul
              key={day}
              className="grid gap-3 sm:grid-cols-2"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ staggerChildren: 0.05 }}
            >
              {schedule[day].map((c) => (
                <m.li
                  key={c.time + c.name}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="group flex items-center gap-5 rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-accent/60"
                >
                  <span className="display w-20 text-3xl text-accent tabular-nums">{c.time}</span>
                  <span className="flex-1">
                    <span className="block text-lg font-semibold">{c.name}</span>
                    <span className="text-sm text-muted">con {c.coach}</span>
                  </span>
                  <span className="label-caps rounded-full border border-line px-3 py-1.5 text-muted">{c.level}</span>
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
