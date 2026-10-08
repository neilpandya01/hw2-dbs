import type { FlightView } from "./types";
import { cx } from "./styles";

// One row in a flight list. A button so it can open the detail panel.
export default function FlightRow({ flight, selected, onSelect }: { flight: FlightView; selected?: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "relative grid w-full grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 rounded-mf-sm px-4 py-3 text-left transition hover:bg-mf-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mf-focus active:bg-mf-surface sm:grid-cols-[6.5rem_1fr_10rem_5rem]",
        selected && "bg-mf-raised"
      )}
    >
      {selected && <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-mf-focus shadow-[0_0_8px_var(--color-mf-focus)]" />}
      <span className="font-mf-mono text-xs text-mf-muted">{flight.date}</span>
      <span className="font-mf text-mf-text">
        {flight.from} → {flight.to}
      </span>
      <span className="hidden truncate font-mf text-sm text-mf-muted sm:block">{flight.airline}</span>
      <span className="text-right font-mf-mono text-xs text-mf-muted tabular-nums">{flight.distanceMi.toLocaleString("en-US")} mi</span>
    </button>
  );
}
