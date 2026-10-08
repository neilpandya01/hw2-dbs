// Shared helpers for the Process Through the Airport illustrations.
// The opposite of both earlier moods: no glow, no grain, no gradients, no soft
// light. Flat color, hard edges, thick strokes, big bold type, and a strict
// signage palette — sign black, signal yellow, white, and status colors that
// each mean one thing (green boarding, amber delayed, red stop/cancelled).

// Seeded RNG so images are stable between runs.
export function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const f = (n) => +n.toFixed(1);

export const C = {
  // Signs and type
  sign: "#111214", // sign panel black
  board: "#1b1d21", // flap board housing
  flap: "#26292e", // a single flap tile
  flapLo: "#1f2226", // lower half of a flap, a shade darker
  yellow: "#ffcc00", // signal yellow: wayfinding text, floor lines, the one loud color
  yellowLo: "#e0b000",
  white: "#ffffff",
  // The building
  steel: "#8b9096", // brushed steel, stanchions, frames
  steelLo: "#5f646b",
  steelHi: "#c4c8cc",
  concrete: "#d8d6d0", // terminal floor / wall
  concreteLo: "#bdbab3",
  floor: "#ecebe7", // light terraz­zo floor, the page ground
  glass: "#a9c3cf", // curtain wall glass by day
  glassLo: "#7d9eae",
  asphalt: "#3a3d42", // apron and roads
  asphaltLo: "#2c2f33",
  // Status — each color has exactly one meaning
  green: "#1f9d55", // boarding / go / on time
  amber: "#ff8a00", // delayed / gate change / caution
  red: "#e0322b", // cancelled / stop / runway
  blue: "#1d5fd1", // information / arrivals
  // Small extras for objects
  orange: "#ff6a13", // hi-vis vests, marshalling wands
  skin: "#c98f6b",
  skinLo: "#a8714f",
};

// System fonts only: an SVG inside <img> can't use the page's web fonts.
// Helvetica/Arial is the real airport sign face, so the fallback is on brand.
export const SANS = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', 'Nimbus Sans', sans-serif`;
export const COND = `'Helvetica Neue Condensed', 'Arial Narrow', 'Liberation Sans Narrow', 'Nimbus Sans Narrow', 'Roboto Condensed', Arial, sans-serif`;
export const MONO = `'SF Mono', Menlo, Consolas, 'DejaVu Sans Mono', 'Liberation Mono', monospace`;

// Text. `len` pins the rendered width (textLength) so a fallback font can't overflow a sign.
export const t = (x, y, s, { size = 20, weight = 700, fill = C.white, anchor = "start", font = SANS, ls = 0, len, o = 1, extra = "" } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls ? ` letter-spacing="${ls}"` : ""}${len ? ` textLength="${f(len)}" lengthAdjust="spacingAndGlyphs"` : ""}${o < 1 ? ` opacity="${o}"` : ""}${extra}>${s}</text>`;

export const rect = (x, y, w, h, fill, { r = 0, stroke, sw = 0, o = 1 } = {}) =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"${r ? ` rx="${r}"` : ""} fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}${o < 1 ? ` opacity="${o}"` : ""}/>`;

export const line = (x1, y1, x2, y2, color = C.sign, w = 2, { o = 1, cap = "butt", dash } = {}) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ""}${o < 1 ? ` opacity="${o}"` : ""}/>`;

// Every image: a flat ground. No vignette, no grain, no light wash.
export const svg = (w, h, body, { bg = C.floor } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="${bg}"/>
${body}
</svg>
`;

