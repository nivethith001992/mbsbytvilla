"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { brand, heroHeadline, heroImage, heroSupport } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "10%"]);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("mbs-intro-seen") === "1";
    const delay = reduceMotion ? 0 : seen ? 120 : 1700;
    const timer = window.setTimeout(() => setEntered(true), delay);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label="Hero"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className={`absolute inset-0 ${reduceMotion ? "" : "ken-burns"}`}>
          <Image
            src={heroImage}
            alt="Cinematic view of a private luxury villa garden retreat in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/35 to-deep-charcoal/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_8%,rgba(41,41,41,0.4)_100%)]" />
        <div className="grain" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 container-lux w-full pb-28 pt-36 md:pb-40 md:pt-48"
      >
        <motion.div
          initial={false}
          animate={
            entered || reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 28 }
          }
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="display-hero text-warm-white">{brand.name}</p>
          <h1 className="mt-9 max-w-xl font-serif text-[1.7rem] font-light leading-[1.28] tracking-wide text-warm-white/95 md:mt-11 md:text-[2.15rem] lg:text-[2.4rem]">
            {heroHeadline}
          </h1>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-warm-white/70 md:mt-6 md:text-base">
            {heroSupport}
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
            <a
              href="#booking"
              className="btn-primary !border-warm-white !bg-warm-white !text-deep-charcoal"
            >
              Begin Your Escape
            </a>
            <a href="#villas" className="btn-secondary">
              Explore Stay
            </a>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#story"
        className="scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-warm-white/60 transition hover:text-warm-white"
        aria-label="Scroll to story"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.32em]">Enter</span>
        <motion.span
          aria-hidden
          className="scroll-cue-line"
          animate={reduceMotion ? undefined : { scaleY: [0.35, 1, 0.35], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </a>
    </section>
  );
}
