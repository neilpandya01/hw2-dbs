import type { ReactNode } from "react";
import Button from "./Button";

// The four UI states a flight view can be in. Defaults are the design-system copy;
// the site passes its own words and actions.

export function EmptyState({
  title = "No flights logged yet",
  message = "Add your first trip to start lighting up the map.",
  action = <Button>Add a flight</Button>,
}: { title?: string; message?: string; action?: ReactNode }) {
  return (
    <div className="grid justify-items-center gap-4 rounded-mf-md border border-dashed border-mf-control p-8 text-center font-mf">
      <svg aria-hidden viewBox="0 0 40 56" className="h-14 w-10">
        <rect x="2" y="2" width="36" height="52" rx="18" fill="none" stroke="var(--color-mf-control)" strokeWidth="2" />
        <rect x="8" y="8" width="24" height="40" rx="12" fill="var(--color-mf-surface)" />
        <circle cx="16" cy="18" r="0.9" fill="var(--color-mf-muted)" /><circle cx="25" cy="24" r="0.7" fill="var(--color-mf-muted)" />
      </svg>
      <div>
        <p className="text-mf-text">{title}</p>
        <p className="mt-1 text-sm font-light text-mf-muted">{message}</p>
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ message = "Loading your flights…" }: { message?: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-3 rounded-mf-md border border-mf-border bg-mf-surface p-5 font-mf">
      <div className="flex items-center gap-3">
        <svg aria-hidden viewBox="0 0 20 20" className="size-5 animate-spin">
          <circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-mf-border)" strokeWidth="2.5" />
          <path d="M10 2 A8 8 0 0 1 18 10" fill="none" stroke="var(--color-mf-focus)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-mf-muted">{message}</p>
      </div>
      {[0.9, 0.7, 0.8].map((w, i) => (
        <div key={i} className="flex animate-mf-shimmer items-center gap-3" style={{ animationDelay: `${i * 0.2}s` }}>
          <div className="h-3 w-16 rounded-full bg-mf-raised" />
          <div className="h-3 rounded-full bg-mf-raised" style={{ width: `${w * 60}%` }} />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "Couldn't load your flights",
  message = "The flight data didn't come through. Check your connection and try again.",
  action = (
    <Button variant="secondary" className="justify-self-start">
      Try again
    </Button>
  ),
}: { title?: string; message?: string; action?: ReactNode }) {
  return (
    <div role="alert" className="grid gap-4 rounded-mf-md border border-mf-error/60 bg-mf-error/5 p-5 font-mf">
      <div className="flex items-start gap-3">
        <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-mf-error text-sm font-medium text-mf-bg">!</span>
        <div>
          <p className="text-mf-text">{title}</p>
          <p className="mt-1 text-sm font-light text-mf-muted">{message}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export function SuccessState({
  title = "Flight added",
  message = "ORD → NRT is now on your map.",
  children,
  onDismiss,
}: { title?: string; message?: string; children?: ReactNode; onDismiss?: () => void }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-mf-md border border-mf-success/50 bg-mf-surface p-5 font-mf shadow-[0_0_24px_-10px_var(--color-mf-success)]">
      <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-mf-success text-mf-bg">
        <svg viewBox="0 0 16 16" className="size-3.5"><path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-mf-text">{title}</p>
        <p className="mt-1 text-sm font-light text-mf-muted">{message}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-mf-muted transition hover:bg-mf-raised hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-95"
        >
          ✕
        </button>
      )}
    </div>
  );
}
