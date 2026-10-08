import { labelText } from "./styles";

// A figure set in the serif, with a brass rule above its label.
export default function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid gap-2">
      <p className="font-fs-serif text-5xl leading-none font-light text-fs-text">{value}</p>
      <span aria-hidden className="h-px w-8 bg-fs-brass" />
      <p className={labelText}>{label}</p>
    </div>
  );
}
