// Before takeoff: the departures board, the gate window, the jet bridge.
import { rng, f, C, blur, svg, stars, windowFrame } from "./lib.mjs";

export const scenes = {};

// 24. Split-flap departures board, red-eyes only; ours is boarding.
{
  const rows = [
    ["23:55", "NH011", "TOKYO NARITA", "B12", "BOARDING"],
    ["00:10", "BA296", "LONDON LHR", "C18", "ON TIME"],
    ["00:40", "EK236", "DUBAI", "M14", "ON TIME"],
    ["01:15", "QR726", "DOHA", "M11", "DELAYED"],
    ["01:30", "LH431", "FRANKFURT", "C22", "ON TIME"],
  ];
  const cols = [[30, 5], [112, 5], [194, 13], [400, 3], [456, 8]];
  const cw = 13, ch = 26;
  let tiles = "";
  rows.forEach((row, ri) => {
    const y = 96 + ri * 44;
    row.forEach((text, ci) => {
      const [x0, n] = cols[ci];
      const boarding = ci === 4 && text === "BOARDING";
      for (let k = 0; k < n; k++) {
        const x = x0 + k * (cw + 2), ch_ = text[k] ?? " ";
        tiles += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="2" fill="#0d0f16"/><rect x="${x}" y="${y}" width="${cw}" height="${ch / 2}" rx="2" fill="#151824"/><line x1="${x}" y1="${y + ch / 2}" x2="${x + cw}" y2="${y + ch / 2}" stroke="#000" stroke-width="1.2"/>`;
        if (ch_ !== " ")
          tiles += `<text x="${x + cw / 2}" y="${y + 19}" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="${boarding ? C.cyan : ci === 4 && text === "DELAYED" ? "#ff9a5a" : C.amber}">${ch_ === "&" ? "&amp;" : ch_}</text>`;
      }
      if (boarding) tiles += `<rect x="${x0 - 4}" y="${y - 4}" width="${n * (cw + 2) + 6}" height="${ch + 8}" rx="4" fill="${C.cyan}" opacity=".18" filter="url(#b6)"/>`;
    });
    if (ri === 0) tiles += `<rect x="20" y="${y - 6}" width="560" height="${ch + 12}" rx="4" fill="none" stroke="${C.cyan}" stroke-opacity=".35"/>`;
  });
  scenes["departures-board.svg"] = svg(
    600,
    360,
    `<defs>
      <linearGradient id="frame24" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f2c"/><stop offset="1" stop-color="#07080d"/></linearGradient>
      ${blur("b6", 6)}${blur("b14", 14)}
    </defs>
    <rect width="600" height="360" fill="#04050a"/>
    <rect x="8" y="14" width="584" height="332" rx="10" fill="url(#frame24)" stroke="#2a2f40"/>
    <g font-family="ui-monospace, Menlo, monospace" letter-spacing="3">
      <text x="30" y="52" font-size="20" font-weight="700" fill="${C.amber}" opacity=".9">DEPARTURES</text>
      <text x="570" y="52" text-anchor="end" font-size="12" fill="${C.muted}">23:41 LOCAL</text>
      ${["TIME", "FLIGHT", "DESTINATION", "GATE", "STATUS"].map((h, i) => `<text x="${cols[i][0]}" y="84" font-size="9" fill="${C.muted}">${h}</text>`).join("")}
    </g>
    ${tiles}
    <rect x="8" y="14" width="584" height="160" rx="10" fill="#fff" opacity=".025"/>`
  );
}

