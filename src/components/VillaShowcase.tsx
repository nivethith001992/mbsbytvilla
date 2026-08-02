"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { accommodations, villasIntro } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { ScrollTo } from "./ScrollTo";

export function VillaShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const chalet = accommodations[active];

  return (
    <section id="villas" className="relative overflow-hidden bg-warm-white">
      <div className="container-lux section-pad pb-12 md:pb-14">
        <Reveal variant="up" y={32}>
          <p className="eyebrow">{villasIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">{villasIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {villasIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            {villasIntro.support}
          </p>
        </Reveal>

        <Stagger delay={0.12} stagger={0.06} className="mt-12 flex flex-wrap gap-2.5 md:mt-16 md:gap-3">
          {accommodations.map((item, index) => (
            <StaggerItem key={item.id} y={18}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`chip ${active === index ? "chip-active" : "chip-idle"}`}
                aria-pressed={active === index}
              >
                {item.name}
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="relative px-[max(1.25rem,calc((100%-1180px)/2))] pb-16 md:pb-24">
        <Reveal variant="up" y={24} duration={0.85}>
          <div className="media-frame relative min-h-[82svh] overflow-hidden shadow-[0_18px_48px_rgba(41,41,41,0.06)] md:min-h-[88svh] md:!rounded-[2.6rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={chalet.id}
                id={chalet.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[82svh] md:min-h-[88svh]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={chalet.image}
                    alt={chalet.imageAlt}
                    fill
                    priority={active === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/82 via-deep-charcoal/48 to-deep-charcoal/22" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/72 via-transparent to-deep-charcoal/25" />
                  <div className="grain" />
                </div>

                <div className="relative z-10 flex min-h-[82svh] items-end md:min-h-[88svh]">
                  <div className="w-full px-7 pb-14 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-16">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
                      <motion.div
                        className="lg:col-span-7"
                        initial={reduceMotion ? false : { opacity: 0, y: 40, x: -16 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
                        initial={reduceMotion ? false : { opacity: 0, y: 36, x: 16 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-sand-beige/70">
                          {chalet.accent}
                        </p>
                        <ul className="mt-7 grid gap-3 border-t border-white/15 pt-7 sm:grid-cols-2">
                          {chalet.features.map((feature, i) => (
                            <motion.li
                              key={feature}
                              className="flex items-baseline gap-3 text-sm text-warm-white/80"
                              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.55,
                                delay: reduceMotion ? 0 : 0.4 + i * 0.045,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <span aria-hidden className="h-px w-3 shrink-0 bg-sand-beige/70" />
                              {feature}
                            </motion.li>
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
                          <ScrollTo to="booking" className="btn-secondary">
                            Enquire
                          </ScrollTo>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
