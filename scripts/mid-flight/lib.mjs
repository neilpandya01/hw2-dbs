// Shared helpers for the Mid Flight illustrations.

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
  black: "#05070f",
  navy: "#0b1330",
  seat: "#1a2752",
  seatHi: "#26386e",
  led: "#5b8cff",
  ledHi: "#9cc4ff",
  cyan: "#7fd3ff",
  violet: "#8b7cff",
  amber: "#ffc979",
  amberHi: "#fff1d6",
  muted: "#8a97b8",
};

export const blur = (id, sd) =>
  `<filter id="${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

// Film grain + vignette on every image — the biggest single step toward "photo".
export const svg = (w, h, body, { grain = 0.09, vignette = 0.55 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${grain} 0"/></filter>
  <radialGradient id="vignette" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vignette}"/></radialGradient>
</defs>
${body}
<rect width="${w}" height="${h}" fill="url(#vignette)"/>
<rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>
`;

export function stars(r, n, x0, y0, w, h, color = "#dfe8ff") {
  let s = "";
  for (let i = 0; i < n; i++) {
    const rad = 0.3 + r() ** 3 * 1.4;
    s += `<circle cx="${f(x0 + r() * w)}" cy="${f(y0 + r() * h)}" r="${f(rad)}" fill="${color}" opacity="${f(0.25 + r() * 0.75)}"/>`;
  }
  return s;
}

// A realistic airplane window set in the cabin sidewall: plastic bezel,
// deep reveal (thickness), shade track, glass vignette, and the breather hole.
// `view` is drawn in image coordinates and clipped to the glass.
export function windowFrame(w, h, view, { ww, wh, cx = w / 2, cy = h / 2, shade = 0 } = {}) {
  const gx = cx - ww / 2, gy = cy - wh / 2, grx = Math.min(ww, wh) / 2 - 2;
  const pad = Math.min(ww, wh) * 0.2;
  return `
  <defs>
    <linearGradient id="wfWall" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#1b2547"/><stop offset=".6" stop-color="#0f1630"/><stop offset="1" stop-color="#070b1a"/></linearGradient>
    <radialGradient id="wfLed" cx=".5" cy="0" r=".8"><stop offset="0" stop-color="${C.led}" stop-opacity=".35"/><stop offset="1" stop-color="${C.led}" stop-opacity="0"/></radialGradient>
    <linearGradient id="wfBezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34416f"/><stop offset=".5" stop-color="#1c2650"/><stop offset="1" stop-color="#0e1430"/></linearGradient>
    <linearGradient id="wfReveal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#05081a"/><stop offset=".7" stop-color="#121a3c"/><stop offset="1" stop-color="#2a3666"/></linearGradient>
    <radialGradient id="wfGlassVig" cx=".5" cy=".5" r=".6"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
    <linearGradient id="wfShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3458"/><stop offset="1" stop-color="#3a4570"/></linearGradient>
    <clipPath id="wfGlass"><rect x="${f(gx)}" y="${f(gy)}" width="${f(ww)}" height="${f(wh)}" rx="${f(grx)}"/></clipPath>
    <filter id="wfSoft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wfWall)"/>
  <rect width="${w}" height="${h}" fill="url(#wfLed)"/>
  <rect x="${f(gx - pad - 6)}" y="${f(gy - pad + 4)}" width="${f(ww + pad * 2 + 12)}" height="${f(wh + pad * 2 + 6)}" rx="${f(grx + pad + 6)}" fill="#000" opacity=".45" filter="url(#wfSoft)"/>
  <rect x="${f(gx - pad)}" y="${f(gy - pad)}" width="${f(ww + pad * 2)}" height="${f(wh + pad * 2)}" rx="${f(grx + pad)}" fill="url(#wfBezel)"/>
  <rect x="${f(gx - pad + 2)}" y="${f(gy - pad + 2)}" width="${f(ww + pad * 2 - 4)}" height="${f(wh + pad * 2 - 4)}" rx="${f(grx + pad - 2)}" fill="none" stroke="${C.ledHi}" stroke-opacity=".18" stroke-width="2"/>
  <rect x="${f(gx - pad * 0.45)}" y="${f(gy - pad * 0.45)}" width="${f(ww + pad * 0.9)}" height="${f(wh + pad * 0.9)}" rx="${f(grx + pad * 0.45)}" fill="url(#wfReveal)"/>
  <g clip-path="url(#wfGlass)">
    ${view}
    ${shade > 0 ? `<rect x="${f(gx)}" y="${f(gy)}" width="${f(ww)}" height="${f(wh * shade)}" fill="url(#wfShade)"/><rect x="${f(gx)}" y="${f(gy + wh * shade - 7)}" width="${f(ww)}" height="7" fill="#4a5585"/><rect x="${f(cx - 18)}" y="${f(gy + wh * shade - 5)}" width="36" height="4" rx="2" fill="#6a76a8"/>` : ""}
    <rect x="${f(gx)}" y="${f(gy)}" width="${f(ww)}" height="${f(wh)}" fill="url(#wfGlassVig)"/>
    <path d="M${f(gx - 20)} ${f(gy + wh * 0.8)} L${f(gx + ww * 0.75)} ${f(gy - 20)}" stroke="#fff" stroke-opacity=".045" stroke-width="${f(ww * 0.18)}"/>
  </g>
  <rect x="${f(gx)}" y="${f(gy)}" width="${f(ww)}" height="${f(wh)}" rx="${f(grx)}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="3"/>
  <circle cx="${f(cx)}" cy="${f(gy + wh - 16)}" r="2" fill="#000" stroke="${C.ledHi}" stroke-opacity=".35"/>`;
}

