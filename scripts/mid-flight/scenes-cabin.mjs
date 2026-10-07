// Cabin details, close up: the things around your seat at 2 AM.
import { rng, f, C, blur, svg } from "./lib.mjs";

export const scenes = {};

const fabric = (id, base, seed = 2) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .25" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${base[0]}  0 0 0 0 ${base[1]}  0 0 0 0 ${base[2]}  0 0 0 .5 0"/></filter>`;

// 7. Looking up at the overhead panel: one reading light on, a beam full of dust.
{
  const r = rng(201);
  let dust = "";
  for (let i = 0; i < 70; i++) {
    const t = r(), y = 170 + t * 330, half = 30 + t * 130, x = 170 + (r() - 0.5) * 2 * half;
    dust += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.5 + r() * 1.3)}" fill="${C.amberHi}" opacity="${f(0.15 + r() * 0.5 * (1 - t))}"/>`;
  }
  scenes["reading-light.svg"] = svg(
    500,
    500,
    `<defs>
      <linearGradient id="panel7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2550"/><stop offset="1" stop-color="#0c1330"/></linearGradient>
      <radialGradient id="warm7" cx=".32" cy=".55" r=".45"><stop offset="0" stop-color="${C.amber}" stop-opacity=".4"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
      <radialGradient id="lens7"><stop offset="0" stop-color="#fffaf0"/><stop offset=".55" stop-color="${C.amberHi}"/><stop offset="1" stop-color="${C.amber}"/></radialGradient>
      <radialGradient id="lensOff"><stop offset="0" stop-color="#1c2650"/><stop offset="1" stop-color="#080d20"/></radialGradient>
      <linearGradient id="beam7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".5"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></linearGradient>
      <radialGradient id="gasper"><stop offset="0" stop-color="#05081a"/><stop offset=".6" stop-color="#2a3666"/><stop offset="1" stop-color="#121a3a"/></radialGradient>
      <clipPath id="pClip"><polygon points="60,50 440,30 472,262 28,282"/></clipPath>
      ${blur("b6", 6)}${blur("b20", 20)}
    </defs>
    <rect width="500" height="500" fill="#060915"/>
    <polygon points="60,50 440,30 472,262 28,282" fill="url(#panel7)"/>
    <g clip-path="url(#pClip)"><rect width="500" height="300" fill="url(#warm7)"/></g>
    <polygon points="60,50 440,30 472,262 28,282" fill="none" stroke="${C.ledHi}" stroke-opacity=".2" stroke-width="2"/>
    <ellipse cx="170" cy="98" rx="26" ry="18" fill="url(#gasper)" stroke="#33407a"/><ellipse cx="170" cy="98" rx="7" ry="5" fill="#000"/>
    <ellipse cx="330" cy="90" rx="26" ry="18" fill="url(#gasper)" stroke="#33407a"/><ellipse cx="330" cy="90" rx="7" ry="5" fill="#000"/>
    <polygon points="140,172 202,172 330,500 10,500" fill="url(#beam7)" filter="url(#b6)"/>
    ${dust}
    <ellipse cx="170" cy="160" rx="60" ry="44" fill="${C.amber}" opacity=".55" filter="url(#b20)"/>
    <ellipse cx="170" cy="160" rx="38" ry="28" fill="#1b2449" stroke="#3a4884" stroke-width="3"/>
    <ellipse cx="170" cy="160" rx="28" ry="20" fill="url(#lens7)"/>
    <ellipse cx="330" cy="152" rx="38" ry="28" fill="#1b2449" stroke="#3a4884" stroke-width="3"/>
    <ellipse cx="330" cy="152" rx="28" ry="20" fill="url(#lensOff)"/>
    <ellipse cx="322" cy="146" rx="9" ry="5" fill="#fff" opacity=".08"/>
    <g font-family="Arial, Helvetica, sans-serif" fill="#8a97b8" font-size="13" font-weight="700" letter-spacing="6"><text x="262" y="232" transform="rotate(-3 300 226)">32 A B C</text></g>
    <rect x="390" y="190" width="44" height="20" rx="4" fill="#0b1229" stroke="#2c3a72" transform="rotate(-3 412 200)"/>
    <circle cx="412" cy="199" r="3" fill="${C.cyan}"/>`
  );
}

