import type { ButtonHTMLAttributes } from "react";
import { chipBase, chipStyles, cx, type ControlState } from "./styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; state?: ControlState };

export default function Chip({ selected, state, className, children, ...rest }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={state === "disabled" || rest.disabled}
      tabIndex={state ? -1 : undefined}
      className={cx(chipBase, state ? cx(chipStyles.forced[state], "pointer-events-none") : chipStyles.live, className)}
      {...rest}
    >
      {(selected || state === "selected") && <span aria-hidden className="size-1.5 rounded-full bg-mf-focus" />}
      {children}
    </button>
  );
}
