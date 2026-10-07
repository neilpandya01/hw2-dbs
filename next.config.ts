import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to /out.
// No server, database, or API routes — Vercel serves it as a static site.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
