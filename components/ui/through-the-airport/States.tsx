import Arrow from "./Arrow";
import Button from "./Button";

// The four UI states a flight view can be in. Error and success are announced
// like remarks: a solid status strip whose color means one thing, then a plain
// sentence. Empty and loading stay neutral: an outline and a pictogram.

export function EmptyState() {
  return (
    <div className="grid justify-items-start gap-5 rounded-ap-md border-2 border-dashed border-ap-control bg-ap-surface p-5 font-ap">
      <span aria-hidden className="grid size-12 place-items-center rounded-ap-sm border-2 border-ap-sign text-ap-sign">
        <svg viewBox="0 0 100 100" className="size-7">
          <g transform="rotate(45 50 50)">
            <path d="M50 4 C55 4 57 11 57 19 L57 37 L94 58 L94 67 L57 57 L57 77 L69 87 L69 94 L50 89 L31 94 L31 87 L43 77 L43 57 L6 67 L6 58 L43 37 L43 19 C43 11 45 4 50 4 Z" fill="currentColor" />
          </g>
        </svg>
      </span>
      <div>
        <p className="font-ap-cond text-2xl font-bold text-ap-text">No flights yet</p>
        <p className="mt-1 text-sm text-ap-muted">Log your first flight to start the map.</p>
      </div>
      <Button>Log a flight</Button>
    </div>
  );
}

export function LoadingState() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-4 rounded-ap-md border-2 border-ap-border bg-ap-surface p-5 font-ap">
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex gap-1 text-ap-sign">
          {[0, 1, 2].map((i) => (
            <span key={i} className="animate-ap-march" style={{ animationDelay: `${i * 0.4}s` }}>
              <Arrow className="size-5" />
            </span>
          ))}
        </span>
        <p className="font-ap-cond text-[15px] font-semibold tracking-[0.08em] text-ap-muted uppercase">Finding your flights…</p>
      </div>
      {[0.8, 0.55, 0.7].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-3.5 w-12 rounded-[2px] bg-ap-raised" />
          <div className="h-3.5 rounded-[2px] bg-ap-raised" style={{ width: `${w * 70}%` }} />
        </div>
      ))}
    </div>
  );
}

function Notice({ tone, strip, title, body, children }: { tone: "error" | "success"; strip: string; title: string; body: string; children?: React.ReactNode }) {
  const color = tone === "error" ? "border-ap-error" : "border-ap-success";
  const fill = tone === "error" ? "bg-ap-error" : "bg-ap-success";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`overflow-hidden rounded-ap-md border-2 ${color} bg-ap-surface font-ap`}>
      <p className={`${fill} px-4 py-2 font-ap-cond text-[15px] font-bold tracking-[0.1em] text-white uppercase`}>{strip}</p>
      <div className="grid gap-4 p-4">
        <div>
          <p className="font-ap-cond text-xl font-bold text-ap-text">{title}</p>
          <p className="mt-1 text-sm text-ap-muted">{body}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ErrorState() {
  return (
    <Notice tone="error" strip="Not loaded" title="Couldn’t load your flights" body="The flight data didn’t arrive. Check your connection and try again.">
      <Button variant="secondary" className="justify-self-start">
        Try again
      </Button>
    </Notice>
  );
}

export function SuccessState() {
  return <Notice tone="success" strip="Logged" title="Flight added" body="ORD to NRT is now on your map." />;
}
