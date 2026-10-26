import { ArrowUpRight, Clock, Mail, MapPin, Plus } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { contact, faq, finalCta, hero, nav, site } from "../content";
import { Magnetic, Reveal, SplitWords } from "../components/motion";
import { SectionHeading } from "../components/SectionHeading";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { openWhatsApp, track, waLink } from "../lib/conversion";
import { Logo } from "./Header";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-title" className="wrap section-y grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <div>
        <SectionHeading index="06" label="Preguntas" title="Dudas frecuentes" id="faq-title" />
        <Reveal className="-mt-6 text-muted sm:-mt-12">
          ¿No encontrás lo que buscás?{" "}
          <a href={waLink("¡Hola FORJA! Tengo una consulta:")} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { source: "faq" })} className="text-accent underline underline-offset-4">
            Escribinos
          </a>
          .
        </Reveal>
      </div>
      <ul className="border-t border-line lg:mt-24">
        {faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold sm:text-xl"
                >
                  {f.q}
                  <m.span animate={{ rotate: isOpen ? 45 : 0 }} className={`grid size-10 shrink-0 place-items-center rounded-full border ${isOpen ? "border-accent bg-accent text-accent-ink" : "border-line"}`}>
                    <Plus size={18} aria-hidden />
                  </m.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-accent text-accent-ink">
      <div className="wrap flex min-h-[90svh] flex-col justify-center py-24">
        <p className="label-caps mb-8">07 / Empezá hoy</p>
        <h2 id="cta-title" className="display text-[length:var(--t-hero)]">
          <SplitWords text={finalCta.title} inView />
        </h2>
        <Reveal delay={0.2} className="mt-12">
          <Magnetic>
            <button
              type="button"
              onClick={() => openWhatsApp(finalCta.message, "final_cta")}
              className="btn bg-accent-ink px-8 py-5 text-lg text-accent hover:bg-bg/85"
            >
              <WhatsAppIcon size={22} /> {finalCta.button}
            </button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

/** Campo con label flotante: el label se achica y sube al escribir o enfocar */
function Field({ label, error, as = "input", children, ...rest }: {
  label: string;
  error?: string;
  as?: "input" | "select" | "textarea";
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) {
  const id = useId();
  const Tag = as;
  const base =
    "peer w-full rounded-2xl border bg-bg px-5 pt-7 pb-2.5 text-base text-text outline-none transition-colors focus:border-accent " +
    (error ? "border-[#ff6b6b]" : "border-line");
  return (
    <div className="relative">
      <Tag id={id} placeholder=" " aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${base} ${as === "textarea" ? "min-h-32 resize-y" : ""}`} {...rest}>
        {children}
      </Tag>
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2.5 left-5 text-xs text-muted transition-all peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-accent"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 pl-2 text-sm text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if ((d.nombre ?? "").trim().length < 2) errs.nombre = "Contanos tu nombre.";
    if (!/^[+\d\s()-]{8,}$/.test(d.telefono ?? "")) errs.telefono = "Ingresá un teléfono válido (ej.: 11 5555-5555).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    const message = [
      `¡Hola FORJA! Soy ${d.nombre.trim()}.`,
      `Mi objetivo: ${d.objetivo}.`,
      d.horario && `Prefiero entrenar a la ${d.horario.toLowerCase()}.`,
      d.mensaje?.trim() && `Consulta: ${d.mensaje.trim()}`,
      `Mi teléfono: ${d.telefono}.`,
    ]
      .filter(Boolean)
      .join("\n");
    track("form_submit", { objetivo: d.objetivo });
    openWhatsApp(message, "contact_form");
  };

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="wrap section-y">
      <SectionHeading index="08" label="Contacto" title={contact.title} id="contacto-title">
        {contact.text}
      </SectionHeading>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-card border border-line bg-surface p-6 sm:grid-cols-2 sm:p-9">
            <Field label="Nombre" name="nombre" autoComplete="name" error={errors.nombre} />
            <Field label="Teléfono / WhatsApp" name="telefono" type="tel" autoComplete="tel" inputMode="tel" error={errors.telefono} />
            <Field as="select" label="Tu objetivo" name="objetivo" defaultValue={contact.goals[0]}>
              {contact.goals.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </Field>
            <Field as="select" label="Horario preferido" name="horario" defaultValue="Mañana">
              <option>Mañana</option>
              <option>Tarde</option>
              <option>Noche</option>
            </Field>
            <div className="sm:col-span-2">
              <Field as="textarea" label="Mensaje (opcional)" name="mensaje" />
            </div>
            <button type="submit" className="btn-accent py-4 text-base sm:col-span-2">
              <WhatsAppIcon size={20} /> Enviar por WhatsApp
            </button>
            <p className="text-xs text-muted sm:col-span-2">Se abre WhatsApp con tu mensaje listo para enviar. No guardamos tus datos.</p>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <div className="duo overflow-hidden rounded-card border border-line">
            <iframe
              title={`Mapa: ${site.name} en ${site.address.area}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              width="600"
              height="320"
              className="map-dark block h-72 w-full border-0 sm:h-80"
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden />
              <span>
                {site.address.street}
                <br />
                <span className="text-muted">
                  {site.address.area}, {site.address.city}
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden />
              <span className="text-sm">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: <span className="text-muted">{h.time}</span>
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 shrink-0 text-accent" size={20} aria-hidden />
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="label-caps rounded-full border border-line px-4 py-2.5 hover:border-accent hover:text-accent">
                  {s.label}
                </a>
              ))}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-24 lg:pb-0">
      <div className="wrap grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-muted">{site.tagline}. Musculación, funcional, clases grupales y personal trainer.</p>
          <a href={waLink(hero.primaryMessage)} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { source: "footer" })} className="btn-accent mt-6">
            {hero.primaryCta} <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
        <nav aria-label="Pie de página">
          <p className="label-caps mb-4 text-muted">Secciones</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-accent">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label-caps mb-4 text-muted">Horarios</p>
          <ul className="space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}
                <br />
                <span className="text-muted">{h.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="text-muted hover:text-accent">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap mt-16 flex flex-wrap justify-between gap-2 text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.demoBanner}
        </span>
        <span>Fotos: Unsplash</span>
      </div>
      {/* Logo gigante recortado al fondo */}
      {/* Pseudoelemento: es decorativo y no cuenta como texto (ni para lectores ni para el chequeo de contraste) */}
      <div
        aria-hidden
        data-text={site.name}
        className="display pointer-events-none mt-8 -mb-[0.28em] text-center text-[34vw] leading-[0.8] text-surface-2 select-none before:content-[attr(data-text)]"
      />
    </footer>
  );
}
