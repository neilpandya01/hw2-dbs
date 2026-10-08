// Class strings for every control, live (real interactions) and forced
// (a static snapshot of one state, for the design-system specimens).
// Kept as literal strings so Tailwind can see them.
//
// The First Suite language: square tailored corners, 1px lines instead of
// shadows, tracked capitals on actions, espresso for "chosen", bordeaux only
// for the one primary action, and a deep-brass ring for keyboard focus.

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const focusRing = "outline-2 outline-offset-3 outline-fs-focus";
export const focusVisible = "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus";

export const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 px-6 font-fs text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap transition duration-200 select-none";

// Primary hover draws an inner ivory hairline, like the double rule on a menu card.
const innerRule = "shadow-[inset_0_0_0_3px_var(--color-fs-accent-hover),inset_0_0_0_4px_rgb(251_248_242_/_0.55)]";

export const buttonStyles = {
  primary: {
    live:
      "bg-fs-accent text-fs-surface hover:bg-fs-accent-hover hover:shadow-[inset_0_0_0_3px_var(--color-fs-accent-hover),inset_0_0_0_4px_rgb(251_248_242_/_0.55)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:translate-y-px active:bg-fs-accent-pressed active:shadow-none disabled:cursor-not-allowed disabled:bg-fs-raised disabled:text-fs-muted disabled:shadow-none aria-pressed:bg-fs-surface aria-pressed:text-fs-accent aria-pressed:shadow-[inset_0_0_0_1px_var(--color-fs-accent)]",
    forced: {
      rest: "bg-fs-accent text-fs-surface",
      hover: `bg-fs-accent-hover text-fs-surface ${innerRule}`,
      focus: `bg-fs-accent text-fs-surface ${focusRing}`,
      pressed: "translate-y-px bg-fs-accent-pressed text-fs-surface",
      selected: "bg-fs-surface text-fs-accent shadow-[inset_0_0_0_1px_var(--color-fs-accent)]",
      disabled: "cursor-not-allowed bg-fs-raised text-fs-muted",
    },
  },
  secondary: {
    live:
      "border border-fs-control bg-transparent text-fs-text hover:border-fs-text hover:bg-fs-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:translate-y-px active:bg-fs-raised disabled:cursor-not-allowed disabled:border-fs-border disabled:bg-transparent disabled:text-fs-muted aria-pressed:border-fs-text aria-pressed:bg-fs-text aria-pressed:text-fs-surface",
    forced: {
      rest: "border border-fs-control text-fs-text",
      hover: "border border-fs-text bg-fs-surface text-fs-text",
      focus: `border border-fs-control text-fs-text ${focusRing}`,
      pressed: "translate-y-px border border-fs-text bg-fs-raised text-fs-text",
      selected: "border border-fs-text bg-fs-text text-fs-surface",
      disabled: "cursor-not-allowed border border-fs-border text-fs-muted",
    },
  },
} as const;

export const chipBase =
  "inline-flex h-8 items-center gap-2 rounded-fs-sm border px-3.5 font-fs text-[13px] font-normal transition duration-200 select-none";

export const chipStyles = {
  live:
    "border-fs-control bg-fs-surface text-fs-text hover:border-fs-text hover:bg-fs-raised focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fs-focus active:translate-y-px aria-pressed:border-fs-text aria-pressed:bg-fs-text aria-pressed:text-fs-surface disabled:cursor-not-allowed disabled:border-fs-border disabled:bg-transparent disabled:text-fs-muted",
  forced: {
    rest: "border-fs-control bg-fs-surface text-fs-text",
    hover: "border-fs-text bg-fs-raised text-fs-text",
    focus: `border-fs-control bg-fs-surface text-fs-text ${focusRing}`,
    pressed: "translate-y-px border-fs-text bg-fs-raised text-fs-text",
    selected: "border-fs-text bg-fs-text text-fs-surface",
    disabled: "cursor-not-allowed border-fs-border text-fs-muted",
  },
} as const;

export const inputBase =
  "h-11 w-full rounded-fs-sm border bg-fs-surface px-3.5 font-fs text-sm font-light text-fs-text placeholder:text-fs-muted transition duration-200 outline-none";

// Focus doubles the line: a 1px border plus a 1px ring in deep brass.
export const inputStyles = {
  live:
    "border-fs-control hover:border-fs-text focus-visible:border-fs-focus focus-visible:ring-1 focus-visible:ring-fs-focus disabled:cursor-not-allowed disabled:border-fs-border disabled:bg-fs-raised/60 disabled:text-fs-muted aria-invalid:border-fs-error aria-invalid:ring-1 aria-invalid:ring-fs-error",
  forced: {
    rest: "border-fs-control",
    hover: "border-fs-text",
    focus: "border-fs-focus ring-1 ring-fs-focus",
    pressed: "",
    selected: "",
    disabled: "cursor-not-allowed border-fs-border bg-fs-raised/60 text-fs-muted",
  },
} as const;

export const labelText = "font-fs text-[11px] font-medium uppercase tracking-[0.24em] text-fs-muted";
