// The journey around the suite: the corridor, the ticket wallet, the lounge, the shower spa.
import { rng, f, C, SERIF, SANS, texture, contact, line, svg } from "./lib.mjs";

export const scenes = {};

const pts = (a) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(" ");

// 1. The quiet first-class aisle: closed suite doors receding on both sides.
{
  const W = 460, H = 600;
  const V = { x: 230, y: 258 }, FL = 251, EYE = 1.6, HW = 1.1, CH = 2.4, ZN = 0.55, ZE = 8.75;
  const P = (X, Y, Z) => [V.x + (X * FL) / Z, V.y + ((EYE - Y) * FL) / Z];
  const quad = (X, y0, y1, za, zb, attrs) => `<polygon points="${pts([P(X, y0, za), P(X, y0, zb), P(X, y1, zb), P(X, y1, za)])}" ${attrs}/>`;
  const hl = (a, b, o = {}) => line(a[0], a[1], b[0], b[1], o);
  // affine map of a little local box (100 x 40) onto the wall plane, for number plates
  const wallText = (X, Y, za, zb, h, txt, size) => {
    const o = P(X, Y + h, za), u = P(X, Y + h, zb), v = P(X, Y, za);
    const a = (u[0] - o[0]) / 100, b = (u[1] - o[1]) / 100, c = (v[0] - o[0]) / 40, d = (v[1] - o[1]) / 40;
    return `<g transform="matrix(${a.toFixed(4)} ${b.toFixed(4)} ${c.toFixed(4)} ${d.toFixed(4)} ${f(o[0])} ${f(o[1])})"><text x="50" y="${f(20 + size * 0.36)}" text-anchor="middle" font-family="${SANS}" font-size="${size}" letter-spacing="4" fill="${C.espresso}">${txt}</text></g>`;
  };
  const DOOR_H = 2.06, L = 2.5, Z0 = 1.25;
  let walls = "", trims = "", plates = "";
  for (const side of [-1, 1]) {
    const X = side * HW;
    const wallFill = side < 0 ? "url(#wallL_corr)" : "url(#wallR_corr)";
    // bulkhead band above the doors and the full wall behind
    walls += quad(X, 0, CH, ZN, ZE, `fill="${C.ivory}"`);
    walls += quad(X, 0, DOOR_H, ZN, ZE, `fill="${wallFill}"`);
    for (let i = 0; i < 6; i++) {
      const z0 = Z0 + i * L;
      if (z0 > ZE) break;
      const panelA = z0 + 0.06, panelB = Math.min(z0 + 1.28, ZE), doorA = z0 + 1.36, doorB = Math.min(z0 + 2.38, ZE);
      // fixed fluted panel
      walls += quad(X, 0.1, DOOR_H - 0.04, panelA, panelB, `fill="${side < 0 ? C.sand : C.ivory}" fill-opacity=".55"`);
      for (let k = 1; k < 12; k++) {
        const z = panelA + ((panelB - panelA) * k) / 12;
        const zz = Math.min(z, ZE);
        if (zz >= ZE) break;
        walls += hl(P(X, 0.14, zz), P(X, DOOR_H - 0.08, zz), { color: C.taupe, w: 0.5, o: 0.45 });
      }
      // the sliding door, slightly proud of the wall
      if (doorA < ZE) {
        walls += quad(X, 0.04, DOOR_H - 0.02, doorA, doorB, `fill="url(#door_corr)" filter="none"`);
        walls += quad(X, 0.04, DOOR_H - 0.02, doorA, doorB, `filter="url(#leather_corr)" fill="${C.champagne}"`);
        // door inset panel
        const ia = doorA + 0.1, ib = doorB - 0.1;
        if (ib > ia && i < 4) {
          const n = 5, dz = (ib - ia) / n, la = 1.5, lb = 1.84;
          walls += `<polygon points="${pts([P(X, la, ia), P(X, la, ib), P(X, lb, ib), P(X, lb, ia)])}" fill="${C.ivory}" fill-opacity=".7" stroke="${C.brass}" stroke-width=".6"/>`;
          for (let k = 0; k < n; k++) {
            walls += hl(P(X, la, ia + k * dz), P(X, lb, ia + (k + 1) * dz), { color: C.brass, w: 0.5, o: 0.8 });
            walls += hl(P(X, la, ia + (k + 1) * dz), P(X, lb, ia + k * dz), { color: C.brass, w: 0.5, o: 0.8 });
          }
        }
        if (ib > ia) walls += `<polygon points="${pts([P(X, 0.22, ia), P(X, 0.22, ib), P(X, DOOR_H - 0.2, ib), P(X, DOOR_H - 0.2, ia)])}" fill="none" stroke="${C.brass}" stroke-width=".75" stroke-opacity=".8"/>`;
        // door edges
        walls += hl(P(X, 0.04, doorA), P(X, DOOR_H - 0.02, doorA), { color: C.brassLo, w: 1, o: 0.8 });
        walls += hl(P(X, 0.04, doorB), P(X, DOOR_H - 0.02, doorB), { color: C.brass, w: 0.75, o: 0.8 });
        // recessed brass pull near the leading edge
        const hz = doorA + 0.16;
        const h1 = P(X, 0.86, hz), h2 = P(X, 1.3, hz);
        walls += line(h1[0], h1[1], h2[0], h2[1], { color: C.brassLo, w: Math.max(1, 0.05 * FL / hz), o: 0.9 });
        walls += line(h1[0] + side * 0.6, h1[1], h2[0] + side * 0.6, h2[1], { color: C.brassHi, w: Math.max(0.5, 0.02 * FL / hz), o: 0.9 });
      }
      // number plate on the fixed panel, next to the door
      const pa = z0 + 0.92, pb = z0 + 1.2;
      if (pb < ZE) {
        plates += quad(X, 1.42, 1.58, pa, pb, `fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".6"`);
        const num = `${i + 1}${side < 0 ? "A" : "K"}`;
        if (i < 3) plates += wallText(X, 1.42, side < 0 ? pa : pb, side < 0 ? pb : pa, 0.16, num, 22);
      }
      // seam between suites
      walls += hl(P(X, 0, z0), P(X, CH, z0), { color: C.taupe, w: 0.75, o: 0.6 });
    }
    // trim lines: skirting, door head, cove
    for (const [y, c, w] of [[0.08, C.brass, 1], [DOOR_H, C.brass, 1.25], [DOOR_H + 0.05, C.brassHi, 0.75], [CH - 0.03, C.taupe, 0.6]])
      trims += hl(P(X, y, ZN), P(X, y, ZE), { color: c, w });
    // track for the sliding doors, just below the head
    trims += hl(P(X, DOOR_H - 0.035, ZN), P(X, DOOR_H - 0.035, ZE), { color: C.brassLo, w: 0.6, o: 0.6 });
  }
  // ceiling and its light line
  const ceil = `<polygon points="${pts([P(-HW, CH, ZN), P(HW, CH, ZN), P(HW, CH, ZE), P(-HW, CH, ZE)])}" fill="url(#ceil_corr)"/>`;
  let ribs = "";
  for (let i = 0; i < 6; i++) {
    const z = Z0 + i * L;
    if (z > ZE) break;
    const zm = z + L / 2;
    if (zm < ZE)
      for (const x of [-0.62, 0.62]) {
        const c = P(x, CH, zm), rx = (0.07 * FL) / zm, ry = (0.07 * 0.8 * FL) / (zm * zm);
        ribs += `<ellipse cx="${f(c[0])}" cy="${f(c[1])}" rx="${f(rx)}" ry="${f(Math.max(ry, 0.3))}" fill="${C.ivory}" stroke="${C.brassLo}" stroke-width=".6"/>`;
      }
    ribs += hl(P(-HW, CH, z), P(-0.18, CH, z), { color: C.taupe, w: 0.6, o: 0.5 }) + hl(P(0.18, CH, z), P(HW, CH, z), { color: C.taupe, w: 0.6, o: 0.5 });
  }
  const lightStrip = `<polygon points="${pts([P(-0.13, CH, ZN), P(0.13, CH, ZN), P(0.13, CH, ZE), P(-0.13, CH, ZE)])}" fill="${C.ivory}"/>
    ${hl(P(-0.13, CH, ZN), P(-0.13, CH, ZE), { color: C.brassHi, w: 0.75 })}${hl(P(0.13, CH, ZN), P(0.13, CH, ZE), { color: C.brassHi, w: 0.75 })}
    ${hl(P(-0.2, CH, ZN), P(-0.2, CH, ZE), { color: C.brass, w: 0.6, o: 0.5 })}${hl(P(0.2, CH, ZN), P(0.2, CH, ZE), { color: C.brass, w: 0.6, o: 0.5 })}`;
  // floor: pale carpet with an inlaid runner border
  const floor = `<polygon points="${pts([P(-HW, 0, ZN), P(HW, 0, ZN), P(HW, 0, ZE), P(-HW, 0, ZE)])}" fill="url(#floor_corr)"/>
    <polygon points="${pts([P(-HW, 0, ZN), P(HW, 0, ZN), P(HW, 0, ZE), P(-HW, 0, ZE)])}" fill="${C.sand}" filter="url(#carpet_corr)"/>
    <polygon points="${pts([P(-0.72, 0, ZN), P(0.72, 0, ZN), P(0.72, 0, ZE), P(-0.72, 0, ZE)])}" fill="url(#runner_corr)"/>
    <polygon points="${pts([P(-0.72, 0, ZN), P(0.72, 0, ZN), P(0.72, 0, ZE), P(-0.72, 0, ZE)])}" fill="${C.slate}" filter="url(#carpet_corr)"/>
    ${[-0.64, 0.64].map((x) => hl(P(x, 0, ZN), P(x, 0, ZE), { color: C.slate, w: 0.75, o: 0.7 })).join("")}
    ${Array.from({ length: 40 }, (_, k) => 0.6 + k * 0.32).filter((z) => z + 0.32 < ZE).map((z) => [-0.4, 0, 0.4].map((x) => `<polygon points="${pts([P(x, 0, z + 0.07), P(x + 0.06, 0, z + 0.16), P(x, 0, z + 0.25), P(x - 0.06, 0, z + 0.16)])}" fill="${x ? C.slate : C.wine}" fill-opacity="${x ? 0.35 : 0.55}"/>`).join("")).join("")}
    ${[-0.78, -0.72, 0.72, 0.78].map((x) => hl(P(x, 0, ZN), P(x, 0, ZE), { color: C.brass, w: Math.abs(x) > 0.75 ? 0.75 : 1.1, o: 0.7 })).join("")}`;
  // the far end wall: a champagne panel with a brass medallion
  const e0 = P(-HW, CH, ZE), e1 = P(HW, 0, ZE);
  const ew = e1[0] - e0[0], eh = e1[1] - e0[1];
  const endWall = `<rect x="${f(e0[0])}" y="${f(e0[1])}" width="${f(ew)}" height="${f(eh)}" fill="${C.champagne}"/>
    <rect x="${f(e0[0] + ew * 0.2)}" y="${f(e0[1] + eh * 0.12)}" width="${f(ew * 0.6)}" height="${f(eh * 0.8)}" fill="${C.ivory}" fill-opacity=".5" stroke="${C.brass}" stroke-width=".6"/>
    <circle cx="${f(V.x)}" cy="${f(e0[1] + eh * 0.42)}" r="${f(ew * 0.1)}" fill="none" stroke="${C.brass}" stroke-width=".75"/>
    ${line(e0[0], e1[1], e1[0], e1[1], { color: C.brassLo, w: 0.6 })}`;
  // a walnut console with a potted orchid, just in front of the end wall
  const ZC = ZE - 0.25, k = FL / ZC, bx0 = V.x, by0 = P(0, 0, ZC)[1];
  const Y = (y) => f(by0 - y * k), X = (x) => f(bx0 + x * k);
  const flowers = [[0.2, 1.42], [0.29, 1.36], [0.36, 1.27], [0.41, 1.17], [0.13, 1.45]];
  const orchid = `
    <rect x="${X(-0.5)}" y="${Y(0.8)}" width="${f(k)}" height="${f(0.06 * k)}" fill="${C.walnut}"/>
    <rect x="${X(-0.46)}" y="${Y(0.74)}" width="${f(0.04 * k)}" height="${f(0.74 * k)}" fill="${C.walnut}"/>
    <rect x="${X(0.42)}" y="${Y(0.74)}" width="${f(0.04 * k)}" height="${f(0.74 * k)}" fill="${C.walnut}"/>
    ${line(X(-0.46), Y(0.3), X(0.46), Y(0.3), { color: C.brass, w: 0.75 })}
    <path d="M${X(-0.1)} ${Y(1.02)} L${X(0.1)} ${Y(1.02)} L${X(0.08)} ${Y(0.8)} L${X(-0.08)} ${Y(0.8)} Z" fill="${C.ivory}" stroke="${C.brassLo}" stroke-width=".6"/>
    <path d="M${X(0)} ${Y(1.02)} C${X(-0.2)} ${Y(1.1)} ${X(-0.26)} ${Y(1.06)} ${X(-0.3)} ${Y(0.98)} C${X(-0.2)} ${Y(1.0)} ${X(-0.1)} ${Y(1.0)} ${X(0)} ${Y(1.02)} Z" fill="${C.sage}"/>
    <path d="M${X(0)} ${Y(1.02)} C${X(0.18)} ${Y(1.12)} ${X(0.26)} ${Y(1.08)} ${X(0.3)} ${Y(1.0)} C${X(0.2)} ${Y(1.02)} ${X(0.1)} ${Y(1.0)} ${X(0)} ${Y(1.02)} Z" fill="${C.sageLo}"/>
    <path d="M${X(0)} ${Y(1.02)} C${X(0.02)} ${Y(1.4)} ${X(0.2)} ${Y(1.5)} ${X(0.42)} ${Y(1.12)}" fill="none" stroke="${C.sageLo}" stroke-width=".9"/>
    ${flowers.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="${f(0.055 * k)}" fill="${C.roseHi}" stroke="${C.rose}" stroke-width=".5"/><circle cx="${X(x)}" cy="${Y(y)}" r="${f(0.016 * k)}" fill="${C.wine}"/>`).join("")}`;
  scenes["suite-corridor.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="wallL_corr" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${V.x}" y2="0"><stop offset="0" stop-color="${C.champagneLo}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="wallR_corr" gradientUnits="userSpaceOnUse" x1="${W}" y1="0" x2="${V.x}" y2="0"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="door_corr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
    <linearGradient id="ceil_corr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="runner_corr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.slateHi}" stop-opacity=".6"/><stop offset="1" stop-color="${C.slateHi}" stop-opacity=".45"/></linearGradient>
    <linearGradient id="floor_corr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    ${texture("carpet_corr", ".9 .35", [0.45, 0.38, 0.3], 0.24, 5, 2)}
    ${texture("leather_corr", "1.1", [0.5, 0.42, 0.32], 0.1, 3, 2)}
  </defs>
  ${ceil}${ribs}${lightStrip}
  ${floor}
  ${endWall}${orchid}
  ${walls}${trims}${plates}`
  );
}

