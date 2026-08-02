"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  variant?: RevealVariant;
  duration?: number;
  amount?: number;
};

const easings = [0.22, 1, 0.36, 1] as const;

function initialFor(
  variant: RevealVariant,
  y: number,
  reduce: boolean | null,
) {
  if (reduce) {
    return { opacity: 0 };
  }

  // Prefer soft fades + small travel — avoid heavy blur/clip when possible
  switch (variant) {
    case "down":
      return { opacity: 0, y: -Math.min(y, 28) };
    case "left":
      return { opacity: 0, x: -20, y: 4 };
    case "right":
      return { opacity: 0, x: 20, y: 4 };
    case "scale":
      return { opacity: 0, scale: 0.98, y: Math.min(y, 24) * 0.4 };
    case "blur":
      return { opacity: 0, y: Math.min(y, 24) * 0.5 };
    case "clip":
      return { opacity: 0, y: Math.min(y, 28) * 0.65 };
    case "up":
    default:
      return { opacity: 0, y: Math.min(y, 32) };
  }
}

function animateFor(variant: RevealVariant, reduce: boolean | null) {
  if (reduce) {
    return { opacity: 1 };
  }

  switch (variant) {
    case "left":
    case "right":
      return { opacity: 1, x: 0, y: 0 };
    case "scale":
      return { opacity: 1, scale: 1, y: 0 };
    case "blur":
    case "clip":
    default:
      return { opacity: 1, y: 0 };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  variant = "up",
  duration = 0.8,
  amount = 0.18,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={initialFor(variant, y, reduceMotion)}
      whileInView={animateFor(variant, reduceMotion)}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: reduceMotion ? 0.25 : Math.min(duration, 0.95),
        delay: reduceMotion ? Math.min(delay, 0.06) : Math.min(delay, 0.35),
        ease: easings,
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.14, margin: "0px 0px -6% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0.02 : Math.min(stagger, 0.1),
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: Math.min(y, 28) },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0.25 : 0.7, ease: easings },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