// 8. The seatback in front: big map screen, ports, tray latch, seat pocket.
{
  const r = rng(202);
  let dots = "";
  const blobs = [[150, 230, 70, 45], [190, 310, 35, 40], [300, 220, 80, 40], [330, 290, 40, 30], [400, 330, 40, 22]];
  for (let x = 90; x < 430; x += 7)
    for (let y = 170; y < 370; y += 7)
      if (blobs.some(([bx, by, rx, ry]) => ((x - bx) / rx) ** 2 + ((y - by) / ry) ** 2 < 1 - r() * 0.3)) dots += `<circle cx="${x}" cy="${y}" r="1.4" fill="#24407c"/>`;
  scenes["seatback-screen.svg"] = svg(
    500,
    620,
    `<defs>
      <linearGradient id="sb8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2752"/><stop offset="1" stop-color="#0a1024"/></linearGradient>
      <radialGradient id="spill8" cx=".5" cy=".42" r=".55"><stop offset="0" stop-color="${C.led}" stop-opacity=".35"/><stop offset="1" stop-color="${C.led}" stop-opacity="0"/></radialGradient>
      ${fabric("fab8", [0.15, 0.2, 0.4])}${blur("b14", 14)}
      <clipPath id="scr8"><rect x="80" y="160" width="340" height="220" rx="6"/></clipPath>
    </defs>
    <rect width="500" height="620" fill="url(#sb8)"/>
    <rect width="500" height="620" filter="url(#fab8)" opacity=".35"/>
    <rect width="500" height="620" fill="url(#spill8)"/>
    <rect x="40" y="20" width="420" height="100" rx="30" fill="#2b3c78"/>
    <rect x="40" y="20" width="420" height="100" rx="30" filter="url(#fab8)" opacity=".4"/>
    <path d="M60 104 H440" stroke="#0b1330" stroke-opacity=".7" stroke-dasharray="3 4"/>
    <rect x="70" y="150" width="360" height="240" rx="12" fill="${C.cyan}" opacity=".3" filter="url(#b14)"/>
    <rect x="70" y="150" width="360" height="240" rx="12" fill="#0b1229" stroke="#2c3a72" stroke-width="2"/>
    <g clip-path="url(#scr8)">
      <rect x="80" y="160" width="340" height="220" fill="#040b1e"/>
      ${dots}
      <path d="M140 260 Q250 150 380 300" fill="none" stroke="${C.cyan}" stroke-opacity=".45" stroke-width="2" stroke-dasharray="4 5"/>
      <path d="M140 260 Q190 210 262 214" fill="none" stroke="${C.cyan}" stroke-width="3"/>
      <circle cx="262" cy="214" r="12" fill="${C.led}" opacity=".5"/><path d="M272 214 l-14 -3 l-3 -8 l-3 0 l2 8 l-6 1 l-3 -4 l-2 0 l1 6 l-1 6 l2 0 l3 -4 l6 1 l-2 8 l3 0 l3 -8 Z" fill="#fff"/>
      <rect x="80" y="340" width="340" height="40" fill="#020611" opacity=".85"/>
      <g font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="2" fill="${C.muted}">
        <text x="94" y="356">TO DESTINATION</text><text x="94" y="372" fill="#dbe6ff" font-size="13">5:42</text>
        <text x="230" y="356">GROUND SPEED</text><text x="230" y="372" fill="#dbe6ff" font-size="13">548 MPH</text>
        <text x="94" y="182">35,000 FT · OUTSIDE −54°C</text>
      </g>
    </g>
    <rect x="160" y="402" width="26" height="10" rx="3" fill="#05070f" stroke="#2c3a72"/>
    <circle cx="214" cy="407" r="5" fill="#05070f" stroke="#2c3a72"/><circle cx="232" cy="407" r="5" fill="#05070f" stroke="#2c3a72"/>
    <rect x="60" y="432" width="380" height="140" rx="14" fill="none" stroke="#05070f" stroke-opacity=".7" stroke-width="3"/>
    <path d="M62 434 H438" stroke="${C.ledHi}" stroke-opacity=".15"/>
    <rect x="226" y="420" width="48" height="16" rx="5" fill="#2a3670"/><rect x="232" y="424" width="36" height="8" rx="3" fill="#121a3a"/>
    <path d="M30 595 Q250 580 470 595" stroke="#04060d" stroke-width="6" fill="none"/>
    <rect x="90" y="578" width="120" height="30" rx="2" fill="#d0d8ec" opacity=".55" transform="rotate(-2 150 590)"/>
    <rect x="96" y="584" width="40" height="6" fill="#c0392b" opacity=".7" transform="rotate(-2 150 590)"/>
    <rect x="220" y="580" width="140" height="30" rx="2" fill="#3a5bd0" opacity=".6" transform="rotate(1.5 290 590)"/>`
  );
}

