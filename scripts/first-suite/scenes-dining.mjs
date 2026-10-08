// Dining in the suite: the sommelier pour, champagne, the table, the menu, espresso, turndown.
import { rng, f, C, SERIF, SANS, texture, contact, line, svg } from "./lib.mjs";

export const scenes = {};

// Shared bits ---------------------------------------------------------------

// Overhead flatware, drawn pointing up, centred on x, from y (top) downwards.
const fork = (x, y, len = 190) => {
  const head = 52, neck = 22;
  const tines = [-9, -3, 3, 9]
    .map((dx) => `<rect x="${f(x + dx - 1.6)}" y="${y}" width="3.2" height="30" rx="1.6"/>`)
    .join("");
  return `<g fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".75">
    ${tines}
    <path d="M${x - 12} ${y + 26} H${x + 12} V${y + 34} C${x + 12} ${y + head - 6} ${x + 3} ${y + head} ${x + 3} ${y + head + neck} H${x - 3} C${x - 3} ${y + head} ${x - 12} ${y + head - 6} ${x - 12} ${y + 34} Z"/>
    <path d="M${x - 3} ${y + head + neck} C${x - 6} ${y + 110} ${x - 7} ${y + len - 20} ${x - 6} ${y + len - 8} Q${x} ${y + len + 2} ${x + 6} ${y + len - 8} C${x + 7} ${y + len - 20} ${x + 6} ${y + 110} ${x + 3} ${y + head + neck} Z"/>
  </g>`;
};
const knife = (x, y, len = 200) =>
  `<g fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".75">
    <path d="M${x - 2} ${y + 92} V${y + 10} C${x - 2} ${y + 3} ${x + 1} ${y} ${x + 4} ${y + 2} C${x + 8} ${y + 20} ${x + 7} ${y + 70} ${x + 5} ${y + 92} Z"/>
    <path d="M${x - 3} ${y + 92} H${x + 6} C${x + 7} ${y + 130} ${x + 8} ${y + len - 14} ${x + 6} ${y + len - 6} Q${x + 1.5} ${y + len + 2} ${x - 3} ${y + len - 6} C${x - 5} ${y + len - 14} ${x - 4} ${y + 130} ${x - 3} ${y + 92} Z"/>
    ${line(x - 2, y + 92, x + 6, y + 92, { color: C.brassLo, w: 0.6 })}
  </g>`;
const spoon = (x, y, len = 190, bw = 14, bh = 24) =>
  `<g fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".75">
    <path d="M${x - 2.5} ${y + bh * 2 - 2} C${x - 4} ${y + 100} ${x - 6} ${y + len - 22} ${x - 5.5} ${y + len - 8} Q${x} ${y + len + 2} ${x + 5.5} ${y + len - 8} C${x + 6} ${y + len - 22} ${x + 4} ${y + 100} ${x + 2.5} ${y + bh * 2 - 2} Z"/>
    <ellipse cx="${x}" cy="${y + bh}" rx="${bw}" ry="${bh}"/>
    <ellipse cx="${x - 3}" cy="${y + bh - 6}" rx="${bw * 0.45}" ry="${bh * 0.5}" fill="#fff" fill-opacity=".35" stroke="none"/>
  </g>`;

