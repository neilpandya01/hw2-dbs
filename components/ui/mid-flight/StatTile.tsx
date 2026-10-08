import { labelText } from "./styles";

export default function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid gap-1">
      <p className="font-mf text-4xl font-light tracking-tight text-mf-text">{value}</p>
      <p className={labelText}>{label}</p>
    </div>
  );
}
