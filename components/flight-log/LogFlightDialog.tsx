"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { knownAircraft, knownAirlines } from "@/components/ui/mid-flight/AircraftArt";
import Badge from "@/components/ui/mid-flight/Badge";
import Button from "@/components/ui/mid-flight/Button";
import Checkbox from "@/components/ui/mid-flight/Checkbox";
import TextArea from "@/components/ui/mid-flight/TextArea";
import TextInput from "@/components/ui/mid-flight/TextInput";
import { ErrorState } from "@/components/ui/mid-flight/States";
import { fmtDistance, headingText, labelText, type Unit } from "@/components/ui/mid-flight/styles";
import { airports, type Flight } from "@/data/flights";
import { airportByCode, toLogFlights } from "@/lib/flightLog";

type Field = "from" | "to" | "date" | "time";
type Errors = Partial<Record<Field, string>>;

// "8h 30m", "8h", "45m", "8:30" → minutes. Blank → undefined (estimated from distance). Bad → NaN.
function parseTime(s: string): number | undefined {
  const t = s.trim().toLowerCase();
  if (!t) return undefined;
  const colon = t.match(/^(\d{1,2}):([0-5]\d)$/);
  if (colon) return +colon[1] * 60 + +colon[2];
  const hm = t.match(/^(?:(\d{1,2})\s*h)?\s*(?:(\d{1,3})\s*m(?:in)?)?$/);
  if (hm && (hm[1] || hm[2])) return (+(hm[1] ?? 0)) * 60 + +(hm[2] ?? 0);
  return NaN;
}

const today = () => new Date().toISOString().slice(0, 10);

// Section title with a Required / Optional tag, so it's clear at a glance which fields can be skipped.
function SectionHead({ id, title, tag, tone, note }: { id: string; title: string; tag: string; tone?: "night"; note?: string }) {
  return (
    <div className="grid gap-1">
      <div className="flex items-center gap-3">
        <h3 id={id} className="font-mf text-base text-mf-text">
          {title}
        </h3>
        <Badge tone={tone}>{tag}</Badge>
      </div>
      {note && (
        <p id={`${id}-note`} className="font-mf text-xs font-light text-mf-muted">
          {note}
        </p>
      )}
    </div>
  );
}

type Props = { open: boolean; existing: Flight[]; unit: Unit; onClose: () => void; onAdd: (f: Flight) => void };

