"use client";

import { useState } from "react";
import FlightRow from "./FlightRow";
import type { FlightView } from "./types";

export default function FlightList({ flights }: { flights: FlightView[] }) {
  const [selected, setSelected] = useState(flights[0]?.id);
  return (
    <div className="divide-y divide-mf-border rounded-mf-md border border-mf-border bg-mf-bg p-1">
      {flights.map((f) => (
        <FlightRow key={f.id} flight={f} selected={f.id === selected} onSelect={() => setSelected(f.id)} />
      ))}
    </div>
  );
}
