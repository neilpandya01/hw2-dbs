// Pill-shaped link buttons for the hub.
const base =
  "inline-block rounded-full px-4 py-2 text-sm font-medium transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hub-text active:scale-95";

export const outlineLink =
  `${base} border border-hub-border bg-hub-surface text-hub-text hover:border-hub-muted hover:bg-hub-raised`;

export const primaryLink = `${base} bg-hub-text text-hub-surface hover:bg-hub-muted`;
