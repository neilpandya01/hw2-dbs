"use client";

import { useRef, type ReactNode } from "react";
import Badge from "./Badge";
import Button from "./Button";
import RouteArc from "./RouteArc";
import type { FlightView } from "./types";
import { labelText } from "./styles";

// Modal detail panel (native <dialog>: focus trap + Esc for free).
// No shadow: a hairline frame with an inner brass rule, like the menu card.
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
        <button type="button" onClick={open} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus">
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
        className="m-auto w-[min(34rem,calc(100vw-2rem))] border border-fs-control bg-fs-surface p-0 text-fs-text backdrop:bg-fs-text/35"
      >
        <div className="m-2 grid gap-7 border border-fs-brass/50 p-6 font-fs sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={labelText}>Flight detail</p>
              <h3 className="mt-3 font-fs-serif text-4xl leading-tight font-light">
                {flight.fromCity} <span className="text-fs-brass">to</span> {flight.toCity}
              </h3>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center border border-fs-control text-fs-text transition hover:border-fs-text hover:bg-fs-raised focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:translate-y-px"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-3">
                <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>
          <RouteArc progress={1} className="mx-auto h-16 w-64" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className={labelText}>{k}</dt>
                <dd className="mt-1.5 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          {flight.note && <p className="font-fs-serif text-lg leading-relaxed text-fs-muted italic">“{flight.note}”</p>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-fs-border pt-6">
            <div className="flex gap-2">
              {flight.redEye && <Badge tone="slate">Red-eye</Badge>}
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
