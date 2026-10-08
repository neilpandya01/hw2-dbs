// Landside, curb to bag drop: the road gantry, the terminal doors, the big
// split-flap board, the map, the check-in hall, the kiosk, the scale, the bag tag.
import { f, C, COND, t, rect, line, svg, picto, arrow, panel, flap, flapRow, seg7Row, hazard, barcode } from "./lib.mjs";

export const scenes = {};

// 1. Road gantry at the departures curb: lane signs over a converging roadway.
{
  const W = 720, H = 460, vx = 360, hz = 270;
  let lanes = "";
  // Dashed lane lines converging to the vanishing point.
  for (const xb of [240, 480]) {
    for (let k = 0; k < 9; k++) {
      const t0 = Math.pow(k / 9, 1.6), t1 = Math.pow((k + 0.45) / 9, 1.6);
      const x0 = vx + (xb - vx) * t0, y0 = hz + (H - hz) * t0, x1 = vx + (xb - vx) * t1, y1 = hz + (H - hz) * t1;
      lanes += line(x0, y0, x1, y1, C.white, 1 + 5 * t1);
    }
  }
  scenes["curb-gantry.svg"] = svg(
    W,
    H,
    `<rect width="${W}" height="${hz}" fill="#e3e8eb"/>
    <!-- terminal on the horizon -->
    ${rect(0, 196, W, 74, C.concrete)}${rect(0, 210, W, 34, C.glass)}
    ${Array.from({ length: 24 }, (_, i) => rect(i * 30 + 12, 210, 3, 34, C.glassLo)).join("")}
    ${rect(0, 190, W, 8, C.sign)}
    ${rect(0, hz, W, H - hz, C.concreteLo)}
    <path d="M${vx - 40} ${hz} L${vx + 40} ${hz} L${W + 120} ${H} L-120 ${H} Z" fill="${C.asphalt}"/>
    ${lanes}
    <!-- yellow-painted curb on the left -->
    <path d="M${vx - 40} ${hz} L${vx - 34} ${hz} L-90 ${H} L-120 ${H} Z" fill="${C.yellow}"/>
    <!-- gantry -->
    ${rect(36, 54, 16, H - 54, C.steel)}${rect(W - 52, 54, 16, H - 54, C.steel)}
    ${rect(24, 50, W - 48, 16, C.steelLo)}
    ${rect(110, 66, 6, 12, C.steelLo)}${rect(330, 66, 6, 12, C.steelLo)}${rect(420, 66, 6, 12, C.steelLo)}${rect(620, 66, 6, 12, C.steelLo)}
    <!-- sign 1: Departures -->
    ${panel(70, 78, 300, 118)}
    ${picto("departures", 86, 94, 58)}
    ${t(158, 128, "Departures", { size: 34, len: 168 })}
    ${t(158, 158, "Terminal 3 · Gates A–C", { size: 15, fill: C.yellow, weight: 700, len: 168 })}
    ${rect(158, 172, 196, 2, C.white, { o: 0.25 })}
    ${t(158, 189, "Drop-off only · no waiting", { size: 11, weight: 400, len: 160 })}
    <!-- sign 2: Arrivals -->
    ${panel(400, 78, 250, 118, C.blue)}
    ${picto("arrivals", 414, 94, 58)}
    ${t(486, 128, "Arrivals", { size: 34, len: 138 })}
    ${t(486, 158, "Lower level", { size: 15, weight: 400, len: 90 })}
    ${arrow(590, 150, 40, 45)}
    <!-- the terminal number plate on the beam -->
    ${rect(318, 22, 84, 40, C.yellow, { r: 3 })}
    ${t(360, 52, "T3", { size: 30, fill: C.sign, anchor: "middle" })}`,
  );
}