// 25. Your plane at the gate through the terminal window: floodlit tail,
//     lit cabin windows, jet bridge at the front door, ground crew below.
{
  const r = rng(25);
  const hy = 150; // horizon behind the apron
  let cabinWins = "";
  for (let x = 160; x < 500; x += 8.5) if (x < 196 || x > 212) cabinWins += `<rect x="${f(x)}" y="183" width="3.6" height="5.5" rx="1.6" fill="${C.amber}" opacity="${f(0.6 + r() * 0.4)}"/>`;
  let horizon = "";
  for (let x = 0; x < 640; x += 9) horizon += `<circle cx="${f(x + r() * 5)}" cy="${f(hy + r() * 3)}" r="${f(0.6 + r() * 0.7)}" fill="${r() > 0.6 ? "#9cc4ff" : C.amber}" opacity=".85"/>`;
  const outside = `
    <rect width="640" height="300" fill="url(#sky25)"/>
    ${stars(r, 40, 0, 0, 640, 110)}
    <rect y="${hy}" width="640" height="150" fill="url(#apron25)"/>
    <g filter="url(#b2)">${horizon}</g>${horizon}
    <path d="M0 270 Q320 252 640 266" stroke="#d6b04a" stroke-opacity=".5" stroke-width="2.5" fill="none"/>
    <ellipse cx="260" cy="${hy + 8}" rx="140" ry="40" fill="${C.amber}" opacity=".12" filter="url(#b14)"/>
    <rect x="96" y="40" width="3" height="${hy - 40}" fill="#0a0f22"/>
    <circle cx="97" cy="40" r="22" fill="${C.amber}" opacity=".45" filter="url(#b10)"/><rect x="88" y="36" width="18" height="6" fill="${C.amberHi}"/>
    <ellipse cx="320" cy="244" rx="270" ry="10" fill="#000" opacity=".55" filter="url(#b6)"/>
    <!-- tail -->
    <path d="M88 176 L46 92 Q48 86 58 86 L80 86 L150 175 Z" fill="url(#fin25)"/>
    <path d="M60 86 L80 86 L150 175" stroke="#dfe6f6" stroke-opacity=".4" fill="none"/>
    <ellipse cx="78" cy="128" rx="40" ry="44" fill="#fff" opacity=".18" filter="url(#b10)"/>
    <circle cx="80" cy="130" r="11" fill="none" stroke="${C.led}" stroke-width="4"/><circle cx="80" cy="130" r="3.5" fill="${C.led}"/>
    <path d="M70 190 L24 200 L32 204 L112 196 Z" fill="#7b86aa"/>
    <!-- fuselage -->
    <path d="M60 182 Q72 172 130 172 L520 172 Q566 172 588 190 Q580 210 542 214 L160 214 Q104 212 60 182 Z" fill="url(#body25)"/>
    <path d="M130 196 L560 196" stroke="${C.led}" stroke-width="2.5" opacity=".8"/>
    <path d="M130 173 L520 173 Q560 173 580 186" stroke="#fff" stroke-opacity=".55" stroke-width="1.5" fill="none"/>
    ${cabinWins}
    <path d="M556 182 L574 185 L572 190 L554 189 Z" fill="#0b1229"/>
    <rect x="198" y="177" width="12" height="22" rx="3" fill="none" stroke="#5d6788" stroke-width="1.2"/>
    <rect x="490" y="176" width="13" height="24" rx="3" fill="${C.amberHi}"/>
    <circle cx="300" cy="214" r="3" fill="#ff4d5e"/><circle cx="300" cy="214" r="12" fill="#ff4d5e" opacity=".45" filter="url(#b6)"/>
    <!-- near wing + engine -->
    <path d="M250 208 L360 208 L238 252 L196 252 Z" fill="url(#wing25)"/>
    <path d="M196 252 L238 252" stroke="#c8d2ee" stroke-opacity=".5"/>
    <rect x="248" y="222" width="76" height="24" rx="12" fill="url(#eng25)"/>
    <ellipse cx="324" cy="234" rx="5" ry="12" fill="#1c2546" stroke="#c8d2ee" stroke-width="2"/>
    <!-- gear -->
    <path d="M552 214 V236 M300 214 V236 M284 214 V236" stroke="#2a3150" stroke-width="3"/>
    <circle cx="552" cy="238" r="5" fill="#05070f"/><circle cx="300" cy="238" r="6" fill="#05070f"/><circle cx="284" cy="238" r="6" fill="#05070f"/>
    <!-- jet bridge to the front door -->
    <polygon points="503,174 640,160 640,214 503,206" fill="url(#bridge25)"/>
    <polygon points="503,174 640,160 640,166 503,180" fill="#8e98b8"/>
    ${[0, 1, 2].map((i) => `<rect x="${528 + i * 36}" y="${182 - i * 1.5}" width="22" height="9" rx="1" fill="${C.amberHi}" opacity=".7"/>`).join("")}
    <rect x="600" y="210" width="10" height="34" fill="#1c2340"/>
    <!-- ground crew: belt loader + tug, amber beacons -->
    <polygon points="150,246 186,214 194,218 166,248" fill="#2a3150"/><rect x="138" y="238" width="44" height="10" rx="2" fill="#3a4266"/>
    <circle cx="146" cy="234" r="2.5" fill="${C.amber}"/><circle cx="146" cy="234" r="9" fill="${C.amber}" opacity=".5" filter="url(#b4)"/>
    <rect x="400" y="238" width="36" height="14" rx="3" fill="#3a4266"/><rect x="408" y="230" width="16" height="9" rx="2" fill="#2a3150"/>
    <circle cx="416" cy="227" r="2.5" fill="${C.amber}"/><circle cx="416" cy="227" r="9" fill="${C.amber}" opacity=".5" filter="url(#b4)"/>`;
  let mullions = "";
  for (let x = 0; x <= 640; x += 160) mullions += `<rect x="${x - 4}" y="0" width="8" height="300" fill="#0a0d18"/>`;
  let chairs = "";
  for (let i = 0; i < 6; i++) {
    const x = 34 + i * 100;
    chairs += `<rect x="${x}" y="336" width="86" height="60" rx="12" fill="#070a14"/><rect x="${x + 4}" y="338" width="78" height="3" rx="1" fill="${C.ledHi}" opacity=".25"/>`;
  }
  scenes["gate-window.svg"] = svg(
    640,
    420,
    `<defs>
      <linearGradient id="sky25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".5" stop-color="#132457"/></linearGradient>
      <linearGradient id="apron25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset="1" stop-color="#1a1e2e"/></linearGradient>
      <linearGradient id="body25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf7"/><stop offset=".45" stop-color="#bcc6e0"/><stop offset=".7" stop-color="#6f7a9e"/><stop offset="1" stop-color="#2c3452"/></linearGradient>
      <linearGradient id="fin25" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f2c66"/><stop offset="1" stop-color="#2d3f86"/></linearGradient>
      <linearGradient id="wing25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6488"/><stop offset="1" stop-color="#a9b4d2"/></linearGradient>
      <linearGradient id="eng25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9e0f2"/><stop offset=".6" stop-color="#7c87ab"/><stop offset="1" stop-color="#3a4466"/></linearGradient>
      <linearGradient id="bridge25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c769a"/><stop offset="1" stop-color="#3a4266"/></linearGradient>
      <linearGradient id="floor25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101a3c"/><stop offset="1" stop-color="#05070f"/></linearGradient>
      <linearGradient id="refl25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <mask id="reflMask"><rect y="300" width="640" height="120" fill="url(#refl25)"/></mask>
      ${blur("b2", 2)}${blur("b4", 4)}${blur("b6", 6)}${blur("b10", 10)}${blur("b14", 14)}
    </defs>
    ${outside}
    ${mullions}
    <rect y="0" width="640" height="10" fill="#0a0d18"/>
    <rect y="290" width="640" height="12" fill="#0a0d18"/>
    <rect y="302" width="640" height="118" fill="url(#floor25)"/>
    <g mask="url(#reflMask)" transform="translate(0 604) scale(1 -1)">${outside}</g>
    ${chairs}`
  );
}

