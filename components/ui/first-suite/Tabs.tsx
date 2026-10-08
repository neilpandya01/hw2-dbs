"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./styles";

// Tracked-caps tabs over a hairline; the active tab sits on a deep-brass rule.
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
    <div role="tablist" onKeyDown={onKey} className="flex gap-8 border-b border-fs-border">
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
            "group relative -mb-px pb-3 font-fs text-[11px] font-medium tracking-[0.22em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:translate-y-px",
            i === active ? "text-fs-text" : "text-fs-muted hover:text-fs-text"
          )}
        >
          {t}
          <span
            className={cx(
              "absolute inset-x-0 bottom-0 h-0.5 transition",
              i === active ? "bg-fs-focus" : "bg-transparent group-hover:bg-fs-border"
            )}
          />
        </button>
      ))}
    </div>
  );
}
