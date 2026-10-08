import type { ButtonHTMLAttributes } from "react";
import { buttonBase, buttonStyles, cx, type ControlState } from "./styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  /** Freeze the button in one state (design-system specimens only). */
  state?: ControlState;
};

// Primary = the one amber action on a screen. Secondary = everything else.
export default function Button({ variant = "primary", state, className, disabled, ...rest }: Props) {
  const s = buttonStyles[variant];
  return (
    <button
      type="button"
      disabled={disabled ?? state === "disabled"}
      tabIndex={state ? -1 : undefined}
      className={cx(buttonBase, state ? cx(s.forced[state], "pointer-events-none") : s.live, className)}
      {...rest}
    />
  );
}
