// Security and the walk to the gates: the queue maze, the instructions, the
// tray, the footprints, the sign family, the overhead signs, the floor line,
// the moving walkway, the hall clock.
import { f, rng, C, t, rect, line, svg, picto, arrow, panel, hazard } from "./lib.mjs";

export const scenes = {};

// A person seen from directly above: shoulders and a head.
const topPerson = (x, y, rot, coat) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="-17" y="-9" width="34" height="18" rx="9" fill="${coat}"/><circle cx="0" cy="0" r="8" fill="${C.sign}"/></g>`;

// 11. The security instructions sign.
{
  const W = 760, H = 440;
  const items = [
    ["laptop", "Laptops", "out of bags"],
    ["liquids", "Liquids", "in a clear bag"],
    ["baggage", "Bags", "one per tray"],
    ["passport", "Passport", "in your hand"],
  ];
  let s = "";
  items.forEach(([pic, a, b], i) => {
    const x = 40 + i * 172;
    s += rect(x, 140, 148, 148, C.white, { r: 4 }) + picto(pic, x + 22, 162, 104, C.sign, C.white);
    s += t(x, 326, a, { size: 24 }) + t(x, 352, b, { size: 16, weight: 400, fill: C.steelHi });
  });
  scenes["security-sign.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, H, C.concrete)}
    ${rect(160, 0, 6, 30, C.steelLo)}${rect(594, 0, 6, 30, C.steelLo)}
    ${panel(16, 30, W - 32, 390)}
    ${rect(16, 30, W - 32, 80, C.yellow, { r: 3 })}${rect(16, 100, W - 32, 10, C.yellow)}
    ${picto("security", 40, 44, 52, C.sign, C.yellow)}
    ${t(108, 86, "Before you reach the belt", { size: 30, fill: C.sign, len: 380 })}
    ${t(W - 40, 86, "1 / 2", { size: 20, fill: C.sign, anchor: "end", weight: 400 })}
    ${s}
    ${rect(40, 378, W - 80, 2, C.steelLo)}
    ${t(40, 404, "Belts, jackets and metal items go in the tray too.", { size: 15, weight: 400, fill: C.steelHi })}`,
  );
}

