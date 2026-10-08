import type { ReactNode } from "react";

export type Artifact =
  | { kind: "image"; src: string; alt: string; caption: string; generated?: boolean }
  | { kind: "tile"; caption: string; content: ReactNode; generated?: boolean };

export type MoodBoardConfig = {
  tagline: string;
  description: string;
  // page colors for this board
  theme: { bg: string; surface: string; text: string; muted: string; border: string };
  // optional board typefaces: className loads them, display/body are CSS font-family values
  fonts?: { className: string; display: string; body: string };
  artifacts: Artifact[];
};
