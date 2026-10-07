// The big scenes: seat POV, standing in the aisle, and the views out the window.
import { rng, f, C, blur, svg, stars, windowFrame, seatBack, seatDefs } from "./lib.mjs";

export const scenes = {};

// Small night view used inside the receding cabin windows.
function miniWindow(id, cx, cy, ww, wh, r) {
  let pts = "";
  for (let j = 0; j < 4; j++)
    pts += `<circle cx="${f(cx + (r() - 0.5) * ww * 0.7)}" cy="${f(cy + wh * (0.08 + r() * 0.25))}" r="${f(Math.max(0.4, ww * 0.025))}" fill="${C.amber}"/>`;
  const p = ww * 0.18;
  return `<clipPath id="${id}"><rect x="${f(cx - ww / 2)}" y="${f(cy - wh / 2)}" width="${f(ww)}" height="${f(wh)}" rx="${f(ww / 2)}"/></clipPath>
    <rect x="${f(cx - ww / 2 - p)}" y="${f(cy - wh / 2 - p)}" width="${f(ww + p * 2)}" height="${f(wh + p * 2)}" rx="${f(ww / 2 + p)}" fill="#1f2a55"/>
    <g clip-path="url(#${id})"><rect x="${f(cx - ww / 2)}" y="${f(cy - wh / 2)}" width="${f(ww)}" height="${f(wh)}" fill="url(#miniSky)"/>${pts}</g>`;
}
const miniSkyDef = `<linearGradient id="miniSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".5" stop-color="#132457"/><stop offset=".56" stop-color="#03060f"/></linearGradient>`;