// 2. Ticket wallet flat-lay on ivory linen: folder, boarding pass for 1A, passport, pen.
{
  const W = 600, H = 440;
  // card folder
  const fx = 82, fy = 74, fw = 168, fh = 252;
  const folder = `${contact(fx + fw / 2, fy + fh + 2, fw * 0.5, 3, 0.08)}
    <rect x="${fx + 3}" y="${fy + 2}" width="${fw}" height="${fh}" rx="3" fill="${C.ivory}" stroke="${C.champagneLo}" stroke-width=".75"/>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="3" fill="url(#cover_wallet)"/>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="3" fill="${C.cognac}" filter="url(#leather_wallet)"/>
    <rect x="${fx + 9}" y="${fy + 9}" width="${fw - 18}" height="${fh - 18}" rx="1.5" fill="none" stroke="${C.brassHi}" stroke-width=".75" stroke-dasharray="3 2.2"/>
    ${line(fx + 14, fy, fx + 14, fy + fh, { color: C.espresso, w: 0.75, o: 0.3 })}
    <g transform="translate(${fx + fw / 2} ${fy + 96})">
      <circle r="27" fill="none" stroke="url(#foil_wallet)" stroke-width="1.5"/>
      <circle r="23" fill="none" stroke="url(#foil_wallet)" stroke-width=".6"/>
      <path d="M-15 4 C-10 -6 -4 -9 0 -12 C4 -9 10 -6 15 4 C9 -1 4 -2 0 2 C-4 -2 -9 -1 -15 4 Z" fill="url(#foil_wallet)"/>
      <path d="M-10 9 C-5 6 5 6 10 9" fill="none" stroke="url(#foil_wallet)" stroke-width="1"/>
      <path d="M-6 13 C-3 11.5 3 11.5 6 13" fill="none" stroke="url(#foil_wallet)" stroke-width=".8"/>
    </g>
    <text x="${fx + fw / 2 + 3}" y="${fy + 160}" text-anchor="middle" font-family="${SERIF}" font-size="17" letter-spacing="6" fill="${C.brassHi}">FIRST</text>
    ${line(fx + fw / 2 - 18, fy + 172, fx + fw / 2 + 18, fy + 172, { color: C.brassHi, w: 0.75 })}
    <text x="${fx + fw / 2 + 2}" y="${fy + 188}" text-anchor="middle" font-family="${SANS}" font-size="6" letter-spacing="3.5" fill="${C.brassHi}">TRAVEL DOCUMENTS</text>
    <path d="M${fx + 124} ${fy + fh - 4} L${fx + 136} ${fy + fh - 4} L${fx + 136} ${fy + fh + 30} L${fx + 130} ${fy + fh + 24} L${fx + 124} ${fy + fh + 30} Z" fill="${C.wine}"/>
    ${line(fx + 130, fy + fh, fx + 130, fy + fh + 22, { color: C.wineHi, w: 0.5, o: 0.6 })}
    ${line(fx + 124, fy + fh - 0.5, fx + 136, fy + fh - 0.5, { color: C.espresso, w: 0.75, o: 0.35 })}`;
  // boarding pass
  const bx = 276, by = 74, bw = 252, bh = 112, stub = 74;
  const field = (x, y, label, val, size = 11) =>
    `<text x="${x}" y="${y}" font-family="${SANS}" font-size="5.5" letter-spacing="2.5" fill="${C.brass}">${label}</text><text x="${x}" y="${y + size + 3}" font-family="${SANS}" font-size="${size}" letter-spacing="1.5" fill="${C.espresso}">${val}</text>`;
  const r = rng(77);
  let bars = "";
  for (let x = 0; x < 52; ) {
    const w = r() > 0.6 ? 1.4 : 0.7;
    bars += `<rect x="${f(bx + 16 + x)}" y="${by + 88}" width="${w}" height="13" fill="${C.espresso}" fill-opacity=".85"/>`;
    x += w + 0.9 + r() * 1.2;
  }
  const sx = bx + bw - stub;
  const pass = `${contact(bx + bw / 2, by + bh + 1, bw * 0.48, 2.5, 0.07)}
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="${C.ivory}" stroke="${C.champagneLo}" stroke-width=".75"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="18" rx="3" fill="${C.champagne}"/><rect x="${bx}" y="${by + 12}" width="${bw}" height="6" fill="${C.champagne}"/>
    ${line(bx, by + 18, bx + bw, by + 18, { color: C.brass, w: 0.75 })}
    <text x="${bx + 12}" y="${by + 12}" font-family="${SANS}" font-size="6" letter-spacing="4" fill="${C.espresso}">BOARDING PASS</text>
    <text x="${sx - 10}" y="${by + 12}" text-anchor="end" font-family="${SANS}" font-size="6" letter-spacing="4" fill="${C.wine}">FIRST</text>
    <text x="${bx + 14}" y="${by + 46}" font-family="${SANS}" font-size="22" letter-spacing="3" fill="${C.espresso}">DXB</text>
    <text x="${bx + 116}" y="${by + 46}" font-family="${SANS}" font-size="22" letter-spacing="3" fill="${C.espresso}">JFK</text>
    ${line(bx + 74, by + 38, bx + 106, by + 38, { color: C.brass, w: 0.75 })}
    <path d="M${bx + 102} ${by + 35} L${bx + 107} ${by + 38} L${bx + 102} ${by + 41}" fill="none" stroke="${C.brass}" stroke-width=".75"/>
    <text x="${bx + 14}" y="${by + 56}" font-family="${SANS}" font-size="5" letter-spacing="2" fill="${C.taupeLo}">DUBAI</text>
    <text x="${bx + 116}" y="${by + 56}" font-family="${SANS}" font-size="5" letter-spacing="2" fill="${C.taupeLo}">NEW YORK</text>
    ${field(bx + 14, by + 70, "FLIGHT", "FS 001", 8)}${field(bx + 62, by + 70, "DATE", "07 OCT", 8)}${field(bx + 108, by + 70, "BOARDS", "08:15", 8)}
    ${field(bx + 76, by + 92, "GATE", "A1", 8)}${field(bx + 108, by + 92, "ZONE", "1", 8)}
    ${bars}
    <rect x="${sx - 1}" y="${by}" width="${stub + 1}" height="${bh}" fill="${C.cream}" fill-opacity=".6"/>
    ${line(sx, by + 4, sx, by + bh - 4, { color: C.taupe, w: 0.75 })}
    <line x1="${sx}" y1="${by + 4}" x2="${sx}" y2="${by + bh - 4}" stroke="${C.ivory}" stroke-width="1" stroke-dasharray="2 2.5"/>
    <text x="${sx + stub / 2}" y="${by + 34}" text-anchor="middle" font-family="${SANS}" font-size="5.5" letter-spacing="3" fill="${C.brass}">SEAT</text>
    <text x="${sx + stub / 2}" y="${by + 68}" text-anchor="middle" font-family="${SERIF}" font-size="34" fill="${C.wine}">1A</text>
    ${line(sx + 18, by + 78, sx + stub - 18, by + 78, { color: C.wine, w: 0.75 })}
    <text x="${sx + stub / 2 + 1}" y="${by + 92}" text-anchor="middle" font-family="${SANS}" font-size="5.5" letter-spacing="2.5" fill="${C.espresso}">DXB · JFK</text>`;
  // passport, slate-blue cover with brass foil
  const px = 276, py = 212, pw = 120, ph = 166;
  const passport = `${contact(px + pw / 2, py + ph + 1, pw * 0.46, 2.5, 0.08)}
    <rect x="${px + 2}" y="${py + 1.5}" width="${pw}" height="${ph}" rx="5" fill="${C.ivory}" stroke="${C.sand}" stroke-width=".75"/>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="5" fill="${C.slate}"/>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="5" fill="url(#pp_wallet)"/>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="5" fill="${C.slate}" filter="url(#grain_pp_wallet)"/>
    <text x="${px + pw / 2}" y="${py + 38}" text-anchor="middle" font-family="${SANS}" font-size="7" letter-spacing="5" fill="${C.brassHi}">PASSPORT</text>
    <g transform="translate(${px + pw / 2} ${py + 84})" stroke="${C.brassHi}" fill="none">
      <circle r="20" stroke-width=".9"/>
      <path d="M0 -13 L3 -4 L12 -4 L5 2 L8 11 L0 5.5 L-8 11 L-5 2 L-12 -4 L-3 -4 Z" stroke-width=".8"/>
    </g>
    <rect x="${px + pw / 2 - 9}" y="${py + 132}" width="18" height="12" rx="2" fill="none" stroke="${C.brassHi}" stroke-width=".8"/>
    <circle cx="${px + pw / 2}" cy="${py + 138}" r="3" fill="none" stroke="${C.brassHi}" stroke-width=".7"/>`;
  // slim brass pen
  const pen = `${contact(486, 372, 6, 2, 0.08)}
    <rect x="481" y="214" width="9" height="150" rx="4.5" fill="url(#pen_wallet)"/>
    <rect x="481" y="214" width="9" height="150" rx="4.5" fill="${C.brass}" filter="url(#brushed_wallet)"/>
    ${line(481, 262, 490, 262, { color: C.brassLo, w: 0.75 })}
    <rect x="490" y="222" width="2.2" height="34" rx="1" fill="${C.brassLo}"/>
    <path d="M482 364 L485.5 378 L489 364 Z" fill="${C.brassLo}"/>`;
  scenes["ticket-wallet.svg"] = svg(
    W,
    H,
    `<defs>
    ${texture("linen_wallet", ".55 .55", [0.55, 0.48, 0.38], 0.12, 11, 2)}
    ${texture("leather_wallet", "1.3", [0.3, 0.16, 0.08], 0.22, 4, 3)}
    ${texture("grain_pp_wallet", "1.2", [0.1, 0.12, 0.16], 0.3, 8, 3)}
    ${texture("brushed_wallet", ".02 .9", [1, 0.95, 0.85], 0.3, 2, 2)}
    <linearGradient id="cover_wallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
    <linearGradient id="foil_wallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".5" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
    <linearGradient id="pp_wallet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.slateHi}" stop-opacity=".35"/><stop offset="1" stop-color="${C.slate}" stop-opacity="0"/></linearGradient>
    <linearGradient id="pen_wallet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".6" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ivory}"/>
  <rect width="${W}" height="${H}" fill="${C.ivory}" filter="url(#linen_wallet)"/>
  ${folder}${pass}${passport}${pen}`,
    { bg: C.ivory }
  );
}

