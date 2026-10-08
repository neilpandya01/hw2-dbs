import Section from "./Section";

const roles = [
  { role: "Display", spec: "Cormorant Garamond · Light 300 · 64/68", el: <p className="font-fs-serif text-5xl font-light sm:text-[64px] sm:leading-[68px]">186,402 miles</p> },
  { role: "Heading", spec: "Cormorant Garamond · Regular 400 · 30/36", el: <p className="font-fs-serif text-[30px] leading-9">This year, in the air</p> },
  {
    role: "Body",
    spec: "Jost · Light 300 · 16/26",
    el: <p className="max-w-xl font-fs text-base leading-[26px] font-light">Chicago to Tokyo in 1A. Dinner over the Pacific, then the bed made up with the duvet turned back, and the sun rising on the wing.</p>,
  },
  { role: "Label", spec: "Jost · Medium 500 · 11/16 · caps · +24% tracking", el: <p className="font-fs text-[11px] font-medium tracking-[0.24em] uppercase">Suite 1A · ANA NH 11 · Mar 14 2023</p> },
];

export default function TypeRoles() {
  return (
    <Section n={2} title="Type roles" note="A light serif for what you'd read on a menu card; a thin geometric sans for everything you act on.">
      <div className="divide-y divide-fs-border">
        {roles.map((r) => (
          <div key={r.role} className="grid gap-3 py-6 text-fs-text sm:grid-cols-[1fr_17rem] sm:items-baseline sm:gap-8">
            {r.el}
            <div className="sm:text-right">
              <p className="font-fs text-sm text-fs-text">{r.role}</p>
              <p className="font-fs text-[11px] font-light text-fs-muted">{r.spec}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
