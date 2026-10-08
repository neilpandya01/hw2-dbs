export default function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`fs-ds-${n}`} className="grid gap-8 border-t border-fs-border pt-12">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span className="font-fs text-[11px] font-medium tracking-[0.24em] text-fs-brass">{String(n).padStart(2, "0")}</span>
        <h2 id={`fs-ds-${n}`} className="font-fs-serif text-3xl font-normal text-fs-text">
          {title}
        </h2>
        {note && <p className="w-full font-fs text-sm font-light text-fs-muted sm:w-auto sm:flex-1 sm:text-right">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Specimen({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid content-start gap-4 ${className}`}>
      <p className="font-fs text-[10px] font-medium tracking-[0.24em] text-fs-muted uppercase">{label}</p>
      {children}
    </div>
  );
}
