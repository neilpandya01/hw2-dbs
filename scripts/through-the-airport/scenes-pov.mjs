// Scenes drawn from your own eyes, at a traveler's eye height: walking into
// check-in, joining the security queue, reaching passport control, waiting at
// the belt, heading out through the doors, and scanning your pass to board. Each space gets its own
// architecture so they don't read as the same room with different signs.
import { f, C, t, rect, line, svg, picto, arrow, panel, cam } from "./lib.mjs";

export const scenes = {};

// The room around you: floor, ceiling, side walls, back wall.
const room = (v, { x0, x1, h, z0 = 0.6, z1, floor = C.floor, ceil = C.concreteLo, wallL = C.concrete, wallR = C.concrete, back = C.steelHi }) => {
  const [bx0, by0] = v.p(x0, h, z1), [bx1, by1] = v.p(x1, 0, z1);
  return `${v.poly([[x0, h, z0], [x1, h, z0], [x1, h, z1], [x0, h, z1]], ceil)}
    ${v.poly([[x0, 0, z0], [x1, 0, z0], [x1, 0, z1], [x0, 0, z1]], floor)}
    ${v.poly([[x0, 0, z0], [x0, h, z0], [x0, h, z1], [x0, 0, z1]], wallL)}
    ${v.poly([[x1, 0, z0], [x1, h, z0], [x1, h, z1], [x1, 0, z1]], wallR)}
    ${rect(bx0, by0, bx1 - bx0, by1 - by0, back)}`;
};
// Floor seams running away from you and across.
const seams = (v, x0, x1, z0, z1, step = 1.5) => {
  let s = "";
  for (let x = x0 + step; x < x1; x += step) s += line(...v.p(x, 0, z0), ...v.p(x, 0, z1), C.concreteLo, 1.5);
  for (let z = z0 + 1; z < z1; z *= 1.35) s += line(...v.p(x0, 0, z), ...v.p(x1, 0, z), C.concreteLo, 1.5);
  return s;
};
// Ceiling light strips.
const lights = (v, xs, h, z0, z1, step = 3) => {
  let s = "";
  for (let z = z0; z < z1; z += step) for (const x of xs) s += v.poly([[x - 0.5, h, z], [x + 0.5, h, z], [x + 0.5, h, z + 1], [x - 0.5, h, z + 1]], C.white);
  return s;
};
// Steel roof trusses across a tall ceiling.
const trusses = (v, x0, x1, h, z0, z1, step = 4) => {
  let s = "";
  for (let z = z0; z < z1; z += step) {
    const w = Math.max(1.5, v.k(z) * 0.12);
    s += line(...v.p(x0, h, z), ...v.p(x1, h, z), C.steelLo, w);
    s += line(...v.p(x0, h - 1, z), ...v.p(x1, h - 1, z), C.steelLo, w * 0.6);
    for (let x = x0; x < x1; x += 2) s += line(...v.p(x, h, z), ...v.p(x + 1, h - 1, z), C.steelLo, w * 0.4) + line(...v.p(x + 1, h - 1, z), ...v.p(x + 2, h, z), C.steelLo, w * 0.4);
  }
  return s;
};
// A glass side wall: mullions every `step` meters, one transom.
const glassSide = (v, x, h, z0, z1, step = 2.5) => {
  let s = v.poly([[x, 0, z0], [x, h, z0], [x, h, z1], [x, 0, z1]], C.glass);
  for (let z = z0 + 0.4; z < z1; z += step) s += line(...v.p(x, 0, z), ...v.p(x, h, z), C.glassLo, Math.max(1.5, v.k(z) * 0.08));
  s += v.poly([[x, 2.8, z0], [x, 2.95, z0], [x, 2.95, z1], [x, 2.8, z1]], C.glassLo);
  return s;
};
// An acoustic tile ceiling with square recessed lights.
const tileCeiling = (v, x0, x1, h, z0, z1) => {
  let s = "";
  for (let x = x0; x <= x1; x += 0.6) s += line(...v.p(x, h, z0), ...v.p(x, h, z1), C.concreteLo, 1);
  for (let z = z0; z < z1; z += 0.6) s += line(...v.p(x0, h, z), ...v.p(x1, h, z), C.concreteLo, 1);
  for (let z = 2.4; z < z1; z += 2.4) for (let x = x0 + 1.2; x < x1; x += 2.4) s += v.poly([[x, h, z], [x + 0.6, h, z], [x + 0.6, h, z + 0.6], [x, h, z + 0.6]], C.white);
  return s;
};

