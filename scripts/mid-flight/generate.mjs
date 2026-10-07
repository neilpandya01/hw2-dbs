// Generates the agent-drawn SVG artifacts for the "Mid Flight" mood board.
// Run: node scripts/mid-flight/generate.mjs  → public/mood-boards/mid-flight/
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { scenes as views } from "./scenes-views.mjs";
import { scenes as cabin } from "./scenes-cabin.mjs";
import { scenes as things } from "./scenes-things.mjs";

const OUT = new URL("../../public/mood-boards/mid-flight/", import.meta.url);
const all = { ...views, ...cabin, ...things };

mkdirSync(OUT, { recursive: true });
for (const old of readdirSync(OUT)) if (!(old in all)) rmSync(new URL(old, OUT));
for (const [name, content] of Object.entries(all)) writeFileSync(new URL(name, OUT), content);
console.log(`wrote ${Object.keys(all).length} files`);