// 1. From seat 32A: window on your left, seat in front, cabin beyond.
{
  const W = 800, H = 560, vx = 610, vy = 190;
  const r = rng(101);
  const screens = [C.cyan, C.led, C.amber, C.violet];
  // far rows, both blocks
  let rows = "";
  for (let i = 14; i >= 2; i--) {
    const s = Math.pow(0.8, i);
    const top = vy + 70 * s, sh = 360 * s;
    for (const [x0, x1] of [[vx - 600 * s, vx - 50 * s], [vx + 50 * s, vx + 600 * s]]) {
      const gap = 6 * s, sw = (x1 - x0 - gap * 2) / 3;
      for (let k = 0; k < 3; k++)
        rows += seatBack(x0 + k * (sw + gap), top, sw, sh, s, { head: r() > 0.4, headTilt: (r() - 0.5) * 24, screen: r() > 0.6 ? screens[Math.floor(r() * 4)] : null });
    }
  }
  // windows receding along the left wall
  let wins = "";
  for (let k = 9; k >= 1; k--) {
    const s = Math.pow(0.66, k);
    const cx = vx + (40 - vx) * s, cy = vy + (205 - vy) * s;
    wins += miniWindow(`mw${k}`, cx, cy, 70 * s, 120 * s, r);
  }
  // the near window (your window)
  const near = `<clipPath id="nearGlass"><rect x="22" y="120" width="96" height="170" rx="46"/></clipPath>
    <rect x="0" y="92" width="150" height="226" rx="70" fill="#26335f"/>
    <rect x="12" y="108" width="118" height="194" rx="58" fill="#0a0f26"/>
    <g clip-path="url(#nearGlass)">
      <rect x="22" y="120" width="96" height="170" fill="url(#nearSky)"/>
      ${stars(r, 18, 22, 120, 96, 90)}
      <ellipse cx="70" cy="232" rx="60" ry="6" fill="${C.led}" opacity=".5" filter="url(#b4)"/>
      ${Array.from({ length: 14 }, () => `<circle cx="${f(26 + r() * 90)}" cy="${f(236 + r() ** 2 * 40)}" r="${f(0.5 + r() * 0.9)}" fill="${C.amber}"/>`).join("")}
    </g>
    <circle cx="70" cy="280" r="1.6" fill="#000" stroke="${C.ledHi}" stroke-opacity=".3"/>`;
  // seat in front of you (31A) and the one beside it (31B)
  const front = `
    <path d="M140 560 L150 300 Q156 232 230 228 L500 228 Q566 232 572 300 L590 560 Z" fill="url(#frontSeat)"/>
    <path d="M160 300 Q166 240 232 236 L498 236 Q556 240 562 300" fill="none" stroke="${C.ledHi}" stroke-opacity=".35" stroke-width="2"/>
    <rect x="200" y="244" width="330" height="62" rx="18" fill="#2c3d78"/>
    <path d="M206 300 H524" stroke="#0b1330" stroke-opacity=".6" stroke-dasharray="3 4"/>
    <rect x="270" y="322" width="190" height="112" rx="8" fill="${C.cyan}" opacity=".25" filter="url(#b12)"/>
    <rect x="276" y="326" width="178" height="104" rx="6" fill="#040a1c" stroke="#24305e" stroke-width="3"/>
    <path d="M300 400 Q360 340 430 380" fill="none" stroke="${C.cyan}" stroke-width="2"/>
    ${Array.from({ length: 70 }, () => `<circle cx="${f(288 + r() * 155)}" cy="${f(340 + r() * 80)}" r="1" fill="#24407c"/>`).join("")}
    <circle cx="372" cy="361" r="3" fill="#fff"/>
    <rect x="345" y="452" width="40" height="12" rx="4" fill="#0b1229" stroke="#2c3a72"/>
    <path d="M175 520 Q365 506 560 520" stroke="#04070f" stroke-width="5" fill="none"/>
    <rect x="215" y="505" width="70" height="20" rx="2" fill="#c9d3ea" opacity=".35" transform="rotate(-3 250 515)"/>
    <path d="M600 560 L610 320 Q616 262 680 258 L800 258 L800 560 Z" fill="url(#frontSeat)" opacity=".9"/>
    <rect x="650" y="350" width="150" height="92" rx="6" fill="${C.violet}" opacity=".3" filter="url(#b12)"/>
    <rect x="655" y="354" width="150" height="84" rx="5" fill="${C.violet}" opacity=".75"/>
    <path d="M322 230 Q324 200 365 198 Q406 200 408 230 Z" fill="#04060d"/>
    <path d="M330 214 Q345 201 365 200 Q385 201 400 214" fill="none" stroke="${C.ledHi}" stroke-opacity=".4" stroke-width="1.5"/>`;
  const armrest = `<path d="M0 470 L150 440 Q165 438 168 452 L172 476 L0 520 Z" fill="#141d3e"/><path d="M0 470 L150 440" stroke="${C.ledHi}" stroke-opacity=".3" stroke-width="2"/>`;
  scenes["window-seat-pov.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1638"/><stop offset="1" stop-color="${C.black}"/></linearGradient>
      <linearGradient id="frontSeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2d5e"/><stop offset=".5" stop-color="#121b3e"/><stop offset="1" stop-color="#060a18"/></linearGradient>
      <linearGradient id="wallG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#151f45"/><stop offset="1" stop-color="#0a1128"/></linearGradient>
      <linearGradient id="nearSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".65" stop-color="#132457"/><stop offset=".7" stop-color="#03060f"/></linearGradient>
      ${miniSkyDef}${seatDefs}${blur("b4", 4)}${blur("b6", 6)}${blur("b10", 10)}${blur("b12", 12)}
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <polygon points="0,0 ${W},0 ${W},40 ${vx + 20},${vy - 32} ${vx - 20},${vy - 32} 0,24" fill="#0e1a42"/>
    <polygon points="${W},40 ${vx + 20},${vy - 32} ${vx + 20},${vy - 6} ${W},170" fill="#13204a"/>
    <polygon points="0,24 ${vx - 20},${vy - 32} ${vx - 20},${vy + 70} 0,${H}" fill="url(#wallG)"/>
    <line x1="0" y1="26" x2="${vx - 20}" y2="${vy - 31}" stroke="${C.led}" stroke-width="16" opacity=".55" filter="url(#b10)"/>
    <line x1="0" y1="26" x2="${vx - 20}" y2="${vy - 31}" stroke="${C.ledHi}" stroke-width="2.5"/>
    <line x1="${W}" y1="172" x2="${vx + 20}" y2="${vy - 5}" stroke="${C.led}" stroke-width="14" opacity=".55" filter="url(#b10)"/>
    <line x1="${W}" y1="172" x2="${vx + 20}" y2="${vy - 5}" stroke="${C.ledHi}" stroke-width="2"/>
    ${wins}
    ${rows}
    ${near}
    ${front}
    ${armrest}`
  );
}

// 2. Standing in the aisle: looking down on seat tops and heads, bins overhead.
{
  const W = 800, H = 560, vx = 400, vy = 150;
  const r = rng(102);
  const screens = [C.cyan, C.led, C.amber, C.violet];
  let rows = "", seams = "", floorLights = "", wins = "";
  for (let k = 0; k < 16; k++) {
    const s = Math.pow(0.8, k);
    for (const side of [-1, 1]) {
      const xTop = vx + side * (vx + 150) * s, yTop = vy + (0 - vy) * s - 10 * s;
      const xBot = vx + side * (vx - 60) * s, yBot = vy + (230 - vy) * s;
      seams += `<line x1="${f(xTop)}" y1="${f(yTop)}" x2="${f(xBot)}" y2="${f(yBot)}" stroke="#04060d" stroke-opacity=".6" stroke-width="${f(Math.max(0.4, 1.5 * s))}"/>`;
      floorLights += `<circle cx="${f(vx + side * 70 * s)}" cy="${f(vy + 420 * s)}" r="${f(Math.max(0.5, 3.5 * s))}" fill="${C.cyan}"/>`;
    }
  }
  for (let k = 8; k >= 1; k--) {
    const s = Math.pow(0.7, k);
    for (const side of [-1, 1]) wins += miniWindow(`aw${k}${side}`, vx + side * 420 * s, vy + 110 * s, 34 * s, 56 * s, r);
  }
  for (let i = 15; i >= 0; i--) {
    const s = Math.pow(0.82, i);
    const top = vy + 100 * s, bottom = vy + 430 * s;
    for (const [x0, x1] of [[vx - 560 * s, vx - 62 * s], [vx + 62 * s, vx + 560 * s]]) {
      const gap = 6 * s, sw = (x1 - x0 - gap * 2) / 3;
      for (let k = 0; k < 3; k++)
        rows += seatBack(x0 + k * (sw + gap), top, sw, bottom - top, s, {
          head: r() > 0.35,
          headTilt: (r() - 0.5) * 26,
          topFace: 16 * s,
          screen: r() > 0.62 ? screens[Math.floor(r() * 4)] : null,
        });
    }
  }
  scenes["aisle-standing.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1840"/><stop offset="1" stop-color="${C.black}"/></linearGradient>
      <linearGradient id="cove" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16245a"/><stop offset="1" stop-color="#0a1230"/></linearGradient>
      <linearGradient id="bins2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1838"/><stop offset="1" stop-color="#0a1230"/></linearGradient>
      <linearGradient id="night2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".5" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
      <linearGradient id="carpet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1129"/><stop offset="1" stop-color="#141e44"/></linearGradient>
      <pattern id="carpetP" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="none"/><path d="M0 8 L8 0 M8 16 L16 8" stroke="#2a3a78" stroke-opacity=".5"/></pattern>
      ${miniSkyDef}${seatDefs}${blur("b6", 6)}${blur("b10", 10)}${blur("b3", 3)}
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg2)"/>
    <polygon points="230,0 570,0 ${vx + 34},${vy - 22} ${vx - 34},${vy - 22}" fill="url(#cove)"/>
    <polygon points="0,0 230,0 ${vx - 34},${vy - 22} ${vx - 54},${vy + 4} 0,240" fill="url(#bins2)"/>
    <polygon points="${W},0 570,0 ${vx + 34},${vy - 22} ${vx + 54},${vy + 4} ${W},240" fill="url(#bins2)"/>
    ${seams}
    <line x1="230" y1="0" x2="${vx - 34}" y2="${vy - 22}" stroke="${C.led}" stroke-width="14" opacity=".6" filter="url(#b10)"/>
    <line x1="570" y1="0" x2="${vx + 34}" y2="${vy - 22}" stroke="${C.led}" stroke-width="14" opacity=".6" filter="url(#b10)"/>
    <line x1="230" y1="0" x2="${vx - 34}" y2="${vy - 22}" stroke="${C.ledHi}" stroke-width="2.5"/>
    <line x1="570" y1="0" x2="${vx + 34}" y2="${vy - 22}" stroke="${C.ledHi}" stroke-width="2.5"/>
    <polygon points="0,240 ${vx - 54},${vy + 4} ${vx - 54},${vy + 60} 0,420" fill="#0d1532"/>
    <polygon points="${W},240 ${vx + 54},${vy + 4} ${vx + 54},${vy + 60} ${W},420" fill="#0d1532"/>
    <line x1="0" y1="242" x2="${vx - 54}" y2="${vy + 5}" stroke="${C.led}" stroke-width="10" opacity=".45" filter="url(#b6)"/>
    <line x1="${W}" y1="242" x2="${vx + 54}" y2="${vy + 5}" stroke="${C.led}" stroke-width="10" opacity=".45" filter="url(#b6)"/>
    ${wins}
    <polygon points="${vx - 8},${vy + 20} ${vx + 8},${vy + 20} 520,${H} 280,${H}" fill="url(#carpet)"/>
    <polygon points="${vx - 8},${vy + 20} ${vx + 8},${vy + 20} 520,${H} 280,${H}" fill="url(#carpetP)"/>
    <g filter="url(#b3)">${floorLights}</g>${floorLights}
    ${rows}
    <rect width="${W}" height="${H}" fill="url(#night2)"/>`
  );
}

