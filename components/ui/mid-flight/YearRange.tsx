"use client";

import { useRef, useState, type PointerEvent } from "react";
import { cx, labelText } from "./styles";

// Two-thumb year range: two native range inputs stacked on one track.
// Native inputs keep keyboard support (arrows, Home/End) and screen-reader labels.
// The pointer is handled once, on the track: stacked inputs let the top one swallow every drag,
// so a thumb could get stuck under the other. Here a press grabs the nearest thumb, and when the
// two sit together the drag direction decides (left moves "from", right moves "to").
const THUMB = 20; // px, matches size-5 below

const thumb =
  "pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent outline-none " +
  "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-mf-bg [&::-webkit-slider-thumb]:bg-mf-focus [&::-webkit-slider-thumb]:shadow-[0_0_12px_-2px_var(--color-mf-focus)] [&::-webkit-slider-thumb]:transition group-hover:[&::-webkit-slider-thumb]:scale-110 group-active:[&::-webkit-slider-thumb]:scale-95 focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-mf-focus " +
  "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-mf-bg [&::-moz-range-thumb]:bg-mf-focus";

type Props = { min?: number; max?: number; defaultFrom?: number; defaultTo?: number; value?: [number, number]; onChange?: (v: [number, number]) => void };
type Which = "from" | "to";

// Pass `value` + `onChange` to control it from the page; otherwise it keeps its own state.
export default function YearRange({ min = 2012, max = 2025, defaultFrom = 2016, defaultTo = 2025, value, onChange }: Props) {
  const [inner, setInner] = useState<[number, number]>([defaultFrom, defaultTo]);
  const [from, to] = value ?? inner;
  const set = (v: [number, number]) => {
    setInner(v);
    onChange?.(v);
  };
  const move = (which: Which, v: number) => (which === "from" ? set([Math.min(v, to), to]) : set([from, Math.max(v, from)]));

  const track = useRef<HTMLDivElement>(null);
  const inputs = useRef<Record<Which, HTMLInputElement | null>>({ from: null, to: null });
  const drag = useRef<{ which: Which | null; x: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  // Same geometry as the native thumbs: their centers travel from THUMB/2 to width − THUMB/2.
  const valueAt = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left - THUMB / 2) / (r.width - THUMB)));
    return Math.round(min + t * (max - min));
  };
  const grab = (which: Which, clientX: number) => {
    drag.current = { which, x: clientX };
    inputs.current[which]?.focus({ preventScroll: true });
    move(which, valueAt(clientX));
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    const v = valueAt(e.clientX);
    if (from === to && v === from) drag.current = { which: null, x: e.clientX }; // wait for a direction
    else grab(Math.abs(v - from) < Math.abs(v - to) || (v < from) ? "from" : "to", e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    if (d.which) return move(d.which, valueAt(e.clientX));
    if (Math.abs(e.clientX - d.x) > 3) grab(e.clientX < d.x ? "from" : "to", e.clientX);
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between">
        <span className={labelText}>Years</span>
        <span className="font-mf text-sm text-mf-text" aria-live="polite">
          {from === to ? from : `${from} – ${to}`}
        </span>
      </div>
      <div
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cx("group relative h-6 touch-none select-none", dragging ? "cursor-grabbing" : "cursor-grab")}
      >
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-mf-raised" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-mf-focus shadow-[0_0_10px_var(--color-mf-focus)]"
          style={{ left: `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${pct(from) / 100})`, right: `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${1 - pct(to) / 100})` }}
        />
        {(["from", "to"] as const).map((w) => (
          <input
            key={w}
            ref={(el) => {
              inputs.current[w] = el;
            }}
            type="range"
            aria-label={w === "from" ? "From year" : "To year"}
            min={min}
            max={max}
            value={w === "from" ? from : to}
            onChange={(e) => move(w, +e.target.value)}
            className={thumb}
          />
        ))}
      </div>
      <div className="flex justify-between font-mf-mono text-[0.6875rem] text-mf-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