// "Log a flight" form: every detail a card, row or detail panel shows. Distance, the time
// estimate and "new country" are worked out, not typed, and previewed live.
// Faked: the flight joins the list for this visit only; nothing is saved.
export default function LogFlightDialog({ open, existing, unit, onClose, onAdd }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [draft, setDraft] = useState({ from: "", to: "", date: "", time: "" });

  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) {
      setErrors({});
      setBusy(false);
      setDraft({ from: "", to: "", date: "", time: "" });
      setFormKey((k) => k + 1);
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  // Run the draft through the same code as the list, so the preview matches the card exactly.
  const preview = useMemo(() => {
    const from = draft.from.toUpperCase(), to = draft.to.toUpperCase();
    if (!airportByCode.has(from) || !airportByCode.has(to) || from === to) return null;
    const minutes = parseTime(draft.time);
    const probe: Flight = { id: "__draft", date: draft.date || today(), from, to, airline: "", flightNumber: "", aircraft: "", seat: "", minutes: Number.isNaN(minutes) ? undefined : minutes };
    return toLogFlights([...existing, probe]).find((f) => f.id === "__draft")!;
  }, [draft, existing]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const text = (k: string) => String(data.get(k) ?? "").trim();
    const from = draft.from.trim().toUpperCase(), to = draft.to.trim().toUpperCase(), date = draft.date;
    const minutes = parseTime(draft.time);

    const next: Errors = {};
    if (!from) next.from = "Where did you take off from?";
    else if (!airportByCode.has(from)) next.from = `No map position for “${from}”. Pick a code from the list.`;
    if (!to) next.to = "Where did you land?";
    else if (!airportByCode.has(to)) next.to = `No map position for “${to}”. Pick a code from the list.`;
    else if (to === from) next.to = "Arrival can't be the same airport as departure.";
    if (!date) next.date = "Add the date you flew.";
    else if (date > today()) next.date = "That date hasn't happened yet.";
    if (Number.isNaN(minutes) || minutes === 0 || (minutes ?? 0) > 24 * 60) next.time = "Use hours and minutes, like 8h 30m or 8:30.";
    setErrors(next);

    const firstBad = (["from", "to", "date", "time"] as const).find((k) => next[k]);
    if (firstBad) {
      e.currentTarget.querySelector<HTMLInputElement>(`[name=${firstBad}]`)?.focus();
      return;
    }
    // A short pause so the button can show it's working, as a real save would.
    setBusy(true);
    setTimeout(() => {
      onAdd({
        id: `new-${Date.now()}`,
        date,
        from,
        to,
        airline: text("airline") || "Unknown airline",
        flightNumber: text("flightNumber").toUpperCase(),
        aircraft: text("aircraft") || "Unknown aircraft",
        seat: text("seat").toUpperCase() || "—",
        redEye: data.get("redEye") === "on" || undefined,
        notes: text("notes") || undefined,
        minutes,
      });
    }, 700);
  };

  const errorCount = Object.keys(errors).length;
  // Editing a field clears its error; the summary box goes once nothing is left to fix.
  const set = (k: Field) => (e: { target: { value: string } }) => {
    setDraft((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors(({ [k]: _, ...rest }) => rest);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && !busy && onClose()}
      aria-labelledby="log-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto rounded-mf-md border border-mf-control bg-mf-surface p-0 text-mf-text shadow-mf-glow [color-scheme:dark] backdrop:bg-mf-bg/75 backdrop:backdrop-blur-sm"
    >
      <form key={formKey} noValidate onSubmit={submit} className="grid gap-6 p-5 font-mf sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={labelText}>New entry</p>
            <h2 id="log-title" className={`mt-2 ${headingText}`}>
              Log a flight
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-mf-border text-mf-muted transition hover:border-mf-control hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-95"
          >
            ✕
          </button>
        </div>

        {errorCount > 0 && (
          <ErrorState
            title="Couldn't add this flight"
            message={`Fix the ${errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below, then try again.`}
            action={null}
          />
        )}

        <datalist id="airport-codes">
          {airports.map((a) => (
            <option key={a.iata} value={a.iata}>
              {a.city}, {a.country}
            </option>
          ))}
        </datalist>
        <datalist id="airline-names">
          {knownAirlines.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>
        <datalist id="aircraft-types">
          {knownAircraft.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>

        {/* Two groups, each tagged: what's required, and everything else (all optional). */}
        <div role="group" aria-labelledby="log-required" className="grid gap-4">
          <SectionHead id="log-required" title="Route and date" tag="Required" tone="night" />
          <div className="grid grid-cols-2 items-start gap-4">
            <TextInput label="From" name="from" required list="airport-codes" placeholder="ORD" autoComplete="off" maxLength={3} className="[&_input]:uppercase" value={draft.from} onChange={set("from")} error={errors.from} />
            <TextInput label="To" name="to" required list="airport-codes" placeholder="NRT" autoComplete="off" maxLength={3} className="[&_input]:uppercase" value={draft.to} onChange={set("to")} error={errors.to} />
          </div>
          {/* Distance and "new country" fill in as soon as both ends are known. */}
          <div aria-live="polite" className="-mt-1 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-2 text-sm font-light text-mf-muted">
            {preview ? (
              <>
                <span>
                  {preview.fromCity} to {preview.toCity} · <span className="text-mf-text">{fmtDistance(preview.distanceMi, unit)}</span> · {preview.duration}
                </span>
                {preview.newCountry && <Badge tone="success">New country</Badge>}
              </>
            ) : (
              <span className="text-xs">Distance and flight time fill in from the airports.</span>
            )}
          </div>
          <TextInput label="Date" name="date" type="date" required max={today()} value={draft.date} onChange={set("date")} error={errors.date} />
        </div>

        <div role="group" aria-labelledby="log-optional" aria-describedby="log-optional-note" className="grid gap-4 border-t border-mf-border pt-6">
          <SectionHead id="log-optional" title="Details" tag="Optional" note="Skip any you don't remember. You can add the flight with just the route and date." />
          <div className="grid grid-cols-[1fr_7rem] items-start gap-4">
            <TextInput label="Airline" name="airline" list="airline-names" placeholder="United" autoComplete="off" />
            <TextInput label="Flight no." name="flightNumber" placeholder="UA 882" autoComplete="off" maxLength={8} className="[&_input]:uppercase" />
          </div>
          <TextInput label="Aircraft" name="aircraft" list="aircraft-types" placeholder="Boeing 787-9" autoComplete="off" hint="Pick from the list to get its picture on the card." />
          <div className="grid grid-cols-[7rem_1fr] items-start gap-4">
            <TextInput label="Seat" name="seat" placeholder="32A" autoComplete="off" maxLength={4} className="[&_input]:uppercase" />
            <TextInput
              label="Flight time"
              name="time"
              placeholder={preview ? preview.duration.replace("~", "") : "8h 30m"}
              autoComplete="off"
              value={draft.time}
              onChange={set("time")}
              error={errors.time}
              hint={errors.time ? undefined : "Blank = estimated from distance."}
            />
          </div>
          <Checkbox label="Red-eye (flew overnight)" name="redEye" />
          <TextArea label="Notes" name="notes" rows={3} placeholder="What you remember about it" />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-mf-border pt-5 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" aria-busy={busy} className="aria-busy:cursor-progress">
            {busy && (
              <svg aria-hidden viewBox="0 0 20 20" className="size-4 animate-spin">
                <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="2.5" />
                <path d="M10 3 A7 7 0 0 1 17 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
            {busy ? "Adding…" : "Add to log"}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