// 9. Tray table in perspective: ginger ale, napkin, pretzels, a pool of lamp light.
{
  scenes["tray-table.svg"] = svg(
    640,
    460,
    `<defs>
      <linearGradient id="tray9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151d3d"/><stop offset="1" stop-color="#232e5a"/></linearGradient>
      <radialGradient id="pool9" cx=".38" cy=".6" r=".45"><stop offset="0" stop-color="${C.amber}" stop-opacity=".4"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
      <linearGradient id="cup9" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfdcf5" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#cfdcf5" stop-opacity=".15"/><stop offset="1" stop-color="#cfdcf5" stop-opacity=".3"/></linearGradient>
      <linearGradient id="ale9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c27a"/><stop offset="1" stop-color="#9c6a2c"/></linearGradient>
      <linearGradient id="bag9" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f6cf0"/><stop offset="1" stop-color="#1b3aa0"/></linearGradient>
      ${blur("b8", 8)}${blur("b3", 3)}
    </defs>
    <rect width="640" height="460" fill="#070b1a"/>
    <path d="M60 0 H580 L560 150 H80 Z" fill="#111a3a"/>
    <rect x="270" y="40" width="100" height="60" rx="5" fill="#0b1229" stroke="#24305e"/>
    <polygon points="110,170 530,170 630,460 10,460" fill="url(#tray9)"/>
    <polygon points="110,170 530,170 630,460 10,460" fill="url(#pool9)"/>
    <path d="M110 170 H530" stroke="${C.ledHi}" stroke-opacity=".35" stroke-width="2"/>
    <ellipse cx="460" cy="205" rx="40" ry="10" fill="#0b1229"/>
    <polygon points="160,300 330,282 360,380 170,402" fill="#e9eef8" opacity=".22"/>
    <path d="M190 330 L320 318 M196 360 L340 346" stroke="#fff" stroke-opacity=".12"/>
    <ellipse cx="258" cy="372" rx="44" ry="12" fill="#000" opacity=".5" filter="url(#b3)"/>
    <path d="M210 262 L222 366 Q258 378 294 366 L306 262 Z" fill="url(#ale9)" opacity=".8"/>
    <ellipse cx="258" cy="272" rx="46" ry="13" fill="#e9b768" opacity=".9"/>
    <rect x="236" y="262" width="24" height="16" rx="4" fill="#fff" opacity=".45" transform="rotate(12 248 270)"/>
    <rect x="262" y="266" width="20" height="14" rx="4" fill="#fff" opacity=".35" transform="rotate(-10 272 273)"/>
    <path d="M206 250 L222 366 Q258 378 294 366 L310 250" fill="url(#cup9)" stroke="#cfdcf5" stroke-opacity=".5"/>
    <ellipse cx="258" cy="250" rx="52" ry="14" fill="none" stroke="#e8efff" stroke-opacity=".7" stroke-width="2"/>
    <path d="M222 270 L232 356" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
    <g transform="rotate(-14 470 330)">
      <ellipse cx="470" cy="368" rx="64" ry="10" fill="#000" opacity=".45" filter="url(#b3)"/>
      <path d="M410 300 Q470 292 530 300 L534 362 Q470 370 406 362 Z" fill="url(#bag9)"/>
      <path d="M410 300 Q470 292 530 300 L530 310 Q470 302 410 310 Z" fill="#1b3aa0"/>
      <path d="M420 330 l20 6 M470 340 l18 -4 M500 320 l10 8" stroke="#fff" stroke-opacity=".2"/>
      <text x="470" y="344" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="2" fill="#eef3ff">PRETZELS</text>
    </g>`
  );
}