// 2. Terminal entrance: the giant yellow 3, the glass wall, the sliding doors.
{
  const W = 640, H = 640;
  let mull = "";
  for (let x = 0; x <= W; x += 80) mull += rect(x - 3, 70, 6, 470, C.steelLo);
  scenes["terminal-entrance.svg"] = svg(
    W,
    H,
    `${rect(0, 70, W, 470, C.glass)}
    <!-- the hall seen dimly through the glass: a far wall and a hanging sign -->
    ${rect(0, 300, W, 240, C.glassLo, { o: 0.5 })}
    ${rect(300, 170, 260, 40, C.sign, { o: 0.55 })}
    ${mull}
    ${rect(0, 160, W, 6, C.steelLo)}${rect(0, 296, W, 6, C.steelLo)}
    <!-- canopy -->
    ${rect(0, 0, W, 74, C.sign)}
    ${t(40, 48, "TERMINAL 3", { size: 30, ls: 4, len: 210 })}
    ${t(600, 48, "DEPARTURES", { size: 30, ls: 4, fill: C.yellow, anchor: "end", len: 210 })}
    <!-- pylon -->
    ${rect(32, 100, 136, 440, C.sign)}
    ${t(100, 138, "TERMINAL", { size: 16, ls: 5, anchor: "middle", len: 104 })}
    ${t(100, 356, "3", { size: 260, fill: C.yellow, anchor: "middle" })}
    ${picto("departures", 64, 400, 72)}
    ${t(100, 508, "Gates A · B · C", { size: 14, weight: 400, anchor: "middle", len: 104 })}
    <!-- sliding doors -->
    ${rect(250, 296, 340, 248, C.steel)}
    ${rect(262, 310, 154, 230, C.glassLo)}${rect(424, 310, 154, 230, C.glassLo)}
    ${rect(416, 310, 8, 230, C.steelLo)}
    ${rect(262, 404, 154, 22, C.sign)}${rect(424, 404, 154, 22, C.sign)}
    ${t(339, 420, "AUTOMATIC DOOR", { size: 11, anchor: "middle", ls: 2, len: 120 })}
    ${t(501, 420, "AUTOMATIC DOOR", { size: 11, anchor: "middle", ls: 2, len: 120 })}
    ${rect(380, 318, 80, 80, C.sign)}${picto("departures", 392, 330, 56)}
    <!-- a traveler heading in -->
    ${picto("man", 440, 382, 150, C.sign)}
    ${picto("baggage", 530, 478, 64, C.sign, C.glassLo)}
    <!-- pavement and tactile strip -->
    ${rect(0, 540, W, 100, C.concrete)}
    ${rect(0, 552, W, 18, C.yellow)}
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${8 + i * 16}" cy="561" r="3.5" fill="${C.yellowLo}"/>`).join("")}
    ${Array.from({ length: 9 }, (_, i) => rect(i * 80, 590, 2, 50, C.concreteLo)).join("")}`,
  );
}

// 3. The split-flap departures board (the hero).
{
  const W = 840, H = 560, tw = 17, th = 28, gp = 2, pitch = tw + gp;
  const cols = { time: 34, flight: 34 + 5 * pitch + 14, dest: 0, gate: 0, rem: 0 };
  cols.dest = cols.flight + 7 * pitch + 14;
  cols.gate = cols.dest + 13 * pitch + 14;
  cols.rem = cols.gate + 3 * pitch + 16;
  const remW = W - 34 - cols.rem;
  const rows = [
    ["20:55", "LH 431", "FRANKFURT", "B12", "DEPARTED", null],
    ["21:05", "UA 914", "LONDON LHR", "B22", "BOARDING", C.green],
    ["21:10", "AF 137", "PARIS CDG", "C07", "GATE CHANGE", C.amber],
    ["21:20", "NH 11", "TOKYO HND", "A04", "ON TIME", ""],
    ["21:35", "EK 236", "DUBAI", "C14", "DELAYED 22:10", C.amber],
    ["21:40", "AA 2402", "NEW YORK JFK", "B03", "FINAL CALL", C.green],
    ["21:50", "AC 851", "TORONTO", "A09", "ON TIME", ""],
    ["22:05", "KE 38", "SEOUL ICN", "C02", "CANCELLED", C.red],
    ["22:15", "TK 6", "ISTANBUL", "B18", "ON TIME", ""],
    ["22:30", "IB 6274", "MADRID", "A11", "ON TIME", ""],
  ];
  const pad = (s, n) => (s + " ".repeat(n)).slice(0, n);
  let body = "";
  rows.forEach(([time, fl, dest, gate, rem, col], i) => {
    const y = 128 + i * 41;
    body += flapRow(cols.time, y, time, tw, th, gp);
    body += flapRow(cols.flight, y, pad(fl, 7), tw, th, gp);
    body += flapRow(cols.dest, y, pad(dest, 13), tw, th, gp);
    body += flapRow(cols.gate, y, gate, tw, th, gp, { color: C.yellow });
    if (col === null) {
      body += rect(cols.rem, y, remW, th, C.flap, { r: 1.5 }) + t(cols.rem + remW / 2, y + 19, rem, { size: 13, anchor: "middle", fill: C.steel, font: COND, ls: 1.5 });
    } else if (col === "") {
      body += rect(cols.rem, y, remW, th, C.flap, { r: 1.5 }) + t(cols.rem + remW / 2, y + 19, rem, { size: 13, anchor: "middle", font: COND, ls: 1.5 });
    } else {
      body += rect(cols.rem, y, remW, th, col, { r: 1.5 }) + t(cols.rem + remW / 2, y + 19, rem, { size: 13, anchor: "middle", font: COND, ls: 1.5, fill: col === C.amber ? C.sign : C.white });
    }
    body += line(cols.rem, y + th / 2, cols.rem + remW, y + th / 2, "#000", 1, { o: 0.35 });
  });
  const head = (x, s) => t(x, 114, s, { size: 11, fill: C.steelHi, ls: 2, weight: 700 });
  scenes["flap-board.svg"] = svg(
    W,
    H,
    `${rect(10, 10, W - 20, H - 20, C.board, { r: 6 })}
    ${rect(10, 10, W - 20, 72, C.sign, { r: 6 })}${rect(10, 60, W - 20, 22, C.sign)}
    ${picto("departures", 30, 22, 46, C.yellow)}
    ${t(92, 62, "Departures", { size: 38, fill: C.yellow, len: 210 })}
    ${t(318, 62, "Départs", { size: 22, weight: 400, fill: C.steelHi, len: 84 })}
    ${flapRow(W - 34 - 5 * 23 - 4 * 3, 26, "21:12", 23, 38, 3, { color: C.yellow })}
    ${head(cols.time, "TIME")}${head(cols.flight, "FLIGHT")}${head(cols.dest, "DESTINATION")}${head(cols.gate, "GATE")}${head(cols.rem, "REMARKS")}
    ${body}`,
    { bg: C.floor },
  );
}

// 4. Split-flap macro: the gate number mid-flip, B21 becoming B22.
{
  const W = 640, H = 560, tw = 168, th = 252, y0 = 150, xs = [44, 236, 428], fs = 210;
  const clipT = (id, x) => `<clipPath id="${id}"><rect x="${x}" y="${y0}" width="${tw}" height="${th / 2}"/></clipPath>`;
  const clipB = (id, x) => `<clipPath id="${id}"><rect x="${x}" y="${y0 + th / 2}" width="${tw}" height="${th / 2}"/></clipPath>`;
  const glyph = (x, ch, fill = C.white) => t(x + tw / 2, y0 + th / 2 + fs * 0.36, ch, { size: fs, anchor: "middle", fill });
  const pins = (x) => `${rect(x - 10, y0 + th / 2 - 7, 12, 14, C.steel, { r: 2 })}${rect(x + tw - 2, y0 + th / 2 - 7, 12, 14, C.steel, { r: 2 })}`;
  // The falling flap, past horizontal: a foreshortened trapezoid under the hinge
  // showing the new 2's lower half, squashed.
  const x3 = xs[2], hy = y0 + th / 2, fh = th / 2 * 0.42;
  const fall = `<clipPath id="fallc"><path d="M${x3} ${hy} L${x3 + tw} ${hy} L${x3 + tw + 10} ${hy + fh} L${x3 - 10} ${hy + fh} Z"/></clipPath>
    <path d="M${x3} ${hy} L${x3 + tw} ${hy} L${x3 + tw + 10} ${hy + fh} L${x3 - 10} ${hy + fh} Z" fill="#30343a"/>
    <g clip-path="url(#fallc)"><g transform="translate(0 ${f(hy)}) scale(1 .42) translate(0 ${f(-hy)})"><g clip-path="url(#cB3)">${glyph(x3, "2", C.yellow)}</g></g></g>
    ${rect(x3 - 10, hy + fh, tw + 20, 10, "#000", { o: 0.35 })}`;
  scenes["flap-closeup.svg"] = svg(
    W,
    H,
    `<defs>${clipT("cT1", xs[0])}${clipB("cB1", xs[0])}${clipT("cT3", xs[2])}${clipB("cB3", xs[2])}</defs>
    ${rect(0, 0, W, H, C.board)}
    ${rect(0, 0, W, 96, C.sign)}
    ${t(44, 62, "GATE", { size: 26, fill: C.steelHi, ls: 8, len: 110 })}
    ${t(W - 44, 62, "UA 914 · LONDON", { size: 26, fill: C.yellow, anchor: "end", len: 250 })}
    ${flap(xs[0], y0, tw, th, "B", { size: fs, color: C.yellow })}${pins(xs[0])}
    ${flap(xs[1], y0, tw, th, "2", { size: fs, color: C.yellow })}${pins(xs[1])}
    <!-- third tile: new top already showing, old bottom still there, flap falling over it -->
    ${rect(x3, y0, tw, th / 2, C.flap, { r: 1.5 })}<g clip-path="url(#cT3)">${glyph(x3, "2", C.yellow)}</g>
    ${rect(x3, y0 + th / 2, tw, th / 2, C.flapLo, { r: 1.5 })}<g clip-path="url(#cB3)">${glyph(x3, "1", C.yellow)}</g>
    ${fall}
    ${line(x3, hy, x3 + tw, hy, "#0b0c0e", 10)}${pins(x3)}
    ${line(xs[0], hy, xs[0] + tw, hy, "#0b0c0e", 10)}${line(xs[1], hy, xs[1] + tw, hy, "#0b0c0e", 10)}
    <!-- next row peeking in at the bottom -->
    ${flapRow(44, 470, "BOARDING", 64, 90, 6, { color: C.white })}`,
    { bg: C.board },
  );
}

// 5. "You are here" terminal directory map.
{
  const W = 640, H = 760;
  const gateDots = (x1, y1, x2, y2, n, prefix, side, step = 1) => {
    let s = "";
    for (let i = 1; i <= n; i++) {
      const k = i / (n + 0.6), x = x1 + (x2 - x1) * k, y = y1 + (y2 - y1) * k;
      const lx = x + side * 22;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="${C.sign}" stroke="${C.white}" stroke-width="3"/>`;
      if ((i % 2 === 0 || i === n) && !(prefix === "B" && i === 11)) s += t(lx, y + 5, `${prefix}${i * step}`, { size: 13, fill: C.steelHi, anchor: side > 0 ? "start" : "end" });
    }
    return s;
  };
  const node = (x, y, name) => `<circle cx="${x}" cy="${y}" r="17" fill="${C.white}"/>${picto(name, x - 11, y - 11, 22, C.sign, C.white)}`;
  scenes["terminal-map.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, H, C.steelLo)}
    ${rect(24, 24, W - 48, H - 48, C.sign, { r: 4 })}
    ${picto("info", 52, 52, 40, C.yellow)}
    ${t(104, 82, "Terminal 3", { size: 32, len: 172 })}
    ${t(W - 52, 82, "Departures level", { size: 17, weight: 400, fill: C.steelHi, anchor: "end", len: 140 })}
    ${rect(52, 106, W - 104, 2, C.steelLo)}
    <!-- piers -->
    <path d="M320 470 L150 180 M320 470 L320 150 M320 470 L490 180" stroke="${C.steelLo}" stroke-width="34" stroke-linecap="round"/>
    ${gateDots(300, 430, 150, 180, 12, "A", -1)}
    ${gateDots(320, 420, 320, 150, 12, "B", 1, 2)}
    ${gateDots(340, 430, 490, 180, 14, "C", 1)}
    ${t(124, 160, "A", { size: 40, fill: C.white, anchor: "middle" })}${t(320, 132, "B", { size: 40, fill: C.white, anchor: "middle" })}${t(516, 160, "C", { size: 40, fill: C.white, anchor: "middle" })}
    <!-- central hall and security -->
    ${rect(150, 470, 340, 92, C.steelLo, { r: 6 })}
    ${t(262, 522, "Airside hall", { size: 16, weight: 400, anchor: "middle", fill: C.white })}
    ${rect(206, 580, 228, 46, C.white, { r: 4 })}
    ${picto("security", 380, 588, 30, C.sign, C.white)}
    ${t(222, 610, "Security", { size: 18, fill: C.sign })}
    <!-- route from here to B22 -->
    <path d="M320 660 L320 190" fill="none" stroke="${C.yellow}" stroke-width="7" stroke-dasharray="14 9"/>
    <circle cx="320" cy="184" r="13" fill="${C.yellow}"/>${t(298, 191, "B22", { size: 20, fill: C.yellow, anchor: "end" })}
    <circle cx="320" cy="666" r="16" fill="${C.yellow}"/><circle cx="320" cy="666" r="6" fill="${C.sign}"/>
    ${t(348, 672, "You are here", { size: 18, fill: C.yellow })}
    ${node(184, 520, "toilets")}${node(428, 520, "coffee")}${node(236, 330, "food")}${node(404, 330, "shop")}
    <!-- legend -->
    ${rect(52, 690, W - 104, 2, C.steelLo)}
    ${picto("toilets", 56, 704, 22)}${t(84, 721, "Toilets", { size: 13, weight: 400 })}
    ${picto("coffee", 166, 704, 22)}${t(194, 721, "Café", { size: 13, weight: 400 })}
    ${picto("food", 256, 704, 22)}${t(284, 721, "Dining", { size: 13, weight: 400 })}
    ${picto("shop", 356, 704, 22, C.white)}${t(384, 721, "Shops", { size: 13, weight: 400 })}
    <circle cx="470" cy="715" r="9" fill="${C.yellow}"/>${t(486, 721, "8 min walk", { size: 13, weight: 400, fill: C.yellow })}`,
  );
}

// 7. Self-service kiosk: the yellow button is the one thing to press.
{
  const W = 600, H = 820, kx = 150, kw = 300;
  scenes["kiosk.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 700, C.concrete)}${rect(0, 700, W, 120, C.floor)}
    ${rect(kx - 16, 780, kw + 32, 16, C.steelLo, { r: 3 })}
    ${rect(kx, 60, kw, 724, C.white, { r: 10 })}
    ${rect(kx, 60, kw, 70, C.sign, { r: 10 })}${rect(kx, 100, kw, 30, C.sign)}
    ${t(kx + 24, 108, "CHECK-IN", { size: 24, fill: C.yellow, ls: 3, len: 140 })}
    ${picto("departures", kx + kw - 64, 76, 40)}
    <!-- screen -->
    ${rect(kx + 20, 150, kw - 40, 340, C.sign, { r: 4 })}
    ${rect(kx + 30, 160, kw - 60, 320, C.floor)}
    ${t(kx + 48, 202, "Check in", { size: 28, fill: C.sign, len: 118 })}
    ${t(kx + 48, 228, "Step 1 of 4", { size: 13, fill: C.steelLo, weight: 400 })}
    ${rect(kx + 48, 252, kw - 96, 84, C.yellow, { r: 3 })}
    ${picto("passport", kx + 60, 268, 52, C.sign, C.yellow)}
    ${t(kx + 118, 290, "Scan", { size: 20, fill: C.sign })}${t(kx + 118, 314, "passport", { size: 20, fill: C.sign })}
    ${rect(kx + 48, 350, kw - 96, 60, "none", { r: 3, stroke: C.sign, sw: 3 })}
    ${t(kx + kw / 2, 386, "Enter booking code", { size: 15, fill: C.sign, anchor: "middle", len: 150 })}
    ${[0, 1, 2, 3].map((i) => rect(kx + 48 + i * 52, 440, 44, 6, i === 0 ? C.sign : C.concreteLo)).join("")}
    <!-- passport reader -->
    ${rect(kx + 30, 520, kw - 60, 70, C.sign, { r: 4 })}
    ${rect(kx + 50, 534, 150, 42, C.steelLo, { r: 2 })}
    ${t(kx + 125, 560, "PASSPORT", { size: 11, anchor: "middle", ls: 2 })}
    ${rect(kx + 220, 548, 14, 14, C.green, { r: 2 })}
    ${arrow(kx + 234, 532, 0)}
    <!-- printer slots -->
    ${rect(kx + 30, 618, kw - 60, 14, C.sign, { r: 2 })}
    ${t(kx + 30, 652, "Boarding pass", { size: 12, fill: C.steelLo, weight: 400 })}
    ${rect(kx + 30, 672, kw - 60, 14, C.sign, { r: 2 })}
    ${t(kx + 30, 706, "Bag tags", { size: 12, fill: C.steelLo, weight: 400 })}
    ${rect(kx + 30, 726, 50, 30, C.yellow, { r: 2 })}${t(kx + 55, 747, "12", { size: 16, fill: C.sign, anchor: "middle" })}`,
  );
}