// 3. The first-class lounge before boarding: armchair, side table, window wall with an aircraft tail.
{
  const W = 640, H = 420;
  const wx0 = 40, wx1 = 600, wy0 = 46, wy1 = 286, hz = 214;
  const mull = [40, 180, 320, 460, 600];
  // the aircraft outside: fuselage aft section and a big tail fin, on the right
  const plane = `
    <path d="M188 228 L536 227 C566 227 588 232 598 238 L598 246 C582 254 560 260 536 260 L188 262 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".6"/>
    ${line(188, 252, 560, 252, { color: C.taupe, w: 0.6, o: 0.6 })}
    <path d="M456 228 L540 74 L578 72 L590 233 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
    <path d="M498 151 L516 118 L580 116 L583 150 Z" fill="${C.wine}"/>
    <path d="M492 162 L497 153 L583 152 L584 161 Z" fill="${C.brassHi}"/>
    <path d="M510 246 L578 236 L596 238 L540 252 Z" fill="${C.sand}" stroke="${C.taupe}" stroke-width=".6"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${f(238 + i * 18)}" y="238" width="5" height="6" rx="2.5" fill="${C.sky}" stroke="${C.taupe}" stroke-width=".4"/>`).join("")}
    <rect x="216" y="234" width="10" height="20" rx="1" fill="none" stroke="${C.taupe}" stroke-width=".6"/>
    <path d="M100 214 L210 218 L214 236 L100 236 Z" fill="${C.champagne}" stroke="${C.taupe}" stroke-width=".6"/>
    ${[120, 140, 160, 180, 200].map((x) => line(x, 215, x, 236, { color: C.taupe, w: 0.5, o: 0.6 })).join("")}
    <rect x="150" y="236" width="5" height="26" fill="${C.sand}" stroke="${C.taupe}" stroke-width=".5"/>
    <rect x="140" y="260" width="25" height="5" rx="2" fill="${C.taupe}" fill-opacity=".6"/>`;
  // apron with markings, terminal far off
  const apron = `
    <rect x="${wx0}" y="${hz}" width="${wx1 - wx0}" height="${wy1 - hz}" fill="url(#apron_lounge)"/>
    <rect x="${wx0}" y="${hz - 8}" width="${wx1 - wx0}" height="8" fill="${C.sand}" fill-opacity=".7"/>
    ${[[60, 210, 30], [120, 204, 12], [210, 206, 50]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${hz - y}" fill="${C.champagne}" fill-opacity=".5"/>`).join("")}
    ${line(wx0, 262, 300, 262, { color: C.brassHi, w: 1.2 })}
    ${line(80, 286, 200, 236, { color: C.brassHi, w: 1 })}
    ${line(wx0, 248, 280, 246, { color: C.ivory, w: 0.8, o: 0.8 })}`;
  const sky = `<rect x="${wx0}" y="${wy0}" width="${wx1 - wx0}" height="${hz - wy0}" fill="url(#sky_lounge)"/>`;
  let frames = "";
  for (const x of mull) frames += `<rect x="${x - 3}" y="${wy0}" width="6" height="${wy1 - wy0}" fill="${C.cream}" stroke="${C.taupe}" stroke-width=".6"/>`;
  frames += `<rect x="${wx0 - 3}" y="${wy0 - 6}" width="${wx1 - wx0 + 6}" height="6" fill="${C.cream}" stroke="${C.taupe}" stroke-width=".6"/>`;
  frames += line(wx0, wy0 + 58, wx1, wy0 + 58, { color: C.taupe, w: 0.6, o: 0.5 });
  const sill = `<rect x="0" y="${wy1}" width="${W}" height="8" fill="${C.sand}"/>${line(0, wy1, W, wy1, { color: C.brass, w: 1 })}${line(0, wy1 + 8, W, wy1 + 8, { color: C.taupe, w: 0.6 })}`;
  const floor = `<rect x="0" y="${wy1 + 8}" width="${W}" height="${H - wy1 - 8}" fill="url(#floor_lounge)"/>
    <rect x="0" y="${wy1 + 8}" width="${W}" height="${H - wy1 - 8}" fill="${C.sand}" filter="url(#stone_lounge)"/>
    <path d="M110 350 L470 350 L520 404 L60 404 Z" fill="${C.ivory}" fill-opacity=".75"/>
    <path d="M110 350 L470 350 L520 404 L60 404 Z M120 355 L466 355 L508 399 L72 399 Z" fill="${C.slate}" fill-rule="evenodd" fill-opacity=".85"/>
    <path d="M125 358 L463 358 L502 396 L79 396 Z" fill="none" stroke="${C.slateHi}" stroke-width=".6"/>`;
  // walls either side of the glass
  const walls = `<rect x="0" y="0" width="${wx0 - 3}" height="${wy1}" fill="${C.sand}"/><rect x="${wx1 + 3}" y="0" width="${W - wx1 - 3}" height="${wy1}" fill="${C.sand}"/>
    <rect x="0" y="0" width="${W}" height="${wy0 - 6}" fill="${C.ivory}"/>${line(0, wy0 - 6, W, wy0 - 6, { color: C.taupe, w: 0.6 })}
    ${line(0, 12, W, 12, { color: C.brassHi, w: 0.75 })}`;
  // armchair in profile, facing right towards the window, walnut base
  const ax = 150, ay = 384; // front foot reference
  const back = `M${ax + 6} ${ay - 30} L${ax - 12} ${ay - 128} C${ax - 14} ${ay - 138} ${ax - 6} ${ay - 144} ${ax + 4} ${ay - 142} L${ax + 20} ${ay - 138} C${ax + 28} ${ay - 136} ${ax + 32} ${ay - 130} ${ax + 31} ${ay - 122} L${ax + 30} ${ay - 30} Z`;
  const side = `M${ax + 2} ${ay - 24} L${ax + 2} ${ay - 76} C${ax + 2} ${ay - 84} ${ax + 8} ${ay - 88} ${ax + 16} ${ay - 88} L${ax + 128} ${ay - 88} C${ax + 138} ${ay - 88} ${ax + 143} ${ay - 81} ${ax + 143} ${ay - 72} L${ax + 141} ${ay - 24} Z`;
  const chair = `${contact(ax + 72, ay + 2, 84, 3, 0.09)}
    <path d="M${ax + 6} ${ay} L${ax + 10} ${ay - 18} M${ax + 138} ${ay} L${ax + 134} ${ay - 18}" stroke="${C.walnut}" stroke-width="3" stroke-linecap="round"/>
    <rect x="${ax}" y="${ay - 24}" width="145" height="7" rx="2" fill="url(#walnut_lounge)"/>
    <path d="${back}" fill="url(#leather_lounge)"/><path d="${back}" fill="${C.cognac}" filter="url(#grainL_lounge)"/>
    <path d="${back}" fill="none" stroke="${C.cognac}" stroke-width=".75"/>
    <path d="M${ax - 6} ${ay - 134} C${ax + 4} ${ay - 138} ${ax + 20} ${ay - 134} ${ax + 27} ${ay - 128}" fill="none" stroke="${C.brassHi}" stroke-width=".75" stroke-dasharray="2.5 2"/>
    <path d="M${ax + 26} ${ay - 90} C${ax + 22} ${ay - 104} ${ax + 26} ${ay - 116} ${ax + 34} ${ay - 116} C${ax + 44} ${ay - 116} ${ax + 50} ${ay - 104} ${ax + 50} ${ay - 90} Z" fill="${C.rose}" stroke="${C.wineHi}" stroke-width=".6"/>
    <path d="${side}" fill="url(#leather_lounge)"/><path d="${side}" fill="${C.cognac}" filter="url(#grainL_lounge)"/>
    <path d="${side}" fill="none" stroke="${C.cognac}" stroke-width=".75"/>
    <path d="M${ax + 2} ${ay - 76} C${ax + 4} ${ay - 82} ${ax + 10} ${ay - 76} ${ax + 16} ${ay - 76} L${ax + 130} ${ay - 76} C${ax + 136} ${ay - 76} ${ax + 140} ${ay - 74} ${ax + 143} ${ay - 70}" fill="none" stroke="${C.cognac}" stroke-width=".75"/>
    <path d="M${ax + 10} ${ay - 72} L${ax + 10} ${ay - 30} L${ax + 134} ${ay - 30} L${ax + 136} ${ay - 70}" fill="none" stroke="${C.brassHi}" stroke-width=".75" stroke-dasharray="2.5 2"/>
    ${line(ax + 16, ay - 86, ax + 126, ay - 86, { color: C.brassHi, w: 0.75 })}`;
  // a sage potted plant by the glass
  const pr = rng(31);
  let leaves = "";
  for (let i = 0; i < 26; i++) {
    const t = i / 25, ang = -150 + t * 120 + (pr() - 0.5) * 20, len = 40 + pr() * 70;
    const a = (ang * Math.PI) / 180, x2 = 556 + Math.cos(a) * len * 0.55, y2 = 340 + Math.sin(a) * len;
    leaves += `<path d="M556 340 Q${f((556 + x2) / 2 + (pr() - 0.5) * 10)} ${f((340 + y2) / 2)} ${f(x2)} ${f(y2)}" fill="none" stroke="${C.sageLo}" stroke-width=".7"/>`;
    leaves += `<ellipse cx="${f(x2)}" cy="${f(y2)}" rx="3.2" ry="11" fill="${i % 3 ? C.sage : C.sageLo}" transform="rotate(${f(ang + 90)} ${f(x2)} ${f(y2)})"/>`;
  }
  const plant = `${contact(556, 386, 26, 2.5, 0.08)}${leaves}
    <path d="M534 338 L578 338 L572 386 L540 386 Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".75"/>
    ${line(534, 338, 578, 338, { color: C.brass, w: 1.2 })}${line(537, 350, 575, 350, { color: C.brass, w: 0.6, o: 0.7 })}`;
  // side table with cup and saucer
  const tx = 360, tt = 318;
  const table = `${contact(tx, ay + 2, 26, 2.5, 0.08)}
    <path d="M${tx - 22} ${ay} L${tx + 22} ${ay}" stroke="${C.brass}" stroke-width="2" stroke-linecap="round"/>
    <rect x="${tx - 1.5}" y="${tt + 6}" width="3" height="${ay - tt - 6}" fill="url(#brass_lounge)"/>
    <ellipse cx="${tx}" cy="${tt + 4}" rx="36" ry="3.5" fill="${C.walnut}"/>
    <ellipse cx="${tx}" cy="${tt}" rx="36" ry="5" fill="url(#walnut_lounge)"/>
    <ellipse cx="${tx}" cy="${tt}" rx="36" ry="5" fill="none" stroke="${C.brass}" stroke-width=".6"/>
    <ellipse cx="${tx + 4}" cy="${tt - 1}" rx="12" ry="2.4" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".6"/>
    <path d="M${tx - 3} ${tt - 13} L${tx - 2} ${tt - 3} C${tx - 1} ${tt - 1} ${tx + 9} ${tt - 1} ${tx + 10} ${tt - 3} L${tx + 11} ${tt - 13} Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".6"/>
    <ellipse cx="${tx + 4}" cy="${tt - 13}" rx="7" ry="1.5" fill="${C.walnut}" fill-opacity=".7" stroke="${C.taupe}" stroke-width=".5"/>
    <path d="M${tx + 11} ${tt - 11} C${tx + 16} ${tt - 11} ${tx + 16} ${tt - 5} ${tx + 10.5} ${tt - 5}" fill="none" stroke="${C.taupe}" stroke-width=".9"/>
    ${line(tx - 2, tt - 12, tx + 10, tt - 12, { color: C.brass, w: 0.5 })}`;
  scenes["first-lounge.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="sky_lounge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="apron_lounge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="floor_lounge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
    <linearGradient id="leather_lounge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
    <linearGradient id="walnut_lounge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.walnut}"/><stop offset=".5" stop-color="${C.taupeLo}"/><stop offset="1" stop-color="${C.walnut}"/></linearGradient>
    <linearGradient id="brass_lounge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
    ${texture("stone_lounge", ".03 .4", [0.5, 0.44, 0.36], 0.1, 6, 2)}
    ${texture("grainL_lounge", "1.2", [0.3, 0.15, 0.07], 0.2, 9, 3)}
  </defs>
  ${sky}${apron}${plane}${frames}${walls}${sill}${floor}${plant}${chair}${table}`
  );
}

