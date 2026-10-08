// At the gate: the gate pillar, a gate change, the boarding-group lanes, the
// seats, the mobile pass, the e-gate scanner, and the plane through the glass.
import { f, rng, C, COND, t, rect, line, svg, picto, arrow, panel, barcode } from "./lib.mjs";

export const scenes = {};

// 19. Gate pillar B22 with its flight screen.
{
  const W = 560, H = 820;
  scenes["gate-sign.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 640, C.concrete)}${rect(0, 640, W, 180, C.floor)}
    ${rect(0, 300, 120, 340, C.glass)}${rect(440, 300, 120, 340, C.glass)}
    ${rect(150, 0, 260, 760, C.sign)}
    ${t(280, 70, "GATE", { size: 30, ls: 10, anchor: "middle", len: 150, fill: C.steelHi })}
    ${t(280, 250, "B22", { size: 170, fill: C.yellow, anchor: "middle", len: 236 })}
    ${arrow(240, 280, 80, 0, C.white)}
    <!-- flight screen -->
    ${rect(166, 400, 228, 250, C.white, { r: 3 })}
    ${rect(166, 400, 228, 50, C.green, { r: 3 })}${rect(166, 430, 228, 20, C.green)}
    ${t(280, 434, "BOARDING", { size: 24, anchor: "middle", ls: 3, len: 150 })}
    ${t(184, 492, "UA 914", { size: 28, fill: C.sign })}
    ${t(184, 528, "London", { size: 24, fill: C.sign, weight: 400 })}
    ${t(184, 556, "Heathrow", { size: 24, fill: C.sign, weight: 400 })}
    ${rect(184, 574, 192, 2, C.concreteLo)}
    ${t(184, 606, "Dep 21:05", { size: 18, fill: C.sign })}${t(376, 606, "Group 3", { size: 18, fill: C.sign, anchor: "end" })}
    ${t(184, 632, "Now boarding groups 1–3", { size: 13, fill: C.steelLo, weight: 400 })}
    ${rect(130, 760, 300, 14, C.steelLo)}`,
  );
}

// 20. Gate change: the old gate struck out, the new one huge.
{
  const W = 720, H = 440;
  scenes["gate-change.svg"] = svg(
    W,
    H,
    `${rect(20, 20, W - 40, H - 40, C.sign, { r: 6 })}
    ${rect(20, 20, W - 40, 80, C.amber, { r: 6 })}${rect(20, 80, W - 40, 20, C.amber)}
    ${t(48, 76, "GATE CHANGE", { size: 40, fill: C.sign, ls: 3, len: 330 })}
    ${t(W - 48, 76, "AF 137 · PARIS CDG", { size: 20, fill: C.sign, anchor: "end", len: 210 })}
    ${t(48, 150, "Was", { size: 20, fill: C.steelHi, weight: 400 })}
    ${t(48, 300, "C07", { size: 130, fill: C.steelLo, len: 250 })}
    ${line(40, 254, 310, 254, C.amber, 10)}
    ${arrow(320, 180, 90, 0, C.amber)}
    ${t(440, 150, "Now", { size: 20, fill: C.amber, weight: 400 })}
    ${t(440, 300, "B09", { size: 130, fill: C.yellow, len: 240 })}
    ${rect(48, 340, W - 96, 2, C.steelLo)}
    ${t(48, 380, "Boarding 20:40 · allow 9 minutes to walk", { size: 20, weight: 400, len: 400 })}
    ${picto("clock", W - 88, 352, 40, C.amber)}`,
  );
}

// 21. Boarding-group lanes: numbered posts and belts.
{
  const W = 780, H = 460;
  const groups = ["1", "2", "3", "4", "5"];
  let s = "";
  groups.forEach((g, i) => {
    const x = 60 + i * 150;
    s += rect(x - 6, 190, 12, 220, C.steel) + rect(x - 24, 404, 48, 10, C.steelLo, { r: 3 });
    s += panel(x - 40, 100, 80, 96, i === 0 ? C.yellow : C.sign);
    s += t(x, 176, g, { size: 74, anchor: "middle", fill: i === 0 ? C.sign : C.yellow });
    if (i < groups.length - 1) s += rect(x + 6, 214, 138, 8, C.sign);
  });
  scenes["boarding-lanes.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 300, C.concrete)}${rect(0, 300, W, H - 300, C.floor)}
    ${rect(0, 30, W, 46, C.sign)}
    ${t(30, 62, "BOARDING GROUP", { size: 20, ls: 4, len: 220 })}
    ${t(W - 30, 62, "Now boarding: 1 · 2 · 3", { size: 18, fill: C.green, anchor: "end", len: 210 })}
    ${rect(W - 252, 44, 14, 14, C.green, { r: 7 })}
    ${s}
    <!-- floor lanes -->
    ${[135, 285, 435, 585].map((x) => rect(x - 2, 300, 4, 160, C.yellow)).join("")}
    ${t(60, 360, "PRIORITY", { size: 14, fill: C.sign, anchor: "middle", ls: 2 })}
    ${picto("wheelchair", 40, 372, 40, C.sign)}`,
  );
}