// 1. The sommelier pour — the hero.
{
  const W = 640, H = 480;
  const table = 340; // back edge of the tablecloth
  const gx = 250; // glass centre
  const foot = 438, stemTop = 360, bowlTop = 196, rim = 50;
  // Glass bowl outline (right half mirrored).
  const bowl = (side) => {
    const s = side;
    return `${gx + s * rim} ${bowlTop} C${gx + s * 66} ${bowlTop + 40} ${gx + s * 80} ${bowlTop + 92} ${gx + s * 66} ${bowlTop + 130} C${gx + s * 52} ${stemTop - 8} ${gx + s * 18} ${stemTop} ${gx + s * 4} ${stemTop + 2}`;
  };
  const bowlPath = `M${gx - rim} ${bowlTop} C${gx - 66} ${bowlTop + 40} ${gx - 80} ${bowlTop + 92} ${gx - 66} ${bowlTop + 130} C${gx - 52} ${stemTop - 8} ${gx - 18} ${stemTop} ${gx} ${stemTop + 2} C${gx + 18} ${stemTop} ${gx + 52} ${stemTop - 8} ${gx + 66} ${bowlTop + 130} C${gx + 80} ${bowlTop + 92} ${gx + 66} ${bowlTop + 40} ${gx + rim} ${bowlTop} Z`;
  const wineY = 312; // surface of the wine in the glass
  const mouth = [292, 162];
  const ang = 160;
  scenes["sommelier-pour.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="wall_pour" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="cloth_pour" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    ${texture("linen_pour", ".9 .35", [0.55, 0.47, 0.38], 0.12, 3)}
    <linearGradient id="btl_pour" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c241f"/><stop offset=".3" stop-color="#2a3a2e"/><stop offset=".55" stop-color="#1e2a22"/><stop offset="1" stop-color="#141a16"/></linearGradient>
    <linearGradient id="cap_pour" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.wine}"/><stop offset=".35" stop-color="${C.wineHi}"/><stop offset="1" stop-color="${C.wine}"/></linearGradient>
    <linearGradient id="wine_pour" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.wine}"/><stop offset="1" stop-color="#561f29"/></linearGradient>
    <linearGradient id="glove_pour" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="sleeve_pour" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".35" stop-color="${C.slate}"/><stop offset="1" stop-color="#2c3644"/></linearGradient>
    <clipPath id="bowl_pour"><path d="${bowlPath}"/></clipPath>
  </defs>
  <rect width="${W}" height="${table}" fill="url(#wall_pour)"/>
  ${[110, 330, 550].map((x) => line(x, 0, x, table, { color: C.champagneLo, w: 0.75, o: 0.6 })).join("")}
  ${line(0, table - 46, W, table - 46, { color: C.brass, w: 0.75, o: 0.5 })}
  <rect y="${table}" width="${W}" height="${H - table}" fill="url(#cloth_pour)"/>
  <rect y="${table}" width="${W}" height="${H - table}" filter="url(#linen_pour)"/>
  ${line(0, table, W, table, { color: C.taupe, w: 1, o: 0.7 })}
  ${line(0, table + 3, W, table + 3, { color: C.champagne, w: 0.75, o: 0.6 })}

  <!-- the glass -->
  ${contact(gx, foot + 2, 50, 3, 0.08)}
  <g clip-path="url(#bowl_pour)">
    <rect x="${gx - 90}" y="${bowlTop}" width="180" height="${stemTop - bowlTop + 4}" fill="#fff" opacity=".35"/>
    <rect x="${gx - 90}" y="${wineY}" width="180" height="80" fill="url(#wine_pour)"/>
    <ellipse cx="${gx}" cy="${wineY}" rx="76" ry="9" fill="${C.wine}"/><ellipse cx="${gx}" cy="${wineY}" rx="76" ry="9" fill="${C.wineHi}" opacity=".45"/>
    <path d="M${gx - 50} ${wineY - 1} C${gx - 30} ${wineY - 7} ${gx + 20} ${wineY - 7} ${gx + 46} ${wineY + 1}" fill="none" stroke="${C.wineHi}" stroke-width="1.2" opacity=".8"/>
    <path d="M${gx - 30} ${wineY + 3} C${gx - 10} ${wineY + 7} ${gx + 22} ${wineY + 6} ${gx + 34} ${wineY + 1}" fill="none" stroke="#4a1a23" stroke-width="1" opacity=".7"/>
    <path d="M${gx - 70} ${wineY - 4} C${gx - 72} ${wineY - 14} ${gx - 66} ${wineY - 22} ${gx - 60} ${wineY - 26}" fill="none" stroke="${C.wine}" stroke-width="1" opacity=".25"/>
    <path d="M${gx - 52} ${bowlTop + 30} C${gx - 64} ${bowlTop + 70} ${gx - 64} ${bowlTop + 100} ${gx - 56} ${bowlTop + 124}" fill="none" stroke="#fff" stroke-width="4" opacity=".8" stroke-linecap="round"/>
  </g>
  <path d="M${bowl(-1)}" fill="none" stroke="${C.taupeLo}" stroke-width="1"/>
  <path d="M${bowl(1)}" fill="none" stroke="${C.taupeLo}" stroke-width="1"/>
  <ellipse cx="${gx}" cy="${bowlTop}" rx="${rim}" ry="7" fill="#fff" fill-opacity=".25" stroke="${C.taupeLo}" stroke-width="1"/>
  <path d="M${gx - 3} ${stemTop + 2} L${gx - 2.5} ${foot - 8} C${gx - 4} ${foot - 3} ${gx - 30} ${foot - 3} ${gx - 46} ${foot} M${gx + 3} ${stemTop + 2} L${gx + 2.5} ${foot - 8} C${gx + 4} ${foot - 3} ${gx + 30} ${foot - 3} ${gx + 46} ${foot}" fill="none" stroke="${C.taupeLo}" stroke-width="1"/>
  <ellipse cx="${gx}" cy="${foot}" rx="46" ry="6" fill="#fff" fill-opacity=".4" stroke="${C.taupeLo}" stroke-width="1"/>

  <!-- the stream -->
  <path d="M${mouth[0] - 2} ${mouth[1] + 4} C${mouth[0] - 4} ${mouth[1] + 50} ${gx + 18} ${wineY - 90} ${gx + 12} ${wineY}" fill="none" stroke="${C.wine}" stroke-width="3" stroke-linecap="round"/>
  <path d="M${mouth[0] - 2.5} ${mouth[1] + 8} C${mouth[0] - 4.5} ${mouth[1] + 50} ${gx + 17} ${wineY - 90} ${gx + 11} ${wineY - 20}" fill="none" stroke="${C.wineHi}" stroke-width=".8" opacity=".8"/>
  <ellipse cx="${gx + 12}" cy="${wineY}" rx="9" ry="2" fill="none" stroke="${C.wineHi}" stroke-width="1"/>

  <!-- bottle, napkin collar and gloved hand, drawn along the bottle axis -->
  <g transform="translate(${mouth[0]} ${mouth[1]}) rotate(${ang}) scale(.8) translate(-292 0)">
    <!-- slate jacket sleeve and white shirt cuff, along the arm -->
    <path d="M-320 -2 L-26 4 L-26 62 L-320 70 Z" fill="url(#sleeve_pour)"/>
    ${line(-320, 12, -26, 14, { color: C.slateHi, w: 0.75, o: 0.6 })}
    ${[-44, -56].map((x) => `<circle cx="${x}" cy="54" r="2.4" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".5"/>`).join("")}
    <path d="M-30 8 L-12 10 L-12 58 L-30 60 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
    <circle cx="-21" cy="34" r="2.6" fill="${C.brass}" stroke="${C.brassLo}" stroke-width=".5"/>
    <!-- the bottle -->
    <path d="M0 -30 L170 -30 C198 -30 204 -11 216 -9 L284 -9 L284 -11.5 L292 -11.5 L292 11.5 L284 11.5 L284 9 L216 9 C204 11 198 30 170 30 L0 30 Q-4 0 0 -30 Z" fill="url(#btl_pour)"/>
    <path d="M110 -21 L165 -21" stroke="${C.sage}" stroke-width="3" stroke-opacity=".5" stroke-linecap="round"/>
    <path d="M172 -24 C192 -22 200 -12 212 -7" fill="none" stroke="${C.sage}" stroke-width="2" stroke-opacity=".45" stroke-linecap="round"/>
    <!-- cream label with a bordeaux crest -->
    <rect x="92" y="-30" width="74" height="60" fill="${C.ivory}" stroke="${C.champagneLo}" stroke-width=".75"/>
    ${line(98, -24, 98, 24, { color: C.brass, w: 0.75 })}${line(160, -24, 160, 24, { color: C.brass, w: 0.75 })}
    <path d="M122 -8 H136 V4 Q129 12 122 4 Z" fill="${C.wine}" transform="rotate(90 129 0)"/>
    ${line(146, -16, 146, 16, { color: C.espresso, w: 1, o: 0.7 })}${line(112, -12, 112, 12, { color: C.espresso, w: 0.75, o: 0.6 })}
    <!-- bordeaux capsule -->
    <path d="M246 -9.4 H292 V9.4 H246 Z" fill="url(#cap_pour)"/>
    ${line(252, -9.4, 252, 9.4, { color: C.wineHi, w: 0.75 })}${line(286, -11.5, 286, 11.5, { color: "#4a1a23", w: 0.75 })}
    <!-- napkin collar -->
    <path d="M216 -13 L246 -12 L246 12 L216 13 Z" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
    ${line(226, -12.5, 226, 12.5, { color: C.sand, w: 0.75 })}${line(237, -12, 237, 12, { color: C.sand, w: 0.75 })}
    <path d="M228 -13 C226 -26 220 -36 210 -46 L234 -46 C240 -36 244 -24 244 -12 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
    ${line(228, -28, 240, -30, { color: C.sand, w: 0.75 })}
    <!-- white glove: back of the hand along the top, four fingers wrapping round the bottle -->
    ${[[26, 36, 31, -14], [42, 38, 48, -24], [58, 38, 65, -28], [74, 36, 81, -24]].map(([x1, y1, x2, y2]) => `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.taupe}" stroke-width="14.5" stroke-linecap="round"/>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="13" stroke-linecap="round"/>
      <line x1="${x2 - 1.5}" y1="${y2 + 3}" x2="${x2 + 0.5}" y2="${y2 + 9}" stroke="${C.sand}" stroke-width="7" stroke-linecap="round"/>
      ${line(x1 + (x2 - x1) * 0.55 - 5, y1 + (y2 - y1) * 0.55, x1 + (x2 - x1) * 0.55 + 5, y1 + (y2 - y1) * 0.55 + 0.6, { color: C.champagneLo, w: 0.75 })}
      ${line(x1 + (x2 - x1) * 0.25 - 5, y1 + (y2 - y1) * 0.25, x1 + (x2 - x1) * 0.25 + 5, y1 + (y2 - y1) * 0.25 + 0.6, { color: C.champagneLo, w: 0.6, o: 0.7 })}`).join("")}
    <path d="M-14 12 C8 14 40 22 84 30 C92 36 90 46 80 48 C46 54 14 58 -14 58 Z" fill="url(#glove_pour)" stroke="${C.taupe}" stroke-width=".75"/>
    ${[26, 36, 46].map((yy) => `<path d="M2 ${yy + 4} C20 ${yy + 2} 34 ${yy + 1} 48 ${yy}" fill="none" stroke="${C.champagneLo}" stroke-width=".75"/>`).join("")}
    <!-- thumb along the top towards the neck -->
    <path d="M70 40 C84 36 98 33 108 31" fill="none" stroke="${C.taupe}" stroke-width="13" stroke-linecap="round"/>
    <path d="M70 40 C84 36 98 33 108 31" fill="none" stroke="#fff" stroke-width="11.5" stroke-linecap="round"/>
    <path d="M-16 10 L-6 11 L-6 59 L-16 59 Z" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
    ${line(-11, 12, -11, 58, { color: C.sand, w: 0.75 })}
  </g>`
  );
}

// 2. A champagne flute on the brass-edged console, on a linen coaster.
{
  const W = 460, H = 600;
  const top = 452; // console top front edge
  const cx = 232;
  const foot = 432, stemTop = 316, bowlTop = 128, r = 25;
  const R = rng(22);
  const bubbles = Array.from({ length: 34 }, () => {
    const y = 178 + R() * (stemTop - 190);
    const spread = ((y - 160) / (stemTop - 160)) * 0;
    const x = cx + (R() - 0.5) * (r * 1.3) * (1 - (y - 178) / (stemTop - 178) * 0.6) + spread;
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.6 + R() * 1.3)}" fill="none" stroke="#fff" stroke-width=".9" opacity="${f(0.7 + R() * 0.3)}"/>`;
  }).join("");
  const chain = Array.from({ length: 12 }, (_, i) =>
    `<circle cx="${f(cx + 2 + Math.sin(i * 1.3) * 1.2)}" cy="${f(stemTop - 12 - i * 11)}" r="${f(0.7 + i * 0.07)}" fill="#fff" opacity=".85"/>`
  ).join("");
  const flute = `M${cx - r} ${bowlTop} C${cx - r - 1} ${bowlTop + 80} ${cx - r + 2} ${bowlTop + 140} ${cx - 14} ${stemTop - 14} C${cx - 8} ${stemTop - 3} ${cx - 3} ${stemTop} ${cx - 2.5} ${stemTop + 4} L${cx + 2.5} ${stemTop + 4} C${cx + 3} ${stemTop} ${cx + 8} ${stemTop - 3} ${cx + 14} ${stemTop - 14} C${cx + r - 2} ${bowlTop + 140} ${cx + r + 1} ${bowlTop + 80} ${cx + r} ${bowlTop} Z`;
  const liquid = 176;
  scenes["champagne-flute.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="wall_flute" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="leather_flute" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cognac}"/><stop offset="1" stop-color="${C.cognacHi}"/></linearGradient>
    ${texture("grainLeather_flute", ".55", [0.3, 0.15, 0.06], 0.2, 5)}
    <linearGradient id="brassEdge_flute" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
    ${texture("brushed_flute", ".01 .9", [0.4, 0.3, 0.17], 0.25, 8)}
    <linearGradient id="front_flute" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    ${texture("linen_flute", ".9 .4", [0.25, 0.3, 0.2], 0.18, 2)}
    <linearGradient id="fizz_flute" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.brassHi}"/></linearGradient>
    <clipPath id="clip_flute"><path d="${flute}"/></clipPath>
  </defs>
  <rect width="${W}" height="${top}" fill="url(#wall_flute)"/>
  ${line(70, 0, 70, top - 64, { color: C.champagneLo, w: 0.75, o: 0.6 })}${line(390, 0, 390, top - 64, { color: C.champagneLo, w: 0.75, o: 0.6 })}
  <!-- console: leather top seen at a shallow angle, brushed brass edge, taupe front -->
  <path d="M0 ${top - 64} H${W} V${top} H0 Z" fill="url(#leather_flute)"/>
  <rect y="${top - 64}" width="${W}" height="64" fill="${C.cognacHi}" opacity=".0"/>
  <path d="M0 ${top - 64} H${W} V${top} H0 Z" filter="url(#grainLeather_flute)"/>
  ${line(0, top - 64, W, top - 64, { color: C.brass, w: 1 })}
  <path d="M0 ${top - 58} H${W}" stroke="${C.cognacHi}" stroke-width=".75" stroke-dasharray="3 3"/>
  <path d="M0 ${top - 6} H${W}" stroke="${C.champagne}" stroke-width=".75" stroke-dasharray="3 3" opacity=".8"/>
  <rect y="${top}" width="${W}" height="12" fill="url(#brassEdge_flute)"/>
  <rect y="${top}" width="${W}" height="12" filter="url(#brushed_flute)"/>
  ${line(0, top + 0.5, W, top + 0.5, { color: C.brassHi, w: 1 })}
  ${line(0, top + 12, W, top + 12, { color: C.brassLo, w: 0.75 })}
  <rect y="${top + 12}" width="${W}" height="${H - top - 12}" fill="url(#front_flute)"/>
  ${line(W / 2, top + 12, W / 2, H, { color: C.taupe, w: 0.75, o: 0.6 })}
  <rect x="${W / 2 - 46}" y="${top + 52}" width="34" height="3" rx="1.5" fill="${C.brass}"/>
  <rect x="${W / 2 + 12}" y="${top + 52}" width="34" height="3" rx="1.5" fill="${C.brass}"/>

  <!-- linen coaster, seen in perspective -->
  <path d="M${cx - 58} ${foot + 12} L${cx - 44} ${foot - 12} L${cx + 46} ${foot - 12} L${cx + 60} ${foot + 12} Z" fill="${C.sage}" stroke="${C.sageLo}" stroke-width=".75"/>
  <path d="M${cx - 58} ${foot + 12} L${cx - 44} ${foot - 12} L${cx + 46} ${foot - 12} L${cx + 60} ${foot + 12} Z" filter="url(#linen_flute)"/>
  <path d="M${cx - 52} ${foot + 9} L${cx - 41} ${foot - 9} L${cx + 43} ${foot - 9} L${cx + 54} ${foot + 9} Z" fill="none" stroke="${C.ivory}" stroke-width=".6" stroke-dasharray="2 2" opacity=".8"/>
  ${contact(cx, foot + 1, 30, 2.5, 0.08)}

  <!-- the flute -->
  <g clip-path="url(#clip_flute)">
    <rect x="${cx - 40}" y="${bowlTop}" width="80" height="${stemTop - bowlTop + 6}" fill="#fff" opacity=".4"/>
    <rect x="${cx - 40}" y="${liquid}" width="80" height="${stemTop - liquid + 6}" fill="url(#fizz_flute)"/>
    <rect x="${cx - 40}" y="${liquid}" width="12" height="${stemTop - liquid}" fill="#fff" opacity=".25"/>
    ${bubbles}${chain}
    <path d="M${cx - 17} ${bowlTop + 12} C${cx - 19} ${bowlTop + 80} ${cx - 17} ${bowlTop + 140} ${cx - 10} ${stemTop - 24}" fill="none" stroke="#fff" stroke-width="2.5" opacity=".85" stroke-linecap="round"/>
  </g>
  <ellipse cx="${cx}" cy="${liquid}" rx="${r - 0.3}" ry="3.5" fill="${C.ivory}" stroke="${C.brassHi}" stroke-width=".6"/>
  <path d="${flute}" fill="none" stroke="${C.taupeLo}" stroke-width="1"/>
  <ellipse cx="${cx}" cy="${bowlTop}" rx="${r}" ry="3.5" fill="#fff" fill-opacity=".3" stroke="${C.taupeLo}" stroke-width="1"/>
  <path d="M${cx - 2.5} ${stemTop + 4} L${cx - 2} ${foot - 6} C${cx - 4} ${foot - 2} ${cx - 22} ${foot - 2} ${cx - 32} ${foot} M${cx + 2.5} ${stemTop + 4} L${cx + 2} ${foot - 6} C${cx + 4} ${foot - 2} ${cx + 22} ${foot - 2} ${cx + 32} ${foot}" fill="none" stroke="${C.taupeLo}" stroke-width="1"/>
  <ellipse cx="${cx}" cy="${foot}" rx="32" ry="4.5" fill="#fff" fill-opacity=".3" stroke="${C.taupeLo}" stroke-width="1"/>
  ${line(cx - 0.8, stemTop + 10, cx - 0.8, foot - 10, { color: "#fff", w: 1, o: 0.9 })}
  <!-- bubbles escaping above the rim -->
  ${[[cx + 4, 114, 1.2], [cx - 6, 100, 0.9], [cx + 1, 84, 0.7]].map(([x, y, rr]) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="none" stroke="${C.brass}" stroke-width=".6" opacity=".6"/>`).join("")}`
  );
}

