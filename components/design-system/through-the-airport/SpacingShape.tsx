import Section, { Specimen } from "./Section";

const space = [4, 8, 12, 16, 24, 32, 48];

export default function SpacingShape() {
  return (
    <Section n={3} title="Spacing & shape" note="A tight 4px grid, sign-panel corners, and no shadows. Contrast and heavy lines do the separating.">
      <div className="grid gap-12 lg:grid-cols-4">
        <Specimen label="Spacing scale (px)" className="lg:col-span-2">
          <div className="flex items-end gap-3">
            {space.map((s) => (
              <div key={s} className="grid justify-items-center gap-2">
                <div className="w-7 bg-ap-sign" style={{ height: s * 1.6 }} />
                <span className="font-ap-cond text-sm font-bold text-ap-text tabular-nums">{s}</span>
              </div>
            ))}
          </div>
          <p className="font-ap text-sm text-ap-muted">Denser than the other two systems: signs pack information. Rows sit 4 apart, cards pad at 16, sections at 48.</p>
        </Specimen>
        <Specimen label="Corners">
          <div className="flex items-start gap-4">
            {[
              ["0", "rounded-none", "List rows"],
              ["3", "rounded-ap-md", "Buttons, panels"],
              ["full", "rounded-full", "Radios"],
            ].map(([v, cls, use]) => (
              <div key={v} className="grid w-20 justify-items-center gap-2 text-center">
                <div className={`size-14 border-2 border-ap-sign bg-ap-surface ${cls}`} />
                <span className="font-ap-cond text-sm font-bold text-ap-text">{v}</span>
                <span className="font-ap text-xs text-ap-muted">{use}</span>
              </div>
            ))}
          </div>
        </Specimen>
        <Specimen label="Lines, not shadows">
          <div className="grid gap-3 font-ap text-sm text-ap-muted">
            <div className="flex items-center gap-3"><span className="h-0.5 w-16 bg-ap-border" />2px seam · dividers</div>
            <div className="flex items-center gap-3"><span className="h-0.5 w-16 bg-ap-control" />2px control · inputs, chips</div>
            <div className="flex items-center gap-3"><span className="h-1 w-16 bg-ap-sign" />4px rule · section tops</div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 rounded-ap-sm bg-ap-sign" />Black panel · headers, tabs</div>
            <div className="flex items-center gap-3"><span className="ap-hatch h-8 w-16 rounded-ap-sm border-2 border-ap-control/40 bg-ap-raised" />Hatching · disabled</div>
            <div className="flex items-center gap-3"><span className="h-8 w-16 rounded-ap-sm border-2 border-ap-border bg-ap-surface" />Shadow · none, anywhere</div>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
