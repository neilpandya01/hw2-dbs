export default function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`ds-${n}`} className="grid gap-6 border-t border-mf-border pt-10">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mf-mono text-xs tracking-[0.2em] text-mf-muted">{String(n).padStart(2, "0")}</span>
        <h2 id={`ds-${n}`} className="font-mf text-2xl font-normal text-mf-text">
          {title}
        </h2>
        {note && <p className="w-full font-mf text-sm font-light text-mf-muted sm:w-auto sm:flex-1 sm:text-right">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Specimen({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid content-start gap-3 ${className}`}>
      <p className="font-mf-mono text-[0.625rem] tracking-[0.2em] text-mf-muted uppercase">{label}</p>
      {children}
    </div>
  );
}