// ---------- Pictograms ----------
// Each draws in a 100×100 box (thick, flat, rounded like the AIGA/DOT set).
// `c` is the ink, `bg` is the color of cut-outs (usually the sign panel).
const P = {
  // Airplane, top view, nose up.
  plane: (c) =>
    `<path d="M50 4 C55 4 57 11 57 19 L57 37 L94 58 L94 67 L57 57 L57 77 L69 87 L69 94 L50 89 L31 94 L31 87 L43 77 L43 57 L6 67 L6 58 L43 37 L43 19 C43 11 45 4 50 4 Z" fill="${c}"/>`,
  departures: (c) => `<g transform="rotate(45 50 50)">${P.plane(c)}</g>`,
  arrivals: (c) => `<g transform="translate(4 -6) scale(.9) rotate(135 50 50)">${P.plane(c)}</g><rect x="6" y="88" width="88" height="7" rx="2" fill="${c}"/>`,
  man: (c) =>
    `<circle cx="50" cy="13" r="9.5" fill="${c}"/><rect x="35" y="26" width="30" height="36" rx="7" fill="${c}"/><rect x="25" y="27" width="8" height="32" rx="4" fill="${c}"/><rect x="67" y="27" width="8" height="32" rx="4" fill="${c}"/><rect x="37" y="56" width="11" height="40" rx="4" fill="${c}"/><rect x="52" y="56" width="11" height="40" rx="4" fill="${c}"/>`,
  woman: (c) =>
    `<circle cx="50" cy="13" r="9.5" fill="${c}"/><path d="M40 26 L60 26 Q66 26 67 32 L76 70 L24 70 L33 32 Q34 26 40 26 Z" fill="${c}"/><rect x="22" y="28" width="8" height="28" rx="4" transform="rotate(14 26 28)" fill="${c}"/><rect x="70" y="28" width="8" height="28" rx="4" transform="rotate(-14 74 28)" fill="${c}"/><rect x="39" y="66" width="9" height="30" rx="4" fill="${c}"/><rect x="52" y="66" width="9" height="30" rx="4" fill="${c}"/>`,
  toilets: (c) =>
    `<g transform="translate(2 4) scale(.46 .92)">${P.man(c)}</g><rect x="48.5" y="4" width="3" height="92" fill="${c}"/><g transform="translate(52 4) scale(.46 .92)">${P.woman(c)}</g>`,
  coffee: (c) =>
    `<path d="M22 38 L72 38 L68 74 Q66 84 56 84 L38 84 Q28 84 26 74 Z" fill="${c}"/><circle cx="73" cy="53" r="10" fill="none" stroke="${c}" stroke-width="6"/><rect x="14" y="88" width="70" height="7" rx="3.5" fill="${c}"/><path d="M36 30 Q30 22 36 14 Q42 6 36 -2 M52 30 Q46 22 52 14 Q58 6 52 -2" transform="translate(0 2)" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`,
  baggage: (c, bg) =>
    `<path d="M38 30 V18 Q38 14 42 14 H58 Q62 14 62 18 V30" fill="none" stroke="${c}" stroke-width="7"/><rect x="16" y="30" width="68" height="56" rx="7" fill="${c}"/><rect x="31" y="30" width="5" height="56" fill="${bg}"/><rect x="64" y="30" width="5" height="56" fill="${bg}"/><rect x="24" y="86" width="10" height="8" rx="2" fill="${c}"/><rect x="66" y="86" width="10" height="8" rx="2" fill="${c}"/>`,
  baggageClaim: (c, bg) =>
    `<g transform="translate(20 0) scale(.6)">${P.baggage(c, bg)}</g><rect x="4" y="66" width="92" height="14" rx="7" fill="${c}"/><circle cx="14" cy="73" r="3" fill="${bg}"/><circle cx="32" cy="73" r="3" fill="${bg}"/><circle cx="50" cy="73" r="3" fill="${bg}"/><circle cx="68" cy="73" r="3" fill="${bg}"/><circle cx="86" cy="73" r="3" fill="${bg}"/><rect x="14" y="80" width="8" height="16" fill="${c}"/><rect x="78" y="80" width="8" height="16" fill="${c}"/>`,
  info: (c) =>
    `<circle cx="50" cy="16" r="10" fill="${c}"/><path d="M34 34 H58 V82 H68 V94 H32 V82 H42 V46 H34 Z" fill="${c}"/>`,
  taxi: (c, bg) =>
    `<rect x="38" y="6" width="24" height="11" rx="2" fill="${c}"/><path d="M26 54 L33 30 Q35 22 43 22 H57 Q65 22 67 30 L74 54 Z" fill="${c}"/><path d="M33 52 L38 34 Q39 30 43 30 H57 Q61 30 62 34 L67 52 Z" fill="${bg}"/><rect x="12" y="50" width="76" height="28" rx="7" fill="${c}"/><circle cx="25" cy="64" r="6" fill="${bg}"/><circle cx="75" cy="64" r="6" fill="${bg}"/><rect x="38" y="66" width="24" height="5" rx="2" fill="${bg}"/><rect x="16" y="76" width="16" height="16" rx="3" fill="${c}"/><rect x="68" y="76" width="16" height="16" rx="3" fill="${c}"/>`,
  train: (c, bg) =>
    `<rect x="22" y="4" width="56" height="74" rx="14" fill="${c}"/><rect x="31" y="15" width="38" height="26" rx="4" fill="${bg}"/><circle cx="35" cy="62" r="6" fill="${bg}"/><circle cx="65" cy="62" r="6" fill="${bg}"/><path d="M34 80 L20 96 M66 80 L80 96" stroke="${c}" stroke-width="7" stroke-linecap="round"/><path d="M27 90 H73" stroke="${c}" stroke-width="5"/>`,
  bus: (c, bg) =>
    `<rect x="16" y="8" width="68" height="74" rx="10" fill="${c}"/><rect x="24" y="18" width="52" height="30" rx="3" fill="${bg}"/><circle cx="30" cy="64" r="6" fill="${bg}"/><circle cx="70" cy="64" r="6" fill="${bg}"/><rect x="22" y="80" width="14" height="14" rx="3" fill="${c}"/><rect x="64" y="80" width="14" height="14" rx="3" fill="${c}"/>`,
  food: (c) =>
    `<path d="M26 6 V36 Q26 46 34 48 V94 H42 V48 Q50 46 50 36 V6 H44 V32 H41 V6 H35 V32 H32 V6 Z" fill="${c}"/><path d="M70 6 Q58 16 58 44 L62 54 H66 V94 H74 V6 Z" fill="${c}"/>`,
  shop: (c, bg) =>
    `<path d="M38 32 V24 Q38 12 50 12 Q62 12 62 24 V32" fill="none" stroke="${c}" stroke-width="6"/><path d="M18 30 H82 L88 92 H12 Z" fill="${c}"/><circle cx="38" cy="44" r="4" fill="${bg}"/><circle cx="62" cy="44" r="4" fill="${bg}"/>`,
  elevator: (c, bg) =>
    `<rect x="16" y="4" width="68" height="92" rx="5" fill="${c}"/><rect x="24" y="12" width="52" height="76" fill="${bg}"/><path d="M50 22 L64 40 H36 Z M50 78 L36 60 H64 Z" fill="${c}"/>`,
  stairs: (c) => `<path d="M6 94 V76 H28 V58 H50 V40 H72 V22 H94 V94 Z" fill="${c}"/>`,
  passport: (c, bg) =>
    `<rect x="20" y="6" width="60" height="88" rx="6" fill="${c}"/><circle cx="50" cy="44" r="17" fill="none" stroke="${bg}" stroke-width="4"/><path d="M33 44 H67 M50 27 Q38 44 50 61 Q62 44 50 27" fill="none" stroke="${bg}" stroke-width="3"/><rect x="34" y="72" width="32" height="5" rx="2" fill="${bg}"/>`,
  wifi: (c) =>
    `<path d="M10 40 Q50 4 90 40 M24 54 Q50 30 76 54 M38 68 Q50 58 62 68" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/><circle cx="50" cy="84" r="8" fill="${c}"/>`,
  plug: (c) =>
    `<rect x="34" y="6" width="8" height="22" rx="3" fill="${c}"/><rect x="58" y="6" width="8" height="22" rx="3" fill="${c}"/><path d="M24 28 H76 V48 Q76 68 56 70 V94 H44 V70 Q24 68 24 48 Z" fill="${c}"/>`,
  seat: (c) =>
    `<rect x="30" y="8" width="22" height="58" rx="8" fill="${c}"/><rect x="30" y="52" width="48" height="16" rx="6" fill="${c}"/><rect x="40" y="68" width="8" height="26" fill="${c}"/><rect x="26" y="88" width="60" height="7" rx="3" fill="${c}"/>`,
  laptop: (c, bg) =>
    `<rect x="18" y="16" width="64" height="46" rx="4" fill="${c}"/><rect x="25" y="23" width="50" height="32" fill="${bg}"/><path d="M8 68 H92 L86 80 H14 Z" fill="${c}"/>`,
  liquids: (c, bg) =>
    `<rect x="12" y="20" width="76" height="72" rx="6" fill="none" stroke="${c}" stroke-width="5"/><path d="M12 32 H88" stroke="${c}" stroke-width="4"/><rect x="24" y="48" width="14" height="34" rx="4" fill="${c}"/><rect x="27" y="40" width="8" height="9" fill="${c}"/><rect x="44" y="56" width="16" height="26" rx="6" fill="${c}"/><rect x="66" y="44" width="12" height="38" rx="3" fill="${c}"/><rect x="68" y="38" width="8" height="7" fill="${c}"/>`,
  clock: (c) =>
    `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="8"/><path d="M50 22 V50 L68 62" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
  wheelchair: (c) =>
    `<circle cx="38" cy="12" r="9" fill="${c}"/><path d="M33 26 V56 H62 L72 84" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 40 H56" stroke="${c}" stroke-width="8" stroke-linecap="round"/><path d="M24 48 A24 24 0 1 0 62 74" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  exit: (c) =>
    `<circle cx="58" cy="12" r="9" fill="${c}"/><path d="M52 26 L38 56 L18 64 M52 26 L70 46 L86 46 M44 46 L62 66 L58 94 M40 58 L28 94" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  noSmoking: (c, bg) =>
    `<circle cx="50" cy="50" r="42" fill="none" stroke="${C.red}" stroke-width="8"/><rect x="18" y="46" width="52" height="10" fill="${c}"/><rect x="72" y="46" width="8" height="10" fill="${c}"/><path d="M21 21 L79 79" stroke="${C.red}" stroke-width="8"/>`,
  security: (c, bg) =>
    `<path d="M50 4 L86 16 V46 Q86 78 50 96 Q14 78 14 46 V16 Z" fill="${c}"/><path d="M32 50 L46 64 L70 36" fill="none" stroke="${bg}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
};

