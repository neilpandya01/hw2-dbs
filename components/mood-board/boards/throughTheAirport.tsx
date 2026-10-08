import { ttaFonts } from "@/components/ui/through-the-airport/fonts";
import type { Artifact, MoodBoardConfig } from "../types";

const img = (file: string, alt: string, caption: string): Artifact => ({
  kind: "image",
  src: `/mood-boards/through-the-airport/${file}`,
  alt,
  caption,
  generated: true,
});

export const throughTheAirport: MoodBoardConfig = {
  tagline: "Curb to curb, read at a glance",
  description:
    "Every step of getting through an airport: check-in, security, the gate, the airfield, passport control, the belt. Sign black, signal yellow, and big type you can read from fifty meters away while dragging a bag. Everything tells you where to go next, and nothing is decoration.",
  theme: { bg: "#e9e8e4", surface: "#ffffff", text: "#111214", muted: "#55595f", border: "#111214", radius: "2px" },
  fonts: {
    className: ttaFonts,
    display: "var(--font-barlow-condensed), 'Arial Narrow', sans-serif",
    body: "var(--font-barlow), Arial, sans-serif",
  },
  artifacts: [
    img("curb-gantry.svg", "A road gantry over the departures curb: a black Departures sign with a yellow Terminal 3 line, a blue Arrivals sign, a yellow T3 plate on the beam", "Departures curb"),
    img("terminal-entrance.svg", "A black pylon with a giant yellow 3 beside the terminal's glass wall and sliding doors, a traveler with a suitcase walking in", "Terminal 3"),
    img("flap-board.svg", "A split-flap departures board: times, flights, destinations, yellow gate numbers, and remarks in green for boarding, orange for delays and gate changes, red for cancelled", "Departures board"),
    img("flap-closeup.svg", "Macro of three split-flap tiles reading B22, the last tile mid-flip from 1 to 2, BOARDING on the row below", "Mid-flip"),
    img("terminal-map.svg", "A black You are here directory: three piers A, B and C with gate dots, a dashed yellow route from security to gate B22", "You are here"),
    img("check-in-hall.svg", "Walking into the check-in hall: black signs with yellow desk numbers 41 to 46 hang toward you down the counter row, travelers queue between belts, kiosks on the left", "Check-in hall"),
    img("kiosk.svg", "A self-service check-in kiosk whose screen shows one yellow Scan passport button above an outlined Enter booking code button", "Self check-in"),
    img("bag-scale.svg", "A bag-drop scale reading 23.4 KG in red seven-segment digits beside an orange MAX 23 KG plate, a blue suitcase with a yellow HEAVY tag", "23.4 kg"),
    img("bag-tag.svg", "A long bag tag with LHR printed huge, LONDON HEATHROW, UA 914 07OCT, barcodes, a black PRIORITY band and a yellow footer", "LHR"),
    img("security-queue.svg", "Joining the security queue: a black Security sign with a yellow 12 min wait overhead, rows of belts and travelers ahead, a yellow QUEUE STARTS HERE sign and a floor arrow at the opening", "Join the queue"),
    img("security-sign.svg", "A security instruction sign with a yellow header and four white pictogram tiles: laptops out, liquids in a clear bag, one bag per tray, passport in hand", "Before the belt"),
    img("security-tray.svg", "A grey security tray from above holding a laptop, a clear liquids bag, red sneakers, a coiled belt and keys, on steel rollers", "The tray"),
    img("footprint-mat.svg", "Yellow footprints on a black mat between the scanner walls, STAND HERE above and Arms up · hold still below", "Stand here"),
    img("sign-family.svg", "Sixteen square sign tiles in one pictogram style: departures, arrivals, baggage, passport, toilets, café, dining, shops, information, wifi, charging, lifts, taxi, train, bus and a green exit", "Sign family"),
    img("overhead-wayfinding.svg", "A long black overhead sign in the airside hall: yellow arrows to gates A1–A12, B1–B24 and C1–C14 with walking times and service pictograms", "Gates this way"),
    img("moving-walkway.svg", "Looking down a moving walkway: black handrails, a grey belt and a yellow comb plate, a hanging sign reading Stand right / Walk left", "Stand right, walk left"),
    img("station-clock.svg", "A hanging station clock with bold black bars and hands and a red seconds hand ending in a disc, showing 21:12", "21:12"),
    img("gate-change.svg", "A gate change screen with an orange header: C07 struck out in grey, an orange arrow, and B09 huge in yellow", "Gate change"),
    img("gate-sign.svg", "A black gate pillar with B22 in giant yellow type and a white flight screen under a green BOARDING bar for UA 914 to London Heathrow", "Gate B22"),
    img("gate-seating.svg", "A row of perforated steel gate seats on a black beam, yellow charging posts between them, a red backpack and a coffee, a plane waiting outside", "Gate seating"),
    img("gate-window.svg", "Through the gate window: a white plane parked nose-in, the jet bridge on its forward door, a yellow tug and bag cart, orange cones, the yellow lead-in line", "Through the glass"),
    img("boarding-lanes.svg", "Boarding group posts numbered 1 to 5 in yellow on black, the first one yellow, a black banner reading Now boarding 1 · 2 · 3 in green", "Boarding groups"),
    img("floor-line.svg", "PLEASE WAIT BEHIND THE LINE in big black letters on a pale floor, a hazard-striped yellow line, two black shoe toes stopping at it", "Behind the line"),
    img("phone-pass.svg", "A phone showing a mobile boarding pass: a yellow ORD to LHR header, flight UA 914, gate B22 boxed in yellow, seat 32A and a big QR code", "Mobile pass"),
    img("e-gate.svg", "An automatic boarding gate: a green arrow light above the reader, a phone held to the scanner, the glass flaps open, a yellow floor arrow through", "Scan and go"),
    img("hold-sign.svg", "A runway holding position sign: a yellow-bordered B location panel beside a red panel reading 27L-9R in white, above double solid and dashed yellow hold lines", "Hold short 27L"),
    img("marshaller.svg", "From the cockpit: a marshaller in an orange hi-vis vest and ear defenders holding orange wands straight up in front of the terminal and gate B22", "Marshaller"),
    img("passport-control.svg", "First in line at passport control: the yellow line and WAIT HERE UNTIL CALLED at your feet, a black Passport control sign pointing to all passports and e-Passports, booths lit green for open and red for closed", "Wait until called"),
    img("baggage-reclaim.svg", "Standing at belt 3: red, black, blue, yellow and green bags passing on the black belt in front of you, a blue Baggage reclaim 3 sign overhead, people waiting across the carousel", "Belt 3"),
    img("way-out.svg", "About to leave: standing inside by the glass doors under a Taxi, Train and Bus sign and a green Exit sign, yellow taxis lined up at the rank on the other side of the glass, your own bag handle in your hand", "Way out"),
  ],
};
