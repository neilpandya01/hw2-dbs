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
- **Design system:** `/design-systems/mid-flight`: color roles with contrast ratios, type roles, spacing & shape, components, control states, UI states. Components live in `components/ui/mid-flight/` so the site can reuse them.

### Mood 2 — First Suite

_A private suite at the front of the plane._ Modern first suites (Emirates, Singapore Suites, Etihad Residence): sliding doors closed, the bed made with a duvet, pajamas folded on top, a big personal screen, a vanity mirror, an amenity kit, and a sommelier pour.

- **Keywords:** Private · Polished · Quiet luxury
- **Palette:** neutrals: off-white `#f4eee4` (background), ivory `#fbf8f2` (surface), champagne `#dcc7a4`, taupe `#a49180` (borders), brass `#a8844f` (lines, focus), walnut `#6b4a36`, espresso `#3b2a20` (text). Accents, each from an object in the suite: bordeaux `#6e2a34` (wine, primary action), slate `#3e4c5e` (passport, links), sage `#55644a` (orchid leaves, success), cognac `#9c5b34` (leather, warning), terracotta `#a6432f` (error), dusty rose `#c39a92` (textiles, highlight)
- **Type:** Jost Light (thin geometric sans) for body and labels, Cormorant Garamond Light for headings
- **Contrast with Mid Flight:** soft, bright and spacious instead of dark and glowing. Thin lines, lots of whitespace, almost no shadows
- **Artifacts:** 29, in the order of the trip (curb → lounge → jet bridge → suite → dinner → night), all SVG illustrations drawn by the agent (`node scripts/first-suite/generate.mjs` → `public/mood-boards/first-suite/`)
- **Why it might fit a flight log:** _TBD_
- **Design system:** `/design-systems/first-suite`, with the same six sections and component list as Mid Flight, restyled. Square tailored corners, 1px lines instead of shadows (a double rule on the modal, an inner rule on primary hover), tracked-caps actions, a deep-brass focus ring, espresso for selected, and bordeaux kept for the primary action. Components live in `components/ui/first-suite/`.

### Mood 3 — Process Through the Airport

_Curb to curb, read at a glance._ Every step of getting through an airport, not just departures: check-in, security, the gate, the airfield, passport control, the baggage belt. Split-flap boards, overhead signs, pictograms and floor lines: a style built to tell you where to go next, from fifty meters away, while you drag a bag.

- **Keywords:** Legible · Systematic · Loud
- **Palette:** sign black `#111214`, signal yellow `#ffcc00` (wayfinding, the one loud color), white, concrete `#d8d6d0`, steel `#8b9096`. Status colors each mean one thing: green `#1f9d55` boarding/go, amber `#ff8a00` delayed/gate change, red `#e0322b` cancelled/stop, blue `#1d5fd1` information/arrivals
- **Type:** Barlow Condensed (display) and Barlow (body), from highway signage. The SVGs use Helvetica/Arial, the real airport sign face
- **Contrast with the other two:** loud instead of hushed, bold weights instead of light, flat color with hard edges instead of glow (Mid Flight) or hairlines (First Suite), and the airport and airfield instead of the cabin
- **Artifacts:** 28, in the order of the trip (curb → check-in → security → gate → airfield → passport control → baggage → way out), all SVG illustrations drawn by the agent. Scenes a traveler would find abstract (the check-in hall, the security queue, passport control, the baggage belt, the way out, scanning your pass to board) are drawn from your own eyes, using a one-point-perspective camera at eye height, and each space has its own architecture: a tall glass hall with roof trusses, a low tiled security area, a dark carpeted arrivals hall, glass doors onto the taxi rank (`node scripts/through-the-airport/generate.mjs` → `public/mood-boards/through-the-airport/`). Shared drawing kit (pictograms, signage arrows, split-flap tiles, seven-segment digits, the POV camera) in `scripts/through-the-airport/lib.mjs`
- **Why it might fit a flight log:** _TBD_
- **Design system:** `/design-systems/through-the-airport`, with the same six sections and component list as the other two, restyled as airport signage. Light terminal-floor page with a black overhead-sign header; heavy 2px outlines and 4px section rules instead of shadows; Barlow Condensed for anything you scan. Signal yellow is only on the primary action, and its hover inverts to black with yellow letters, like a sign lighting up. Focus is a thick information-blue ring; chosen is sign black; disabled controls are hatched like a closed lane. Status badges are solid fills that each mean one thing (green done/new, blue info, amber delayed, red error). Lists are plain rows with 2px seams and airport codes set big in condensed type; stats are big figures under a thick black rule; the detail panel is a gate screen with a black header. Components live in `components/ui/through-the-airport/`.

### Chosen style

**Mid Flight.** _TBD: why it fits the site and the people who'd use it._

## Site features

`/flight-log` is built from the Mid Flight components in `components/ui/mid-flight/`, with page sections in `components/flight-log/`.