// 12. A security tray from above: laptop, liquids bag, shoes, keys, a coiled belt.
{
  const W = 640, H = 480;
  let rollers = "";
  for (let y = 0; y < H; y += 26) rollers += rect(0, y, W, 16, C.steelHi) + rect(0, y + 16, W, 10, C.steel);
  // a shoe from above: sole outline, upper, laces
  const shoe = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M0 -62 C22 -62 30 -40 28 -10 C26 22 24 52 10 62 C2 66 -10 66 -16 60 C-28 46 -28 10 -26 -18 C-24 -46 -18 -62 0 -62 Z" fill="${C.white}" stroke="${C.sign}" stroke-width="4"/>
    <path d="M-14 -30 C-10 -50 14 -50 18 -30 L16 18 C8 26 -10 26 -16 18 Z" fill="${C.red}"/>
    <ellipse cx="0" cy="28" rx="12" ry="14" fill="${C.sign}"/>
    ${[-20, -10, 0, 10].map((yy) => line(-10, yy, 12, yy, C.white, 3)).join("")}
  </g>`;
  scenes["security-tray.svg"] = svg(
    W,
    H,
    `${rollers}
    ${rect(60, 40, 520, 400, "#5d6670", { r: 26 })}
    ${rect(78, 58, 484, 364, "#727c87", { r: 18 })}
    ${t(320, 410, "PLEASE RETURN TRAYS", { size: 14, fill: "#5d6670", anchor: "middle", ls: 4 })}
    <!-- laptop -->
    <g transform="rotate(-4 220 170)">${rect(110, 90, 230, 150, "#2a2d31", { r: 8 })}${rect(124, 104, 202, 122, "#3a3e44", { r: 4 })}${rect(200, 228, 50, 6, "#1b1d20", { r: 3 })}${rect(130, 112, 30, 30, C.yellow, { r: 15 })}</g>
    <!-- liquids bag -->
    <g transform="rotate(8 448 160)">${rect(380, 84, 140, 150, C.white, { r: 6, o: 0.75 })}${rect(380, 84, 140, 14, C.blue, { r: 4 })}
      ${rect(398, 120, 30, 90, C.green, { r: 6 })}${rect(404, 108, 18, 14, C.sign)}
      ${rect(440, 140, 34, 70, C.amber, { r: 14 })}${rect(484, 124, 22, 86, C.white, { r: 4, stroke: C.sign, sw: 2 })}${rect(488, 112, 14, 14, C.red)}
      ${rect(380, 84, 140, 150, "none", { r: 6, stroke: C.sign, sw: 3 })}</g>
    ${shoe(160, 330, -78)}${shoe(250, 352, -96)}
    <!-- belt coiled -->
    <circle cx="420" cy="340" r="44" fill="none" stroke="${C.sign}" stroke-width="12"/><circle cx="420" cy="340" r="24" fill="none" stroke="${C.sign}" stroke-width="12"/>
    ${rect(452, 316, 26, 30, "none", { r: 3, stroke: C.steelHi, sw: 5 })}
    <!-- keys -->
    <circle cx="512" cy="300" r="13" fill="none" stroke="${C.steelHi}" stroke-width="4"/>
    ${rect(518, 306, 34, 9, C.steelHi, { r: 3 })}${rect(500, 312, 9, 30, C.yellow, { r: 3 })}`,
    { bg: C.steel },
  );
}

// 13. Footprints at the body scanner: stand here, arms up.
{
  const W = 600, H = 640;
  const foot = (x, y, flip) => `<g transform="translate(${x} ${y}) scale(${flip} 1)">
    <path d="M0 -70 C22 -70 30 -44 28 -14 C26 14 22 40 8 56 C0 64 -14 64 -20 54 C-28 38 -26 8 -24 -20 C-22 -50 -16 -70 0 -70 Z" fill="${C.yellow}"/>
    <path d="M-26 60 L26 60 L22 92 Q0 104 -22 92 Z" fill="${C.yellow}"/>
  </g>`;
  scenes["footprint-mat.svg"] = svg(
    W,
    H,
    `${rect(0, 0, 90, H, C.steelHi)}${rect(W - 90, 0, 90, H, C.steelHi)}
    ${rect(0, 0, 16, H, C.steel)}${rect(W - 16, 0, 16, H, C.steel)}
    ${rect(90, 0, W - 180, H, C.sign)}
    ${rect(90, 0, W - 180, 10, C.yellow)}${rect(90, H - 10, W - 180, 10, C.yellow)}
    ${foot(240, 300, -1)}${foot(360, 300, 1)}
    ${t(300, 120, "STAND HERE", { size: 40, fill: C.white, anchor: "middle", len: 320 })}
    ${t(300, 520, "Arms up · hold still", { size: 26, fill: C.yellow, anchor: "middle", len: 270 })}
    ${picto("man", 260, 540, 80, C.white).replace(/<rect x="25" y="27" width="8" height="32" rx="4"/, '<rect x="18" y="-6" width="8" height="34" rx="4" transform="rotate(-20 22 28)"').replace(/<rect x="67" y="27" width="8" height="32" rx="4"/, '<rect x="74" y="-6" width="8" height="34" rx="4" transform="rotate(20 78 28)"')}`,
    { bg: C.sign },
  );
}

// 14. The sign family: the same pictogram language on every tile.
{
  const W = 640, H = 700;
  const tiles = [
    ["departures", "Departures", C.sign, C.yellow],
    ["arrivals", "Arrivals", C.blue, C.white],
    ["baggageClaim", "Baggage", C.sign, C.white],
    ["passport", "Passport", C.sign, C.white],
    ["toilets", "Toilets", C.sign, C.white],
    ["coffee", "Café", C.sign, C.white],
    ["food", "Dining", C.sign, C.white],
    ["shop", "Shops", C.sign, C.white],
    ["info", "Information", C.yellow, C.sign],
    ["wifi", "Free wifi", C.sign, C.white],
    ["plug", "Charging", C.sign, C.white],
    ["elevator", "Lifts", C.sign, C.white],
    ["taxi", "Taxi", C.sign, C.white],
    ["train", "Train", C.sign, C.white],
    ["bus", "Bus", C.sign, C.white],
    ["exit", "Exit", C.green, C.white],
  ];
  let s = "";
  tiles.forEach(([pic, label, bg, ink], i) => {
    const x = 28 + (i % 4) * 148, y = 28 + Math.floor(i / 4) * 166;
    s += rect(x, y, 136, 154, bg, { r: 4 }) + picto(pic, x + 26, y + 16, 84, ink, bg) + t(x + 68, y + 136, label, { size: 15, fill: ink, anchor: "middle", len: label.length > 9 ? 112 : undefined });
  });
  scenes["sign-family.svg"] = svg(W, H, s, { bg: C.concrete });
}

// 15. Overhead wayfinding in the airside hall.
{
  const W = 820, H = 440;
  let lights = "";
  for (let x = 40; x < W; x += 120) lights += rect(x, 24, 60, 8, C.white);
  scenes["overhead-wayfinding.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 60, C.concreteLo)}${lights}
    ${rect(0, 60, W, 260, C.glass)}
    ${Array.from({ length: 12 }, (_, i) => rect(i * 76, 60, 5, 260, C.glassLo)).join("")}
    ${rect(0, 320, W, 120, C.floor)}${rect(0, 320, W, 4, C.concreteLo)}
    ${rect(200, 60, 5, 50, C.steelLo)}${rect(620, 60, 5, 50, C.steelLo)}
    ${panel(30, 110, W - 60, 150)}
    <!-- left: A gates -->
    ${arrow(52, 128, 60, 180, C.yellow)}
    ${t(124, 168, "A1–A12", { size: 34, fill: C.yellow, len: 118 })}
    ${t(124, 196, "5 min", { size: 15, weight: 400 })}
    ${rect(270, 126, 3, 118, C.steelLo)}
    <!-- middle: B gates, straight ahead -->
    ${arrow(292, 128, 60, -90, C.yellow)}
    ${t(364, 168, "B1–B24", { size: 34, fill: C.yellow, len: 118 })}
    ${t(364, 196, "8 min", { size: 15, weight: 400 })}
    ${rect(510, 126, 3, 118, C.steelLo)}
    <!-- right: C gates and services -->
    ${t(532, 168, "C1–C14", { size: 34, fill: C.yellow, len: 118 })}
    ${t(532, 196, "11 min", { size: 15, weight: 400 })}
    ${arrow(W - 112, 128, 60, 0, C.yellow)}
    ${picto("toilets", 60, 208, 38)}${picto("coffee", 108, 208, 38)}
    ${picto("food", 300, 208, 38)}${picto("shop", 348, 208, 38)}
    ${picto("wifi", 540, 208, 38)}${picto("plug", 588, 208, 38)}
    <!-- travelers underneath -->
    ${picto("woman", 150, 290, 110, C.sign)}${picto("baggage", 214, 352, 48, C.sign, C.floor)}
    ${picto("man", 560, 286, 120, C.sign)}`,
  );
}

