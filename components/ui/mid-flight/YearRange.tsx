"use client";

import { useState } from "react";
import { labelText } from "./styles";

// Two-thumb year range: two native range inputs stacked on one track.
// Native inputs keep keyboard support (arrows, Home/End) and screen-reader labels.
const thumb =
  "pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent outline-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-mf-bg [&::-webkit-slider-thumb]:bg-mf-focus [&::-webkit-slider-thumb]:shadow-[0_0_12px_-2px_var(--color-mf-focus)] [&::-webkit-slider-thumb]:transition hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing active:[&::-webkit-slider-thumb]:scale-95 focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-mf-focus " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-mf-bg [&::-moz-range-thumb]:bg-mf-focus";

export default function YearRange({ min = 2012, max = 2025, defaultFrom = 2016, defaultTo = 2025 }: { min?: number; max?: number; defaultFrom?: number; defaultTo?: number }) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between">
        <span className={labelText}>Years</span>
        <span className="font-mf text-sm text-mf-text" aria-live="polite">
          {from === to ? from : `${from} – ${to}`}
        </span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-mf-raised" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-mf-focus shadow-[0_0_10px_var(--color-mf-focus)]"
          style={{ left: `${pct(from)}%`, right: `${100 - pct(to)}%` }}
        />
        <input type="range" aria-label="From year" min={min} max={max} value={from} onChange={(e) => setFrom(Math.min(+e.target.value, to))} className={thumb} />
        <input type="range" aria-label="To year" min={min} max={max} value={to} onChange={(e) => setTo(Math.max(+e.target.value, from))} className={thumb} />
      </div>
      <div className="flex justify-between font-mf-mono text-[11px] text-mf-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
