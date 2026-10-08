import Badge from "./Badge";
import RouteArc from "./RouteArc";
import type { FlightView } from "./types";
import { cx, labelText } from "./styles";

// A single flight, set like a printed itinerary. Visual only: wrap it in DetailPanel
// (or a link) to make it interactive. It reacts to hover/focus on its nearest `group` ancestor.
export default function FlightCard({ flight, selected }: { flight: FlightView; selected?: boolean }) {
  return (
    <div
      className={cx(
        "grid gap-5 border bg-fs-surface p-6 text-left transition duration-200 group-hover:border-fs-text group-active:bg-fs-raised",
        selected ? "border-fs-text shadow-[inset_0_0_0_1px_var(--color-fs-text)]" : "border-fs-border"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className={labelText}>{flight.date}</p>
        {flight.newCountry && <Badge tone="success">New country</Badge>}
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-end gap-4">
        <div>
          <p className="font-fs-serif text-4xl leading-none text-fs-text">{flight.from}</p>
          <p className="mt-2 font-fs text-xs font-light text-fs-muted">{flight.fromCity}</p>
        </div>
        <RouteArc progress={0.6} className="mb-6 h-8 w-full min-w-16" />
        <div className="text-right">
          <p className="font-fs-serif text-4xl leading-none text-fs-text">{flight.to}</p>
          <p className="mt-2 font-fs text-xs font-light text-fs-muted">{flight.toCity}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-fs-border pt-4 font-fs text-xs text-fs-text tabular-nums">
        <span>{flight.distanceMi.toLocaleString("en-US")} mi</span>
        <span>{flight.duration}</span>
        <span>Seat {flight.seat}</span>
        <span className="ml-auto font-light text-fs-muted transition group-hover:text-fs-text">Details →</span>
      </div>
    </div>
  );
}
