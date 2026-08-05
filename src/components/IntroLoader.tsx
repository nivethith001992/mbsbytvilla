"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/content";
import {
  lockBodyScroll,
  scrollToTopImmediate,
  unlockBodyScroll,
} from "@/lib/scroll";

const INTRO_KEY = "mbs-intro-seen";
const INTRO_MS = 1600;

type IntroLoaderProps = {
  onComplete?: () => void;
};

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // private mode / blocked storage
  }
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [finished, setFinished] = useState(false);
  const decided = reduceMotion !== null;
  // Every full load — including a browser refresh — opens like a first visit
  const skip = decided && Boolean(reduceMotion);

  useEffect(() => {
    if (!decided) return;

    if (skip) {
      markIntroSeen();
      scrollToTopImmediate();
      onComplete?.();
      return;
    }

    let cancelled = false;
    let locked = false;
    lockBodyScroll();
    locked = true;
    // While locked, kill any restored mid-page position under the veil
    scrollToTopImmediate();

    const hide = () => {
      if (cancelled) return;
      cancelled = true;
      markIntroSeen();
      scrollToTopImmediate();
      if (locked) {
        unlockBodyScroll();
        locked = false;
      }
      scrollToTopImmediate();
      setFinished(true);
      onComplete?.();
    };

    const timer = window.setTimeout(hide, INTRO_MS);
    const failsafe = window.setTimeout(hide, INTRO_MS + 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      if (locked) {
        unlockBodyScroll();
        locked = false;
      }
    };
  }, [decided, skip, onComplete]);

  const showIntro = decided && !skip && !finished;
  const showVeil = !decided;

  if (showVeil) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-deep-charcoal"
        aria-hidden
        suppressHydrationWarning
      />
    );
  }

  return (
    <AnimatePresence>
      {showIntro ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-charcoal"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="grain grain-light" />
          {!reduceMotion ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full bg-sand-beige/12 blur-3xl"
              animate={{ scale: [0.9, 1.15, 1], opacity: [0.2, 0.45, 0.25] }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          ) : null}
          <div className="relative px-8 text-center">
            <motion.p
              className="text-[0.65rem] uppercase tracking-[0.42em] text-sand-beige/80"
              initial={{ opacity: 0, y: 14, letterSpacing: "0.55em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
              transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              Caring Retirement Living · Dambulla
            </motion.p>
            <motion.p
              className="mt-6 font-serif text-[clamp(2.4rem,7vw,4.5rem)] leading-none tracking-[-0.02em] text-warm-white"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              {brand.name}
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-16 origin-center bg-sand-beige/60"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.42 }}
            />
            <motion.p
              className="mt-6 font-serif text-lg italic text-warm-white/55 md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              {brand.mission}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