// A queue post with its belt to the next post (same depth or along the lane).
const post = (v, x, z) => {
  const [ax, ay] = v.p(x - 0.03, 1.0, z), [bx, by] = v.p(x + 0.03, 0, z), k = v.k(z);
  return `<ellipse cx="${f((ax + bx) / 2)}" cy="${f(by)}" rx="${f(0.18 * k)}" ry="${f(0.04 * k)}" fill="${C.steelLo}"/>${rect(ax, ay, Math.max(1.5, bx - ax), by - ay, C.steel)}<circle cx="${f((ax + bx) / 2)}" cy="${f(ay)}" r="${f(Math.max(1.5, 0.05 * k))}" fill="${C.steelLo}"/>`;
};
const beltX = (v, x0, x1, z) => v.poly([[x0, 0.96, z], [x1, 0.96, z], [x1, 0.88, z], [x0, 0.88, z]], C.sign);
const beltZ = (v, x, z0, z1) => v.poly([[x, 0.96, z0], [x, 0.96, z1], [x, 0.88, z1], [x, 0.88, z0]], C.sign);
// Hanging rods for a sign whose top edge is at height y.
const rods = (v, xs, y, z, h) => xs.map((x) => line(...v.p(x, y, z), ...v.p(x, h, z), C.steelLo, Math.max(1.5, v.k(z) * 0.04))).join("");

// 1. Walking into the check-in hall: the desk numbers hang toward you down the row.
{
  const W = 780, H = 520, v = cam({ vx: 360, vy: 250, fl: 400 }), hgt = 10;
  let desks = "";
  // the counter row on the right, its front facing the aisle
  desks += v.poly([[2, 0, 4], [2, 1.1, 4], [2, 1.1, 36], [2, 0, 36]], C.steelHi);
  desks += v.poly([[2, 1.1, 4], [2.9, 1.1, 4], [2.9, 1.1, 36], [2, 1.1, 36]], C.steel);
  const nums = [41, 42, 43, 44, 45, 46];
  for (let i = nums.length - 1; i >= 0; i--) {
    const z = 6 + i * 4.6;
    desks += line(...v.p(2, 0, z - 1.6), ...v.p(2, 1.1, z - 1.6), C.steel, Math.max(1, v.k(z) * 0.03));
    desks += v.poly([[2.2, 1.1, z], [2.7, 1.1, z], [2.7, 1.5, z], [2.2, 1.5, z]], C.sign); // monitor
    desks += v.poly([[2, 0.75, z - 1.2], [2, 1.1, z - 1.2], [2, 1.1, z - 0.2], [2, 0.75, z - 0.2]], C.sign); // belt opening
    desks += rods(v, [2.3, 3.5], 3.7, z, hgt - 1);
    desks += v.place(2.0, 3.7, z, 100, `${panel(0, 0, 170, 100)}${t(18, 78, String(nums[i]), { size: 76, fill: C.yellow })}${i === 5 ? picto("baggage", 124, 30, 40) : picto("departures", 124, 30, 40)}`);
  }
  // kiosks on the left
  let kiosks = "";
  for (const z of [16, 12, 8]) kiosks += v.place(-4.2, 1.7, z, 100, `${rect(0, 0, 60, 170, C.white, { r: 4 })}${rect(0, 0, 60, 20, C.sign, { r: 4 })}${rect(8, 30, 44, 54, C.sign)}${rect(14, 36, 32, 14, C.yellow)}`);
  // queue lane down the middle
  let q = "";
  for (let z = 18; z >= 4; z -= 2) q += post(v, -0.6, z) + post(v, 0.7, z);
  q += beltZ(v, -0.6, 4, 18) + beltZ(v, 0.7, 4, 18);
  const coats = [C.sign, C.blue, C.steelLo, C.red, C.sign, C.amber];
  let people = "";
  [17, 14.5, 12, 9.5, 7].forEach((z, i) => {
    people += v.person(0.05, z, i % 2 ? "woman" : "man", coats[i]);
  });
  people += v.person(1.5, 6, "man", C.green) + v.person(1.5, 9.2, "woman", C.sign);
  scenes["check-in-hall.svg"] = svg(
    W,
    H,
    `${room(v, { x0: -6, x1: 7, h: hgt, z1: 40, ceil: "#f3f3f1", back: C.glass })}
    <!-- daylight: a glass wall on the left and at the far end, a tail fin outside -->
    ${glassSide(v, -6, hgt, 0.6, 40)}
    ${v.place(-6, hgt, 40, 100, `${rect(0, 760, 1300, 240, C.asphalt)}<path d="M820 760 L880 520 L940 520 L960 760 Z" fill="${C.blue}"/>${Array.from({ length: 9 }, (_, i) => rect(i * 150 - 4, 0, 8, 1000, C.glassLo)).join("")}${rect(0, 300, 1300, 10, C.glassLo)}${rect(0, 620, 1300, 10, C.glassLo)}`)}
    ${seams(v, -6, 7, 1, 40, 2.5)}${trusses(v, -6, 7, hgt, 3, 40)}
    <!-- the hall banner, hung from the trusses -->
    ${rods(v, [-3, 1], 7.2, 30, hgt - 1)}
    ${v.place(-4.6, 7.2, 30, 100, `${rect(0, 0, 720, 110, C.sign)}${picto("departures", 24, 15, 80, C.yellow)}${t(126, 80, "CHECK-IN  41–46", { size: 62, ls: 5, len: 560 })}`)}
    ${kiosks}${desks}${q}${people}`,
  );
}

