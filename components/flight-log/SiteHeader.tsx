"use client";

import Link from "next/link";
import { useState } from "react";
import Checkbox from "@/components/ui/mid-flight/Checkbox";
import { cx, type Unit } from "@/components/ui/mid-flight/styles";

const links = [
  { href: "/", label: "Hub" },
  { href: "/mood-boards/mid-flight", label: "Mood board" },
  { href: "/design-systems/mid-flight", label: "Design system" },
];

const navLink =
  "rounded-sm text-sm text-mf-muted transition hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:text-mf-focus";

// Wordmark, nav, and the distance units (they change every number on the page, so they live up here).
// On phones the nav folds into a menu button; the units stay visible.
export default function SiteHeader({ unit, onUnitChange }: { unit: Unit; onUnitChange: (u: Unit) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative flex items-center justify-between gap-6 border-b border-mf-border pb-5">
      <Link href="/flight-log" className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-focus">
        <span aria-hidden className="size-2 rounded-full bg-mf-focus shadow-[0_0_10px_var(--color-mf-focus)]" />
        <span className="font-mf-mono text-[11px] tracking-[0.2em] text-mf-text uppercase">Flight Log</span>
      </Link>

      <div className="flex items-center gap-5 sm:gap-8">
        <nav aria-label="Site" className="hidden gap-7 sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={navLink}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div role="radiogroup" aria-label="Distance units" className="flex gap-4 sm:border-l sm:border-mf-border sm:pl-8">
          <Checkbox type="radio" name="units" label="mi" checked={unit === "mi"} onChange={() => onUnitChange("mi")} />
          <Checkbox type="radio" name="units" label="km" checked={unit === "km"} onChange={() => onUnitChange("km")} />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="grid size-10 place-items-center rounded-full border border-mf-border text-mf-text transition hover:border-mf-control hover:bg-mf-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-95 aria-expanded:border-mf-focus aria-expanded:text-mf-focus sm:hidden"
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-4">
            {open ? (
              <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6 H17 M3 10 H17 M3 14 H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="site-menu"
        aria-label="Site"
        className={cx("absolute inset-x-0 top-full z-20 mt-2 grid gap-1 rounded-mf-md border border-mf-control bg-mf-surface p-2 shadow-mf-glow sm:hidden", !open && "hidden")}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cx(navLink, "rounded-mf-sm px-3 py-3 text-base hover:bg-mf-raised")}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
