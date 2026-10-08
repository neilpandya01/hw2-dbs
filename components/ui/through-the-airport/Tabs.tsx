"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./styles";

// Tabs sit in a black sign bar; the active tab is the lit white panel.
// Arrow keys move between tabs (roving tabindex).
export default function Tabs({ tabs, defaultIndex = 0, onChange }: { tabs: string[]; defaultIndex?: number; onChange?: (i: number) => void }) {
  const [active, setActive] = useState(defaultIndex);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number) => {
    setActive(i);
    onChange?.(i);
    refs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") select((active + 1) % tabs.length);
    if (e.key === "ArrowLeft") select((active - 1 + tabs.length) % tabs.length);
  };
  return (
    <div role="tablist" onKeyDown={onKey} className="inline-flex max-w-full gap-1 overflow-x-auto rounded-ap-md bg-ap-sign p-1">
      {tabs.map((t, i) => (
        <button
          key={t}
          ref={(el) => {
            refs.current[i] = el;
          }}
          role="tab"
          type="button"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          onClick={() => select(i)}
          className={cx(
            "h-10 rounded-ap-sm px-4 font-ap-cond text-[15px] font-bold tracking-[0.04em] whitespace-nowrap uppercase transition duration-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:translate-y-px",
            i === active ? "bg-ap-surface text-ap-sign" : "text-white/75 hover:bg-white/15 hover:text-white"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
