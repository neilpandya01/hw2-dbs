import type { SelectHTMLAttributes } from "react";
import { cx, inputBase, inputStyles, labelText } from "./styles";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] };

export default function Select({ label, options, className, id, ...rest }: Props) {
  const selectId = id ?? `fs-sel-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("grid gap-2", className)}>
      <label htmlFor={selectId} className={labelText}>
        {label}
      </label>
      <div className="relative">
        <select id={selectId} className={cx(inputBase, inputStyles.live, "cursor-pointer appearance-none pr-10")} {...rest}>
          {options.map((o) => (
            <option key={o} className="bg-fs-surface">
              {o}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-fs-text">
          <path d="M5 8 L10 13 L15 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
