import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./styles";

const linkClass =
  "rounded-sm font-mf text-sm text-mf-focus underline decoration-mf-focus/40 underline-offset-4 transition hover:decoration-mf-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:text-mf-text";

// With `href` it navigates. Without one it's a button that looks like a link
// (an in-page action, or a specimen on the design-system page).
export default function TextLink({ href, onClick, className, children }: { href?: string; onClick?: () => void; className?: string; children: ReactNode }) {
  if (!href)
    return (
      <button type="button" onClick={onClick} className={cx(linkClass, "cursor-pointer", className)}>
        {children}
      </button>
    );
  return (
    <Link href={href} className={cx(linkClass, className)}>
      {children}
    </Link>
  );
}
