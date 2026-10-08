import Arrow from "./Arrow";
import type { FlightView } from "./types";
import { cx } from "./styles";

// One row of the flight list. A button so it can open the detail panel.
// The selected row gets a concrete fill and a thick black bar on its left edge.
export default function FlightRow({ flight, selected, onSelect }: { flight: FlightView; selected?: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "relative grid w-full grid-cols-[4.5rem_1fr_4.5rem] items-center gap-3 px-4 py-3 text-left transition duration-100 hover:bg-ap-raised/60 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ap-focus active:bg-ap-raised sm:grid-cols-[6rem_9rem_1fr_5.5rem] sm:gap-4",
        selected && "bg-ap-raised"
      )}
    >
      {selected && <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-ap-sign" />}
      <span className="font-ap-cond text-[15px] font-semibold tracking-[0.04em] text-ap-muted uppercase tabular-nums">{flight.date.replace(/, 20/, " ’")}</span>
      <span className="flex items-center gap-2 font-ap-cond text-[22px] leading-none font-extrabold text-ap-text">
        {flight.from}
        <Arrow className="size-3.5 text-ap-sign" />
        {flight.to}
      </span>
      <span className="hidden truncate font-ap text-base text-ap-muted sm:block">{flight.airline}</span>
      <span className="text-right font-ap-cond text-lg font-bold text-ap-text tabular-nums">{flight.distanceMi.toLocaleString("en-US")} mi</span>
    </button>
  );
}
