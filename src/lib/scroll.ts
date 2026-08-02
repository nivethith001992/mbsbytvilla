const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

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
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
}

/** Smooth-scroll to a section without writing location.hash. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = prefersReducedMotion();
  const offset = id === "top" ? 0 : navScrollOffset();
  const top = Math.max(
    0,
    window.scrollY + el.getBoundingClientRect().top - offset,
  );

  window.scrollTo({
    top,
    behavior: reduce ? "auto" : "smooth",
  });

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