// 4. The onboard shower spa: pale stone, a brass rain head, heated towel rail, a small round window.
{
  const W = 460, H = 600, fy = 488;
  const r = rng(404);
  // subtle veining on the stone
  let veins = "";
  for (let i = 0; i < 9; i++) {
    let x = r() * W, y = r() * fy, d = `M${f(x)} ${f(y)}`;
    for (let k = 0; k < 5; k++) {
      const nx = x + 30 + r() * 60, ny = y + (r() - 0.35) * 70;
      d += ` Q${f(x + (nx - x) * 0.5 + (r() - 0.5) * 30)} ${f(y + (ny - y) * 0.5 + (r() - 0.5) * 30)} ${f(nx)} ${f(ny)}`;
      x = nx; y = ny;
    }
    veins += `<path d="${d}" fill="none" stroke="${C.taupeLo}" stroke-width="${f(0.4 + r() * 0.6)}" stroke-opacity="${f(0.28 + r() * 0.17)}"/>`;
  }
  // large-format slabs
  let joints = "";
  for (const x of [153, 307]) joints += line(x, 0, x, fy, { color: C.ivory, w: 1.2 }) + line(x + 1.2, 0, x + 1.2, fy, { color: C.taupe, w: 0.5, o: 0.5 });
  for (const y of [244]) joints += line(0, y, W, y, { color: C.ivory, w: 1.2 }) + line(0, y + 1.2, W, y + 1.2, { color: C.taupe, w: 0.5, o: 0.5 });
  const wall = `<rect width="${W}" height="${fy}" fill="url(#stone_spa)"/>
    <rect width="${W}" height="${fy}" fill="${C.ivory}" filter="url(#stoneTex_spa)"/>
    ${veins}${joints}`;
  const floor = `<rect y="${fy}" width="${W}" height="${H - fy}" fill="url(#floor_spa)"/>
    ${line(0, fy, W, fy, { color: C.brass, w: 1 })}
    ${[120, 230, 340].map((x) => line(x, fy, 230 + (x - 230) * 2.2, H, { color: C.ivory, w: 1 })).join("")}
    ${line(0, 540, W, 540, { color: C.ivory, w: 1 })}
    <path d="M150 560 L310 560 L314 566 L146 566 Z" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".6"/>
    ${Array.from({ length: 20 }, (_, i) => line(156 + i * 7.6, 561.5, 155 + i * 7.6, 564.5, { color: C.brassLo, w: 0.6 })).join("")}`;
  // small round window, upper left
  const wcx = 84, wcy = 150, wr = 30;
  const win = `<circle cx="${wcx}" cy="${wcy}" r="${wr + 10}" fill="${C.cream}" stroke="${C.brass}" stroke-width="1"/>
    <circle cx="${wcx}" cy="${wcy}" r="${wr + 4}" fill="none" stroke="${C.brassLo}" stroke-width=".75"/>
    <circle cx="${wcx}" cy="${wcy}" r="${wr}" fill="url(#sky_spa)"/>
    <g clip-path="url(#winClip_spa)" fill="${C.ivory}"><path d="M${wcx - wr} ${wcy + 12} C${wcx - 20} ${wcy + 4} ${wcx - 12} ${wcy + 6} ${wcx - 4} ${wcy + 9} C${wcx + 4} ${wcy + 3} ${wcx + 16} ${wcy + 5} ${wcx + wr} ${wcy + 8} L${wcx + wr} ${wcy + wr} L${wcx - wr} ${wcy + wr} Z"/><path d="M${wcx - wr} ${wcy + 20} C${wcx} ${wcy + 15} ${wcx + 12} ${wcy + 18} ${wcx + wr} ${wcy + 17}" fill="none" stroke="${C.sand}" stroke-width=".8"/></g>
    <path d="M${wcx - 18} ${wcy - 20} A${wr - 6} ${wr - 6} 0 0 1 ${wcx + 4} ${wcy - 25}" fill="none" stroke="${C.ivory}" stroke-width="1.2" stroke-opacity=".8"/>`;
  // ceiling-mounted rain shower head
  const sx = 240, sy = 92;
  let rain = "";
  for (let i = 0; i < 18; i++) {
    const x = sx - 56 + i * 6.6, y0 = sy + 14 + (i % 2) * 6, len = 150 + ((i * 7) % 5) * 22;
    rain += `<line x1="${f(x)}" y1="${y0}" x2="${f(x)}" y2="${f(y0 + len)}" stroke="url(#rain_spa)" stroke-width=".6" stroke-dasharray="${8 + (i % 3) * 3} ${5 + (i % 4) * 2}"/>`;
  }
  const head = `<rect x="${sx - 3}" y="0" width="6" height="${sy - 4}" fill="url(#brassV_spa)"/>
    <rect x="${sx - 8}" y="0" width="16" height="5" fill="${C.brass}"/>
    <rect x="${sx - 6}" y="${sy - 10}" width="12" height="7" rx="2" fill="${C.brass}"/>
    <ellipse cx="${sx}" cy="${sy + 4}" rx="66" ry="7" fill="${C.brassLo}"/>
    <ellipse cx="${sx}" cy="${sy}" rx="66" ry="7" fill="url(#brassH_spa)"/>
    <ellipse cx="${sx}" cy="${sy}" rx="66" ry="7" fill="${C.brass}" filter="url(#brushed_spa)"/>
    <path d="M${sx - 66} ${sy} L${sx - 66} ${sy + 4} A66 7 0 0 0 ${sx + 66} ${sy + 4} L${sx + 66} ${sy}" fill="none" stroke="${C.brassLo}" stroke-width=".75"/>
    ${Array.from({ length: 13 }, (_, i) => `<circle cx="${f(sx - 54 + i * 9)}" cy="${f(sy + 8.5 + Math.sin((i / 12) * Math.PI) * 2.2)}" r=".7" fill="${C.espresso}" fill-opacity=".45"/>`).join("")}
    ${rain}`;
  // thermostatic valve and diverter
  const vx = 240, vy = 318;
  const valve = `<circle cx="${vx}" cy="${vy}" r="30" fill="url(#brassH_spa)" stroke="${C.brassLo}" stroke-width=".75"/>
    <circle cx="${vx}" cy="${vy}" r="30" fill="${C.brass}" filter="url(#brushed_spa)"/>
    <circle cx="${vx}" cy="${vy}" r="12" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".75"/>
    <path d="M${vx - 3} ${vy} L${vx - 3} ${vy - 36} C${vx - 3} ${vy - 40} ${vx + 3} ${vy - 40} ${vx + 3} ${vy - 36} L${vx + 3} ${vy} Z" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".75" transform="rotate(35 ${vx} ${vy})"/>
    ${[0, 30, 60, 90, 120].map((a) => { const t = ((a - 60) * Math.PI) / 180; return line(vx + Math.sin(t) * 24, vy - Math.cos(t) * 24, vx + Math.sin(t) * 27, vy - Math.cos(t) * 27, { color: C.brassLo, w: 0.75 }); }).join("")}
    <circle cx="${vx}" cy="${vy + 60}" r="12" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".75"/>
    <rect x="${vx - 2}" y="${vy + 50}" width="4" height="20" rx="2" fill="${C.brass}" stroke="${C.brassLo}" stroke-width=".5"/>
    <text x="${vx}" y="${vy + 92}" text-anchor="middle" font-family="${SANS}" font-size="6" letter-spacing="4" fill="${C.brassLo}">RAIN · HAND</text>`;
  // recessed niche with two amenity bottles
  const niche = `<rect x="58" y="300" width="70" height="78" fill="${C.sand}" stroke="${C.brass}" stroke-width=".75"/>
    <rect x="58" y="300" width="70" height="6" fill="${C.champagne}" fill-opacity=".6"/>
    ${line(58, 378, 128, 378, { color: C.brassLo, w: 1 })}
    <rect x="72" y="336" width="16" height="42" rx="3" fill="${C.rose}" stroke="${C.wineHi}" stroke-width=".6"/><rect x="76" y="328" width="8" height="8" fill="${C.brass}"/>
    <rect x="96" y="344" width="16" height="34" rx="3" fill="${C.cognac}" fill-opacity=".85" stroke="${C.cognac}" stroke-width=".6"/><rect x="100" y="337" width="8" height="7" fill="${C.brass}"/>
    <rect x="74" y="352" width="12" height="9" fill="${C.ivory}"/><rect x="98" y="356" width="12" height="9" fill="${C.ivory}"/>${line(76, 356, 84, 356, { color: C.espresso, w: 0.5 })}${line(100, 360, 108, 360, { color: C.espresso, w: 0.5 })}`;
  // heated towel rail with folded towel
  const tx0 = 342, tx1 = 410, ty0 = 220, ty1 = 430;
  let bars = "";
  for (let i = 0; i < 7; i++) {
    const y = ty0 + 16 + i * 30;
    bars += `<rect x="${tx0}" y="${y - 2}" width="${tx1 - tx0}" height="4" rx="2" fill="url(#brassV_spa)"/>`;
  }
  const rail = `${[tx0, tx1].map((x) => `<rect x="${x - 3}" y="${ty0}" width="6" height="${ty1 - ty0}" rx="3" fill="url(#brassH_spa)" stroke="${C.brassLo}" stroke-width=".5"/>
      <rect x="${x - 6}" y="${ty0 + 6}" width="12" height="5" rx="1" fill="${C.brass}"/><rect x="${x - 6}" y="${ty1 - 12}" width="12" height="5" rx="1" fill="${C.brass}"/>`).join("")}
    ${bars}
    <path d="M${tx0 - 3} ${ty0 + 72} L${tx1 + 3} ${ty0 + 72} L${tx1 + 3} ${ty0 + 178} L${tx0 - 3} ${ty0 + 178} Z" fill="${C.sageLo}" stroke="${C.sageLo}" stroke-width=".6"/>
    <path d="M${tx0 - 6} ${ty0 + 72} L${tx1 + 6} ${ty0 + 72} L${tx1 + 6} ${ty0 + 170} L${tx0 - 6} ${ty0 + 170} Z" fill="url(#towel_spa)"/>
    <path d="M${tx0 - 6} ${ty0 + 72} L${tx1 + 6} ${ty0 + 72} L${tx1 + 6} ${ty0 + 170} L${tx0 - 6} ${ty0 + 170} Z" fill="${C.sage}" filter="url(#terry_spa)"/>
    <path d="M${tx0 - 7} ${ty0 + 70} C${tx0 - 7} ${ty0 + 64} ${tx1 + 7} ${ty0 + 64} ${tx1 + 7} ${ty0 + 70} L${tx1 + 7} ${ty0 + 76} L${tx0 - 7} ${ty0 + 76} Z" fill="${C.sage}" stroke="${C.sageLo}" stroke-width=".6"/>
    ${line(tx0 - 6, ty0 + 76, tx0 - 6, ty0 + 170, { color: C.sageLo, w: 0.6 })}${line(tx1 + 6, ty0 + 76, tx1 + 6, ty0 + 170, { color: C.sageLo, w: 0.6 })}
    ${line(tx0 - 6, ty0 + 170, tx1 + 6, ty0 + 170, { color: C.sageLo, w: 0.75 })}
    <rect x="${tx0 - 6}" y="${ty0 + 148}" width="${tx1 - tx0 + 12}" height="10" fill="${C.ivory}" fill-opacity=".85"/>
    ${line(tx0 - 6, ty0 + 150, tx1 + 6, ty0 + 150, { color: C.brass, w: 0.6 })}${line(tx0 - 6, ty0 + 156, tx1 + 6, ty0 + 156, { color: C.brass, w: 0.6 })}
    <rect x="${tx0 - 9}" y="${ty0 + 120}" width="5" height="3" fill="${C.ivory}" stroke="${C.sageLo}" stroke-width=".4"/>
    <circle cx="${(tx0 + tx1) / 2}" cy="${ty1 + 22}" r="5" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".6"/>
    ${line((tx0 + tx1) / 2 - 2, ty1 + 22, (tx0 + tx1) / 2 + 2, ty1 + 22, { color: C.brassLo, w: 0.75 })}`;
  scenes["shower-spa.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="stone_spa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="floor_spa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="sky_spa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.slateHi}" stop-opacity=".55"/><stop offset="1" stop-color="${C.sky}"/></linearGradient>
    <linearGradient id="brassH_spa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".55" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
    <linearGradient id="brassV_spa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
    <linearGradient id="towel_spa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.sage}"/><stop offset="1" stop-color="${C.sageLo}"/></linearGradient>
    <linearGradient id="rain_spa" gradientUnits="userSpaceOnUse" x1="0" y1="${sy}" x2="0" y2="${sy + 260}"><stop offset="0" stop-color="${C.taupeLo}" stop-opacity=".5"/><stop offset="1" stop-color="${C.taupe}" stop-opacity="0"/></linearGradient>
    <clipPath id="winClip_spa"><circle cx="${wcx}" cy="${wcy}" r="${wr}"/></clipPath>
    ${texture("stoneTex_spa", ".012 .03", [0.6, 0.55, 0.48], 0.12, 21, 4)}
    ${texture("terry_spa", "1.6", [0.85, 0.88, 0.8], 0.2, 12, 2)}
    ${texture("brushed_spa", ".02 .9", [1, 0.95, 0.85], 0.28, 2, 2)}
  </defs>
  ${wall}${floor}${win}${niche}${head}${valve}${rail}`
  );
}

// 5. Escorted down the jet bridge: a ground escort pulls your bags toward the open aircraft door.
{
  const W = 480, H = 600;
  const V = { x: 240, y: 255 }, FL = 260, EYE = 1.65, ZN = 0.5, ZS = 3.4, ZE = 6.6;
  const P = (X, Y, Z) => [V.x + (X * FL) / Z, V.y + ((EYE - Y) * FL) / Z];
  const hl = (a, b, o = {}) => line(a[0], a[1], b[0], b[1], o);
  const poly = (a, attrs) => `<polygon points="${pts(a)}" ${attrs}/>`;
  const secs = [[1.25, 2.45, ZN, ZS], [1.12, 2.32, ZS, ZE]];
  let tube = "";
  for (const [hw, ch, za, zb] of secs) {
    // ceiling, floor
    tube += poly([P(-hw, ch, za), P(hw, ch, za), P(hw, ch, zb), P(-hw, ch, zb)], `fill="url(#ceil_jet)"`);
    tube += poly([P(-hw, 0, za), P(hw, 0, za), P(hw, 0, zb), P(-hw, 0, zb)], `fill="${C.sand}"`);
    tube += poly([P(-hw, 0, za), P(hw, 0, za), P(hw, 0, zb), P(-hw, 0, zb)], `fill="${C.sand}" filter="url(#carpet_jet)"`);
    for (const s of [-1, 1]) {
      const X = s * hw;
      const q = (y0, y1, attrs) => poly([P(X, y0, za), P(X, y0, zb), P(X, y1, zb), P(X, y1, za)], attrs);
      tube += q(0, ch, `fill="${s < 0 ? C.champagne : C.sand}"`);
      tube += q(0.95, 2.0, `fill="url(#view_jet)"`);
      tube += q(0, 0.95, `fill="${s < 0 ? C.champagneLo : C.champagne}" fill-opacity=".7"`);
      for (const [y, c, w] of [[0.95, C.brassLo, 1], [2.0, C.brassLo, 1], [0.08, C.brass, 0.75], [ch - 0.02, C.taupe, 0.6]])
        tube += hl(P(X, y, za), P(X, y, zb), { color: c, w });
      // ribs every half metre: the corrugated wall frames
      for (let z = za + 0.5; z < zb - 0.01; z += 0.5) {
        const big = Math.abs((z - za) % 1) < 0.01;
        tube += hl(P(X, 0, z), P(X, ch, z), { color: big ? C.taupe : C.taupe, w: big ? Math.max(0.75, (0.035 * FL) / z) : 0.6, o: big ? 0.75 : 0.45 });
      }
    }
    for (let z = za + 1; z < zb - 0.01; z += 1) tube += hl(P(-hw, ch, z), P(hw, ch, z), { color: C.taupe, w: 0.75, o: 0.7 });
    // ceiling light panels
    for (let z = za + 0.25; z + 0.5 < zb; z += 1)
      tube += poly([P(-0.32, ch, z), P(0.32, ch, z), P(0.32, ch, z + 0.5), P(-0.32, ch, z + 0.5)], `fill="${C.ivory}" stroke="${C.brassHi}" stroke-width=".6"`);
    // floor runner with slate edging
    tube += poly([P(-0.6, 0, za), P(0.6, 0, za), P(0.6, 0, zb), P(-0.6, 0, zb)], `fill="${C.cream}" fill-opacity=".85"`);
    for (const x of [-0.6, -0.54, 0.54, 0.6]) tube += hl(P(x, 0, za), P(x, 0, zb), { color: C.slate, w: Math.abs(x) > 0.57 ? 1 : 0.6, o: 0.75 });
  }
  // the telescoping step between sections
  const [o0, o1] = [P(-1.25, 2.45, ZS), P(1.25, 0, ZS)], [i0, i1] = [P(-1.12, 2.32, ZS), P(1.12, 0, ZS)];
  const step = `<path d="M${f(o0[0])} ${f(o1[1])} V${f(o0[1])} H${f(o1[0])} V${f(o1[1])} H${f(i1[0])} V${f(i0[1])} H${f(i0[0])} V${f(i1[1])} Z" fill="${C.champagne}" stroke="${C.taupeLo}" stroke-width=".75"/>
    ${hl(P(-1.12, 0, ZS), P(1.12, 0, ZS), { color: C.brass, w: 2 })}`;
  // the aircraft: fuselage skin, bellows, the open door and the cabin beyond
  const e0 = P(-1.12, 2.32, ZE), e1 = P(1.12, 0, ZE), k = FL / ZE;
  let bellows = "";
  for (let i = 1; i <= 5; i++) {
    const z = ZE - 0.45 + i * 0.08, a = P(-1.12, 2.32, z), b = P(1.12, 0, z);
    bellows += `<rect x="${f(a[0])}" y="${f(a[1])}" width="${f(b[0] - a[0])}" height="${f(b[1] - a[1])}" fill="none" stroke="${i % 2 ? C.taupeLo : C.taupe}" stroke-width=".75"/>`;
  }
  const d0 = P(-0.42, 1.9, ZE), d1 = P(0.48, 0.02, ZE), dw = d1[0] - d0[0], dh = d1[1] - d0[1];
  // cabin crew member waiting just inside the door
  const crew = (() => {
    const z = ZE + 0.45, s = FL / z, g = P(0.04, 0, z);
    const X = (x) => f(g[0] + x * s), Y = (y) => f(g[1] - y * s);
    return `<rect x="${X(-0.09)}" y="${Y(0.5)}" width="${f(0.07 * s)}" height="${f(0.5 * s)}" fill="${C.champagneLo}"/>
      <rect x="${X(0.02)}" y="${Y(0.5)}" width="${f(0.07 * s)}" height="${f(0.5 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.11)} ${Y(0.02)} h${f(0.1 * s)} v${f(-0.04 * s)} h${f(-0.08 * s)} Z M${X(0.02)} ${Y(0.02)} h${f(0.1 * s)} v${f(-0.04 * s)} h${f(-0.08 * s)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.17)} ${Y(0.47)} L${X(-0.15)} ${Y(0.98)} L${X(0.15)} ${Y(0.98)} L${X(0.17)} ${Y(0.47)} Z" fill="${C.slate}"/>
      <path d="M${X(-0.2)} ${Y(1.42)} C${X(-0.16)} ${Y(1.46)} ${X(0.16)} ${Y(1.46)} ${X(0.2)} ${Y(1.42)} L${X(0.15)} ${Y(1.08)} L${X(0.17)} ${Y(0.9)} L${X(-0.17)} ${Y(0.9)} L${X(-0.15)} ${Y(1.08)} Z" fill="${C.slate}"/>
      ${line(X(0), Y(1.36), X(0), Y(0.92), { color: C.slateHi, w: 0.6 })}
      <path d="M${X(-0.19)} ${Y(1.4)} L${X(-0.2)} ${Y(1.1)} L${X(-0.04)} ${Y(0.96)} M${X(0.19)} ${Y(1.4)} L${X(0.2)} ${Y(1.1)} L${X(0.04)} ${Y(0.96)}" fill="none" stroke="${C.slate}" stroke-width="${f(0.075 * s)}" stroke-linejoin="round" stroke-linecap="round"/>
      <ellipse cx="${X(0)}" cy="${Y(0.95)}" rx="${f(0.06 * s)}" ry="${f(0.035 * s)}" fill="${C.champagneLo}"/>
      <rect x="${X(-0.035)}" y="${Y(1.53)}" width="${f(0.07 * s)}" height="${f(0.1 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.08)} ${Y(1.45)} L${X(0.08)} ${Y(1.45)} L${X(0)} ${Y(1.33)} Z" fill="${C.wine}"/>
      <path d="M${X(0.02)} ${Y(1.43)} L${X(0.09)} ${Y(1.3)} L${X(0.05)} ${Y(1.29)} Z" fill="${C.wineHi}"/>
      <ellipse cx="${X(0)}" cy="${Y(1.63)}" rx="${f(0.09 * s)}" ry="${f(0.12 * s)}" fill="${C.espresso}"/>
      <ellipse cx="${X(0)}" cy="${Y(1.6)}" rx="${f(0.075 * s)}" ry="${f(0.1 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.085)} ${Y(1.66)} C${X(-0.08)} ${Y(1.76)} ${X(0.08)} ${Y(1.76)} ${X(0.085)} ${Y(1.66)} C${X(0.04)} ${Y(1.7)} ${X(-0.04)} ${Y(1.7)} ${X(-0.085)} ${Y(1.66)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.07)} ${Y(1.73)} L${X(-0.06)} ${Y(1.8)} L${X(0.08)} ${Y(1.8)} L${X(0.09)} ${Y(1.73)} Z" fill="${C.slate}"/>
      <rect x="${X(-0.07)}" y="${Y(1.75)}" width="${f(0.16 * s)}" height="${f(0.02 * s)}" fill="${C.wine}"/>`;
  })();
  const cabin = `<rect x="${f(d0[0])}" y="${f(d0[1])}" width="${f(dw)}" height="${f(dh)}" rx="${f(0.16 * k)}" fill="url(#cabin_jet)"/>
    <g clip-path="url(#door_jet)">
      ${(() => { const a = P(-1.5, 2.1, ZE + 1.6), b = P(1.5, 0, ZE + 1.6); return `<rect x="${f(a[0])}" y="${f(a[1])}" width="${f(b[0] - a[0])}" height="${f(b[1] - a[1])}" fill="${C.champagne}"/>${line(a[0], P(0, 1.0, ZE + 1.6)[1], b[0], P(0, 1.0, ZE + 1.6)[1], { color: C.brass, w: 0.75 })}<rect x="${f(P(0.1, 0, 0)[0])}" y="0" width="0" height="0"/>`; })()}
      <polygon points="${pts([P(-1.5, 0, ZE), P(1.5, 0, ZE), P(1.5, 0, ZE + 1.6), P(-1.5, 0, ZE + 1.6)])}" fill="${C.sand}"/>
      ${hl(P(-1.5, 2.05, ZE), P(-1.5, 2.05, ZE + 1.6), { color: C.brass, w: 0.75 })}
      ${crew}
    </g>
    <rect x="${f(d0[0])}" y="${f(d0[1])}" width="${f(dw)}" height="${f(dh)}" rx="${f(0.16 * k)}" fill="none" stroke="${C.taupeLo}" stroke-width="1.5"/>
    <rect x="${f(d0[0] - 3)}" y="${f(d0[1] - 3)}" width="${f(dw + 6)}" height="${f(dh + 6)}" rx="${f(0.16 * k + 3)}" fill="none" stroke="${C.taupe}" stroke-width=".6"/>
    ${line(d0[0], d1[1], d1[0], d1[1], { color: C.brass, w: 2 })}`;
  // the opened door panel, swung forward against the bellows
  const p0 = P(-1.08, 1.86, ZE - 0.06), p1 = P(-0.52, 0.06, ZE - 0.06);
  const doorPanel = `<rect x="${f(p0[0])}" y="${f(p0[1])}" width="${f(p1[0] - p0[0])}" height="${f(p1[1] - p0[1])}" rx="4" fill="${C.cream}" stroke="${C.taupeLo}" stroke-width=".75"/>
    <ellipse cx="${f((p0[0] + p1[0]) / 2)}" cy="${f(p0[1] + (p1[1] - p0[1]) * 0.25)}" rx="4" ry="5.5" fill="${C.sky}" stroke="${C.taupe}" stroke-width=".6"/>
    ${line(p1[0] - 4, p0[1] + 34, p1[0] - 4, p0[1] + 42, { color: C.brassLo, w: 1.2 })}`;
  const plane = `<rect x="${f(e0[0])}" y="${f(e0[1])}" width="${f(e1[0] - e0[0])}" height="${f(e1[1] - e0[1])}" fill="url(#skin_jet)"/>
    ${line(e0[0], P(0, 2.12, ZE)[1], e1[0], P(0, 2.12, ZE)[1], { color: C.wine, w: 2 })}
    ${line(e0[0], P(0, 2.06, ZE)[1], e1[0], P(0, 2.06, ZE)[1], { color: C.brass, w: 0.75 })}
    ${cabin}${bellows}${doorPanel}`;
  // the ground escort, walking away, pulling your cognac roller bag, garment bag over the shoulder
  const escort = (() => {
    const z = 2.55, s = FL / z, g = P(0.42, 0, z);
    const X = (x) => f(g[0] + x * s), Y = (y) => f(g[1] - y * s);
    const sw = f(0.085 * s);
    const bag = (() => {
      const bx = 0.44, by = -0.07, w = 0.4, h = 0.56;
      return `${contact(g[0] + (bx) * s, g[1] - by * s + 2, 0.24 * s, 2.5, 0.12)}
      ${line(X(bx - 0.05), Y(by + h), X(0.3), Y(0.86), { color: C.espresso, w: 1.6 })}${line(X(bx + 0.05), Y(by + h), X(0.36), Y(0.86), { color: C.espresso, w: 1.6 })}
      ${line(X(0.29), Y(0.87), X(0.37), Y(0.87), { color: C.espresso, w: 3 })}
      <circle cx="${X(bx - w / 2 + 0.05)}" cy="${Y(by + 0.01)}" r="${f(0.045 * s)}" fill="${C.espresso}"/><circle cx="${X(bx + w / 2 - 0.05)}" cy="${Y(by + 0.01)}" r="${f(0.045 * s)}" fill="${C.espresso}"/>
      <rect x="${X(bx - w / 2)}" y="${Y(by + h)}" width="${f(w * s)}" height="${f((h - 0.03) * s)}" rx="${f(0.04 * s)}" fill="url(#cognac_jet)"/>
      <rect x="${X(bx - w / 2)}" y="${Y(by + h)}" width="${f(w * s)}" height="${f((h - 0.03) * s)}" rx="${f(0.04 * s)}" fill="${C.cognac}" filter="url(#leather_jet)"/>
      <rect x="${X(bx - w / 2 + 0.03)}" y="${Y(by + h - 0.03)}" width="${f((w - 0.06) * s)}" height="${f((h - 0.09) * s)}" rx="${f(0.025 * s)}" fill="none" stroke="${C.brassHi}" stroke-width=".75" stroke-dasharray="2.5 2"/>
      ${[-0.09, 0.09].map((dx) => `<rect x="${X(bx + dx - 0.025)}" y="${Y(by + h)}" width="${f(0.05 * s)}" height="${f((h - 0.03) * s)}" fill="${C.cognac}" stroke="${C.espresso}" stroke-opacity=".3" stroke-width=".5"/>`).join("")}
      <rect x="${X(bx - 0.05)}" y="${Y(by + h + 0.005)}" width="${f(0.1 * s)}" height="${f(0.025 * s)}" rx="2" fill="${C.brass}"/>`;
    })();
    return `${contact(g[0], g[1] + 2, 0.24 * s, 3, 0.12)}
      <path d="M${X(-0.15)} ${Y(0.92)} L${X(-0.01)} ${Y(0.92)} L${X(-0.04)} ${Y(0.07)} L${X(-0.12)} ${Y(0.07)} Z" fill="${C.slate}"/>
      <path d="M${X(-0.125)} ${Y(0.08)} L${X(-0.035)} ${Y(0.08)} L${X(-0.03)} ${Y(0)} L${X(-0.13)} ${Y(0)} Z" fill="${C.espresso}"/>
      <path d="M${X(0.01)} ${Y(0.92)} L${X(0.15)} ${Y(0.92)} L${X(0.13)} ${Y(0.06)} L${X(0.05)} ${Y(0.06)} Z" fill="${C.slate}"/>
      <path d="M${X(0.045)} ${Y(0.07)} L${X(0.135)} ${Y(0.07)} L${X(0.14)} ${Y(-0.04)} L${X(0.04)} ${Y(-0.04)} Z" fill="${C.espresso}"/>
      ${line(X(0.04), Y(-0.02), X(0.14), Y(-0.02), { color: C.taupe, w: 0.75 })}
      ${line(X(-0.08), Y(0.86), X(-0.08), Y(0.1), { color: C.slateHi, w: 0.5, o: 0.6 })}${line(X(0.09), Y(0.86), X(0.09), Y(0.1), { color: C.slateHi, w: 0.5, o: 0.6 })}
      <path d="M${X(0.19)} ${Y(1.38)} L${X(0.3)} ${Y(1.0)} L${X(0.33)} ${Y(0.9)}" fill="none" stroke="${C.slate}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${X(-0.22)} ${Y(1.44)} C${X(-0.26)} ${Y(1.43)} ${X(-0.25)} ${Y(1.36)} ${X(-0.23)} ${Y(1.3)} L${X(-0.18)} ${Y(1.05)} L${X(-0.2)} ${Y(0.74)} L${X(0.2)} ${Y(0.74)} L${X(0.18)} ${Y(1.05)} L${X(0.23)} ${Y(1.3)} C${X(0.25)} ${Y(1.36)} ${X(0.26)} ${Y(1.43)} ${X(0.22)} ${Y(1.44)} C${X(0.1)} ${Y(1.48)} ${X(-0.1)} ${Y(1.48)} ${X(-0.22)} ${Y(1.44)} Z" fill="${C.slate}"/>
      ${line(X(0), Y(1.44), X(0), Y(0.74), { color: C.slateHi, w: 0.6, o: 0.8 })}
      ${line(X(-0.19), Y(1.08), X(0.19), Y(1.08), { color: C.slateHi, w: 0.5, o: 0.5 })}
      <ellipse cx="${X(0.335)}" cy="${Y(0.88)}" rx="${f(0.035 * s)}" ry="${f(0.045 * s)}" fill="${C.champagneLo}"/>
      <rect x="${X(-0.04)}" y="${Y(1.54)}" width="${f(0.08 * s)}" height="${f(0.1 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.07)} ${Y(1.46)} C${X(-0.03)} ${Y(1.49)} ${X(0.03)} ${Y(1.49)} ${X(0.07)} ${Y(1.46)} L${X(0.06)} ${Y(1.5)} L${X(-0.06)} ${Y(1.5)} Z" fill="${C.ivory}"/>
      <ellipse cx="${X(-0.085)}" cy="${Y(1.6)}" rx="${f(0.018 * s)}" ry="${f(0.03 * s)}" fill="${C.champagneLo}"/><ellipse cx="${X(0.085)}" cy="${Y(1.6)}" rx="${f(0.018 * s)}" ry="${f(0.03 * s)}" fill="${C.champagneLo}"/>
      <ellipse cx="${X(0)}" cy="${Y(1.62)}" rx="${f(0.083 * s)}" ry="${f(0.11 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.084)} ${Y(1.6)} C${X(-0.09)} ${Y(1.75)} ${X(0.09)} ${Y(1.75)} ${X(0.084)} ${Y(1.6)} C${X(0.07)} ${Y(1.55)} ${X(-0.07)} ${Y(1.55)} ${X(-0.084)} ${Y(1.6)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.21)} ${Y(1.38)} L${X(-0.29)} ${Y(1.17)} L${X(-0.13)} ${Y(1.5)}" fill="none" stroke="${C.slate}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${X(-0.25)} ${Y(1.44)} C${X(-0.25)} ${Y(1.5)} ${X(-0.01)} ${Y(1.5)} ${X(-0.01)} ${Y(1.44)} L${X(0)} ${Y(0.72)} C${X(0)} ${Y(0.66)} ${X(-0.26)} ${Y(0.66)} ${X(-0.26)} ${Y(0.72)} Z" fill="url(#garment_jet)"/>
      <path d="M${X(-0.25)} ${Y(1.44)} C${X(-0.25)} ${Y(1.5)} ${X(-0.01)} ${Y(1.5)} ${X(-0.01)} ${Y(1.44)} L${X(0)} ${Y(0.72)} C${X(0)} ${Y(0.66)} ${X(-0.26)} ${Y(0.66)} ${X(-0.26)} ${Y(0.72)} Z" fill="none" stroke="${C.espresso}" stroke-opacity=".4" stroke-width=".6"/>
      <path d="M${X(-0.25)} ${Y(1.44)} C${X(-0.25)} ${Y(1.5)} ${X(-0.01)} ${Y(1.5)} ${X(-0.01)} ${Y(1.44)} L${X(-0.01)} ${Y(1.38)} L${X(-0.25)} ${Y(1.38)} Z" fill="${C.cognac}"/>
      <path d="M${X(-0.255)} ${Y(0.8)} L${X(-0.005)} ${Y(0.8)} L${X(0)} ${Y(0.72)} C${X(0)} ${Y(0.66)} ${X(-0.26)} ${Y(0.66)} ${X(-0.26)} ${Y(0.72)} Z" fill="${C.cognac}"/>
      ${line(X(-0.035), Y(1.38), X(-0.03), Y(0.8), { color: C.brassHi, w: 0.75, o: 0.9 })}
      ${line(X(-0.22), Y(1.06), X(-0.04), Y(1.06), { color: C.espresso, w: 0.5, o: 0.3 })}
      <path d="M${X(-0.13)} ${Y(1.48)} L${X(-0.13)} ${Y(1.56)} C${X(-0.13)} ${Y(1.62)} ${X(-0.06)} ${Y(1.62)} ${X(-0.065)} ${Y(1.56)}" fill="none" stroke="${C.brass}" stroke-width="1.3"/>
      <ellipse cx="${X(-0.135)}" cy="${Y(1.5)}" rx="${f(0.04 * s)}" ry="${f(0.035 * s)}" fill="${C.champagneLo}"/>
      ${bag}`;
  })();
  scenes["jet-bridge-escort.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="view_jet" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".3" stop-color="${C.sky}"/><stop offset="${f(V.y / H - 0.005)}" stop-color="${C.ivory}"/><stop offset="${f(V.y / H + 0.005)}" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="ceil_jet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="skin_jet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset=".45" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
    <linearGradient id="cabin_jet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="cognac_jet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
    <linearGradient id="garment_jet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.taupeLo}"/><stop offset="1" stop-color="${C.taupe}"/></linearGradient>
    <clipPath id="door_jet"><rect x="${f(d0[0])}" y="${f(d0[1])}" width="${f(dw)}" height="${f(dh)}" rx="${f(0.16 * k)}"/></clipPath>
    ${texture("carpet_jet", ".9 .35", [0.45, 0.38, 0.3], 0.2, 5, 2)}
    ${texture("leather_jet", "1.3", [0.3, 0.16, 0.08], 0.2, 4, 3)}
  </defs>
  ${tube}${plane}${step}${escort}`
  );
}

