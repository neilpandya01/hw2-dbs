import Section, { Specimen } from "./Section";

const space = [4, 8, 12, 16, 24, 32, 48];

export default function SpacingShape() {
  return (
    <Section n={3} title="Spacing & shape" note="A 4px grid. Soft corners like a cabin window. No drop shadows — depth comes from light.">
      <div className="grid gap-10 lg:grid-cols-4">
        <Specimen label="Spacing scale (px)" className="lg:col-span-2">
          <div className="flex items-end gap-3">
            {space.map((s) => (
              <div key={s} className="grid justify-items-center gap-2">
                <div className="w-6 rounded-sm bg-mf-led/70" style={{ height: s * 2 }} />
                <span className="font-mf-mono text-[11px] text-mf-muted">{s}</span>
              </div>
            ))}
          </div>
        </Specimen>
        <Specimen label="Corners">
          <div className="flex items-end gap-4">
            {[
              ["6", "rounded-mf-sm", "Inputs, badges"],
              ["12", "rounded-mf-md", "Cards, panels"],
              ["full", "rounded-full", "Buttons, chips"],
            ].map(([v, cls, use]) => (
              <div key={v} className="grid justify-items-center gap-2">
                <div className={`size-14 border border-mf-control bg-mf-surface ${cls}`} />
                <span className="font-mf-mono text-[11px] text-mf-muted">{v}</span>
                <span className="font-mf text-[11px] font-light text-mf-muted">{use}</span>
              </div>
            ))}
          </div>
        </Specimen>
        <Specimen label="Borders & light">
          <div className="grid gap-3 font-mf text-xs text-mf-muted">
            <div className="flex items-center gap-3"><span className="h-px w-16 bg-mf-border" />1px hairline · dividers, cards</div>
            <div className="flex items-center gap-3"><span className="h-px w-16 bg-mf-control" />1px control · inputs</div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 rounded-mf-sm bg-mf-raised shadow-mf-glow" />LED glow · hover</div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 rounded-full bg-mf-accent shadow-mf-lamp" />Lamp glow · primary hover</div>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
