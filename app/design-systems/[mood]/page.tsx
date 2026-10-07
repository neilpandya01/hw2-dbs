import { notFound } from "next/navigation";
import { getMood, moods } from "@/lib/moods";
import DesignSystem from "@/components/design-system/DesignSystem";

export const dynamicParams = false;

export function generateStaticParams() {
  return moods.map((m) => ({ mood: m.slug }));
}

export default async function DesignSystemPage({ params }: { params: Promise<{ mood: string }> }) {
  const mood = getMood((await params).mood);
  if (!mood) notFound();
  return <DesignSystem mood={mood} />;
}
