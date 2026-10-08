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
  const inputId = id ?? `ap-in-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("relative grid gap-2", className)}>
      <label htmlFor={inputId} className={hideLabel ? "sr-only" : labelText}>
        {label}
      </label>
      <div className="relative">
        {icon === "search" && (
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-ap-sign">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
            <path d="M12.6 12.6 L17.5 17.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="square" />
          </svg>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          disabled={state === "disabled" || rest.disabled}
          tabIndex={state ? -1 : undefined}
          className={cx(inputBase, state ? cx(inputStyles.forced[state], "pointer-events-none") : inputStyles.live, icon && "pl-11")}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <p id={`${inputId}-msg`} className={cx("flex items-center gap-2 font-ap text-sm", error ? "font-medium text-ap-error" : "text-ap-muted")}>
          {error && <span aria-hidden className="grid size-4 place-items-center rounded-ap-sm bg-ap-error font-ap-cond text-[11px] font-bold text-white">!</span>}
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