// 2. Joining the security queue: the sign overhead, the belts to follow, the start at your feet.
{
  const W = 780, H = 560, v = cam({ vx: 250, vy: 250, fl: 400 }), hgt = 3.2;
  const items = []; // [z, svg] drawn far to near
  // the serpentine: rows across the hall, alternating gaps
  const rows = [
    [13.5, -3.5, 2.3],
    [11, -2.3, 3.5],
    [8.5, -3.5, 2.3],
    [6, -2.3, 3.5],
  ];
  rows.forEach(([z, a, b]) => {
    let s = beltX(v, a, b, z);
    for (let x = a; x <= b + 0.01; x += 1.45) s += post(v, x, z);
    items.push([z, s]);
  });
  items.push([13.5, beltZ(v, -3.5, 3.5, 13.5) + beltZ(v, 3.5, 3.5, 13.5)]);
  // the entrance: posts either side of the opening, belts out to the side walls of the maze
  items.push([3.5, beltX(v, -3.5, -0.6, 3.5) + beltX(v, 0.6, 3.5, 3.5) + post(v, -3.5, 3.5) + post(v, -2, 3.5) + post(v, -0.6, 3.5) + post(v, 0.6, 3.5) + post(v, 2, 3.5) + post(v, 3.5, 3.5)]);
  // people already in the queue
  const coats = [C.sign, C.blue, C.steelLo, C.red, C.amber, C.sign, C.green, C.steelLo];
  [[12.2, -2.6], [12.2, -1.2], [12.2, 0.4], [12.2, 1.6], [9.7, 2.6], [9.7, 1.1], [9.7, -0.4], [7.2, -2.4], [7.2, -0.9], [7.2, 0.6] ].forEach(([z, x], i) =>
    items.push([z + 0.01, v.person(x, z, i % 3 === 1 ? "woman" : "man", coats[i % coats.length])]),
  );
  items.sort((a, b) => b[0] - a[0]);
  // a yellow arrow painted on the floor, leading you in
  const fa = (x, z) => [x, 0, z];
  const floorArrow = v.poly([fa(-0.12, 2.0), fa(0.12, 2.0), fa(0.12, 2.7), fa(0.34, 2.7), fa(0, 3.3), fa(-0.34, 2.7), fa(-0.12, 2.7)], C.yellow);
  scenes["security-queue.svg"] = svg(
    W,
    H,
    `${room(v, { x0: -5.5, x1: 6.5, h: hgt, z1: 30, floor: C.concrete, ceil: C.concrete, wallL: "#eef1f2", wallR: C.steelHi, back: C.white })}
    ${tileCeiling(v, -5.5, 6.5, hgt, 0.6, 30)}
    <!-- frosted glass screens on the left -->
    ${Array.from({ length: 12 }, (_, i) => line(...v.p(-5.5, 0, 1 + i * 2.4), ...v.p(-5.5, hgt, 1 + i * 2.4), C.steel, Math.max(1.5, v.k(1 + i * 2.4) * 0.07))).join("")}
    ${v.poly([[-5.5, 1.0, 0.6], [-5.5, 1.08, 0.6], [-5.5, 1.08, 30], [-5.5, 1.0, 30]], C.steel)}
    ${seams(v, -5.5, 6.5, 1, 30, 1.2)}
    <!-- scanners at the far end -->
    ${v.place(-3.2, 2.3, 26, 100, `${rect(0, 0, 160, 230, C.steel)}${rect(20, 20, 120, 210, C.steelHi)}${rect(200, 120, 260, 110, C.sign)}${rect(200, 120, 260, 14, C.yellow)}${rect(500, 0, 160, 230, C.steel)}${rect(520, 20, 120, 210, C.steelHi)}${rect(700, 120, 140, 110, C.sign)}${rect(700, 120, 140, 14, C.yellow)}`)}
    <!-- the overhead sign -->
    ${rods(v, [-2, 2], 3.0, 9.5, hgt)}
    ${v.place(-3.2, 3.0, 9.5, 100, `${panel(0, 0, 640, 110)}${picto("security", 22, 15, 80, C.yellow)}${t(120, 72, "Security", { size: 58, len: 240 })}${t(120, 98, "All passengers · boarding pass ready", { size: 18, weight: 400, fill: C.steelHi })}${rect(470, 18, 150, 74, C.yellow, { r: 3 })}${t(545, 48, "WAIT", { size: 20, fill: C.sign, anchor: "middle" })}${t(545, 82, "12 min", { size: 30, fill: C.sign, anchor: "middle" })}`)}
    ${items.map((i) => i[1]).join("")}
    ${floorArrow}
    <!-- the start sign on the entrance post -->
    ${v.place(-1.52, 1.75, 3.5, 100, `${rect(87, 60, 6, 40, C.steel)}${rect(0, 0, 90, 64, C.yellow, { r: 3 })}${arrow(4, 10, 40, -90, C.sign)}${t(46, 28, "QUEUE", { size: 13, fill: C.sign })}${t(46, 44, "STARTS", { size: 13, fill: C.sign })}${t(46, 60, "HERE", { size: 13, fill: C.sign })}`)}`,
  );
}

