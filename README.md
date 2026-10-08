# Flight Log — hw2-dbs

A personal, historical flight tracker: every place I've flown, plotted on a world map, with the trips behind them.

Built for **Design, Build, Ship (MPCS 51238) — Assignment 2: UI/UX & Visual Design**.

- **Live hub:** _TBD — Vercel URL_
- **Repo:** https://github.com/neilpandya01/hw2-dbs

## Who it's for

_TBD — e.g. me, looking back at where I've been; friends asking "where have you traveled?"_

## Site map

| Route | What it is |
| --- | --- |
| `/` | The hub: links to the three mood boards, three design systems, and the site |
| `/mood-boards/[mood]` | Mood board, 25–30 artifacts per mood |
| `/design-systems/[mood]` | UI library built from that mood board, components in every state |
| `/flight-log` | The flight tracker, in the chosen style |

## Moods

> Rename the moods in [`lib/moods.ts`](lib/moods.ts). Routes and hub links are generated from it.

### Mood 1 — Mid Flight

_Flying in the night, from the window seat._ The cabin lights are dimmed to blue, rows of seats stretch back forever, and through the window tiny towns glow far below.

- **Keywords:** Nocturnal · Hushed · Nostalgic
- **Palette:** cabin dark `#05070f`, night navy `#0b1330`, seat blue `#1a2752`, LED strip `#5b8cff`, aisle light `#7fd3ff`, reading lamp `#ffc979` (the one warm color)
- **Type:** DM Sans Light for display/body, DM Mono for flight data labels
- **References / inspiration:** red-eye flights, blue LED cabin mood lighting, the seatback flight-progress map, city lights from 35,000 ft
- **Why it might fit a flight log:** it's the feeling of actually being on the flights being logged — quiet, reflective, looking back at where you've been
- **Artifacts:** 28 SVG illustrations drawn by the agent (`node scripts/mid-flight/generate.mjs` → `public/mood-boards/mid-flight/`)
- **Design system:** `/design-systems/mid-flight` — color roles with contrast ratios, type roles, spacing & shape, components, control states, UI states. Components live in `components/ui/mid-flight/` so the site can reuse them.

### Mood 2 — First Suite

_A private suite at the front of the plane._ Modern first suites (Emirates, Singapore Suites, Etihad Residence): sliding doors closed, the bed made with a duvet, pajamas folded on top, a big personal screen, a vanity mirror, an amenity kit, and a sommelier pour.

- **Keywords:** Private · Polished · Quiet luxury
- **Palette:** neutrals: off-white `#f4eee4` (background), ivory `#fbf8f2` (surface), champagne `#dcc7a4`, taupe `#a49180` (borders), brass `#a8844f` (lines, focus), walnut `#6b4a36`, espresso `#3b2a20` (text). Accents, each from an object in the suite: bordeaux `#6e2a34` (wine, primary action), slate `#3e4c5e` (passport, links), sage `#55644a` (orchid leaves, success), cognac `#9c5b34` (leather, warning), terracotta `#a6432f` (error), dusty rose `#c39a92` (textiles, highlight)
- **Type:** Jost Light (thin geometric sans) for body and labels, Cormorant Garamond Light for headings
- **Contrast with Mid Flight:** soft, bright and spacious instead of dark and glowing. Thin lines, lots of whitespace, almost no shadows
- **Artifacts:** 29, in the order of the trip (curb → lounge → jet bridge → suite → dinner → night), all SVG illustrations drawn by the agent (`node scripts/first-suite/generate.mjs` → `public/mood-boards/first-suite/`)
- **Why it might fit a flight log:** _TBD_
- **Design system:** `/design-systems/first-suite`, with the same six sections and component list as Mid Flight, restyled. Square tailored corners, 1px lines instead of shadows (a double rule on the modal, an inner rule on primary hover), tracked-caps actions, a deep-brass focus ring, espresso for selected, and bordeaux kept for the primary action. Components live in `components/ui/first-suite/`.

### Mood 3 — _Name TBD_

- **Keywords:** _TBD · TBD · TBD_
- **Palette:** _TBD_
- **Type:** _TBD_
- **References / inspiration:** _TBD_
- **Why it might fit a flight log:** _TBD_

### Chosen style

_TBD: which mood the Flight Log uses, and why it fits the site and the people who'd use it._

## Site features

- [ ] World map of visited airports / flight routes (static SVG, no map APIs)
- [ ] Summary stats (flights, countries, airports, distance)
- [ ] Interaction 1: _TBD (e.g. filter by year / region)_
- [ ] Interaction 2: _TBD (e.g. destination detail panel)_
- [ ] Responsive at 390px (mobile) and 1440px (desktop)

## Design decisions

_TBD: what people see first, how they know what's clickable, what each state tells them._

## How I used the agent

_TBD: what I asked for, where I pushed back, what I decided myself._

## Tech stack

Next.js (App Router) + Tailwind CSS v4, exported as a **static site** (`output: "export"` in `next.config.ts`). No database, accounts, external APIs, or storage. Flight data lives in [`data/flights.ts`](data/flights.ts). Deployed on Vercel's Hobby plan.

```
app/                  routes (hub, mood-boards, design-systems, flight-log)
components/hub/       hub sections
components/mood-board/
components/design-system/
components/flight-log/
lib/moods.ts          the three moods (names, slugs, swatches)
data/flights.ts       static flight + airport data
```

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static output in /out
```