// 3. Overhead flat-lay of the place setting on white linen.
{
  const W = 560, H = 560;
  const cx = 280, cy = 318;
  scenes["table-setting.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="cloth_table" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    ${texture("linen_table", ".8 .8", [0.5, 0.43, 0.34], 0.12, 4)}
    <radialGradient id="plate_table" cx=".42" cy=".4" r=".65"><stop offset="0" stop-color="#fffdf9"/><stop offset="1" stop-color="${C.ivory}"/></radialGradient>
    <linearGradient id="napkin_table" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
    <radialGradient id="bloom_table" cx=".45" cy=".45" r=".6"><stop offset="0" stop-color="${C.wine}"/><stop offset="1" stop-color="${C.rose}"/></radialGradient>
    ${texture("napLinen_table", ".9 .5", [0.5, 0.43, 0.34], 0.14, 6)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cloth_table)"/>
  <rect width="${W}" height="${H}" filter="url(#linen_table)"/>
  <!-- pressed fold in the tablecloth -->
  ${line(0, 54, W, 54, { color: C.sand, w: 1.2, o: 1 })}
  ${line(0, 55.5, W, 55.5, { color: "#fff", w: 1, o: 0.9 })}

  <!-- charger with a fine brass rim, dinner plate on it -->
  ${contact(cx + 2, cy + 4, 124, 124, 0.05)}
  <circle cx="${cx}" cy="${cy}" r="124" fill="${C.sand}" stroke="${C.brassLo}" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="119" fill="none" stroke="${C.brass}" stroke-width=".75"/>
  <circle cx="${cx}" cy="${cy}" r="100" fill="url(#plate_table)" stroke="${C.taupe}" stroke-width=".75"/>
  <circle cx="${cx}" cy="${cy}" r="96" fill="none" stroke="${C.brass}" stroke-width=".6"/>
  <circle cx="${cx}" cy="${cy}" r="66" fill="none" stroke="${C.sand}" stroke-width="1"/>
  <!-- folded napkin on the plate, with a monogram -->
  <g transform="rotate(0 ${cx} ${cy})">
    <rect x="${cx - 38}" y="${cy - 62}" width="76" height="124" fill="url(#napkin_table)" stroke="${C.rose}" stroke-width=".75"/>
    <rect x="${cx - 38}" y="${cy - 62}" width="76" height="124" filter="url(#napLinen_table)"/>
    <path d="M${cx - 38} ${cy - 62} L${cx + 8} ${cy - 62} L${cx - 38} ${cy - 10} Z" fill="${C.roseHi}" opacity=".9"/>
    ${line(cx + 8, cy - 62, cx - 38, cy - 10, { color: C.rose, w: 0.9 })}
    ${line(cx + 30, cy - 62, cx + 30, cy + 62, { color: C.rose, w: 1 })}
    <rect x="${cx - 32}" y="${cy - 56}" width="64" height="112" fill="none" stroke="${C.ivory}" stroke-width=".6" stroke-dasharray="1.5 2" opacity=".9"/>
    <text x="${cx - 4}" y="${cy + 38}" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="15" fill="${C.wine}">S</text>
  </g>

  <!-- flatware: forks left, knife and spoon right, dessert spoon above -->
  ${fork(cx - 160, cy - 96)}
  ${fork(cx - 136, cy - 80, 176)}
  ${knife(cx + 140, cy - 100)}
  ${spoon(cx + 166, cy - 94)}
  <g transform="rotate(90 ${cx} ${cy - 150})">${spoon(cx, cy - 150 - 84, 168, 10, 17)}</g>

  <!-- bread plate with butter knife, upper left -->
  ${contact(cx - 168, cy - 196, 42, 42, 0.05)}
  <circle cx="${cx - 170}" cy="${cy - 198}" r="42" fill="url(#plate_table)" stroke="${C.taupe}" stroke-width=".75"/>
  <circle cx="${cx - 170}" cy="${cy - 198}" r="38.5" fill="none" stroke="${C.slate}" stroke-width="1"/>
  <circle cx="${cx - 170}" cy="${cy - 198}" r="35" fill="none" stroke="${C.slateHi}" stroke-width="2.5" stroke-dasharray="1 4.5"/>
  <circle cx="${cx - 170}" cy="${cy - 198}" r="31.5" fill="none" stroke="${C.slate}" stroke-width=".6"/>
  <g transform="translate(${cx - 170} ${cy - 198}) rotate(-45) scale(.46)">${knife(-2, -100, 200)}</g>

  <!-- water glass seen from above, upper right -->
  ${contact(cx + 158, cy - 176, 36, 36, 0.05)}
  <circle cx="${cx + 156}" cy="${cy - 178}" r="36" fill="#fff" fill-opacity=".55" stroke="${C.taupeLo}" stroke-width="1"/>
  <circle cx="${cx + 156}" cy="${cy - 178}" r="33" fill="none" stroke="${C.taupe}" stroke-width=".6" opacity=".6"/>
  <circle cx="${cx + 156}" cy="${cy - 178}" r="22" fill="${C.sky}" fill-opacity=".35" stroke="${C.champagneLo}" stroke-width=".6"/>
  <circle cx="${cx + 156}" cy="${cy - 178}" r="8" fill="none" stroke="${C.taupe}" stroke-width=".6" opacity=".6"/>
  <path d="M${cx + 130} ${cy - 196} A32 32 0 0 1 ${cx + 150} ${cy - 210}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>

  <!-- bud vase with a single rose, seen from above -->
  ${contact(cx + 1, cy - 222, 20, 20, 0.06)}
  <circle cx="${cx}" cy="${cy - 224}" r="19" fill="#fff" fill-opacity=".6" stroke="${C.taupeLo}" stroke-width="1"/>
  <circle cx="${cx}" cy="${cy - 224}" r="16" fill="${C.sky}" fill-opacity=".4" stroke="${C.taupe}" stroke-width=".5"/>
  <path d="M${cx + 6} ${cy - 230} C${cx + 26} ${cy - 246} ${cx + 40} ${cy - 244} ${cx + 46} ${cy - 236} C${cx + 34} ${cy - 228} ${cx + 18} ${cy - 226} ${cx + 6} ${cy - 230} Z" fill="${C.sage}" stroke="${C.sageLo}" stroke-width=".75"/>
  ${line(cx + 8, cy - 230, cx + 42, cy - 237, { color: C.sageLo, w: 0.6 })}
  <path d="M${cx - 6} ${cy - 220} C${cx - 22} ${cy - 210} ${cx - 34} ${cy - 214} ${cx - 38} ${cy - 222} C${cx - 28} ${cy - 228} ${cx - 16} ${cy - 226} ${cx - 6} ${cy - 220} Z" fill="${C.sage}" stroke="${C.sageLo}" stroke-width=".75"/>
  <circle cx="${cx}" cy="${cy - 224}" r="13" fill="url(#bloom_table)" stroke="${C.wine}" stroke-width=".75"/>
  ${[[11, 0], [8, 70], [6, 150], [4, 230], [2.5, 300]].map(([rr, rot]) => `<path d="M${cx - rr} ${cy - 224} A${rr} ${rr} 0 1 1 ${cx + rr * 0.6} ${cy - 224 + rr * 0.8}" fill="none" stroke="${C.wine}" stroke-width=".8" transform="rotate(${rot} ${cx} ${cy - 224})"/>`).join("")}
  <path d="M${cx - 9} ${cy - 232} A11 11 0 0 1 ${cx + 4} ${cy - 235}" fill="none" stroke="${C.roseHi}" stroke-width="1.2" opacity=".8"/>

  <!-- salt and pepper either side -->
  ${[[cx - 52, C.ivory], [cx + 52, C.sand]].map(([x, fill]) => `
    ${contact(x + 1, cy - 222, 13, 13, 0.06)}
    <circle cx="${x}" cy="${cy - 224}" r="13" fill="${fill}" stroke="${C.brass}" stroke-width="1"/>
    <circle cx="${x}" cy="${cy - 224}" r="9" fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".6"/>
    ${[[-3, -2], [3, -2], [0, 3]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${cy - 224 + dy}" r=".9" fill="${C.brassLo}"/>`).join("")}`).join("")}`
  );
}

