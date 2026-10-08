import type { InputHTMLAttributes } from "react";
import { cx } from "./styles";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; type?: "checkbox" | "radio" };

// Heavy 2px boxes that fill sign-black when chosen, the same "chosen" as chips and tabs.
export default function Checkbox({ label, type = "checkbox", className, ...rest }: Props) {
  const radio = type === "radio";
  return (
    <label className={cx("group inline-flex cursor-pointer items-center gap-3 font-ap text-base text-ap-text has-disabled:cursor-not-allowed has-disabled:text-ap-muted", className)}>
      <span className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
        <input
          type={type}
          className={cx(
            "peer size-[22px] cursor-pointer appearance-none border-2 border-ap-control bg-ap-surface transition group-hover:border-ap-sign checked:border-ap-sign focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus disabled:cursor-not-allowed disabled:border-ap-control/40 disabled:bg-ap-raised",
            radio ? "rounded-full" : "rounded-ap-sm checked:bg-ap-sign"
          )}
          {...rest}
        />
        {radio ? (
          <span className="pointer-events-none size-2.5 scale-0 rounded-full bg-ap-sign transition peer-checked:scale-100" />
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none size-3.5 text-white opacity-0 transition peer-checked:opacity-100">
            <path d="M2.5 8.5 L6.5 12.5 L13.5 4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
