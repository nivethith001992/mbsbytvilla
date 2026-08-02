"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  brand,
  heroEyebrow,
  heroHeadline,
  heroImage,
  heroSupport,
} from "@/lib/content";
import { ScrollTo } from "./ScrollTo";

const ease = [0.22, 1, 0.36, 1] as const;

function splitWords(text: string) {
  return text.split(" ");
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduceMotion ? "0%" : "32%"],
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 1.18],
  );
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.12]);
  const rawTextY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduceMotion ? "0%" : "18%"],
  );
  const rawTextOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const rawVignette = useTransform(
    scrollYProgress,
    [0, 1],
    [0.35, reduceMotion ? 0.35 : 0.7],
  );

  const y = useSpring(rawY, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const scale = useSpring(rawScale, { stiffness: 70, damping: 26 });
  const opacity = useSpring(rawOpacity, { stiffness: 90, damping: 28 });
  const textY = useSpring(rawTextY, { stiffness: 90, damping: 28 });
  const textOpacity = useSpring(rawTextOpacity, { stiffness: 90, damping: 28 });

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("mbs-intro-seen") === "1";
    const delay = reduceMotion ? 0 : seen ? 60 : 1480;
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
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          style={{ scale }}
          className={`absolute inset-[-4%] ${reduceMotion ? "" : "ken-burns"}`}
        >
          <Image
            src={heroImage}
            alt="Cinematic view of Mind Body & Soul luxury care villas and gardens in Dambulla"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-deep-charcoal/38 to-deep-charcoal/28" />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 8%, rgba(41,41,41,0.55) 100%)",
            opacity: rawVignette,
          }}
        />
        <div className="grain" />

        {!reduceMotion ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-[10%] top-[18%] h-[42vmin] w-[42vmin] rounded-full bg-sand-beige/18 blur-3xl"
              animate={{ x: [0, 36, -12, 0], y: [0, -24, 18, 0], opacity: [0.35, 0.55, 0.4, 0.35] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-[8%] bottom-[22%] h-[36vmin] w-[36vmin] rounded-full bg-earth-brown/16 blur-3xl"
              animate={{ x: [0, -28, 16, 0], y: [0, 20, -14, 0], opacity: [0.25, 0.45, 0.3, 0.25] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : null}
      </motion.div>

      {/* Cinematic entrance veil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-deep-charcoal"
        initial={{ opacity: 1 }}
        animate={entered || reduceMotion ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 1.35, ease }}
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
              <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={false}
                  animate={
                    entered || reduceMotion
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : { opacity: 0, y: "1.1em", rotateX: -28 }
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
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 22, filter: reduceMotion ? "blur(0px)" : "blur(8px)" }
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
              to="booking"
              className="btn-primary !border-warm-white !bg-warm-white !text-deep-charcoal !shadow-[0_14px_36px_rgba(41,41,41,0.22)]"
            >
              Enquire About Care
            </ScrollTo>
            <ScrollTo to="villas" className="btn-secondary">
              Explore Villas
            </ScrollTo>
          </motion.div>
        </div>
      </motion.div>

      <ScrollTo
        to="story"
        className="scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-warm-white/60 transition hover:text-warm-white"
        aria-label="Scroll to story"
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
