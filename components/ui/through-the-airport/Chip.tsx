import type { ButtonHTMLAttributes } from "react";
import { chipBase, chipStyles, cx, type ControlState } from "./styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; state?: ControlState };

export default function Chip({ selected, state, className, children, ...rest }: Props) {
  const on = selected || state === "selected";
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={state === "disabled" || rest.disabled}
      tabIndex={state ? -1 : undefined}
      className={cx(chipBase, state ? cx(chipStyles.forced[state], "pointer-events-none") : chipStyles.live, className)}
      {...rest}
    >
      {on && (
        <svg aria-hidden viewBox="0 0 16 16" className="-ml-0.5 size-3.5">
          <path d="M2.5 8.5 L6.5 12.5 L13.5 4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
        </svg>
      )}
      {children}
    </button>
  );
}
