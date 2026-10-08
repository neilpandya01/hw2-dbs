// The three visual styles explored in this assignment.
// Rename slugs/names here once the moods are decided — every route,
// hub link, and static page is generated from this list.
export type Mood = {
  slug: string;
  name: string;
  keywords: string[];
  swatches: string[]; // a few hex colors previewed on the hub
};

export const moods: Mood[] = [
  {
    slug: "mid-flight",
    name: "Mid Flight",
    keywords: ["Nocturnal", "Hushed", "Nostalgic"],
    swatches: ["#05070f", "#0b1330", "#1a2752", "#5b8cff", "#7fd3ff", "#ffc979"],
  },
  {
    slug: "first-suite",
    name: "First Suite",
    keywords: ["Private", "Polished", "Quiet luxury"],
    swatches: ["#f4eee4", "#dcc7a4", "#a8844f", "#6e2a34", "#3e4c5e", "#55644a", "#3b2a20"],
  },
  {
    slug: "through-the-airport",
    name: "Process Through the Airport",
    keywords: ["Legible", "Systematic", "Loud"],
    swatches: ["#111214", "#ffcc00", "#ffffff", "#e9e8e4", "#16793c", "#ff8a00", "#c8261f", "#1d5fd1"],
  },
];

export function getMood(slug: string): Mood | undefined {
  return moods.find((m) => m.slug === slug);
}