// 3. Wingtip through the window: winglet lit red by the nav light, cloud deck below.
{
  const r = rng(103);
  const view = `
    <rect width="500" height="620" fill="url(#sky3)"/>
    ${stars(r, 60, 100, 90, 300, 260)}
    <rect y="360" width="500" height="260" fill="#0b1636"/>
    <rect y="360" width="500" height="260" filter="url(#clouds3)" opacity=".9"/>
    <rect y="350" width="500" height="40" fill="url(#haze3)"/>
    <polygon points="20,470 332,372 356,378 230,620 20,620" fill="url(#wingTop)"/>
    <path d="M20 470 L332 372" stroke="#8ea2d8" stroke-opacity=".6" stroke-width="2.5"/>
    <path d="M60 500 L336 386 M90 560 L330 420 M150 610 L320 470" stroke="#000" stroke-opacity=".3"/>
    <path d="M200 620 L344 390" stroke="#2a3a6e" stroke-width="1.5"/>
    <path d="M326 376 Q332 330 344 268 L366 264 Q358 320 358 380 Z" fill="url(#winglet)"/>
    <path d="M344 268 L366 264" stroke="#8ea2d8" stroke-opacity=".5" stroke-width="2"/>
    <circle cx="346" cy="368" r="34" fill="#ff3348" opacity=".35" filter="url(#b14)"/>
    <circle cx="346" cy="368" r="10" fill="#ff4d5e" opacity=".8" filter="url(#b4)"/>
    <circle cx="346" cy="368" r="2.6" fill="#ffe0e4"/>
    <circle cx="356" cy="268" r="16" fill="#fff" opacity=".35" filter="url(#b6)"/>`;
  scenes["wingtip.svg"] = svg(
    500,
    620,
    `<defs>
      <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#01030a"/><stop offset=".55" stop-color="#0d1d4a"/><stop offset=".6" stop-color="#1b2d66"/></linearGradient>
      <linearGradient id="haze3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.led}" stop-opacity="0"/><stop offset=".4" stop-color="${C.led}" stop-opacity=".35"/><stop offset="1" stop-color="${C.led}" stop-opacity="0"/></linearGradient>
      <linearGradient id="wingTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#202c55"/><stop offset="1" stop-color="#05080f"/></linearGradient>
      <linearGradient id="winglet" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7a2a3e"/><stop offset=".5" stop-color="#1a2246"/><stop offset="1" stop-color="#0a1024"/></linearGradient>
      <filter id="clouds3" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".008 .045" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .38  0 0 0 0 .47  0 0 0 0 .75  1.9 0 0 0 -.8"/></filter>
      ${blur("b4", 4)}${blur("b6", 6)}${blur("b14", 14)}
    </defs>` + windowFrame(500, 620, view, { ww: 300, wh: 430, cy: 310 })
  );
}

