import Section from "./Section";

const roles = [
  { role: "Display", spec: "Barlow Condensed · ExtraBold 800 · 72/72", el: <p className="font-ap-cond text-6xl leading-none font-extrabold sm:text-[72px]">186,402 MI</p> },
  { role: "Heading", spec: "Barlow Condensed · Bold 700 · 32/36", el: <p className="font-ap-cond text-[32px] leading-9 font-bold">This year in the air</p> },
  {
    role: "Body",
    spec: "Barlow · Regular 400 · 16/24",
    el: <p className="max-w-xl font-ap text-base leading-6">Chicago to Tokyo on NH 11. Gate B22, boarding at 20:35, and thirteen hours later the bags came round on belt 3.</p>,
  },
  { role: "Label", spec: "Barlow Condensed · SemiBold 600 · 13/16 · caps · +8%", el: <p className="font-ap-cond text-[13px] font-semibold tracking-[0.08em] uppercase">Gate · Flight · Remarks</p> },
];

export default function TypeRoles() {
  return (
    <Section n={2} title="Type roles" note="One family from highway signs. Condensed and heavy for what you scan; regular for what you read.">
      <div className="divide-y-2 divide-ap-border">
        {roles.map((r) => (
          <div key={r.role} className="grid gap-3 py-5 text-ap-text sm:grid-cols-[1fr_19rem] sm:items-center sm:gap-8">
            {r.el}
            <div className="sm:text-right">
              <p className="font-ap-cond text-lg font-bold">{r.role}</p>
              <p className="font-ap text-xs text-ap-muted">{r.spec}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
