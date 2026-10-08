import { useId, type ReactNode } from "react";

// A miniature side view of the aircraft, in the airline's colours, flying right through the night.
// Built from a few measurements per type: fuselage lengths are roughly to scale, so an E175
// really is about half an A380. Liveries are simplified to what you'd recognise from the gate:
// tail art, belly colour, cheatline, engines.

type Tip = "plain" | "winglet" | "split" | "sharklet" | "fence";
type Spec = { m: number; h: number; nose: number; fin: number; engines: 2 | 4; eng: number; tip: Tip; decks?: 2; mask?: boolean };

const specs: [RegExp, Spec][] = [
  [/A380/i, { m: 73, h: 19, nose: 0.95, fin: 1.15, engines: 4, eng: 0.36, tip: "fence", decks: 2 }],
  [/777-300/i, { m: 74, h: 14, nose: 1.35, fin: 1.55, engines: 2, eng: 0.66, tip: "plain" }],
  [/777/i, { m: 64, h: 14, nose: 1.35, fin: 1.6, engines: 2, eng: 0.62, tip: "plain" }],
  [/787-10/i, { m: 68, h: 13.5, nose: 1.75, fin: 1.6, engines: 2, eng: 0.6, tip: "plain" }],
  [/787-9/i, { m: 63, h: 13.5, nose: 1.75, fin: 1.6, engines: 2, eng: 0.6, tip: "plain" }],
  [/787/i, { m: 57, h: 13.5, nose: 1.75, fin: 1.65, engines: 2, eng: 0.6, tip: "plain" }],
  [/767/i, { m: 55, h: 12.5, nose: 1.3, fin: 1.7, engines: 2, eng: 0.55, tip: "winglet" }],
  [/A350/i, { m: 67, h: 14, nose: 1.45, fin: 1.6, engines: 2, eng: 0.6, tip: "winglet", mask: true }],
  [/A330/i, { m: 64, h: 13.5, nose: 1.4, fin: 1.6, engines: 2, eng: 0.55, tip: "winglet" }],
  [/757/i, { m: 47, h: 10.5, nose: 1.25, fin: 2.0, engines: 2, eng: 0.55, tip: "winglet" }],
  [/737 MAX 9|737-900/i, { m: 42, h: 10.5, nose: 1.2, fin: 2.0, engines: 2, eng: 0.48, tip: "split" }],
  [/737 MAX/i, { m: 39.5, h: 10.5, nose: 1.2, fin: 2.0, engines: 2, eng: 0.48, tip: "split" }],
  [/737/i, { m: 39.5, h: 10.5, nose: 1.2, fin: 2.0, engines: 2, eng: 0.44, tip: "winglet" }],
  [/A321/i, { m: 44.5, h: 10.5, nose: 1.25, fin: 1.95, engines: 2, eng: 0.5, tip: "sharklet" }],
  [/A320/i, { m: 37.6, h: 10.5, nose: 1.25, fin: 1.95, engines: 2, eng: 0.5, tip: "sharklet" }],
  [/A220/i, { m: 38.7, h: 9.5, nose: 1.4, fin: 2.1, engines: 2, eng: 0.55, tip: "plain" }],
  [/E17|E19|Embraer/i, { m: 31.7, h: 9, nose: 1.25, fin: 2.1, engines: 2, eng: 0.5, tip: "winglet" }],
];
const fallback: Spec = { m: 40, h: 10.5, nose: 1.25, fin: 1.95, engines: 2, eng: 0.48, tip: "winglet" };

// Short type for tight spaces: "Boeing 777-300ER" → "777-300ER", "Embraer E175" → "E175".
export const shortAircraft = (name: string) => name.replace(/^(Boeing|Airbus|Embraer)\s+/i, "");

