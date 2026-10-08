// Shared helpers for the First Suite illustrations.
// The look is the opposite of Mid Flight: bright, airy, flat warm planes,
// hairline brass lines, lots of empty space, almost no shadow — with small
// doses of bordeaux, cognac, sage, slate and rose on the objects themselves.

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
  // Neutrals: the ground stays light; mid-tones are a step deeper so objects have weight.
  ivory: "#fbf8f2", // brightest surface: linen, paper
  cream: "#f4eee4", // warm off-white page
  sand: "#e6dccb", // shaded off-white
  champagne: "#dcc7a4", // champagne beige panels, leather
  champagneLo: "#c8ae86",
  taupe: "#a49180", // soft taupe: upholstery, shadow side
  taupeLo: "#857462",
  brass: "#a8844f", // brushed brass trim, thin lines
  brassHi: "#d4b98a",
  brassLo: "#7d5f33",
  walnut: "#6b4a36", // wood veneer
  espresso: "#3b2a20", // text, darkest accent
  // Accent colors: each comes from a real thing in the suite, used in small, deliberate doses.
  wine: "#6e2a34", // bordeaux: the sommelier pour, ribbons, foil
  wineHi: "#a65a69",
  cognac: "#9c5b34", // cognac leather: amenity kit, lounge chair, ticket wallet
  cognacHi: "#c98a5e",
  sage: "#7c8a6a", // orchid leaves, plants, a folded towel
  sageLo: "#55644a",
  slate: "#3e4c5e", // ink blue: passport, pajama piping, screen accents
  slateHi: "#8494a8",
  rose: "#c39a92", // dusty rose: napkin, throw, eye mask
  roseHi: "#e3c6bf",
  sky: "#d3dfe6", // daylight sky through the window
};

export const SERIF = `'Cormorant Garamond', 'Cormorant', Georgia, 'Times New Roman', serif`;
export const SANS = `Jost, Futura, 'Century Gothic', 'Avenir Next', Helvetica, Arial, sans-serif`;

export const blur = (id, sd) =>
  `<filter id="${id}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

// A material texture (linen weave, leather grain, brushed metal) clipped to the shape it's applied to.
// freq can be "x y" for directional grain; rgb 0–1; alpha is strength.
export const texture = (id, freq, rgb, alpha, seed = 1, octaves = 3) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" seed="${seed}" result="n"/><feColorMatrix in="n" result="c" values="0 0 0 0 ${rgb[0]}  0 0 0 0 ${rgb[1]}  0 0 0 0 ${rgb[2]}  0 0 0 ${alpha} 0"/><feComposite in="c" in2="SourceGraphic" operator="in"/></filter>`;

// The only "shadow" allowed: a faint, soft contact line where an object meets a surface.
export const contact = (cx, cy, rx, ry = 4, opacity = 0.1) =>
  `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${C.espresso}" opacity="${opacity}" filter="url(#soft)"/>`;

// A hairline: the main drawing tool of this mood.
export const line = (x1, y1, x2, y2, { color = C.brass, w = 1, o = 1 } = {}) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-opacity="${o}"/>`;

// Every image: an ivory ground, a faint warm daylight wash, a whisper of paper grain. No vignette.
export const svg = (w, h, body, { bg = C.cream, grain = 0.035, light = true } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .23  0 0 0 0 .16  0 0 0 0 .12  0 0 0 ${grain} 0"/></filter>
  <radialGradient id="daylight" cx=".3" cy="0" r="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  ${blur("soft", 5)}
</defs>
<rect width="${w}" height="${h}" fill="${bg}"/>
${body}
${light ? `<rect width="${w}" height="${h}" fill="url(#daylight)"/>` : ""}
<rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>
`;
