// Class strings for every control, live (real interactions) and forced
// (a static snapshot of one state, for the design-system specimens).
// Kept as literal strings so Tailwind can see them.

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const focusRing = "outline-2 outline-offset-2 outline-mf-focus";

export const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-mf text-sm font-medium whitespace-nowrap transition duration-150 select-none";

export const buttonStyles = {
  primary: {
    live:
      "bg-mf-accent text-mf-bg hover:bg-mf-accent-hover hover:shadow-mf-lamp focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-[.98] active:bg-mf-accent-pressed active:shadow-none disabled:cursor-not-allowed disabled:bg-mf-raised disabled:text-mf-muted/50 disabled:shadow-none aria-pressed:bg-mf-accent/15 aria-pressed:text-mf-accent aria-pressed:ring-1 aria-pressed:ring-mf-accent",
    forced: {
      rest: "bg-mf-accent text-mf-bg",
      hover: "bg-mf-accent-hover text-mf-bg shadow-mf-lamp",
      focus: `bg-mf-accent text-mf-bg ${focusRing}`,
      pressed: "scale-[.98] bg-mf-accent-pressed text-mf-bg",
      selected: "bg-mf-accent/15 text-mf-accent ring-1 ring-mf-accent",
      disabled: "cursor-not-allowed bg-mf-raised text-mf-muted/50",
    },
  },
  secondary: {
    live:
      "border border-mf-control bg-transparent text-mf-text hover:border-mf-led hover:bg-mf-raised hover:shadow-mf-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-[.98] active:bg-mf-surface active:shadow-none disabled:cursor-not-allowed disabled:border-mf-border disabled:text-mf-muted/50 disabled:shadow-none aria-pressed:border-mf-focus aria-pressed:bg-mf-focus/10 aria-pressed:text-mf-focus",
    forced: {
      rest: "border border-mf-control text-mf-text",
      hover: "border border-mf-led bg-mf-raised text-mf-text shadow-mf-glow",
      focus: `border border-mf-control text-mf-text ${focusRing}`,
      pressed: "scale-[.98] border border-mf-led bg-mf-surface text-mf-text",
      selected: "border border-mf-focus bg-mf-focus/10 text-mf-focus",
      disabled: "cursor-not-allowed border border-mf-border text-mf-muted/50",
    },
  },
} as const;

export const chipBase =
  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 font-mf-mono text-[11px] uppercase tracking-[0.15em] transition duration-150 select-none";

export const chipStyles = {
  live:
    "border-mf-border text-mf-muted hover:border-mf-control hover:text-mf-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-focus active:scale-95 aria-pressed:border-mf-focus aria-pressed:bg-mf-focus/10 aria-pressed:text-mf-focus aria-pressed:shadow-[0_0_14px_-4px_var(--color-mf-focus)] disabled:cursor-not-allowed disabled:opacity-40",
  forced: {
    rest: "border-mf-border text-mf-muted",
    hover: "border-mf-control text-mf-text",
    focus: `border-mf-border text-mf-muted ${focusRing}`,
    pressed: "scale-95 border-mf-control text-mf-text",
    selected: "border-mf-focus bg-mf-focus/10 text-mf-focus shadow-[0_0_14px_-4px_var(--color-mf-focus)]",
    disabled: "cursor-not-allowed border-mf-border text-mf-muted opacity-40",
  },
} as const;

export const inputBase =
  "h-11 w-full rounded-mf-sm border bg-mf-bg px-3.5 font-mf text-sm text-mf-text placeholder:text-mf-muted/70 transition duration-150 outline-none";

export const inputStyles = {
  live:
    "border-mf-control hover:border-mf-muted focus-visible:border-mf-focus focus-visible:ring-2 focus-visible:ring-mf-focus/30 disabled:cursor-not-allowed disabled:border-mf-border disabled:text-mf-muted/50 aria-invalid:border-mf-error aria-invalid:ring-2 aria-invalid:ring-mf-error/25",
  forced: {
    rest: "border-mf-control",
    hover: "border-mf-muted",
    focus: "border-mf-focus ring-2 ring-mf-focus/30",
    pressed: "",
    selected: "",
    disabled: "cursor-not-allowed border-mf-border text-mf-muted/50",
  },
} as const;

export const labelText = "font-mf-mono text-[11px] uppercase tracking-[0.2em] text-mf-muted";

// The four type roles (see the design system's Type roles section). Use these, not one-off sizes.
export const displayText = "font-mf text-5xl font-light tracking-tight sm:text-[56px] sm:leading-[60px]";
export const headingText = "font-mf text-2xl font-normal";
export const bodyText = "font-mf text-base leading-[26px] font-light";

export type Unit = "mi" | "km";
export const fmtDistance = (mi: number, unit: Unit = "mi") => `${Math.round(unit === "km" ? mi * 1.609344 : mi).toLocaleString("en-US")} ${unit}`;
