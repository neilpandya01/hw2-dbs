"use client";

import { useRef, type ReactNode } from "react";
import Badge from "./Badge";
import Button from "./Button";
import Arrow from "./Arrow";
import type { FlightView } from "./types";
import { labelText } from "./styles";

// Modal detail panel (native <dialog>: focus trap + Esc for free), set like a
// gate screen: a black header with the route in big white letters, facts below.
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
        <button type="button" onClick={open} className="group block w-full rounded-ap-md text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus">
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
        className="m-auto w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-ap-md border-2 border-ap-sign bg-ap-surface p-0 text-ap-text backdrop:bg-ap-sign/60"
      >
        <div className="grid gap-5 bg-ap-sign p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-ap-cond text-[13px] font-semibold tracking-[0.12em] text-ap-sign-muted uppercase">Flight detail · {flight.flightNo}</p>
              <h3 className="mt-1 font-ap-cond text-2xl leading-tight font-bold text-white">
                {flight.fromCity} to {flight.toCity}
              </h3>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-10 shrink-0 place-items-center rounded-ap-sm border-2 border-white/60 text-white transition hover:border-white hover:bg-white hover:text-ap-sign focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:translate-y-0.5"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-3.5">
                <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="2.4" />
              </svg>
            </button>
          </div>
          <p className="flex items-center gap-3 font-ap-cond text-6xl leading-none font-extrabold text-white">
            {flight.from}
            <Arrow className="size-9" />
            {flight.to}
          </p>
        </div>
        <div className="grid gap-6 p-5 font-ap sm:p-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="border-l-4 border-ap-sign pl-3">
                <dt className={labelText}>{k}</dt>
                <dd className="mt-0.5 font-ap-cond text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          {flight.note && <p className="text-base leading-relaxed text-ap-muted">“{flight.note}”</p>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-ap-border pt-5">
            <div className="flex gap-1.5">
              {flight.redEye && <Badge tone="info">Red-eye</Badge>}
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
