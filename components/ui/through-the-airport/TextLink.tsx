import Link from "next/link";
import type { ReactNode } from "react";
import Arrow from "./Arrow";
import { cx } from "./styles";

const linkClass =
  "group inline-flex items-center gap-1.5 font-ap text-base font-medium text-ap-focus underline decoration-ap-focus/40 decoration-2 underline-offset-4 transition hover:decoration-ap-focus focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:text-ap-sign";

// Links are information blue, underlined, with a signage arrow that steps forward on hover.
// Without `href` it's a look-alike that does nothing (design-system specimens).
export default function TextLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  const inner = (
    <>
      {children}
      <Arrow className="size-3.5 transition group-hover:translate-x-0.5" />
    </>
  );
  if (!href)
    return (
      <button type="button" className={cx(linkClass, "cursor-pointer", className)}>
        {inner}
      </button>
    );
  return (
    <Link href={href} className={cx(linkClass, className)}>
      {inner}
    </Link>
  );
}
