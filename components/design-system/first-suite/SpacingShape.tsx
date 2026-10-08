import Section, { Specimen } from "./Section";

const space = [4, 8, 16, 24, 40, 64];

export default function SpacingShape() {
  return (
    <Section n={3} title="Spacing & shape" note="Generous space, square tailored corners, and no shadows. A 1px line does the work a shadow would.">
      <div className="grid gap-12 lg:grid-cols-4">
        <Specimen label="Spacing scale (px)" className="lg:col-span-2">
          <div className="flex items-end gap-4">
            {space.map((s) => (
              <div key={s} className="grid justify-items-center gap-2">
                <div className="w-6 border border-fs-brass bg-fs-champagne/50" style={{ height: s * 1.6 }} />
                <span className="font-fs text-[11px] text-fs-muted tabular-nums">{s}</span>
              </div>
            ))}
          </div>
          <p className="font-fs text-xs font-light text-fs-muted">Steps grow faster than a plain 4px grid, so layouts stay airy. Cards breathe at 24, sections at 64.</p>
        </Specimen>
        <Specimen label="Corners">
          <div className="flex items-end gap-5">
            {[
              ["0", "rounded-none", "Buttons, cards"],
              ["2", "rounded-fs-sm", "Inputs, chips"],
              ["full", "rounded-full", "Radios, icons"],
            ].map(([v, cls, use]) => (
              <div key={v} className="grid justify-items-center gap-2">
                <div className={`size-14 border border-fs-control bg-fs-surface ${cls}`} />
                <span className="font-fs text-[11px] text-fs-muted">{v}</span>
                <span className="font-fs text-[11px] font-light text-fs-muted">{use}</span>
              </div>
            ))}
          </div>
        </Specimen>
        <Specimen label="Lines, not shadows">
          <div className="grid gap-3.5 font-fs text-xs font-light text-fs-muted">
            <div className="flex items-center gap-3"><span className="h-px w-16 bg-fs-border" />1px hairline · dividers, cards</div>
            <div className="flex items-center gap-3"><span className="h-px w-16 bg-fs-control" />1px control · inputs, chips</div>
            <div className="flex items-center gap-3"><span className="h-px w-16 bg-fs-brass" />1px brass · rules, accents</div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-16 place-items-center border border-fs-control bg-fs-surface"><span className="h-5 w-12 border border-fs-brass/60" /></span>
              Double rule · modal frame
            </div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 bg-fs-accent shadow-[inset_0_0_0_3px_var(--color-fs-accent-hover),inset_0_0_0_4px_rgb(251_248_242_/_0.55)]" />Inner rule · primary hover</div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 border border-fs-border bg-fs-surface" />Shadow · none, anywhere</div>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
