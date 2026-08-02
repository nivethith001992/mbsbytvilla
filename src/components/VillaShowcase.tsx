"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { accommodations } from "@/lib/content";
import { Reveal } from "./Reveal";

export function VillaShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const chalet = accommodations[active];

  return (
    <section id="villas" className="relative overflow-hidden bg-warm-white">
      <div className="container-lux section-pad pb-12 md:pb-14">
        <Reveal>
          <p className="eyebrow">Stay</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">Four chalets.</span>
            <span className="mt-1 block italic text-earth-brown/90">Four energies.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            Each home is named after a principal chakra — distinct in floor plan and viewing pleasure,
            united by privacy and nature.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-2.5 md:mt-16 md:gap-3">
          {accommodations.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className={`chip ${active === index ? "chip-active" : "chip-idle"}`}
              aria-pressed={active === index}
            >
              {item.name}
            </button>
          ))}
        </Reveal>
      </div>

      <div className="relative px-[max(1.25rem,calc((100%-1180px)/2))] pb-16 md:pb-24">
        <div className="media-frame relative min-h-[82svh] overflow-hidden md:min-h-[88svh] md:!rounded-[2.5rem]">
          <AnimatePresence mode="wait">
            <motion.article
              key={chalet.id}
              id={chalet.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[82svh] md:min-h-[88svh]"
            >
              <div className="absolute inset-0">
                <motion.div
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={chalet.image}
                    alt={chalet.imageAlt}
                    fill
                    priority={active === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/82 via-deep-charcoal/48 to-deep-charcoal/22" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/72 via-transparent to-deep-charcoal/25" />
                <div className="grain" />
              </div>

              <div className="relative z-10 flex min-h-[82svh] items-end md:min-h-[88svh]">
                <div className="w-full px-7 pb-14 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-16">
                  <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
                    <motion.div
                      className="lg:col-span-7"
                      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.85, delay: 0.15 }}
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.32em] text-sand-beige">
                        {String(active + 1).padStart(2, "0")} — {chalet.chakra}
                      </p>
                      <h3 className="mt-5 font-serif text-[clamp(3rem,8vw,6rem)] leading-[0.92] text-warm-white">
                        {chalet.name}
                      </h3>
                      <p className="mt-6 max-w-lg font-serif text-xl italic leading-relaxed text-sand-beige/90 md:text-2xl">
                        {chalet.meaning}
                      </p>
                      <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-warm-white/72 md:text-base">
                        {chalet.description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="lg:col-span-5"
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.85, delay: 0.28 }}
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-sand-beige/70">
                        {chalet.accent}
                      </p>
                      <ul className="mt-7 grid gap-3 border-t border-white/15 pt-7 sm:grid-cols-2">
                        {chalet.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-baseline gap-3 text-sm text-warm-white/80"
                          >
                            <span aria-hidden className="h-px w-3 shrink-0 bg-sand-beige/70" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-11 flex flex-wrap items-end justify-between gap-6">
                        <div>
                          <p className="font-serif text-2xl text-warm-white md:text-3xl">
                            {chalet.capacity}
                          </p>
                          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-sand-beige">
                            {chalet.fromPrice}
                          </p>
                        </div>
                        <a href="#booking" className="btn-secondary">
                          Enquire
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
