// Small personal things, textures, and the route constellation.
import { rng, f, C, blur, svg, stars } from "./lib.mjs";

export const scenes = {};

const texture = (id, freq, rgb, alpha, seed = 1) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="${seed}" result="n"/><feColorMatrix in="n" result="c" values="0 0 0 0 ${rgb[0]}  0 0 0 0 ${rgb[1]}  0 0 0 0 ${rgb[2]}  0 0 0 ${alpha} 0"/><feComposite in="c" in2="SourceGraphic" operator="in"/></filter>`;

// 15. Airline headphones on the seat, with the old two-prong plug.
scenes["headphones.svg"] = svg(
  500,
  420,
  `<defs>
    <linearGradient id="seat15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2654"/><stop offset="1" stop-color="#0a1028"/></linearGradient>
    ${texture("fab15", ".7 .2", [0.25, 0.32, 0.6], 0.35, 4)}
    ${texture("foam15", "1.4", [0.1, 0.12, 0.2], 0.9, 9)}
    <radialGradient id="cup15" cx=".35" cy=".3"><stop offset="0" stop-color="#3a4985"/><stop offset=".6" stop-color="#151d40"/><stop offset="1" stop-color="#070b1a"/></radialGradient>
    <linearGradient id="band15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4985"/><stop offset="1" stop-color="#0a0f22"/></linearGradient>
    ${blur("b6", 6)}${blur("b3", 3)}
  </defs>
  <rect width="500" height="420" fill="url(#seat15)"/>
  <rect width="500" height="420" filter="url(#fab15)"/>
  <path d="M140 250 C140 110 360 110 360 250" fill="none" stroke="#000" stroke-opacity=".45" stroke-width="26" filter="url(#b6)" transform="translate(8 12)"/>
  <ellipse cx="148" cy="280" rx="56" ry="64" fill="#000" opacity=".5" filter="url(#b6)"/>
  <ellipse cx="368" cy="280" rx="56" ry="64" fill="#000" opacity=".5" filter="url(#b6)"/>
  <path d="M140 250 C140 110 360 110 360 250" fill="none" stroke="url(#band15)" stroke-width="22" stroke-linecap="round"/>
  <path d="M146 220 C150 128 350 128 354 220" fill="none" stroke="${C.ledHi}" stroke-opacity=".35" stroke-width="2"/>
  ${[140, 360].map((x) => `<ellipse cx="${x}" cy="270" rx="50" ry="60" fill="url(#cup15)"/><ellipse cx="${x}" cy="270" rx="34" ry="42" fill="#0b1024"/><ellipse cx="${x}" cy="270" rx="34" ry="42" filter="url(#foam15)" opacity=".8"/><ellipse cx="${x - 14}" cy="238" rx="12" ry="6" fill="#fff" opacity=".12"/>`).join("")}
  <path d="M150 330 C170 400 270 350 300 392 S380 410 420 380" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="6" filter="url(#b3)" transform="translate(3 6)"/>
  <path d="M150 330 C170 400 270 350 300 392 S380 410 420 380" fill="none" stroke="#0b0f20" stroke-width="5"/>
  <g transform="rotate(-30 430 372)">
    <rect x="420" y="362" width="30" height="20" rx="4" fill="#2a3358"/>
    <rect x="450" y="364" width="16" height="4" rx="1" fill="#b9c4e0"/><rect x="450" y="376" width="16" height="4" rx="1" fill="#b9c4e0"/>
  </g>`
);

// 16. Folded fleece blanket on the seat.
scenes["blanket.svg"] = svg(
  500,
  420,
  `<defs>
    <linearGradient id="bk16" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d4386"/><stop offset=".6" stop-color="#1a2a5e"/><stop offset="1" stop-color="#0d1638"/></linearGradient>
    ${texture("fleece16", "1.2", [0.5, 0.6, 0.9], 0.35, 6)}
    ${blur("b8", 8)}${blur("b4", 4)}
  </defs>
  <rect width="500" height="420" fill="#070b1a"/>
  <rect x="70" y="120" width="380" height="250" rx="40" fill="#000" opacity=".55" filter="url(#b8)" transform="translate(8 14)"/>
  ${[0, 1, 2].map((i) => {
    const y = 270 - i * 64, inset = i * 6;
    return `<rect x="${70 + inset}" y="${y}" width="${360 - inset * 2}" height="90" rx="42" fill="url(#bk16)"/>
      <rect x="${70 + inset}" y="${y}" width="${360 - inset * 2}" height="90" rx="42" filter="url(#fleece16)"/>
      <path d="M${100 + inset} ${y + 8} Q250 ${y - 2} ${400 - inset} ${y + 8}" stroke="${C.ledHi}" stroke-opacity=".4" stroke-width="3" fill="none" filter="url(#b4)"/>
      <path d="M${104 + inset} ${y + 76} H${396 - inset}" stroke="${C.cyan}" stroke-opacity=".25" stroke-dasharray="5 5"/>`;
  }).join("")}
  <rect x="380" y="150" width="28" height="18" rx="2" fill="#d6dcec" opacity=".6" transform="rotate(8 394 159)"/>`
);

// 17. Boarding pass on the tray, half on top of a passport.
scenes["boarding-pass.svg"] = svg(
  600,
  400,
  `<defs>
    <radialGradient id="pool17" cx=".4" cy=".45" r=".6"><stop offset="0" stop-color="${C.amber}" stop-opacity=".3"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
    <linearGradient id="paper17" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9edf7"/><stop offset=".6" stop-color="#cfd7ea"/><stop offset="1" stop-color="#a9b4d0"/></linearGradient>
    <mask id="notch17"><rect x="-20" y="-20" width="600" height="300" fill="#fff"/><circle cx="330" cy="0" r="10" fill="#000"/><circle cx="330" cy="190" r="10" fill="#000"/></mask>
    ${blur("b6", 6)}
  </defs>
  <rect width="600" height="400" fill="#151d3d"/>
  <rect width="600" height="400" fill="url(#pool17)"/>
  <g transform="rotate(14 420 280)">
    <rect x="330" y="190" width="200" height="140" rx="8" fill="#000" opacity=".5" filter="url(#b6)" transform="translate(6 8)"/>
    <rect x="330" y="190" width="200" height="140" rx="8" fill="#13224f"/>
    <circle cx="430" cy="252" r="22" fill="none" stroke="#c9a85a" stroke-width="2"/>
    <text x="430" y="306" text-anchor="middle" font-family="Georgia, serif" font-size="12" letter-spacing="3" fill="#c9a85a">PASSPORT</text>
  </g>
  <g transform="translate(70 90) rotate(-7)">
    <rect width="440" height="190" rx="10" fill="#000" opacity=".5" filter="url(#b6)" transform="translate(8 10)"/>
    <g mask="url(#notch17)"><rect width="440" height="190" rx="10" fill="url(#paper17)"/></g>
    <line x1="330" y1="14" x2="330" y2="176" stroke="#0b1330" stroke-opacity=".35" stroke-dasharray="4 5"/>
    <g font-family="ui-monospace, Menlo, monospace" fill="#0b1330">
      <text x="22" y="34" font-size="10" letter-spacing="3" opacity=".65">BOARDING PASS</text>
      <text x="22" y="88" font-size="38" font-weight="700">ORD</text><text x="124" y="84" font-size="20">→</text><text x="158" y="88" font-size="38" font-weight="700">NRT</text>
      <text x="22" y="124" font-size="9" letter-spacing="2" opacity=".65">DEPARTS</text><text x="22" y="142" font-size="14">23:55</text>
      <text x="104" y="124" font-size="9" letter-spacing="2" opacity=".65">GROUP</text><text x="104" y="142" font-size="14">4</text>
      <text x="168" y="124" font-size="9" letter-spacing="2" opacity=".65">SEAT</text><text x="168" y="142" font-size="14" font-weight="700">32A</text>
      <text x="348" y="38" font-size="9" letter-spacing="2" opacity=".65">SEAT</text><text x="348" y="72" font-size="28" font-weight="700">32A</text>
    </g>
    ${Array.from({ length: 26 }, (_, i) => `<rect x="${348 + i * 2.9}" y="110" width="${[1, 2, 1, 1.5][i % 4]}" height="50" fill="#0b1330"/>`).join("")}
    <path d="M0 150 L440 120 V190 H0 Z" fill="#000" opacity=".08"/>
  </g>`
);

// 18. Frost crystals growing in the corner of the inner pane.
{
  const r = rng(18);
  let frost = "";
  const branch = (x, y, ang, len, depth) => {
    if (depth === 0 || len < 2) return;
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    frost += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#dbe8ff" stroke-opacity="${f(0.12 + depth * 0.09)}" stroke-width="${f(depth * 0.35)}"/>`;
    branch(x2, y2, ang + (r() - 0.5) * 0.35, len * 0.8, depth - 1);
    if (r() > 0.3) branch(x + (x2 - x) * 0.5, y + (y2 - y) * 0.5, ang - 1, len * 0.45, depth - 1);
    if (r() > 0.3) branch(x + (x2 - x) * 0.6, y + (y2 - y) * 0.6, ang + 1, len * 0.45, depth - 1);
  };
  for (let i = 0; i < 12; i++) branch(r() * 160, 420 - r() * 30, -Math.PI / 2 + (r() - 0.2) * 1.6, 34 + r() * 30, 6);
  let bokeh = "";
  for (let i = 0; i < 14; i++) bokeh += `<circle cx="${f(r() * 420)}" cy="${f(r() * 300)}" r="${f(4 + r() * 10)}" fill="#9cb4f0" opacity="${f(0.05 + r() * 0.1)}"/>`;
  scenes["frost.svg"] = svg(
    420,
    420,
    `<defs>${blur("b2", 1.4)}${blur("b3", 3)}
      <linearGradient id="bev18" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#121a3c"/><stop offset="1" stop-color="#34416f"/></linearGradient></defs>
    <rect width="420" height="420" fill="#03061a"/>
    ${bokeh}
    ${stars(r, 70, 0, 0, 420, 420)}
    <g filter="url(#b2)">${frost}</g>${frost}
    <path d="M420 0 Q414 250 250 420 L420 420 Z" fill="url(#bev18)"/>
    <path d="M420 0 Q414 250 250 420" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="4"/>
    <path d="M412 0 Q406 246 244 420" fill="none" stroke="${C.ledHi}" stroke-opacity=".2" stroke-width="2"/>
    <circle cx="300" cy="370" r="2.2" fill="#000" stroke="${C.ledHi}" stroke-opacity=".35"/>`
  );
}