type Livery = {
  top: string;
  belly?: string;
  bellyAt?: number; // 0 = top of fuselage, 1 = bottom
  stripes?: [color: string, at: number, w: number][];
  engine: string;
  tail: (t: Tail) => ReactNode;
};
type Tail = { p: (u: number, v: number) => string; x: (u: number) => number; y: (v: number) => number; w: number; hgt: number };

const WHITE = "#f2f4f8";
const SILVER = "#c4cad3";

// Tail art. u runs rear → front of the fin, v top → base.
const liveries: [RegExp, Livery][] = [
  [/american/i, { top: SILVER, engine: SILVER, tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#c30019" />
    {[0.12, 0.32, 0.52, 0.72].map((u) => <rect key={u} x={t.x(u)} y={t.y(0.38)} width={t.w * 0.09} height={t.hgt} fill={WHITE} />)}
    <polygon points={`${t.p(0, 0)} ${t.p(1, 0)} ${t.p(1, 0.5)} ${t.p(0, 0.38)}`} fill="#0078d2" />
    <polygon points={`${t.p(0, 0)} ${t.p(0.55, 0)} ${t.p(0, 0.3)}`} fill="#36495a" />
  </>) }],
  [/united/i, { top: WHITE, belly: "#1f4fb0", bellyAt: 0.56, engine: "#1f4fb0", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#14295c" />
    <g fill="none" stroke="#9cc0f0" strokeWidth=".7">
      <circle cx={t.x(0.4)} cy={t.y(0.45)} r={t.hgt * 0.26} />
      <ellipse cx={t.x(0.4)} cy={t.y(0.45)} rx={t.hgt * 0.12} ry={t.hgt * 0.26} />
      <path d={`M${t.x(0.4) - t.hgt * 0.26} ${t.y(0.45)} H${t.x(0.4) + t.hgt * 0.26} M${t.x(0.4) - t.hgt * 0.22} ${t.y(0.33)} H${t.x(0.4) + t.hgt * 0.22} M${t.x(0.4) - t.hgt * 0.22} ${t.y(0.57)} H${t.x(0.4) + t.hgt * 0.22}`} />
    </g>
  </>) }],
  [/delta/i, { top: WHITE, belly: "#0b1f41", bellyAt: 0.6, engine: "#0b1f41", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#c8102e" />
    <rect x={t.x(0)} y={t.y(0.55)} width={t.w} height={t.hgt * 0.45} fill="#8a0c22" opacity=".7" />
    <polygon points={`${t.p(0.3, 0.32)} ${t.p(0.55, 0.62)} ${t.p(0.08, 0.62)}`} fill={WHITE} />
    <polygon points={`${t.p(0.3, 0.45)} ${t.p(0.42, 0.62)} ${t.p(0.3, 0.62)}`} fill="#8a0c22" />
  </>) }],
  [/\bana\b/i, { top: WHITE, stripes: [["#1d3c8f", 0.58, 0.1], ["#5ab4e6", 0.7, 0.07]], engine: WHITE, tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill={WHITE} />
    {[0.12, 0.33, 0.54].map((u) => <rect key={u} x={t.x(u)} y={t.y(0.42)} width={t.w * 0.15} height={t.hgt * 0.16} rx=".6" fill="#1d3c8f" />)}
    <rect x={t.x(0)} y={t.y(0.82)} width={t.w} height={t.hgt * 0.1} fill="#5ab4e6" />
  </>) }],
  [/korean/i, { top: "#8ec9ec", belly: "#e3e8ee", bellyAt: 0.52, engine: "#e3e8ee", tail: (t) => {
    const cx = t.x(0.4), cy = t.y(0.45), r = t.hgt * 0.22;
    return (<>
      <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill={WHITE} />
      <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z`} fill="#cd2e3a" />
      <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 0 ${cx + r} ${cy} Z`} fill="#0047a0" />
      <circle cx={cx - r / 2} cy={cy} r={r / 2} fill="#cd2e3a" />
      <circle cx={cx + r / 2} cy={cy} r={r / 2} fill="#0047a0" />
    </>);
  } }],
  [/jetblue/i, { top: WHITE, belly: "#003876", bellyAt: 0.58, engine: "#003876", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#003876" />
    {[0.15, 0.3, 0.45, 0.6, 0.75].map((v) => <rect key={v} x={t.x(0)} y={t.y(v)} width={t.w} height={t.hgt * 0.05} fill="#5aa0e6" />)}
  </>) }],
  [/emirates/i, { top: WHITE, engine: "#d9dde2", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt * 0.34} fill="#00843d" />
    <rect x={t.x(0)} y={t.y(0.34)} width={t.w} height={t.hgt * 0.32} fill={WHITE} />
    <rect x={t.x(0)} y={t.y(0.66)} width={t.w} height={t.hgt * 0.34} fill="#111" />
    <polygon points={`${t.p(0.45, 0)} ${t.p(1, 0)} ${t.p(1, 1)} ${t.p(0.7, 1)}`} fill="#d71921" />
  </>) }],
  [/vistara/i, { top: WHITE, belly: "#5c2d91", bellyAt: 0.74, engine: "#5c2d91", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#5c2d91" />
    <rect x={t.x(0.38) - t.hgt * 0.1} y={t.y(0.48) - t.hgt * 0.1} width={t.hgt * 0.2} height={t.hgt * 0.2} transform={`rotate(45 ${t.x(0.38)} ${t.y(0.48)})`} fill="none" stroke="#c9a45c" strokeWidth="1.1" />
  </>) }],
  [/air india/i, { top: WHITE, engine: "#7a1f5c", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt * 0.55} fill="#da0e29" />
    <rect x={t.x(0)} y={t.y(0.55)} width={t.w} height={t.hgt * 0.45} fill="#7a1f5c" />
    <rect x={t.x(0.2)} y={t.y(0.3)} width={t.w * 0.32} height={t.hgt * 0.36} rx={t.w * 0.16} fill="none" stroke="#d9b45a" strokeWidth=".9" />
  </>) }],
  [/icelandair/i, { top: WHITE, belly: "#003b72", bellyAt: 0.62, engine: "#003b72", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#003b72" />
    <polygon points={`${t.p(0, 0.66)} ${t.p(1, 0.5)} ${t.p(1, 0.62)} ${t.p(0, 0.78)}`} fill="#f8b51b" />
  </>) }],
  [/vueling/i, { top: WHITE, belly: "#d6d6d6", bellyAt: 0.66, engine: "#ffcc00", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#555" />
    <polygon points={`${t.p(0.15, 0.35)} ${t.p(1, 0.2)} ${t.p(1, 1)} ${t.p(0.3, 1)}`} fill="#ffcc00" />
  </>) }],
  [/alaska/i, { top: WHITE, stripes: [["#64ccc9", 0.68, 0.05]], engine: "#01426a", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#01426a" />
    <circle cx={t.x(0.42)} cy={t.y(0.48)} r={t.hgt * 0.22} fill="#e8dcc8" />
    <circle cx={t.x(0.42)} cy={t.y(0.5)} r={t.hgt * 0.13} fill="#c8946a" />
  </>) }],
  [/qantas/i, { top: WHITE, belly: SILVER, bellyAt: 0.62, engine: SILVER, tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#e0001b" />
    <path
      d={`M${t.p(0.62, 0.22)} Q${t.p(0.5, 0.3)} ${t.p(0.46, 0.45)} Q${t.p(0.3, 0.55)} ${t.p(0.08, 0.8)} Q${t.p(0.32, 0.66)} ${t.p(0.5, 0.62)} L${t.p(0.62, 0.78)} L${t.p(0.6, 0.5)} Q${t.p(0.66, 0.36)} ${t.p(0.62, 0.22)} Z`}
      fill={WHITE}
    />
  </>) }],
  [/singapore/i, { top: WHITE, stripes: [["#1d2b5e", 0.6, 0.07], ["#f0ab00", 0.68, 0.05]], engine: WHITE, tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#1d2b5e" />
    <path d={`M${t.p(0.15, 0.62)} Q${t.p(0.45, 0.3)} ${t.p(0.8, 0.35)} Q${t.p(0.5, 0.45)} ${t.p(0.35, 0.68)} Z`} fill="#f0ab00" />
  </>) }],
  [/aeromexico/i, { top: WHITE, belly: "#0b2240", bellyAt: 0.5, engine: "#0b2240", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#0b2240" />
    <path d={`M${t.p(0.25, 0.65)} Q${t.p(0.3, 0.3)} ${t.p(0.55, 0.32)} Q${t.p(0.62, 0.5)} ${t.p(0.48, 0.65)} Z`} fill="#c9d1dc" />
  </>) }],
  [/air canada/i, { top: WHITE, belly: "#1a1a1a", bellyAt: 0.62, engine: "#1a1a1a", tail: (t) => {
    const cx = t.x(0.4), cy = t.y(0.45), r = t.hgt * 0.2;
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
    }).join(" ");
    return (<>
      <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#161616" />
      <polygon points={pts} fill="#d22630" />
      <rect x={cx - 0.4} y={cy + r * 0.3} width=".8" height={r * 0.8} fill="#d22630" />
    </>);
  } }],
  [/latam/i, { top: WHITE, belly: "#1b0088", bellyAt: 0.7, engine: "#1b0088", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#1b0088" />
    <path d={`M${t.p(0, 0.75)} Q${t.p(0.5, 0.35)} ${t.p(1, 0.45)} L${t.p(1, 0.58)} Q${t.p(0.5, 0.5)} ${t.p(0, 0.9)} Z`} fill="#e8114b" />
  </>) }],
  [/british/i, { top: WHITE, belly: "#1a3a6e", bellyAt: 0.6, engine: "#1a3a6e", tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#1a3a6e" />
    <path d={`M${t.p(0, 0.35)} Q${t.p(0.5, 0.2)} ${t.p(1, 0.45)} L${t.p(1, 0.65)} Q${t.p(0.5, 0.4)} ${t.p(0, 0.55)} Z`} fill={WHITE} />
    <path d={`M${t.p(0, 0.42)} Q${t.p(0.5, 0.28)} ${t.p(1, 0.52)} L${t.p(1, 0.58)} Q${t.p(0.5, 0.34)} ${t.p(0, 0.48)} Z`} fill="#c8102e" />
  </>) }],
  [/air france/i, { top: WHITE, engine: WHITE, tail: (t) => (<>
    <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill={WHITE} />
    <polygon points={`${t.p(0, 0.3)} ${t.p(0.25, 0)} ${t.p(0.45, 0)} ${t.p(0, 0.55)}`} fill="#002157" />
    <polygon points={`${t.p(0, 0.62)} ${t.p(0.5, 0)} ${t.p(0.58, 0)} ${t.p(0, 0.72)}`} fill="#e4002b" />
  </>) }],
];
const plainLivery: Livery = { top: WHITE, belly: "#6474aa", bellyAt: 0.62, engine: "#c4cad3", tail: (t) => <rect x={t.x(0)} y={t.y(0)} width={t.w} height={t.hgt} fill="#6474aa" /> };

