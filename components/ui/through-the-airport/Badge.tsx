import { cx } from "./styles";

const tones = {
  neutral: "border-2 border-ap-sign text-ap-sign",
  info: "bg-ap-focus text-white",
  success: "bg-ap-success text-white",
  warning: "bg-ap-warning text-ap-sign",
  error: "bg-ap-error text-white",
} as const;

// Status blocks, set like the REMARKS column on a departures board: a solid fill
// whose color means one thing. Never yellow, because yellow is the primary action.
export default function Badge({ tone = "neutral", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={cx("inline-flex h-6 items-center rounded-ap-sm px-2 font-ap-cond text-[13px] font-bold tracking-[0.06em] uppercase", tones[tone])}>
      {children}
    </span>
  );
}
