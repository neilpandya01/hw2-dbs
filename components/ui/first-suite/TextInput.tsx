import type { InputHTMLAttributes } from "react";
import { cx, inputBase, inputStyles, labelText, type ControlState } from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  icon?: "search";
  /** Keep the label for screen readers but hide it visually. */
  hideLabel?: boolean;
  state?: ControlState;
};

export default function TextInput({ label, hint, error, icon, hideLabel, state, className, id, ...rest }: Props) {
  const inputId = id ?? `fs-in-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("relative grid gap-2", className)}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : labelText}>
        {label}
      </label>
      <div className="relative">
        {icon === "search" && (
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fs-muted">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M12.5 12.5 L17 17" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          disabled={state === "disabled" || rest.disabled}
          tabIndex={state ? -1 : undefined}
          className={cx(inputBase, state ? cx(inputStyles.forced[state], "pointer-events-none") : inputStyles.live, icon && "pl-10")}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <p id={`${inputId}-msg`} className={cx("font-fs text-xs", error ? "text-fs-error" : "font-light text-fs-muted")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
