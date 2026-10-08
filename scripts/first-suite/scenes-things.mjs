// Things in the suite, close up: the amenity kit, pajamas, lamp, orchid,
// the seat tablet, and four material swatches (leather, veneer, brass, linen).
import { rng, f, C, SERIF, SANS, blur, texture, contact, line, svg } from "./lib.mjs";

export const scenes = {};

// 1. Amenity kit, overhead flat-lay: the leather pouch and its contents in a neat grid.
{
  const W = 640, H = 460;
  // Zip teeth along a straight run.
  const teeth = (x1, x2, y) => {
    let s = "";
    for (let x = x1; x < x2; x += 2.6) s += `<rect x="${f(x)}" y="${f(y - 2)}" width="1.4" height="4" fill="${C.brass}"/>`;
    return s;
  };
  // Open part of the zip: two lips, each with teeth, following a lens shape.
  const lip = (x1, x2, y, sag) => {
    let s = "";
    for (let x = x1 + 3; x < x2 - 2; x += 2.8) {
      const t = (x - x1) / (x2 - x1), dy = 4 * t * (1 - t) * sag;
      s += `<rect x="${f(x)}" y="${f(y + dy - 1.6)}" width="1.3" height="3.2" fill="${C.brass}"/>`;
    }
    return s;
  };
  // Socks: one sock in side view, cuff up, toe pointing right.
  const sock = (dx, dy, fill, ink) => `<g transform="translate(${dx} ${dy})">
      <path d="M0 0 L34 0 L34 62 Q35 70 44 70 L94 70 Q110 71 110 85 Q110 99 94 99 L28 99 Q0 99 0 72 Z" fill="${fill}" stroke="${ink}" stroke-width=".8"/>
      <path d="M0 0 L34 0 L34 62 Q35 70 44 70 L94 70 Q110 71 110 85 Q110 99 94 99 L28 99 Q0 99 0 72 Z" filter="url(#knit_kit)" opacity=".7"/>
      ${[4, 8, 12, 16, 20, 24, 28, 31].map((x) => line(x, 1, x, 18, { color: ink, w: 0.6, o: 0.7 })).join("")}
      ${line(0, 19, 34, 19, { color: ink, w: 0.7, o: 0.8 })}
      <path d="M88 71 Q82 85 90 98" fill="none" stroke="${ink}" stroke-width=".6" opacity=".6"/>
      <path d="M34 66 Q20 84 4 88" fill="none" stroke="${ink}" stroke-width=".6" opacity=".5"/>
    </g>`;
  let bristles = "";
  for (let y = 88; y < 116; y += 3.4) for (let x = 455; x < 466; x += 3.4) bristles += `<circle cx="${f(x)}" cy="${f(y)}" r="1.15" fill="#fff" stroke="${C.sand}" stroke-width=".4"/>`;
  let combTeeth = "";
  for (let y = 102; y < 242; y += y < 170 ? 3.2 : 5) combTeeth += line(518, y, 544, y, { color: C.walnut, w: y < 170 ? 1.4 : 2.2 });
  scenes["amenity-kit.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="leather_kit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
      <linearGradient id="wine_kit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.wineHi}"/><stop offset=".6" stop-color="${C.wine}"/><stop offset="1" stop-color="${C.wine}"/></linearGradient>
      <linearGradient id="brass_kit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="brassv_kit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".6" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
      <linearGradient id="tube_kit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="silk_kit" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${C.slateHi}"/><stop offset=".45" stop-color="${C.slate}"/><stop offset="1" stop-color="${C.slate}"/></linearGradient>
      ${texture("grain_kit", ".55", [0.3, 0.16, 0.08], 0.3, 3)}
      ${texture("knit_kit", ".9 .2", [0.4, 0.33, 0.27], 0.25, 5, 2)}
      ${texture("weave_kit", ".7 .7", [0.6, 0.53, 0.45], 0.08, 8, 2)}
    </defs>
    <rect width="${W}" height="${H}" filter="url(#weave_kit)" fill="#fff"/>
    ${contact(180, 250, 104, 4, 0.07)}
    <!-- pouch -->
    <rect x="72" y="96" width="210" height="150" rx="18" fill="url(#leather_kit)"/>
    <rect x="72" y="96" width="210" height="150" rx="18" filter="url(#grain_kit)" fill="#000"/>
    <rect x="79" y="103" width="196" height="136" rx="12" fill="none" stroke="${C.cream}" stroke-width=".9" stroke-dasharray="3.2 2.2"/>
    <rect x="88" y="114" width="178" height="8" rx="4" fill="${C.espresso}" opacity=".55"/>
    <path d="M92 118 Q146 100 202 118 Q146 140 92 118 Z" fill="${C.champagne}"/>
    <path d="M96 118 Q146 106 198 118 Q146 130 96 118 Z" fill="${C.champagneLo}" opacity=".8"/>
    <path d="M92 118 Q146 100 202 118" fill="none" stroke="${C.espresso}" stroke-opacity=".55" stroke-width="3"/>
    <path d="M92 118 Q146 140 202 118" fill="none" stroke="${C.espresso}" stroke-opacity=".55" stroke-width="3"/>
    ${lip(92, 202, 118, -9)}${lip(92, 202, 118, 11)}
    ${teeth(204, 262, 118)}
    <rect x="198" y="112" width="13" height="12" rx="2.5" fill="url(#brass_kit)" stroke="${C.brassLo}" stroke-width=".6"/>
    <rect x="201.5" y="122" width="6" height="22" rx="3" fill="url(#brassv_kit)" stroke="${C.brassLo}" stroke-width=".6"/>
    <rect x="203.4" y="134" width="2.2" height="6" rx="1.1" fill="${C.brassLo}"/>
    <rect x="264" y="113" width="14" height="10" rx="3" fill="${C.cognac}" stroke="${C.espresso}" stroke-opacity=".5" stroke-width=".6"/>
    ${line(140, 178, 214, 178, { color: C.brassHi, w: 0.6, o: 0.9 })}
    <text x="177" y="195" text-anchor="middle" font-family="${SANS}" font-size="8" letter-spacing="5" fill="${C.brassHi}">FIRST</text>
    ${line(140, 203, 214, 203, { color: C.brassHi, w: 0.6, o: 0.9 })}
    <!-- lotion tube -->
    ${contact(360, 244, 14, 3, 0.07)}
    <rect x="341" y="96" width="38" height="11" rx="1.5" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".8"/>
    ${[345, 349, 353, 357, 361, 365, 369, 373, 377].map((x) => line(x, 98, x, 105, { color: C.taupe, w: 0.6, o: 0.6 })).join("")}
    <path d="M342 107 L378 107 L375 200 Q373 212 366 214 L354 214 Q347 212 345 200 Z" fill="url(#tube_kit)" stroke="${C.taupe}" stroke-width=".8"/>
    ${line(345, 112, 375, 112, { color: C.brass, w: 0.7 })}
    <text transform="translate(363 160) rotate(-90)" text-anchor="middle" font-family="${SANS}" font-size="6.5" letter-spacing="3" fill="${C.espresso}" opacity=".8">LOTION</text>
    <rect x="351" y="214" width="18" height="30" rx="3" fill="url(#brassv_kit)"/>
    ${[220, 226, 232, 238].map((y) => line(352, y, 368, y, { color: C.brassLo, w: 0.4, o: 0.6 })).join("")}
    <!-- lip balm -->
    ${contact(410, 244, 10, 3, 0.07)}
    <rect x="400" y="168" width="20" height="76" rx="9" fill="url(#tube_kit)" stroke="${C.taupe}" stroke-width=".8"/>
    <path d="M400 192 L400 177 Q400 168 410 168 Q420 168 420 177 L420 192 Z" fill="url(#wine_kit)"/>
    ${line(400, 192.5, 420, 192.5, { color: C.brass, w: 1 })}
    <text transform="translate(413 220) rotate(-90)" text-anchor="middle" font-family="${SANS}" font-size="5" letter-spacing="2" fill="${C.espresso}" opacity=".7">BALM</text>
    <!-- toothbrush -->
    ${contact(460, 244, 10, 3, 0.07)}
    <path d="M453 88 Q453 84 457 84 L465 84 Q469 84 469 88 L468 118 Q466 124 463 126 L463 134 Q467 140 467 150 L468 238 Q468 246 460 246 Q452 246 452 238 L453 150 Q453 140 457 134 L457 126 Q454 124 453 118 Z" fill="${C.ivory}" stroke="${C.taupeLo}" stroke-width=".8"/>
    <rect x="454" y="86" width="14" height="32" rx="4" fill="${C.slateHi}"/>
    ${bristles}
    <rect x="453" y="206" width="15" height="4" fill="url(#brassv_kit)"/>
    <!-- comb, in pale walnut -->
    ${contact(527, 244, 18, 3, 0.07)}
    ${combTeeth}
    <rect x="505" y="96" width="14" height="150" rx="5" fill="${C.walnut}"/>
    <rect x="507" y="98" width="3" height="146" rx="1.5" fill="#fff" opacity=".15"/>
    <!-- eye mask with elastic -->
    <path d="M106 322 C96 272 258 272 248 322" fill="none" stroke="${C.slate}" stroke-width="3.2"/>
    ${contact(177, 366, 70, 3, 0.07)}
    <path d="M100 324 Q100 300 140 300 Q168 300 177 314 Q186 300 214 300 Q254 300 254 324 Q254 360 214 362 Q190 362 177 348 Q164 362 140 362 Q100 360 100 324 Z" fill="url(#silk_kit)"/>
    <path d="M106 324 Q106 306 140 306 Q166 306 177 320 Q188 306 214 306 Q248 306 248 324 Q248 354 214 356 Q192 356 177 342 Q162 356 140 356 Q106 354 106 324 Z" fill="none" stroke="${C.brassHi}" stroke-width=".9"/>
    <path d="M120 312 Q140 304 160 310" fill="none" stroke="#fff" stroke-width="2" opacity=".3"/>
    <text x="177" y="336" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="11" fill="${C.brassHi}">fs</text>
    <!-- socks -->
    ${contact(470, 394, 62, 3, 0.07)}
    ${sock(426, 294, C.sageLo, C.sageLo)}
    ${sock(412, 286, C.sage, C.sageLo)}`
  );
}

// 2. Folded pajamas tied with a ribbon, slippers beside, on the ivory sheet.
{
  const W = 600, H = 440;
  const slipper = (cx, cy, rot, flip) => `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${flip} 1)">
      <path d="M0 -100 C26 -100 31 -64 29 -22 C27 26 24 70 20 88 Q0 104 -18 88 C-24 70 -28 26 -30 -20 C-32 -62 -26 -100 0 -100 Z" fill="${C.champagne}" stroke="${C.taupeLo}" stroke-width=".8"/>
      <path d="M0 -94 C21 -94 25 -62 23 -22 C21 24 19 66 15 82 Q0 96 -13 82 C-18 66 -22 24 -24 -20 C-26 -60 -21 -94 0 -94 Z" fill="${C.ivory}"/>
      <path d="M0 -94 C21 -94 25 -62 23 -22 C21 24 19 66 15 82 Q0 96 -13 82 C-18 66 -22 24 -24 -20 C-26 -60 -21 -94 0 -94 Z" filter="url(#terry_pj)"/>
      <path d="M-31 -18 C-33 -62 -27 -102 0 -102 C27 -102 32 -64 30 -18 Q0 -4 -31 -18 Z" fill="url(#band_pj)"/>
      <path d="M-31 -18 C-33 -62 -27 -102 0 -102 C27 -102 32 -64 30 -18 Q0 -4 -31 -18 Z" filter="url(#terry_pj)"/>
      <path d="M-31 -18 Q0 -4 30 -18" fill="none" stroke="${C.rose}" stroke-width="2.2"/>
      <path d="M-31 -18 C-33 -62 -27 -102 0 -102 C27 -102 32 -64 30 -18" fill="none" stroke="${C.rose}" stroke-width="1.6"/>
      <text x="0" y="-36" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="10" fill="${C.rose}" transform="scale(${flip} 1)">fs</text>
    </g>`;
  scenes["pajamas.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="top_pj" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="band_pj" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="ribbon_pj" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.wineHi}"/><stop offset=".5" stop-color="${C.wine}"/><stop offset="1" stop-color="${C.wine}"/></linearGradient>
      ${texture("cotton_pj", ".8 .6", [0.55, 0.48, 0.4], 0.1, 4, 2)}
      ${texture("terry_pj", "1.1", [0.55, 0.48, 0.4], 0.18, 6, 2)}
      ${texture("sheet_pj", ".6 .9", [0.6, 0.52, 0.44], 0.07, 2, 2)}
    </defs>
    <rect width="${W}" height="${H}" fill="${C.ivory}"/>
    <rect width="${W}" height="${H}" filter="url(#sheet_pj)" fill="#fff"/>
    ${contact(220, 368, 116, 4, 0.08)}
    <!-- trousers underneath -->
    <rect x="104" y="98" width="232" height="268" rx="7" fill="${C.sand}" stroke="${C.taupe}" stroke-width=".8"/>
    ${line(106, 358, 334, 358, { color: C.slate, w: 1.1 })}
    <!-- folded top -->
    <rect x="110" y="90" width="220" height="262" rx="8" fill="url(#top_pj)" stroke="${C.taupe}" stroke-width=".8"/>
    <rect x="110" y="90" width="220" height="262" rx="8" filter="url(#cotton_pj)" fill="#000"/>
    ${line(128, 96, 128, 346, { color: C.sand, w: 1, o: 0.9 })}${line(312, 96, 312, 346, { color: C.sand, w: 1, o: 0.9 })}
    <path d="M184 90 L220 152 L256 90 Z" fill="${C.sand}"/>
    <path d="M190 90 Q220 104 250 90" fill="none" stroke="${C.sand}" stroke-width="1.2"/>
    <path d="M160 90 L184 90 L220 152 L220 184 Z" fill="${C.ivory}"/>
    <path d="M280 90 L256 90 L220 152 L220 184 Z" fill="${C.cream}"/>
    <path d="M160 90 L220 184 L280 90" fill="none" stroke="${C.slate}" stroke-width="1.4"/>
    <path d="M184 90 L220 152 L256 90" fill="none" stroke="${C.sand}" stroke-width=".8"/>
    ${line(220, 184, 220, 348, { color: C.sand, w: 1 })}${line(224, 184, 224, 348, { color: C.slate, w: 1.1 })}
    ${[208, 252].map((y) => `<circle cx="214" cy="${y}" r="3.6" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".8"/><circle cx="213" cy="${y}" r=".6" fill="${C.taupe}"/><circle cx="215" cy="${y}" r=".6" fill="${C.taupe}"/>`).join("")}
    <!-- pocket with monogram -->
    <path d="M248 212 L296 212 L296 258 Q296 262 292 262 L252 262 Q248 262 248 258 Z" fill="none" stroke="${C.taupe}" stroke-width=".8"/>
    ${line(248, 212, 296, 212, { color: C.slate, w: 1.4 })}
    <text x="272" y="241" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="17" fill="${C.slate}">fs</text>
    <!-- ribbon and bow -->
    <rect x="104" y="294" width="232" height="6" fill="url(#ribbon_pj)"/>
    ${line(104, 294, 336, 294, { color: C.wine, w: 0.5 })}${line(104, 300, 336, 300, { color: C.wine, w: 0.5 })}
    <path d="M222 298 C200 278 184 284 188 296 C192 308 206 304 222 298 Z" fill="url(#ribbon_pj)" stroke="${C.wine}" stroke-width=".7"/>
    <path d="M222 298 C244 278 260 284 256 296 C252 308 238 304 222 298 Z" fill="url(#ribbon_pj)" stroke="${C.wine}" stroke-width=".7"/>
    <path d="M219 300 L204 332 L210 330 L212 336 L224 301 Z" fill="url(#ribbon_pj)" stroke="${C.wine}" stroke-width=".6"/>
    <path d="M225 300 L242 330 L236 329 L235 335 L221 302 Z" fill="url(#ribbon_pj)" stroke="${C.wine}" stroke-width=".6"/>
    <rect x="217" y="293" width="10" height="10" rx="2.5" fill="${C.wine}" stroke="${C.wine}" stroke-width=".7"/>
    <!-- slippers -->
    ${contact(410, 326, 22, 3, 0.07)}${contact(482, 330, 22, 3, 0.07)}
    ${slipper(410, 222, -3, -1)}
    ${slipper(482, 226, 3, 1)}`
  );
}

