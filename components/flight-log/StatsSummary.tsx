import Button from "@/components/ui/mid-flight/Button";
import StatTile from "@/components/ui/mid-flight/StatTile";
import { bodyText, displayText, labelText, type Unit } from "@/components/ui/mid-flight/styles";
import { TRAVELER } from "@/data/flights";
import { EARTH_CIRCUMFERENCE_MI, type summarize } from "@/lib/flightLog";

const n = (v: number) => Math.round(v).toLocaleString("en-US");

type Props = { stats: ReturnType<typeof summarize>; unit: Unit; justLogged: boolean; onLog: () => void };

// A greeting, then the first thing to look at: total distance, big and light. Then the counts behind it.
export default function StatsSummary({ stats, unit, justLogged, onLog }: Props) {
  const laps = (stats.miles / EARTH_CIRCUMFERENCE_MI).toFixed(1);
  const total = unit === "km" ? `${n(stats.km)} kilometers` : `${n(stats.miles)} miles`;
  return (
    <section aria-labelledby="total" className="grid gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={labelText}>Flying since {stats.firstYear}</p>
          <h1 id="total" className={`mt-3 ${displayText}`}>
            {total}
          </h1>
          <p className={`mt-2 text-mf-muted ${bodyText}`}>
            Welcome back, {TRAVELER}. That&apos;s {laps} times around the Earth.
          </p>
        </div>
        {/* Selected ("✓ Logged") for a few seconds after a flight is added; still clickable to log another. */}
        <Button onClick={onLog} aria-pressed={justLogged || undefined} className="w-full sm:w-auto sm:min-w-36">
          {justLogged ? "✓ Logged" : "Log a flight"}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 border-t border-mf-border pt-6 sm:grid-cols-4">
        <StatTile value={n(stats.flights)} label="Flights" />
        <StatTile value={n(stats.countries)} label="Countries" />
        <StatTile value={n(stats.airports)} label="Airports" />
        <StatTile value={`${stats.hoursEstimated ? "~" : ""}${n(stats.hours)}`} label="Hours in the air" />
      </div>
    </section>
  );
}
