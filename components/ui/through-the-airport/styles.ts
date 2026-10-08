// Class strings for every control, live (real interactions) and forced
// (a static snapshot of one state, for the design-system specimens).
// Kept as literal strings so Tailwind can see them.
//
// The airport language: heavy 2px outlines, condensed capitals, sign black for
// "chosen", signal yellow only on the one primary action, information blue for
// keyboard focus, and hatching for anything closed. No shadows, no glow.

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const focusRing = "outline-3 outline-offset-2 outline-ap-focus";
export const focusVisible = "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus";

export const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-ap-md px-5 font-ap-cond text-[17px] font-bold uppercase tracking-[0.04em] whitespace-nowrap transition duration-100 select-none";

// Primary hover inverts like a sign lighting up: black panel, yellow letters.
export const buttonStyles = {
  primary: {
    live:
      "bg-ap-accent text-ap-sign hover:bg-ap-sign hover:text-ap-accent focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:translate-y-0.5 active:bg-ap-accent-pressed active:text-ap-sign disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-ap-raised disabled:text-ap-muted disabled:ap-hatch aria-pressed:bg-ap-success aria-pressed:text-white",
    forced: {
      rest: "bg-ap-accent text-ap-sign",
      hover: "bg-ap-sign text-ap-accent",
      focus: `bg-ap-accent text-ap-sign ${focusRing}`,
      pressed: "translate-y-0.5 bg-ap-accent-pressed text-ap-sign",
      selected: "bg-ap-success text-white",
      disabled: "ap-hatch cursor-not-allowed bg-ap-raised text-ap-muted",
    },
  },
  secondary: {
    live:
      "border-2 border-ap-sign bg-ap-surface text-ap-sign hover:bg-ap-raised focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:translate-y-0.5 active:bg-[#cfccc6] disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-ap-control/50 disabled:bg-ap-raised disabled:text-ap-muted disabled:ap-hatch aria-pressed:bg-ap-sign aria-pressed:text-white",
    forced: {
      rest: "border-2 border-ap-sign bg-ap-surface text-ap-sign",
      hover: "border-2 border-ap-sign bg-ap-raised text-ap-sign",
      focus: `border-2 border-ap-sign bg-ap-surface text-ap-sign ${focusRing}`,
      pressed: "translate-y-0.5 border-2 border-ap-sign bg-[#cfccc6] text-ap-sign",
      selected: "border-2 border-ap-sign bg-ap-sign text-white",
      disabled: "ap-hatch cursor-not-allowed border-2 border-ap-control/50 bg-ap-raised text-ap-muted",
    },
  },
} as const;

export const chipBase =
  "inline-flex h-9 items-center gap-1.5 rounded-ap-sm border-2 px-3 font-ap-cond text-[15px] font-semibold uppercase tracking-[0.04em] transition duration-100 select-none";

export const chipStyles = {
  live:
    "border-ap-control bg-ap-surface text-ap-text hover:border-ap-sign hover:bg-ap-raised focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus active:translate-y-px aria-pressed:border-ap-sign aria-pressed:bg-ap-sign aria-pressed:text-white disabled:cursor-not-allowed disabled:border-ap-control/40 disabled:bg-ap-raised disabled:text-ap-muted disabled:ap-hatch",
  forced: {
    rest: "border-ap-control bg-ap-surface text-ap-text",
    hover: "border-ap-sign bg-ap-raised text-ap-text",
    focus: `border-ap-control bg-ap-surface text-ap-text ${focusRing}`,
    pressed: "translate-y-px border-ap-sign bg-ap-raised text-ap-text",
    selected: "border-ap-sign bg-ap-sign text-white",
    disabled: "ap-hatch cursor-not-allowed border-ap-control/40 bg-ap-raised text-ap-muted",
  },
} as const;

export const inputBase =
  "h-12 w-full rounded-ap-sm border-2 bg-ap-surface px-3.5 font-ap text-base text-ap-text placeholder:text-ap-muted transition duration-100";

export const inputStyles = {
  live:
    "border-ap-control hover:border-ap-sign focus-visible:border-ap-sign focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ap-focus disabled:cursor-not-allowed disabled:border-ap-control/40 disabled:bg-ap-raised disabled:text-ap-muted aria-invalid:border-ap-error",
  forced: {
    rest: "border-ap-control",
    hover: "border-ap-sign",
    focus: `border-ap-sign ${focusRing}`,
    pressed: "",
    selected: "",
    disabled: "ap-hatch cursor-not-allowed border-ap-control/40 bg-ap-raised text-ap-muted",
  },
} as const;

export const labelText = "font-ap-cond text-[13px] font-semibold uppercase tracking-[0.08em] text-ap-muted";
