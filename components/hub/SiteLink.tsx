import Link from "next/link";
import { primaryLink } from "./linkStyles";

export default function SiteLink() {
  return (
    <section>
      <h2 className="mb-3 text-sm uppercase">3 · Your Site</h2>
      <Link href="/flight-log" className={primaryLink}>
        Open Flight Log →
      </Link>
    </section>
  );
}
