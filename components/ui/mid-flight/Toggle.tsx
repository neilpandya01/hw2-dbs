"use client";

import { useState } from "react";
import { cx } from "./styles";

type Props = { label: string; defaultOn?: boolean; disabled?: boolean; on?: boolean; onChange?: (on: boolean) => void };

// Pass `on` + `onChange` to control it from the page; otherwise it keeps its own state.
export default function Toggle({ label, defaultOn = false, disabled, on: onProp, onChange }: Props) {
  const [inner, setInner] = useState(defaultOn);
  const on = onProp ?? inner;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => {
        setInner(!on);
        onChange?.(!on);
      }}
      className="group inline-flex shrink-0 items-center gap-3 rounded-full font-mf whitespace-nowrap text-sm text-mf-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-focus disabled:cursor-not-allowed disabled:text-mf-muted/50"
    >
      <span
        className={cx(
          "relative h-6 w-11 rounded-full border transition",
          on ? "border-mf-focus bg-mf-focus/25 shadow-[0_0_14px_-4px_var(--color-mf-focus)]" : "border-mf-control bg-mf-bg group-hover:border-mf-muted",
          "group-disabled:border-mf-border group-disabled:bg-mf-surface group-disabled:shadow-none"
        )}
      >
        <span
          className={cx(
            "absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-all group-active:w-5",
            on ? "left-[calc(100%-1.25rem)] bg-mf-focus group-active:left-[calc(100%-1.5rem)]" : "left-1 bg-mf-muted",
            "group-disabled:bg-mf-border"
          )}
        />
      </span>
      {label}
    </button>
  );
}
