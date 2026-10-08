import Link from "next/link";
import { ttaFonts } from "@/components/ui/through-the-airport/fonts";
import ColorRoles from "./ColorRoles";
import ComponentGallery from "./ComponentGallery";
import ControlStates from "./ControlStates";
import SpacingShape from "./SpacingShape";
import TypeRoles from "./TypeRoles";
import UIStates from "./UIStates";

const navLink =
  "font-ap-cond text-[15px] font-semibold tracking-[0.06em] uppercase text-white/70 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus";

export default function AirportSystem() {
  return (
    <main className={`${ttaFonts} min-h-screen bg-ap-bg font-ap text-ap-text antialiased`}>
      {/* the page opens under an overhead sign */}
      <header className="bg-ap-sign text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-10 sm:py-12">
          <nav className="flex gap-6">
            <Link href="/" className={navLink}>← Hub</Link>
            <Link href="/mood-boards/through-the-airport" className={navLink}>Mood board</Link>
          </nav>
          <div className="grid gap-5">
            <p className="font-ap-cond text-[15px] font-semibold tracking-[0.1em] text-ap-sign-muted uppercase">Design system · 03</p>
            <h1 className="font-ap-cond text-5xl leading-[0.95] font-extrabold sm:text-7xl">Process Through the Airport</h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/75">
              A UI library built from the airport mood board: sign black on a terminal-floor grey, heavy condensed type you can scan at a glance, heavy outlines instead of shadows, status colors that each mean one thing, and signal yellow kept for the one way to go.
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-12 sm:px-10 sm:py-14">
        <ColorRoles />
        <TypeRoles />
        <SpacingShape />
        <ComponentGallery />
        <ControlStates />
        <UIStates />
      </div>
    </main>
  );
}