// 3. Passport control, first in line: lanes lit open or closed, the yellow line at your feet.
{
  const W = 780, H = 560, v = cam({ vx: 390, vy: 230, fl: 420 }), hgt = 5.6;
  let booths = "";
  const open = [true, true, false, true, false, true];
  open.forEach((o, i) => {
    const x = -5.4 + i * 1.75;
    booths += v.place(x, 2.9, 18, 100, `${rect(10, 0, 110, 50, C.sign)}${t(36, 40, String(i + 1), { size: 40 })}${o ? `<circle cx="92" cy="25" r="16" fill="${C.green}"/>` : `<path d="M80 13 L104 37 M104 13 L80 37" stroke="${C.red}" stroke-width="8"/>`}${rect(0, 70, 130, 90, C.glass, { o: 0.8 })}${rect(0, 160, 130, 130, C.steelHi)}${rect(0, 160, 130, 10, C.steel)}${o ? `<circle cx="65" cy="112" r="16" fill="${C.sign}"/>${rect(42, 128, 46, 32, C.sign, { r: 10 })}` : ""}`);
  });
  // e-passport gates on the right
  let egates = "";
  for (let i = 0; i < 3; i++) egates += v.place(2.0 + i * 1.2, 1.3, 15, 100, `${rect(0, 0, 30, 130, C.steelHi)}${rect(0, 0, 30, 34, C.sign)}${rect(5, 8, 20, 18, C.green)}${rect(30, 40, 60, 60, C.glass, { o: 0.8 })}`);
  // floor text and line, squashed onto the floor plane
  const [lx, ly] = v.p(0, 0, 2.75), kz = v.k(2.75);
  const floorText = `<g transform="translate(${f(lx)} ${f(ly)}) scale(${(kz / 100).toFixed(4)} ${(kz / 100 * 0.4).toFixed(4)})">${t(0, 0, "WAIT HERE UNTIL CALLED", { size: 26, fill: C.yellow, anchor: "middle", len: 112 })}</g>`;
  // you're first in line: the lane belts end beside you
  const q = beltZ(v, -0.9, 1.2, 3.4) + beltZ(v, 0.9, 1.2, 3.4) + post(v, -0.9, 3.4) + post(v, 0.9, 3.4);
  scenes["passport-control.svg"] = svg(
    W,
    H,
    `${room(v, { x0: -6.5, x1: 6.5, h: hgt, z1: 24, floor: "#3e4756", ceil: "#2b2f36", wallL: C.concreteLo, wallR: C.concreteLo, back: C.concrete })}
    <!-- carpet stripes, wooden ceiling slats with linear lights -->
    ${Array.from({ length: 13 }, (_, i) => line(...v.p(-6 + i, 0, 0.6), ...v.p(-6 + i, 0, 24), "#4a5466", 3)).join("")}
    ${Array.from({ length: 26 }, (_, i) => line(...v.p(-6.5 + i * 0.5, hgt, 0.6), ...v.p(-6.5 + i * 0.5, hgt, 24), "#3a3f48", 2)).join("")}
    ${[-3, 0, 3].map((x) => v.poly([[x - 0.06, hgt, 1], [x + 0.06, hgt, 1], [x + 0.06, hgt, 24], [x - 0.06, hgt, 24]], C.white)).join("")}
    <!-- welcome band across the far wall -->
    ${v.place(-6.5, 4.8, 24, 100, `${rect(0, 0, 1300, 130, C.blue)}${t(650, 92, "Welcome to London", { size: 72, anchor: "middle", len: 640 })}`)}
    ${booths}${egates}
    ${v.person(-1.8, 17, "man", C.blue)}
    ${v.person(2.4, 12.5, "woman", C.red)}${v.person(-4.4, 16.2, "man", C.sign)}
    <!-- the overhead sign -->
    ${rods(v, [-2.5, 2.5], 4.3, 8, hgt)}
    ${v.place(-3.8, 4.3, 8, 100, `${panel(0, 0, 760, 150)}${picto("passport", 24, 20, 74)}${t(110, 74, "Passport control", { size: 50, len: 380 })}${rect(110, 92, 620, 2, C.steelLo)}${arrow(110, 104, 36, 180, C.yellow)}${t(152, 134, "All passports", { size: 26, fill: C.yellow })}${t(680, 134, "e-Passports", { size: 26, fill: C.yellow, anchor: "end" })}${arrow(690, 104, 36, 0, C.yellow)}`)}
    ${v.poly([[-0.9, 0, 3.0], [0.9, 0, 3.0], [0.9, 0, 3.2], [-0.9, 0, 3.2]], C.yellow)}
    ${floorText}
    ${q}`,
  );
}

