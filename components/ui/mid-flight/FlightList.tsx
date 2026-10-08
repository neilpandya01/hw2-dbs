"use client";

import { useState } from "react";
import FlightRow from "./FlightRow";
import type { FlightView } from "./types";
import type { Unit } from "./styles";

type Props = {
  flights: FlightView[];
  /** Controlled selection; omit to let the list track it itself. */
  selectedId?: string | null;
  onSelect?: (f: FlightView) => void;
  /** Hover or keyboard focus on a row (null when the pointer leaves the list). */
  onPreview?: (id: string | null) => void;
  unit?: Unit;
  /** Extra props for each row's button, e.g. aria-haspopup when rows open a dialog. */
  rowProps?: { "aria-haspopup"?: "dialog" };
};

export default function FlightList({ flights, selectedId, onSelect, onPreview, unit, rowProps }: Props) {
  const [inner, setInner] = useState(flights[0]?.id);
  const selected = selectedId === undefined ? inner : selectedId;
  return (
    <div className="divide-y divide-mf-border rounded-mf-md border border-mf-border bg-mf-bg p-1" onMouseLeave={() => onPreview?.(null)}>
      {flights.map((f) => (
        <FlightRow
          key={f.id}
          flight={f}
          unit={unit}
          selected={f.id === selected}
          onSelect={() => {
            setInner(f.id);
            onSelect?.(f);
          }}
          onMouseEnter={() => onPreview?.(f.id)}
          onFocus={() => onPreview?.(f.id)}
          {...rowProps}
        />
      ))}
    </div>
  );
}
