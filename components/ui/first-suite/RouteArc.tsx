// Route arc drawn like a brochure map: a brass hairline arc, a filled origin,
// an open destination, and a small espresso diamond for the aircraft.
export default function RouteArc({ progress = 1, className = "" }: { progress?: number; className?: string }) {
  const t = progress, x = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 60 + t * t * 112, y = (1 - t) ** 2 * 34 + 2 * (1 - t) * t * 4 + t * t * 34;
  return (
    <svg aria-hidden viewBox="0 0 120 40" className={className}>
      <path d="M8 34 Q60 4 112 34" fill="none" stroke="var(--color-fs-brass)" strokeWidth="1" />
      <circle cx="8" cy="34" r="2.5" fill="var(--color-fs-text)" />
      <circle cx="112" cy="34" r="2.75" fill="var(--color-fs-surface)" stroke="var(--color-fs-text)" strokeWidth="1" />
      {t < 1 && <rect x={x - 3} y={y - 3} width="6" height="6" transform={`rotate(45 ${x} ${y})`} fill="var(--color-fs-text)" />}
    </svg>
  );
}
