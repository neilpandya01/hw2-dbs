import { Barlow, Barlow_Condensed } from "next/font/google";

// Barlow comes from California highway signs: plain, sturdy, built to be read at speed.
export const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-barlow" });
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
});

// Put this on the root element of any page using the Process Through the Airport style.
export const ttaFonts = `${barlow.variable} ${barlowCondensed.variable}`;
