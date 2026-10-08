// The suite itself: the doors, the made bed, the screen, the vanity, the windows, the reserved lavatory.
import { rng, f, C, SERIF, SANS, blur, texture, contact, line, svg } from "./lib.mjs";

export const scenes = {};

const pts = (a) => a.map(([x, y]) => `${f(x)} ${f(y)}`).join(" L");
const poly = (a, attrs) => `<path d="M${pts(a)} Z" ${attrs}/>`;

// 1. The closed suite from the aisle: sliding doors, brass track, number plate.
{
  const W = 520, H = 600;
  const top = 150, floor = 500; // suite wall top, floor line
  const L = 62, R = 458; // suite front
  const dL = 172, dR = 348, mid = 260; // door opening and meeting point
  let slats = "";
  for (let x = dL + 14; x <= mid - 14; x += 6) slats += line(x, 186, x, 262, { color: C.brass, w: 0.75, o: 0.75 });
  for (let x = mid + 16; x <= dR - 12; x += 6) slats += line(x, 186, x, 262, { color: C.brass, w: 0.75, o: 0.75 });
  let floorLines = "";
  for (let i = -6; i <= 6; i++) floorLines += line(260 + i * 22, floor, 260 + i * 95, H, { color: C.taupe, w: 0.6, o: 0.35 });
  const panel = (x, y, w, h, fill) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" filter="url(#leather_doors)"/>`;
  const inset = (x, y, w, h) =>
    `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="${C.ivory}" stroke-width="1" stroke-opacity=".8"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="${C.brass}" stroke-width=".9"/>`;
  scenes["suite-doors.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="ceil_doors" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
      <linearGradient id="panel_doors" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="leaf_doors" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="cap_doors" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="floor_doors" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="plate_doors" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="cognac_doors" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
      ${texture("leather_doors", ".9", [0.45, 0.36, 0.25], 0.08, 3)}
      ${texture("brushed_doors", ".02 .9", [0.4, 0.3, 0.18], 0.25, 5, 2)}
      ${texture("carpet_doors", ".6", [0.4, 0.33, 0.26], 0.12, 8)}
    </defs>
    <!-- the open cabin ceiling above the suites -->
    <rect width="${W}" height="${top}" fill="url(#ceil_doors)"/>
    <path d="M0 74 Q260 22 520 74" fill="none" stroke="${C.taupe}" stroke-width=".8" stroke-opacity=".5"/>
    <path d="M0 80 Q260 30 520 80" fill="none" stroke="${C.brassHi}" stroke-width="1.5"/>
    <path d="M30 118 Q260 84 490 118" fill="none" stroke="${C.taupe}" stroke-width=".6" stroke-opacity=".35"/>
    ${[150, 260, 370].map((x) => `<ellipse cx="${x}" cy="${x === 260 ? 52 : 60}" rx="7" ry="2" fill="${C.ivory}" stroke="${C.brass}" stroke-width=".7"/>`).join("")}
    <!-- aisle floor -->
    <rect y="${floor}" width="${W}" height="${H - floor}" fill="url(#floor_doors)"/>
    <rect y="${floor}" width="${W}" height="${H - floor}" filter="url(#carpet_doors)"/>
    ${floorLines}
    ${line(0, floor, W, floor, { color: C.taupe, w: 0.8, o: 0.6 })}
    ${contact(260, floor + 2, 210, 3, 0.07)}
    <!-- suite walls beyond, left and right, receding -->
    ${poly([[0, 170], [L - 4, top], [L - 4, floor], [0, floor + 14]], `fill="${C.sand}"`)}
    ${poly([[W, 170], [R + 4, top], [R + 4, floor], [W, floor + 14]], `fill="${C.sand}"`)}
    ${line(0, 170, L - 4, top, { color: C.brass, w: 1 })}${line(W, 170, R + 4, top, { color: C.brass, w: 1 })}
    ${line(0, 330, L - 4, 330, { color: C.brass, w: 0.75, o: 0.7 })}${line(W, 330, R + 4, 330, { color: C.brass, w: 0.75, o: 0.7 })}
    <!-- fixed side panels -->
    ${panel(L, top, dL - L, floor - top, "url(#panel_doors)")}
    ${panel(dR, top, R - dR, floor - top, "url(#panel_doors)")}
    ${[L + 14, dR + 14].map((x) => `<rect x="${x}" y="342" width="${dL - L - 28}" height="128" rx="1.5" fill="url(#cognac_doors)" opacity=".78"/><rect x="${x}" y="342" width="${dL - L - 28}" height="128" filter="url(#leather_doors)"/>${[0, 1, 2, 3].map((k) => line(x + 4, 358 + k * 30, x + dL - L - 32, 358 + k * 30, { color: C.cognacHi, w: 0.6, o: 0.7 })).join("")}`).join("")}
    ${inset(L + 14, top + 24, dL - L - 28, 150)}${inset(L + 14, 342, dL - L - 28, 128)}
    ${inset(dR + 14, top + 24, R - dR - 28, 150)}${inset(dR + 14, 342, R - dR - 28, 128)}
    ${line(L, 330, dL, 330, { color: C.brass, w: 1.2 })}${line(dR, 330, R, 330, { color: C.brass, w: 1.2 })}
    <!-- door opening reveal -->
    <rect x="${dL - 3}" y="${top + 6}" width="${dR - dL + 6}" height="${floor - top - 6}" fill="${C.champagneLo}"/>
    <!-- back leaf (left), then front leaf (right) overlapping it -->
    ${panel(dL, 176, mid + 3 - dL, floor - 4 - 176, "url(#leaf_doors)")}
    <rect x="${dL + 10}" y="182" width="${mid - dL - 22}" height="84" fill="${C.ivory}" opacity=".55"/>
    ${inset(dL + 10, 182, mid - dL - 22, 84)}
    ${inset(dL + 10, 280, mid - dL - 22, 196)}
    <rect x="${mid - 16}" y="298" width="3" height="96" rx="1.5" fill="url(#plate_doors)"/>
    ${line(mid + 3, 176, mid + 3, floor - 4, { color: C.taupeLo, w: 0.8, o: 0.6 })}
    ${panel(mid, 176, dR - mid, floor - 4 - 176, "url(#leaf_doors)")}
    <rect x="${mid + 12}" y="182" width="${dR - mid - 22}" height="84" fill="${C.ivory}" opacity=".55"/>
    ${inset(mid + 12, 182, dR - mid - 22, 84)}
    ${inset(mid + 12, 280, dR - mid - 22, 196)}
    ${slats}
    <rect x="${mid + 13}" y="298" width="3" height="96" rx="1.5" fill="url(#plate_doors)"/>
    ${line(mid, 176, mid, floor - 4, { color: C.taupeLo, w: 1 })}
    ${line(mid + 1, 176, mid + 1, floor - 4, { color: C.ivory, w: 0.8, o: 0.7 })}
    <!-- header track and floor track -->
    <rect x="${dL - 6}" y="${top + 6}" width="${dR - dL + 12}" height="14" fill="url(#cap_doors)"/>
    <rect x="${dL - 6}" y="${top + 6}" width="${dR - dL + 12}" height="14" filter="url(#brushed_doors)"/>
    ${line(dL - 6, top + 20, dR + 6, top + 20, { color: C.brassLo, w: 0.9 })}
    ${line(dL - 6, floor - 4, dR + 6, floor - 4, { color: C.brassLo, w: 0.9 })}
    ${line(dL - 6, floor - 1.5, dR + 6, floor - 1.5, { color: C.brass, w: 0.75 })}
    <!-- kick plate -->
    <rect x="${L}" y="${floor - 14}" width="${dL - L}" height="14" fill="${C.walnut}"/>
    <rect x="${dR}" y="${floor - 14}" width="${R - dR}" height="14" fill="${C.walnut}"/>
    ${line(L, floor - 14, dL, floor - 14, { color: C.brass, w: 0.8 })}${line(dR, floor - 14, R, floor - 14, { color: C.brass, w: 0.8 })}
    <!-- wall-top cap rail -->
    <rect x="${L - 6}" y="${top - 6}" width="${R - L + 12}" height="8" rx="1" fill="url(#cap_doors)"/>
    <rect x="${L - 6}" y="${top - 6}" width="${R - L + 12}" height="8" filter="url(#brushed_doors)"/>
    ${line(L - 6, top + 2, R + 6, top + 2, { color: C.brassLo, w: 0.8 })}
    <!-- number plate -->
    <rect x="${dR + 26}" y="236" width="56" height="34" rx="2" fill="url(#plate_doors)"/>
    <rect x="${dR + 26}" y="236" width="56" height="34" rx="2" filter="url(#brushed_doors)"/>
    <rect x="${dR + 30}" y="240" width="48" height="26" rx="1" fill="${C.slate}"/>
    <text x="${dR + 54}" y="260" text-anchor="middle" font-family="${SERIF}" font-size="19" fill="${C.brassHi}" letter-spacing="1">1A</text>
    <circle cx="${dR + 54}" cy="292" r="2.6" fill="${C.wineHi}" stroke="${C.wine}" stroke-width=".8"/>
    <text x="${dR + 54}" y="306" text-anchor="middle" font-family="${SANS}" font-size="4.5" letter-spacing="2" fill="${C.brassLo}">PRIVACY</text>
    ${line(L, top, L, floor, { color: C.brass, w: 0.8 })}${line(R, top, R, floor, { color: C.brass, w: 0.8 })}`
  );
}

// 2. The seat made up as a bed: duvet folded back on the diagonal, pillows, pajamas and a card.
{
  const W = 600, H = 420;
  const by = 214, fy = 318; // back and front edges of the mattress top
  const bx0 = 104, bx1 = 512, fx0 = 66, fx1 = 556;
  const P = (u, v, lift = 0) => [bx0 + (bx1 - bx0) * u + (fx0 - bx0 + (fx1 - fx0 - (bx1 - bx0)) * u) * v, by + (fy - by) * v - lift];
  const quad = (u0, u1, v0, v1, lift = 0) => [P(u0, v0, lift), P(u1, v0, lift), P(u1, v1, lift), P(u0, v1, lift)];
  // quilted channels on the padded wall
  let channels = "";
  for (let x = 128; x < 500; x += 34) {
    channels += line(x, 96, x, by - 2, { color: C.taupe, w: 0.8, o: 0.55 });
    channels += line(x + 2.5, 96, x + 2.5, by - 2, { color: C.ivory, w: 0.8, o: 0.6 });
  }
  let stitch = "";
  for (let x = 112; x < 506; x += 34) stitch += `<path d="M${x} 100 V${by - 6}" stroke="${C.brass}" stroke-width=".6" stroke-dasharray="2 2.4" opacity=".55"/>`;
  // pillow: puffed top face
  const pillow = (u0, u1, v0, v1, lift, fill) => {
    const [a, b, c, d] = quad(u0, u1, v0, v1, lift);
    const m = (p, q, dx, dy) => `${f((p[0] + q[0]) / 2 + dx)} ${f((p[1] + q[1]) / 2 + dy)}`;
    return `<path d="M${f(a[0])} ${f(a[1])} Q${m(a, b, 0, -7)} ${f(b[0])} ${f(b[1])} Q${m(b, c, 7, 0)} ${f(c[0])} ${f(c[1])} Q${m(c, d, 0, 9)} ${f(d[0])} ${f(d[1])} Q${m(d, a, -7, 0)} ${f(a[0])} ${f(a[1])} Z" fill="${fill}" stroke="${C.slate}" stroke-width=".9"/>
      <path d="M${m(a, b, 0, 0)} Q${m(a, c, 0, -2)} ${m(c, d, 0, 0)}" fill="none" stroke="${C.champagne}" stroke-width="1" opacity=".7"/>`;
  };
  // duvet boundaries: fold line runs diagonally across the bed
  const uB = 0.34, uF = 0.47, band = 0.075;
  const sheet = poly([P(0, 0), P(uB, 0), P(uF, 1), P(0, 1)], `fill="${C.ivory}"`);
  const duvet = poly([P(uB, 0), P(1, 0), P(1, 1), P(uF, 1)], `fill="url(#duvet_bed)"`);
  const overhang = poly([P(uF, 1), P(1, 1), [P(1, 1)[0] + 4, fy + 30], [P(uF, 1)[0] - 2, fy + 32]], `fill="url(#drape_bed)"`);
  const fold = poly([P(uB, 0, 3), P(uB + band, 0, 3), P(uF + band, 1, 3), P(uF, 1, 3)], `fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".7"`);
  // pajamas, folded square with a satin ribbon and a card
  const pj = quad(0.6, 0.79, 0.24, 0.72, 9);
  const pjBase = quad(0.6, 0.79, 0.24, 0.72, 0);
  const rib = quad(0.67, 0.695, 0.24, 0.72, 9.4);
  const card = quad(0.625, 0.72, 0.36, 0.6, 10);
  scenes["made-bed.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="wall_bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="duvet_bed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="drape_bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="base_bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
      <linearGradient id="pj_bed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.slateHi}"/><stop offset="1" stop-color="${C.slate}"/></linearGradient>
      <linearGradient id="pillow_bed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="#efe8dd"/></linearGradient>
      <linearGradient id="throw_bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
      ${texture("knit_bed", ".9 .3", [0.45, 0.25, 0.25], 0.15, 9)}
      ${texture("linen_bed", ".8 .5", [0.45, 0.38, 0.3], 0.07, 2)}
      ${texture("quilt_bed", ".9", [0.45, 0.36, 0.25], 0.08, 6)}
    </defs>
    <!-- padded side wall -->
    <rect x="96" y="88" width="424" height="${by - 86}" rx="6" fill="url(#wall_bed)"/>
    <rect x="96" y="88" width="424" height="${by - 86}" rx="6" filter="url(#quilt_bed)"/>
    ${channels}${stitch}
    <rect x="96" y="88" width="424" height="${by - 86}" rx="6" fill="none" stroke="${C.brass}" stroke-width="1"/>
    <rect x="90" y="82" width="436" height="5" rx="1" fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".6"/>
    <!-- reading light: brass gooseneck at the head -->
    <circle cx="124" cy="104" r="6" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".7"/>
    <path d="M124 104 C134 104 150 106 158 124" fill="none" stroke="${C.brass}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M151 122 L166 128 L162 136 L148 130 Z" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".7"/>
    <ellipse cx="156" cy="133" rx="7" ry="2" fill="${C.ivory}" transform="rotate(22 156 133)"/>
    <path d="M149 133 L120 214 L200 214 L164 136 Z" fill="#fff" opacity=".22"/>
    <!-- bed base and mattress -->
    ${poly([[fx0 - 2, fy + 28], [fx1 + 2, fy + 28], [fx1 - 4, fy + 58], [fx0 + 4, fy + 58]], `fill="url(#base_bed)"`)}
    ${line(fx0 + 4, fy + 58, fx1 - 4, fy + 58, { color: C.brass, w: 1 })}
    ${line(fx0, fy + 31, fx1, fy + 31, { color: C.brass, w: 0.8 })}
    ${contact(311, fy + 60, 240, 3, 0.07)}
    ${poly([[fx0, fy], [fx1, fy], [fx1, fy + 28], [fx0, fy + 28]], `fill="${C.cream}" stroke="${C.taupe}" stroke-width=".7"`)}
    ${poly([P(0, 0), P(1, 0), P(1, 1), P(0, 1)], `fill="${C.ivory}" stroke="${C.taupeLo}" stroke-width=".8"`)}
    ${sheet}
    <!-- pillows against the head -->
    ${pillow(0.02, 0.2, 0.04, 0.48, 14, "url(#pillow_bed)")}
    ${pillow(0.04, 0.23, 0.5, 0.95, 12, "url(#pillow_bed)")}
    <!-- duvet, its drape over the side, the diagonal fold -->
    ${duvet}
    ${poly([P(uB, 0), P(1, 0), P(1, 1), P(uF, 1)], `filter="url(#linen_bed)"`)}
    ${overhang}
    ${poly([P(uF, 1), P(1, 1), [P(1, 1)[0] + 4, fy + 30], [P(uF, 1)[0] - 2, fy + 32]], `filter="url(#linen_bed)"`)}
    ${line(P(uF, 1)[0], fy, P(1, 1)[0], fy, { color: C.taupe, w: 0.8, o: 0.6 })}
    ${line(P(uF, 1)[0] - 2, fy + 32, P(1, 1)[0] + 4, fy + 30, { color: C.taupe, w: 0.8, o: 0.8 })}
    <path d="M${pts([P(uB + band + 0.02, 0.06), P(0.97, 0.06), P(0.97, 0.94), P(uF + band + 0.015, 0.94)])}" fill="none" stroke="${C.brass}" stroke-width=".6" stroke-dasharray="2 2" opacity=".6"/>
    ${fold}
    ${line(...P(uB + band - 0.012, 0, 3), ...P(uF + band - 0.012, 1, 3), { color: C.brass, w: 1 })}
    ${line(...P(uB + 0.01, 0, 3), ...P(uF + 0.01, 1, 3), { color: C.sand, w: 2, o: 0.9 })}
    <path d="M${f(P(uF, 1, 3)[0])} ${f(P(uF, 1, 3)[1])} Q${f(P(uF, 1)[0] + 12)} ${fy + 12} ${f(P(uF + band, 1, 3)[0])} ${f(P(uF + band, 1, 3)[1])}" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".7"/>
    <!-- dusty-rose throw folded across the foot -->
    ${poly([P(0.85, 0, 4), P(0.97, 0, 4), P(0.975, 1, 4), [P(0.975, 1)[0] + 3, fy + 25], [P(0.85, 1)[0] + 1, fy + 26], P(0.85, 1, 4)], `fill="url(#throw_bed)"`)}
    ${poly([P(0.85, 0, 4), P(0.97, 0, 4), P(0.975, 1, 4), [P(0.975, 1)[0] + 3, fy + 25], [P(0.85, 1)[0] + 1, fy + 26], P(0.85, 1, 4)], `filter="url(#knit_bed)"`)}
    ${line(...P(0.85, 1, 4), ...P(0.975, 1, 4), { color: C.wineHi, w: 0.9 })}
    ${line(...P(0.85, 0, 4), ...P(0.85, 1, 4), { color: C.wineHi, w: 0.8 })}${line(...P(0.97, 0, 4), ...P(0.975, 1, 4), { color: C.wineHi, w: 0.8 })}
    ${[0.88, 0.91, 0.94].map((u) => line(...P(u, 0.04, 4), ...P(u, 0.97, 4), { color: C.rose, w: 0.6, o: 0.9 })).join("")}
    <!-- folded pajamas -->
    ${contact((pjBase[0][0] + pjBase[2][0]) / 2, pjBase[2][1] + 1, 50, 3, 0.08)}
    ${poly([pjBase[3], pjBase[2], pj[2], pj[3]], `fill="${C.slate}"`)}
    ${line(pjBase[3][0], pjBase[3][1] - 4.5, pjBase[2][0], pjBase[2][1] - 4.5, { color: C.ivory, w: 0.6, o: 0.6 })}
    ${poly(pj, `fill="url(#pj_bed)" stroke="${C.slate}" stroke-width=".6"`)}
    ${line(...P(0.6, 0.66, 9), ...P(0.79, 0.66, 9), { color: C.ivory, w: 0.9, o: 0.85 })}
    ${poly(rib, `fill="${C.wineHi}"`)}
    ${poly([rib[3], rib[2], [rib[2][0], rib[2][1] + 9], [rib[3][0], rib[3][1] + 9]], `fill="${C.wine}"`)}
    ${poly(card, `fill="${C.ivory}" stroke="${C.brass}" stroke-width=".7"`)}
    ${line(...P(0.645, 0.46, 10), ...P(0.7, 0.46, 10), { color: C.brass, w: 0.6 })}
    ${line(...P(0.655, 0.51, 10), ...P(0.69, 0.51, 10), { color: C.brass, w: 0.5, o: 0.7 })}`
  );
}

// 3. The personal screen in a walnut wall panel, showing a bright welcome page.
{
  const W = 600, H = 420;
  const sx = 126, sy = 74, sw = 348, sh = 204;
  const a = [sx + 74, sy + 132], b = [sx + sw - 74, sy + 132], c = [sx + sw / 2, sy + 76];
  const bez = (t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];
  const pl = bez(0.58), pn = bez(0.6);
  const ang = (Math.atan2(pn[1] - pl[1], pn[0] - pl[0]) * 180) / Math.PI;
  // split the arc at the plane for flown / to fly
  const t = 0.58, q1 = [(1 - t) * a[0] + t * c[0], (1 - t) * a[1] + t * c[1]], q2 = [(1 - t) * c[0] + t * b[0], (1 - t) * c[1] + t * b[1]];
  const menu = ["DINE", "WATCH", "LISTEN", "SLEEP", "ROUTE"];
  scenes["personal-screen.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="walnut_screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d5a43"/><stop offset="1" stop-color="${C.walnut}"/></linearGradient>
      <linearGradient id="ui_screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="ledge_screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
      <linearGradient id="wall_screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      ${texture("veneer_screen", ".004 .35", [0.25, 0.16, 0.1], 0.35, 11, 4)}
      ${texture("leather_screen", ".9", [0.45, 0.36, 0.25], 0.08, 12)}
    </defs>
    <!-- champagne wall -->
    <rect x="40" y="30" width="520" height="290" fill="url(#wall_screen)"/>
    <rect x="40" y="30" width="520" height="290" filter="url(#leather_screen)"/>
    ${line(40, 30, 560, 30, { color: C.brass, w: 1 })}
    <!-- walnut panel -->
    <rect x="92" y="48" width="416" height="256" rx="3" fill="url(#walnut_screen)"/>
    <rect x="92" y="48" width="416" height="256" rx="3" filter="url(#veneer_screen)"/>
    <rect x="92.5" y="48.5" width="415" height="255" rx="3" fill="none" stroke="${C.brass}" stroke-width="1.2"/>
    <rect x="98" y="54" width="404" height="244" rx="2" fill="none" stroke="${C.brassHi}" stroke-width=".6" stroke-opacity=".6"/>
    <!-- screen -->
    <rect x="${sx - 4}" y="${sy - 4}" width="${sw + 8}" height="${sh + 8}" rx="3" fill="${C.espresso}"/>
    <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="url(#ui_screen)"/>
    <g font-family="${SANS}" fill="${C.espresso}">
      <text x="${sx + 16}" y="${sy + 20}" font-size="6.5" letter-spacing="3" fill="${C.slate}">SUITE 1A</text>
      <text x="${sx + sw - 16}" y="${sy + 20}" font-size="6.5" letter-spacing="3" text-anchor="end" fill="${C.brassLo}">21:40</text>
      <text x="${sx + sw / 2}" y="${sy + 52}" text-anchor="middle" font-family="${SERIF}" font-size="21" font-style="italic" fill="${C.espresso}">Good evening, Mr Pandya</text>
      ${line(sx + sw / 2 - 18, sy + 64, sx + sw / 2 + 18, sy + 64, { color: C.brass, w: 0.8 })}
      <path d="M${f(a[0])} ${f(a[1])} Q${f(q1[0])} ${f(q1[1])} ${f(pl[0])} ${f(pl[1])}" fill="none" stroke="${C.wine}" stroke-width="1.4"/>
      <path d="M${f(pl[0])} ${f(pl[1])} Q${f(q2[0])} ${f(q2[1])} ${f(b[0])} ${f(b[1])}" fill="none" stroke="${C.wineHi}" stroke-width="1" stroke-dasharray="2 3"/>
      <circle cx="${a[0]}" cy="${a[1]}" r="3" fill="${C.wine}"/>
      <circle cx="${b[0]}" cy="${b[1]}" r="3" fill="${C.ivory}" stroke="${C.wine}" stroke-width="1.1"/>
      <g transform="translate(${f(pl[0])} ${f(pl[1])}) rotate(${f(ang)})"><path d="M7 0 L-5 -1.2 L-6 -6 L-8 -6 L-7 -1 L-8 0 L-7 1 L-8 6 L-6 6 L-5 1.2 Z" fill="${C.slate}"/></g>
      <text x="${a[0]}" y="${a[1] + 18}" text-anchor="middle" font-size="10" letter-spacing="3">DXB</text>
      <text x="${a[0]}" y="${a[1] + 27}" text-anchor="middle" font-size="5.5" letter-spacing="2.5" fill="${C.taupeLo}">DUBAI</text>
      <text x="${b[0]}" y="${b[1] + 18}" text-anchor="middle" font-size="10" letter-spacing="3">JFK</text>
      <text x="${b[0]}" y="${b[1] + 27}" text-anchor="middle" font-size="5.5" letter-spacing="2.5" fill="${C.taupeLo}">NEW YORK</text>
      <text x="${sx + sw / 2}" y="${sy + 152}" text-anchor="middle" font-size="6" letter-spacing="3" fill="${C.slate}">8 H 25 M REMAINING</text>
      ${line(sx + 16, sy + sh - 30, sx + sw - 16, sy + sh - 30, { color: C.champagne, w: 0.8 })}
      ${menu.map((m, i) => `<text x="${f(sx + 16 + (sw - 32) * (i + 0.5) / menu.length)}" y="${sy + sh - 13}" text-anchor="middle" font-size="6.5" letter-spacing="3" fill="${i === 0 ? C.slate : C.taupeLo}">${m}</text>`).join("")}
      ${line(sx + 16 + (sw - 32) * 0.1 - 10, sy + sh - 8, sx + 16 + (sw - 32) * 0.1 + 10, sy + sh - 8, { color: C.wine, w: 1.2 })}
    </g>
    <!-- leather ledge and docked handset -->
    <path d="M60 322 L540 322 L556 336 L44 336 Z" fill="${C.sand}"/>
    ${line(44, 336, 556, 336, { color: C.brass, w: 1 })}
    <rect x="44" y="336" width="512" height="18" fill="url(#ledge_screen)"/>
    <rect x="44" y="336" width="512" height="18" filter="url(#leather_screen)"/>
    <path d="M48 344 H552" stroke="${C.brassLo}" stroke-width=".6" stroke-dasharray="2 2.5" opacity=".6"/>
    ${line(44, 354, 556, 354, { color: C.brass, w: 0.8 })}
    ${contact(420, 331, 22, 2, 0.1)}
    <rect x="394" y="324" width="52" height="8" rx="4" fill="${C.cognac}" stroke="${C.brassLo}" stroke-width=".7"/>
    <rect x="397" y="325.5" width="46" height="2" rx="1" fill="${C.cognacHi}" opacity=".7"/>
    <circle cx="404" cy="328.5" r="1.6" fill="${C.brassHi}"/><rect x="412" y="327.5" width="22" height="2" rx="1" fill="${C.brassHi}"/>
    ${contact(150, 331, 18, 2, 0.1)}
    <rect x="128" y="320" width="44" height="12" rx="2" fill="${C.slate}"/>
    <rect x="128" y="320" width="44" height="3" rx="1.5" fill="${C.slateHi}" opacity=".6"/>
    ${line(128, 326, 172, 326, { color: C.brassHi, w: 0.6 })}`
  );
}

// 4. The vanity console: rounded mirror with a lit edge, cognac tray, lotion, sage towel, a rose in a bud vase.
{
  const W = 480, H = 580;
  const top = 412; // countertop front edge
  scenes["vanity-mirror.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="panel_vanity" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="glass_vanity" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f2ec"/><stop offset=".6" stop-color="#e9e2d7"/><stop offset="1" stop-color="#ddd4c6"/></linearGradient>
      <linearGradient id="ring_vanity" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="fascia_vanity" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d5a43"/><stop offset="1" stop-color="${C.walnut}"/></linearGradient>
      <linearGradient id="tray_vanity" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brass}"/><stop offset=".4" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="bottle_vanity" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset=".7" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="vase_vanity" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.sand}"/><stop offset=".35" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <clipPath id="mirror_vanity"><rect x="146" y="72" width="188" height="262" rx="94"/></clipPath>
      ${texture("leather_vanity", ".9", [0.45, 0.36, 0.25], 0.07, 21)}
      ${texture("veneer_vanity", ".004 .3", [0.25, 0.16, 0.1], 0.32, 22, 4)}
      ${texture("brushed_vanity", ".02 .9", [0.4, 0.3, 0.18], 0.25, 23, 2)}
      ${texture("towel_vanity", ".9 .4", [0.2, 0.25, 0.15], 0.25, 24)}
      <linearGradient id="cognac_vanity" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cognac}"/><stop offset=".45" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
      <linearGradient id="rose_vanity" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
    </defs>
    <!-- champagne wall panel -->
    <rect x="72" y="40" width="336" height="${top - 40}" fill="url(#panel_vanity)"/>
    <rect x="72" y="40" width="336" height="${top - 40}" filter="url(#leather_vanity)"/>
    <rect x="72.5" y="40.5" width="335" height="${top - 41}" fill="none" stroke="${C.brass}" stroke-width=".9"/>
    <!-- mirror: brass ring, lit edge, glass -->
    <rect x="136" y="62" width="208" height="282" rx="104" fill="url(#ring_vanity)"/>
    <rect x="136" y="62" width="208" height="282" rx="104" filter="url(#brushed_vanity)"/>
    <rect x="140" y="66" width="200" height="274" rx="100" fill="${C.ivory}"/>
    <rect x="146" y="72" width="188" height="262" rx="94" fill="url(#glass_vanity)"/>
    <g clip-path="url(#mirror_vanity)">
      <rect x="146" y="252" width="188" height="90" fill="${C.champagne}" opacity=".35"/>
      ${line(146, 252, 334, 252, { color: C.brass, w: 0.7, o: 0.5 })}
      ${line(250, 72, 250, 252, { color: C.taupe, w: 0.7, o: 0.35 })}
      <path d="M170 72 L230 72 L146 220 L146 120 Z" fill="#fff" opacity=".45"/>
      <path d="M250 72 L262 72 L146 278 L146 256 Z" fill="#fff" opacity=".35"/>
    </g>
    <rect x="146.5" y="72.5" width="187" height="261" rx="93.5" fill="none" stroke="#fff" stroke-width="3" stroke-opacity=".9"/>
    <rect x="140.5" y="66.5" width="199" height="273" rx="99.5" fill="none" stroke="${C.brassHi}" stroke-width=".7"/>
    <!-- countertop -->
    <path d="M72 ${top - 16} L408 ${top - 16} L420 ${top} L60 ${top} Z" fill="${C.sand}"/>
    ${line(72, top - 16, 408, top - 16, { color: C.brass, w: 0.7, o: 0.6 })}
    <rect x="60" y="${top}" width="360" height="5" fill="${C.brassHi}"/>
    <rect x="60" y="${top}" width="360" height="5" filter="url(#brushed_vanity)"/>
    ${line(60, top + 5, 420, top + 5, { color: C.brassLo, w: 0.8 })}
    <rect x="60" y="${top + 5}" width="360" height="74" fill="url(#fascia_vanity)"/>
    <rect x="60" y="${top + 5}" width="360" height="74" filter="url(#veneer_vanity)"/>
    ${line(240, top + 5, 240, top + 79, { color: C.espresso, w: 0.8, o: 0.4 })}
    <rect x="172" y="${top + 38}" width="40" height="2.5" rx="1.2" fill="${C.brassHi}"/><rect x="268" y="${top + 38}" width="40" height="2.5" rx="1.2" fill="${C.brassHi}"/>
    ${line(60, top + 79, 420, top + 79, { color: C.brass, w: 1 })}
    ${contact(240, top + 81, 170, 2.5, 0.06)}
    <!-- cognac leather tray with brass rim -->
    ${contact(196, 405, 66, 2.5, 0.12)}
    <path d="M136 398 Q136 394 142 394 L250 394 Q256 394 256 398 L258 404 Q258 407 252 407 L140 407 Q134 407 134 404 Z" fill="url(#cognac_vanity)" stroke="${C.brass}" stroke-width="1"/>
    <path d="M141 397 L251 397 L253 402 L139 402 Z" fill="${C.cognacHi}" opacity=".55"/>
    <path d="M142 398.5 L250 398.5 L251.5 401.5 L140.5 401.5 Z" fill="none" stroke="${C.ivory}" stroke-width=".5" stroke-dasharray="1.5 1.5" opacity=".7"/>
    ${line(134, 404.5, 258, 404.5, { color: C.brassLo, w: 0.6 })}
    <!-- lotion bottle with brass pump and slate label -->
    ${contact(170, 399, 18, 2, 0.12)}
    <rect x="154" y="322" width="32" height="78" rx="6" fill="url(#bottle_vanity)" stroke="${C.taupeLo}" stroke-width=".7"/>
    <rect x="159" y="348" width="22" height="30" rx="1" fill="${C.slate}"/>
    ${line(163, 357, 177, 357, { color: C.brassHi, w: 0.7 })}${line(165, 363, 175, 363, { color: C.slateHi, w: 0.5 })}${line(166, 367, 174, 367, { color: C.slateHi, w: 0.5 })}
    <rect x="161" y="314" width="18" height="8" rx="1.5" fill="url(#tray_vanity)"/>
    <rect x="168" y="300" width="4" height="14" fill="${C.brass}"/>
    <path d="M165 300 L174 300 L174 296 L156 296 L154 298 L165 298 Z" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".6"/>
    <!-- bud vase with a single rose -->
    ${contact(228, 399, 13, 2, 0.12)}
    <path d="M228 304 C226 280 224 260 226 238" fill="none" stroke="${C.sageLo}" stroke-width="1.4"/>
    <path d="M227 282 C234 272 244 272 250 264 C240 262 230 268 227 282 Z" fill="${C.sage}"/>
    ${line(227, 282, 248, 265, { color: C.sageLo, w: 0.5 })}
    <path d="M226 262 C218 258 210 258 205 251 C214 248 222 252 226 262 Z" fill="${C.sage}"/>
    ${line(226, 262, 207, 251.5, { color: C.sageLo, w: 0.5 })}
    <path d="M226 238 C215 234 215 218 226 208 C237 218 237 234 226 238 Z" fill="url(#rose_vanity)" stroke="${C.wine}" stroke-width=".6"/>
    <path d="M226 238 C218 234 217 224 221 215 C223 226 230 231 235 229 C233 235 230 238 226 238 Z" fill="${C.wineHi}" opacity=".85"/>
    <path d="M222 216 C226 212 230 214 229 219" fill="none" stroke="${C.wine}" stroke-width=".6"/>
    <path d="M226 240 L219 232 L224 236 L226 228 L228 236 L233 232 Z" fill="${C.sageLo}"/>
    <path d="M222 304 L234 304 L234 312 C244 320 244 386 238 398 L218 398 C212 386 212 320 222 312 Z" fill="url(#vase_vanity)" stroke="${C.taupeLo}" stroke-width=".7"/>
    <ellipse cx="228" cy="304" rx="6" ry="1.5" fill="${C.sand}" stroke="${C.taupeLo}" stroke-width=".6"/>
    <path d="M217 330 C216 350 216 370 219 390" fill="none" stroke="#fff" stroke-width="1.6" opacity=".8"/>
    <!-- folded sage hand towel -->
    ${contact(330, 399, 46, 2.5, 0.12)}
    <path d="M286 398 L286 380 Q286 374 292 374 L372 374 Q378 374 378 380 L378 398 Z" fill="${C.sageLo}" stroke="${C.sageLo}" stroke-width=".7"/>
    <path d="M288 374 L288 360 Q288 354 294 354 L370 354 Q376 354 376 360 L376 374" fill="${C.sage}" stroke="${C.sageLo}" stroke-width=".7"/>
    <path d="M286 398 L286 380 Q286 374 292 374 L372 374 Q378 374 378 380 L378 398 Z" filter="url(#towel_vanity)"/>
    <path d="M288 374 L288 360 Q288 354 294 354 L370 354 Q376 354 376 360 L376 374 Z" filter="url(#towel_vanity)"/>
    <path d="M289 360 Q289 355 294 355 L370 355" fill="none" stroke="${C.ivory}" stroke-width=".8" opacity=".35"/>
    <rect x="350" y="354.5" width="10" height="43" fill="${C.ivory}" opacity=".85"/>
    ${line(349, 355, 349, 397.5, { color: C.brassHi, w: 0.7 })}${line(361, 355, 361, 397.5, { color: C.brassHi, w: 0.7 })}
    ${line(292, 374, 374, 374, { color: C.ivory, w: 0.8, o: 0.4 })}
    ${line(286, 398, 378, 398, { color: C.sageLo, w: 0.8 })}`
  );
}

// 5. Three small windows in a champagne sidewall: bright midday sky, cloud deck below, one sheer shade half down.
{
  const W = 600, H = 400;
  const ww = 66, wh = 98, wy = 128;
  const cxs = [190, 300, 410];
  const r = rng(61);
  // a soft cloud deck across the whole view
  let puffs = "";
  for (let x = 100; x < 520; x += 9) puffs += `<circle cx="${f(x + r() * 6)}" cy="${f(wy + 66 + r() * 10 - Math.sin(x / 40) * 7)}" r="${f(8 + r() * 11)}" fill="#fff"/>`;
  let wisps = "";
  for (let i = 0; i < 6; i++) wisps += `<ellipse cx="${f(120 + r() * 380)}" cy="${f(wy + 52 + r() * 10)}" rx="${f(18 + r() * 24)}" ry="2" fill="#fff" opacity=".7"/>`;
  let weave = "";
  for (let x = cxs[2] - ww / 2 + 3; x < cxs[2] + ww / 2; x += 4) weave += line(x, wy - 2, x, wy + 46, { color: C.taupe, w: 0.4, o: 0.35 });
  const frame = (cx) => `
    <rect x="${cx - ww / 2 - 16}" y="${wy - 16}" width="${ww + 32}" height="${wh + 32}" rx="${(ww + 32) / 2.3}" fill="url(#bezel_window)" stroke="${C.brass}" stroke-width="1"/>
    <rect x="${cx - ww / 2 - 7}" y="${wy - 7}" width="${ww + 14}" height="${wh + 14}" rx="${(ww + 14) / 2.3}" fill="url(#reveal_window)" stroke="${C.taupe}" stroke-width=".7"/>`;
  scenes["suite-window.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="wall_window" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="bezel_window" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="reveal_window" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="#f8f4ed"/></linearGradient>
      <linearGradient id="sky_window" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd2e0"/><stop offset=".55" stop-color="${C.sky}"/><stop offset="1" stop-color="#eef2f4"/></linearGradient>
      <linearGradient id="shade_window" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}" stop-opacity=".85"/><stop offset="1" stop-color="${C.ivory}" stop-opacity=".7"/></linearGradient>
      <clipPath id="glass_window">${cxs.map((cx) => `<rect x="${cx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" rx="${ww / 2.3}"/>`).join("")}</clipPath>
      ${blur("cloud_window", 2.5)}
      <linearGradient id="cushion_window" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
      ${texture("knit_window", ".9 .5", [0.25, 0.15, 0.12], 0.14, 33)}
      ${texture("leather_window", ".9", [0.45, 0.36, 0.25], 0.07, 31)}
      ${texture("brushed_window", ".02 .9", [0.4, 0.3, 0.18], 0.25, 32, 2)}
    </defs>
    <!-- sidewall -->
    <rect x="0" y="40" width="${W}" height="300" fill="url(#wall_window)"/>
    <rect x="0" y="40" width="${W}" height="300" filter="url(#leather_window)"/>
    <rect x="0" y="0" width="${W}" height="40" fill="${C.ivory}"/>
    ${line(0, 40, W, 40, { color: C.brass, w: 1 })}${line(0, 44, W, 44, { color: C.brass, w: 0.6, o: 0.6 })}
        <!-- frames -->
    ${cxs.map(frame).join("")}
    <!-- outside -->
    <g clip-path="url(#glass_window)">
      <rect x="100" y="${wy}" width="400" height="${wh}" fill="url(#sky_window)"/>
      ${wisps}
      <g filter="url(#cloud_window)" transform="translate(0 4)" opacity=".9"><g fill="#d6e0e6">${puffs.replace(/fill="#fff"/g, 'fill="#d6e0e6"')}</g></g>
      <g filter="url(#cloud_window)">${puffs}<rect x="100" y="${wy + 82}" width="400" height="40" fill="#fff"/></g>
      <path d="M100 ${wy + 88} Q300 ${wy + 80} 500 ${wy + 90}" fill="none" stroke="#e3e9ed" stroke-width="3" filter="url(#cloud_window)"/>
      <!-- sheer shade, half down on the third window -->
      <rect x="${cxs[2] - ww / 2}" y="${wy - 2}" width="${ww}" height="48" fill="url(#shade_window)"/>
      ${weave}
    </g>
    <rect x="${cxs[2] - ww / 2 + 4}" y="${wy + 45}" width="${ww - 8}" height="3" rx="1.5" fill="${C.brassHi}" stroke="${C.brass}" stroke-width=".6"/>
    <rect x="${cxs[2] - 4}" y="${wy + 48}" width="8" height="4" rx="1" fill="${C.brass}"/>
    ${cxs.map((cx) => `<rect x="${cx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" rx="${ww / 2.3}" fill="none" stroke="${C.taupe}" stroke-width=".8"/><path d="M${cx - ww / 2 + 10} ${wy + 30} Q${cx - ww / 2 + 14} ${wy + 12} ${cx - ww / 2 + 30} ${wy + 8}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"/>`).join("")}
    <!-- sill ledge with brass edge -->
    <path d="M60 268 L540 268 L552 280 L48 280 Z" fill="${C.sand}"/>
    <rect x="48" y="280" width="504" height="5" fill="${C.brassHi}"/>
    <rect x="48" y="280" width="504" height="5" filter="url(#brushed_window)"/>
    ${line(48, 285, 552, 285, { color: C.brassLo, w: 0.8 })}
    ${line(48, 280, 552, 280, { color: C.brass, w: 0.8 })}
    <!-- dusty-rose cushion and a folded sage throw on the ledge -->
    ${contact(102, 270, 34, 2, 0.12)}
    <path d="M68 270 Q62 246 68 222 Q102 214 136 222 Q142 246 136 270 Q102 276 68 270 Z" fill="url(#cushion_window)" stroke="${C.wineHi}" stroke-width="1.2"/>
    <path d="M68 270 Q62 246 68 222 Q102 214 136 222 Q142 246 136 270 Q102 276 68 270 Z" filter="url(#knit_window)"/>
    <path d="M70 224 Q100 240 102 246 Q104 240 134 224 M70 268 Q100 252 102 246 Q104 252 134 268" fill="none" stroke="${C.wineHi}" stroke-width=".6" opacity=".6"/>
    <circle cx="102" cy="246" r="2.2" fill="${C.wineHi}"/>
    ${contact(492, 270, 46, 2, 0.12)}
    <rect x="446" y="254" width="92" height="15" rx="4" fill="${C.sageLo}"/>
    <rect x="448" y="242" width="88" height="14" rx="4" fill="${C.sage}"/>
    <rect x="446" y="242" width="92" height="27" rx="4" filter="url(#knit_window)"/>
    ${line(452, 256, 532, 256, { color: C.ivory, w: 0.6, o: 0.45 })}
    ${line(448, 249, 536, 249, { color: C.ivory, w: 0.5, o: 0.35 })}
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => line(538, 257 + k * 1.2, 542, 257.5 + k * 1.2, { color: C.sageLo, w: 0.6 })).join("")}
    <!-- small slate shade switch -->
    <rect x="484" y="168" width="18" height="30" rx="2" fill="${C.slate}" stroke="${C.brass}" stroke-width=".8"/>
    ${line(488, 183, 498, 183, { color: C.slateHi, w: 0.6 })}
    <path d="M493 173 L490 177 L496 177 Z M493 193 L490 189 L496 189 Z" fill="${C.brassHi}"/>
    <rect x="0" y="340" width="${W}" height="${H - 340}" fill="${C.sand}"/>
    ${line(0, 340, W, 340, { color: C.taupe, w: 0.8 })}`
  );
}

// 6. The reserved first-class lavatory, door half open, seen from the aisle.
{
  const W = 520, H = 600;
  const oL = 140, oR = 400, oT = 108, oB = 525; // doorway opening
  const bL = 176, bR = 356, bT = 140, bB = 440; // back wall
  const ct = 336, cf = 349; // counter back and front edges
  const r = rng(66);
  // stone veining on the back wall
  let veins = "";
  for (let i = 0; i < 7; i++) {
    const x = bL + r() * (bR - bL), y = bT + r() * (bB - bT);
    veins += `<path d="M${f(x)} ${f(y)} q${f(10 + r() * 20)} ${f(-6 + r() * 12)} ${f(24 + r() * 30)} ${f(-4 + r() * 16)}" fill="none" stroke="${C.taupe}" stroke-width=".5" opacity=".35"/>`;
  }
  // floor tile joints converging on the back wall
  let tiles = "";
  for (let i = 1; i < 5; i++) {
    const t = i / 5;
    tiles += line(bL + (bR - bL) * t, bB, oL + (oR - oL) * t, oB, { color: C.taupe, w: 0.6, o: 0.5 });
  }
  [0.35, 0.72].forEach((t) => {
    const y = bB + (oB - bB) * t;
    tiles += line(bL + (oL - bL) * t, y, bR + (oR - bR) * t, y, { color: C.taupe, w: 0.6, o: 0.5 });
  });
  const roll = (cx, cy, rr) =>
    `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${C.ivory}" stroke="${C.taupeLo}" stroke-width=".7"/><path d="M${cx} ${cy} m-1.5 0 a1.5 1.5 0 1 1 3 0 a3.5 3.5 0 1 1 -6 1 a5.5 5.5 0 1 1 10 -1" fill="none" stroke="${C.champagneLo}" stroke-width=".6"/>`;
  const bottle = (x, label) =>
    `<rect x="${x}" y="${cf - 27}" width="10" height="24" rx="2.5" fill="url(#glass_lav)" stroke="${C.taupeLo}" stroke-width=".6"/><rect x="${x + 1.5}" y="${cf - 18}" width="7" height="9" fill="${label}"/>${line(x + 3, cf - 14, x + 7, cf - 14, { color: C.brassHi, w: 0.5 })}<rect x="${x + 3}" y="${cf - 31}" width="4" height="4" rx=".8" fill="${C.brass}"/>`;
  scenes["reserved-lavatory.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="wall_lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="stone_lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="side_lav" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="floor_lav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="walnut_lav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d5a43"/><stop offset="1" stop-color="${C.walnut}"/></linearGradient>
      <linearGradient id="mirror_lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset=".6" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="door_lav" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="brass_lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="bowl_lav" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.sand}"/><stop offset=".35" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="glass_lav" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="sky_lav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd2e0"/><stop offset="1" stop-color="${C.sky}"/></linearGradient>
      <linearGradient id="rose_lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
      ${texture("leather_lav", ".9", [0.45, 0.36, 0.25], 0.07, 41)}
      ${texture("veneer_lav", ".004 .3", [0.25, 0.16, 0.1], 0.32, 42, 4)}
      ${texture("brushed_lav", ".02 .9", [0.4, 0.3, 0.18], 0.25, 43, 2)}
      ${texture("stone_tex_lav", ".05", [0.55, 0.47, 0.38], 0.08, 44)}
    </defs>
    <!-- aisle floor -->
    <rect y="${oB}" width="${W}" height="${H - oB}" fill="${C.sand}"/>
    ${line(0, oB, W, oB, { color: C.taupe, w: 0.8 })}
    <!-- outer bulkhead wall -->
    <rect x="40" y="40" width="440" height="${oB - 40}" fill="url(#wall_lav)"/>
    <rect x="40" y="40" width="440" height="${oB - 40}" filter="url(#leather_lav)"/>
    <rect x="34" y="34" width="452" height="7" rx="1" fill="url(#brass_lav)"/>
    ${line(40, 41, 40, oB, { color: C.brass, w: 0.8 })}${line(480, 41, 480, oB, { color: C.brass, w: 0.8 })}
    <rect x="40" y="${oB - 14}" width="${oL - 40 - 6}" height="14" fill="${C.walnut}"/><rect x="${oR + 6}" y="${oB - 14}" width="${480 - oR - 6}" height="14" fill="${C.walnut}"/>
    <!-- interior: ceiling, side wall, floor, back wall -->
    ${poly([[oL, oT], [oR, oT], [bR, bT], [bL, bT]], `fill="${C.ivory}"`)}
    ${line(bL + 30, bT - 8, bR - 30, bT - 8, { color: C.brassHi, w: 2 })}
    ${poly([[oL, oB], [oR, oB], [bR, bB], [bL, bB]], `fill="url(#floor_lav)"`)}
    ${tiles}
    ${poly([[bR, bT], [oR, oT], [oR, oB], [bR, bB]], `fill="url(#side_lav)"`)}
    ${poly([[bL, bT], [oL, oT], [oL, oB], [bL, bB]], `fill="${C.sand}"`)}
    <rect x="${bL}" y="${bT}" width="${bR - bL}" height="${bB - bT}" fill="url(#stone_lav)"/>
    <rect x="${bL}" y="${bT}" width="${bR - bL}" height="${bB - bT}" filter="url(#stone_tex_lav)"/>
    ${veins}
    <rect x="${bL}" y="${bT}" width="${bR - bL}" height="${bB - bT}" fill="none" stroke="${C.taupe}" stroke-width=".7"/>
    ${line(bR, bT, oR, oT, { color: C.taupe, w: 0.6 })}${line(bR, bB, oR, oB, { color: C.taupe, w: 0.6 })}
    ${line(bL, bB, oL, oB, { color: C.taupe, w: 0.6 })}
    <!-- little window on the side wall -->
    <g transform="translate(378 262) skewY(-35)">
      <rect x="-11" y="-30" width="22" height="58" rx="11" fill="${C.ivory}" stroke="${C.brass}" stroke-width=".8"/>
      <rect x="-7" y="-25" width="14" height="48" rx="7" fill="url(#sky_lav)"/>
      <path d="M-7 12 Q-3 7 0 10 Q4 6 7 10 L7 18 L-7 18 Z" fill="#fff" opacity=".95"/>
      <rect x="-7" y="-25" width="14" height="48" rx="7" fill="none" stroke="${C.taupe}" stroke-width=".6"/>
    </g>
    <!-- large lit mirror -->
    <rect x="194" y="160" width="144" height="146" rx="10" fill="url(#brass_lav)"/>
    <rect x="197" y="163" width="138" height="140" rx="8" fill="#fff"/>
    <rect x="202" y="168" width="128" height="130" rx="6" fill="url(#mirror_lav)"/>
    <path d="M222 168 L262 168 L202 250 L202 196 Z" fill="#fff" opacity=".5"/>
    <path d="M290 168 L298 168 L230 298 L222 298 Z" fill="#fff" opacity=".35"/>
    <rect x="202.5" y="168.5" width="127" height="129" rx="6" fill="none" stroke="${C.brassHi}" stroke-width=".6"/>
    <!-- counter: stone top, walnut front -->
    ${poly([[bL, ct], [bR, ct], [bR + 6, cf], [bL - 6, cf]], `fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".7"`)}
    <rect x="${bL - 6}" y="${cf}" width="${bR - bL + 12}" height="4" fill="url(#brass_lav)"/>
    <rect x="${bL - 6}" y="${cf + 4}" width="${bR - bL + 12}" height="32" fill="url(#walnut_lav)"/>
    <rect x="${bL - 6}" y="${cf + 4}" width="${bR - bL + 12}" height="32" filter="url(#veneer_lav)"/>
    ${line(bL - 6, cf + 36, bR + 6, cf + 36, { color: C.brass, w: 0.9 })}
    ${line(266, cf + 4, 266, cf + 36, { color: C.espresso, w: 0.7, o: 0.4 })}
    ${contact(266, cf + 60, 80, 3, 0.06)}
    <!-- vessel sink and brass faucet -->
    <path d="M292 ${cf - 4} L292 304 Q292 294 282 294 L272 294 Q266 294 266 300 L266 306" fill="none" stroke="url(#brass_lav)" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="288" y="${cf - 6}" width="8" height="4" rx="1" fill="${C.brass}"/>
    ${line(292, 312, 302, 308, { color: C.brass, w: 2 })}
    ${contact(266, cf - 1, 24, 2, 0.12)}
    <path d="M238 330 Q240 ${cf - 1} 266 ${cf - 1} Q292 ${cf - 1} 294 330 Z" fill="url(#bowl_lav)" stroke="${C.taupeLo}" stroke-width=".7"/>
    <ellipse cx="266" cy="330" rx="28" ry="5" fill="${C.cream}" stroke="${C.taupeLo}" stroke-width=".7"/>
    <ellipse cx="266" cy="331" rx="22" ry="3" fill="${C.sand}"/>
    <!-- rolled hand towels -->
    ${contact(211, cf - 2, 20, 2, 0.12)}
    ${roll(203, cf - 10, 8)}${roll(220, cf - 10, 8)}${roll(211.5, cf - 25, 8)}
    <!-- amenity bottles: cognac and slate labels -->
    ${contact(312, cf - 2, 14, 2, 0.12)}
    ${bottle(301, C.cognac)}${bottle(313, C.slate)}
    <!-- small vase with a rose -->
    ${contact(338, cf - 2, 8, 2, 0.12)}
    <path d="M338 ${cf - 22} C337 ${cf - 40} 336 ${cf - 52} 337 ${cf - 62}" fill="none" stroke="${C.sageLo}" stroke-width="1.1"/>
    <path d="M337 ${cf - 42} C343 ${cf - 48} 348 ${cf - 48} 351 ${cf - 52} C345 ${cf - 54} 339 ${cf - 50} 337 ${cf - 42} Z" fill="${C.sage}"/>
    <path d="M337 ${cf - 61} C330 ${cf - 63} 330 ${cf - 74} 337 ${cf - 80} C344 ${cf - 74} 344 ${cf - 63} 337 ${cf - 61} Z" fill="url(#rose_lav)" stroke="${C.wine}" stroke-width=".5"/>
    <path d="M337 ${cf - 61} C332 ${cf - 63} 331 ${cf - 69} 334 ${cf - 74} C335 ${cf - 68} 339 ${cf - 65} 342 ${cf - 66} C341 ${cf - 63} 339 ${cf - 61} 337 ${cf - 61} Z" fill="${C.wineHi}" opacity=".85"/>
    <path d="M333 ${cf - 24} L343 ${cf - 24} L344 ${cf - 3} Q338 ${cf - 1} 332 ${cf - 3} Z" fill="url(#glass_lav)" stroke="${C.taupeLo}" stroke-width=".6"/>
    <!-- the door, swung half open into the lavatory -->
    ${poly([[oL, oT + 2], [oL + 50, oT + 26], [oL + 50, oB - 22], [oL, oB]], `fill="url(#door_lav)" stroke="${C.taupeLo}" stroke-width=".8"`)}
    ${poly([[oL, oT + 2], [oL + 50, oT + 26], [oL + 50, oB - 22], [oL, oB]], `filter="url(#leather_lav)"`)}
    ${poly([[oL + 8, oT + 22], [oL + 42, oT + 40], [oL + 42, oB - 40], [oL + 8, oB - 22]], `fill="none" stroke="${C.brass}" stroke-width=".8"`)}
    ${line(oL + 50, oT + 26, oL + 50, oB - 22, { color: C.brassLo, w: 1.2 })}
    <path d="M${oL + 46} 318 L${oL + 46} 322 L${oL + 30} 328" fill="none" stroke="url(#brass_lav)" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${oL + 46}" cy="320" r="2.6" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".5"/>
    <!-- door casing -->
    <rect x="${oL - 6}" y="${oT - 6}" width="${oR - oL + 12}" height="${oB - oT + 6}" fill="none" stroke="url(#brass_lav)" stroke-width="5"/>
    ${line(oL - 8.5, oT - 8.5, oR + 8.5, oT - 8.5, { color: C.brassLo, w: 0.6 })}
    <!-- brass plate above the doorway -->
    <rect x="${W / 2 - 74}" y="64" width="148" height="22" rx="2" fill="url(#brass_lav)"/>
    <rect x="${W / 2 - 74}" y="64" width="148" height="22" rx="2" filter="url(#brushed_lav)"/>
    <rect x="${W / 2 - 71}" y="67" width="142" height="16" rx="1" fill="none" stroke="${C.brassLo}" stroke-width=".6"/>
    <text x="${W / 2 + 2}" y="78.5" text-anchor="middle" font-family="${SANS}" font-size="7.5" letter-spacing="4" fill="${C.espresso}">FIRST CLASS ONLY</text>`
  );
}
