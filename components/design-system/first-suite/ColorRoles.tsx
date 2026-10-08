import { contrast } from "@/lib/contrast";
import Section from "./Section";

const BG = "#f4eee4", SURFACE = "#fbf8f2";

type Role = { name: string; hex: string; from: string; use: string; check?: "text" | "ui" | "on" | "none" };
const neutrals: Role[] = [
  { name: "Background", hex: BG, from: "Cabin wall", use: "Page", check: "none" },
  { name: "Surface", hex: SURFACE, from: "Ivory linen", use: "Cards, panels, inputs", check: "none" },
  { name: "Raised", hex: "#ece3d4", from: "Sand", use: "Hover, pressed", check: "none" },
  { name: "Text", hex: "#3b2a20", from: "Espresso", use: "Body, headings, selected", check: "text" },
  { name: "Muted text", hex: "#6e5f52", from: "Taupe", use: "Labels, meta", check: "text" },
  { name: "Border", hex: "#ddd1bf", from: "Linen seams", use: "Hairline dividers", check: "none" },
  { name: "Control border", hex: "#8f7c6a", from: "Leather piping", use: "Inputs, chips, checkboxes", check: "ui" },
];
const accents: Role[] = [
  { name: "Accent", hex: "#6e2a34", from: "Bordeaux pour", use: "Primary action only", check: "on" },
  { name: "Focus", hex: "#7d5f33", from: "Deep brass", use: "Focus ring, active tab", check: "ui" },
  { name: "Brass", hex: "#a8844f", from: "Brushed brass", use: "Decorative rules", check: "none" },
  { name: "Link / info", hex: "#3e4c5e", from: "Slate passport", use: "Links, info badges", check: "text" },
  { name: "Success", hex: "#55644a", from: "Orchid leaf", use: "Confirmations", check: "text" },
  { name: "Warning", hex: "#8a4f2c", from: "Cognac leather", use: "Cautions", check: "text" },
  { name: "Error", hex: "#a6432f", from: "Terracotta", use: "Errors", check: "text" },
];

const fmt = (n: number) => `${n.toFixed(1)}:1`;

function Swatches({ title, roles }: { title: string; roles: Role[] }) {
  return (
    <div className="grid gap-5">
      <p className="font-fs text-[10px] font-medium tracking-[0.24em] text-fs-muted uppercase">{title}</p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
        {roles.map((r) => {
          const ratio =
            r.check === "on" ? `${fmt(contrast(SURFACE, r.hex))} ivory on it` : r.check === "text" ? `${fmt(contrast(r.hex, BG))} on bg` : r.check === "ui" ? `${fmt(contrast(r.hex, SURFACE))} on surface` : "Decorative";
          return (
            <li key={r.name} className="grid content-start gap-3 font-fs">
              <div className="aspect-[4/5] border border-fs-border" style={{ background: r.hex }} />
              <div className="grid gap-1">
                <p className="text-sm text-fs-text">{r.name}</p>
                <p className="text-[11px] text-fs-muted tabular-nums">{r.hex}</p>
                <p className="min-h-8 text-xs leading-4 font-light text-fs-muted">
                  {r.from} · {r.use}
                </p>
                <p className={`text-[11px] tabular-nums ${r.check === "none" ? "text-fs-muted" : "font-medium text-fs-text"}`}>{ratio}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ColorRoles() {
  return (
    <Section n={1} title="Color roles" note="Warm neutrals do the work; each accent comes from one thing in the suite and has one job.">
      <Swatches title="Neutrals" roles={neutrals} />
      <Swatches title="Accents" roles={accents} />
      <p className="font-fs text-xs font-light text-fs-muted">
        Ratios are WCAG contrast, computed from the hex values. Every text color passes AA (4.5:1) on the background, and control borders and the focus ring pass the 3:1 non-text minimum. Hairline borders and brass rules are decorative and never the only outline of a control.
      </p>
    </Section>
  );
}