const W = 200, H = 64, CY = 40;
const f = (n: number) => +n.toFixed(2);

export default function AircraftArt({ aircraft, airline, className }: { aircraft: string; airline: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const s = specs.find(([re]) => re.test(aircraft))?.[1] ?? fallback;
  const liv = liveries.find(([re]) => re.test(airline))?.[1] ?? plainLivery;

  const L = Math.min(192, 90 + (s.m - 30) * 2.3), h = s.h;
  const x0 = (W - L) / 2, x1 = x0 + L, yT = CY - h / 2, yB = CY + h / 2;
  const nl = h * s.nose; // nose length
  const body = `M${f(x0)} ${f(yT + h * 0.18)} L${f(x0 + L * 0.17)} ${f(yT)} L${f(x1 - nl)} ${f(yT)} C${f(x1 - nl * 0.35)} ${f(yT)} ${f(x1)} ${f(CY - h * 0.05)} ${f(x1)} ${f(CY + h * 0.12)} C${f(x1)} ${f(yB - h * 0.1)} ${f(x1 - nl * 0.3)} ${f(yB)} ${f(x1 - nl)} ${f(yB)} L${f(x0 + L * 0.22)} ${f(yB)} L${f(x0)} ${f(yT + h * 0.42)} Z`;

  // Fin: swept back from the top of the fuselage.
  const th = h * s.fin, fx0 = x0 + L * 0.005, fx1 = x0 + L * 0.2, fy0 = yT - th, fy1 = yT + h * 0.18;
  const fin = `M${f(fx0)} ${f(fy1)} L${f(x0 + L * 0.015)} ${f(fy0)} L${f(x0 + L * (s.decks ? 0.065 : 0.075))} ${f(fy0)} L${f(fx1)} ${f(yT + 0.5)} Z`;
  const tail: Tail = { x: (u) => fx0 + u * (fx1 - fx0), y: (v) => fy0 + v * (fy1 - fy0), p: (u, v) => `${f(fx0 + u * (fx1 - fx0))},${f(fy0 + v * (fy1 - fy0))}`, w: fx1 - fx0, hgt: fy1 - fy0 };

  // Near wing, seen from slightly below: swept back and down toward us, with its wingtip device.
  const span = Math.min(1.05, 22 / h); // keeps the wing inside the frame on the big jets
  const tipX = x0 + L * 0.36, tipY = CY + h * span;
  const wing = `M${f(x0 + L * 0.6)} ${f(CY + h * 0.22)} L${f(x0 + L * 0.43)} ${f(CY + h * 0.36)} L${f(tipX - L * 0.015)} ${f(tipY)} L${f(tipX + L * 0.035)} ${f(tipY - h * 0.04)} Z`;
  const tip = { plain: "", fence: `M${f(tipX)} ${f(tipY - 1.6)} V${f(tipY + 1.4)}`, winglet: `M${f(tipX)} ${f(tipY)} l-1.2 -${f(h * 0.4)}`, sharklet: `M${f(tipX)} ${f(tipY)} q-0.4 -${f(h * 0.25)} -1.6 -${f(h * 0.42)}`, split: `M${f(tipX)} ${f(tipY)} l-1 -${f(h * 0.42)} M${f(tipX)} ${f(tipY)} l-1.2 ${f(h * 0.22)}` }[s.tip];

  // Engines under the wing: the far pair on an A380 sits further back and dimmer.
  const eh = h * s.eng, el = eh * (s.engines === 4 ? 2.6 : 2.2);
  const engine = (cx: number, cy: number) => (
    <g key={`${cx}`}>
      <rect x={f(cx - el / 2)} y={f(cy - eh / 2)} width={f(el)} height={f(eh)} rx={f(eh / 2)} fill={liv.engine} />
      <rect x={f(cx - el / 2)} y={f(cy - eh / 2)} width={f(el)} height={f(eh)} rx={f(eh / 2)} fill={`url(#shade-${id})`} />
      <ellipse cx={f(cx + el / 2 - eh * 0.12)} cy={f(cy)} rx={f(eh * 0.14)} ry={f(eh * 0.42)} fill="#1a2340" />
    </g>
  );
  // Along the wing's leading edge: the inboard pair just under the fuselage, an A380's outboard pair further out.
  const along = (k: number): [number, number] => [x0 + L * (0.6 - k * (0.6 - 0.395)) + el * 0.25, CY + h * (0.22 + k * (span - 0.22)) + eh * 0.55];
  const engines = (s.engines === 4 ? [0.3, 0.68] : [0.38]).map((k) => engine(...along(k)));

  // Lit cabin windows (two decks on an A380).
  const rows = s.decks ? [CY - h * 0.24, CY + h * 0.1] : [CY - h * 0.1];
  const windows = rows.flatMap((y, r) => {
    const out: ReactNode[] = [];
    for (let x = x0 + L * 0.23; x < x1 - nl * (r === 0 && s.decks ? 0.9 : 1.15); x += 2.6) out.push(<circle key={`${r}-${x}`} cx={f(x)} cy={f(y)} r=".55" />);
    return out;
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${aircraft} in ${airline} colours`} className={className}>
      <defs>
        <clipPath id={`body-${id}`}>
          <path d={body} />
        </clipPath>
        <clipPath id={`fin-${id}`}>
          <path d={fin} />
        </clipPath>
        <linearGradient id={`shade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#09102a" stopOpacity=".45" />
        </linearGradient>
      </defs>

      {/* Horizontal stabiliser, behind the fuselage */}
      <path d={`M${f(x0 + L * 0.01)} ${f(CY - h * 0.05)} L${f(x0 + L * 0.06)} ${f(CY - h * 0.12)} L${f(x0 + L * 0.16)} ${f(CY + h * 0.04)} Z`} fill="#9aa3b8" />

      <g clipPath={`url(#fin-${id})`}>{liv.tail(tail)}</g>
      <path d={fin} fill={`url(#shade-${id})`} opacity=".6" />

      <g clipPath={`url(#body-${id})`}>
        <rect x={x0} y={yT - 1} width={L} height={h + 2} fill={liv.top} />
        {liv.belly && <rect x={x0} y={yT + h * (liv.bellyAt ?? 0.6)} width={L} height={h} fill={liv.belly} />}
        {liv.stripes?.map(([c, at, w]) => <rect key={c} x={x0} y={yT + h * at} width={L} height={h * w} fill={c} />)}
        <rect x={x0} y={yT - 1} width={L} height={h + 2} fill={`url(#shade-${id})`} />
        <g fill="#e6ecfb" opacity=".85">{windows}</g>
        <path
          d={`M${f(x1 - nl * 0.62)} ${f(yT + h * 0.26)} L${f(x1 - nl * 0.36)} ${f(yT + h * 0.26)} L${f(x1 - nl * 0.24)} ${f(yT + h * 0.38)} L${f(x1 - nl * 0.62)} ${f(yT + h * 0.38)} Z`}
          fill="#1a2340"
        />
        {s.mask && <path d={`M${f(x1 - nl * 0.7)} ${f(yT + h * 0.22)} L${f(x1 - nl * 0.2)} ${f(yT + h * 0.22)} L${f(x1 - nl * 0.12)} ${f(yT + h * 0.42)} L${f(x1 - nl * 0.7)} ${f(yT + h * 0.42)} Z`} fill="#1a2340" />}
      </g>

      <path d={wing} fill="#aab3c4" />
      <path d={wing} fill={`url(#shade-${id})`} />
      <path d={`M${f(x0 + L * 0.6)} ${f(CY + h * 0.22)} L${f(tipX + L * 0.035)} ${f(tipY - h * 0.04)}`} stroke="#e6ecfb" strokeOpacity=".5" strokeWidth=".6" />
      {tip && <path d={tip} stroke="#b9c1d1" strokeWidth="1.2" strokeLinecap="round" fill="none" />}
      {engines}

      {/* Night lights: red beacon on the spine, white strobe on the tail. */}
      <circle cx={f(x0 + L * 0.55)} cy={f(yT - 0.6)} r="1.6" fill="#ff7a85" opacity=".35" />
      <circle cx={f(x0 + L * 0.55)} cy={f(yT - 0.6)} r=".7" fill="#ff7a85" />
      <circle cx={f(x0 + 0.6)} cy={f(yT + h * 0.3)} r=".8" fill="#fff" />
    </svg>
  );
}
