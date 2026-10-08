"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "./styles";

// Underline tabs. Arrow keys move between tabs (roving tabindex).
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
    <div role="tablist" onKeyDown={onKey} className="flex gap-6 border-b border-mf-border">
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
            "relative -mb-px rounded-t-sm px-1.5 pb-3 font-mf text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:translate-y-px",
            i === active ? "text-mf-text" : "text-mf-muted hover:text-mf-text"
          )}
        >
          {t}
          <span
            className={cx(
              "absolute inset-x-0 bottom-0 h-0.5 rounded-full transition",
              i === active ? "bg-mf-focus shadow-[0_0_10px_var(--color-mf-focus)]" : "bg-transparent"
            )}
          />
        </button>
      ))}
    </div>
  );
}
