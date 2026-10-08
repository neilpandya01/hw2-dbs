import Button from "./Button";

// The four UI states a flight view can be in. Each is a hairline frame; color
// only appears in the small mark and the frame's line, never as a big fill.

export function EmptyState() {
  return (
    <div className="grid justify-items-center gap-5 border border-fs-border bg-fs-surface p-8 text-center font-fs">
      {/* an unwritten boarding pass */}
      <svg aria-hidden viewBox="0 0 64 40" className="h-10 w-16">
        <rect x="1" y="1" width="62" height="38" fill="none" stroke="var(--color-fs-control)" />
        <path d="M44 1 V39" stroke="var(--color-fs-control)" strokeDasharray="2 3" />
        <path d="M8 14 H30 M8 22 H24 M8 30 H34" stroke="var(--color-fs-border)" strokeWidth="2" />
        <path d="M50 14 H58 M50 22 H56" stroke="var(--color-fs-border)" strokeWidth="2" />
      </svg>
      <div>
        <p className="font-fs-serif text-2xl text-fs-text">No journeys yet</p>
        <p className="mt-1.5 text-sm font-light text-fs-muted">Log your first flight to begin the map.</p>
      </div>
      <Button>Log a flight</Button>
    </div>
  );
}

export function LoadingState() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-4 border border-fs-border bg-fs-surface p-6 font-fs">
      <p className="text-sm font-light text-fs-muted">Preparing your journeys…</p>
      <div className="relative h-px overflow-hidden bg-fs-border">
        <span className="absolute inset-y-0 left-0 w-2/5 animate-fs-sweep bg-fs-focus" />
      </div>
      {[0.85, 0.6, 0.75].map((w, i) => (
        <div key={i} className="flex animate-fs-breathe items-center gap-4" style={{ animationDelay: `${i * 0.25}s` }}>
          <div className="h-2.5 w-14 bg-fs-raised" />
          <div className="h-2.5 bg-fs-raised" style={{ width: `${w * 60}%` }} />
        </div>
      ))}
    </div>
  );
}

export function ErrorState() {
  return (
    <div role="alert" className="grid gap-5 border border-fs-error/60 border-l-2 border-l-fs-error bg-fs-surface p-6 font-fs">
      <div className="flex items-start gap-3">
        <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full border border-fs-error font-fs-serif text-sm text-fs-error">!</span>
        <div>
          <p className="font-fs-serif text-xl text-fs-text">Couldn&apos;t load your journeys</p>
          <p className="mt-1 text-sm font-light text-fs-muted">The flight data didn&apos;t arrive. Check your connection and try again.</p>
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
    <div role="status" className="flex items-start gap-3 border border-fs-success/50 border-l-2 border-l-fs-success bg-fs-surface p-6 font-fs">
      <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full border border-fs-success text-fs-success">
        <svg viewBox="0 0 16 16" className="size-3"><path d="M3 8.5 L6.5 12 L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
      </span>
      <div>
        <p className="font-fs-serif text-xl text-fs-text">Flight logged</p>
        <p className="mt-1 text-sm font-light text-fs-muted">ORD to NRT is now on your map.</p>
      </div>
    </div>
  );
}
