"use client";

import { useState } from "react";
import Chip from "./Chip";

type Props<T extends string> = {
  options: T[];
  defaultSelected?: T[];
  /** Pass `value` + `onChange` to control it from the page; otherwise it keeps its own state. */
  value?: T[];
  onChange?: (v: T[]) => void;
  /** Options with nothing behind them right now. Shown disabled unless already chosen. */
  disabledOptions?: T[];
  label?: string;
};

// Multi-select filter chips; "All" clears the selection.
export default function FilterChips<T extends string>({ options, defaultSelected = [], value, onChange, disabledOptions = [], label = "Filter flights" }: Props<T>) {
  const [inner, setInner] = useState<T[]>(defaultSelected);
  const selected = value ?? inner;
  const set = (v: T[]) => {
    setInner(v);
    onChange?.(v);
  };
  const toggle = (o: T) => set(selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o]);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      <Chip selected={selected.length === 0} onClick={() => set([])}>
        All
      </Chip>
      {options.map((o) => (
        <Chip key={o} selected={selected.includes(o)} disabled={disabledOptions.includes(o) && !selected.includes(o)} onClick={() => toggle(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}
