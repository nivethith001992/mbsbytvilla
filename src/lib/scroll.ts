import type Lenis from "lenis";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Programmatic nav scroll duration (seconds) — silky, a touch quicker. */
const SCROLL_TO_DURATION = 1.4;

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";
let previousHtmlOverflow = "";
let lenisInstance: Lenis | null = null;
/** Set when load bootstrap wants top before Lenis is registered. */
let pendingScrollToTop = false;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function navScrollOffset() {
  if (typeof window === "undefined") return 88;
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 88;
}

/** Instant jump to document top (native + Lenis when available). */
export function scrollToTopImmediate() {
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true });
    pendingScrollToTop = false;
  } else {
    pendingScrollToTop = true;
  }
}

/** Register / clear the active Lenis instance (from SmoothScroll). */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
  // Keep stopped if intro / menu / lightbox already locked the body
  if (instance && lockCount > 0) {
    instance.stop();
  }
  // Finish home-top bootstrap once Lenis mounts after refresh
  if (instance && pendingScrollToTop) {
    instance.scrollTo(0, { immediate: true, force: true });
    pendingScrollToTop = false;
  }
}

export function getLenis() {
  return lenisInstance;
}

export function isBodyScrollLocked() {
  return lockCount > 0;
}

/** Current document scroll Y — prefers Lenis animated value when available. */
export function getScrollY() {
  if (typeof window === "undefined") return 0;
  return lenisInstance?.scroll ?? window.scrollY ?? window.pageYOffset ?? 0;
}

/** Ref-counted body scroll lock so intro / menu / lightbox don't fight. */
export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    previousHtmlOverflow = document.documentElement.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }
    document.documentElement.classList.add("scroll-locked");
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
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.documentElement.classList.remove("scroll-locked");
    lenisInstance?.start();
  }
}

function stripHash() {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
}

function runScrollToId(id: string) {
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
      getScrollY() + el.getBoundingClientRect().top - offset,
    );
    window.scrollTo({
      top,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  stripHash();
}

/** Smooth-scroll to a section without writing location.hash. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;

  // After unlockBodyScroll, Lenis.start needs a frame before scrollTo is reliable
  if (lockCount > 0 || document.documentElement.classList.contains("scroll-locked")) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => runScrollToId(id));
    });
    return;
  }

  runScrollToId(id);
}

/**
 * Resolve which section should be active in the nav from scroll position.
 * More reliable than IntersectionObserver with Lenis + ScrollTrigger pins.
 */
export function getActiveSectionId(
  sectionIds: readonly string[],
  options?: { topClearance?: number },
) {
  if (typeof document === "undefined") return "";
  const y = getScrollY();
  const topClearance = options?.topClearance ?? 80;
  if (y < topClearance) return "";

  const marker = navScrollOffset() + 12;
  let current = "";

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= marker) {
      current = id;
    }
  }

  return current;
}

/**
 * On full page load / refresh: land on home top (`/`), never mid-page or #section.
 * Does not interfere with later in-page ScrollTo navigation.
 */
export function keepCleanUrl() {
  if (typeof window === "undefined") return () => {};

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // Hash deep-links / leftover fragments → clean home URL
  if (window.location.hash) {
    window.history.replaceState(null, "", "/");
  } else {
    stripHash();
  }

  scrollToTopImmediate();
  const raf1 = requestAnimationFrame(() => {
    scrollToTopImmediate();
    requestAnimationFrame(scrollToTopImmediate);
  });
  // Lenis / layout may settle a beat after first paint
  const timeoutId = window.setTimeout(scrollToTopImmediate, 50);
  // Drop pending flag so a later Lenis remount won't jump home mid-session
  const clearPendingId = window.setTimeout(() => {
    pendingScrollToTop = false;
  }, 300);

  // Keep URL hash-free if anything writes a fragment later; do not force scroll
  window.addEventListener("hashchange", stripHash);
  return () => {
    cancelAnimationFrame(raf1);
    window.clearTimeout(timeoutId);
    window.clearTimeout(clearPendingId);
    window.removeEventListener("hashchange", stripHash);
  };
}

export { EASE, SCROLL_TO_DURATION };
