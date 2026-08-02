"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "border-b border-[color:var(--line)] bg-warm-white/96 shadow-[0_10px_40px_rgba(41,41,41,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <div className="container-lux flex h-[4.75rem] items-center justify-between md:h-[5.25rem]">
        <a
          href="#top"
          className={`font-serif text-[1.45rem] tracking-[0.02em] transition-colors duration-500 md:text-[1.7rem] ${
            solid ? "text-deep-charcoal" : "text-warm-white"
          }`}
          onClick={() => setOpen(false)}
        >
          {brand.name}
        </a>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.66rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 hover:text-earth-brown ${
                solid ? "text-deep-charcoal/80" : "text-warm-white/88"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className={`btn-primary !min-h-11 !px-5 !text-[0.64rem] ${
              solid ? "" : "!border-warm-white !bg-warm-white !text-deep-charcoal"
            }`}
          >
            Book
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-[0.9rem] xl:hidden ${
            solid ? "text-deep-charcoal" : "text-warm-white"
          }`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[color:var(--line)] bg-warm-white xl:hidden"
          >
            <nav
              className="container-lux flex max-h-[80svh] flex-col gap-1 overflow-y-auto py-10"
              aria-label="Mobile"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * index }}
                  className="rounded-2xl py-3.5 font-serif text-3xl text-deep-charcoal transition hover:bg-surface/70 hover:pl-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#booking"
                className="btn-primary mt-8 w-full"
                onClick={() => setOpen(false)}
              >
                Book Your Stay
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
