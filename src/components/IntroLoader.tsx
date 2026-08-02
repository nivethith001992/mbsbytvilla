"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/content";

const INTRO_KEY = "mbs-intro-seen";
const INTRO_MS = 1600;

type IntroLoaderProps = {
  onComplete?: () => void;
};

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const hide = () => {
      if (cancelled) return;
      sessionStorage.setItem(INTRO_KEY, "1");
      setVisible(false);
      onComplete?.();
      document.body.style.overflow = "";
    };

    const seen = sessionStorage.getItem(INTRO_KEY) === "1";
    if (reduceMotion || seen) {
      const skip = window.setTimeout(hide, 0);
      return () => {
        cancelled = true;
        window.clearTimeout(skip);
      };
    }

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(hide, INTRO_MS);
    const failsafe = window.setTimeout(hide, INTRO_MS + 2000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="grain grain-light" />
          <div className="relative px-8 text-center">
            <motion.p
              className="text-[0.65rem] uppercase tracking-[0.42em] text-sand-beige/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              Private Retreat · Dambulla
            </motion.p>
            <motion.p
              className="mt-6 font-serif text-[clamp(2.4rem,7vw,4.5rem)] leading-none tracking-[-0.02em] text-warm-white"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {brand.name}
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-16 origin-center bg-sand-beige/60"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            />
            <motion.p
              className="mt-6 font-serif text-lg italic text-warm-white/55 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {brand.mission}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