- [x] **Globe** of every route: a dotted night-side Earth like the seatback flight map, drawn on a canvas in orthographic projection. Flights are great-circle arcs lifted off the surface. Drag or use the arrow keys to turn it. It turns slowly on its own unless the visitor prefers reduced motion. The land dots come from Natural Earth 110m, generated once into `data/landDots.ts` by `node scripts/flight-log/land-dots.mjs`, so the site makes no map API calls
- [x] A personal greeting ("Flying since 2017", "Welcome back, Neil"), the headline total distance (Display), and stat tiles for flights, countries, airports and hours
- [x] **Accurate distances**: great-circle distance on the WGS-84 ellipsoid (Vincenty), from airport coordinates to 4 decimals. This matches published figures (e.g. JFK–LHR 3,451 mi, LAX–SYD 7,488 mi). Each row rounds once in the chosen unit, and the headline is the sum of the rows, so mi and km both add up. Flight times are estimated from distance (marked "~") unless a flight has `minutes` in `data/flights.ts`
- [x] Interaction 1, **filters**: search, sort select, region chips and flight-time chips (Under 3h / 3–6h / 6–12h / 12h+, i.e. short to ultra-long haul; a chip is disabled when nothing behind it matches), a year range, and "Red-eyes only" / "First visit to a country" checkboxes. Filtered-out routes fade on the globe, and an empty state offers Clear filters
- [x] Interaction 2, **trace and detail**: hovering or focusing a flight turns the globe to that route and lights it up. Clicking opens the design system's detail panel, with a small globe facing the route
- [x] Interaction 3, **Log a flight** (the one amber primary action): a form for every detail a card shows (route, date, seat, airline, flight number, aircraft, flight time, red-eye, notes). Only the route and date are required, and suggestions come from the airports, airlines and aircraft the site can draw. Distance, estimated time and "new country" are calculated and previewed live. It has an error summary and field errors, a loading state, a success message, and the button showing "✓ Logged". It is faked: the flight joins the list until reload
- [x] **Aircraft miniatures** on the cards (`components/ui/mid-flight/AircraftArt.tsx`): an SVG side view of each flight's aircraft type, with lengths roughly to scale and the right engine count, nose and wingtips, painted in the airline's livery (tail art, belly, cheatline, engines). Windows are lit and the beacon is on, as at night. Rows and cards also name the aircraft
- [x] Display settings: mi / km radios in the header (they change every number on the page) and a Show routes toggle under the globe. Tabs switch the list between rows and cards
- [x] Clicking the globe leads to the flights: an airport filters the list to that airport, and a route (arc) filters it to every flight between those two cities, in either direction, shown as a removable chip. Hovering an arc brightens it and labels both ends
- [x] Responsive: two columns with a sticky globe at 1440px, one column with a menu button at 390px

### Responsive and accessible

Checked in headless Chrome at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px, plus 640px (a 1280px screen at 200% zoom), a 125% default font size, and a phone held sideways:

- No horizontal scrolling at any size. One column with a menu button below 640px; two columns with a sticky globe from 1024px
- [axe-core](https://github.com/dequelabs/axe-core) (WCAG 2.2 AA plus best practices) reports no violations on the page, the mobile menu, the detail panel, the Log a flight form with errors showing, or the cards view
- Every control is at least 24×24px (WCAG 2.2 target size), and every one has a visible focus ring
- Keyboard: a "Skip to flights" link comes first, the tab order is logical, the globe turns with the arrow keys, and dialogs trap focus, close with Esc and return focus to where you were. Everything the globe does by click also has a list or filter equivalent
- Landmarks: the header is its own banner, the content is in `<main>`, and headings run in order
- Type is sized in rem, so it follows the reader's browser font size
- With "reduce motion" on, the globe stops spinning and stops animating its planes, and spinners, shimmers and transitions settle instantly

### Design system coverage

Every Mid Flight piece is used on `/flight-log`:

| Design system | Where on the site |
| --- | --- |
| Type roles | Display: total distance. Heading: section and year titles, dialog titles. Body: the line under the total and the globe caption. Label: every small caps label. Shared as `displayText` / `headingText` / `bodyText` / `labelText` in `components/ui/mid-flight/styles.ts` |
| Buttons & link | Primary: Log a flight, Add to log. Secondary: Cancel, Close, Clear filters (empty state). Link: Clear filters, View flight |
| Text input · Select | Search, the Log a flight fields · Sort by |
| Checkboxes & radios · Toggle | Red-eyes only, First visit to a country · Miles / Kilometers · Show routes |
| Tabs · Year range · Filter chips | List / Cards · Years · Regions |
| Card · List rows · Badges · Stat tiles | Cards view · List view · Red-eye / New country · Hero counts |
| Modal / detail panel | Flight detail (controlled mode, globe as the picture), Log a flight |
| Control states | Rest, hover, focus and pressed on every control. Selected: chips, tabs, checkboxes, radios, toggle, the current row, and the primary button after logging ("✓ Logged"). Disabled: region chips with no matches, and Cancel while a flight is being added |
| UI states | Loading: the list while flights load. Empty: no matching flights. Error: the Log a flight error summary. Success: "Flight added" |

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
