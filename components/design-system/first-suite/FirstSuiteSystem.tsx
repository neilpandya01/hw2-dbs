import Link from "next/link";
import { fsFonts } from "@/components/ui/first-suite/fonts";
import ColorRoles from "./ColorRoles";
import ComponentGallery from "./ComponentGallery";
import ControlStates from "./ControlStates";
import SpacingShape from "./SpacingShape";
import TypeRoles from "./TypeRoles";
import UIStates from "./UIStates";

const navLink =
  "text-fs-muted underline-offset-4 transition hover:text-fs-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus";

export default function FirstSuiteSystem() {
  return (
    <main className={`${fsFonts} min-h-screen bg-fs-bg font-fs text-fs-text antialiased`}>
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-12 sm:px-10 sm:py-16">
        <header className="grid gap-8">
          <nav className="flex gap-8 text-sm font-light">
            <Link href="/" className={navLink}>← Hub</Link>
            <Link href="/mood-boards/first-suite" className={navLink}>Mood board</Link>
          </nav>
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-fs-brass uppercase">Design system · 02</p>
            <h1 className="mt-4 font-fs-serif text-6xl font-light sm:text-7xl">First Suite</h1>
            <span aria-hidden className="mt-6 block h-px w-16 bg-fs-brass" />
            <p className="mt-6 max-w-xl text-base leading-relaxed font-light text-fs-muted">
              A UI library built from the first-suite mood board: warm ivory and linen, brass hairlines instead of shadows, a serif for what you read and a thin sans for what you do, and bordeaux, like the sommelier&apos;s pour, kept for the one action that matters.
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
