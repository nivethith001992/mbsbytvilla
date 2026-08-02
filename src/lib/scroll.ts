import type Lenis from "lenis";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Slow, luxurious programmatic scroll (seconds). */
const SCROLL_TO_DURATION = 2.15;

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";
let lenisInstance: Lenis | null = null;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function navScrollOffset() {
  if (typeof window === "undefined") return 88;
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 88;
}

/** Register / clear the active Lenis instance (from SmoothScroll). */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
  // Keep stopped if intro / menu / lightbox already locked the body
  if (instance && lockCount > 0) {
    instance.stop();
  }
}

export function getLenis() {
  return lenisInstance;
}

/** Ref-counted body scroll lock so intro / menu / lightbox don't fight. */
export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }
    lenisInstance?.stop();
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
    lenisInstance?.start();
  }
}

/** Smooth-scroll to a section without writing location.hash. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = prefersReducedMotion();
  const offset = id === "top" ? 0 : navScrollOffset();

  if (lenisInstance && !reduce) {
    lenisInstance.scrollTo(el, {
      offset: -offset,
      duration: SCROLL_TO_DURATION,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Allow scroll while briefly stopped (e.g. menu closing unlock race)
      force: true,
    });
  } else {
    const top = Math.max(
      0,
      window.scrollY + el.getBoundingClientRect().top - offset,
    );
    window.scrollTo({
      top,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  // Ensure URL stays clean if something else set a hash
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
}

/** Strip any #fragment from the URL on load / hashchange. */
export function keepCleanUrl() {
  if (typeof window === "undefined") return () => {};

  const strip = () => {
    if (!window.location.hash) return;
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  strip();
  window.addEventListener("hashchange", strip);
  return () => window.removeEventListener("hashchange", strip);
}

export { EASE };
