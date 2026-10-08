"use client";

import { useRef, type ReactNode } from "react";
import Badge from "./Badge";
import Button from "./Button";
import RouteArc from "./RouteArc";
import type { FlightView } from "./types";
import { labelText } from "./styles";

// Modal detail panel (native <dialog>: focus trap + Esc for free).
// With children, the children become the trigger; otherwise a secondary button.
export default function DetailPanel({ flight, children }: { flight: FlightView; children?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();
  const facts: [string, string][] = [
    ["Date", flight.date],
    ["Flight", `${flight.airline} ${flight.flightNo}`],
    ["Aircraft", flight.aircraft],
    ["Seat", flight.seat],
    ["Distance", `${flight.distanceMi.toLocaleString("en-US")} mi`],
    ["Duration", flight.duration],
  ];
  return (
    <>
      {children ? (
        <button type="button" onClick={open} className="group block w-full rounded-mf-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus">
          {children}
        </button>
      ) : (
        <Button variant="secondary" onClick={open}>
          View details
        </Button>
      )}
      <dialog
        ref={ref}
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-mf-md border border-mf-control bg-mf-surface p-0 text-mf-text shadow-mf-glow backdrop:bg-mf-bg/75 backdrop:backdrop-blur-sm"
      >
        <div className="grid gap-6 p-6 font-mf">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={labelText}>Flight detail</p>
              <h3 className="mt-2 text-3xl font-light tracking-tight">
                {flight.fromCity} → {flight.toCity}
              </h3>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-mf-border text-mf-muted transition hover:border-mf-control hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-95"
            >
              ✕
            </button>
          </div>
          <RouteArc progress={1} className="mx-auto h-20 w-64" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className={labelText}>{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          {flight.note && <p className="border-l-2 border-mf-led/50 pl-4 text-sm leading-relaxed font-light text-mf-muted">{flight.note}</p>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mf-border pt-5">
            <div className="flex gap-2">
              {flight.redEye && <Badge tone="night">Red-eye</Badge>}
              {flight.newCountry && <Badge tone="success">New country</Badge>}
            </div>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
