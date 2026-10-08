import Button from "./Button";

// The four UI states a flight view can be in.

export function EmptyState() {
  return (
    <div className="grid justify-items-center gap-4 rounded-mf-md border border-dashed border-mf-control p-8 text-center font-mf">
      <svg aria-hidden viewBox="0 0 40 56" className="h-14 w-10">
        <rect x="2" y="2" width="36" height="52" rx="18" fill="none" stroke="var(--color-mf-control)" strokeWidth="2" />
        <rect x="8" y="8" width="24" height="40" rx="12" fill="var(--color-mf-surface)" />
        <circle cx="16" cy="18" r="0.9" fill="var(--color-mf-muted)" /><circle cx="25" cy="24" r="0.7" fill="var(--color-mf-muted)" />
      </svg>
      <div>
        <p className="text-mf-text">No flights logged yet</p>
        <p className="mt-1 text-sm font-light text-mf-muted">Add your first trip to start lighting up the map.</p>
      </div>
      <Button>Add a flight</Button>
    </div>
  );
}

export function LoadingState() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-3 rounded-mf-md border border-mf-border bg-mf-surface p-5 font-mf">
      <div className="flex items-center gap-3">
        <svg aria-hidden viewBox="0 0 20 20" className="size-5 animate-spin">
          <circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-mf-border)" strokeWidth="2.5" />
          <path d="M10 2 A8 8 0 0 1 18 10" fill="none" stroke="var(--color-mf-focus)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-mf-muted">Loading your flights…</p>
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

export function ErrorState() {
  return (
    <div role="alert" className="grid gap-4 rounded-mf-md border border-mf-error/60 bg-mf-error/5 p-5 font-mf">
      <div className="flex items-start gap-3">
        <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-mf-error text-sm font-medium text-mf-bg">!</span>
        <div>
          <p className="text-mf-text">Couldn&apos;t load your flights</p>
          <p className="mt-1 text-sm font-light text-mf-muted">The flight data didn&apos;t come through. Check your connection and try again.</p>
        </div>
      </div>
      <Button variant="secondary" className="justify-self-start">
        Try again
      </Button>
    </div>
  );
}

export function SuccessState() {
  return (
    <div role="status" className="flex items-start gap-3 rounded-mf-md border border-mf-success/50 bg-mf-surface p-5 font-mf shadow-[0_0_24px_-10px_var(--color-mf-success)]">
      <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-mf-success text-mf-bg">
        <svg viewBox="0 0 16 16" className="size-3.5"><path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <div>
        <p className="text-mf-text">Flight added</p>
        <p className="mt-1 text-sm font-light text-mf-muted">ORD → NRT is now on your map.</p>
      </div>
    </div>
  );
}
