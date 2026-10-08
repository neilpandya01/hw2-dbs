import { cx } from "./styles";

const tones = {
  neutral: "border-mf-border bg-mf-raised text-mf-muted",
  night: "border-mf-led/40 bg-mf-led/10 text-[#a9c3ff]",
  success: "border-mf-success/40 bg-mf-success/10 text-mf-success",
} as const;

// Status labels. Never amber — amber is reserved for the primary action.
export default function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={cx("inline-flex h-6 shrink-0 items-center whitespace-nowrap gap-1.5 rounded-mf-sm border px-2 font-mf-mono text-[0.625rem] uppercase tracking-[0.15em]", tones[tone])}>
      {children}
    </span>
  );
}
