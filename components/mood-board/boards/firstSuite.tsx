import { fsFonts } from "@/components/ui/first-suite/fonts";
import type { Artifact, MoodBoardConfig } from "../types";

const img = (file: string, alt: string, caption: string): Artifact => ({
  kind: "image",
  src: `/mood-boards/first-suite/${file}`,
  alt,
  caption,
  generated: true,
});

export const firstSuite: MoodBoardConfig = {
  tagline: "A private suite at the front of the plane",
  description:
    "The doors slide shut. The bed is already made, pajamas folded on the duvet, and the sommelier is pouring. Everything is soft, bright and quiet.",
  theme: { bg: "#f4eee4", surface: "#fbf8f2", text: "#3b2a20", muted: "#74655a", border: "#ddd1bf" },
  fonts: {
    className: fsFonts,
    display: "var(--font-cormorant), Georgia, serif",
    body: "var(--font-jost), sans-serif",
  },
  artifacts: [
    img("chauffeur-arrival.svg", "A long slate sedan at the departures curb, its rear door held open by a white-gloved chauffeur, cognac leather bags on a brass trolley", "Chauffeur drop-off"),
    img("ticket-wallet.svg", "A cognac leather ticket folder with a bordeaux ribbon, a boarding pass for seat 1A DXB to JFK, a slate-blue passport and a brass pen", "Ticket wallet"),
    img("first-lounge.svg", "A cognac leather armchair, a sage plant and a slate-bordered rug before a window wall onto an aircraft tail with a bordeaux stripe", "First-class lounge"),
    img("jet-bridge-escort.svg", "Down a bright jet bridge, a ground escort walks ahead pulling your cognac roller bag and garment bag toward the aircraft door, where crew wait", "Escorted boarding"),
    img("suite-corridor.svg", "A quiet first-class aisle in one-point perspective: closed champagne suite doors, a slate diamond-pattern runner, an orchid at the far end", "Suite corridor"),
    img("suite-doors.svg", "A closed first-class suite seen from the aisle: champagne sliding doors, cognac leather panels and a slate 1A number plate", "Suite 1A"),
    img("hot-towel.svg", "A crew member's hand in a slate sleeve presents a rolled hot towel with brass tongs on a walnut tray, steam rising", "Hot towel service"),
    img("champagne-flute.svg", "A champagne flute with rising bubbles on a sage linen coaster atop a cognac leather console with a brass edge", "Champagne on arrival"),
    img("leather-stitch.svg", "Close-up of cognac leather with cream diamond quilting above a double-stitched seam", "Quilted leather"),
    img("personal-screen.svg", "A large personal screen in a walnut wall panel showing a welcome page and a bordeaux route arc from DXB to JFK", "Personal screen"),
    img("seat-controls.svg", "Ivory touch tablet in a brass dock: slate lounge mode selected, bordeaux do-not-disturb toggle, lights slider and 21°", "Suite controls"),
    img("suite-window.svg", "Three small windows in a champagne sidewall onto a bright midday sky, a dusty-rose cushion and a folded sage throw on the ledge", "Three windows"),
    img("amenity-kit.svg", "Flat-lay of a cognac leather amenity kit beside lotion, a bordeaux-capped lip balm, toothbrush, comb, slate eye mask and sage socks", "Amenity kit"),
    img("menu-card.svg", "A cream dinner menu card in an open cognac leather folder, headed Dinner in bordeaux serif italic, with a bordeaux ribbon bookmark", "Tonight's menu"),
    img("sommelier-pour.svg", "A white-gloved sommelier's hand in a slate cuff tilts a bottle with a bordeaux capsule, pouring red wine into a large-bowled glass", "The sommelier pour"),
    img("caviar-service.svg", "Overhead caviar service: a tin of caviar in crushed ice in a brass bowl, blinis, crème fraîche, chives, lemon in muslin, a mother-of-pearl spoon", "Caviar service"),
    img("table-setting.svg", "Overhead place setting on white linen: brass-rimmed charger, dusty-rose napkin, brass flatware, slate-rimmed bread plate, a rose in a bud vase", "Table for one"),
    img("wood-veneer.svg", "Pale walnut veneer with book-matched grain divided by a thin inlaid brass strip", "Walnut veneer"),
    img("espresso-cup.svg", "A white espresso cup and saucer with a brass spoon on a cognac leather tray, beside a chocolate in bordeaux foil", "After-dinner espresso"),
    img("brass-lamp.svg", "A slim brushed-brass lamp with a lit linen drum shade on a walnut console, beside bordeaux, slate and sage cloth-bound books", "Brass reading lamp"),
    img("orchid.svg", "A potted white Phalaenopsis orchid: broad sage leaves and silvery aerial roots in a walnut pot, a staked stem arching into white flowers with rose throats", "White orchid"),
    img("reserved-lavatory.svg", "Through a half-open door under a brass FIRST CLASS ONLY plate: a calm lavatory with a vessel sink, brass faucet, lit mirror, rolled towels and a rose", "First class only"),
    img("vanity-mirror.svg", "A vanity console with a rounded brass-framed mirror, a cognac leather tray with lotion and a single rose in a bud vase, and a sage hand towel", "Vanity console"),
    img("brushed-brass.svg", "Brushed brass plate with a soft diagonal highlight and one fine engraved hairline", "Brushed brass table"),
    img("pajamas.svg", "Folded ivory pajamas with slate piping and monogram, tied with a bordeaux ribbon, next to rose-trimmed slippers", "Suite pajamas"),
    img("made-bed.svg", "The suite made up as a bed: duvet turned back, slate-piped pillows, slate pajamas tied with a bordeaux ribbon, a dusty-rose throw at the foot", "Made-up bed"),
    img("turndown.svg", "Corner of the turned-down bed with a slate-piped pillow, a dusty-rose throw, two chocolates in a ribboned box and a Sleep well card", "Turndown service"),
    img("linen-fold.svg", "Close-up of ivory duvet linen folded back over itself, edged with a bordeaux embroidered band", "Linen turndown"),
    img("shower-spa.svg", "A pale marble shower with a brass rain head, a sage towel on a heated brass rail, rose and cognac amenity bottles and a round window", "Onboard shower spa"),
  ],
};
