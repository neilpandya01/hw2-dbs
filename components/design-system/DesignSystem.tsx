import Link from "next/link";
import type { Mood } from "@/lib/moods";
import MidFlightSystem from "./mid-flight/MidFlightSystem";

// Mood slug → its design system. Moods without one show a placeholder.
const systems: Record<string, () => React.ReactNode> = {
  "mid-flight": MidFlightSystem,
};

export default function DesignSystem({ mood }: { mood: Mood }) {
  const System = systems[mood.slug];
  if (System) return <System />;
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/" className="text-sm text-hub-text underline-offset-4 hover:underline">← Hub</Link>
      <h1 className="mt-4 text-3xl">{mood.name} · Design System</h1>
      <p className="mt-2 text-hub-muted">Design system coming soon.</p>
    </main>
  );
}
