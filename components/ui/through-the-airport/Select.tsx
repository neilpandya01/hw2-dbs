import type { SelectHTMLAttributes } from "react";
import { cx, inputBase, inputStyles, labelText } from "./styles";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] };

// A select ends in a black arrow tile, like the direction block on a sign.
export default function Select({ label, options, className, id, ...rest }: Props) {
  const selectId = id ?? `ap-sel-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("grid gap-2", className)}>
      <label htmlFor={selectId} className={labelText}>
        {label}
      </label>
      <div className="relative">
        <select id={selectId} className={cx(inputBase, inputStyles.live, "cursor-pointer appearance-none pr-14")} {...rest}>
          {options.map((o) => (
            <option key={o} className="bg-ap-surface">
              {o}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute inset-y-[2px] right-[2px] grid w-10 place-items-center bg-ap-sign text-white">
          <svg viewBox="0 0 20 20" className="size-3.5">
            <path d="M4 7 L10 13 L16 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
          </svg>
        </span>
      </div>
    </div>
  );
}
