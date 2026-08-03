"use client";

import { useEffect } from "react";
import {
  about,
  accommodations,
  careSpaces,
  gallery,
  wellness,
} from "@/lib/content";

/** Critical images for the sections immediately after the hero. */
const WARM_URLS = [
  about.image,
  about.secondaryImage,
  about.tertiaryImage,
  ...accommodations.map((a) => a.image),
  careSpaces[0]?.image,
  careSpaces[1]?.image,
  wellness.image,
  gallery[0]?.src,
  gallery[1]?.src,
  gallery[2]?.src,
].filter(Boolean) as string[];

/**
 * After first paint / idle, warm the next-section assets so fast scroll
 * hits already-decoded sharp images instead of late lazy fetches.
 */
export function ImageWarmup() {
  useEffect(() => {
    const warm = () => {
      for (const href of WARM_URLS) {
        const existing = document.head.querySelector(
          `link[data-lux-warmup][href="${href}"]`,
        );
        if (existing) continue;
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        link.type = "image/avif";
        link.setAttribute("data-lux-warmup", "1");
        document.head.appendChild(link);
      }
    };

    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(warm, { timeout: 1200 });
      return () => window.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(warm, 280);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
