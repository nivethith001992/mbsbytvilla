"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll";
import { ScrollTo } from "./ScrollTo";

const SECTION_IDS = [
  "story",
  "retreat",
  "villas",
  "gallery",
  "location",
  "booking",
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

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
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Near the very top, clear active so hero doesn't keep a stale underline
        if (window.scrollY < 80) {
          setActive("");
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

      if (event.key !== "Tab" || !headerRef.current) return;

      const focusable = headerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
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
  }, [open]);

  useEffect(() => {
    return () => {
      if (menuOpenRef.current) {
        unlockBodyScroll();
        menuOpenRef.current = false;
      }
    };
  }, []);

  const solid = scrolled || open;

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

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "border-b border-[color:var(--line)] bg-warm-white/97 shadow-[0_12px_40px_rgba(41,41,41,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <div className="container-lux relative z-[70] flex h-[4.5rem] items-center justify-between md:h-[5rem]">
        <ScrollTo
          to="top"
          className={`font-serif text-[1.35rem] tracking-[0.01em] transition-colors duration-500 md:text-[1.55rem] ${
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
            className={`nav-book ${solid ? "nav-book--solid" : "nav-book--ghost"}`}
          >
            Enquire
          </ScrollTo>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          className={`flex h-11 w-11 items-center justify-center rounded-[0.85rem] transition-colors duration-300 lg:hidden ${
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

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            initial={
              reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-warm-white lg:hidden"
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
                            isActive ? "text-earth-brown" : "text-deep-charcoal"
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
                  Enquire About Care
                </ScrollTo>
                <p className="text-center text-[0.72rem] font-light tracking-[0.04em] text-soft-grey">
                  Independence with care · Dambulla
                </p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
