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
  const inputId = id ?? `in-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("relative grid gap-1.5", className)}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : labelText}>
        {label}
      </label>
      <div className="relative">
        {icon === "search" && (
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-mf-muted">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.5 13.5 L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          disabled={state === "disabled" || rest.disabled}
          tabIndex={state ? -1 : undefined}
          className={cx(inputBase, state ? cx(inputStyles.forced[state], "pointer-events-none") : inputStyles.live, icon && "pl-9")}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <p id={`${inputId}-msg`} className={cx("font-mf text-xs", error ? "text-mf-error" : "text-mf-muted")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
