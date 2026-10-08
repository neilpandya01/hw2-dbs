import { DM_Mono, DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-sans" });
export const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

// Put this on the root element of any page using the Mid Flight system.
export const mfFonts = `${dmSans.variable} ${dmMono.variable}`;
