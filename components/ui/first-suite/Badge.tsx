import { cx } from "./styles";

const tones = {
  neutral: "border-fs-control/60 bg-transparent text-fs-muted",
  slate: "border-fs-link/40 bg-fs-link/8 text-fs-link",
  success: "border-fs-success/45 bg-fs-success/10 text-fs-success",
  warning: "border-fs-warning/45 bg-fs-warning/8 text-fs-warning",
} as const;

// Status labels: a hairline frame and tracked capitals. Never bordeaux,
// because bordeaux is kept for the primary action.
export default function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={cx("inline-flex h-6 items-center border px-2.5 font-fs text-[10px] font-medium uppercase tracking-[0.2em]", tones[tone])}>
      {children}
    </span>
  );
}