// 19. Safety card sticking out of the seat pocket.
scenes["safety-card.svg"] = svg(
  460,
  600,
  `<defs>
    <linearGradient id="seat19" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16214a"/><stop offset="1" stop-color="#080d20"/></linearGradient>
    <linearGradient id="card19" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef1f8"/><stop offset="1" stop-color="#b8c2da"/></linearGradient>
    <linearGradient id="glare19" x1="0" y1="0" x2="1" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
    ${blur("b8", 8)}
  </defs>
  <rect width="460" height="600" fill="url(#seat19)"/>
  <g transform="rotate(-4 230 300)">
    <rect x="80" y="60" width="300" height="440" rx="8" fill="#000" opacity=".5" filter="url(#b8)" transform="translate(8 10)"/>
    <rect x="80" y="60" width="300" height="440" rx="8" fill="url(#card19)"/>
    <rect x="80" y="60" width="300" height="56" rx="8" fill="#c0392b"/><rect x="80" y="100" width="300" height="16" fill="#c0392b"/>
    <text x="230" y="96" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="17" letter-spacing="3" fill="#fff">SAFETY INFORMATION</text>
    <g stroke="#1b2b5e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="100" y="134" width="120" height="110" rx="4" stroke-width="1.5"/>
      <circle cx="148" cy="172" r="9" fill="#1b2b5e"/><path d="M152 182 L176 210 L204 210 M176 210 L170 232 M140 172 L120 214"/>
      <rect x="240" y="134" width="120" height="110" rx="4" stroke-width="1.5"/>
      <path d="M300 146 V176"/><path d="M286 176 h28 l-4 18 h-20 z" fill="#f4c96a"/><circle cx="300" cy="220" r="12"/>
      <rect x="100" y="262" width="120" height="110" rx="4" stroke-width="1.5"/>
      <path d="M140 290 q20 -10 40 0 l6 56 h-52 z" fill="#f4c96a"/><circle cx="160" cy="282" r="9" fill="#1b2b5e"/>
      <rect x="240" y="262" width="120" height="110" rx="4" stroke-width="1.5"/>
      <path d="M262 318 h64 M310 300 l18 18 l-18 18" stroke="#2e9e5b" stroke-width="5"/>
    </g>
    <g font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#1b2b5e" font-weight="700"><text x="104" y="398">1</text><text x="244" y="398">2</text><text x="104" y="420">3</text><text x="244" y="420">4</text></g>
    <rect x="80" y="60" width="300" height="440" rx="8" fill="url(#glare19)"/>
  </g>
  <rect y="400" width="460" height="200" fill="#0b1230"/>
  <path d="M0 400 Q230 386 460 400" stroke="#2a3a78" stroke-width="6" fill="none"/>
  <path d="M0 404 Q230 390 460 404" stroke="${C.ledHi}" stroke-opacity=".25" stroke-width="2" fill="none"/>`
);

