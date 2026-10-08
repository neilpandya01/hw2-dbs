// Generates the agent-drawn SVG artifacts for the "First Suite" mood board.
// Run: node scripts/first-suite/generate.mjs  → public/mood-boards/first-suite/
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { scenes as suite } from "./scenes-suite.mjs";
import { scenes as dining } from "./scenes-dining.mjs";
import { scenes as things } from "./scenes-things.mjs";
import { scenes as journey } from "./scenes-journey.mjs";

const OUT = new URL("../../public/mood-boards/first-suite/", import.meta.url);
const all = { ...suite, ...dining, ...things, ...journey };

mkdirSync(OUT, { recursive: true });
for (const old of readdirSync(OUT)) if (!(old in all)) rmSync(new URL(old, OUT));
for (const [name, content] of Object.entries(all)) writeFileSync(new URL(name, OUT), content);
console.log(`wrote ${Object.keys(all).length} files`);
