import type { FlightView } from "./types";
import { cx } from "./styles";

// One row in a flight list. A button so it can open the detail panel.
// Selected rows carry a short deep-brass rule on the left, like a bookmark ribbon.
export default function FlightRow({ flight, selected, onSelect }: { flight: FlightView; selected?: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "relative grid w-full grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 px-5 py-4 text-left transition hover:bg-fs-raised/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fs-focus active:bg-fs-raised sm:grid-cols-[6.5rem_1fr_10rem_5rem]",
        selected && "bg-fs-raised/70"
      )}
    >
      {selected && <span aria-hidden className="absolute inset-y-3 left-0 w-0.5 bg-fs-focus" />}
      <span className="font-fs text-xs font-light text-fs-muted tabular-nums">{flight.date}</span>
      <span className="font-fs-serif text-lg text-fs-text">
        {flight.from} <span className="text-fs-brass">—</span> {flight.to}
      </span>
      <span className="hidden truncate font-fs text-sm font-light text-fs-muted sm:block">{flight.airline}</span>
      <span className="text-right font-fs text-xs text-fs-text tabular-nums">{flight.distanceMi.toLocaleString("en-US")} mi</span>
    </button>
  );
}