// 26. Down the jet bridge: bright fluorescent tunnel, night only through its windows.
{
  const W = 600, H = 440, vx = 300, vy = 200;
  const r = rng(26);
  let ribs = "", lights = "", pools = "", wins = "";
  const box = (s) => [vx - 300 * s, vy - 200 * s, vx + 300 * s, vy + 240 * s];
  for (let k = 0; k < 9; k++) {
    const s = Math.pow(0.78, k);
    if (s < 0.26) break;
    const [x0, y0, x1, y1] = box(s);
    ribs += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(x1 - x0)}" height="${f(y1 - y0)}" rx="${f(18 * s)}" fill="none" stroke="#2a3048" stroke-opacity=".8" stroke-width="${f(9 * s)}"/>`;
    ribs += `<rect x="${f(x0 + 4 * s)}" y="${f(y0 + 4 * s)}" width="${f(x1 - x0 - 8 * s)}" height="${f(y1 - y0 - 8 * s)}" rx="${f(16 * s)}" fill="none" stroke="#a9b2cc" stroke-opacity=".5" stroke-width="${f(1.5 * s)}"/>`;
    const s2 = s * 0.89;
    const ly = (q) => vy - 200 * q + 4 * q;
    lights += `<polygon points="${f(vx - 55 * s)},${f(ly(s))} ${f(vx + 55 * s)},${f(ly(s))} ${f(vx + 55 * s2)},${f(ly(s2))} ${f(vx - 55 * s2)},${f(ly(s2))}" fill="#f4f7ff"/>`;
    lights += `<ellipse cx="${vx}" cy="${f((ly(s) + ly(s2)) / 2)}" rx="${f(110 * s)}" ry="${f(26 * s)}" fill="#e8eeff" opacity=".35" filter="url(#b10)"/>`;
    pools += `<ellipse cx="${vx}" cy="${f(vy + 238 * s)}" rx="${f(150 * s)}" ry="${f(22 * s)}" fill="#e8eeff" opacity=".12" filter="url(#b10)"/>`;
    const [wx0] = box(s), [wx1] = box(s2);
    const wy0 = vy - 80 * s, wy1 = vy + 30 * s, wy0b = vy - 80 * s2, wy1b = vy + 30 * s2;
    wins += `<polygon points="${f(wx0 + 8 * s)},${f(wy0)} ${f(wx1 + 8 * s2)},${f(wy0b)} ${f(wx1 + 8 * s2)},${f(wy1b)} ${f(wx0 + 8 * s)},${f(wy1)}" fill="url(#night26)" stroke="#8c94ae" stroke-width="${f(2 * s)}"/>`;
    wins += `<circle cx="${f((wx0 + wx1) / 2 + 8 * s)}" cy="${f((wy1 + wy1b) / 2 - 12 * s)}" r="${f(Math.max(0.6, 2 * s))}" fill="${C.amber}"/>`;
    if (r() > 0.5) wins += `<circle cx="${f((wx0 + wx1) / 2 + 2 * s)}" cy="${f((wy1 + wy1b) / 2 - 22 * s)}" r="${f(Math.max(0.5, 1.4 * s))}" fill="#9cc4ff"/>`;
  }
  const s = 0.28;
  const [dx0, dy0, dx1, dy1] = box(s);
  scenes["jet-bridge.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="wallL26" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a83a3"/><stop offset="1" stop-color="#4c5576"/></linearGradient>
      <linearGradient id="wallR26" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#7a83a3"/><stop offset="1" stop-color="#4c5576"/></linearGradient>
      <linearGradient id="ceil26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa3c0"/><stop offset="1" stop-color="#626b8c"/></linearGradient>
      <linearGradient id="floor26" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2a2f44"/><stop offset="1" stop-color="#4a4658"/></linearGradient>
      <linearGradient id="night26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset="1" stop-color="#132457"/></linearGradient>
      <radialGradient id="door26" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fff4dc"/><stop offset=".6" stop-color="${C.amber}"/><stop offset="1" stop-color="#c78a3c"/></radialGradient>
      <linearGradient id="spill26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".5"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></linearGradient>
      ${blur("b10", 10)}${blur("b16", 16)}
    </defs>
    <polygon points="0,0 ${W},0 ${f(dx1)},${f(dy0)} ${f(dx0)},${f(dy0)}" fill="url(#ceil26)"/>
    <polygon points="0,0 ${f(dx0)},${f(dy0)} ${f(dx0)},${f(dy1)} 0,${H}" fill="url(#wallL26)"/>
    <polygon points="${W},0 ${f(dx1)},${f(dy0)} ${f(dx1)},${f(dy1)} ${W},${H}" fill="url(#wallR26)"/>
    <polygon points="0,${H} ${f(dx0)},${f(dy1)} ${f(dx1)},${f(dy1)} ${W},${H}" fill="url(#floor26)"/>
    ${pools}
    ${wins}
    <rect x="${f(dx0)}" y="${f(dy0)}" width="${f(dx1 - dx0)}" height="${f(dy1 - dy0)}" fill="#c3cadc"/>
    <rect x="${f(vx - 34)}" y="${f(dy0 + 12)}" width="68" height="${f(dy1 - dy0 - 14)}" rx="20" fill="url(#door26)"/>
    <rect x="${f(vx - 34)}" y="${f(dy0 + 12)}" width="68" height="${f(dy1 - dy0 - 14)}" rx="20" fill="none" stroke="#7a8098" stroke-width="3"/>
    <rect x="${f(vx - 22)}" y="${f(dy0 + 40)}" width="20" height="40" rx="5" fill="#2a3a72" opacity=".75"/>
    <rect x="${f(vx - 30)}" y="${f(dy0 + 16)}" width="60" height="3" fill="${C.led}" opacity=".7"/>
    <rect x="${f(vx - 60)}" y="${f(dy0 - 10)}" width="120" height="${f(dy1 - dy0 + 20)}" fill="${C.amber}" opacity=".2" filter="url(#b16)"/>
    <polygon points="${f(vx - 34)},${f(dy1)} ${f(vx + 34)},${f(dy1)} ${f(vx + 140)},${H} ${f(vx - 140)},${H}" fill="url(#spill26)"/>
    ${lights}
    ${ribs}`,
    { vignette: 0.45 }
  );
}

// 27. Takeoff roll at night: runway lights streaking past the window.
{
  const r = rng(27);
  let streaks = "";
  // rows of lights at increasing distance; nearer rows stream longer and faster
  const rowsY = [[470, 1], [430, 0.6], [400, 0.38], [382, 0.24], [372, 0.15]];
  for (const [y, s] of rowsY) {
    for (let x = -60; x < 560; x += 70 * s + r() * 30 * s + 6) {
      const len = 160 * s + 10, c = y > 420 ? "#e8f0ff" : r() > 0.5 ? "#9cc4ff" : C.amber;
      streaks += `<rect x="${f(x)}" y="${f(y + (r() - 0.5) * 2)}" width="${f(len)}" height="${f(Math.max(0.8, 3 * s))}" rx="2" fill="url(#streak${c === "#e8f0ff" ? "W" : c === C.amber ? "A" : "B"})"/>`;
    }
  }
  let green = "";
  for (let x = -20; x < 560; x += 46) green += `<rect x="${x}" y="452" width="34" height="2.5" rx="1" fill="url(#streakG)"/>`;
  const view = `
    <rect width="500" height="620" fill="url(#sky27)"/>
    ${stars(r, 30, 100, 100, 300, 160)}
    <rect y="366" width="500" height="260" fill="#04060d"/>
    <ellipse cx="300" cy="364" rx="260" ry="12" fill="${C.amber}" opacity=".18" filter="url(#b10)"/>
    ${Array.from({ length: 50 }, () => `<circle cx="${f(r() * 500)}" cy="${f(360 + r() * 6)}" r="${f(0.5 + r() * 0.8)}" fill="${C.amber}" opacity="${f(0.4 + r() * 0.5)}"/>`).join("")}
    <g filter="url(#mblur)" opacity=".8">${streaks}${green}</g>${streaks}${green}
    <polygon points="0,560 500,520 500,620 0,620" fill="#070b18"/>
    <path d="M0 560 L500 520" stroke="#3a4c86" stroke-opacity=".6" stroke-width="2"/>`;
  const stop = (id, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c}" stop-opacity="0"/><stop offset=".8" stop-color="${c}"/><stop offset="1" stop-color="#fff"/></linearGradient>`;
  scenes["takeoff-roll.svg"] = svg(
    500,
    620,
    `<defs>
      <linearGradient id="sky27" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".55" stop-color="#132457"/></linearGradient>
      ${stop("streakW", "#e8f0ff")}${stop("streakB", "#9cc4ff")}${stop("streakA", C.amber)}${stop("streakG", "#6dff9e")}
      <filter id="mblur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8 2"/></filter>
      ${blur("b10", 10)}
    </defs>` + windowFrame(500, 620, view, { ww: 300, wh: 430, cy: 310 })
  );
}