// 22. Gate seating: a beam of perforated steel seats, outlets between.
{
  const W = 780, H = 420;
  const seat = (x) => {
    let holes = "";
    for (let yy = 0; yy < 7; yy++) for (let xx = 0; xx < 5; xx++) holes += `<circle cx="${x + 18 + xx * 16}" cy="${130 + yy * 14}" r="3.5" fill="${C.concrete}"/>`;
    return `${rect(x, 112, 100, 110, C.steelLo, { r: 10 })}${holes}${rect(x - 6, 222, 112, 26, C.steel, { r: 6 })}`;
  };
  let s = "";
  for (let i = 0; i < 6; i++) s += seat(30 + i * 124);
  scenes["gate-seating.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 300, C.glass)}${Array.from({ length: 6 }, (_, i) => rect(i * 156, 0, 6, 300, C.glassLo)).join("")}
    <!-- the plane waiting outside -->
    ${rect(0, 50, W, 54, C.white)}${Array.from({ length: 30 }, (_, i) => rect(14 + i * 26, 66, 12, 16, C.glassLo, { r: 5 })).join("")}${rect(0, 92, W, 6, C.blue)}
    ${rect(0, 300, W, H - 300, C.floor)}
    ${rect(16, 248, W - 32, 14, C.sign)}
    ${[110, 360, 610].map((x) => rect(x, 262, 12, 70, C.sign)).join("")}
    ${[100, 350, 600].map((x) => rect(x - 18, 328, 50, 8, C.sign)).join("")}
    ${s}
    <!-- outlet posts -->
    ${[140, 512].map((x) => `${rect(x, 170, 12, 78, C.sign)}${rect(x - 14, 150, 40, 44, C.yellow, { r: 3 })}${picto("plug", x - 9, 154, 30, C.sign)}`).join("")}
    <!-- someone's backpack and coffee -->
    ${rect(422, 156, 64, 82, C.red, { r: 16 })}${rect(434, 190, 40, 28, "#b92820", { r: 6 })}${rect(440, 140, 28, 22, "none", { r: 10, stroke: C.sign, sw: 6 })}
    ${rect(650, 196, 24, 32, C.white, { r: 3 })}${rect(648, 190, 28, 8, C.sign, { r: 2 })}${rect(650, 208, 24, 10, C.amber)}`,
  );
}

// 23. Mobile boarding pass: the QR code and the gate, nothing else.
{
  const W = 520, H = 840, px = 70, pw = 380;
  const r = rng(91), cells = 25, cs = 10, qx = px + (pw - cells * cs) / 2, qy = 330;
  let qr = "";
  const finder = (gx, gy) => `${rect(qx + gx * cs, qy + gy * cs, 7 * cs, 7 * cs, C.sign)}${rect(qx + (gx + 1) * cs, qy + (gy + 1) * cs, 5 * cs, 5 * cs, C.white)}${rect(qx + (gx + 2) * cs, qy + (gy + 2) * cs, 3 * cs, 3 * cs, C.sign)}`;
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > cells - 9 && y < 8) || (x < 8 && y > cells - 9);
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) if (!inFinder(x, y) && r() > 0.5) qr += rect(qx + x * cs, qy + y * cs, cs, cs, C.sign);
  qr += finder(0, 0) + finder(cells - 7, 0) + finder(0, cells - 7);
  scenes["phone-pass.svg"] = svg(
    W,
    H,
    `${rect(px - 22, 20, pw + 44, 800, C.sign, { r: 46 })}
    ${rect(px, 44, pw, 752, C.white, { r: 28 })}
    ${rect(px + pw / 2 - 50, 52, 100, 22, C.sign, { r: 11 })}
    ${rect(px, 96, pw, 92, C.yellow)}
    ${t(px + 24, 138, "ORD", { size: 40, fill: C.sign })}
    ${picto("departures", px + pw / 2 - 20, 108, 40, C.sign)}
    ${t(px + pw - 24, 138, "LHR", { size: 40, fill: C.sign, anchor: "end" })}
    ${t(px + 24, 172, "Chicago", { size: 14, fill: C.sign, weight: 400 })}${t(px + pw - 24, 172, "London", { size: 14, fill: C.sign, weight: 400, anchor: "end" })}
    ${[["Flight", "UA 914"], ["Gate", "B22"], ["Seat", "32A"]].map(([k, v], i) => `${t(px + 24 + i * 120, 224, k.toUpperCase(), { size: 12, fill: C.steelLo, ls: 2 })}${t(px + 24 + i * 120, 262, v, { size: 30, fill: i === 1 ? C.sign : C.sign })}`).join("")}
    ${rect(px + 144 - 8, 200, 92, 76, "none", { r: 4, stroke: C.yellow, sw: 4 })}
    ${rect(px + 24, 296, pw - 48, 2, C.concrete)}
    ${qr}
    ${t(px + pw / 2, 620, "Group 3 · Boards 20:35", { size: 22, fill: C.sign, anchor: "middle", len: 270 })}
    ${t(px + pw / 2, 650, "DOE / J · 07 OCT", { size: 15, fill: C.steelLo, anchor: "middle", weight: 400, ls: 2 })}
    ${rect(px + 24, 680, pw - 48, 70, C.sign, { r: 4 })}
    ${t(px + pw / 2, 724, "Add to wallet", { size: 18, anchor: "middle" })}`,
    { bg: C.concrete },
  );
}

// 24. The e-gate: scan, then the green arrow.
{
  const W = 640, H = 660;
  scenes["e-gate.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 470, C.concrete)}${rect(0, 470, W, 190, C.floor)}
    <!-- left pedestal -->
    ${rect(60, 200, 170, 380, C.steelHi, { r: 8 })}
    ${rect(60, 200, 170, 90, C.sign, { r: 8 })}${rect(60, 260, 170, 30, C.sign)}
    ${rect(84, 222, 122, 50, C.green, { r: 4 })}
    ${arrow(116, 222, 50, 0, C.white)}
    ${rect(84, 318, 122, 80, "#2b3036", { r: 6 })}
    ${rect(96, 330, 98, 56, C.glassLo, { r: 3 })}
    ${t(145, 524, "SCAN PASS", { size: 15, fill: C.sign, anchor: "middle", ls: 2 })}${arrow(130, 470, 30, -90, C.sign)}
    ${rect(60, 560, 170, 20, C.steelLo)}
    <!-- glass flap doors, open -->
    ${rect(230, 300, 70, 160, C.glass, { o: 0.85 })}${rect(450, 300, 70, 160, C.glass, { o: 0.85 })}
    ${rect(230, 300, 70, 6, C.steelLo)}${rect(450, 300, 70, 6, C.steelLo)}
    <!-- right pedestal -->
    ${rect(520, 200, 120, 380, C.steelHi, { r: 8 })}${rect(520, 200, 120, 90, C.sign, { r: 8 })}${rect(520, 260, 120, 30, C.sign)}
    ${t(580, 256, "B22", { size: 32, fill: C.yellow, anchor: "middle" })}
    ${rect(520, 560, 120, 20, C.steelLo)}
    <!-- floor lane -->
    <path d="M300 580 L450 580 L520 660 L230 660 Z" fill="${C.concrete}"/>
    ${arrow(335, 590, 80, -90, C.yellow)}
    <!-- a phone held to the reader -->
    <g transform="translate(0 70) rotate(-12 150 300)">${rect(110, 250, 80, 140, C.sign, { r: 12 })}${rect(118, 262, 64, 116, C.white, { r: 6 })}
      ${(() => { const r = rng(7); return Array.from({ length: 49 }, (_, i) => (r() > 0.5 || i === 0 || i === 6 || i === 42) ? rect(122 + (i % 7) * 8, 290 + Math.floor(i / 7) * 8, 8, 8, C.sign) : "").join(""); })()}</g>
    <!-- top banner -->
    ${rect(0, 40, W, 70, C.sign)}
    ${t(30, 86, "Boarding", { size: 30 })}${t(W - 30, 86, "UA 914 · London", { size: 22, fill: C.yellow, anchor: "end" })}`,
  );
}

