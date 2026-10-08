"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/mid-flight/Button";
import TextInput from "@/components/ui/mid-flight/TextInput";
import { ErrorState } from "@/components/ui/mid-flight/States";
import { headingText, labelText } from "@/components/ui/mid-flight/styles";
import { airports, type Flight } from "@/data/flights";
import { airportByCode } from "@/lib/flightLog";

type Errors = Partial<Record<"from" | "to" | "date", string>>;

// "Log a flight" form. Faked: the flight joins the list for this visit only; nothing is saved.
export default function LogFlightDialog({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (f: Flight) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) {
      setErrors({});
      setBusy(false);
      setFormKey((k) => k + 1);
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const from = String(data.get("from")).trim().toUpperCase();
    const to = String(data.get("to")).trim().toUpperCase();
    const date = String(data.get("date"));
    const airline = String(data.get("airline")).trim();
    const flightNumber = String(data.get("flightNumber")).trim().toUpperCase();

    const next: Errors = {};
    if (!from) next.from = "Where did you take off from?";
    else if (!airportByCode.has(from)) next.from = `No map position for “${from}”. Pick a code from the list.`;
    if (!to) next.to = "Where did you land?";
    else if (!airportByCode.has(to)) next.to = `No map position for “${to}”. Pick a code from the list.`;
    else if (to === from) next.to = "Arrival can't be the same airport as departure.";
    if (!date) next.date = "Add the date you flew.";
    else if (date > new Date().toISOString().slice(0, 10)) next.date = "That date hasn't happened yet.";
    setErrors(next);

    const firstBad = (["from", "to", "date"] as const).find((k) => next[k]);
    if (firstBad) {
      e.currentTarget.querySelector<HTMLInputElement>(`[name=${firstBad}]`)?.focus();
      return;
    }
    // A short pause so the button can show it's working, as a real save would.
    setBusy(true);
    setTimeout(() => {
      onAdd({ id: `new-${Date.now()}`, date, from, to, airline: airline || "Unknown airline", flightNumber, aircraft: "—", seat: "—" });
    }, 700);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && !busy && onClose()}
      aria-labelledby="log-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(30rem,calc(100vw-2rem))] rounded-mf-md border border-mf-control bg-mf-surface p-0 text-mf-text shadow-mf-glow [color-scheme:dark] backdrop:bg-mf-bg/75 backdrop:backdrop-blur-sm"
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

        {Object.keys(errors).length > 0 && (
          <ErrorState
            title="Couldn't add this flight"
            message={`Fix the ${Object.keys(errors).length === 1 ? "highlighted field" : `${Object.keys(errors).length} highlighted fields`} below, then try again.`}
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
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="From" name="from" list="airport-codes" placeholder="ORD" autoComplete="off" maxLength={3} className="[&_input]:uppercase" error={errors.from} />
          <TextInput label="To" name="to" list="airport-codes" placeholder="NRT" autoComplete="off" maxLength={3} className="[&_input]:uppercase" error={errors.to} />
        </div>
        <TextInput label="Date" name="date" type="date" error={errors.date} />
        <div className="grid grid-cols-[1fr_8rem] gap-4">
          <TextInput label="Airline" name="airline" placeholder="Optional" />
          <TextInput label="Flight no." name="flightNumber" placeholder="UA 882" autoComplete="off" maxLength={8} className="[&_input]:uppercase" />
        </div>
        <p className="-mt-4 font-mf text-xs text-mf-muted">Airline and flight number are optional.</p>

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
