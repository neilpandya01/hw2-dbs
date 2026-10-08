import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./styles";

const linkClass =
  "font-fs text-sm text-fs-link underline decoration-fs-link/35 decoration-1 underline-offset-[5px] transition hover:decoration-fs-link hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:text-fs-text";

// With `href` it navigates. Without one it's a look-alike that does nothing,
// used for specimens on the design-system page.
export default function TextLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  if (!href)
    return (
      <button type="button" className={cx(linkClass, "cursor-pointer", className)}>
        {children}
      </button>
    );
  return (
    <Link href={href} className={cx(linkClass, className)}>
      {children}
    </Link>
  );
}
