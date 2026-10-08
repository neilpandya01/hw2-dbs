import type { Artifact, MoodBoardConfig } from "../types";

const img = (file: string, alt: string, caption: string): Artifact => ({
  kind: "image",
  src: `/mood-boards/mid-flight/${file}`,
  alt,
  caption,
  generated: true,
});

export const midFlight: MoodBoardConfig = {
  tagline: "Flying in the night, from the window seat",
  description:
    "The cabin lights are dimmed to blue. Rows of seats stretch back forever, and through the window, tiny towns glow far below.",
  theme: { bg: "#05070f", surface: "#0b1330", text: "#e6ecfb", muted: "#8a97b8", border: "#1f2b55" },
  artifacts: [
    img("window-seat-pov.svg", "From seat 32A: your window, the seat in front, the cabin beyond", "From seat 32A"),
    img("wingtip.svg", "Wing and winglet lit red by the navigation light, cloud deck below", "Wingtip light"),
    img("aisle-standing.svg", "Standing in the aisle looking over rows of seat tops and sleeping heads", "Standing in the aisle"),
    img("city-below.svg", "A city street grid glowing far below at night, a dark river through it", "City grid below"),
    img("reading-light.svg", "Overhead panel with one reading light on, dust floating in the beam", "One reading light on"),
    img("seatback-screen.svg", "The seatback in front: flight map screen, ports, tray latch, seat pocket", "Seatback screen"),
    img("moon-clouds.svg", "A wide sea of moonlit cloud under the full moon", "Moonlit cloud sea"),
    img("departures-board.svg", "Split-flap departures board listing red-eye flights, ours boarding", "Departures board"),
    img("tray-table.svg", "Tray table with ginger ale, a napkin and pretzels under the reading light", "Ginger ale & pretzels"),
    img("galley-curtain.svg", "Galley curtain at the front, warm light through the gap", "Galley curtain"),
    img("exit-sign.svg", "Glowing red EXIT sign over the door", "EXIT"),
    img("engine.svg", "The engine under the wing catching moonlight, town lights on the horizon", "Engine under the wing"),
    img("takeoff-roll.svg", "Runway lights streaking past the window during the takeoff roll", "Takeoff roll"),
    img("seatbelt-buckle.svg", "Metal seatbelt buckle on your lap catching blue and amber light", "Seatbelt buckle"),
    img("boarding-pass.svg", "Boarding pass for seat 32A lying on a passport", "Boarding pass"),
    img("frost.svg", "Frost crystals growing in the corner of the window pane", "Frost on the pane"),
    img("gate-window.svg", "Plane parked at the gate through the terminal window, cabin windows lit", "At the gate"),
    img("phone-airplane.svg", "Phone on the tray in airplane mode showing 2:14", "2:14, airplane mode"),
    img("headphones.svg", "Airline headphones with the two-prong plug on the seat", "Headphones"),
    img("route-constellation.svg", "Airports drawn as stars, flights as faint constellation lines", "Routes as constellations"),
    img("sunrise-windows.svg", "Five cabin windows, each an hour later, the sun rising in the last", "Sunrise, window by window"),
    img("safety-card.svg", "Safety information card in the seat pocket", "Safety card"),
    img("open-bin.svg", "Open overhead bin with a roller bag and backpack", "Overhead bin"),
    img("eye-mask.svg", "Satin eye mask and foam earplugs on the blanket", "Eye mask & earplugs"),
    img("jet-bridge.svg", "Walking down the jet bridge toward the open aircraft door", "Jet bridge"),
    img("armrest-controls.svg", "Armrest controls: call button, light, volume, audio jack", "Armrest controls"),
    img("blanket.svg", "Folded fleece airline blanket", "Blanket"),
    img("seat-fabric.svg", "Close-up of navy airline seat fabric with a stitched seam", "Seat fabric"),
  ],
};