// 10. Seatbelt buckle on your lap, catching LED blue and lamp amber.
scenes["seatbelt-buckle.svg"] = svg(
  560,
  400,
  `<defs>
    ${fabric("lap10", [0.08, 0.1, 0.22], 5)}
    <pattern id="web10" width="6" height="40" patternUnits="userSpaceOnUse"><rect width="6" height="40" fill="#4c5a82"/><path d="M0 0 V40" stroke="#36436a" stroke-width="2"/></pattern>
    <linearGradient id="metal10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe7fb"/><stop offset=".25" stop-color="#9aa8cf"/><stop offset=".5" stop-color="#4b5885"/><stop offset=".75" stop-color="#8592bd"/><stop offset="1" stop-color="#2c3459"/></linearGradient>
    <linearGradient id="lever10" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7d3f0"/><stop offset=".5" stop-color="#6c7aa3"/><stop offset="1" stop-color="#2a3358"/></linearGradient>
    <linearGradient id="shade10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
    ${blur("b8", 8)}${blur("b4", 4)}
  </defs>
  <rect width="560" height="400" fill="#0d1534"/>
  <rect width="560" height="400" filter="url(#lap10)"/>
  <path d="M0 120 Q280 150 560 110" stroke="#000" stroke-opacity=".3" stroke-width="40" fill="none" filter="url(#b8)"/>
  <polygon points="0,160 210,170 210,250 0,268" fill="url(#web10)"/>
  <polygon points="350,168 560,150 560,256 350,252" fill="url(#web10)"/>
  <polygon points="0,160 210,170 210,250 0,268" fill="url(#shade10)"/>
  <polygon points="350,168 560,150 560,256 350,252" fill="url(#shade10)"/>
  <rect x="196" y="158" width="180" height="114" rx="16" fill="#000" opacity=".5" filter="url(#b8)" transform="translate(6 10)"/>
  <rect x="190" y="150" width="180" height="114" rx="16" fill="url(#metal10)"/>
  <rect x="206" y="166" width="148" height="82" rx="10" fill="url(#lever10)" stroke="#1d2446" stroke-opacity=".6"/>
  <rect x="226" y="186" width="108" height="10" rx="5" fill="#2a3358" opacity=".5"/>
  <path d="M198 158 H362" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>
  <rect x="300" y="152" width="40" height="110" fill="${C.led}" opacity=".25" filter="url(#b4)"/>
  <circle cx="232" cy="170" r="10" fill="${C.amber}" opacity=".6" filter="url(#b4)"/>`
);

// 11. Galley curtain at the front, warm light spilling through the gap.
{
  let folds = "";
  for (let x = 130; x < 370; x += 20) folds += `<rect x="${x}" y="110" width="20" height="360" fill="url(#fold11)"/>`;
  scenes["galley-curtain.svg"] = svg(
    500,
    620,
    `<defs>
      <linearGradient id="fold11" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a1128"/><stop offset=".5" stop-color="#1e2c5e"/><stop offset="1" stop-color="#0a1128"/></linearGradient>
      <linearGradient id="spill11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".55"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></linearGradient>
      <linearGradient id="slit11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.amberHi}"/><stop offset="1" stop-color="${C.amber}"/></linearGradient>
      ${blur("b6", 6)}${blur("b18", 18)}
    </defs>
    <rect width="500" height="620" fill="#05070f"/>
    <polygon points="0,0 500,0 370,110 130,110" fill="#0c1534"/>
    <line x1="0" y1="10" x2="130" y2="110" stroke="${C.led}" stroke-width="10" opacity=".5" filter="url(#b6)"/>
    <line x1="500" y1="10" x2="370" y2="110" stroke="${C.led}" stroke-width="10" opacity=".5" filter="url(#b6)"/>
    <line x1="0" y1="10" x2="130" y2="110" stroke="${C.ledHi}" stroke-width="2"/>
    <line x1="500" y1="10" x2="370" y2="110" stroke="${C.ledHi}" stroke-width="2"/>
    <polygon points="0,0 130,110 130,470 0,620" fill="#0a1026"/>
    <polygon points="500,0 370,110 370,470 500,620" fill="#0a1026"/>
    <polygon points="130,470 370,470 500,620 0,620" fill="#0b1229"/>
    <rect x="292" y="104" width="30" height="372" fill="${C.amber}" opacity=".6" filter="url(#b18)"/>
    <rect x="300" y="110" width="14" height="360" fill="url(#slit11)"/>
    ${folds}
    <rect x="130" y="110" width="168" height="360" fill="#000" opacity=".15"/>
    <rect x="314" y="110" width="56" height="360" fill="#000" opacity=".1"/>
    <path d="M298 110 Q296 290 300 470" stroke="${C.amber}" stroke-opacity=".7" stroke-width="2" fill="none"/>
    <path d="M316 110 Q318 290 314 470" stroke="${C.amber}" stroke-opacity=".5" stroke-width="2" fill="none"/>
    <rect x="130" y="104" width="240" height="8" rx="3" fill="#2a3670"/>
    <polygon points="296,470 318,470 380,620 230,620" fill="url(#spill11)"/>
    <path d="M0 620 L0 520 Q30 500 80 510 L90 620 Z M500 620 L500 520 Q470 500 420 510 L410 620 Z" fill="#111a3a"/>`
  );
}