// 25. Through the gate window: the plane parked nose-in, the jet bridge, the tug.
{
  const W = 820, H = 500, gy = 330, cx = 430;
  const engine = (x) => `<circle cx="${x}" cy="292" r="44" fill="${C.steelHi}"/><circle cx="${x}" cy="292" r="34" fill="${C.sign}"/><circle cx="${x}" cy="292" r="9" fill="${C.steel}"/>${rect(x - 6, 236, 12, 16, C.steelLo)}`;
  scenes["gate-window.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, gy, "#dbe5ea")}
    ${rect(0, gy, W, H - gy, C.asphalt)}
    <!-- lead-in line to the nose wheel, and the stop bar -->
    ${rect(cx - 3, 330, 6, H - 330, C.yellow)}${rect(cx - 70, 420, 140, 8, C.yellow)}
    <!-- tail fin and stabilisers behind -->
    <path d="M${cx - 9} 160 L${cx - 5} 30 L${cx + 5} 30 L${cx + 9} 160 Z" fill="${C.blue}"/>
    ${rect(cx - 110, 128, 220, 7, C.steelHi, { r: 3 })}
    <!-- wings, slight dihedral -->
    <path d="M${cx - 60} 250 L40 222 L40 232 L${cx - 60} 276 Z" fill="${C.steelHi}"/>
    <path d="M${cx + 60} 250 L${W - 40} 222 L${W - 40} 232 L${cx + 60} 276 Z" fill="${C.steelHi}"/>
    ${rect(34, 206, 8, 30, C.blue)}${rect(W - 42, 206, 8, 30, C.blue)}
    ${engine(cx - 170)}${engine(cx + 170)}
    <!-- fuselage, head-on -->
    <circle cx="${cx}" cy="230" r="86" fill="${C.white}"/>
    ${rect(cx - 86, 236, 172, 8, C.blue)}
    <path d="M${cx - 50} 200 L${cx - 8} 192 L${cx - 8} 214 L${cx - 54} 220 Z M${cx + 50} 200 L${cx + 8} 192 L${cx + 8} 214 L${cx + 54} 220 Z" fill="${C.sign}"/>
    <!-- nose gear -->
    ${rect(cx - 5, 314, 10, 30, C.steelLo)}${rect(cx - 22, 334, 16, 26, C.sign, { r: 5 })}${rect(cx + 6, 334, 16, 26, C.sign, { r: 5 })}
    ${rect(cx - 180, 334, 10, 24, C.steelLo)}${rect(cx - 194, 350, 38, 18, C.sign, { r: 6 })}
    ${rect(cx + 170, 334, 10, 24, C.steelLo)}${rect(cx + 156, 350, 38, 18, C.sign, { r: 6 })}
    <!-- jet bridge from the terminal (left) to the forward door -->
    <path d="M0 130 L${cx - 76} 176 L${cx - 76} 222 L0 240 Z" fill="${C.steel}"/>
    ${rect(cx - 96, 168, 26, 60, C.steelLo)}
    <path d="M0 146 L${cx - 76} 186" stroke="${C.steelHi}" stroke-width="5"/>
    ${rect(150, 222, 14, 108, C.steelLo)}${rect(136, 326, 42, 12, C.sign)}
    <!-- tug and bag cart -->
    ${rect(600, 360, 80, 34, C.yellow, { r: 4 })}${rect(640, 344, 30, 18, C.yellowLo)}<circle cx="616" cy="398" r="10" fill="${C.sign}"/><circle cx="666" cy="398" r="10" fill="${C.sign}"/>
    ${rect(690, 372, 110, 22, C.steel)}${rect(696, 350, 24, 22, C.blue)}${rect(724, 354, 28, 18, C.red)}${rect(756, 348, 24, 24, C.sign)}<circle cx="706" cy="398" r="8" fill="${C.sign}"/><circle cx="786" cy="398" r="8" fill="${C.sign}"/>
    ${line(680, 382, 690, 382, C.sign, 4)}
    <!-- cones -->
    <path d="M250 440 L262 400 L274 440 Z" fill="${C.orange}"/>${rect(254, 414, 16, 6, C.white)}
    <path d="M586 440 L598 400 L610 440 Z" fill="${C.orange}"/>${rect(590, 414, 16, 6, C.white)}
    <!-- the window frame we're looking through -->
    ${rect(0, 0, W, 22, C.sign)}${rect(0, H - 40, W, 40, C.sign)}
    ${rect(270, 0, 8, H, C.sign)}${rect(560, 0, 8, H, C.sign)}
    ${t(24, H - 13, "GATE B22", { size: 16, fill: C.yellow, ls: 3 })}
    ${t(W - 24, H - 13, "UA 914 · LONDON", { size: 16, fill: C.white, ls: 2, anchor: "end" })}`,
  );
}
