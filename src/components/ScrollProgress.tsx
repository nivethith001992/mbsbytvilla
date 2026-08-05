"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  // Direct scaleX — springs on every scroll frame add lag behind Lenis
  return (
    <motion.div
      data-scroll-progress
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