// 3. Slim brass table lamp, linen drum shade lit softly, on the side console.
{
  const W = 460, H = 600;
  scenes["brass-lamp.svg"] = svg(
    W,
    H,
    `<defs>
      <radialGradient id="wash_lamp" cx="230" cy="270" r="210" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f9e4c0" stop-opacity=".95"/><stop offset=".5" stop-color="#fbedd6" stop-opacity=".3"/><stop offset="1" stop-color="#fbf0dc" stop-opacity="0"/></radialGradient>
      <linearGradient id="shade_lamp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6ecda"/><stop offset=".35" stop-color="#fffaf0"/><stop offset=".7" stop-color="#fdf3e2"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <linearGradient id="stem_lamp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".45" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
      <linearGradient id="top_lamp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.champagneLo}"/><stop offset=".5" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
      <linearGradient id="front_lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.taupeLo}"/><stop offset="1" stop-color="${C.walnut}"/></linearGradient>
      <linearGradient id="panel_lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="#efe6d8"/></linearGradient>
      ${texture("linen_lamp", ".9 .5", [0.6, 0.5, 0.38], 0.12, 3, 2)}
      ${texture("veneer_lamp", ".006 .25", [0.36, 0.25, 0.17], 0.3, 5, 3)}
      ${texture("brush_lamp", ".02 .9", [0.4, 0.3, 0.18], 0.25, 2, 2)}
    </defs>
    <rect x="40" y="40" width="380" height="404" fill="url(#panel_lamp)"/>
    <rect x="40" y="40" width="380" height="404" fill="none" stroke="${C.brass}" stroke-width=".9"/>
    <rect x="48" y="48" width="364" height="396" fill="none" stroke="${C.brass}" stroke-width=".5" stroke-opacity=".6"/>
    <rect width="${W}" height="${H}" fill="url(#wash_lamp)"/>
    <!-- console -->
    <rect x="30" y="444" width="400" height="12" fill="url(#top_lamp)"/>
    ${line(30, 444, 430, 444, { color: C.brass, w: 0.8 })}
    <rect x="30" y="456" width="400" height="74" fill="url(#front_lamp)"/>
    <rect x="30" y="456" width="400" height="74" filter="url(#veneer_lamp)" fill="#000"/>
    ${line(30, 456.5, 430, 456.5, { color: C.brassHi, w: 1.2 })}
    ${line(30, 529.5, 430, 529.5, { color: C.brass, w: 1 })}
    <rect x="44" y="468" width="372" height="50" fill="none" stroke="${C.brassHi}" stroke-width=".8" stroke-opacity=".8"/>
    <rect x="216" y="490" width="28" height="3" rx="1.5" fill="url(#stem_lamp)"/>
    <ellipse cx="230" cy="450" rx="90" ry="4" fill="${C.ivory}" opacity=".18"/>
    <!-- books: bordeaux, slate and sage cloth spines -->
    ${contact(340, 444, 44, 2, 0.12)}
    <rect x="296" y="429" width="92" height="15" rx="1.5" fill="${C.wine}"/>
    ${line(300, 432.5, 384, 432.5, { color: C.brassHi, w: 0.6 })}${line(300, 440.5, 384, 440.5, { color: C.brassHi, w: 0.6 })}
    <rect x="304" y="417" width="78" height="12" rx="1.5" fill="${C.slate}"/>
    <text x="343" y="425.5" text-anchor="middle" font-family="${SANS}" font-size="5" letter-spacing="2.5" fill="${C.brassHi}">VOYAGES</text>
    <rect x="300" y="407" width="84" height="10" rx="1.5" fill="${C.sage}"/>
    ${line(304, 412, 380, 412, { color: C.sageLo, w: 0.6 })}
    <rect x="300" y="407" width="84" height="37" rx="1.5" fill="none" stroke="${C.espresso}" stroke-opacity=".12" stroke-width=".6"/>
    <!-- lamp -->
    ${contact(230, 444, 46, 2, 0.12)}
    <path d="M190 444 L194 436 Q230 430 266 436 L270 444 Q230 448 190 444 Z" fill="url(#stem_lamp)"/>
    <path d="M190 444 L194 436 Q230 430 266 436 L270 444 Q230 448 190 444 Z" filter="url(#brush_lamp)" fill="#000"/>
    <ellipse cx="230" cy="435" rx="36" ry="3.4" fill="${C.brassHi}" opacity=".8"/>
    <rect x="226.5" y="318" width="7" height="116" fill="url(#stem_lamp)"/>
    <rect x="224" y="378" width="12" height="9" rx="2" fill="url(#stem_lamp)"/>
    <rect x="226" y="300" width="8" height="18" rx="1" fill="url(#stem_lamp)"/>
    <ellipse cx="230" cy="320" rx="84" ry="10" fill="#fffaf1"/>
    <path d="M152 202 L146 320 A84 10 0 0 0 314 320 L308 202 A78 9 0 0 1 152 202 Z" fill="url(#shade_lamp)"/>
    <path d="M152 202 L146 320 A84 10 0 0 0 314 320 L308 202 A78 9 0 0 1 152 202 Z" filter="url(#linen_lamp)" fill="#000"/>
    <ellipse cx="230" cy="202" rx="78" ry="9" fill="#fcefd6"/>
    <ellipse cx="230" cy="202" rx="78" ry="9" fill="none" stroke="${C.brassLo}" stroke-width="1"/>
    <path d="M146 320 A84 10 0 0 0 314 320" fill="none" stroke="${C.brassLo}" stroke-width="1.1"/>
    ${line(230, 202, 230, 193, { color: C.brass, w: 1.6 })}
    <circle cx="230" cy="191" r="3.4" fill="url(#stem_lamp)"/>
    <path d="M186 204 L186 318" stroke="#fff" stroke-width="10" opacity=".25"/>`
  );
}

