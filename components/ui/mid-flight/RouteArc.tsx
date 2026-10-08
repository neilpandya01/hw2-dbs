// Tiny route arc: origin dot, dashed arc, destination ring, a glowing plane mark.
export default function RouteArc({ progress = 1, className = "" }: { progress?: number; className?: string }) {
  const t = progress, x = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 60 + t * t * 112, y = (1 - t) ** 2 * 34 + 2 * (1 - t) * t * 2 + t * t * 34;
  return (
    <svg aria-hidden viewBox="0 0 120 40" className={className}>
      <path d="M8 34 Q60 2 112 34" fill="none" stroke="var(--color-mf-focus)" strokeOpacity=".35" strokeDasharray="3 4" />
      <circle cx="8" cy="34" r="2.5" fill="var(--color-mf-focus)" />
      <circle cx="112" cy="34" r="3" fill="none" stroke="var(--color-mf-focus)" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="5" fill="var(--color-mf-led)" opacity=".45" />
      <circle cx={x} cy={y} r="2" fill="#fff" />
    </svg>
  );
}
