import Badge from "./Badge";
import RouteArc from "./RouteArc";
import type { FlightView } from "./types";
import { cx, labelText } from "./styles";

// A single flight. Visual only — wrap it in DetailPanel (or a link) to make it interactive;
// it reacts to hover/focus on its nearest `group` ancestor.
export default function FlightCard({ flight, selected }: { flight: FlightView; selected?: boolean }) {
  return (
    <div
      className={cx(
        "grid gap-4 rounded-mf-md border bg-mf-surface p-5 text-left transition duration-150 group-hover:border-mf-control group-hover:bg-mf-raised group-hover:shadow-mf-glow group-active:scale-[.99]",
        selected ? "border-mf-focus shadow-[0_0_18px_-6px_var(--color-mf-focus)]" : "border-mf-border"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className={labelText}>{flight.date}</p>
        {flight.redEye && <Badge tone="night">Red-eye</Badge>}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mf text-3xl font-light tracking-tight text-mf-text">
            {flight.from} <span className="text-mf-muted">→</span> {flight.to}
          </p>
          <p className="mt-1 font-mf text-sm text-mf-muted">
            {flight.fromCity} to {flight.toCity}
          </p>
        </div>
        <RouteArc progress={0.62} className="h-10 w-28 shrink-0" />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-mf-border pt-4 font-mf-mono text-xs text-mf-muted">
        <span>{flight.distanceMi.toLocaleString("en-US")} MI</span>
        <span>{flight.duration}</span>
        <span>SEAT {flight.seat}</span>
      </div>
    </div>
  );
}