// 12. The EXIT sign glowing red over the door, the only red in the cabin.
scenes["exit-sign.svg"] = svg(
  640,
  320,
  `<defs>
    <linearGradient id="ceil12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1330"/><stop offset="1" stop-color="#05070f"/></linearGradient>
    <radialGradient id="red12" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3b4d" stop-opacity=".45"/><stop offset="1" stop-color="#ff3b4d" stop-opacity="0"/></radialGradient>
    ${blur("b4", 4)}${blur("b10", 10)}
  </defs>
  <rect width="640" height="320" fill="url(#ceil12)"/>
  <path d="M0 250 Q320 210 640 250" stroke="${C.led}" stroke-width="12" opacity=".4" fill="none" filter="url(#b10)"/>
  <path d="M0 250 Q320 210 640 250" stroke="${C.ledHi}" stroke-width="2" fill="none"/>
  <ellipse cx="320" cy="140" rx="260" ry="130" fill="url(#red12)"/>
  <rect x="200" y="92" width="240" height="96" rx="10" fill="#0a0507" stroke="#3a1a22" stroke-width="3"/>
  <g font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="54" letter-spacing="8" text-anchor="middle">
    <text x="326" y="160" fill="#ff3b4d" filter="url(#b10)" opacity=".9">EXIT</text>
    <text x="326" y="160" fill="#ff3b4d" filter="url(#b4)">EXIT</text>
    <text x="326" y="160" fill="#ffd0d5">EXIT</text>
  </g>`
);

