// The signage arrow: straight shaft, 45° head. Points right; rotate with `dir`.
export default function Arrow({ dir = 0, className = "size-4" }: { dir?: number; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} style={{ transform: `rotate(${dir}deg)` }}>
      <path d="M8 41 H60 L38 19 H60 L91 50 L60 81 H38 L60 59 H8 Z" fill="currentColor" />
    </svg>
  );
}
