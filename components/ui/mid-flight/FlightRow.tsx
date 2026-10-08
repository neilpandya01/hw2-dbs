import type { ButtonHTMLAttributes } from "react";
import type { FlightView } from "./types";
import { shortAircraft } from "./AircraftArt";
import { cx, fmtDistance, type Unit } from "./styles";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> & { flight: FlightView; selected?: boolean; onSelect?: () => void; unit?: Unit };

// One row in a flight list. A button so it can open the detail panel.
export default function FlightRow({ flight, selected, onSelect, unit = "mi", className, ...rest }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cx(
        "relative grid w-full grid-cols-[5.5rem_1fr_4.5rem] items-center gap-4 rounded-mf-sm px-4 py-3 text-left transition hover:bg-mf-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mf-focus active:bg-mf-surface sm:grid-cols-[6.5rem_1fr_10rem_5rem]",
        selected && "bg-mf-raised",
        className
      )}
      {...rest}
    >
      {selected && <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-mf-focus shadow-[0_0_8px_var(--color-mf-focus)]" />}
      <span className="font-mf-mono text-xs text-mf-muted">
        <span className="block">{flight.date}</span>
        {flight.flightNo && <span className="block text-mf-text">{flight.flightNo}</span>}
      </span>
      <span className="min-w-0 font-mf">
        <span className="block text-mf-text">
          {flight.from} → {flight.to}
        </span>
        <span className="block truncate text-xs font-light text-mf-muted">
          {flight.fromCity} to {flight.toCity}
        </span>
      </span>
      <span className="hidden min-w-0 font-mf sm:block">
        <span className="block truncate text-sm text-mf-muted">{flight.airline}</span>
        <span className="block truncate text-xs font-light text-mf-muted">{flight.aircraft}</span>
      </span>
      <span className="text-right font-mf-mono text-xs text-mf-muted tabular-nums">
        <span className="block">{fmtDistance(flight.distanceMi, unit)}</span>
        {/* Phones hide the airline column, so the type goes here. */}
        <span className="block truncate sm:hidden">{shortAircraft(flight.aircraft)}</span>
      </span>
    </button>
  );
}
