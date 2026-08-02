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
import { Reveal, Stagger, StaggerItem } from "./Reveal";

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
            </Reveal>
          </div>
        </div>
      </div>

      <div className="section-pad bg-warm-white">
        <div className="container-lux">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="relative lg:col-span-7" variant="up" y={32} duration={0.9}>
              <div className="media-frame relative aspect-[16/11] w-full bg-surface-deep shadow-[0_16px_40px_rgba(41,41,41,0.05)] md:!rounded-[2.1rem_1.6rem_2.6rem_1.6rem]">
                <iframe
                  title="Mind Body & Soul location map"
                  src={brand.mapEmbed}
                  className="absolute inset-0 h-full w-full contrast-[1.03] saturate-[0.85]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-7 font-serif text-xl leading-snug text-deep-charcoal md:text-2xl">
                {brand.address.line}
                <span className="text-soft-grey"> · </span>
                <span className="font-sans text-base font-light tracking-normal text-soft-grey md:text-lg">
                  {brand.address.city}, {brand.address.country}
                </span>
              </p>
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal variant="right">
                <p className="eyebrow">Nearby</p>
              </Reveal>
              <Stagger className="mt-7 space-y-0" delay={0.08} stagger={0.1}>
                {location.attractions.map((item, index) => (
                  <StaggerItem key={item.name} y={28}>
                    <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-[color:var(--line)] py-5">
                      <span className="pt-1 text-[0.65rem] tracking-[0.22em] text-sand-beige">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                        <h3 className="shrink-0 font-serif text-xl text-deep-charcoal md:text-2xl">
                          {item.name}
                        </h3>
                        <p className="text-sm font-light leading-relaxed text-soft-grey">
                          <span className="hidden text-sand-beige sm:inline" aria-hidden>
                            ·{" "}
                          </span>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