export const picto = (name, x, y, size, c = C.white, bg = C.sign) =>
  `<g transform="translate(${f(x)} ${f(y)}) scale(${f(size / 100 * 1000) / 1000})">${P[name](c, bg)}</g>`;
export const PICTOS = Object.keys(P);

// The transport-style arrow (straight shaft, 45° head), pointing right by default.
// dir in degrees: 0 right, -90 up, 90 down, 180 left, -45 up-right…
export const arrow = (x, y, size, dir = 0, c = C.white) =>
  `<g transform="translate(${f(x)} ${f(y)}) scale(${f(size / 100 * 1000) / 1000}) rotate(${dir} 50 50)"><path d="M8 41 H60 L38 19 H60 L91 50 L60 81 H38 L60 59 H8 Z" fill="${c}"/></g>`;

// A sign panel: black, nearly square corners.
export const panel = (x, y, w, h, fill = C.sign, r = 3) => rect(x, y, w, h, fill, { r });

// ---------- Split-flap ----------
// One flap tile: two halves, a hairline split, a character centered across it.
export const flap = (x, y, w, h, ch, { color = C.white, bg = C.flap, size } = {}) => {
  const fs = size !== undefined ? size : h * 0.78;
  return `<g>${rect(x, y, w, h / 2, bg, { r: 1.5 })}${rect(x, y + h / 2, w, h / 2, C.flapLo, { r: 1.5 })}${ch && ch !== " " ? t(x + w / 2, y + h * 0.5 + fs * 0.36, ch, { size: fs, weight: 700, fill: color, anchor: "middle", font: SANS }) : ""}${line(x, y + h / 2, x + w, y + h / 2, "#0b0c0e", Math.max(1, h * 0.045))}</g>`;
};
export const flapRow = (x, y, s, w, h, gap = 2, opts = {}) =>
  [...s].map((ch, i) => flap(x + i * (w + gap), y, w, h, ch, opts)).join("");

