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
  { slug: "mood-1", name: "Mood 1", keywords: ["TBD", "TBD", "TBD"], swatches: [] },
  { slug: "mood-2", name: "Mood 2", keywords: ["TBD", "TBD", "TBD"], swatches: [] },
  { slug: "mood-3", name: "Mood 3", keywords: ["TBD", "TBD", "TBD"], swatches: [] },
];

export function getMood(slug: string): Mood | undefined {
  return moods.find((m) => m.slug === slug);
}