// 4. Waiting at belt 3: the bags come round toward you.
{
  const W = 780, H = 540, v = cam({ vx: 390, vy: 200, fl: 380 }), hgt = 5;
  let slats = "";
  for (let x = -6; x <= 6; x += 0.45) slats += line(...v.p(x, 0.46, 1.6), ...v.p(x, 0.46, 2.6), "#000", 1.2, { o: 0.55 });
  const bag = (x, z, w, h, c, extra = "") => v.place(x, 0.46 + h, z, 100, `${rect(0, 0, w * 100, h * 100, c, { r: 10 })}${rect(w * 50 - 16, -12, 32, 14, "none", { r: 4, stroke: C.sign, sw: 5 })}${extra}`);
  scenes["baggage-reclaim.svg"] = svg(
    W,
    H,
    `${room(v, { x0: -7, x1: 7, h: hgt, z1: 26 })}
    ${seams(v, -7, 7, 1, 26)}${lights(v, [-3, 3], hgt, 3, 24)}
    <!-- where the bags come out, far away -->
    ${v.place(-1.6, 1.4, 26, 100, `${rect(0, 0, 320, 140, C.sign)}${Array.from({ length: 10 }, (_, i) => rect(6 + i * 31, 6, 26, 134, "#2a2d31")).join("")}`)}
    <!-- people on the far side -->
    ${v.person(-3.4, 6, "woman", C.blue)}${v.person(-1.8, 7, "man", C.sign)}${v.person(2.2, 6.5, "man", C.steelLo)}${v.person(4, 5.6, "woman", C.red)}
    <!-- the sign -->
    ${rods(v, [-1, 1], 3.8, 5.5, hgt)}
    ${v.place(-2.4, 3.8, 5.5, 100, `${panel(0, 0, 480, 130, C.blue)}${picto("baggageClaim", 18, 18, 90)}${t(126, 60, "Baggage reclaim", { size: 30, len: 230 })}${t(126, 98, "UA 914 · London", { size: 24, weight: 400 })}${rect(370, 10, 100, 110, C.white, { r: 3 })}${t(420, 108, "3", { size: 110, fill: C.blue, anchor: "middle" })}`)}
    <!-- the sloped centre and the belt -->
    ${v.poly([[-7, 0.46, 2.6], [7, 0.46, 2.6], [7, 1.0, 3.6], [-7, 1.0, 3.6]], C.steelHi)}
    ${v.poly([[-7, 1.0, 3.6], [7, 1.0, 3.6], [7, 1.0, 3.9], [-7, 1.0, 3.9]], C.steel)}
    ${v.poly([[-7, 0.46, 1.6], [7, 0.46, 1.6], [7, 0.46, 2.6], [-7, 0.46, 2.6]], C.sign)}
    ${slats}
    ${bag(-3.6, 2.2, 0.75, 0.42, C.red)}${bag(-2.3, 2.3, 0.55, 0.38, C.sign)}${bag(-0.9, 2.1, 0.85, 0.48, C.blue, `${rect(30, 8, 26, 34, C.white, { r: 3 })}${t(43, 30, "LHR", { size: 9, fill: C.sign, anchor: "middle" })}`)}${bag(0.5, 2.2, 0.6, 0.4, C.yellow)}${bag(1.7, 2.3, 0.8, 0.45, C.green)}${bag(3.2, 2.2, 0.7, 0.42, C.steelLo)}
    <!-- the steel lip right in front of you -->
    ${v.poly([[-7, 0.46, 1.6], [7, 0.46, 1.6], [7, 0, 1.6], [-7, 0, 1.6]], C.steel)}
    ${v.poly([[-7, 0.5, 1.5], [7, 0.5, 1.5], [7, 0.46, 1.6], [-7, 0.46, 1.6]], C.steelHi)}`,
  );
}

