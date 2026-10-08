"use client";

import { useState } from "react";
import { cx } from "./styles";

// A slim track with a square knob, like the slider on the suite's control tablet.
export default function Toggle({ label, defaultOn = false, disabled }: { label: string; defaultOn?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => setOn((v) => !v)}
      className="group inline-flex items-center gap-3 font-fs text-sm font-light text-fs-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fs-focus disabled:cursor-not-allowed disabled:text-fs-muted"
    >
      <span
        className={cx(
          "relative h-5 w-10 border transition duration-200",
          on ? "border-fs-text bg-fs-text" : "border-fs-control bg-fs-surface group-hover:border-fs-text",
          "group-disabled:border-fs-border group-disabled:bg-fs-raised"
        )}
      >
        <span
          className={cx(
            "absolute top-[3px] size-3 transition-all duration-200 group-active:w-4",
            on ? "left-[calc(100%-15px)] bg-fs-surface group-active:left-[calc(100%-19px)]" : "left-[3px] bg-fs-control group-hover:bg-fs-text",
            "group-disabled:bg-fs-border"
          )}
        />
      </span>
      {label}
    </button>
  );
}