// 17. Moving walkway, looking down its length.
{
  const W = 640, H = 640, vx = 320, vy = 250;
  let treads = "";
  for (let k = 1; k < 26; k++) {
    const tt = Math.pow(k / 26, 2.2), y = vy + (H - 80 - vy) * tt, half = 30 + 190 * tt;
    treads += line(vx - half, y, vx + half, y, C.steelLo, 1 + 2 * tt);
  }
  scenes["moving-walkway.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, vy, C.concrete)}
    ${rect(0, vy - 70, W, 70, C.glass)}${Array.from({ length: 9 }, (_, i) => rect(i * 80, vy - 70, 4, 70, C.glassLo)).join("")}
    ${rect(0, vy, W, H - vy, C.floor)}
    <!-- belt -->
    <path d="M${vx - 30} ${vy} L${vx + 30} ${vy} L${vx + 220} ${H - 80} L${vx - 220} ${H - 80} Z" fill="${C.steel}"/>
    ${treads}
    <!-- balustrades and handrails -->
    <path d="M${vx - 34} ${vy - 24} L${vx - 30} ${vy} L${vx - 220} ${H - 80} L${vx - 300} ${H - 80} L${vx - 300} ${H - 200} Z" fill="${C.glassLo}" opacity=".6"/>
    <path d="M${vx + 34} ${vy - 24} L${vx + 30} ${vy} L${vx + 220} ${H - 80} L${vx + 300} ${H - 80} L${vx + 300} ${H - 200} Z" fill="${C.glassLo}" opacity=".6"/>
    <path d="M${vx - 34} ${vy - 24} L${vx - 300} ${H - 200}" stroke="${C.sign}" stroke-width="18" stroke-linecap="round"/>
    <path d="M${vx + 34} ${vy - 24} L${vx + 300} ${H - 200}" stroke="${C.sign}" stroke-width="18" stroke-linecap="round"/>
    <!-- comb plate at the end, and the yellow edge -->
    ${rect(vx - 230, H - 80, 460, 24, C.yellow)}
    ${Array.from({ length: 23 }, (_, i) => rect(vx - 226 + i * 20, H - 80, 8, 24, C.yellowLo)).join("")}
    ${rect(0, H - 56, W, 56, C.concreteLo)}
    <!-- the sign -->
    ${rect(318, 0, 4, 40, C.steelLo)}
    ${panel(150, 40, 340, 100)}
    ${t(170, 86, "Stand right", { size: 26 })}${t(170, 120, "Walk left", { size: 26, fill: C.yellow })}
    ${arrow(400, 58, 64, -90, C.white)}`,
  );
}

// 18. The hall clock, 21:12.
{
  const W = 560, H = 680, cx = 280, cy = 380, R = 210;
  let ticks = "";
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2, big = i % 5 === 0;
    const r1 = R - 14, r2 = big ? R - 64 : R - 30;
    ticks += line(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1, cx + Math.sin(a) * r2, cy - Math.cos(a) * r2, C.sign, big ? 14 : 5);
  }
  const hand = (deg, len, tail, w) => `<rect x="${cx - w / 2}" y="${cy - len}" width="${w}" height="${len + tail}" fill="${C.sign}" transform="rotate(${deg} ${cx} ${cy})"/>`;
  const hDeg = ((9 + 12 / 60) / 12) * 360, mDeg = (12 / 60) * 360, sDeg = (38 / 60) * 360;
  scenes["station-clock.svg"] = svg(
    W,
    H,
    `${rect(cx - 6, 0, 12, 140, C.steelLo)}
    ${rect(cx - 40, 140, 80, 30, C.sign, { r: 4 })}
    <circle cx="${cx}" cy="${cy}" r="${R + 22}" fill="${C.sign}"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.white}"/>
    ${ticks}
    ${hand(hDeg, 120, 30, 20)}${hand(mDeg, 180, 36, 15)}
    <g transform="rotate(${f(sDeg)} ${cx} ${cy})">${rect(cx - 2.5, cy - 130, 5, 186, C.red)}<circle cx="${cx}" cy="${cy - 130}" r="17" fill="${C.red}"/></g>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${C.red}"/>`,
    { bg: C.concrete },
  );
}
