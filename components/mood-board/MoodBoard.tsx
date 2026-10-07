import type { Mood } from "@/lib/moods";
import ArtifactGrid from "./ArtifactGrid";

export default function MoodBoard({ mood }: { mood: Mood }) {
  return (
    <main className="p-6">
      <h1 className="text-3xl">{mood.name}</h1>
      <ArtifactGrid />
    </main>
  );
}