// 28. Sunrise, told by the windows down the cabin wall: each one an hour later.
{
  const r = rng(28);
  const times = [
    ["03:00", ["#01030a", "#0b1a42", "#0b1a42"], 0, 40],
    ["04:00", ["#040919", "#14245a", "#25357a"], 0, 26],
    ["05:00", ["#0b1a42", "#2f449a", "#ff9a5a"], 0, 12],
    ["05:40", ["#1b2a6b", "#6274c2", "#ffb070"], 0.35, 4],
    ["06:10", ["#34479a", "#9aa8e4", "#ffc979"], 0.75, 0],
  ];
  const ww = 100, wh = 156, cy = 150;
  let body = "", defs = "";
  times.forEach(([t, [top, mid, hor], sun, nStars], i) => {
    const cx = 92 + i * 144, gx = cx - ww / 2, gy = cy - wh / 2, hy = gy + wh * 0.68;
    defs += `<linearGradient id="sk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".55" stop-color="${mid}"/><stop offset=".68" stop-color="${hor}"/></linearGradient>
      <clipPath id="g${i}"><rect x="${gx}" y="${gy}" width="${ww}" height="${wh}" rx="${ww / 2 - 2}"/></clipPath>`;
    let view = `<rect x="${gx}" y="${gy}" width="${ww}" height="${wh}" fill="url(#sk${i})"/>${stars(r, nStars, gx, gy, ww, wh * 0.5)}`;
    if (sun > 0) {
      const sy = hy + 14 - sun * 30;
      view += `<circle cx="${cx + 14}" cy="${f(sy)}" r="${f(26 + sun * 20)}" fill="${C.amber}" opacity="${f(0.35 + sun * 0.3)}" filter="url(#b10)"/><circle cx="${cx + 14}" cy="${f(sy)}" r="12" fill="#fff1d6"/>`;
    }
    view += `<rect x="${gx}" y="${f(hy)}" width="${ww}" height="${f(wh * 0.32)}" fill="url(#cl${i})"/>`;
    defs += `<linearGradient id="cl${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${i < 2 ? "#0b1430" : i < 4 ? "#3a3060" : "#6a5070"}"/><stop offset="1" stop-color="#05070f"/></linearGradient>`;
    for (let k = 0; k < 5; k++) view += `<ellipse cx="${f(gx + r() * ww)}" cy="${f(hy + 2 + r() * 8)}" rx="${f(18 + r() * 20)}" ry="${f(3 + r() * 3)}" fill="${i < 2 ? "#14214a" : hor}" opacity="${i < 2 ? 0.8 : 0.45}"/>`;
    const pad = 18;
    body += `<rect x="${gx - pad}" y="${gy - pad}" width="${ww + pad * 2}" height="${wh + pad * 2}" rx="${ww / 2 + pad}" fill="url(#bez28)"/>
      <rect x="${gx - 7}" y="${gy - 7}" width="${ww + 14}" height="${wh + 14}" rx="${ww / 2 + 7}" fill="#070b1c"/>
      <g clip-path="url(#g${i})">${view}<path d="M${gx - 10} ${gy + wh * 0.8} L${gx + ww * 0.8} ${gy - 10}" stroke="#fff" stroke-opacity=".05" stroke-width="16"/></g>
      <circle cx="${cx}" cy="${gy + wh - 12}" r="1.6" fill="#000" stroke="${C.ledHi}" stroke-opacity=".3"/>
      ${sun > 0 ? `<ellipse cx="${cx}" cy="${gy + wh + 60}" rx="${60 + sun * 30}" ry="20" fill="${C.amber}" opacity="${f(0.12 + sun * 0.12)}" filter="url(#b10)"/>` : ""}
      <text x="${cx}" y="${gy + wh + 52}" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="12" letter-spacing="3" fill="${i === 4 ? C.amber : C.muted}">${t}</text>`;
  });
  scenes["sunrise-windows.svg"] = svg(
    760,
    340,
    `<defs>
      <linearGradient id="wall28" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0c1430"/><stop offset=".7" stop-color="#18203f"/><stop offset="1" stop-color="#3a2f4a"/></linearGradient>
      <linearGradient id="bez28" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34416f"/><stop offset="1" stop-color="#0e1430"/></linearGradient>
      ${defs}${blur("b10", 10)}
    </defs>
    <rect width="760" height="340" fill="url(#wall28)"/>
    <line x1="0" y1="14" x2="760" y2="14" stroke="${C.led}" stroke-width="12" opacity=".35" filter="url(#b10)"/>
    <line x1="0" y1="14" x2="760" y2="14" stroke="${C.ledHi}" stroke-width="2" opacity=".7"/>
    ${body}`
  );
}
