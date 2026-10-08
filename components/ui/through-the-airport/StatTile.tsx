import { labelText } from "./styles";

// A figure set big and heavy under a thick black rule, like a gate number on its sign.
export default function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid min-w-24 justify-items-start gap-1.5 border-t-4 border-ap-sign pt-2">
      <p className="font-ap-cond text-[64px] leading-none font-extrabold text-ap-text tabular-nums">{value}</p>
      <p className={labelText}>{label}</p>
    </div>
  );
}
