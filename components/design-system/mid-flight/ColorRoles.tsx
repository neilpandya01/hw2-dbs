import { contrast } from "@/lib/contrast";
import Section from "./Section";

const BG = "#09102a", SURFACE = "#0f1a40";

type Role = { name: string; hex: string; from: string; use: string; check?: "text" | "ui" | "on" | "none" };
const roles: Role[] = [
  { name: "Background", hex: BG, from: "Night navy", use: "Page", check: "none" },
  { name: "Surface", hex: SURFACE, from: "Seatback blue", use: "Cards, panels", check: "none" },
  { name: "Raised", hex: "#192656", from: "Seat blue", use: "Hover, modals", check: "none" },
  { name: "Text", hex: "#e6ecfb", from: "Cabin white", use: "Body, headings", check: "text" },
  { name: "Muted text", hex: "#909dc0", from: "Screen labels", use: "Labels, meta", check: "text" },
  { name: "Border", hex: "#283670", from: "Seat seams", use: "Hairline dividers", check: "none" },
  { name: "Control border", hex: "#6474aa", from: "Window bezel", use: "Inputs, checkboxes", check: "ui" },
  { name: "Accent", hex: "#eeb98f", from: "Reading lamp", use: "Primary action only", check: "on" },
  { name: "Focus / selected", hex: "#7fd3ff", from: "Aisle lights", use: "Focus ring, selected", check: "text" },
  { name: "Glow", hex: "#5b8cff", from: "LED strip", use: "Hover glow", check: "ui" },
  { name: "Error", hex: "#ff7a85", from: "EXIT sign", use: "Errors", check: "text" },
  { name: "Success", hex: "#7fe0b0", from: "Runway green", use: "Confirmations", check: "text" },
];

const fmt = (n: number) => `${n.toFixed(1)}:1`;

export default function ColorRoles() {
  return (
    <Section n={1} title="Color roles" note="Navy everywhere, one warm light for the thing to do, one cool light for where you are.">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {roles.map((r) => {
          const ratio =
            r.check === "on" ? `${fmt(contrast(BG, r.hex))} text on it` : r.check === "text" ? `${fmt(contrast(r.hex, BG))} on bg` : r.check === "ui" ? `${fmt(contrast(r.hex, SURFACE))} on surface` : "Decorative";
          return (
            <li key={r.name} className="grid content-start gap-3 font-mf">
              <div className="aspect-[4/3] rounded-mf-md border border-mf-border" style={{ background: r.hex }} />
              <div className="grid gap-1">
                <p className="text-sm text-mf-text">{r.name}</p>
                <p className="font-mf-mono text-[0.6875rem] text-mf-muted">{r.hex}</p>
                <p className="min-h-8 text-xs leading-4 font-light text-mf-muted">
                  {r.from} · {r.use}
                </p>
                <p className={`font-mf-mono text-[0.6875rem] ${r.check === "none" ? "text-mf-muted/60" : "text-mf-focus"}`}>{ratio}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="font-mf text-xs font-light text-mf-muted">
        Ratios are WCAG contrast, computed from the hex values. Every text color passes AA (4.5:1); control borders pass the 3:1 non-text minimum. Hairline borders are decorative and never the only outline of a control.
      </p>
    </Section>
  );
}
