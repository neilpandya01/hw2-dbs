import { notFound } from "next/navigation";
import { getMood, moods } from "@/lib/moods";
import MoodBoard from "@/components/mood-board/MoodBoard";

export const dynamicParams = false;

export function generateStaticParams() {
  return moods.map((m) => ({ mood: m.slug }));
}

export default async function MoodBoardPage({ params }: { params: Promise<{ mood: string }> }) {
  const mood = getMood((await params).mood);
  if (!mood) notFound();
  return <MoodBoard mood={mood} />;
}
