// Generates the agent-drawn SVG artifacts for the "Process Through the Airport" mood board.
// Run: node scripts/through-the-airport/generate.mjs  → public/mood-boards/through-the-airport/
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { scenes as landside } from "./scenes-landside.mjs";
import { scenes as airside } from "./scenes-airside.mjs";
import { scenes as gate } from "./scenes-gate.mjs";
import { scenes as airfield } from "./scenes-airfield.mjs";
import { scenes as pov } from "./scenes-pov.mjs";

const OUT = new URL("../../public/mood-boards/through-the-airport/", import.meta.url);
const all = { ...landside, ...airside, ...gate, ...airfield, ...pov };

mkdirSync(OUT, { recursive: true });
for (const old of readdirSync(OUT)) if (!(old in all)) rmSync(new URL(old, OUT));
for (const [name, content] of Object.entries(all)) writeFileSync(new URL(name, OUT), content);
console.log(`wrote ${Object.keys(all).length} files`);
