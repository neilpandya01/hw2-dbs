import type { InputHTMLAttributes } from "react";
import { cx } from "./styles";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; type?: "checkbox" | "radio" };

// Checkbox and radio share one shape language: a square or round hairline at rest,
// espresso when chosen, which is the same "selected" color as chips and toggles.
export default function Checkbox({ label, type = "checkbox", className, ...rest }: Props) {
  const radio = type === "radio";
  return (
    <label className={cx("group inline-flex cursor-pointer items-center gap-3 font-fs text-sm font-light text-fs-text has-disabled:cursor-not-allowed has-disabled:text-fs-muted", className)}>
      <span className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
        <input
          type={type}
          className={cx(
            "peer size-[18px] cursor-pointer appearance-none border border-fs-control bg-fs-surface transition group-hover:border-fs-text checked:border-fs-text checked:bg-fs-text focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus disabled:cursor-not-allowed disabled:border-fs-border disabled:bg-fs-raised",
            radio ? "rounded-full checked:bg-fs-surface" : "rounded-none"
          )}
          {...rest}
        />
        {radio ? (
          <span className="pointer-events-none size-2 scale-0 rounded-full bg-fs-text transition peer-checked:scale-100" />
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none size-3 text-fs-surface opacity-0 transition peer-checked:opacity-100">
            <path d="M3 8.5 L6.5 12 L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