// 4. A potted white Phalaenopsis: broad sage leaves, silvery aerial roots, a staked stem
//    arching into a spray of flowers, in a walnut pot against the champagne wall panel.
{
  const W = 460, H = 600;
  const r = rng(404);
  const bez = (a, b, c, d, t) => {
    const u = 1 - t;
    return [0, 1].map((i) => u * u * u * a[i] + 3 * u * u * t * b[i] + 3 * u * t * t * c[i] + t * t * t * d[i]);
  };
  // Stem: straight up along the stake, then an arch falling to the right.
  const S1 = [[238, 446], [239, 380], [241, 290], [242, 234]];
  const S2 = [[242, 234], [244, 172], [292, 128], [342, 140]];
  const S3 = [[342, 140], [380, 150], [398, 188], [398, 232]];
  const stemD = `M${S1[0]} C${S1[1]} ${S1[2]} ${S1[3]} C${S2[1]} ${S2[2]} ${S2[3]} C${S3[1]} ${S3[2]} ${S3[3]}`;
  // Sample the arch by arc length.
  const pts = [];
  for (let i = 0; i <= 200; i++) pts.push(i <= 100 ? bez(...S2, i / 100) : bez(...S3, (i - 100) / 100));
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const at = (sLen) => {
    let i = cum.findIndex((c) => c >= sLen);
    if (i < 1) i = 1;
    const [x, y] = pts[i], [px, py] = pts[i - 1], l = Math.hypot(x - px, y - py) || 1;
    return { x, y, tx: (x - px) / l, ty: (y - py) / l };
  };

  // One Phalaenopsis flower, facing the viewer; yaw squeezes it sideways.
  const flower = (s, rot, yaw, pw) => {
    const sep = (rotDeg, len, w) =>
      `<path d="M0 0 C${w} ${f(-len * 0.3)} ${f(w * 0.8)} ${f(-len * 0.85)} 0 ${-len} C${f(-w * 0.8)} ${f(-len * 0.85)} ${-w} ${f(-len * 0.3)} 0 0 Z" transform="rotate(${rotDeg})" fill="url(#sepal_orch)" stroke="${C.taupeLo}" stroke-width=".55"/>`;
    const pet = (k) =>
      `<path d="M0 1 C${4 * k} -10 ${f(24 * k * pw)} ${f(-22 * pw)} ${f(31 * k * pw)} -8 C${f(36 * k * pw)} ${f(4 * pw)} ${f(20 * k * pw)} ${f(16 * pw)} ${2 * k} 4 Z" fill="url(#petal_orch)" stroke="${C.taupeLo}" stroke-width=".55"/>` +
      `<path d="M${3 * k} 0 C${10 * k} -6 ${18 * k} -8 ${f(26 * k * pw)} -7" fill="none" stroke="${C.sand}" stroke-width=".6"/>`;
    return `<g transform="rotate(${f(rot)}) scale(${f(s * yaw)} ${f(s)})">
        ${sep(0, 27, 8.5)}${sep(148, 25, 8)}${sep(-148, 25, 8)}
        ${pet(1)}${pet(-1)}
        <circle cx="0" cy="3" r="9" fill="url(#blush_orch)"/>
        <path d="M-1 4 C-3 2 -6.5 2.5 -6.5 5.5 C-6.5 8.5 -3.5 8.5 -1 7.5 Z" fill="${C.roseHi}" stroke="${C.rose}" stroke-width=".5"/>
        <path d="M1 4 C3 2 6.5 2.5 6.5 5.5 C6.5 8.5 3.5 8.5 1 7.5 Z" fill="${C.roseHi}" stroke="${C.rose}" stroke-width=".5"/>
        <path d="M-3 8.5 C-4.5 12 -2.5 16 0 16 C2.5 16 4.5 12 3 8.5 Q0 10 -3 8.5 Z" fill="${C.rose}" stroke="${C.wineHi}" stroke-width=".5"/>
        <path d="M0 10 L0 14.5" stroke="${C.wine}" stroke-width=".5" opacity=".6"/>
        <path d="M-1 16 Q-2.5 18.5 -4.5 18 M1 16 Q2.5 18.5 4.5 18" fill="none" stroke="${C.wineHi}" stroke-width=".45"/>
        <ellipse cx="0" cy="7.5" rx="2.2" ry="1.6" fill="${C.brassHi}"/>
        <path d="M-2 6 L-5 3 M2 6 L5 3 M0 6 L0 2" stroke="${C.wine}" stroke-width=".45" opacity=".7"/>
        <ellipse cx="0" cy="1" rx="2.4" ry="4.2" fill="${C.ivory}" stroke="${C.taupeLo}" stroke-width=".45"/>
      </g>`;
  };
  // Flowers along the arch, largest first; buds at the tip. [arc length, scale]
  const total = cum[cum.length - 1];
  const blooms = [[0.03, 1.02], [0.19, 0.97], [0.35, 0.92], [0.5, 0.86], [0.63, 0.79], [0.74, 0.72]].map(([t, sc]) => [t * total, sc]);
  const parts = [];
  blooms.forEach(([sl, s], i) => {
    const p = at(sl), nx = -p.ty, ny = p.tx; // normal, pointing down/outward
    const side = i % 2 ? 1 : -1, len = 20 * s;
    const cx = p.x + nx * len + p.tx * 4 * side, cy = p.y + ny * len + p.ty * 4 * side + 8 * s;
    const rot = (r() - 0.5) * 24 + side * 6, yaw = 0.82 + r() * 0.18, pw = 0.94 + r() * 0.1;
    parts.push(
      `<path d="M${f(p.x)} ${f(p.y)} Q${f(p.x + nx * len * 0.9)} ${f(p.y + ny * len * 0.4)} ${f(cx)} ${f(cy - 10 * s)}" fill="none" stroke="${C.sageLo}" stroke-width="1.2"/>` +
        `<g transform="translate(${f(cx)} ${f(cy)})">${flower(s, rot, yaw, pw)}</g>`
    );
  });
  const buds = [[total - 30, 8.5, 7], [total - 16, 6.5, 5.5], [total - 4, 5, 4]].map(([sl, ry, rx], i) => {
    const p = at(sl), nx = -p.ty, ny = p.tx;
    const bx = p.x + nx * (6 + ry) + (i % 2 ? 4 : -4), by = p.y + ny * (6 + ry);
    return `<path d="M${f(p.x)} ${f(p.y)} Q${f(p.x + nx * 5)} ${f(p.y + ny * 5)} ${f(bx)} ${f(by - ry)}" fill="none" stroke="${C.sageLo}" stroke-width="1"/>` +
      `<ellipse cx="${f(bx)}" cy="${f(by)}" rx="${rx}" ry="${ry}" transform="rotate(${i % 2 ? -12 : 10} ${f(bx)} ${f(by)})" fill="url(#bud_orch)" stroke="${C.taupeLo}" stroke-width=".55"/>`;
  });
  const flowersSvg = [...buds.reverse(), ...parts.reverse()].join("");

  // A broad fleshy leaf: from the crown outward, tip drooping. flip -1 for the left side.
  const leaf = (len, w, ang, droop, flip, fill) => `<g transform="translate(232 444) scale(${flip} 1) rotate(${ang})">
      <path d="M0 -4 C${f(len * 0.25)} ${-w} ${f(len * 0.75)} ${f(-w * 1.05 + droop * 0.4)} ${f(len * 0.97)} ${f(droop - 2)} Q${len + 2} ${droop + 2} ${f(len * 0.93)} ${f(droop + 4)} C${f(len * 0.7)} ${f(w * 0.75 + droop * 0.4)} ${f(len * 0.25)} ${f(w * 0.7)} 0 4 Z" fill="${fill}" stroke="${C.sageLo}" stroke-width=".7"/>
      <path d="M2 0 Q${f(len * 0.55)} ${f(-w * 0.2 + droop * 0.2)} ${f(len * 0.95)} ${droop}" fill="none" stroke="${C.sageLo}" stroke-width="1.1" opacity=".8"/>
      <path d="M${f(len * 0.15)} ${f(-w * 0.32)} C${f(len * 0.35)} ${f(-w * 0.58)} ${f(len * 0.6)} ${f(-w * 0.55 + droop * 0.3)} ${f(len * 0.8)} ${f(-w * 0.25 + droop * 0.5)}" fill="none" stroke="#fff" stroke-width="2" opacity=".3" stroke-linecap="round"/>
    </g>`;
  const root = (d, [ex, ey]) => `<path d="${d}" fill="none" stroke="${C.taupe}" stroke-width="3.6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d8d5cb" stroke-width="2.4" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round" opacity=".5" transform="translate(-.5 -.6)"/><circle cx="${ex}" cy="${ey}" r="1.6" fill="${C.sage}"/>`;
  let bark = "";
  for (let i = 0; i < 18; i++) {
    const x = 204 + r() * 56, y = 440 + r() * 7;
    bark += `<rect x="${f(x)}" y="${f(y)}" width="${f(5 + r() * 6)}" height="${f(3 + r() * 3)}" rx="1" transform="rotate(${f((r() - 0.5) * 50)} ${f(x)} ${f(y)})" fill="${r() > 0.5 ? C.cognac : C.walnut}"/>`;
  }
  for (let i = 0; i < 10; i++) bark += `<circle cx="${f(204 + r() * 56)}" cy="${f(443 + r() * 5)}" r="${f(2 + r() * 2.5)}" fill="${r() > 0.5 ? C.sage : C.sageLo}" opacity=".9"/>`;

  scenes["orchid.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="panel_orch" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="${C.sand}"/><stop offset="1" stop-color="${C.champagne}"/></linearGradient>
      <radialGradient id="petal_orch" cx=".3" cy=".4" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></radialGradient>
      <linearGradient id="sepal_orch" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      <linearGradient id="bud_orch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset=".6" stop-color="${C.roseHi}"/><stop offset="1" stop-color="${C.sage}"/></linearGradient>
      <radialGradient id="blush_orch"><stop offset="0" stop-color="${C.rose}" stop-opacity=".8"/><stop offset="1" stop-color="${C.roseHi}" stop-opacity="0"/></radialGradient>
      <linearGradient id="leaf_orch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93a07f"/><stop offset=".5" stop-color="${C.sage}"/><stop offset="1" stop-color="${C.sageLo}"/></linearGradient>
      <linearGradient id="leafback_orch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sage}"/><stop offset="1" stop-color="${C.sageLo}"/></linearGradient>
      <linearGradient id="vase_orch" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cognac}"/><stop offset=".35" stop-color="${C.walnut}"/><stop offset="1" stop-color="${C.espresso}"/></linearGradient>
      <linearGradient id="stake_orch" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset="1" stop-color="${C.brass}"/></linearGradient>
      <linearGradient id="shelf_orch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      ${texture("brush_orch", ".01 .35", [0.2, 0.12, 0.08], 0.35, 4, 3)}
      ${texture("silk_orch", ".5 .02", [0.55, 0.45, 0.32], 0.1, 9, 2)}
    </defs>
    <rect x="44" y="34" width="372" height="466" fill="url(#panel_orch)"/>
    <rect x="44" y="34" width="372" height="466" filter="url(#silk_orch)" fill="#000"/>
    <rect x="44" y="34" width="372" height="466" fill="none" stroke="${C.brass}" stroke-width="1"/>
    <rect x="56" y="46" width="348" height="454" fill="none" stroke="${C.brass}" stroke-width=".5" stroke-opacity=".7"/>
    <!-- shelf -->
    <rect x="20" y="500" width="420" height="14" fill="url(#shelf_orch)"/>
    ${line(20, 500, 440, 500, { color: C.brass, w: 1 })}${line(20, 514, 440, 514, { color: C.taupe, w: 0.6 })}
    <!-- pot with bark and moss -->
    ${contact(232, 500, 40, 2, 0.12)}
    <path d="M200 450 L264 450 L258 500 L206 500 Z" fill="url(#vase_orch)"/>
    <path d="M200 450 L264 450 L258 500 L206 500 Z" filter="url(#brush_orch)" fill="#000"/>
    <rect x="208" y="456" width="3" height="40" fill="#fff" opacity=".12"/>
    ${bark}
    <rect x="198" y="447" width="68" height="5" rx="1" fill="${C.brass}"/>
    ${line(198, 447.5, 266, 447.5, { color: C.brassHi, w: 0.8 })}
    <!-- stake, stem, clips -->
    <rect x="243" y="226" width="2.4" height="222" rx="1.2" fill="url(#stake_orch)"/>
    ${[300, 372].map((y) => line(243, y, 245.4, y, { color: C.brassLo, w: 0.8 })).join("")}
    <path d="${stemD}" fill="none" stroke="${C.sageLo}" stroke-width="2.4" stroke-linecap="round"/>
    ${[262, 340].map((y) => `<rect x="237" y="${y - 2.5}" width="11" height="5" rx="2.5" fill="${C.brassHi}" stroke="${C.brassLo}" stroke-width=".6"/>${line(239.5, y, 245.5, y, { color: C.brassLo, w: 0.5 })}`).join("")}
    <!-- leaves: two behind, two in front -->
    ${leaf(76, 17, -24, 10, -1, "url(#leafback_orch)")}
    ${leaf(70, 16, -30, 10, 1, "url(#leafback_orch)")}
    ${root("M240 447 C252 442 262 440 272 444", [272, 444])}
    ${leaf(110, 24, 0, 20, -1, "url(#leaf_orch)")}
    ${leaf(120, 26, -7, 16, 1, "url(#leaf_orch)")}
    ${root("M226 451 C214 451 204 455 202 466 C200 476 196 482 194 490", [194, 490])}
    ${root("M248 452 C258 452 266 456 268 464 C269 470 274 474 278 476", [278, 476])}
    <!-- flowers -->
    ${flowersSvg}`
  );
}

// 5. The suite's touch tablet in its brass dock: seat modes, do not disturb, lights, temperature.
{
  const W = 600, H = 420;
  const sx = 152, sy = 152, tw = 66, th = 76, gap = 8;
  const ink = (d, sel) => `<path d="${d}" fill="none" stroke="${sel ? C.ivory : C.espresso}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const modes = [
    ["UPRIGHT", (x, y) => ink(`M${x + 24} ${y + 14} L${x + 27} ${y + 40} L${x + 44} ${y + 40} L${x + 46} ${y + 52}`) + `<rect x="${x + 21}" y="${y + 6}" width="7" height="8" rx="2.5" fill="none" stroke="${C.espresso}" stroke-width="1.1"/>`],
    ["LOUNGE", (x, y) => ink(`M${x + 14} ${y + 20} L${x + 27} ${y + 42} L${x + 43} ${y + 40} L${x + 54} ${y + 33}`, true) + `<rect x="${x + 8}" y="${y + 12}" width="7" height="8" rx="2.5" transform="rotate(-30 ${x + 11} ${y + 16})" fill="none" stroke="${C.ivory}" stroke-width="1.1"/>`],
    ["BED", (x, y) => ink(`M${x + 10} ${y + 40} L${x + 56} ${y + 40}`) + `<rect x="${x + 10}" y="${y + 33}" width="12" height="5" rx="2.5" fill="none" stroke="${C.espresso}" stroke-width="1.1"/>`],
  ];
  let tiles = "";
  modes.forEach(([label, icon], i) => {
    const x = sx + i * (tw + gap), sel = i === 1;
    tiles += `<rect x="${x}" y="${sy}" width="${tw}" height="${th}" rx="8" fill="${sel ? C.slate : "#fff"}" stroke="${sel ? C.slate : C.sand}" stroke-width="${sel ? 1.1 : 0.9}"/>`;
    tiles += icon(x, sy);
    tiles += line(x + 8, sy + 54 + 0.5, x + tw - 8, sy + 54 + 0.5, { color: sel ? C.slateHi : C.sand, w: 0.6 });
    tiles += `<text x="${x + tw / 2}" y="${sy + 68}" text-anchor="middle" font-family="${SANS}" font-size="6" letter-spacing="2" fill="${sel ? C.ivory : C.espresso}">${label}</text>`;
  });
  scenes["seat-controls.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="body_ctrl" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="dock_ctrl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".5" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
      <linearGradient id="desk_ctrl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.champagne}"/><stop offset="1" stop-color="${C.champagneLo}"/></linearGradient>
      ${texture("brush_ctrl", ".02 .9", [0.4, 0.3, 0.18], 0.3, 3, 2)}
      ${texture("leather_ctrl", ".55", [0.45, 0.36, 0.26], 0.15, 2)}
    </defs>
    <!-- console surface -->
    <rect y="338" width="${W}" height="${H - 338}" fill="url(#desk_ctrl)"/>
    <rect y="338" width="${W}" height="${H - 338}" filter="url(#leather_ctrl)" fill="#000"/>
    ${line(0, 338, W, 338, { color: C.brass, w: 1 })}
    ${line(0, 350, W, 350, { color: C.taupeLo, w: 0.6, o: 0.6 })}
    <!-- dock -->
    ${contact(300, 340, 150, 2, 0.12)}
    <path d="M150 340 L160 312 L440 312 L450 340 Z" fill="url(#dock_ctrl)"/>
    <path d="M150 340 L160 312 L440 312 L450 340 Z" filter="url(#brush_ctrl)" fill="#000"/>
    ${line(160, 312.5, 440, 312.5, { color: C.brassHi, w: 1 })}
    <!-- tablet -->
    <rect x="120" y="86" width="360" height="236" rx="22" fill="url(#body_ctrl)" stroke="${C.taupe}" stroke-width="1"/>
    <rect x="120" y="86" width="360" height="236" rx="22" fill="none" stroke="${C.brass}" stroke-width=".6" stroke-opacity=".6"/>
    <rect x="136" y="102" width="328" height="204" rx="12" fill="${C.ivory}" stroke="${C.taupe}" stroke-width=".8"/>
    <circle cx="300" cy="94" r="1.6" fill="${C.taupe}"/>
    <!-- header -->
    <g font-family="${SANS}" font-size="7" letter-spacing="3">
      <text x="152" y="126" fill="${C.slate}">SUITE 1A</text>
      <text x="448" y="126" text-anchor="end" fill="${C.espresso}" opacity=".7">14:20</text>
    </g>
    ${line(152, 136.5, 448, 136.5, { color: C.sand, w: 0.8 })}
    ${tiles}
    <!-- temperature -->
    <text x="412" y="164" text-anchor="middle" font-family="${SANS}" font-size="6" letter-spacing="2.5" fill="${C.espresso}" opacity=".7">CABIN</text>
    <text x="412" y="200" text-anchor="middle" font-family="${SERIF}" font-size="34" fill="${C.espresso}">21°</text>
    <circle cx="392" cy="216" r="8" fill="none" stroke="${C.sand}" stroke-width=".9"/>${line(388, 216, 396, 216, { color: C.espresso, w: 1 })}
    <circle cx="432" cy="216" r="8" fill="none" stroke="${C.sand}" stroke-width=".9"/>${line(428, 216, 436, 216, { color: C.espresso, w: 1 })}${line(432, 212, 432, 220, { color: C.espresso, w: 1 })}
    ${line(372, 152, 372, 228, { color: C.sand, w: 0.8 })}
    <!-- do not disturb -->
    ${line(152, 244.5, 448, 244.5, { color: C.sand, w: 0.8 })}
    <text x="152" y="266" font-family="${SANS}" font-size="6.5" letter-spacing="2.5" fill="${C.espresso}">DO NOT DISTURB</text>
    <rect x="152" y="276" width="34" height="16" rx="8" fill="${C.wine}"/>
    <circle cx="178" cy="284" r="6" fill="#fff"/>
    <circle cx="198" cy="284" r="3" fill="${C.sage}"/>
    <text x="206" y="286.5" font-family="${SANS}" font-size="6" letter-spacing="2" fill="${C.sageLo}">ON</text>
    <!-- lights -->
    ${line(286, 252, 286, 296, { color: C.sand, w: 0.8 })}
    <text x="302" y="266" font-family="${SANS}" font-size="6.5" letter-spacing="2.5" fill="${C.espresso}">LIGHTS</text>
    <text x="448" y="266" text-anchor="end" font-family="${SANS}" font-size="6.5" letter-spacing="1.5" fill="${C.slate}">60%</text>
    <circle cx="308" cy="284" r="3" fill="none" stroke="${C.espresso}" stroke-width=".9"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const r = (a * Math.PI) / 180; return line(308 + 5 * Math.cos(r), 284 + 5 * Math.sin(r), 308 + 7 * Math.cos(r), 284 + 7 * Math.sin(r), { color: C.espresso, w: 0.8 }); }).join("")}
    ${line(324, 284, 448, 284, { color: C.sand, w: 1.6 })}
    ${line(324, 284, 398, 284, { color: C.slate, w: 1.6 })}
    <circle cx="398" cy="284" r="5" fill="#fff" stroke="${C.slate}" stroke-width="1"/>`
  );
}

// 6. Texture: cognac leather, diamond quilting above a double-stitched seam, stitched in cream.
{
  const W = 500, H = 500, seam = 352, s = 64;
  let diamonds = "", grooves = "", stitches = "";
  for (let j = -1; j <= Math.ceil(seam / (s / 2)) + 1; j++)
    for (let i = -1; i <= W / s + 1; i++) {
      const cx = s / 2 + i * s + (j % 2 ? s / 2 : 0), cy = (j * s) / 2;
      diamonds += `<polygon points="${cx - s / 2},${cy} ${cx},${cy - s / 2} ${cx + s / 2},${cy} ${cx},${cy + s / 2}" fill="url(#puff_leather)"/>`;
    }
  for (let c = -W; c <= W + seam; c += s) {
    for (const [x1, y1, x2, y2] of [[c, 0, c - seam, seam], [c - W, 0, c - W + seam, seam]]) {
      grooves += line(x1, y1, x2, y2, { color: C.espresso, w: 3, o: 0.3 });
      stitches += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.cream}" stroke-width="1" stroke-dasharray="4 2.6"/>`;
    }
  }
  scenes["leather-stitch.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="base_leather" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cognacHi}"/><stop offset=".55" stop-color="${C.cognac}"/><stop offset="1" stop-color="${C.cognac}"/></linearGradient>
      <radialGradient id="puff_leather" cx=".42" cy=".4" r=".62" fx=".36" fy=".32"><stop offset="0" stop-color="${C.cognacHi}" stop-opacity=".55"/><stop offset=".55" stop-color="${C.cognacHi}" stop-opacity=".08"/><stop offset="1" stop-color="${C.espresso}" stop-opacity=".28"/></radialGradient>
      <linearGradient id="seam_leather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.espresso}" stop-opacity="0"/><stop offset=".5" stop-color="${C.espresso}" stop-opacity=".3"/><stop offset="1" stop-color="${C.espresso}" stop-opacity="0"/></linearGradient>
      ${texture("grain_leather", ".7", [0.25, 0.13, 0.06], 0.25, 11, 3)}
      <clipPath id="quilt_leather"><rect width="${W}" height="${seam}"/></clipPath>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#base_leather)"/>
    <g clip-path="url(#quilt_leather)">${diamonds}${grooves}${stitches}</g>
    <rect y="${seam - 6}" width="${W}" height="12" fill="url(#seam_leather)"/>
    ${line(0, seam, W, seam, { color: C.espresso, w: 1.2, o: 0.7 })}
    ${line(0, seam + 1.5, W, seam + 1.5, { color: C.cognacHi, w: 1, o: 0.8 })}
    <line x1="0" y1="${seam - 9}" x2="${W}" y2="${seam - 9}" stroke="${C.cream}" stroke-width="1.1" stroke-dasharray="5 3"/>
    <line x1="0" y1="${seam + 10}" x2="${W}" y2="${seam + 10}" stroke="${C.cream}" stroke-width="1.1" stroke-dasharray="5 3"/>
    <rect y="${seam + 4}" width="${W}" height="${H - seam - 4}" fill="${C.cognacHi}" opacity=".12"/>
    <rect width="${W}" height="${H}" filter="url(#grain_leather)" fill="#000"/>`,
    { grain: 0.03 }
  );
}

// 7. Texture: pale walnut veneer, book-matched either side of a thin inlaid brass strip.
{
  const W = 600, H = 420, X = 372, cx = 190;
  const r = rng(707);
  let grain = "";
  // Flat-cut walnut: long grain lines that rise into nested cathedral arches near the middle.
  for (let i = 0; i < 90; i++) {
    const y0 = i * 7 + r() * 3, k = Math.max(0, y0 - 110), K = Math.min(k, 230) * 0.72, w = 40 + Math.min(k, 230) * 1.1;
    const a = 1.5 + r() * 2.5, ph = r() * 6;
    let d = "";
    for (let x = -12; x <= X + 12; x += 12) {
      const u = Math.abs(x - cx - i * 0.5) / w, g = u < 1 ? (1 - u ** 1.25) ** 1.8 : 0;
      d += `${x === -12 ? "M" : ""}${x} ${f(y0 - K * g + a * Math.sin(x * 0.012 + ph) + (x / X) * 6)} `;
    }
    const band = r() < 0.18;
    grain += `<path d="${d}" fill="none" stroke="${C.walnut}" stroke-width="${band ? f(3 + r() * 4) : f(0.5 + r() * 1.1)}" stroke-opacity="${band ? f(0.07 + r() * 0.06) : f(0.14 + r() * 0.2)}"/>`;
  }
  let pd = "";
  for (let i = 0; i < 80; i++) pd += `M${f(r() * X)} ${f(r() * H)}h${f(3 + r() * 6)}`;
  const pores = `<path d="${pd}" fill="none" stroke="${C.walnut}" stroke-width=".6" stroke-opacity=".28"/>`;
  scenes["wood-veneer.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="base_veneer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b89679"/><stop offset="1" stop-color="#a48266"/></linearGradient>
      <linearGradient id="inlay_veneer" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.brassHi}"/><stop offset=".5" stop-color="${C.brass}"/><stop offset="1" stop-color="${C.brassLo}"/></linearGradient>
      <linearGradient id="sheen_veneer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
      ${texture("streak_veneer", ".004 .16", [0.36, 0.25, 0.17], 0.3, 7, 3)}
      <clipPath id="left_veneer"><rect width="${X}" height="${H}"/></clipPath>
      <g id="half_veneer"><rect width="${X}" height="${H}" fill="url(#base_veneer)"/><rect width="${X}" height="${H}" filter="url(#streak_veneer)" fill="#000"/>${grain}${pores}</g>
    </defs>
    <g clip-path="url(#left_veneer)"><use href="#half_veneer"/></g>
    <g transform="translate(${2 * X + 4} 0) scale(-1 1)"><g clip-path="url(#left_veneer)"><use href="#half_veneer"/></g></g>
    <rect width="${W}" height="${H}" fill="url(#sheen_veneer)"/>
    <rect x="${X}" y="0" width="4" height="${H}" fill="url(#inlay_veneer)"/>
    ${line(X - 0.3, 0, X - 0.3, H, { color: C.walnut, w: 0.6, o: 0.6 })}${line(X + 4.3, 0, X + 4.3, H, { color: C.walnut, w: 0.6, o: 0.6 })}
    ${line(X + 1, 0, X + 1, H, { color: "#fff", w: 0.6, o: 0.5 })}`,
    { grain: 0.03 }
  );
}

