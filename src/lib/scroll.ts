import type Lenis from "lenis";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Programmatic nav scroll duration (seconds) — silky, a touch quicker. */
const SCROLL_TO_DURATION = 1.4;

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";
let previousHtmlOverflow = "";
let previousBodyPosition = "";
let previousBodyTop = "";
let previousBodyWidth = "";
let lockedScrollY = 0;
let lenisInstance: Lenis | null = null;
/** Set when load wants top before Lenis is registered. */
let pendingScrollToTop = false;
/** Queued section id to scroll after body unlock (menu / lightbox). */
let pendingScrollId: string | null = null;

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

/**
 * Keep manual restoration only — never scroll the live page here.
 * Scrolling to top on beforeunload flashes the hero before the reload.
 * The next load lands at top via the early head script + scrollToTopImmediate.
 */
function resetScrollBeforeUnload() {
  if (typeof window === "undefined") return;
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
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
  // Finish a pending top pin once Lenis mounts after refresh
  if (instance && pendingScrollToTop) {
    try {
      instance.scrollTo(0, { immediate: true, force: true });
    } catch {
      // ignore
    }
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
    lockedScrollY = getScrollY();
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyPosition = document.body.style.position;
    previousBodyTop = document.body.style.top;
    previousBodyWidth = document.body.style.width;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    // iOS-safe: pin body so background can't scroll under overlays
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
      document.documentElement.style.setProperty(
        "--scrollbar-compensation",
        `${scrollbar}px`,
      );
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
    document.body.style.position = previousBodyPosition;
    document.body.style.top = previousBodyTop;
    document.body.style.width = previousBodyWidth;
    document.documentElement.style.removeProperty("--scrollbar-compensation");
    document.documentElement.classList.remove("scroll-locked");
    window.scrollTo(0, lockedScrollY);
    if (lenisInstance) {
      try {
        lenisInstance.scrollTo(lockedScrollY, { immediate: true, force: true });
        lenisInstance.start();
      } catch {
        lenisInstance.start();
      }
    }
    const queued = pendingScrollId;
    pendingScrollId = null;
    if (queued) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => runScrollToId(queued));
      });
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

  // Queue until unlock — never force-scroll under an open menu / lightbox
  if (lockCount > 0 || document.documentElement.classList.contains("scroll-locked")) {
    pendingScrollId = id;
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
 * Normal website refresh: land at hero top after reload, no URL hacks.
 * Manual scroll restoration + load/pageshow scrollTo(0).
 * Do not scroll on beforeunload — that flashes the hero before the page dies.
 */
export function keepCleanUrl() {
  if (typeof window === "undefined") return () => {};

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  stripHash();
  scrollToTopImmediate();

  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      // bfcache restore — same as a fresh load: hero at top
      scrollToTopImmediate();
    }
  };

  const onLoad = () => {
    scrollToTopImmediate();
  };

  // Critical: keep restoration manual so the next load can land at top
  window.addEventListener("beforeunload", resetScrollBeforeUnload);
  window.addEventListener("pagehide", resetScrollBeforeUnload);
  window.addEventListener("pageshow", onPageShow);
  window.addEventListener("load", onLoad);

  const onHashChange = () => {
    stripHash();
  };
  window.addEventListener("hashchange", onHashChange);

  return () => {
    window.removeEventListener("beforeunload", resetScrollBeforeUnload);
    window.removeEventListener("pagehide", resetScrollBeforeUnload);
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("load", onLoad);
    window.removeEventListener("hashchange", onHashChange);
  };
}

export { EASE, SCROLL_TO_DURATION };