// 20. Eye mask and foam earplugs on the blanket.
scenes["eye-mask.svg"] = svg(
  560,
  380,
  `<defs>
    ${texture("fl20", "1.1", [0.3, 0.38, 0.7], 0.3, 12)}
    <linearGradient id="satin20" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b4f94"/><stop offset=".35" stop-color="#1b2756"/><stop offset=".55" stop-color="#5068b4"/><stop offset=".75" stop-color="#16204a"/><stop offset="1" stop-color="#0b1230"/></linearGradient>
    <linearGradient id="plug20" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd79a"/><stop offset="1" stop-color="#d98a3a"/></linearGradient>
    ${texture("foam20", "2", [0.6, 0.35, 0.1], 0.35, 3)}
    ${blur("b6", 6)}
  </defs>
  <rect width="560" height="380" fill="#121b40"/>
  <rect width="560" height="380" filter="url(#fl20)"/>
  <path d="M60 210 C40 120 140 40 260 120 M300 120 C420 40 520 120 500 210" fill="none" stroke="#0a0f24" stroke-width="10" stroke-linecap="round"/>
  <path d="M110 190 C110 120 210 110 280 140 C350 110 450 120 450 190 C450 260 360 270 280 240 C200 270 110 260 110 190 Z" fill="#000" opacity=".5" filter="url(#b6)" transform="translate(8 12)"/>
  <path d="M110 190 C110 120 210 110 280 140 C350 110 450 120 450 190 C450 260 360 270 280 240 C200 270 110 260 110 190 Z" fill="url(#satin20)"/>
  <path d="M118 190 C118 128 212 118 280 148 C348 118 442 128 442 190" fill="none" stroke="${C.ledHi}" stroke-opacity=".3" stroke-width="2"/>
  <path d="M120 194 C120 250 200 258 280 232 C360 258 440 250 440 194" fill="none" stroke="#0a0f24" stroke-opacity=".6" stroke-dasharray="3 4"/>
  ${[[140, 320, -20], [210, 330, 15]].map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})"><ellipse cx="${x}" cy="${y + 6}" rx="22" ry="8" fill="#000" opacity=".45" filter="url(#b6)"/><rect x="${x - 22}" y="${y - 12}" width="44" height="24" rx="11" fill="url(#plug20)"/><rect x="${x - 22}" y="${y - 12}" width="44" height="24" rx="11" filter="url(#foam20)"/></g>`).join("")}`
);

// 21. Phone face-up on the tray, airplane mode, 2:14 AM.
scenes["phone-airplane.svg"] = svg(
  460,
  600,
  `<defs>
    <linearGradient id="tray21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a38"/><stop offset="1" stop-color="#1c2650"/></linearGradient>
    <linearGradient id="wall21" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b2a66"/><stop offset=".6" stop-color="#0c1330"/><stop offset="1" stop-color="#1a1440"/></linearGradient>
    <radialGradient id="spill21" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="${C.led}" stop-opacity=".25"/><stop offset="1" stop-color="${C.led}" stop-opacity="0"/></radialGradient>
    <clipPath id="scr21"><rect x="140" y="110" width="180" height="370" rx="26"/></clipPath>
    ${blur("b8", 8)}${blur("b20", 20)}
  </defs>
  <rect width="460" height="600" fill="url(#tray21)"/>
  <rect width="460" height="600" fill="url(#spill21)"/>
  <g transform="rotate(-8 230 300)">
    <rect x="130" y="100" width="200" height="390" rx="34" fill="#000" opacity=".55" filter="url(#b8)" transform="translate(8 12)"/>
    <rect x="130" y="100" width="200" height="390" rx="34" fill="#05070f" stroke="#2a3358" stroke-width="2"/>
    <g clip-path="url(#scr21)">
      <rect x="140" y="110" width="180" height="370" fill="url(#wall21)"/>
      <circle cx="280" cy="400" r="90" fill="${C.violet}" opacity=".25" filter="url(#b20)"/>
      <g font-family="Arial, Helvetica, sans-serif" fill="#e6ecfb" text-anchor="middle">
        <text x="230" y="186" font-size="12" opacity=".8">Thursday, March 14</text>
        <text x="230" y="250" font-size="64" font-weight="300">2:14</text>
      </g>
      <path d="M160 128 l8 -2 l2 -5 l1 0 l-1 5 l4 1 l2 -3 l1 0 l-1 4 l1 4 l-1 0 l-2 -3 l-4 1 l1 5 l-1 0 l-2 -5 Z" fill="#e6ecfb"/>
      <rect x="282" y="122" width="22" height="10" rx="3" fill="none" stroke="#e6ecfb" stroke-opacity=".8"/><rect x="284" y="124" width="12" height="6" rx="1" fill="#e6ecfb"/>
      <rect x="152" y="300" width="156" height="54" rx="12" fill="#fff" opacity=".14"/>
      <g font-family="Arial, Helvetica, sans-serif" fill="#e6ecfb"><text x="164" y="322" font-size="10" font-weight="700" opacity=".9">DOWNLOADS</text><text x="164" y="340" font-size="11" opacity=".85">3 episodes ready offline</text></g>
      <rect x="205" y="466" width="50" height="4" rx="2" fill="#e6ecfb" opacity=".7"/>
    </g>
    <rect x="130" y="100" width="200" height="390" rx="34" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width="12"/>
    <path d="M150 120 L320 360" stroke="#fff" stroke-opacity=".05" stroke-width="40"/>
  </g>`
);

// 22. My routes as a constellation: airports as stars, flights as faint lines.
{
  const r = rng(23);
  const ap = { SEA: [80, 110], SFO: [70, 160], LAX: [90, 190], ORD: [150, 120], JFK: [195, 125], MIA: [180, 200], LHR: [275, 95], CDG: [285, 115], DXB: [345, 170], DEL: [380, 160], SIN: [410, 230], NRT: [460, 130] };
  const routes = [["ORD", "JFK"], ["ORD", "SFO"], ["SFO", "SEA"], ["ORD", "LAX"], ["JFK", "MIA"], ["JFK", "LHR"], ["LHR", "CDG"], ["CDG", "DXB"], ["DXB", "DEL"], ["DEL", "SIN"], ["ORD", "NRT"], ["SIN", "NRT"]];
  scenes["route-constellation.svg"] = svg(
    520,
    300,
    `<defs>${blur("b5", 5)}</defs>
    <rect width="520" height="300" fill="#03061a"/>
    ${stars(r, 90, 0, 0, 520, 300, "#55658f")}
    ${routes.map(([a, b]) => {
      const [x1, y1] = ap[a], [x2, y2] = ap[b];
      const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.25;
      return `<path d="M${x1} ${y1} Q${f(mx)} ${f(my)} ${x2} ${y2}" fill="none" stroke="${C.cyan}" stroke-opacity=".4"/>`;
    }).join("")}
    ${Object.entries(ap).map(([code, [x, y]]) => `<circle cx="${x}" cy="${y}" r="8" fill="${code === "ORD" ? C.amber : C.cyan}" opacity=".45" filter="url(#b5)"/><circle cx="${x}" cy="${y}" r="2.6" fill="#fff"/><text x="${x + 7}" y="${y + 16}" font-family="ui-monospace, Menlo, monospace" font-size="9" letter-spacing="1.5" fill="${C.muted}">${code}</text>`).join("")}`
  );
}

// 23. Seat fabric close-up: woven pattern, wear, a stitched seam and piping.
scenes["seat-fabric.svg"] = svg(
  420,
  420,
  `<defs>
    <pattern id="weave23" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="28" height="28" fill="#142048"/>
      <rect x="4" y="4" width="10" height="10" fill="#1c2c62"/>
      <rect x="18" y="18" width="6" height="6" fill="#2a3f86"/>
      <circle cx="21" cy="7" r="1.4" fill="#4e7fd9" opacity=".7"/>
    </pattern>
    ${texture("wear23", ".9", [0.5, 0.6, 0.9], 0.25, 8)}
    <radialGradient id="light23" cx=".3" cy="0" r="1.1"><stop offset="0" stop-color="${C.led}" stop-opacity=".3"/><stop offset=".6" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
    ${blur("b6", 6)}
  </defs>
  <rect width="420" height="420" fill="url(#weave23)"/>
  <rect width="420" height="420" filter="url(#wear23)"/>
  <path d="M0 300 C140 280 280 320 420 296" stroke="#000" stroke-opacity=".5" stroke-width="16" fill="none" filter="url(#b6)"/>
  <path d="M0 296 C140 276 280 316 420 292" stroke="#0a1128" stroke-width="5" fill="none"/>
  <path d="M0 286 C140 266 280 306 420 282" stroke="#7fa2e6" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="6 5" fill="none"/>
  <rect width="420" height="420" fill="url(#light23)"/>`
);
