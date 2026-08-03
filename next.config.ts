import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 65, 75],
    // Prefer sizes that match our layouts (full-bleed, 50/58vw, gallery cols)
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920],
    imageSizes: [96, 128, 256, 384, 640, 750, 828, 1080],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