// 8. Texture: brushed brass plate with an engraved hairline and a soft highlight band.
{
  const W = 600, H = 400, ey = 268;
  scenes["brushed-brass.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="plate_brass" x1="0" y1=".1" x2="1" y2=".9"><stop offset="0" stop-color="${C.brass}"/><stop offset=".36" stop-color="#c3a170"/><stop offset=".48" stop-color="#e2cca2"/><stop offset=".6" stop-color="#c09d6a"/><stop offset="1" stop-color="#9a7843"/></linearGradient>
      ${texture("brush_brass", ".003 .9", [0.4, 0.29, 0.15], 0.45, 3, 2)}
      ${texture("brushhi_brass", ".006 1.2", [1, 0.97, 0.9], 0.3, 8, 2)}
    </defs>
    <rect width="${W}" height="${H}" fill="url(#plate_brass)"/>
    <rect width="${W}" height="${H}" filter="url(#brush_brass)" fill="#000"/>
    <rect width="${W}" height="${H}" filter="url(#brushhi_brass)" fill="#000"/>
    ${line(0, ey, W, ey, { color: C.brassLo, w: 1, o: 1 })}
    ${line(0, ey + 1.1, W, ey + 1.1, { color: C.brassHi, w: 0.8, o: 0.9 })}`,
    { grain: 0.025, light: true }
  );
}

// 9. Texture: the duvet's ivory linen, folded back over itself, close up.
{
  const W = 600, H = 420;
  const E = "M0 318 C150 300, 250 268, 350 222 S520 136, 600 112"; // the fold edge
  const top = `${E} L600 0 L0 0 Z`; // the folded-over layer, upper left
  const soft = (d, o, w = 5) => `<path d="${d}" fill="none" stroke="${C.taupe}" stroke-width="${w}" opacity="${f(o * 0.6)}" filter="url(#b3_linen)"/><path d="${d}" fill="none" stroke="#fff" stroke-width="2.4" opacity="${Math.min(1, o + 0.3)}" filter="url(#b1_linen)" transform="translate(-2 -2)"/>`;
  scenes["linen-fold.svg"] = svg(
    W,
    H,
    `<defs>
      <linearGradient id="under_linen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <linearGradient id="over_linen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset="1" stop-color="${C.cream}"/></linearGradient>
      ${texture("warp_linen", ".9 .06", [0.55, 0.47, 0.38], 0.13, 2, 2)}
      ${texture("weft_linen", ".06 .9", [0.55, 0.47, 0.38], 0.11, 5, 2)}
      ${blur("b1_linen", 1.2)}${blur("b3_linen", 3)}${blur("b6_linen", 6)}
      <clipPath id="top_linen"><path d="${top}"/></clipPath>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#under_linen)"/>
    ${soft("M330 400 C400 340, 470 300, 600 270", 0.45, 7)}${soft("M120 420 C170 390, 230 370, 300 352", 0.35, 6)}${soft("M470 420 C520 380, 560 360, 600 350", 0.3, 5)}
    <path d="${E}" fill="none" stroke="${C.taupe}" stroke-width="12" opacity=".42" filter="url(#b6_linen)" transform="translate(7 10)"/>
    <path d="${E}" fill="none" stroke="${C.taupe}" stroke-width="3" opacity=".25" filter="url(#b3_linen)" transform="translate(2 3)"/>
    <path d="${top}" fill="url(#over_linen)"/>
    <g clip-path="url(#top_linen)">
      ${soft("M60 70 C120 140, 160 220, 200 296", 0.5, 7)}${soft("M250 40 C290 110, 310 170, 330 232", 0.4, 6)}${soft("M420 0 C440 60, 460 110, 480 168", 0.35, 5)}${soft("M0 200 C40 230, 80 260, 110 306", 0.3, 5)}
      <path d="${E}" fill="none" stroke="#fff" stroke-width="18" opacity=".95" filter="url(#b3_linen)" transform="translate(-8 -14)"/>
      <path d="${E}" fill="none" stroke="${C.taupe}" stroke-width="7" opacity=".5" filter="url(#b3_linen)" transform="translate(-1 -1)"/>
    </g>
    <path d="${E}" fill="none" stroke="${C.taupeLo}" stroke-width=".8"/>
    <!-- embroidered bordeaux border band on the turned-back hem -->
    <path d="${E}" fill="none" stroke="${C.wine}" stroke-width="5" transform="translate(-15 -32)"/>
    <path d="${E}" fill="none" stroke="${C.wineHi}" stroke-width=".6" stroke-dasharray="1.6 1.6" transform="translate(-15 -32)"/>
    <path d="${E}" fill="none" stroke="${C.wine}" stroke-width=".7" transform="translate(-14 -25)"/>
    <path d="${E}" fill="none" stroke="${C.wine}" stroke-width=".7" transform="translate(-16 -39)"/>
    <rect width="${W}" height="${H}" filter="url(#warp_linen)" fill="#000"/>
    <rect width="${W}" height="${H}" filter="url(#weft_linen)" fill="#000"/>`,
    { grain: 0.025 }
  );
}