// One seat back seen from behind, with headrest cover, optional screen and head.
// (x, top) is its top-left; s is perspective scale.
export function seatBack(x, top, sw, sh, s, { screen = null, head = false, headTilt = 0, topFace = 0, fill = "url(#seatG)" } = {}) {
  let out = "";
  if (head) {
    const hx = x + sw / 2, hy = top + 2 * s;
    out += `<g transform="rotate(${f(headTilt)} ${f(hx)} ${f(hy + 30 * s)})"><ellipse cx="${f(hx)}" cy="${f(hy)}" rx="${f(sw * 0.22)}" ry="${f(sw * 0.26)}" fill="#04060d"/><path d="M${f(hx - sw * 0.2)} ${f(hy - sw * 0.06)} a${f(sw * 0.2)} ${f(sw * 0.24)} 0 0 1 ${f(sw * 0.4)} 0" fill="none" stroke="${C.ledHi}" stroke-opacity=".35" stroke-width="${f(Math.max(0.5, 1.5 * s))}"/></g>`;
  }
  if (topFace > 0) out += `<rect x="${f(x + 3 * s)}" y="${f(top - topFace)}" width="${f(sw - 6 * s)}" height="${f(topFace + 8 * s)}" rx="${f(10 * s)}" fill="#2b3d78"/>`;
  out += `<rect x="${f(x)}" y="${f(top)}" width="${f(sw)}" height="${f(sh)}" rx="${f(14 * s)}" fill="${fill}"/>`;
  out += `<rect x="${f(x + sw * 0.1)}" y="${f(top + 5 * s)}" width="${f(sw * 0.8)}" height="${f(sh * 0.2)}" rx="${f(8 * s)}" fill="#2a3a72" opacity=".9"/>`;
  out += `<rect x="${f(x + 8 * s)}" y="${f(top)}" width="${f(sw - 16 * s)}" height="${f(Math.max(0.8, 2.2 * s))}" rx="1" fill="${C.ledHi}" opacity=".5"/>`;
  const sx = x + sw * 0.22, sy = top + sh * 0.3, scw = sw * 0.56, sch = sw * 0.36;
  if (screen) {
    out += `<rect x="${f(sx - 8 * s)}" y="${f(sy - 8 * s)}" width="${f(scw + 16 * s)}" height="${f(sch + 16 * s)}" rx="${f(6 * s)}" fill="${screen}" opacity=".35" filter="url(#b6)"/>`;
    out += `<rect x="${f(sx)}" y="${f(sy)}" width="${f(scw)}" height="${f(sch)}" rx="${f(2 * s)}" fill="${screen}" opacity=".85"/>`;
  } else {
    out += `<rect x="${f(sx)}" y="${f(sy)}" width="${f(scw)}" height="${f(sch)}" rx="${f(2 * s)}" fill="#04070f" stroke="#1f2b55" stroke-width="${f(Math.max(0.4, s))}"/>`;
  }
  return out;
}

export const seatDefs = `<linearGradient id="seatG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b5a"/><stop offset=".6" stop-color="#111a3a"/><stop offset="1" stop-color="#070b1a"/></linearGradient>`;
