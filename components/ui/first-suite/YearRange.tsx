"use client";

import { useState } from "react";
import { labelText } from "./styles";

// Two-thumb year range: two native range inputs stacked on one hairline track.
// Native inputs keep keyboard support (arrows, Home/End) and screen-reader labels.
const thumb =
  "pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent outline-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-fs-text [&::-webkit-slider-thumb]:bg-fs-surface [&::-webkit-slider-thumb]:transition hover:[&::-webkit-slider-thumb]:bg-fs-text active:[&::-webkit-slider-thumb]:cursor-grabbing active:[&::-webkit-slider-thumb]:bg-fs-text focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-3 focus-visible:[&::-webkit-slider-thumb]:outline-fs-focus " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rotate-45 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-fs-text [&::-moz-range-thumb]:bg-fs-surface";

export default function YearRange({ min = 2012, max = 2025, defaultFrom = 2016, defaultTo = 2025 }: { min?: number; max?: number; defaultFrom?: number; defaultTo?: number }) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between">
        <span className={labelText}>Years</span>
        <span className="font-fs-serif text-xl text-fs-text" aria-live="polite">
          {from === to ? from : `${from} – ${to}`}
        </span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-fs-control" />
        <div className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-fs-text" style={{ left: `${pct(from)}%`, right: `${100 - pct(to)}%` }} />
        <input type="range" aria-label="From year" min={min} max={max} value={from} onChange={(e) => setFrom(Math.min(+e.target.value, to))} className={thumb} />
        <input type="range" aria-label="To year" min={min} max={max} value={to} onChange={(e) => setTo(Math.max(+e.target.value, from))} className={thumb} />
      </div>
      <div className="flex justify-between font-fs text-[11px] font-light text-fs-muted tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
