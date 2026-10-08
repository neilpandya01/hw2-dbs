// Out on the airfield and back in through arrivals: the stand from above, the
// runway hold sign, taxiway signs at night, the marshaller, a bag container,
// the tail, the carousel, and the way out.
import { f, C, COND, t, rect, line, svg, picto, arrow, panel, hazard } from "./lib.mjs";

export const scenes = {};

// 27. Runway holding position: the red sign, the yellow location sign, the hold bars.
{
  const W = 760, H = 460, base = 270;
  let holdLines = "";
  for (let i = 0; i < 2; i++) holdLines += rect(0, 360 + i * 20, W, 8, C.yellow);
  for (let i = 0; i < 2; i++) for (let x = 0; x < W; x += 64) holdLines += rect(x, 410 + i * 20, 40, 8, C.yellow);
  scenes["hold-sign.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, base, "#dfe6ea")}
    ${rect(0, base - 30, W, 30, "#7f8a6a")}
    ${rect(0, base, W, H - base, C.asphalt)}
    ${rect(0, base + 2, W, 3, C.white, { o: 0.4 })}
    ${holdLines}
    <!-- legs -->
    ${[140, 360, 600].map((x) => rect(x, 220, 14, 70, C.steel)).join("")}
    <!-- the sign: location B | runway 27L-9R -->
    ${rect(80, 80, 600, 150, C.sign, { r: 6 })}
    ${rect(96, 96, 150, 118, C.sign)}${rect(104, 104, 134, 102, "none", { stroke: C.yellow, sw: 6 })}
    ${t(171, 192, "B", { size: 100, fill: C.yellow, anchor: "middle" })}
    ${rect(258, 96, 406, 118, C.red)}
    ${t(461, 192, "27L-9R", { size: 96, fill: C.white, anchor: "middle", len: 360 })}
    <!-- small runway-ahead caution above the sky line -->
    ${t(W - 24, 40, "HOLD SHORT", { size: 18, fill: C.sign, anchor: "end", ls: 4 })}`,
  );
}

// 29. The marshaller, seen from the cockpit: hi-vis vest, ear defenders, wands up.
{
  const W = 560, H = 760, cx = 280;
  scenes["marshaller.svg"] = svg(
    W,
    H,
    `${rect(0, 0, W, 500, "#dfe6ea")}
    <!-- behind them, the terminal and the gate we're being guided into -->
    ${rect(0, 300, W, 200, C.concrete)}${rect(0, 340, W, 110, C.glass)}
    ${Array.from({ length: 8 }, (_, i) => rect(i * 80, 340, 5, 110, C.glassLo)).join("")}
    ${rect(0, 300, W, 12, C.sign)}
    ${panel(450, 216, 100, 60)}${t(500, 260, "B22", { size: 36, fill: C.yellow, anchor: "middle" })}${rect(497, 276, 6, 24, C.steelLo)}
    ${rect(0, 500, W, H - 500, C.asphalt)}
    ${rect(cx - 4, 500, 8, H - 500, C.yellow)}
    <!-- legs -->
    ${rect(cx - 56, 520, 48, 190, C.sign, { r: 8 })}${rect(cx + 8, 520, 48, 190, C.sign, { r: 8 })}
    ${rect(cx - 56, 640, 48, 10, C.steelHi)}${rect(cx + 8, 640, 48, 10, C.steelHi)}
    ${rect(cx - 66, 700, 64, 24, C.sign, { r: 8 })}${rect(cx + 2, 700, 64, 24, C.sign, { r: 8 })}
    <!-- arms up, wands up -->
    <path d="M${cx - 70} 330 L${cx - 140} 200 L${cx - 130} 110" fill="none" stroke="${C.orange}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${cx + 70} 330 L${cx + 140} 200 L${cx + 130} 110" fill="none" stroke="${C.orange}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    ${rect(cx - 152, 248, 34, 10, C.steelHi, { r: 2 })}${rect(cx + 118, 248, 34, 10, C.steelHi, { r: 2 })}
    <circle cx="${cx - 130}" cy="104" r="18" fill="${C.skin}"/><circle cx="${cx + 130}" cy="104" r="18" fill="${C.skin}"/>
    ${rect(cx - 140, -10, 22, 116, C.orange, { r: 8 })}${rect(cx + 118, -10, 22, 116, C.orange, { r: 8 })}
    ${rect(cx - 140, 74, 22, 20, C.sign, { r: 3 })}${rect(cx + 118, 74, 22, 20, C.sign, { r: 3 })}
    <!-- vest -->
    <path d="M${cx - 86} 300 Q${cx - 86} 270 ${cx - 56} 266 L${cx + 56} 266 Q${cx + 86} 270 ${cx + 86} 300 L${cx + 80} 540 L${cx - 80} 540 Z" fill="${C.orange}"/>
    ${rect(cx - 84, 400, 168, 16, C.steelHi)}${rect(cx - 82, 460, 164, 16, C.steelHi)}
    ${rect(cx - 52, 266, 14, 274, C.steelHi)}${rect(cx + 38, 266, 14, 274, C.steelHi)}
    ${rect(cx - 30, 300, 60, 24, C.sign)}${t(cx, 318, "RAMP", { size: 16, anchor: "middle", ls: 2 })}
    <!-- head, ear defenders -->
    ${rect(cx - 16, 236, 32, 34, C.skinLo)}
    <circle cx="${cx}" cy="210" r="38" fill="${C.skin}"/>
    <path d="M${cx - 40} 200 Q${cx} 150 ${cx + 40} 200" fill="none" stroke="${C.sign}" stroke-width="9"/>
    ${rect(cx - 52, 192, 22, 40, C.sign, { r: 8 })}${rect(cx + 30, 192, 22, 40, C.sign, { r: 8 })}
    ${rect(cx - 36, 186, 72, 14, C.yellow, { r: 4 })}`,
  );
}
