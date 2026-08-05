"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  brand,
  heroCtas,
  heroEyebrow,
  heroHeadline,
  heroImage,
  heroImageAlt,
  heroSupport,
} from "@/lib/content";
import { useLightMotion } from "@/lib/motion";
import { LuxImage } from "./LuxImage";
import { ScrollTo } from "./ScrollTo";

const ease = [0.22, 1, 0.36, 1] as const;

function splitWords(text: string) {
  return text.split(" ");
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const lightMotion = useLightMotion();
  const skipParallax = Boolean(reduceMotion || lightMotion);
  const [entered, setEntered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Direct transforms (no useSpring) — springs lag behind Lenis and feel janky
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", skipParallax ? "0%" : "12%"],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, skipParallax ? 1 : 1.05],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", skipParallax ? "0%" : "8%"],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, skipParallax ? 1 : 0.2],
  );

  useEffect(() => {
    // Keep the hero image visible under the intro; only gate text entrance.
    const delay = reduceMotion ? 0 : 420;
    const timer = window.setTimeout(() => setEntered(true), delay);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const brandWords = splitWords(brand.name);
  const headlineWords = splitWords(heroHeadline);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Transform-only parallax — never fade the full-bleed image (opacity paint is costly) */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-[-3%]">
          <div
            className={`absolute inset-0 ${
              reduceMotion || lightMotion ? "" : "ken-burns"
            }`}
          >
            <LuxImage
              src={heroImage}
              alt={heroImageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              quality={70}
              decoding="sync"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-deep-charcoal/38 to-deep-charcoal/28" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 8%, rgba(41,41,41,0.48) 100%)",
          }}
        />
        <div className="grain" />
      </motion.div>

      {/* Brief veil — never holds the hero image off-screen */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-deep-charcoal"
        initial={{ opacity: 0.18 }}
        animate={entered || reduceMotion ? { opacity: 0 } : { opacity: 0.18 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.28, ease }}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 container-lux w-full pb-28 pt-36 md:pb-40 md:pt-48"
      >
        <div className="max-w-5xl">
          <motion.p
            className="overflow-hidden text-[0.68rem] uppercase tracking-[0.42em] text-sand-beige/85"
            initial={false}
            animate={
              entered || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.9, delay: 0.05, ease }}
          >
            {heroEyebrow}
          </motion.p>

          <h1 className="display-hero mt-6 text-warm-white">
            {brandWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="mr-[0.22em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={false}
                  animate={
                    entered || reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: "0.55em" }
                  }
                  transition={{
                    duration: reduceMotion ? 0.25 : 1.15,
                    delay: reduceMotion ? 0 : 0.12 + index * 0.11,
                    ease,
                  }}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="mt-9 max-w-xl font-serif text-[1.7rem] font-light leading-[1.28] tracking-wide text-warm-white/95 md:mt-11 md:text-[2.15rem] lg:text-[2.4rem]">
            {headlineWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-[0.28em] inline-block"
                initial={false}
                animate={
                  entered || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                transition={{
                  duration: reduceMotion ? 0.25 : 0.95,
                  delay: reduceMotion ? 0 : 0.48 + index * 0.07,
                  ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          <motion.p
            className="mt-5 max-w-md text-sm font-light leading-relaxed text-warm-white/70 md:mt-6 md:text-base"
            initial={false}
            animate={
              entered || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{
              duration: 1,
              delay: reduceMotion ? 0 : 0.95,
              ease,
            }}
          >
            {heroSupport}
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap items-center gap-3.5 md:mt-12 md:gap-4"
            initial={false}
            animate={
              entered || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1,
              delay: reduceMotion ? 0 : 1.1,
              ease,
            }}
          >
            <ScrollTo
              to={heroCtas[0].to}
              className="btn-primary !border-warm-white !bg-warm-white !text-deep-charcoal !shadow-[0_14px_36px_rgba(41,41,41,0.22)]"
            >
              {heroCtas[0].label}
            </ScrollTo>
          </motion.div>
        </div>
      </motion.div>

      <ScrollTo
        to="about"
        className="scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-warm-white/60 transition hover:text-warm-white"
        aria-label="Scroll to about"
      >
        <motion.span
          className="text-[0.62rem] uppercase tracking-[0.32em]"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.45, 1, 0.45], y: [0, -2, 0] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Enter
        </motion.span>
        <motion.span
          aria-hidden
          className="scroll-cue-line"
          animate={
            reduceMotion
              ? undefined
              : { scaleY: [0.25, 1, 0.25], opacity: [0.25, 1, 0.25] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </ScrollTo>
    </section>
  );
}
