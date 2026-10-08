"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Badge from "./Badge";
import Button from "./Button";
import RouteArc from "./RouteArc";
import type { FlightView } from "./types";
import { fmtDistance, headingText, labelText, type Unit } from "./styles";

type Props = {
  flight: FlightView;
  /** Becomes the trigger. Without it (and without `open`), a secondary "View details" button. */
  children?: ReactNode;
  /** Controlled mode: the page decides when it's open; no trigger is rendered. */
  open?: boolean;
  onClose?: () => void;
  /** Replaces the route arc picture (the site puts a globe here). */
  media?: ReactNode;
  unit?: Unit;
};

// Modal detail panel (native <dialog>: focus trap + Esc for free).
export default function DetailPanel({ flight, children, open, onClose, media, unit = "mi" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const controlled = open !== undefined;
  useEffect(() => {
    const d = ref.current;
    if (!controlled || !d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open, controlled]);
  const show = () => ref.current?.showModal();
  const close = () => (controlled ? onClose?.() : ref.current?.close());
  const facts: [string, string][] = [
    ["Date", flight.date],
    ["Flight", `${flight.airline} ${flight.flightNo}`.trim()],
    ["Aircraft", flight.aircraft],
    ["Seat", flight.seat],
    ["Distance", fmtDistance(flight.distanceMi, unit)],
    ["Duration", flight.duration],
  ];
  return (
    <>
      {controlled ? null : children ? (
        <button type="button" onClick={show} className="group block w-full rounded-mf-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus">
          {children}
        </button>
      ) : (
        <Button variant="secondary" onClick={show}>
          View details
        </Button>
      )}
      <dialog
        ref={ref}
        onClose={() => controlled && onClose?.()}
        onClick={(e) => e.target === ref.current && close()}
        aria-labelledby={`detail-${flight.id}`}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] rounded-mf-md border border-mf-control bg-mf-surface p-0 text-mf-text shadow-mf-glow backdrop:bg-mf-bg/75 backdrop:backdrop-blur-sm"
      >
        <div className="grid gap-6 p-5 font-mf sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={labelText}>Flight detail</p>
              <h2 id={`detail-${flight.id}`} className={`mt-2 ${headingText}`}>
                {flight.fromCity} → {flight.toCity}
              </h2>
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
          {media ?? <RouteArc progress={1} className="mx-auto h-20 w-64" />}
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
