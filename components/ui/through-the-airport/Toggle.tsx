"use client";

import { useState } from "react";
import { cx } from "./styles";

// A rectangular switch that says what it is, like the ON / OFF on a gate panel.
export default function Toggle({ label, defaultOn = false, disabled }: { label: string; defaultOn?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => setOn((v) => !v)}
      className="group inline-flex items-center gap-3 font-ap text-base text-ap-text focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ap-focus disabled:cursor-not-allowed disabled:text-ap-muted"
    >
      <span
        className={cx(
          "relative h-8 w-[60px] shrink-0 rounded-ap-sm border-2 transition duration-100",
          on ? "border-ap-sign bg-ap-sign" : "border-ap-control bg-ap-surface group-hover:border-ap-sign",
          "group-disabled:border-ap-control/40 group-disabled:bg-ap-raised"
        )}
      >
        <span
          aria-hidden
          className={cx(
            "absolute top-1/2 -translate-y-1/2 font-ap-cond text-[11px] font-bold tracking-[0.06em]",
            on ? "left-2 text-white" : "right-1.5 text-ap-muted"
          )}
        >
          {on ? "ON" : "OFF"}
        </span>
        <span
          className={cx(
            "absolute top-[3px] size-[22px] rounded-[1px] transition-all duration-150 group-active:scale-90",
            on ? "left-[calc(100%-25px)] bg-white" : "left-[3px] bg-ap-control group-hover:bg-ap-sign",
            "group-disabled:bg-ap-control/40"
          )}
        />
      </span>
      {label}
    </button>
  );
}
