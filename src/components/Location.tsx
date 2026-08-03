"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { brand, location } from "@/lib/content";
import { useLightMotion } from "@/lib/motion";
import { Reveal } from "./Reveal";

export function Location() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const lightMotion = useLightMotion();
  const skipParallax = Boolean(reduceMotion || lightMotion);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    skipParallax ? ["0%", "0%"] : ["-4%", "4%"],
  );

  return (
    <section id="location" className="relative overflow-hidden">
      <div
        ref={heroRef}
        className="relative min-h-[70svh] overflow-hidden md:min-h-[80svh]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-[-5%]">
          <Image
            src={location.image}
            alt={location.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/42 to-deep-charcoal/30" />
        <div className="grain" />
        <div className="relative z-10 flex min-h-[70svh] items-end md:min-h-[80svh]">
          <div className="container-lux w-full pb-16 pt-32 md:pb-24">
            <Reveal variant="up" y={36}>
              <p className="eyebrow eyebrow-light">Location</p>
              <h2 className="display-lg mt-6 max-w-4xl text-warm-white">
                <span className="block">{location.displayTitle[0]}</span>
                <span className="mt-1 block italic text-sand-beige/90">
                  {location.displayTitle[1]}
                </span>
              </h2>
              <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-warm-white/72 md:text-lg">
                {location.atmosphere}
              </p>
              <p className="mt-8 max-w-xl font-serif text-lg leading-snug text-warm-white/90 md:text-xl">
                {brand.address.line}
                <span className="text-warm-white/40"> · </span>
                <span className="font-sans text-base font-light tracking-normal text-warm-white/65 md:text-lg">
                  {brand.address.city}, {brand.address.country}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