// 8. Bag drop scale: 23.4 kg in red — two hundred grams over.
{
  const W = 680, H = 460;
  let rollers = "";
  for (let x = 0; x < W; x += 34) rollers += rect(x, 352, 3, 108, "#000", { o: 0.35 });
  scenes["bag-scale.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 340, C.steelHi)}
    ${rect(60, 46, 440, 170, C.sign, { r: 8 })}
    ${rect(80, 66, 400, 130, "#140707", { r: 4 })}
    ${seg7Row(102, 86, "23.4", 90, C.red, "#2e0d0b", 22)}
    ${t(456, 182, "KG", { size: 28, fill: C.red, anchor: "end" })}
    ${rect(520, 46, 110, 170, C.amber, { r: 6 })}
    ${t(575, 96, "MAX", { size: 22, fill: C.sign, anchor: "middle" })}
    ${t(575, 150, "23", { size: 56, fill: C.sign, anchor: "middle" })}
    ${t(575, 184, "KG", { size: 22, fill: C.sign, anchor: "middle" })}
    ${t(60, 270, "BAG DROP", { size: 16, fill: C.sign, ls: 3 })}${t(60, 300, "44", { size: 30, fill: C.sign })}
    ${hazard("hz_scale", 0, 314, W, 26)}
    ${rect(0, 340, W, 120, C.sign)}${rollers}
    <!-- a hard-shell suitcase on the belt -->
    ${rect(200, 256, 300, 102, C.blue, { r: 14 })}
    ${[240, 290, 340, 390, 440].map((x) => rect(x, 262, 8, 90, "#174ca8", { r: 3 })).join("")}
    ${rect(306, 236, 48, 24, "none", { r: 6, stroke: C.sign, sw: 8 })}
    <!-- HEAVY tag -->
    ${line(336, 244, 380, 300, C.sign, 3)}
    <g transform="rotate(14 404 316)">${rect(370, 296, 76, 44, C.yellow, { r: 4 })}${t(408, 325, "HEAVY", { size: 17, fill: C.sign, anchor: "middle", len: 60 })}</g>`,
  );
}

// 9. The bag tag: the destination code is the biggest thing on it.
{
  const W = 560, H = 820;
  scenes["bag-tag.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, H, C.asphalt)}
    <g transform="rotate(-5 280 410)">
      ${rect(130, 20, 300, 790, C.white, { r: 4 })}
      ${rect(130, 20, 300, 80, C.concrete, { r: 4 })}
      <circle cx="280" cy="58" r="14" fill="${C.asphalt}"/>
      ${line(150, 100, 410, 100, C.steel, 2, { dash: "6 6" })}
      ${rect(130, 112, 300, 58, C.sign)}
      ${t(150, 151, "PRIORITY", { size: 26, fill: C.yellow, ls: 3, len: 160 })}
      ${picto("baggage", 372, 120, 42, C.white, C.sign)}
      ${t(280, 330, "LHR", { size: 150, fill: C.sign, anchor: "middle", len: 250 })}
      ${t(280, 366, "LONDON HEATHROW", { size: 20, fill: C.sign, anchor: "middle", ls: 2, len: 250 })}
      ${rect(150, 390, 260, 3, C.sign)}
      ${t(150, 426, "UA 914", { size: 26, fill: C.sign })}${t(410, 426, "07OCT", { size: 26, fill: C.sign, anchor: "end" })}
      ${t(150, 458, "ORD → LHR", { size: 18, fill: C.sign, weight: 400 })}${t(410, 458, "DOE/J", { size: 18, fill: C.sign, weight: 400, anchor: "end" })}
      ${barcode(160, 486, 240, 110, 11)}
      ${t(280, 622, "0016 914 302", { size: 18, fill: C.sign, anchor: "middle", ls: 3 })}
      ${line(150, 646, 410, 646, C.steel, 2, { dash: "6 6" })}
      ${t(150, 690, "LHR", { size: 40, fill: C.sign })}
      ${barcode(250, 662, 160, 50, 23)}
      ${t(150, 740, "Claim check · keep this part", { size: 13, fill: C.steelLo, weight: 400 })}
      ${rect(130, 760, 300, 50, C.yellow)}
      ${t(280, 792, "UA 914 · 07OCT", { size: 15, fill: C.sign, anchor: "middle", ls: 2 })}
    </g>`,
    { bg: C.asphalt },
  );
}
