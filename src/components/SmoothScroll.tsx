"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll";

/**
 * Silky smooth scroll via Lenis, synced to GSAP ScrollTrigger.
 * Disabled when prefers-reduced-motion is set.
 */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let removeScrollListener: (() => void) | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    const destroy = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      removeScrollListener?.();
      removeScrollListener = null;
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      registerLenis(null);
      gsap.ticker.lagSmoothing(500, 33);
    };

    const create = () => {
      destroy();
      if (media.matches) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        // Slightly snappier than ultra-slow luxury, still silky
        lerp: 0.062,
        smoothWheel: true,
        wheelMultiplier: 0.7,
        // Native touch on phones — avoid laggy syncTouch on iOS
        syncTouch: false,
        touchMultiplier: 1,
        autoRaf: false,
        anchors: false,
      });

      registerLenis(lenis);
      removeScrollListener = lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Recalculate pins after Lenis mounts
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    create();

    const onMotionPreference = () => create();
    media.addEventListener("change", onMotionPreference);

    return () => {
      media.removeEventListener("change", onMotionPreference);
      destroy();
    };
  }, []);

  return null;
}
