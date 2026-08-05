"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  applyForceHomeTopIfNeeded,
  isForceHomeTopPending,
  registerLenis,
} from "@/lib/scroll";

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
        // Keep speed unchanged — smoothness comes from lighter page work
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        // Native touch on phones — avoid laggy syncTouch on iOS
        syncTouch: false,
        touchMultiplier: 1,
        autoRaf: false,
        anchors: false,
      });

      registerLenis(lenis);
      // Reload: Lenis must start at 0 — browser restore / ST refresh can re-scroll later
      if (isForceHomeTopPending()) {
        lenis.scrollTo(0, { immediate: true, force: true });
        applyForceHomeTopIfNeeded();
      }
      removeScrollListener = lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP ticker so ScrollTrigger scrub stays in lockstep
      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      // lagSmoothing(0) prevents GSAP from “catching up” after tab stalls (feels like hitch)
      gsap.ticker.lagSmoothing(0);

      // Recalculate pins after Lenis mounts; re-pin home top after ST can jump scroll
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        applyForceHomeTopIfNeeded();
        requestAnimationFrame(applyForceHomeTopIfNeeded);
      });
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
