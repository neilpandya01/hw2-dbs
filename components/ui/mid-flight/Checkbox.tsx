import type { InputHTMLAttributes } from "react";
import { cx } from "./styles";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; type?: "checkbox" | "radio" };

// Checkbox and radio share one shape language: hairline outline at rest,
// cyan fill when chosen — the same "selected" color as chips and tabs.
export default function Checkbox({ label, type = "checkbox", className, ...rest }: Props) {
  const radio = type === "radio";
  return (
    <label className={cx("group inline-flex cursor-pointer items-center gap-2.5 font-mf text-sm text-mf-text has-disabled:cursor-not-allowed has-disabled:text-mf-muted/50", className)}>
      <span className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
        <input
          type={type}
          className={cx(
            "peer size-5 cursor-pointer appearance-none border border-mf-control bg-mf-bg transition group-hover:border-mf-muted checked:border-mf-focus checked:bg-mf-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus disabled:cursor-not-allowed disabled:border-mf-border disabled:bg-mf-surface",
            radio ? "rounded-full checked:bg-mf-bg" : "rounded-[5px]"
          )}
          {...rest}
        />
        {radio ? (
          <span className="pointer-events-none size-2.5 scale-0 rounded-full bg-mf-focus transition peer-checked:scale-100" />
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none size-3.5 text-mf-bg opacity-0 transition peer-checked:opacity-100">
            <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