// 6. Chauffeur drop-off at departures: a slate sedan under the canopy, rear door held open, bags on a trolley.
{
  const W = 640, H = 400;
  const HZ = 207; // eye-level horizon
  // car in side elevation, facing left; metres -> px
  const cs = 76, cx0 = 128, cy0 = 330;
  const cX = (x) => f(cx0 + x * cs), cY = (y) => f(cy0 - y * cs);
  const cp = (a) => a.map(([x, y], i) => `${i ? "L" : "M"}${cX(x)} ${cY(y)}`).join(" ");
  const body = `M${cX(0.04)} ${cY(0.26)} C${cX(-0.02)} ${cY(0.4)} ${cX(-0.02)} ${cY(0.62)} ${cX(0.06)} ${cY(0.74)} L${cX(1.5)} ${cY(0.98)} C${cX(1.8)} ${cY(1.06)} ${cX(2.1)} ${cY(1.4)} ${cX(2.35)} ${cY(1.46)} L${cX(3.8)} ${cY(1.47)} C${cX(4.05)} ${cY(1.44)} ${cX(4.3)} ${cY(1.14)} ${cX(4.5)} ${cY(1.06)} L${cX(5.1)} ${cY(1.03)} C${cX(5.22)} ${cY(0.94)} ${cX(5.24)} ${cY(0.5)} ${cX(5.16)} ${cY(0.3)} L${cX(4.55)} ${cY(0.28)} A${f(0.44 * cs)} ${f(0.44 * cs)} 0 0 0 ${cX(3.67)} ${cY(0.28)} L${cX(1.39)} ${cY(0.28)} A${f(0.44 * cs)} ${f(0.44 * cs)} 0 0 0 ${cX(0.51)} ${cY(0.28)} Z`;
  const glass = `M${cX(1.66)} ${cY(1.02)} C${cX(1.9)} ${cY(1.1)} ${cX(2.15)} ${cY(1.36)} ${cX(2.4)} ${cY(1.4)} L${cX(3.76)} ${cY(1.41)} C${cX(3.98)} ${cY(1.38)} ${cX(4.18)} ${cY(1.14)} ${cX(4.32)} ${cY(1.04)} Z`;
  const wheel = (x) => `<circle cx="${cX(x)}" cy="${cY(0.36)}" r="${f(0.36 * cs)}" fill="${C.espresso}"/>
    <circle cx="${cX(x)}" cy="${cY(0.36)}" r="${f(0.24 * cs)}" fill="${C.taupe}" stroke="${C.brassHi}" stroke-width=".75"/>
    ${Array.from({ length: 10 }, (_, i) => { const a = (i * Math.PI) / 5; return line(cx0 + x * cs + Math.cos(a) * 0.06 * cs, cy0 - 0.36 * cs + Math.sin(a) * 0.06 * cs, cx0 + x * cs + Math.cos(a) * 0.22 * cs, cy0 - 0.36 * cs + Math.sin(a) * 0.22 * cs, { color: C.ivory, w: 1, o: 0.8 }); }).join("")}
    <circle cx="${cX(x)}" cy="${cY(0.36)}" r="${f(0.05 * cs)}" fill="${C.slate}" stroke="${C.brassHi}" stroke-width=".6"/>`;
  // rear door aperture (open) shows the cabin
  const ap = [[2.98, 0.32], [2.98, 1.4], [3.76, 1.41], [3.94, 1.34], [4.06, 1.16], [4.06, 0.84], [3.78, 0.62], [3.66, 0.32]];
  const car = `${contact(cx0 + 2.6 * cs, cy0 + 1, 2.6 * cs, 3, 0.14)}
    <path d="${body}" fill="url(#paint_car)"/>
    <path d="${body}" fill="none" stroke="${C.espresso}" stroke-opacity=".5" stroke-width=".75"/>
    <path d="${glass}" fill="url(#glass_car)"/>
    ${line(cx0 + 1.55 * cs, cy0 - 1.0 * cs, cx0 + 4.45 * cs, cy0 - 1.0 * cs, { color: C.brassHi, w: 1 })}
    ${line(cx0 + 0.3 * cs, cy0 - 0.74 * cs, cx0 + 5.12 * cs, cy0 - 0.8 * cs, { color: C.slateHi, w: 0.6, o: 0.7 })}
    ${line(cx0 + 1.4 * cs, cy0 - 0.34 * cs, cx0 + 3.66 * cs, cy0 - 0.34 * cs, { color: C.slateHi, w: 0.6, o: 0.6 })}
    ${line(cx0 + 1.62 * cs, cy0 - 0.32 * cs, cx0 + 1.62 * cs, cy0 - 1.02 * cs, { color: C.espresso, w: 0.75, o: 0.5 })}
    <rect x="${cX(2.86)}" y="${cY(1.42)}" width="${f(0.12 * cs)}" height="${f(0.42 * cs)}" fill="${C.espresso}" fill-opacity=".85"/>
    <rect x="${cX(2.55)}" y="${cY(0.86)}" width="${f(0.2 * cs)}" height="3" rx="1.5" fill="${C.brassHi}"/>
    <path d="${cp(ap)} Z" fill="${C.champagneLo}"/>
    <path d="M${cX(3.0)} ${cY(1.38)} L${cX(3.74)} ${cY(1.39)} C${cX(3.9)} ${cY(1.33)} ${cX(4.0)} ${cY(1.2)} ${cX(4.04)} ${cY(1.06)} L${cX(3.0)} ${cY(1.06)} Z" fill="${C.sky}" fill-opacity=".9"/>
    <path d="M${cX(3.3)} ${cY(0.62)} L${cX(3.36)} ${cY(1.14)} C${cX(3.38)} ${cY(1.2)} ${cX(3.62)} ${cY(1.22)} ${cX(3.66)} ${cY(1.14)} L${cX(3.72)} ${cY(0.62)} Z" fill="${C.cognac}"/>
    <path d="M${cX(3.0)} ${cY(0.6)} L${cX(3.72)} ${cY(0.6)} C${cX(3.78)} ${cY(0.6)} ${cX(3.8)} ${cY(0.7)} ${cX(3.74)} ${cY(0.72)} L${cX(3.0)} ${cY(0.72)} Z" fill="${C.cognacHi}"/>
    ${line(cx0 + 3.33 * cs, cy0 - 0.9 * cs, cx0 + 3.69 * cs, cy0 - 0.9 * cs, { color: C.brassHi, w: 0.6, o: 0.8 })}
    <path d="${cp(ap)} Z" fill="none" stroke="${C.espresso}" stroke-opacity=".6" stroke-width=".9"/>
    <rect x="${cX(2.98)}" y="${cY(0.36)}" width="${f(0.66 * cs)}" height="3" fill="${C.brassHi}"/>
    ${line(cx0 + 4.62 * cs, cy0 - 1.04 * cs, cx0 + 4.66 * cs, cy0 - 1.5 * cs, { color: C.espresso, w: 0.75, o: 0.6 })}<path d="M${cX(4.47)} ${cY(1.06)} L${cX(4.66)} ${cY(1.74)} C${cX(4.72)} ${cY(1.76)} ${cX(4.8)} ${cY(1.74)} ${cX(4.82)} ${cY(1.7)} L${cX(4.62)} ${cY(1.05)} Z" fill="${C.slate}" stroke="${C.espresso}" stroke-opacity=".4" stroke-width=".6"/>
    ${line(cx0 + 4.62 * cs, cy0 - 1.05 * cs, cx0 + 5.1 * cs, cy0 - 1.03 * cs, { color: C.espresso, w: 1, o: 0.6 })}
    <rect x="${cX(5.06)}" y="${cY(0.78)}" width="${f(0.12 * cs)}" height="${f(0.1 * cs)}" rx="1" fill="${C.wineHi}"/>
    <rect x="${cX(0)}" y="${cY(0.66)}" width="${f(0.12 * cs)}" height="${f(0.06 * cs)}" rx="1" fill="${C.ivory}"/>
    ${wheel(0.95)}${wheel(4.11)}`;
  // the opened rear door, swung toward us on its front hinge
  const dx0 = cx0 + 2.98 * cs, dx1 = dx0 + 0.36 * cs;
  const door = `<path d="M${f(dx0)} ${cY(1.4)} L${f(dx1)} ${cY(1.44)} L${f(dx1)} ${f(cy0 - 0.2 * cs)} L${f(dx0)} ${cY(0.32)} Z" fill="${C.slate}"/>
    <path d="M${f(dx0)} ${cY(1.4)} L${f(dx1)} ${cY(1.44)} L${f(dx1)} ${cY(1.0)} L${f(dx0)} ${cY(1.02)} Z" fill="${C.slateHi}" fill-opacity=".6"/>
    ${line(dx0, cy0 - 1.01 * cs, dx1, cy0 - 1.0 * cs, { color: C.brassHi, w: 1 })}
    <path d="M${f(dx0)} ${cY(1.4)} L${f(dx1)} ${cY(1.44)} L${f(dx1)} ${f(cy0 - 0.2 * cs)} L${f(dx0)} ${cY(0.32)} Z" fill="none" stroke="${C.espresso}" stroke-opacity=".6" stroke-width=".75"/>
    <rect x="${f(dx1)}" y="${cY(1.44)}" width="3" height="${f(1.24 * cs)}" fill="${C.cognac}"/>`;
  // a chauffeur in profile, facing the door, gloved hand on its frame
  const chauffeur = (() => {
    const gx = 440, gy = 362, s = (gy - HZ) / 1.62;
    const X = (x) => f(gx + x * s), Y = (y) => f(gy - y * s);
    const sw = f(0.085 * s);
    return `${contact(gx, gy + 1, 0.26 * s, 3, 0.12)}
      <path d="M${X(0.01)} ${Y(0.95)} L${X(0.13)} ${Y(0.95)} L${X(0.13)} ${Y(0.06)} L${X(0.03)} ${Y(0.06)} Z" fill="${C.espresso}" fill-opacity=".85"/>
      <path d="M${X(-0.11)} ${Y(0.95)} L${X(0.07)} ${Y(0.95)} L${X(-0.03)} ${Y(0.06)} L${X(-0.13)} ${Y(0.06)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.23)} ${Y(0)} L${X(-0.04)} ${Y(0)} L${X(-0.04)} ${Y(0.07)} L${X(-0.15)} ${Y(0.07)} C${X(-0.2)} ${Y(0.07)} ${X(-0.23)} ${Y(0.04)} ${X(-0.23)} ${Y(0)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.06)} ${Y(0)} L${X(0.13)} ${Y(0)} L${X(0.13)} ${Y(0.07)} L${X(0.03)} ${Y(0.07)} C${X(-0.02)} ${Y(0.07)} ${X(-0.06)} ${Y(0.04)} ${X(-0.06)} ${Y(0)} Z" fill="${C.espresso}"/>
      <path d="M${X(0.1)} ${Y(1.44)} C${X(0.15)} ${Y(1.38)} ${X(0.14)} ${Y(1.1)} ${X(0.13)} ${Y(0.72)} L${X(-0.13)} ${Y(0.72)} C${X(-0.14)} ${Y(1.0)} ${X(-0.14)} ${Y(1.25)} ${X(-0.1)} ${Y(1.4)} C${X(-0.07)} ${Y(1.46)} ${X(0.05)} ${Y(1.47)} ${X(0.1)} ${Y(1.44)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.1)} ${Y(1.42)} L${X(-0.05)} ${Y(1.42)} L${X(-0.11)} ${Y(1.2)} Z" fill="${C.ivory}"/>
      ${line(X(-0.12), Y(0.98), X(0.12), Y(0.98), { color: C.taupeLo, w: 0.5, o: 0.6 })}
      <path d="M${X(0.04)} ${Y(1.38)} L${X(0.06)} ${Y(1.08)} L${X(0.0)} ${Y(0.86)}" fill="none" stroke="${C.taupeLo}" stroke-width="${f(0.085 * s + 1.5)}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${X(0.04)} ${Y(1.38)} L${X(0.06)} ${Y(1.08)} L${X(0.0)} ${Y(0.86)}" fill="none" stroke="${C.espresso}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="${X(0.0)}" cy="${Y(0.82)}" rx="${f(0.04 * s)}" ry="${f(0.05 * s)}" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".5"/>
      <path d="M${X(-0.04)} ${Y(1.36)} L${X(-0.32)} ${Y(1.32)} L${X(-0.5)} ${Y(1.3)}" fill="none" stroke="${C.taupeLo}" stroke-width="${f(0.085 * s + 1.5)}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${X(-0.04)} ${Y(1.36)} L${X(-0.32)} ${Y(1.32)} L${X(-0.5)} ${Y(1.3)}" fill="none" stroke="${C.espresso}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${X(-0.52)} ${Y(1.34)} C${X(-0.6)} ${Y(1.34)} ${X(-0.62)} ${Y(1.27)} ${X(-0.56)} ${Y(1.25)} L${X(-0.5)} ${Y(1.26)} Z" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".5"/>
      <rect x="${X(-0.04)}" y="${Y(1.53)}" width="${f(0.08 * s)}" height="${f(0.1 * s)}" fill="${C.champagneLo}"/>
      <path d="M${X(-0.09)} ${Y(1.62)} C${X(-0.1)} ${Y(1.7)} ${X(-0.04)} ${Y(1.76)} ${X(0.02)} ${Y(1.75)} C${X(0.08)} ${Y(1.74)} ${X(0.1)} ${Y(1.68)} ${X(0.09)} ${Y(1.6)} C${X(0.08)} ${Y(1.52)} ${X(0.02)} ${Y(1.49)} ${X(-0.04)} ${Y(1.5)} C${X(-0.08)} ${Y(1.52)} ${X(-0.11)} ${Y(1.56)} ${X(-0.09)} ${Y(1.62)} Z" fill="${C.champagneLo}"/>
      <path d="M${X(0.02)} ${Y(1.72)} L${X(0.09)} ${Y(1.7)} C${X(0.1)} ${Y(1.65)} ${X(0.095)} ${Y(1.6)} ${X(0.085)} ${Y(1.57)} L${X(0.05)} ${Y(1.6)} Z" fill="${C.espresso}"/>
      <ellipse cx="${X(0.03)}" cy="${Y(1.63)}" rx="${f(0.018 * s)}" ry="${f(0.03 * s)}" fill="${C.champagne}" stroke="${C.taupe}" stroke-width=".4"/>
      <path d="M${X(-0.1)} ${Y(1.71)} L${X(0.1)} ${Y(1.71)} L${X(0.09)} ${Y(1.8)} C${X(0.04)} ${Y(1.82)} ${X(-0.06)} ${Y(1.81)} ${X(-0.08)} ${Y(1.78)} Z" fill="${C.espresso}"/>
      <path d="M${X(-0.1)} ${Y(1.71)} L${X(-0.18)} ${Y(1.69)} L${X(-0.16)} ${Y(1.72)} L${X(-0.08)} ${Y(1.73)} Z" fill="${C.espresso}"/>
      ${line(X(-0.09), Y(1.73), X(0.095), Y(1.73), { color: C.brassHi, w: 1.2 })}`;
  })();
  // luggage trolley with a cognac roller and a duffel
  const trolley = (() => {
    const gx = 560, gy = 368, s = (gy - HZ) / 1.62;
    const X = (x) => f(gx + x * s), Y = (y) => f(gy - y * s);
    return `${contact(gx, gy + 1, 0.42 * s, 2.5, 0.1)}
      ${line(X(-0.34), Y(0.08), X(0.36), Y(0.08), { color: C.brassLo, w: 2 })}
      ${line(X(0.34), Y(0.08), X(0.4), Y(1.05), { color: C.brassLo, w: 1.6 })}
      ${line(X(0.33), Y(1.05), X(0.47), Y(1.05), { color: C.brassLo, w: 2.4 })}
      <circle cx="${X(-0.28)}" cy="${Y(0.04)}" r="${f(0.04 * s)}" fill="${C.espresso}"/><circle cx="${X(0.3)}" cy="${Y(0.04)}" r="${f(0.04 * s)}" fill="${C.espresso}"/>
      <rect x="${X(-0.3)}" y="${Y(0.76)}" width="${f(0.44 * s)}" height="${f(0.66 * s)}" rx="${f(0.04 * s)}" fill="url(#cognac_car)"/>
      <rect x="${X(-0.3)}" y="${Y(0.76)}" width="${f(0.44 * s)}" height="${f(0.66 * s)}" rx="${f(0.04 * s)}" fill="${C.cognac}" filter="url(#leather_car)"/>
      <rect x="${X(-0.27)}" y="${Y(0.73)}" width="${f(0.38 * s)}" height="${f(0.6 * s)}" rx="${f(0.03 * s)}" fill="none" stroke="${C.brassHi}" stroke-width=".75" stroke-dasharray="2.5 2"/>
      ${[-0.17, 0.01].map((x) => `<rect x="${X(x)}" y="${Y(0.76)}" width="${f(0.05 * s)}" height="${f(0.66 * s)}" fill="${C.cognac}" stroke="${C.espresso}" stroke-opacity=".3" stroke-width=".5"/>`).join("")}
      <rect x="${X(-0.12)}" y="${Y(0.79)}" width="${f(0.12 * s)}" height="${f(0.03 * s)}" rx="2" fill="${C.brass}"/>
      <path d="M${X(-0.32)} ${Y(0.98)} C${X(-0.34)} ${Y(0.8)} ${X(0.2)} ${Y(0.78)} ${X(0.2)} ${Y(0.96)} C${X(0.2)} ${Y(1.04)} ${X(-0.32)} ${Y(1.08)} ${X(-0.32)} ${Y(0.98)} Z" fill="${C.cognacHi}" stroke="${C.cognac}" stroke-width=".75"/>
      <path d="M${X(-0.14)} ${Y(1.0)} C${X(-0.12)} ${Y(1.12)} ${X(0.02)} ${Y(1.12)} ${X(0.04)} ${Y(1.0)}" fill="none" stroke="${C.cognac}" stroke-width="2"/>
      ${line(X(-0.3), Y(0.93), X(0.18), Y(0.92), { color: C.brassHi, w: 0.75, o: 0.9 })}`;
  })();
  // terminal: canopy, glass façade, roadway, curb, sidewalk
  let mull = "";
  for (let x = 20; x < W; x += 62) mull += `<rect x="${x}" y="70" width="3" height="222" fill="${C.cream}" stroke="${C.taupe}" stroke-width=".5"/>`;
  const terminal = `<rect x="0" y="70" width="${W}" height="222" fill="url(#facade_car)"/>
    ${[[60, 150], [250, 120], [420, 160]].map(([x, w]) => `<path d="M${x} 292 L${x + w} 120 L${x + w + 30} 120 L${x + 30} 292 Z" fill="${C.ivory}" fill-opacity=".35"/>`).join("")}
    ${line(0, 170, W, 170, { color: C.taupe, w: 0.6, o: 0.7 })}
    ${mull}
    <rect x="0" y="288" width="${W}" height="8" fill="${C.sand}"/>${line(0, 288, W, 288, { color: C.taupeLo, w: 0.6 })}
    <rect x="0" y="296" width="${W}" height="42" fill="url(#road_car)"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 80 - 10}" y="312" width="40" height="1.5" fill="${C.ivory}" fill-opacity=".8"/>`).join("")}
    <rect x="0" y="338" width="${W}" height="${H - 338}" fill="url(#walk_car)"/>
    ${line(0, 338, W, 338, { color: C.ivory, w: 2 })}${line(0, 341, W, 341, { color: C.taupe, w: 0.75 })}
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => line(i * 90 - 20, 341, i * 90 - 60, H, { color: C.sand, w: 1 })).join("")}
    ${line(0, 372, W, 372, { color: C.sand, w: 1 })}`;
  const canopy = `<rect x="0" y="0" width="${W}" height="54" fill="url(#soffit_car)"/>
    ${Array.from({ length: 21 }, (_, i) => line(i * 32, 0, i * 32, 54, { color: C.taupe, w: 0.5, o: 0.35 })).join("")}
    <rect x="0" y="54" width="${W}" height="10" fill="${C.ivory}"/>${line(0, 54, W, 54, { color: C.brass, w: 1 })}${line(0, 64, W, 64, { color: C.brassLo, w: 1 })}
    ${[34, 606].map((x) => `<rect x="${x - 5}" y="64" width="10" height="${H - 64}" fill="url(#column_car)"/>${line(x - 5, 64, x - 5, H, { color: C.taupe, w: 0.5 })}`).join("")}
    ${line(252, 64, 252, 80, { color: C.brassLo, w: 0.75 })}${line(388, 64, 388, 80, { color: C.brassLo, w: 0.75 })}
    <rect x="236" y="80" width="168" height="20" fill="${C.slate}"/>
    ${line(236, 97, 404, 97, { color: C.brassHi, w: 0.75 })}
    <text x="320" y="93" text-anchor="middle" font-family="${SANS}" font-size="8" letter-spacing="4.5" fill="${C.ivory}">DEPARTURES · FIRST</text>`;
  scenes["chauffeur-arrival.svg"] = svg(
    W,
    H,
    `<defs>
    <linearGradient id="paint_car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".35" stop-color="${C.slate}"/><stop offset="1" stop-color="${C.slate}"/></linearGradient>
    <linearGradient id="glass_car" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.slateHi}"/></linearGradient>
    <linearGradient id="facade_car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="road_car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="walk_car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="soffit_car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.ivory}"/></linearGradient>
    <linearGradient id="column_car" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
    <linearGradient id="cognac_car" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
    ${texture("leather_car", "1.3", [0.3, 0.16, 0.08], 0.2, 4, 3)}
  </defs>
  ${terminal}${canopy}${car}${door}${chauffeur}${trolley}`
  );
}