// ---------- Seven-segment digits (scales, clocks, countdowns) ----------
const SEG = {
  0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g", " ": "",
};
export const seg7 = (x, y, ch, h, on = C.red, off) => {
  const w = h * 0.55, s = h * 0.12, g = s * 0.18, k = s / 2;
  const hz = (yc) => { const x1 = x + k + g, x2 = x + w - k - g; return `M${f(x1)} ${f(yc)} L${f(x1 + k)} ${f(yc - k)} L${f(x2 - k)} ${f(yc - k)} L${f(x2)} ${f(yc)} L${f(x2 - k)} ${f(yc + k)} L${f(x1 + k)} ${f(yc + k)} Z`; };
  const vt = (xc, y1, y2) => `M${f(xc)} ${f(y1)} L${f(xc + k)} ${f(y1 + k)} L${f(xc + k)} ${f(y2 - k)} L${f(xc)} ${f(y2)} L${f(xc - k)} ${f(y2 - k)} L${f(xc - k)} ${f(y1 + k)} Z`;
  const top = y + k + g, mid = y + h / 2, bot = y + h - k - g;
  const d = {
    a: hz(y + k), g: hz(mid), d: hz(y + h - k),
    f: vt(x + k, top, mid - g), b: vt(x + w - k, top, mid - g), e: vt(x + k, mid + g, bot), c: vt(x + w - k, mid + g, bot),
  };
  const lit = SEG[ch] || "";
  return Object.entries(d)
    .map(([k2, p]) => (lit.includes(k2) ? `<path d="${p}" fill="${on}"/>` : off ? `<path d="${p}" fill="${off}"/>` : ""))
    .join("");
};
// A row of digits. "." becomes a dot after the previous digit; ":" a narrow colon.
export const seg7Row = (x, y, s, h, on = C.red, off, gap = h * 0.2) => {
  const w = h * 0.55, d = h * 0.12;
  let out = "", cx = x;
  for (const ch of s) {
    if (ch === ".") { out += rect(cx - gap * 0.5 - d / 2 - 1, y + h - d, d, d, on); continue; }
    if (ch === ":") { out += rect(cx, y + h * 0.28, d, d, on) + rect(cx, y + h * 0.64, d, d, on); cx += d + gap; continue; }
    out += seg7(cx, y, ch, h, on, off);
    cx += w + gap;
  }
  return out;
};

