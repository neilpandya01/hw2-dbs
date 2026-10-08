import FlightCard from "@/components/ui/mid-flight/FlightCard";
import DSFlightList from "@/components/ui/mid-flight/FlightList";
import { headingText, labelText, type Unit } from "@/components/ui/mid-flight/styles";
import type { LogFlight } from "@/lib/flightLog";

export type View = "List" | "Cards";

type Props = {
  flights: LogFlight[];
  view: View;
  /** Group under year headings (only makes sense when sorted by date). */
  byYear: boolean;
  unit: Unit;
  selectedId: string | null;
  onPreview: (id: string | null) => void;
  onOpen: (f: LogFlight) => void;
};

// The flights as list rows or cards. Hover or focus one to trace it on the globe; click to open it.
export default function FlightList({ flights, view, byYear, unit, selectedId, onPreview, onOpen }: Props) {
  const groups = byYear ? [...new Set(flights.map((f) => f.year))].map((y) => ({ year: y, list: flights.filter((f) => f.year === y) })) : [{ year: null, list: flights }];

  const body = (list: LogFlight[]) =>
    view === "List" ? (
      <DSFlightList
        flights={list}
        unit={unit}
        selectedId={selectedId}
        onSelect={(f) => onOpen(f as LogFlight)}
        onPreview={onPreview}
        rowProps={{ "aria-haspopup": "dialog" }}
      />
    ) : (
      <div className="grid gap-3" onMouseLeave={() => onPreview(null)}>
        {list.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-haspopup="dialog"
            onClick={() => onOpen(f)}
            onMouseEnter={() => onPreview(f.id)}
            onFocus={() => onPreview(f.id)}
            className="group block w-full rounded-mf-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus"
          >
            <FlightCard flight={f} unit={unit} selected={f.id === selectedId} />
          </button>
        ))}
      </div>
    );

  return (
    <div className="grid gap-6">
      {groups.map(({ year, list }) =>
        year === null ? (
          <div key="all">{body(list)}</div>
        ) : (
          <section key={year} aria-labelledby={`y-${year}`} className="grid gap-2">
            <h3 id={`y-${year}`} className="flex items-baseline justify-between px-1">
              <span className={headingText}>{year}</span>
              <span className={labelText}>
                {list.length} {list.length === 1 ? "flight" : "flights"}
              </span>
            </h3>
            {body(list)}
          </section>
        )
      )}
    </div>
  );
}
