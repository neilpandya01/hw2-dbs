import { DM_Mono, DM_Sans } from "next/font/google";
import type { Artifact, MoodBoardConfig } from "../types";

const sans = DM_Sans({ subsets: ["latin"], weight: ["300", "500"] });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

const img = (file: string, alt: string, caption: string): Artifact => ({
  kind: "image",
  src: `/mood-boards/mid-flight/${file}`,
  alt,
  caption,
  generated: true,
});

const tile = (caption: string, content: React.ReactNode): Artifact => ({ kind: "tile", caption, content, generated: true });

const palette = [
  ["#05070f", "Cabin dark"],
  ["#0b1330", "Night navy"],
  ["#1a2752", "Seat blue"],
  ["#5b8cff", "LED strip"],
  ["#7fd3ff", "Aisle light"],
  ["#ffc979", "Reading lamp"],
];

const skyStops = [
  ["#02040c", "00:00"],
  ["#0b1a42", "02:00"],
  ["#1b2a6b", "04:00"],
  ["#3b4fa0", "05:10"],
  ["#ff9a5a", "05:40"],
];

export const midFlight: MoodBoardConfig = {
  tagline: "Flying in the night, from the window seat",
  description:
    "The cabin lights are dimmed to blue. Rows of seats stretch back forever, and through the window, tiny towns glow far below.",
  theme: { bg: "#05070f", surface: "#0b1330", text: "#e6ecfb", muted: "#8a97b8", border: "#1f2b55" },
  artifacts: [
    img("window-seat-pov.svg", "From seat 32A: your window, the seat in front, the cabin beyond", "From seat 32A"),
    img("wingtip.svg", "Wing and winglet lit red by the navigation light, cloud deck below", "Wingtip light"),
    tile(
      "Palette",
      <div className="grid grid-cols-3">
        {palette.map(([hex, name]) => (
          <div key={hex} className="aspect-square p-2" style={{ background: hex }}>
            <p className={`${mono.className} text-[10px] leading-tight ${hex === "#ffc979" || hex === "#7fd3ff" ? "text-[#05070f]" : "text-[#e6ecfb]"}`}>
              {name}
              <br />
              {hex}
            </p>
          </div>
        ))}
      </div>
    ),
    img("aisle-standing.svg", "Standing in the aisle looking over rows of seat tops and sleeping heads", "Standing in the aisle"),
    img("city-below.svg", "A city street grid glowing far below at night, a dark river through it", "City grid below"),
    tile(
      "Type · DM Sans Light + DM Mono",
      <div className="p-6">
        <p className={`${sans.className} text-5xl font-light tracking-tight text-[#e6ecfb]`}>32A</p>
        <p className={`${sans.className} mt-2 text-xl font-light text-[#e6ecfb]`}>Somewhere over the Atlantic</p>
        <p className={`${mono.className} mt-4 text-xs tracking-[0.2em] text-[#8a97b8]`}>ALT 35,000 FT · LOCAL 02:14</p>
      </div>
    ),
    img("reading-light.svg", "Overhead panel with one reading light on, dust floating in the beam", "One reading light on"),
    img("seatback-screen.svg", "The seatback in front: flight map screen, ports, tray latch, seat pocket", "Seatback screen"),
    img("moon-clouds.svg", "A wide sea of moonlit cloud under the full moon", "Moonlit cloud sea"),
    tile(
      "Interface · flight row",
      <div className={`${sans.className} p-5`}>
        <div className="flex items-center justify-between rounded-lg border border-[#1f2b55] bg-[#05070f] px-4 py-3 shadow-[inset_0_1px_0_#5b8cff40]">
          <div>
            <p className="text-lg font-light text-[#e6ecfb]">ORD → NRT</p>
            <p className={`${mono.className} mt-0.5 text-[10px] tracking-[0.15em] text-[#8a97b8]`}>MAR 14 2023 · 6,283 MI · RED-EYE</p>
          </div>
          <span className={`${mono.className} rounded-full border border-[#7fd3ff]/50 px-2.5 py-1 text-[10px] text-[#7fd3ff]`}>32A</span>
        </div>
      </div>
    ),
    img("tray-table.svg", "Tray table with ginger ale, a napkin and pretzels under the reading light", "Ginger ale & pretzels"),
    img("galley-curtain.svg", "Galley curtain at the front, warm light through the gap", "Galley curtain"),
    img("exit-sign.svg", "Glowing red EXIT sign over the door", "EXIT"),
    img("engine.svg", "The engine under the wing catching moonlight, town lights on the horizon", "Engine under the wing"),
    tile(
      "Quote · the feeling",
      <div className="p-6">
        <p className={`${sans.className} text-2xl font-light leading-snug text-[#e6ecfb]`}>
          &ldquo;Every window seat, every city <span className="text-[#ffc979]">glowing</span> somewhere below.&rdquo;
        </p>
      </div>
    ),
    img("seatbelt-buckle.svg", "Metal seatbelt buckle on your lap catching blue and amber light", "Seatbelt buckle"),
    img("boarding-pass.svg", "Boarding pass for seat 32A lying on a passport", "Boarding pass"),
    img("frost.svg", "Frost crystals growing in the corner of the window pane", "Frost on the pane"),
    tile(
      "Interface · glowing chip + progress",
      <div className="space-y-5 p-6">
        <span className={`${sans.className} inline-flex items-center gap-2 rounded-full border border-[#5b8cff]/60 bg-[#5b8cff]/10 px-4 py-1.5 text-sm text-[#cfe0ff] shadow-[0_0_24px_-4px_#5b8cff]`}>
          <span className="size-1.5 rounded-full bg-[#7fd3ff] shadow-[0_0_8px_#7fd3ff]" />
          Seat 32A · Window
        </span>
        <div>
          <div className="h-1 rounded-full bg-[#1a2752]">
            <div className="h-1 w-3/5 rounded-full bg-[#7fd3ff] shadow-[0_0_10px_#7fd3ff]" />
          </div>
          <p className={`${mono.className} mt-2 flex justify-between text-[10px] tracking-[0.2em] text-[#8a97b8]`}>
            <span>ORD</span>
            <span>5:42 LEFT</span>
            <span>NRT</span>
          </p>
        </div>
      </div>
    ),
    img("phone-airplane.svg", "Phone on the tray in airplane mode showing 2:14", "2:14, airplane mode"),
    img("headphones.svg", "Airline headphones with the two-prong plug on the seat", "Headphones"),
    img("route-constellation.svg", "Airports drawn as stars, flights as faint constellation lines", "Routes as constellations"),
    tile(
      "Sky by the hour",
      <div>
        <div className="h-24" style={{ background: `linear-gradient(to bottom, ${skyStops.map(([c]) => c).join(",")})` }} />
        <div className={`${mono.className} flex justify-between px-3 py-2 text-[10px] tracking-[0.15em] text-[#8a97b8]`}>
          {skyStops.map(([c, t]) => (
            <span key={c}>{t}</span>
          ))}
        </div>
      </div>
    ),
    img("safety-card.svg", "Safety information card in the seat pocket", "Safety card"),
    img("open-bin.svg", "Open overhead bin with a roller bag and backpack", "Overhead bin"),
    img("eye-mask.svg", "Satin eye mask and foam earplugs on the blanket", "Eye mask & earplugs"),
    tile(
      "Interface · stats",
      <div className={`${sans.className} grid grid-cols-3 divide-x divide-[#1f2b55] p-5`}>
        {[
          ["41", "FLIGHTS"],
          ["23", "COUNTRIES"],
          ["186K", "MILES"],
        ].map(([n, l]) => (
          <div key={l} className="px-3 first:pl-0">
            <p className="text-3xl font-light text-[#e6ecfb]">{n}</p>
            <p className={`${mono.className} mt-1 text-[10px] tracking-[0.2em] text-[#8a97b8]`}>{l}</p>
          </div>
        ))}
      </div>
    ),
    img("armrest-controls.svg", "Armrest controls: call button, light, volume, audio jack", "Armrest controls"),
    img("blanket.svg", "Folded fleece airline blanket", "Blanket"),
    img("seat-fabric.svg", "Close-up of navy airline seat fabric with a stitched seam", "Seat fabric"),
  ],
};
