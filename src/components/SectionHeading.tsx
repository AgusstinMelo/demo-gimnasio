import type { ReactNode } from "react";
import { Reveal, SplitWords } from "./motion";

/** Encabezado de sección: «01 / SERVICIOS», línea fina y título enorme que entra palabra por palabra */
export function SectionHeading({ index, label, title, children, id }: { index: string; label: string; title: string; children?: ReactNode; id?: string }) {
  return (
    <header className="mb-12 sm:mb-20">
      <Reveal className="label-caps mb-6 flex items-center gap-4 text-muted">
        <span className="text-accent">{index}</span> / {label}
        <span className="h-px flex-1 bg-line" aria-hidden />
      </Reveal>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 id={id} className="display max-w-5xl text-[length:var(--t-h2)]">
          <SplitWords text={title} inView />
        </h2>
        {children && <Reveal className="max-w-sm text-muted lg:pb-3">{children}</Reveal>}
      </div>
    </header>
  );
}