// 4. The dinner menu card lying on linen.
{
  const W = 460, H = 600;
  const cx = 230;
  const courses = [
    ["To Begin", "Arabic mezze, warm khubz"],
    ["Main", "Lamb loin, saffron rice"],
    ["To Finish", "Date pudding, cardamom cream"],
  ];
  scenes["menu-card.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="cloth_menu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    ${texture("linen_menu", ".8 .8", [0.5, 0.43, 0.34], 0.12, 9)}
    <linearGradient id="card_menu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="folder_menu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
    ${texture("leather_menu", ".6", [0.3, 0.15, 0.06], 0.22, 7)}
    ${texture("paper_menu", ".6", [0.5, 0.42, 0.3], 0.06, 3, 2)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cloth_menu)"/>
  <rect width="${W}" height="${H}" filter="url(#linen_menu)"/>
  ${line(0, 520, W, 520, { color: C.sand, w: 1.2 })}${line(0, 521.5, W, 521.5, { color: "#fff", w: 1 })}
  <!-- cognac leather menu folder, open beneath the card, with a bordeaux ribbon -->
  <g transform="rotate(2 ${cx} 300)">
    ${contact(cx + 3, 304, 160, 234, 0.06)}
    <rect x="${cx - 156}" y="70" width="312" height="462" rx="6" fill="url(#folder_menu)"/>
    <rect x="${cx - 156}" y="70" width="312" height="462" rx="6" filter="url(#leather_menu)"/>
    <rect x="${cx - 148}" y="78" width="296" height="446" rx="3" fill="none" stroke="${C.cognacHi}" stroke-width=".75" stroke-dasharray="3 2.5"/>
    <path d="M${cx + 52} 520 V560 L${cx + 58} 553 L${cx + 64} 560 V520 Z" fill="${C.wine}"/>
    ${line(cx + 58, 520, cx + 58, 556, { color: C.wineHi, w: 0.6, o: 0.7 })}
  </g>
  <g transform="rotate(-3 ${cx} 300)">
    ${contact(cx + 3, 302, 140, 210, 0.08)}
    <rect x="${cx - 136}" y="${96}" width="272" height="412" fill="url(#card_menu)" stroke="${C.champagneLo}" stroke-width=".75"/>
    <rect x="${cx - 136}" y="${96}" width="272" height="412" filter="url(#paper_menu)"/>
    <rect x="${cx - 124}" y="${108}" width="248" height="388" fill="none" stroke="${C.brassLo}" stroke-width=".75"/>
    <rect x="${cx - 120}" y="${112}" width="240" height="380" fill="none" stroke="${C.brass}" stroke-width=".4" opacity=".6"/>
    <text x="${cx}" y="146" text-anchor="middle" font-family="${SANS}" font-size="8" letter-spacing="4" fill="${C.brassLo}">SUITE 1A · DXB → JFK</text>
    <text x="${cx}" y="206" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="44" fill="${C.wine}">Dinner</text>
    ${line(cx - 40, 226, cx + 40, 226, { color: C.wine, w: 0.75 })}
    <path d="M${cx} 222 L${cx + 4} 226 L${cx} 230 L${cx - 4} 226 Z" fill="${C.wine}"/>
    ${courses.map(([h, d], i) => {
      const y = 280 + i * 70;
      return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="${SERIF}" font-size="18" letter-spacing="1" fill="${C.espresso}">${h}</text>
      <text x="${cx}" y="${y + 22}" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="13" fill="${C.taupeLo}">${d}</text>`;
    }).join("")}
    ${line(cx - 14, 476 - 18, cx + 14, 476 - 18, { color: C.brass, w: 0.75 })}
    <text x="${cx}" y="478" text-anchor="middle" font-family="${SANS}" font-size="6.5" letter-spacing="3" fill="${C.taupeLo}">SERVED AT YOUR LEISURE</text>
  </g>
`
  );
}

// 5. Espresso cup and saucer, brass spoon, a wrapped chocolate, on ivory.
{
  const W = 560, H = 420;
  const cx = 236, sy = 300; // saucer centre
  const rimY = 214, rimR = 50, baseY = 290, baseR = 30;
  const cup = `M${cx - rimR} ${rimY} C${cx - rimR + 1} ${rimY + 40} ${cx - 42} ${baseY - 18} ${cx - baseR} ${baseY} Q${cx} ${baseY + 8} ${cx + baseR} ${baseY} C${cx + 42} ${baseY - 18} ${cx + rimR - 1} ${rimY + 40} ${cx + rimR} ${rimY} Z`;
  scenes["espresso-cup.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="table_esp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    ${texture("linen_esp", ".8 .35", [0.5, 0.43, 0.34], 0.1, 5)}
    <linearGradient id="china_esp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <radialGradient id="crema_esp" cx=".45" cy=".45" r=".6"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset=".7" stop-color="${C.cognac}"/><stop offset="1" stop-color="${C.walnut}"/></radialGradient>
    <linearGradient id="foil_esp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
    ${texture("brushed_esp", ".02 .9", [0.3, 0.08, 0.1], 0.3, 2)}
    <linearGradient id="redfoil_esp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.wineHi}"/><stop offset=".5" stop-color="${C.wine}"/><stop offset="1" stop-color="#4a1a23"/></linearGradient>
    <linearGradient id="tray_esp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cognac}"/><stop offset="1" stop-color="${C.cognacHi}"/></linearGradient>
    ${texture("leather_esp", ".6", [0.3, 0.15, 0.06], 0.2, 4)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#table_esp)"/>
  <rect width="${W}" height="${H}" filter="url(#linen_esp)"/>
  <g transform="translate(-40 -92) scale(1.15)">
  <!-- cognac leather tray -->
  ${contact(285, 372, 210, 5, 0.1)}
  <path d="M96 352 L474 352 L474 360 Q474 366 466 366 L104 366 Q96 366 96 360 Z" fill="${C.cognac}"/>
  ${line(100, 366, 470, 366, { color: C.walnut, w: 0.75 })}
  <path d="M130 252 L440 252 Q452 252 456 262 L476 344 Q478 352 468 352 L102 352 Q92 352 94 344 L114 262 Q118 252 130 252 Z" fill="url(#tray_esp)"/>
  <path d="M130 252 L440 252 Q452 252 456 262 L476 344 Q478 352 468 352 L102 352 Q92 352 94 344 L114 262 Q118 252 130 252 Z" filter="url(#leather_esp)"/>
  <path d="M134 259 L436 259 Q446 259 449 267 L466 340 Q468 345 461 345 L109 345 Q102 345 104 340 L121 267 Q124 259 134 259 Z" fill="none" stroke="${C.cognacHi}" stroke-width=".75" stroke-dasharray="3 2.5"/>
  <!-- saucer -->
  ${contact(cx, sy + 18, 112, 6, 0.12)}
  <ellipse cx="${cx}" cy="${sy + 6}" rx="112" ry="28" fill="${C.sand}"/>
  <ellipse cx="${cx}" cy="${sy}" rx="112" ry="28" fill="url(#china_esp)" stroke="${C.taupe}" stroke-width=".75"/>
  <ellipse cx="${cx}" cy="${sy}" rx="108" ry="26" fill="none" stroke="${C.brassLo}" stroke-width=".9"/>
  <ellipse cx="${cx}" cy="${sy - 2}" rx="56" ry="13" fill="none" stroke="${C.sand}" stroke-width="1"/>

  <!-- spoon resting on the saucer, in front of the cup -->
  <g transform="rotate(-14 ${cx + 40} ${sy + 12})">
    <path d="M${cx - 30} ${sy + 12} C${cx + 10} ${sy + 9} ${cx + 60} ${sy + 9} ${cx + 92} ${sy + 11} Q${cx + 98} ${sy + 13} ${cx + 92} ${sy + 15} C${cx + 60} ${sy + 15} ${cx + 10} ${sy + 15} ${cx - 30} ${sy + 14} Z" fill="url(#foil_esp)" stroke="${C.brass}" stroke-width=".6"/>
    <ellipse cx="${cx - 42}" cy="${sy + 13}" rx="16" ry="7" fill="url(#foil_esp)" stroke="${C.brass}" stroke-width=".6"/>
    <ellipse cx="${cx - 45}" cy="${sy + 11.5}" rx="8" ry="3" fill="#fff" opacity=".45"/>
    ${line(cx - 20, sy + 11.5, cx + 80, sy + 11.5, { color: "#fff", w: 0.8, o: 0.6 })}
  </g>

  <!-- cup -->
  <path d="M${cx + rimR - 6} ${rimY + 16} C${cx + rimR + 26} ${rimY + 8} ${cx + rimR + 30} ${rimY + 42} ${cx + rimR - 12} ${rimY + 52}" fill="none" stroke="${C.taupe}" stroke-width="9" stroke-linecap="round"/>
  <path d="M${cx + rimR - 6} ${rimY + 16} C${cx + rimR + 26} ${rimY + 8} ${cx + rimR + 30} ${rimY + 42} ${cx + rimR - 12} ${rimY + 52}" fill="none" stroke="${C.ivory}" stroke-width="6.5" stroke-linecap="round"/>
  <path d="${cup}" fill="url(#china_esp)" stroke="${C.taupe}" stroke-width=".75"/>
  <path d="M${cx - 36} ${rimY + 14} C${cx - 36} ${rimY + 40} ${cx - 30} ${baseY - 20} ${cx - 22} ${baseY - 6}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>
    <ellipse cx="${cx}" cy="${rimY}" rx="${rimR}" ry="12" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
  <ellipse cx="${cx}" cy="${rimY + 1.5}" rx="${rimR - 4}" ry="9.5" fill="url(#crema_esp)"/>
  <path d="M${cx - 24} ${rimY + 2} C${cx - 10} ${rimY - 4} ${cx + 10} ${rimY - 4} ${cx + 22} ${rimY + 1}" fill="none" stroke="${C.cognacHi}" stroke-width="1" opacity=".7"/>
  <path d="M${cx - 50} ${rimY} A${rimR} 12 0 0 0 ${cx + 50} ${rimY}" fill="none" stroke="${C.brass}" stroke-width="1.5"/>

  <!-- wrapped chocolate: a square in bordeaux foil with twisted ends -->
  <g transform="rotate(-10 400 318)">
    ${contact(400, 332, 34, 4, 0.12)}
    <path d="M358 306 L372 312 L372 326 L356 332 L362 319 Z" fill="url(#redfoil_esp)" stroke="#4a1a23" stroke-width=".6"/>
    <path d="M442 306 L428 312 L428 326 L444 332 L438 319 Z" fill="url(#redfoil_esp)" stroke="#4a1a23" stroke-width=".6"/>
    ${line(362, 312, 368, 318, { color: C.wineHi, w: 0.6 })}${line(438, 312, 432, 318, { color: C.wineHi, w: 0.6 })}
    <rect x="372" y="304" width="56" height="30" rx="5" fill="url(#redfoil_esp)" stroke="#4a1a23" stroke-width=".75"/>
    <rect x="372" y="304" width="56" height="30" rx="5" filter="url(#brushed_esp)"/>
    <rect x="386" y="304" width="28" height="30" fill="${C.ivory}"/>
    ${line(386, 304, 386, 334, { color: C.brass, w: 0.75 })}${line(414, 304, 414, 334, { color: C.brass, w: 0.75 })}
    <text x="400" y="323" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="11" fill="${C.wine}">S</text>
    ${line(374, 306.5, 426, 306.5, { color: C.wineHi, w: 0.8, o: 0.7 })}
  </g>
  </g>`
  );
}

// 6. Turndown: the bed corner, a pillow, two chocolates, and a note.
{
  const W = 600, H = 440;
  const edge = 500; // right edge of the mattress
  scenes["turndown.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="duvet_turn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="sheet_turn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    ${texture("cotton_turn", ".9 .6", [0.5, 0.43, 0.34], 0.1, 3)}
    <linearGradient id="head_turn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
    ${texture("leather_turn", ".5", [0.45, 0.36, 0.25], 0.12, 6)}
    <linearGradient id="pillow_turn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="side_turn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="box_turn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
    <linearGradient id="throw_turn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset=".2" stop-color="${C.rose}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
    ${texture("knit_turn", ".25 1.2", [0.45, 0.25, 0.25], 0.18, 8)}
    <radialGradient id="choc_turn" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="${C.walnut}"/><stop offset="1" stop-color="${C.espresso}"/></radialGradient>
  </defs>
  <!-- cabin floor / carpet to the right of the bed -->
  <rect x="${edge}" width="${W - edge}" height="${H}" fill="${C.cream}"/>
  <!-- headboard -->
  <rect width="${edge + 24}" height="60" fill="url(#head_turn)"/>
  <rect width="${edge + 24}" height="60" filter="url(#leather_turn)"/>
  ${[124, 248, 372].map((x) => line(x, 0, x, 60, { color: C.taupe, w: 0.75 })).join("")}
  ${line(0, 6, edge + 24, 6, { color: C.brass, w: 0.75 })}
  ${line(0, 60, edge + 24, 60, { color: C.brass, w: 1.2 })}
  ${line(edge + 24, 0, edge + 24, 60, { color: C.brass, w: 1 })}
  <!-- mattress side -->
  <rect x="${edge}" y="60" width="18" height="${H - 60}" fill="url(#side_turn)"/>
  ${line(edge + 18, 60, edge + 18, H, { color: C.taupe, w: 0.75 })}
  <!-- sheet on the bed -->
  <rect y="60" width="${edge}" height="${H - 60}" fill="url(#sheet_turn)"/>
  <rect y="60" width="${edge}" height="${H - 60}" filter="url(#cotton_turn)"/>
  ${line(edge, 60, edge, H, { color: C.champagneLo, w: 0.75 })}

  <!-- pillow -->
  <path d="M90 74 Q216 64 342 74 Q352 110 342 146 Q216 156 90 146 Q80 110 90 74 Z" fill="${C.sand}" stroke="${C.slate}" stroke-width="1.5"/>
  ${contact(196, 176, 150, 6, 0.06)}
  <path d="M58 92 Q196 80 334 92 Q346 132 334 172 Q196 184 58 172 Q46 132 58 92 Z" fill="url(#pillow_turn)" stroke="${C.champagneLo}" stroke-width=".75"/>
  <path d="M58 92 Q196 80 334 92 Q346 132 334 172 Q196 184 58 172 Q46 132 58 92 Z" fill="none" stroke="${C.slate}" stroke-width="1.8"/>
  <path d="M68 99 Q196 88 324 99 Q335 132 324 165 Q196 176 68 165 Q57 132 68 99 Z" fill="none" stroke="${C.slateHi}" stroke-width=".6" stroke-dasharray="2 2"/>
  <path d="M140 116 Q190 130 250 120" fill="none" stroke="${C.champagne}" stroke-width="1.2"/>

  <!-- duvet: top cuff folded back, the corner turned down diagonally -->
  <path d="M0 218 H${edge} V${H} H0 Z" fill="url(#duvet_turn)"/>
  <path d="M0 218 H${edge} V${H} H0 Z" filter="url(#cotton_turn)"/>
  <!-- turned-back corner reveals the sheet -->
  <path d="M300 218 L${edge} 218 L${edge} 400 Z" fill="url(#sheet_turn)"/>
  <path d="M300 218 L${edge} 218 L${edge} 400 Z" filter="url(#cotton_turn)"/>
  <!-- the folded-back flap -->
  ${contact(370, 300, 50, 4, 0.05)}
  ${line(300, 218, edge, 400, { color: C.taupe, w: 1 })}
  <path d="M300 218 L${edge} 400 L319 417 Z" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
  <path d="M300 218 L${edge} 400 L319 417 Z" filter="url(#cotton_turn)"/>
  <path d="M300 218 L319 417 L${edge} 400" fill="none" stroke="${C.brass}" stroke-width="1"/>
  <path d="M308 234 L324 406 L478 392" fill="none" stroke="${C.brass}" stroke-width=".5" stroke-dasharray="2 2"/>
  <!-- cuff along the top of the duvet -->
  <path d="M0 218 H300 L306 248 H0 Z" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
  ${line(0, 242, 302, 242, { color: C.brass, w: 0.6 })}
  ${line(0, 248, 306, 248, { color: C.champagne, w: 1 })}
  <!-- dusty-rose throw across the foot, its end folded -->
  ${contact(140, 396, 150, 3, 0.08)}
  <path d="M0 394 L262 394 L286 440 L0 440 Z" fill="url(#throw_turn)" stroke="${C.rose}" stroke-width=".75"/>
  <path d="M0 394 L262 394 L286 440 L0 440 Z" filter="url(#knit_turn)"/>
  ${line(0, 402, 266, 402, { color: C.ivory, w: 0.75, o: 0.8 })}
  ${line(0, 430, 281, 430, { color: C.wineHi, w: 0.75, o: 0.6 })}
  ${[0, 1, 2, 3, 4, 5].map((i) => line(266 + i * 3.6, 402 + i * 6.8, 270 + i * 3.6, 402 + i * 6.8 + 2, { color: C.rose, w: 0.8 })).join("")}

  <!-- chocolate box on the duvet -->
  <g transform="rotate(-6 150 318)">
    ${contact(150, 344, 52, 4, 0.08)}
    <rect x="98" y="292" width="104" height="52" fill="url(#box_turn)" stroke="${C.brass}" stroke-width=".75"/>
    <rect x="104" y="298" width="92" height="40" fill="${C.ivory}" stroke="${C.brass}" stroke-width=".5"/>
    ${line(150, 298, 150, 338, { color: C.brass, w: 0.5 })}
    <rect x="114" y="304" width="28" height="28" rx="3" fill="url(#choc_turn)"/>
    <path d="M120 316 Q128 310 136 316" fill="none" stroke="${C.brassHi}" stroke-width=".8"/>
    <circle cx="172" cy="318" r="14" fill="url(#choc_turn)"/>
    <path d="M164 316 Q172 310 180 316 M164 321 Q172 315 180 321" fill="none" stroke="${C.brassHi}" stroke-width=".8"/>
    <!-- bordeaux ribbon round the box, bow at the corner -->
    <rect x="98" y="336" width="104" height="5" fill="${C.wine}"/>
    <rect x="190" y="292" width="5" height="52" fill="${C.wine}"/>
    <path d="M192.5 338.5 C182 330 178 344 192.5 338.5 C204 330 208 344 192.5 338.5 Z" fill="${C.wineHi}" stroke="${C.wine}" stroke-width=".9"/>
    <path d="M192.5 338.5 L186 352 M192.5 338.5 L200 351" stroke="${C.wine}" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="192.5" cy="338.5" r="2.4" fill="${C.wine}"/>
  </g>
  <!-- the note card -->
  <g transform="rotate(5 250 330)">
    ${contact(254, 362, 50, 4, 0.07)}
    <rect x="210" y="300" width="96" height="62" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
    <rect x="215" y="305" width="86" height="52" fill="none" stroke="${C.brass}" stroke-width=".5"/>
    <text x="258" y="338" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="18" fill="${C.espresso}">Sleep well</text>
    ${line(244, 346, 272, 346, { color: C.brass, w: 0.5 })}
  </g>`
  );
}

// 7. Caviar service, overhead: tin in crushed ice, lid set aside, blinis, crème fraîche, chives, lemon, MOP spoon.
{
  const W = 600, H = 520;
  const R = rng(71);
  const bx = 210, by = 228; // ice bowl centre
  const tinR = 52;
  // Pearls: hex-packed with a little jitter, clipped to the tin.
  const pearls = [];
  for (let row = -10; row <= 10; row++) {
    for (let col = -10; col <= 10; col++) {
      const x = col * 5.8 + (row % 2 ? 2.9 : 0) + (R() - 0.5) * 1.2;
      const y = row * 5.1 + (R() - 0.5) * 1.2;
      if (Math.hypot(x, y) > tinR - 6) continue;
      pearls.push(`<circle cx="${f(bx + x)}" cy="${f(by + y)}" r="${f(2.6 + R() * 0.5)}" fill="url(#pearl_caviar)"/>`);
      if (R() < 0.22) pearls.push(`<circle cx="${f(bx + x - 1)}" cy="${f(by + y - 1.1)}" r=".7" fill="#fff" opacity=".75"/>`);
    }
  }
  // Crushed ice: small irregular facets in the ring between the tin and the bowl wall.
  const ice = [];
  for (let i = 0; i < 80; i++) {
    const a = R() * Math.PI * 2, d = tinR + 6 + R() * 34;
    const x = bx + Math.cos(a) * d, y = by + Math.sin(a) * d, s = 4 + R() * 5;
    const pts = Array.from({ length: 5 }, (_, k) => {
      const aa = (k / 5) * Math.PI * 2 + R() * 0.8, rr = s * (0.6 + R() * 0.5);
      return `${f(x + Math.cos(aa) * rr)},${f(y + Math.sin(aa) * rr)}`;
    }).join(" ");
    ice.push(`<polygon points="${pts}" fill="${R() < 0.5 ? "#fff" : C.sky}" fill-opacity="${f(0.6 + R() * 0.4)}" stroke="${C.slateHi}" stroke-width=".5" stroke-opacity=".6"/>`);
  }
  const chives = Array.from({ length: 30 }, () => {
    const a = R() * Math.PI * 2, d = R() * 13, x = 236 + Math.cos(a) * d, y = 432 + Math.sin(a) * d, t = R() * 180;
    return `<rect x="${f(x - 2)}" y="${f(y - 1)}" width="4" height="2" rx="1" fill="${R() < 0.5 ? C.sage : C.sageLo}" transform="rotate(${f(t)} ${f(x)} ${f(y)})"/>`;
  }).join("");
  const blini = (x, y, r = 20) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#blini_caviar)" stroke="${C.brass}" stroke-width=".75"/>
    ${[[-6, -4], [5, -7], [7, 5], [-4, 7], [0, 0], [-9, 3]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r=".9" fill="${C.champagneLo}" opacity=".8"/>`).join("")}`;
  scenes["caviar-service.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="cloth_caviar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    ${texture("linen_caviar", ".8 .8", [0.5, 0.43, 0.34], 0.12, 12)}
    <radialGradient id="pearl_caviar" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".45" stop-color="#2a313b"/><stop offset="1" stop-color="#14171c"/></radialGradient>
    <linearGradient id="brass_caviar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".55" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
    ${texture("brushed_caviar", ".9 .02", [0.35, 0.25, 0.12], 0.3, 3)}
    <radialGradient id="lid_caviar" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".7" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></radialGradient>
    <radialGradient id="blini_caviar" cx=".42" cy=".4" r=".6"><stop offset="0" stop-color="${C.ivory}"/><stop offset=".75" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></radialGradient>
    <linearGradient id="mop_caviar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${C.roseHi}"/><stop offset=".6" stop-color="${C.ivory}"/><stop offset=".85" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.roseHi}"/></linearGradient>
    <linearGradient id="napkin_caviar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
    ${texture("napLinen_caviar", ".9 .5", [0.45, 0.25, 0.25], 0.16, 5)}
    ${texture("muslin_caviar", "1.6 1.6", [0.5, 0.43, 0.34], 0.25, 9, 2)}
    <clipPath id="tin_caviar"><circle cx="${bx}" cy="${by}" r="${tinR - 4}"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cloth_caviar)"/>
  <rect width="${W}" height="${H}" filter="url(#linen_caviar)"/>
  ${line(0, 46, W, 46, { color: C.sand, w: 1.2 })}${line(0, 47.5, W, 47.5, { color: "#fff", w: 1 })}
  <g transform="translate(0 -14)">

  <!-- dusty-rose napkin, folded, under the mother-of-pearl spoon -->
  <g transform="rotate(-8 470 420)">
    ${contact(472, 424, 92, 46, 0.05)}
    <rect x="380" y="378" width="184" height="88" fill="url(#napkin_caviar)" stroke="${C.rose}" stroke-width=".75"/>
    <rect x="380" y="378" width="184" height="88" filter="url(#napLinen_caviar)"/>
    ${line(380, 390, 564, 390, { color: C.rose, w: 1 })}
    <rect x="386" y="396" width="172" height="64" fill="none" stroke="${C.ivory}" stroke-width=".6" stroke-dasharray="1.5 2" opacity=".9"/>
  </g>
  <g transform="rotate(-14 470 420)">
    <path d="M430 418 C470 415 520 415 548 417 Q554 420 548 423 C520 425 470 425 430 422 Z" fill="url(#mop_caviar)" stroke="${C.taupe}" stroke-width=".75"/>
    <ellipse cx="414" cy="420" rx="20" ry="12" fill="url(#mop_caviar)" stroke="${C.taupe}" stroke-width=".75"/>
    <path d="M400 416 Q412 410 426 415" fill="none" stroke="#fff" stroke-width="1.5" opacity=".9"/>
    <path d="M402 424 Q414 429 428 424" fill="none" stroke="${C.rose}" stroke-width=".8" opacity=".7"/>
  </g>

  <!-- brass bowl of crushed ice, the tin nested in it -->
  ${contact(bx + 3, by + 4, 110, 110, 0.06)}
  <circle cx="${bx}" cy="${by}" r="110" fill="url(#brass_caviar)"/>
  <circle cx="${bx}" cy="${by}" r="110" filter="url(#brushed_caviar)"/>
  <circle cx="${bx}" cy="${by}" r="110" fill="none" stroke="${C.brassLo}" stroke-width="1"/>
  <circle cx="${bx}" cy="${by}" r="100" fill="${C.ivory}" stroke="${C.brassLo}" stroke-width=".75"/>
  <circle cx="${bx}" cy="${by}" r="100" fill="${C.sky}" opacity=".35"/>
  ${ice.join("")}
  <circle cx="${bx}" cy="${by}" r="${tinR + 2}" fill="${C.espresso}" opacity=".08"/>
  <circle cx="${bx}" cy="${by}" r="${tinR}" fill="url(#brass_caviar)" stroke="${C.brassLo}" stroke-width=".75"/>
  <circle cx="${bx}" cy="${by}" r="${tinR - 4}" fill="#14171c"/>
  <g clip-path="url(#tin_caviar)">${pearls.join("")}</g>
  <circle cx="${bx}" cy="${by}" r="${tinR - 4}" fill="none" stroke="${C.brassLo}" stroke-width=".75"/>

  <!-- the lid, set aside -->
  ${contact(462, 136, 50, 50, 0.07)}
  <circle cx="460" cy="132" r="50" fill="url(#lid_caviar)" stroke="${C.brassLo}" stroke-width="1"/>
  <circle cx="460" cy="132" r="50" filter="url(#brushed_caviar)" opacity=".7"/>
  <circle cx="460" cy="132" r="44" fill="none" stroke="${C.brassLo}" stroke-width=".75"/>
  <circle cx="460" cy="132" r="41" fill="none" stroke="${C.brassHi}" stroke-width=".75"/>
  <circle cx="460" cy="132" r="28" fill="none" stroke="${C.brassLo}" stroke-width=".5" opacity=".7"/>
  <text x="460" y="135.5" text-anchor="middle" font-family="${SANS}" font-size="8" letter-spacing="3.5" fill="${C.brassLo}">OSCIETRA</text>
  <path d="M428 104 A44 44 0 0 1 470 89" fill="none" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>

  <!-- small plate of blinis, one dressed with crème fraîche and caviar -->
  ${contact(452, 286, 60, 60, 0.05)}
  <circle cx="450" cy="284" r="60" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
  <circle cx="450" cy="284" r="54" fill="none" stroke="${C.brass}" stroke-width=".75"/>
  ${blini(428, 268)}${blini(474, 272)}${blini(446, 308)}
  <path d="M438 304 C440 296 452 296 455 303 C458 310 446 316 440 312 C436 310 436 307 438 304 Z" fill="${C.ivory}" stroke="${C.sand}" stroke-width=".75"/>
  ${[[443, 304], [447, 302], [450, 306], [445, 308], [449, 309]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.9" fill="url(#pearl_caviar)"/>`).join("")}

  <!-- crème fraîche, chives, lemon in muslin -->
  ${contact(152, 424, 28, 28, 0.06)}
  <circle cx="150" cy="422" r="28" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
  <circle cx="150" cy="422" r="22" fill="${C.ivory}" stroke="${C.sand}" stroke-width=".75"/>
  <path d="M138 420 C142 410 158 410 160 420 C162 430 146 432 144 424 C143 419 150 417 152 421" fill="none" stroke="${C.sand}" stroke-width="1.2"/>
  ${contact(238, 434, 22, 22, 0.06)}
  <circle cx="236" cy="432" r="22" fill="#fff" stroke="${C.taupe}" stroke-width=".75"/>
  <circle cx="236" cy="432" r="17" fill="${C.ivory}" stroke="${C.sand}" stroke-width=".75"/>
  ${chives}
  <!-- lemon half wrapped in muslin, gathered and tied at one side -->
  ${contact(312, 430, 30, 24, 0.06)}
  <path d="M334 426 C342 414 354 410 360 412 C356 420 356 432 360 440 C354 442 342 438 334 426 Z" fill="${C.ivory}" stroke="${C.champagneLo}" stroke-width=".75"/>
  ${[416, 422, 430, 436].map((y) => line(338, 426, 358, y, { color: C.champagneLo, w: 0.5, o: 0.8 })).join("")}
  <ellipse cx="308" cy="426" rx="26" ry="22" fill="#efe39f" stroke="${C.brass}" stroke-width=".6"/>
  <ellipse cx="308" cy="426" rx="20" ry="16.5" fill="#f6eec2"/>
  ${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return line(308, 426, 308 + Math.cos(a) * 19, 426 + Math.sin(a) * 15.5, { color: "#e6d67f", w: 0.7 }); }).join("")}
  <path d="M282 426 C282 410 296 402 310 402 C324 402 334 414 335 426 C334 438 324 450 310 450 C296 450 282 442 282 426 Z" fill="${C.ivory}" fill-opacity=".6" stroke="${C.champagneLo}" stroke-width=".75"/>
  <path d="M282 426 C282 410 296 402 310 402 C324 402 334 414 335 426 C334 438 324 450 310 450 C296 450 282 442 282 426 Z" filter="url(#muslin_caviar)"/>
  <path d="M292 412 C304 418 318 418 330 414 M290 440 C304 434 318 434 331 438" fill="none" stroke="${C.champagneLo}" stroke-width=".6" opacity=".8"/>
  <path d="M333 420 L338 432" stroke="${C.wine}" stroke-width="2" stroke-linecap="round"/>
  <path d="M336 428 C342 434 344 442 340 448 M336 428 C346 430 352 436 352 444" fill="none" stroke="${C.wine}" stroke-width="1" stroke-linecap="round"/>

  </g>`
  );
}

// 8. Hot towel service: a crew hand with brass tongs presents a rolled towel on a walnut tray.
{
  const W = 600, H = 440;
  const skin = "#e6c6aa", skinLo = "#cfa587";
  const ty = 286, tx0 = 196, tx1 = 352, tr = 19; // towel axis y, ends, radius
  scenes["hot-towel.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="wall_towel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="surface_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="tray_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.walnut}"/><stop offset="1" stop-color="#8a6448"/></linearGradient>
    ${texture("veneer_towel", ".9 .03", [0.25, 0.14, 0.08], 0.35, 4)}
    <linearGradient id="roll_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    ${texture("terry_towel", "1.4", [0.5, 0.43, 0.34], 0.16, 6, 2)}
    <linearGradient id="tong_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
    <linearGradient id="sleeve_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".35" stop-color="${C.slate}"/><stop offset="1" stop-color="#2c3644"/></linearGradient>
    <linearGradient id="skin_towel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${skin}"/><stop offset="1" stop-color="${skinLo}"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wall_towel)"/>
  ${line(100, 0, 100, 326, { color: C.champagneLo, w: 0.75, o: 0.6 })}
  <!-- side console the tray rests on -->
  <rect y="326" width="${W}" height="${H - 326}" fill="url(#surface_towel)"/>
  ${line(0, 326, W, 326, { color: C.brass, w: 1 })}
  ${line(0, 392, W, 392, { color: C.brassLo, w: 1 })}
  <rect y="392" width="${W}" height="6" fill="${C.brassHi}"/>
  ${line(0, 398, W, 398, { color: C.brassLo, w: 0.75 })}
  <rect y="398" width="${W}" height="${H - 398}" fill="${C.cream}"/>

  <!-- walnut tray -->
  ${contact(282, 352, 140, 4, 0.12)}
  <path d="M146 308 L418 308 L430 340 L134 340 Z" fill="url(#tray_towel)"/>
  <path d="M146 308 L418 308 L430 340 L134 340 Z" filter="url(#veneer_towel)"/>
  <path d="M134 340 L430 340 L430 350 L134 350 Z" fill="${C.walnut}"/>
  ${line(134, 340, 430, 340, { color: C.brassHi, w: 1 })}
  ${line(146, 308, 418, 308, { color: C.brass, w: 1 })}
  ${line(134, 350, 430, 350, { color: C.espresso, w: 0.75, o: 0.6 })}

  <!-- lemon slice and a sage sprig on the tray -->
  <ellipse cx="392" cy="326" rx="17" ry="6" fill="#efe39f" stroke="${C.brass}" stroke-width=".75"/>
  <ellipse cx="392" cy="326" rx="13" ry="4.4" fill="#f6eec2"/>
  ${[0, 45, 90, 135].map((a) => { const r = (a * Math.PI) / 180; return line(392 - Math.cos(r) * 12, 326 - Math.sin(r) * 4, 392 + Math.cos(r) * 12, 326 + Math.sin(r) * 4, { color: "#e6d67f", w: 0.6 }); }).join("")}
  <path d="M368 330 C376 320 384 318 392 318" fill="none" stroke="${C.sageLo}" stroke-width=".9"/>
  ${[[372, 324, -40], [380, 320, -20], [388, 318.5, 0]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y - 3}" rx="2.6" ry="5" fill="${C.sage}" transform="rotate(${a} ${x} ${y})"/>`).join("")}

  <!-- far arm of the tongs, its tip tucked behind the towel -->
  <path d="M282 ${ty - 8} L470 222 Q488 220 494 216" fill="none" stroke="${C.brassLo}" stroke-width="5.5" stroke-linecap="round"/>
  <path d="M282 ${ty - 8} L470 222 Q488 220 494 216" fill="none" stroke="${C.brass}" stroke-width="4" stroke-linecap="round"/>
  <!-- the rolled towel, spiral end towards the viewer's left -->
  ${contact((tx0 + tx1) / 2, ty + tr, (tx1 - tx0) / 2, 3, 0.14)}
  <path d="M${tx0} ${ty - tr} H${tx1} A7 ${tr} 0 0 1 ${tx1} ${ty + tr} H${tx0} Z" fill="url(#roll_towel)" stroke="${C.taupe}" stroke-width=".75"/>
  <path d="M${tx0} ${ty - tr} H${tx1} A7 ${tr} 0 0 1 ${tx1} ${ty + tr} H${tx0} Z" filter="url(#terry_towel)"/>
  ${line(tx0 + 12, ty - tr + 0.5, tx1 - 4, ty - tr + 0.5, { color: "#fff", w: 1.2 })}
  ${[0.32, 0.68].map((k) => line(tx0 + (tx1 - tx0) * k, ty - tr + 1, tx0 + (tx1 - tx0) * k, ty + tr - 1, { color: C.sand, w: 0.75, o: 0.8 })).join("")}
  <ellipse cx="${tx0}" cy="${ty}" rx="8" ry="${tr}" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
  <path d="M${tx0} ${ty} m0 -2 a2 3 0 1 1 0 5 a3.5 7 0 1 1 1 -11 a5 12 0 1 1 -2 22 a6.5 16 0 1 1 3 -31" fill="none" stroke="${C.taupe}" stroke-width=".75"/>

  <!-- steam -->
  ${[[232, 0], [268, 1], [306, 2]].map(([x, i]) => `<path d="M${x} ${ty - tr - 8} C${x - 10} ${ty - 44 - i * 4} ${x + 10} ${ty - 62 - i * 3} ${x - 2} ${ty - 88 - i * 6} C${x - 10} ${ty - 102} ${x + 4} ${ty - 112} ${x} ${ty - 124 + i * 6}" fill="none" stroke="${C.taupe}" stroke-width="1.1" stroke-linecap="round" opacity="${0.4 - i * 0.06}"/>`).join("")}

  <!-- brass tongs: hinge in the hand, tips pinching the towel -->
  <path d="M276 ${ty - tr - 1} L470 214 Q486 208 494 216" fill="none" stroke="${C.brassLo}" stroke-width="6" stroke-linecap="round"/>
  <path d="M276 ${ty - tr - 1} L470 214 Q486 208 494 216" fill="none" stroke="url(#tong_towel)" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M276 ${ty - tr - 1} L470 214" fill="none" stroke="#fff" stroke-width=".8" opacity=".6"/>
  <path d="M268 ${ty - tr - 3} q-5 2 -4 6 L272 ${ty - tr + 2}" fill="url(#tong_towel)" stroke="${C.brassLo}" stroke-width=".75"/>

  <!-- the crew member's hand: slate sleeve with a bordeaux cuff stripe, a loose fist round the tongs -->
  <path d="M514 176 L${W + 10} 128 L${W + 10} 232 L532 244 Z" fill="url(#sleeve_towel)"/>
  <path d="M523 172 L541 242" stroke="${C.wine}" stroke-width="3"/>
  ${line(528, 170, 546, 241, { color: C.slateHi, w: 0.6, o: 0.7 })}
  <path d="M504 180 L516 176 L533 244 L520 246 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
  <path d="M512 186 C494 186 470 194 454 202 C442 208 440 228 450 238 C470 244 494 240 516 236 Z" fill="url(#skin_towel)" stroke="${skinLo}" stroke-width=".75"/>
  ${[[456, 250, 474, 251, 9], [450, 242, 474, 244, 10], [446, 233, 472, 235, 10.5], [443, 224, 470, 226, 11]].map(([x1, y1, x2, y2, w]) => `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${skinLo}" stroke-width="${w + 1.5}" stroke-linecap="round"/>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${skin}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M${x1 + 9} ${y1 - w / 2 + 1.5} v${w - 3}" stroke="${skinLo}" stroke-width=".6" opacity=".7"/>`).join("")}
  <path d="M500 196 C484 198 462 204 444 210" fill="none" stroke="${skinLo}" stroke-width="12.5" stroke-linecap="round"/>
  <path d="M500 196 C484 198 462 204 444 210" fill="none" stroke="${skin}" stroke-width="11" stroke-linecap="round"/>
  <path d="M441 207 q4 -2 8 -2" fill="none" stroke="${C.ivory}" stroke-width="1.2" stroke-linecap="round"/>
  ${line(470, 197, 488, 193, { color: skinLo, w: 0.6, o: 0.6 })}`
  );
}