// 5. About to leave: the glass doors, and the taxi rank waiting on the other side.
{
  const W = 780, H = 560, v = cam({ vx: 390, vy: 240, fl: 420 }), hgt = 5, zg = 7.5;
  // a taxi in side view, nose left, drawn 100 px per meter (4.6 m long)
  const taxi = `<path d="M70 70 L120 20 L300 20 L360 70 Z" fill="${C.yellow}"/>
    <path d="M128 30 L205 30 L205 66 L92 66 Z M215 30 L292 30 L338 66 L215 66 Z" fill="#28303a"/>
    ${rect(10, 64, 440, 76, C.yellow, { r: 16 })}${rect(10, 96, 440, 10, C.sign)}${rect(190, 4, 60, 18, C.sign, { r: 3 })}${t(220, 18, "TAXI", { size: 13, fill: C.yellow, anchor: "middle" })}
    <circle cx="96" cy="140" r="30" fill="${C.sign}"/><circle cx="96" cy="140" r="11" fill="${C.steel}"/><circle cx="364" cy="140" r="30" fill="${C.sign}"/><circle cx="364" cy="140" r="11" fill="${C.steel}"/>`;
  const [gx0, gy0] = v.p(-7, hgt, zg), [gx1, gy1] = v.p(7, 0, zg);
  // everything outside, clipped to the glass wall
  const outside = `<clipPath id="glass_out"><rect x="${f(gx0)}" y="${f(gy0)}" width="${f(gx1 - gx0)}" height="${f(gy1 - gy0)}"/></clipPath>
    <g clip-path="url(#glass_out)">
      ${rect(gx0, gy0, gx1 - gx0, gy1 - gy0, "#dfe6ea")}
      ${v.poly([[-30, 0, 9], [30, 0, 9], [30, 0, 40], [-30, 0, 40]], C.asphalt)}
      ${v.poly([[-30, 0, zg], [30, 0, zg], [30, 0, 9], [-30, 0, 9]], C.concrete)}
      ${v.poly([[-30, 0, 8.95], [30, 0, 8.95], [30, 0, 9.1], [-30, 0, 9.1]], C.yellow)}
      ${v.poly([[-30, 4.2, zg], [30, 4.2, zg], [30, 4.2, 12], [-30, 4.2, 12]], C.sign)}
      ${v.place(1.5, 1.45, 12.5, 100, taxi)}${v.place(-3.8, 1.45, 12.8, 100, taxi)}${v.place(-9.1, 1.45, 13.1, 100, taxi)}
      ${v.place(4.6, 3.1, 9.6, 100, `${rect(26, 50, 8, 260, C.steel)}${rect(0, 0, 60, 50, C.yellow, { r: 3 })}${t(30, 32, "TAXI", { size: 18, fill: C.sign, anchor: "middle" })}`)}
      ${v.person(-1.4, 10, "woman", C.sign)}${v.place(-0.7, 0.55, 10, 100, picto("baggage", 0, 0, 55, C.sign, C.concrete))}
    </g>
    ${rect(gx0, gy0, gx1 - gx0, gy1 - gy0, C.glass, { o: 0.22 })}`;
  // the glass wall's frame: mullions, transom, and the sliding doors in the middle
  let frame = "";
  for (const x of [-7, -5.5, -4, -2.5, 2.5, 4, 5.5, 7]) frame += line(...v.p(x, 0, zg), ...v.p(x, hgt, zg), C.steelLo, 6);
  frame += line(...v.p(-7, 3.2, zg), ...v.p(7, 3.2, zg), C.steelLo, 8);
  frame += v.poly([[-2.5, 0, zg], [-2.4, 0, zg], [-2.4, 3.2, zg], [-2.5, 3.2, zg]], C.steel) + v.poly([[2.4, 0, zg], [2.5, 0, zg], [2.5, 3.2, zg], [2.4, 3.2, zg]], C.steel);
  // the doors slid half open
  frame += v.poly([[-2.4, 0, zg - 0.05], [-0.9, 0, zg - 0.05], [-0.9, 3.15, zg - 0.05], [-2.4, 3.15, zg - 0.05]], C.glass, ' opacity=".35"');
  frame += v.poly([[0.9, 0, zg - 0.05], [2.4, 0, zg - 0.05], [2.4, 3.15, zg - 0.05], [0.9, 3.15, zg - 0.05]], C.glass, ' opacity=".35"');
  frame += line(...v.p(-0.9, 0, zg - 0.05), ...v.p(-0.9, 3.15, zg - 0.05), C.steelLo, 5) + line(...v.p(0.9, 0, zg - 0.05), ...v.p(0.9, 3.15, zg - 0.05), C.steelLo, 5);
  frame += v.poly([[-2.4, 1.0, zg - 0.05], [-0.9, 1.0, zg - 0.05], [-0.9, 1.15, zg - 0.05], [-2.4, 1.15, zg - 0.05]], C.sign) + v.poly([[0.9, 1.0, zg - 0.05], [2.4, 1.0, zg - 0.05], [2.4, 1.15, zg - 0.05], [0.9, 1.15, zg - 0.05]], C.sign);
  scenes["way-out.svg"] = svg(
    W,
    H,
    `${v.poly([[-7, hgt, 0.6], [7, hgt, 0.6], [7, hgt, zg], [-7, hgt, zg]], C.concreteLo)}
    ${v.poly([[-7, 0, 0.6], [7, 0, 0.6], [7, 0, zg], [-7, 0, zg]], C.floor)}
    ${seams(v, -7, 7, 1, zg, 1.5)}
    ${outside}${frame}
    <!-- entrance mat and the exit sign over the doors -->
    ${v.poly([[-2.2, 0, 5.6], [2.2, 0, 5.6], [2.2, 0, zg - 0.1], [-2.2, 0, zg - 0.1]], C.sign)}
    ${v.place(-0.8, 3.9, zg, 100, `${rect(0, 0, 160, 56, C.green, { r: 3 })}${picto("exit", 10, 6, 44)}${t(62, 40, "Exit", { size: 30 })}`)}
    <!-- the transport sign just inside -->
    ${rods(v, [-2, 2], 4.0, 4.6, hgt)}
    ${v.place(-3.3, 4.0, 4.6, 100, `${panel(0, 0, 660, 100)}${rect(14, 14, 72, 72, C.white, { r: 3 })}${picto("taxi", 20, 20, 60, C.sign, C.white)}${t(98, 64, "Taxi", { size: 34 })}${arrow(178, 30, 40, -90, C.yellow)}${rect(236, 14, 72, 72, C.white, { r: 3 })}${picto("train", 242, 20, 60, C.sign, C.white)}${t(320, 64, "Train", { size: 34 })}${arrow(412, 30, 40, 180, C.yellow)}${rect(462, 14, 72, 72, C.white, { r: 3 })}${picto("bus", 468, 20, 60, C.sign, C.white)}${t(546, 64, "Bus", { size: 34 })}${arrow(610, 30, 40, 0, C.yellow)}`)}
    ${v.person(0.2, 6.2, "man", C.red)}${v.place(0.9, 0.6, 6.2, 100, picto("baggage", 0, 0, 60, C.sign, C.floor))}
    <!-- your own bag's handle, in your hand -->
    ${rect(626, 440, 9, 130, C.steelLo)}${rect(681, 440, 9, 130, C.steelLo)}
    ${rect(612, 424, 92, 22, C.sign, { r: 8 })}
    ${rect(570, 530, 180, 40, C.blue, { r: 10 })}`,
  );
}

