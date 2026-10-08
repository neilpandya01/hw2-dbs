import type { SelectHTMLAttributes } from "react";
import { cx, inputBase, inputStyles, labelText } from "./styles";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] };

export default function Select({ label, options, className, id, ...rest }: Props) {
  const selectId = id ?? `sel-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("grid gap-1.5", className)}>
      <label htmlFor={selectId} className={labelText}>
        {label}
      </label>
      <div className="relative">
        <select id={selectId} className={cx(inputBase, inputStyles.live, "cursor-pointer appearance-none pr-10")} {...rest}>
          {options.map((o) => (
            <option key={o} className="bg-mf-surface">
              {o}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-mf-muted">
          <path d="M5 8 L10 13 L15 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
