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

### Mood 1 — _Name TBD_

- **Keywords:** _TBD · TBD · TBD_
- **Palette:** _TBD_
- **Type:** _TBD_
- **References / inspiration:** _TBD_
- **Why it might fit a flight log:** _TBD_

### Mood 2 — _Name TBD_

- **Keywords:** _TBD · TBD · TBD_
- **Palette:** _TBD_
- **Type:** _TBD_
- **References / inspiration:** _TBD_
- **Why it might fit a flight log:** _TBD_

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