// 6. Boarding: your phone held out to the gate reader, the flaps about to open, the jet bridge beyond.
{
  const W = 760, H = 580, v = cam({ vx: 400, vy: 220, fl: 420 }), hgt = 4;
  // a pedestal: a steel box beside the lane, its inner face toward you
  const pedestal = (x0, x1, inner) => `${v.poly([[inner, 0, 3.4], [inner, 1.1, 3.4], [inner, 1.1, 5.2], [inner, 0, 5.2]], C.steel)}
    ${v.poly([[x0, 1.1, 3.4], [x1, 1.1, 3.4], [x1, 1.1, 5.2], [x0, 1.1, 5.2]], C.steelHi)}
    ${v.poly([[x0, 0, 3.4], [x1, 0, 3.4], [x1, 1.1, 3.4], [x0, 1.1, 3.4]], C.steelLo)}`;
  scenes["e-gate.svg"] = svg(
    W,
    H,
    `${room(v, { x0: -5, x1: 5, h: hgt, z1: 14, ceil: C.concrete, back: C.concreteLo })}
    ${tileCeiling(v, -5, 5, hgt, 0.6, 14)}${seams(v, -5, 5, 1, 14, 1.25)}
    <!-- the gate wall: windows onto the plane on the right, the jet bridge door straight ahead -->
    ${v.place(-5, 3.2, 14, 100, `${rect(640, 20, 360, 260, C.glass)}${rect(640, 140, 360, 50, C.white)}${Array.from({ length: 9 }, (_, i) => rect(660 + i * 38, 152, 16, 20, C.glassLo, { r: 6 })).join("")}${rect(640, 182, 360, 8, C.blue)}${rect(760, 20, 6, 260, C.steelLo)}${rect(880, 20, 6, 260, C.steelLo)}
      ${rect(380, 60, 240, 260, C.sign)}${rect(400, 80, 200, 240, "#2b2f36")}${rect(400, 300, 200, 20, C.steelLo)}
      ${rect(380, 0, 240, 50, C.yellow)}${t(500, 38, "B22", { size: 38, fill: C.sign, anchor: "middle" })}`)}
    <!-- the gate agent at the podium -->
    ${v.person(-2.6, 8, "woman", C.blue)}
    ${v.place(-3.2, 1.1, 7.2, 100, `${rect(0, 0, 120, 110, C.sign)}${rect(0, 0, 120, 16, C.yellow)}`)}
    <!-- overhead boarding sign -->
    ${rods(v, [-1.5, 1.5], 3.4, 6, hgt)}
    ${v.place(-2.6, 3.4, 6, 100, `${panel(0, 0, 520, 90)}${t(24, 56, "Boarding", { size: 40, len: 170 })}${rect(220, 18, 280, 54, C.green, { r: 3 })}${t(360, 54, "Groups 1–3", { size: 26, anchor: "middle" })}`)}
    <!-- the lane: yellow arrow through, glass flaps closed until the scan -->
    ${v.poly([[-0.12, 0, 6], [0.12, 0, 6], [0.12, 0, 7.4], [0.36, 0, 7.4], [0, 0, 8.4], [-0.36, 0, 7.4], [-0.12, 0, 7.4]], C.yellow)}
    ${pedestal(-1.2, -0.6, -0.6)}${pedestal(0.6, 1.2, 0.6)}
    ${v.poly([[-0.6, 0.35, 4.6], [-0.03, 0.35, 4.6], [-0.03, 1.45, 4.6], [-0.6, 1.45, 4.6]], C.glass, ' opacity=".75"')}
    ${v.poly([[0.03, 0.35, 4.6], [0.6, 0.35, 4.6], [0.6, 1.45, 4.6], [0.03, 1.45, 4.6]], C.glass, ' opacity=".75"')}
    <!-- status light on the far end of the left pedestal: green arrow -->
    ${v.place(-1.15, 1.6, 5.1, 100, `${rect(0, 0, 50, 50, C.sign, { r: 3 })}${arrow(5, 5, 40, -90, C.green)}`)}
    <!-- the reader window on the pedestal top -->
    ${v.poly([[-1.1, 1.11, 3.5], [-0.7, 1.11, 3.5], [-0.7, 1.11, 3.95], [-1.1, 1.11, 3.95]], "#1b1d21")}
    <!-- your hand and phone, held out over the reader -->
    <g transform="rotate(-14 230 420)">
      ${rect(168, 300, 120, 220, C.sign, { r: 16 })}${rect(176, 312, 104, 196, C.white, { r: 8 })}
      ${rect(176, 312, 104, 40, C.yellow)}${t(228, 338, "UA 914 · B22", { size: 13, fill: C.sign, anchor: "middle" })}
      ${Array.from({ length: 49 }, (_, i) => ((i * 37) % 11 > 4 || i === 0 || i === 6 || i === 42) ? rect(194 + (i % 7) * 10, 372 + Math.floor(i / 7) * 10, 10, 10, C.sign) : "").join("")}
      ${t(228, 470, "Scan to board", { size: 12, fill: C.steelLo, anchor: "middle", weight: 400 })}
    </g>
    <path d="M190 600 L200 500 Q206 470 232 466 L300 470 Q318 476 312 500 L300 600 Z" fill="${C.skin}"/>
    ${rect(150, 408, 30, 70, C.skin, { r: 14 })}
    ${[0, 1, 2].map((i) => rect(272, 380 + i * 30, 46, 24, C.skin, { r: 12 })).join("")}`,
  );
}
