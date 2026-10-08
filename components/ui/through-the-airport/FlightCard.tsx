import Arrow from "./Arrow";
import Badge from "./Badge";
import type { FlightView } from "./types";
import { cx, labelText } from "./styles";

// A single flight, set like the flight screen on a gate pillar: a black header
// strip, the two airport codes huge, the facts underneath. Visual only: wrap it in
// DetailPanel (or a link) to make it interactive. It reacts to its nearest `group`.
export default function FlightCard({ flight, selected }: { flight: FlightView; selected?: boolean }) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-ap-md border-2 bg-ap-surface text-left transition duration-100 group-hover:border-ap-sign group-active:translate-y-0.5",
        selected ? "border-ap-sign outline-3 outline-ap-sign" : "border-ap-border"
      )}
    >
      <div className="flex items-center justify-between gap-3 bg-ap-sign px-4 py-2.5">
        <p className="font-ap-cond text-lg font-bold tracking-[0.04em] text-white">{flight.flightNo}</p>
        <p className="font-ap-cond text-sm font-semibold tracking-[0.08em] text-ap-sign-muted uppercase">{flight.date}</p>
      </div>
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <div>
            <p className="font-ap-cond text-5xl leading-none font-extrabold text-ap-text">{flight.from}</p>
            <p className="mt-1 font-ap text-sm text-ap-muted">{flight.fromCity}</p>
          </div>
          <Arrow className="mb-5 size-8 justify-self-center text-ap-sign transition group-hover:translate-x-1" />
          <div className="text-right">
            <p className="font-ap-cond text-5xl leading-none font-extrabold text-ap-text">{flight.to}</p>
            <p className="mt-1 font-ap text-sm text-ap-muted">{flight.toCity}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {flight.newCountry && <Badge tone="success">New country</Badge>}
          {flight.redEye && <Badge tone="info">Red-eye</Badge>}
        </div>
        <div className="grid grid-cols-3 gap-2 border-t-2 border-ap-border pt-3">
          {[
            ["Distance", `${flight.distanceMi.toLocaleString("en-US")} mi`],
            ["Time", flight.duration],
            ["Seat", flight.seat],
          ].map(([k, v]) => (
            <div key={k}>
              <p className={labelText}>{k}</p>
              <p className="font-ap-cond text-lg font-bold text-ap-text tabular-nums">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
