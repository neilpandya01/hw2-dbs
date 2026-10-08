import type { TextareaHTMLAttributes } from "react";
import { cx, inputStyles, labelText } from "./styles";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string };

// Multi-line sibling of TextInput: same outline, focus ring and states, for notes.
export default function TextArea({ label, hint, className, id, ...rest }: Props) {
  const areaId = id ?? `ta-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className={cx("grid gap-1.5", className)}>
      <label htmlFor={areaId} className={labelText}>
        {label}
      </label>
      <textarea
        id={areaId}
        aria-describedby={hint ? `${areaId}-msg` : undefined}
        className={cx(
          "min-h-24 w-full resize-y rounded-mf-sm border bg-mf-bg px-3.5 py-2.5 font-mf text-sm leading-relaxed text-mf-text placeholder:text-mf-muted/70 transition duration-150 outline-none",
          inputStyles.live
        )}
        {...rest}
      />
      {hint && (
        <p id={`${areaId}-msg`} className="font-mf text-xs text-mf-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
