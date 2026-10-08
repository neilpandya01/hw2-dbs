import { contrast } from "@/lib/contrast";
import Section from "./Section";

const BG = "#e9e8e4", SURFACE = "#ffffff", BLACK = "#111214", WHITE = "#ffffff";

// check: "text" = as text on the background, "ui" = as an outline on the surface,
// "on" = the text color that sits on it (onColor), "none" = decorative.
type Role = { name: string; hex: string; from: string; use: string; check: "text" | "ui" | "on" | "none"; onColor?: string };
const roles: Role[] = [
  { name: "Background", hex: BG, from: "Terminal floor", use: "Page", check: "none" },
  { name: "Surface", hex: SURFACE, from: "Sign face", use: "Cards, inputs, panels", check: "none" },
  { name: "Raised", hex: "#dcdad5", from: "Concrete", use: "Hover, pressed", check: "none" },
  { name: "Sign black", hex: BLACK, from: "Sign panels", use: "Text, panels, chosen", check: "text" },
  { name: "Muted text", hex: "#55595f", from: "Steel", use: "Labels, meta", check: "text" },
  { name: "Border", hex: "#c9c7c1", from: "Floor seams", use: "Dividers", check: "none" },
  { name: "Control", hex: "#6b7078", from: "Stanchion", use: "Input, chip, box outlines", check: "ui" },
  { name: "Accent", hex: "#ffcc00", from: "Signal yellow", use: "Primary action only", check: "on", onColor: BLACK },
  { name: "Focus / info", hex: "#1d5fd1", from: "Information signs", use: "Focus ring, links, info", check: "ui" },
  { name: "Success", hex: "#16793c", from: "Boarding", use: "Done, new, open", check: "on", onColor: WHITE },
  { name: "Warning", hex: "#ff8a00", from: "Delayed", use: "Cautions", check: "on", onColor: BLACK },
  { name: "Error", hex: "#c8261f", from: "Cancelled", use: "Errors, stop", check: "on", onColor: WHITE },
];

const fmt = (n: number) => `${n.toFixed(1)}:1`;

function Swatches() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
        {roles.map((r) => {
          const ratio =
            r.check === "on"
              ? `${fmt(contrast(r.onColor!, r.hex))} ${r.onColor === BLACK ? "black" : "white"} on it`
              : r.check === "text"
                ? `${fmt(contrast(r.hex, BG))} on bg`
                : r.check === "ui"
                  ? `${fmt(contrast(r.hex, SURFACE))} on surface`
                  : "Decorative";
          return (
            <li key={r.name} className="grid content-start gap-2.5 font-ap">
              <div className="grid aspect-[4/3] place-items-end justify-items-start rounded-ap-sm border-2 border-ap-sign p-2" style={{ background: r.hex }}>
                {r.check === "on" && (
                  <span className="font-ap-cond text-xl font-bold" style={{ color: r.onColor }}>
                    Aa
                  </span>
                )}
              </div>
              <div className="grid gap-0.5">
                <p className="font-ap-cond text-lg font-bold text-ap-text">{r.name}</p>
                <p className="text-xs text-ap-muted tabular-nums">{r.hex}</p>
                <p className="min-h-8 text-xs leading-4 text-ap-muted">
                  {r.from} · {r.use}
                </p>
                <p className={`text-xs tabular-nums ${r.check === "none" ? "text-ap-muted" : "font-bold text-ap-text"}`}>{ratio}</p>
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
    <Section n={1} title="Color roles" note="Black and white do the talking. Every other color is a status with one meaning, like on a gate screen.">
      <Swatches />
      <p className="font-ap text-sm text-ap-muted">
        Ratios are WCAG contrast, computed from the hex values. Text colors pass AA (4.5:1) on the background; the control outline and focus ring pass the 3:1 non-text minimum. Yellow and amber are never used as text on the light page, only as fills with black letters, and yellow appears on exactly one thing: the primary action.
      </p>
    </Section>
  );
}
