import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Match LuxImage default (70) plus a couple of section overrides
    qualities: [50, 65, 70, 75],
    // Prefer sizes that match our layouts (full-bleed, 50/58vw, gallery cols)
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [96, 128, 256, 384, 640, 750, 828],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Faster first response for already-optimized local AVIFs
    contentDispositionType: "inline",
  },
};

export default nextConfig;
