"use client";

import { useState } from "react";
import FlightRow from "./FlightRow";
import type { FlightView } from "./types";

export default function FlightList({ flights }: { flights: FlightView[] }) {
  const [selected, setSelected] = useState(flights[0]?.id);
  return (
    <div className="divide-y divide-fs-border border-y border-fs-border bg-fs-surface">
      {flights.map((f) => (
        <FlightRow key={f.id} flight={f} selected={f.id === selected} onSelect={() => setSelected(f.id)} />
      ))}
    </div>
  );
}
