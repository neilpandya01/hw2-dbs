"use client";

import { useState } from "react";
import Chip from "./Chip";

// Multi-select filter chips; "All" clears the selection.
export default function FilterChips({ options, defaultSelected = [] }: { options: string[]; defaultSelected?: string[] }) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const toggle = (o: string) => setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
  return (
    <div role="group" aria-label="Filter flights" className="flex flex-wrap gap-2">
      <Chip selected={selected.length === 0} onClick={() => setSelected([])}>
        All
      </Chip>
      {options.map((o) => (
        <Chip key={o} selected={selected.includes(o)} onClick={() => toggle(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}
