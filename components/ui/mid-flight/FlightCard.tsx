import Badge from "./Badge";
import AircraftArt from "./AircraftArt";
import type { FlightView } from "./types";
import { cx, fmtDistance, labelText, type Unit } from "./styles";

// A single flight. Visual only — wrap it in DetailPanel (or a link) to make it interactive;
// it reacts to hover/focus on its nearest `group` ancestor.
export default function FlightCard({ flight, selected, unit = "mi" }: { flight: FlightView; selected?: boolean; unit?: Unit }) {
  return (
    <div
      className={cx(
        "@container grid gap-4 rounded-mf-md border bg-mf-surface p-5 text-left transition duration-150 group-hover:border-mf-control group-hover:bg-mf-raised group-hover:shadow-mf-glow group-active:scale-[.99]",
        selected ? "border-mf-focus shadow-[0_0_18px_-6px_var(--color-mf-focus)]" : "border-mf-border"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={cx(labelText, "shrink-0 pt-1")}>{flight.date}</p>
        <div className="flex flex-wrap justify-end gap-2">
          {flight.redEye && <Badge tone="night">Red-eye</Badge>}
          {flight.newCountry && <Badge tone="success">New country</Badge>}
        </div>
      </div>
      {/* Narrow card: route, then the plane full width. Wide card: side by side. */}
      <div className="grid gap-3 @sm:flex @sm:items-center @sm:justify-between @sm:gap-4">
        <div className="min-w-0">
          <p className="font-mf text-3xl font-light tracking-tight text-mf-text">
            {flight.from} <span className="text-mf-muted">→</span> {flight.to}
          </p>
          <p className="mt-1 font-mf text-sm text-mf-muted">
            {flight.fromCity} to {flight.toCity}
          </p>
          <p className="mt-1 font-mf text-xs font-light text-mf-muted">
            {flight.airline} · {flight.aircraft}
          </p>
        </div>
        <AircraftArt aircraft={flight.aircraft} airline={flight.airline} className="w-full max-w-72 justify-self-center @sm:w-[52%] @sm:max-w-64 @sm:shrink-0" />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-mf-border pt-4 font-mf-mono text-xs text-mf-muted">
        {flight.flightNo && <span className="text-mf-text">{flight.flightNo}</span>}
        <span>{fmtDistance(flight.distanceMi, unit).toUpperCase()}</span>
        <span>{flight.duration}</span>
        <span>SEAT {flight.seat}</span>
      </div>
    </div>
  );
}
