"use client";

import { useEffect, useState } from "react";

/**
 * True when we should skip heavy scroll-linked effects (parallax, scale scrubbing).
 * Speed of Lenis is unchanged — this only lightens paint/composite work.
 */
export function shouldUseLightMotion() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  // Touch / narrow viewports: parallax stacks feel laggy and add little
  if (window.matchMedia("(max-width: 1023px)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return true;
  if (
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g"
  ) {
    return true;
  }
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
    return true;
  }
  return false;
}

/** React hook — re-checks on breakpoint / motion preference changes. */
export function useLightMotion() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const update = () => setLight(shouldUseLightMotion());
    update();

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWidth = window.matchMedia("(max-width: 1023px)");
    const mqPointer = window.matchMedia("(pointer: coarse)");

    mqMotion.addEventListener("change", update);
    mqWidth.addEventListener("change", update);
    mqPointer.addEventListener("change", update);
    window.addEventListener("orientationchange", update);

    return () => {
      mqMotion.removeEventListener("change", update);
      mqWidth.removeEventListener("change", update);
      mqPointer.removeEventListener("change", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return light;
}
