import Link from "next/link";
import { mfFonts } from "@/components/ui/mid-flight/fonts";
import ColorRoles from "./ColorRoles";
import ComponentGallery from "./ComponentGallery";
import ControlStates from "./ControlStates";
import SpacingShape from "./SpacingShape";
import TypeRoles from "./TypeRoles";
import UIStates from "./UIStates";

export default function MidFlightSystem() {
  return (
    <main className={`${mfFonts} min-h-screen bg-mf-bg font-mf text-mf-text antialiased`}>
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-10 sm:px-8 sm:py-14">
        <header className="grid gap-6">
          <nav className="flex gap-6 text-sm text-mf-muted">
            <Link href="/" className="rounded-sm hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus">← Hub</Link>
            <Link href="/mood-boards/mid-flight" className="rounded-sm hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus">Mood board</Link>
          </nav>
          <div>
            <p className="font-mf-mono text-[0.6875rem] tracking-[0.2em] text-mf-muted uppercase">Design system · 01</p>
            <h1 className="mt-3 text-5xl font-light tracking-tight sm:text-6xl">Mid Flight</h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed font-light text-mf-muted">
              A UI library built from the night-flight mood board: a dark navy cabin, one warm reading lamp for the action that matters, and cool aisle light for where you are.
            </p>
          </div>
        </header>
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
