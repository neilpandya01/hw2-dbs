"use client";

import { useState } from "react";
import { labelText } from "./styles";

// Two-thumb year range: two native range inputs on one heavy track, the chosen
// years set big in condensed type. Native inputs keep keyboard and screen-reader support.
const thumb =
  "pointer-events-none absolute inset-x-0 top-1/2 h-7 w-full -translate-y-1/2 appearance-none bg-transparent outline-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-ap-sign [&::-webkit-slider-thumb]:bg-ap-surface [&::-webkit-slider-thumb]:transition hover:[&::-webkit-slider-thumb]:bg-ap-sign active:[&::-webkit-slider-thumb]:cursor-grabbing active:[&::-webkit-slider-thumb]:bg-ap-sign focus-visible:[&::-webkit-slider-thumb]:outline-3 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-ap-focus " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-ap-sign [&::-moz-range-thumb]:bg-ap-surface";

export default function YearRange({ min = 2012, max = 2025, defaultFrom = 2016, defaultTo = 2025 }: { min?: number; max?: number; defaultFrom?: number; defaultTo?: number }) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className={labelText}>Years</span>
        <span aria-live="polite" className="font-ap-cond text-2xl font-extrabold text-ap-text tabular-nums">
          {from === to ? from : `${from} – ${to}`}
        </span>
      </div>
      <div className="relative h-7">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-ap-border" />
        <div className="absolute top-1/2 h-1.5 -translate-y-1/2 bg-ap-sign" style={{ left: `${pct(from)}%`, right: `${100 - pct(to)}%` }} />
        <input type="range" aria-label="From year" min={min} max={max} value={from} onChange={(e) => setFrom(Math.min(+e.target.value, to))} className={thumb} />
        <input type="range" aria-label="To year" min={min} max={max} value={to} onChange={(e) => setTo(Math.max(+e.target.value, from))} className={thumb} />
      </div>
      <div className="flex justify-between font-ap-cond text-[13px] font-semibold text-ap-muted tabular-nums">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