// 13. An open overhead bin: roller bag, backpack, a folded jacket.
scenes["open-bin.svg"] = svg(
  640,
  420,
  `<defs>
    <linearGradient id="in13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1024"/><stop offset="1" stop-color="#1a2654"/></linearGradient>
    <linearGradient id="door13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a74"/><stop offset="1" stop-color="#121c42"/></linearGradient>
    <linearGradient id="bag13" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14182a"/><stop offset=".4" stop-color="#2c3358"/><stop offset="1" stop-color="#0d1020"/></linearGradient>
    <linearGradient id="pack13" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a3c2a"/><stop offset="1" stop-color="#2a1a12"/></linearGradient>
    ${blur("b6", 6)}${blur("b10", 10)}
  </defs>
  <rect width="640" height="420" fill="#05070f"/>
  <polygon points="40,40 600,40 640,0 0,0" fill="url(#door13)"/>
  <path d="M40 40 H600" stroke="${C.ledHi}" stroke-opacity=".4" stroke-width="2"/>
  <polygon points="40,40 600,40 560,320 80,320" fill="url(#in13)"/>
  <line x1="80" y1="318" x2="560" y2="318" stroke="${C.led}" stroke-width="14" opacity=".55" filter="url(#b10)"/>
  <line x1="80" y1="318" x2="560" y2="318" stroke="${C.ledHi}" stroke-width="3"/>
  <rect x="120" y="120" width="230" height="190" rx="16" fill="url(#bag13)"/>
  <path d="M140 140 V290 M330 140 V290" stroke="#000" stroke-opacity=".3" stroke-width="3"/>
  <rect x="200" y="100" width="70" height="24" rx="6" fill="none" stroke="#3a4270" stroke-width="6"/>
  <circle cx="150" cy="312" r="8" fill="#05070f"/><circle cx="320" cy="312" r="8" fill="#05070f"/>
  <path d="M380 310 Q370 180 430 170 Q500 165 505 230 L510 310 Z" fill="url(#pack13)"/>
  <path d="M400 230 Q450 220 495 232" stroke="#000" stroke-opacity=".35" stroke-width="3" fill="none"/>
  <path d="M420 200 L425 300" stroke="#c9a46a" stroke-opacity=".4" stroke-width="2"/>
  <path d="M370 312 Q440 286 540 300 L536 316 Z" fill="#2d3b6e"/>
  <rect y="320" width="640" height="100" fill="#0b1229"/>
  <circle cx="160" cy="370" r="10" fill="#0b1229" stroke="#2c3a72"/><circle cx="480" cy="370" r="10" fill="#0b1229" stroke="#2c3a72"/>
  <circle cx="320" cy="372" r="22" fill="${C.amber}" opacity=".5" filter="url(#b10)"/><circle cx="320" cy="372" r="12" fill="${C.amberHi}"/>`
);

// 14. Armrest controls: call button, light, volume, the old headphone jack.
scenes["armrest-controls.svg"] = svg(
  600,
  360,
  `<defs>
    <linearGradient id="arm14" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3666"/><stop offset="1" stop-color="#0e1430"/></linearGradient>
    <radialGradient id="btn14" cx=".4" cy=".35"><stop offset="0" stop-color="#3a4884"/><stop offset="1" stop-color="#141c40"/></radialGradient>
    ${blur("b4", 4)}${blur("b10", 10)}
  </defs>
  <rect width="600" height="360" fill="#05070f"/>
  <rect x="40" y="80" width="540" height="200" rx="40" fill="#000" opacity=".5" filter="url(#b10)"/>
  <rect x="30" y="70" width="540" height="200" rx="40" fill="url(#arm14)"/>
  <path d="M70 72 H530" stroke="${C.ledHi}" stroke-opacity=".4" stroke-width="2"/>
  <rect x="70" y="110" width="330" height="120" rx="14" fill="#0c1230" stroke="#2c3a72"/>
  ${[[120, "call"], [200, "light"], [280, "vdown"], [350, "vup"]].map(([x, k]) => {
    const glow = k === "call";
    return `<circle cx="${x}" cy="170" r="26" fill="url(#btn14)" stroke="${glow ? C.cyan : "#3a4884"}" stroke-width="2"/>${glow ? `<circle cx="${x}" cy="170" r="30" fill="none" stroke="${C.cyan}" stroke-opacity=".6" stroke-width="3" filter="url(#b4)"/>` : ""}`;
  }).join("")}
  <g fill="#c9d4f0" stroke="#c9d4f0">
    <circle cx="120" cy="161" r="6" stroke="none"/><path d="M108 186 a12 11 0 0 1 24 0 z" stroke="none"/>
    <circle cx="200" cy="164" r="7" fill="none" stroke-width="2.5"/><path d="M196 176 h8 M197 181 h6" stroke-width="2.5"/>
    <path d="M272 170 h16" stroke-width="3"/><path d="M342 170 h16 M350 162 v16" stroke-width="3"/>
  </g>
  <circle cx="460" cy="150" r="9" fill="#05070f" stroke="#3a4884" stroke-width="2"/>
  <circle cx="490" cy="150" r="9" fill="#05070f" stroke="#3a4884" stroke-width="2"/>
  <rect x="440" y="190" width="72" height="26" rx="6" fill="#0c1230" stroke="#3a4884"/>
  <rect x="452" y="198" width="48" height="10" rx="2" fill="#05070f"/>
  <g font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="2" fill="${C.muted}"><text x="440" y="244">AUDIO</text></g>`
);