// ---------- Patterns ----------
// Diagonal hazard stripes clipped to a box.
export const hazard = (id, x, y, w, h, a = C.yellow, b = C.sign, band = 18) => {
  let s = "";
  for (let i = -h; i < w + h; i += band * 2) s += `<path d="M${f(x + i)} ${f(y + h)} L${f(x + i + h)} ${f(y)} L${f(x + i + h + band)} ${f(y)} L${f(x + i + band)} ${f(y + h)} Z" fill="${b}"/>`;
  return `<clipPath id="${id}"><rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"/></clipPath>${rect(x, y, w, h, a)}<g clip-path="url(#${id})">${s}</g>`;
};

// A 1D barcode from a seed.
export const barcode = (x, y, w, h, seed = 1, c = C.sign) => {
  const r = rng(seed);
  let s = "", cx = x;
  while (cx < x + w - 2) {
    const bw = [1, 1, 2, 3][Math.floor(r() * 4)] * (w / 140);
    if (r() > 0.3) s += rect(cx, y, bw, h, c);
    cx += bw + (w / 140) * (1 + Math.floor(r() * 2));
  }
  return s;
};

// ---------- Point of view ----------
// A one-point-perspective camera at a traveler's eye height, so scenes can be
// drawn as you'd actually see them walking through. World units are meters:
// x to the right, y up from the floor, z away from you.
export const cam = ({ vx, vy, fl, eye = 1.6 }) => {
  const k = (z) => fl / z; // pixels per meter at depth z
  const p = (x, y, z) => [vx + (fl * x) / z, vy + (fl * (eye - y)) / z];
  const poly = (pts, fill, extra = "") =>
    `<path d="M${pts.map(([x, y, z]) => p(x, y, z).map(f).join(" ")).join(" L")} Z" fill="${fill}"${extra}/>`;
  // Place content drawn at `unit` px per meter with its top-left at world (x, y, z), facing you.
  const place = (x, y, z, unit, content) => {
    const [sx, sy] = p(x, y, z);
    return `<g transform="translate(${f(sx)} ${f(sy)}) scale(${(k(z) / unit).toFixed(4)})">${content}</g>`;
  };
  // A pictogram person ~1.75 m tall standing at (x, z).
  const person = (x, z, name = "man", c = C.sign) => place(x - 0.9, 1.8, z, 100 / 1.8, P[name](c, C.sign));
  return { k, p, poly, place, person };
};
