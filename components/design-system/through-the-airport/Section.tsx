// Each section opens like an overhead sign: a heavy black rule, a black number tile, a condensed title.
export default function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`ap-ds-${n}`} className="grid gap-8 border-t-4 border-ap-sign pt-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="grid h-11 min-w-11 place-items-center rounded-ap-sm bg-ap-sign px-2 font-ap-cond text-2xl font-bold text-white tabular-nums">{String(n).padStart(2, "0")}</span>
        <h2 id={`ap-ds-${n}`} className="font-ap-cond text-[34px] leading-none font-extrabold text-ap-text uppercase">
          {title}
        </h2>
        {note && <p className="w-full font-ap text-base text-ap-muted sm:w-auto sm:flex-1 sm:text-right">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Specimen({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid content-start gap-4 ${className}`}>
      <p className="font-ap-cond text-[13px] font-semibold tracking-[0.08em] text-ap-muted uppercase">{label}</p>
      {children}
    </div>
  );
}
