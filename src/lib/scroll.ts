import type Lenis from "lenis";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Programmatic nav scroll duration (seconds) — silky, a touch quicker. */
const SCROLL_TO_DURATION = 1.4;

/** Session flag: reload (or bfcache) must land at home top until cleared. */
const FORCE_HOME_KEY = "mbs-force-home-top";

/** How long after reload we keep re-pinning to top (Lenis + ScrollTrigger settle). */
const FORCE_HOME_WINDOW_MS = 2000;

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";
let previousHtmlOverflow = "";
let lenisInstance: Lenis | null = null;
/** Set when load bootstrap wants top before Lenis is registered. */
let pendingScrollToTop = false;
/** True while a reload/bfcache home-top reset window is active. */
let forceHomeActive = false;

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

function markForceHomeTop() {
  forceHomeActive = true;
  pendingScrollToTop = true;
  try {
    sessionStorage.setItem(FORCE_HOME_KEY, "1");
  } catch {
    // private mode / blocked storage
  }
}

function clearForceHomeTop() {
  forceHomeActive = false;
  pendingScrollToTop = false;
  try {
    sessionStorage.removeItem(FORCE_HOME_KEY);
  } catch {
    // private mode / blocked storage
  }
}

export function isForceHomeTopPending() {
  if (forceHomeActive) return true;
  try {
    return sessionStorage.getItem(FORCE_HOME_KEY) === "1";
  } catch {
    return false;
  }
}

/** Full document reload (F5 / toolbar refresh), not soft client navigations. */
export function isReloadNavigation() {
  if (typeof performance === "undefined") return false;
  try {
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") return true;
  } catch {
    // ignore
  }
  // Legacy fallback
  const legacy = (
    performance as Performance & {
      navigation?: { type?: number };
    }
  ).navigation;
  return legacy?.type === 1;
}

/** Instant jump to document top (native + Lenis when available). */
export function scrollToTopImmediate() {
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (lenisInstance) {
    try {
      lenisInstance.stop();
      lenisInstance.scrollTo(0, { immediate: true, force: true });
      // Only restart if nothing else holds the lock (intro / menu / lightbox)
      if (lockCount === 0) {
        lenisInstance.start();
      }
    } catch {
      // Lenis mid-destroy
    }
    if (!isForceHomeTopPending()) {
      pendingScrollToTop = false;
    }
  } else {
    pendingScrollToTop = true;
  }
}

/**
 * Call when Lenis mounts or IntroLoader unlocks — finish a pending reload home reset.
 */
export function applyForceHomeTopIfNeeded() {
  if (!isForceHomeTopPending()) return;
  scrollToTopImmediate();
}

/** Register / clear the active Lenis instance (from SmoothScroll). */
export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
  // Keep stopped if intro / menu / lightbox already locked the body
  if (instance && lockCount > 0) {
    instance.stop();
  }
  // Finish home-top bootstrap once Lenis mounts after refresh
  if (instance && (pendingScrollToTop || isForceHomeTopPending())) {
    try {
      instance.scrollTo(0, { immediate: true, force: true });
    } catch {
      // ignore
    }
    if (!isForceHomeTopPending()) {
      pendingScrollToTop = false;
    }
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
    // Re-pin to top before Lenis restarts so unlock doesn't reveal mid-page
    if (isForceHomeTopPending()) {
      scrollToTopImmediate();
    }
    lenisInstance?.start();
    if (isForceHomeTopPending()) {
      scrollToTopImmediate();
    }
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

  // Soft in-page nav after load — cancel any leftover reload home window
  clearForceHomeTop();

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

function runHomeTopBurst() {
  markForceHomeTop();

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // Hash / non-root → nuclear clean home URL (flag survives the replace navigation)
  if (window.location.hash || window.location.pathname !== "/") {
    try {
      window.location.replace(
        `${window.location.origin}/`,
      );
      return () => {};
    } catch {
      window.history.replaceState(null, "", "/");
    }
  } else {
    stripHash();
  }

  scrollToTopImmediate();

  const delays = [0, 16, 50, 100, 200, 320, 500, 800, 1200, 1600, FORCE_HOME_WINDOW_MS];
  const timers = delays.map((ms) =>
    window.setTimeout(() => {
      if (!isForceHomeTopPending()) return;
      scrollToTopImmediate();
    }, ms),
  );

  const clearId = window.setTimeout(() => {
    clearForceHomeTop();
  }, FORCE_HOME_WINDOW_MS + 100);

  return () => {
    timers.forEach((id) => window.clearTimeout(id));
    window.clearTimeout(clearId);
  };
}

/**
 * On full page refresh / bfcache restore: land on home top (`/`).
 * Soft in-page ScrollTo is unaffected after the short force window (and is
 * cancelled immediately if the user clicks a nav ScrollTo).
 */
export function keepCleanUrl() {
  if (typeof window === "undefined") return () => {};

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  let burstCleanup: (() => void) | undefined;

  const startBurstIfNeeded = (fromBfcache = false) => {
    const should =
      fromBfcache ||
      isReloadNavigation() ||
      isForceHomeTopPending();
    if (!should) return;
    burstCleanup?.();
    burstCleanup = runHomeTopBurst();
  };

  startBurstIfNeeded(false);

  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      startBurstIfNeeded(true);
    }
  };

  // Late browser scroll restoration (some engines ignore scrollRestoration)
  const onLoad = () => {
    if (isReloadNavigation() || isForceHomeTopPending()) {
      scrollToTopImmediate();
    }
  };

  window.addEventListener("pageshow", onPageShow);
  window.addEventListener("load", onLoad);

  // Keep URL hash-free if anything writes a fragment later; do not force scroll
  // outside an active reload window.
  const onHashChange = () => {
    if (isForceHomeTopPending()) {
      stripHash();
      scrollToTopImmediate();
      return;
    }
    stripHash();
  };
  window.addEventListener("hashchange", onHashChange);

  return () => {
    burstCleanup?.();
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("load", onLoad);
    window.removeEventListener("hashchange", onHashChange);
  };
}

export { EASE, SCROLL_TO_DURATION };