// 4. Straight down on a city at night: a street grid in perspective, a dark river.
{
  const W = 640, H = 460;
  const r = rng(104);
  const hy = 70;
  const proj = (X, Z) => [320 + (X * 300) / Z, hy + 520 / Z];
  const ang = 0.42, ca = Math.cos(ang), sa = Math.sin(ang);
  const river = (Z) => Math.sin(Z * 0.35) * 1.6 + 0.8;
  const centers = [[0.5, 3], [-2.5, 6], [3, 9], [-1, 14], [5, 20]];
  let lights = "", bright = "";
  for (let a = -40; a <= 40; a++) {
    for (const dir of [0, 1]) {
      const major = a % 5 === 0;
      for (let t = -12; t < 40; t += major ? 0.07 : 0.12) {
        const u = a * 0.45, v = t;
        let X = dir ? u * ca - v * sa : v * ca - u * sa;
        let Z = dir ? u * sa + v * ca : v * sa + u * ca;
        X += (r() - 0.5) * 0.04;
        if (Z < 1.12 || Z > 42 || Math.abs(X) > Z * 1.3) continue;
        if (Math.abs(X - river(Z)) < 0.35) continue;
        const dens = centers.reduce((m, [cx, cz]) => Math.max(m, Math.exp(-((X - cx) ** 2 + (Z - cz) ** 2 / 4) / 6)), 0);
        if (r() > dens * (major ? 1.6 : 0.9) + 0.05) continue;
        const [sx, sy] = proj(X, Z);
        const rad = Math.max(0.35, 1.5 / Math.pow(Z, 0.55)) * (major ? 1.25 : 1);
        const c = r() < 0.12 ? "#e8f0ff" : r() < 0.03 ? "#9fffc8" : major ? "#ffd08a" : "#ffb35c";
        const dot = `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(rad)}" fill="${c}" opacity="${f(0.55 + r() * 0.45)}"/>`;
        lights += dot;
        if (major) bright += dot;
      }
    }
  }
  scenes["city-below.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050d"/><stop offset=".13" stop-color="#132a63"/><stop offset=".17" stop-color="#050812"/><stop offset="1" stop-color="#020306"/></linearGradient>
      <linearGradient id="bez4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3766"/><stop offset="1" stop-color="#0e1430"/></linearGradient>
      ${blur("b1", 1.3)}${blur("b5", 5)}
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky4)"/>
    ${stars(r, 30, 60, 0, 520, 55)}
    <g filter="url(#b5)" opacity=".8">${bright}</g>
    <g filter="url(#b1)">${lights}</g>${lights}
    <path fill-rule="evenodd" fill="url(#bez4)" d="M-10 -10 H${W + 10} V${H + 10} H-10 Z M40 -60 H600 Q720 -60 720 120 V420 Q720 560 560 560 H80 Q-80 560 -80 420 V120 Q-80 -60 40 -60 Z"/>`,
    { vignette: 0.4 }
  );
}

// 5. A wide sea of moonlit cloud.
{
  const r = rng(105);
  scenes["moon-clouds.svg"] = svg(
    760,
    420,
    `<defs>
      <linearGradient id="sky5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".5" stop-color="#0f1f4f"/><stop offset=".6" stop-color="#26397a"/></linearGradient>
      <radialGradient id="halo"><stop offset="0" stop-color="#dfe8ff" stop-opacity=".55"/><stop offset=".3" stop-color="#9cb4f0" stop-opacity=".18"/><stop offset="1" stop-color="#9cb4f0" stop-opacity="0"/></radialGradient>
      <radialGradient id="moonpath" cx=".7" cy=".1" r=".6"><stop offset="0" stop-color="#c9d7ff" stop-opacity=".45"/><stop offset="1" stop-color="#c9d7ff" stop-opacity="0"/></radialGradient>
      <linearGradient id="fade5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".15"/><stop offset=".25" stop-color="#fff" stop-opacity="1"/></linearGradient>
      <mask id="m5"><rect y="220" width="760" height="200" fill="url(#fade5)"/></mask>
      <filter id="cl5" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".005 .03" numOctaves="5" seed="11"/><feColorMatrix values="0 0 0 0 .42  0 0 0 0 .52  0 0 0 0 .82  2.2 0 0 0 -.85"/></filter>
      <filter id="cl5b" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .26  0 0 0 0 .5  2 0 0 0 -.9"/></filter>
    </defs>
    <rect width="760" height="420" fill="url(#sky5)"/>
    ${stars(r, 90, 0, 0, 760, 200)}
    <circle cx="560" cy="88" r="140" fill="url(#halo)"/>
    <circle cx="560" cy="88" r="22" fill="#f1f5ff"/>
    <circle cx="553" cy="83" r="5" fill="#d7e0f5"/><circle cx="566" cy="95" r="3.5" fill="#d7e0f5"/>
    <g mask="url(#m5)">
      <rect y="220" width="760" height="200" fill="#0d1836"/>
      <rect y="220" width="760" height="200" filter="url(#cl5)"/>
      <rect y="220" width="760" height="200" filter="url(#cl5b)"/>
      <rect y="220" width="760" height="200" fill="url(#moonpath)"/>
    </g>`
  );
}

// 6. The engine under the wing, catching moonlight; town lights on the horizon.
{
  const r = rng(106);
  let blades = "";
  for (let a = 0; a < 360; a += 15) blades += `<line x1="190" y1="370" x2="${f(190 + Math.cos((a * Math.PI) / 180) * 38)}" y2="${f(370 + Math.sin((a * Math.PI) / 180) * 54)}" stroke="#1d2a55" stroke-width="2"/>`;
  const view = `
    <rect width="500" height="620" fill="url(#sky6)"/>
    ${stars(r, 30, 100, 260, 300, 130)}
    <rect y="470" width="500" height="150" fill="#03050c"/>
    ${Array.from({ length: 60 }, () => `<circle cx="${f(100 + r() * 300)}" cy="${f(474 + r() ** 2 * 60)}" r="${f(0.4 + r() * 0.8)}" fill="${C.amber}" opacity="${f(0.4 + r() * 0.6)}"/>`).join("")}
    <polygon points="0,90 500,40 500,230 0,270" fill="url(#wingUnder)"/>
    <path d="M0 270 L500 230" stroke="#3a4c86" stroke-opacity=".5" stroke-width="2"/>
    <path d="M60 266 l10 30 l14 -2 l-6 -30 M380 238 l10 30 l14 -2 l-6 -30" fill="#0a1024"/>
    <polygon points="240,252 330,246 352,318 236,322" fill="#0a1128"/>
    <path d="M190 292 C260 286 340 292 390 318 L392 410 C340 438 260 446 190 448 Z" fill="url(#nacelle)"/>
    <path d="M200 296 C260 290 330 296 380 318" fill="none" stroke="#b9c9f2" stroke-opacity=".55" stroke-width="3"/>
    <path d="M390 318 L430 352 L392 410 Z" fill="#0a1024"/>
    <ellipse cx="190" cy="370" rx="44" ry="78" fill="#03060f"/>
    ${blades}
    <circle cx="190" cy="370" r="7" fill="#2a3666"/>
    <ellipse cx="190" cy="370" rx="44" ry="78" fill="none" stroke="url(#lip)" stroke-width="10"/>
    <ellipse cx="300" cy="452" rx="70" ry="16" fill="#ff3348" opacity=".3" filter="url(#b10)"/>`;
  scenes["engine.svg"] = svg(
    500,
    620,
    `<defs>
      <linearGradient id="sky6" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#02040c"/><stop offset=".75" stop-color="#132457"/><stop offset=".76" stop-color="#03050c"/></linearGradient>
      <linearGradient id="wingUnder" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070f"/><stop offset="1" stop-color="#141d40"/></linearGradient>
      <linearGradient id="nacelle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43579a"/><stop offset=".35" stop-color="#1c2856"/><stop offset=".85" stop-color="#0a0f22"/><stop offset="1" stop-color="#3a1424"/></linearGradient>
      <linearGradient id="lip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8d6fa"/><stop offset=".4" stop-color="#4a5c99"/><stop offset="1" stop-color="#151d3d"/></linearGradient>
      ${blur("b10", 10)}
    </defs>` + windowFrame(500, 620, view, { ww: 300, wh: 430, cy: 310 })
  );
}
