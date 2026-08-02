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

  switch (variant) {
    case "down":
      return { opacity: 0, y: -y };
    case "left":
      return { opacity: 0, x: -36, y: 8 };
    case "right":
      return { opacity: 0, x: 36, y: 8 };
    case "scale":
      return { opacity: 0, scale: 0.94, y: y * 0.45 };
    case "blur":
      return { opacity: 0, y: y * 0.6, filter: "blur(10px)" };
    case "clip":
      return { opacity: 0, y: y * 0.8, clipPath: "inset(12% 0 12% 0)" };
    case "up":
    default:
      return { opacity: 0, y };
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
      return { opacity: 1, y: 0, filter: "blur(0px)" };
    case "clip":
      return { opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" };
    default:
      return { opacity: 1, y: 0 };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
  variant = "up",
  duration = 1.05,
  amount = 0.16,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={initialFor(variant, y, reduceMotion)}
      whileInView={animateFor(variant, reduceMotion)}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0.35 : duration,
        delay: reduceMotion ? Math.min(delay, 0.08) : delay,
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
  stagger = 0.08,
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
            staggerChildren: reduceMotion ? 0.03 : stagger,
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
  y = 28,
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
          : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduceMotion ? 0.3 : 0.9, ease: easings },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
