"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";
import {
  getActiveSectionId,
  getLenis,
  getScrollY,
  lockBodyScroll,
  unlockBodyScroll,
} from "@/lib/scroll";
import { ScrollTo } from "./ScrollTo";

const SECTION_IDS = [
  "about",
  "villas",
  "care",
  "life",
  "gallery",
  "location",
  "booking",
] as const;

/** Hysteresis avoids transparent↔solid flicker near the threshold. */
const SCROLL_SOLID_ON = 36;
const SCROLL_SOLID_OFF = 12;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);
  const scrolledRef = useRef(false);

  const setMenuOpen = (next: boolean) => {
    // Side effects outside the state updater — Strict Mode can double-invoke updaters
    if (next && !menuOpenRef.current) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      lockBodyScroll();
      menuOpenRef.current = true;
    } else if (!next && menuOpenRef.current) {
      unlockBodyScroll();
      menuOpenRef.current = false;
      previouslyFocused.current?.focus({ preventScroll: true });
      previouslyFocused.current = null;
    }
    setOpen(next);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    let activeId = "";

    const syncChrome = () => {
      const y = getScrollY();
      const nextSolid = scrolledRef.current
        ? y > SCROLL_SOLID_OFF
        : y > SCROLL_SOLID_ON;
      if (nextSolid !== scrolledRef.current) {
        scrolledRef.current = nextSolid;
        setScrolled(nextSolid);
      }
      const nextActive = getActiveSectionId(SECTION_IDS);
      if (nextActive !== activeId) {
        activeId = nextActive;
        setActive(nextActive);
      }
    };

    // Coalesce Lenis + native scroll into one layout read per frame
    const scheduleSync = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        syncChrome();
      });
    };

    syncChrome();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });

    let removeLenis: (() => void) | null = null;
    let pollId = 0;

    const attachLenis = () => {
      const lenis = getLenis();
      if (!lenis) return false;
      removeLenis?.();
      // Prefer Lenis as the scroll source once ready — still keep native as fallback
      removeLenis = lenis.on("scroll", scheduleSync);
      return true;
    };

    if (!attachLenis()) {
      // Lenis mounts in a sibling effect — retry briefly
      pollId = window.setInterval(() => {
        if (attachLenis()) window.clearInterval(pollId);
      }, 50);
      window.setTimeout(() => window.clearInterval(pollId), 2000);
    }

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.clearInterval(pollId);
      if (raf) window.cancelAnimationFrame(raf);
      removeLenis?.();
    };
  }, []);

  // Close mobile menu when crossing to desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches && menuOpenRef.current) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus({ preventScroll: true });
    }, 80);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const root = document.getElementById(menuId) ?? headerRef.current;
      if (!root) return;

      const focusable = [
        ...root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ];
      // Keep the hamburger (in header) in the tab cycle when menu is portaled
      const toggle = headerRef.current?.querySelector<HTMLElement>(
        '[aria-controls="' + menuId + '"]',
      );
      if (toggle && !focusable.includes(toggle)) {
        focusable.unshift(toggle);
      }
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, menuId]);

  useEffect(() => {
    return () => {
      if (menuOpenRef.current) {
        unlockBodyScroll();
        menuOpenRef.current = false;
      }
    };
  }, []);

  const solid = scrolled || open;
  const bookingActive = active === "booking";

  const linkClass = (id: string) => {
    const isActive = active === id;
    return [
      "nav-link",
      solid ? "nav-link--solid" : "nav-link--ghost",
      isActive ? "nav-link--active" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const closeMenu = () => setMenuOpen(false);

  const mobileMenu = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              id={menuId}
              key="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[80] flex flex-col bg-warm-white lg:hidden"
            >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 12% 0%, rgba(220,203,184,0.42), transparent 48%), radial-gradient(ellipse at 90% 100%, rgba(232,224,212,0.7), transparent 45%)",
                  }}
                />

                <nav
                  className="relative flex h-full flex-col px-[max(1.25rem,calc((100%-1180px)/2))] pb-10 pt-[5.75rem]"
                  aria-label="Mobile"
                >
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    {navLinks.map((link, index) => {
                      const isActive = active === link.id;
                      return (
                        <motion.div
                          key={link.id}
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 28, x: -12 }
                          }
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.08 + index * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ScrollTo
                            ref={index === 0 ? firstMobileLinkRef : undefined}
                            to={link.id}
                            onNavigate={closeMenu}
                            className={`group flex w-full items-baseline justify-between border-b border-[color:var(--line)] py-4 text-left transition-colors ${
                              isActive ? "border-earth-brown/35" : ""
                            }`}
                          >
                            <span
                              className={`font-serif text-[clamp(2.4rem,9vw,3.4rem)] leading-none tracking-[-0.02em] transition-colors duration-300 group-hover:text-earth-brown ${
                                isActive
                                  ? "text-earth-brown"
                                  : "text-deep-charcoal"
                              }`}
                            >
                              {link.label}
                            </span>
                            <span
                              className={`text-[0.62rem] uppercase tracking-[0.28em] transition-opacity duration-300 ${
                                isActive
                                  ? "text-earth-brown opacity-100"
                                  : "text-soft-grey opacity-40 group-hover:opacity-80"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </ScrollTo>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + navLinks.length * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-8 space-y-4"
                  >
                    <ScrollTo
                      to="booking"
                      className="btn-primary w-full !min-h-[3.25rem] !rounded-[1.05rem]"
                      onNavigate={closeMenu}
                    >
                      Enquire Today
                    </ScrollTo>
                    <p className="text-center text-[0.72rem] font-light tracking-[0.04em] text-soft-grey">
                      Luxury retirement living · Dambulla
                    </p>
                  </motion.div>
                </nav>
              </motion.div>
            ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "z-[90]" : "z-[60]"
      } ${
        solid
          ? "border-b border-[color:var(--line)] bg-warm-white shadow-[0_8px_28px_rgba(41,41,41,0.04)]"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <div className="container-lux relative z-[70] flex h-[4.5rem] items-center justify-between md:h-[5rem]">
        <ScrollTo
          to="top"
          className={`font-serif text-[1.35rem] tracking-[0.01em] transition-colors duration-[400ms] md:text-[1.55rem] ${
            solid
              ? "text-deep-charcoal"
              : "text-warm-white [text-shadow:0_1px_18px_rgba(41,41,41,0.35)]"
          }`}
          onNavigate={closeMenu}
        >
          {brand.name}
        </ScrollTo>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <ScrollTo
              key={link.id}
              to={link.id}
              className={linkClass(link.id)}
            >
              {link.label}
            </ScrollTo>
          ))}
          <ScrollTo
            to="booking"
            className={`nav-book ${solid ? "nav-book--solid" : "nav-book--ghost"}${
              bookingActive ? " nav-book--active" : ""
            }`}
          >
            Enquire
          </ScrollTo>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          className={`relative z-[90] flex h-11 w-11 items-center justify-center rounded-[0.85rem] transition-colors duration-300 lg:hidden ${
            open || solid
              ? "text-deep-charcoal hover:bg-surface/80"
              : "text-warm-white hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-[1.35rem] flex-col items-center gap-[6px]">
            <span
              className={`h-px w-full origin-center bg-current transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full origin-center bg-current transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileMenu}
    </header>
  );
}
