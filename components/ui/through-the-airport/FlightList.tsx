"use client";

import { useState } from "react";
import FlightRow from "./FlightRow";
import type { FlightView } from "./types";

// A plain, scannable list: column headings in condensed caps, 2px seams between rows.
export default function FlightList({ flights }: { flights: FlightView[] }) {
  const [selected, setSelected] = useState(flights[0]?.id);
  const head = "font-ap-cond text-[13px] font-semibold tracking-[0.08em] text-ap-muted uppercase";
  return (
    <div className="overflow-hidden rounded-ap-md border-2 border-ap-sign bg-ap-surface">
      <div className="grid grid-cols-[4.5rem_1fr_4.5rem] gap-3 border-b-2 border-ap-sign px-4 py-2 sm:grid-cols-[6rem_9rem_1fr_5.5rem] sm:gap-4">
        <span className={head}>Date</span>
        <span className={head}>Route</span>
        <span className={`${head} hidden sm:block`}>Airline</span>
        <span className={`${head} text-right`}>Distance</span>
      </div>
      <div className="divide-y-2 divide-ap-border">
        {flights.map((f) => (
          <FlightRow key={f.id} flight={f} selected={f.id === selected} onSelect={() => setSelected(f.id)} />
        ))}
      </div>
    </div>
  );
}
