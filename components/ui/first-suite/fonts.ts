import { Cormorant_Garamond, Jost } from "next/font/google";

export const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

// Put this on the root element of any page using the First Suite style.
export const fsFonts = `${jost.variable} ${cormorant.variable}`;
