import Section from "./Section";

const roles = [
  { role: "Display", spec: "DM Sans · Light 300 · 56/60 · −2% tracking", el: <p className="font-mf text-5xl font-light tracking-tight sm:text-[56px] sm:leading-[60px]">186,402 miles</p> },
  { role: "Heading", spec: "DM Sans · Regular 400 · 24/32", el: <p className="font-mf text-2xl">This year in the air</p> },
  {
    role: "Body",
    spec: "DM Sans · Light 300 · 16/26",
    el: <p className="max-w-xl font-mf text-base leading-[26px] font-light">Red-eye to Tokyo. Watched the sunrise come up over the wing from 32A while the rest of the cabin slept.</p>,
  },
  { role: "Label", spec: "DM Mono · Regular 400 · 11/16 · caps · +20% tracking", el: <p className="font-mf-mono text-[11px] tracking-[0.2em] uppercase">Seat 32A · Window · Mar 14 2023</p> },
];

export default function TypeRoles() {
  return (
    <Section n={2} title="Type roles" note="Light weights for the quiet; mono for anything you'd read off a boarding pass.">
      <div className="divide-y divide-mf-border">
        {roles.map((r) => (
          <div key={r.role} className="grid gap-3 py-5 text-mf-text sm:grid-cols-[1fr_16rem] sm:items-baseline sm:gap-8">
            {r.el}
            <div className="sm:text-right">
              <p className="font-mf text-sm text-mf-text">{r.role}</p>
              <p className="font-mf-mono text-[11px] text-mf-muted">{r.spec}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
