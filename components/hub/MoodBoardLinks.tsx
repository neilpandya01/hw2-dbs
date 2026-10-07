import Link from "next/link";
import { moods } from "@/lib/moods";
import { outlineLink } from "./linkStyles";

export default function MoodBoardLinks() {
  return (
    <section className="mb-8 border-b border-neutral-200 pb-8">
      <h2 className="mb-3 text-sm uppercase">1 · Mood Boards</h2>
      <ul className="flex flex-wrap gap-3">
        {moods.map((m) => (
          <li key={m.slug}>
            <Link href={`/mood-boards/${m.slug}`} className={outlineLink}>
              {m.name} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
