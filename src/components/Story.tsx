"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);
  const slowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-20, 30]);

  return (
    <section id="story" ref={ref} className="section-pad-lg section-atmosphere relative overflow-hidden">
      <div className="container-lux">
        <div className="mb-16 md:mb-24 lg:mb-28">
          <Reveal>
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
              <span className="block">{about.displayTitle[0]}</span>
              <span className="mt-1 block italic text-earth-brown/90">{about.displayTitle[1]}</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-7">
            <motion.div
              style={{ y: slowY }}
              className="image-reveal relative aspect-[4/5] md:aspect-[5/6] lg:min-h-[44rem]"
            >
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </motion.div>
          </Reveal>

          <div className="relative z-10 lg:col-span-5 lg:pt-16 xl:pt-24">
            <motion.div
              style={{ y: floatY }}
              className="image-reveal relative mb-12 aspect-[4/5] w-[80%] border-[12px] border-warm-white shadow-[0_28px_70px_rgba(41,41,41,0.12)] md:w-[72%] lg:absolute lg:-left-[16%] lg:top-8 lg:mb-0 lg:w-[56%] xl:-left-[20%]"
            >
              <Image
                src={about.secondaryImage}
                alt={about.secondaryImageAlt}
                fill
                sizes="(max-width: 1024px) 70vw, 28vw"
                className="object-cover"
              />
            </motion.div>

            <div className="space-y-7 lg:mt-72 xl:mt-80">
              {about.paragraphs.slice(0, 2).map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.1 * (index + 1)}>
                  <p className="text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.28} className="mt-14 border-l border-sand-beige pl-7">
              <p className="font-serif text-2xl italic leading-snug text-deep-charcoal md:text-[1.9rem]">
                “{about.pullQuote}”
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid items-stretch gap-6 md:mt-36 md:grid-cols-12 md:gap-7">
          <Reveal className="image-reveal relative aspect-[16/9] md:col-span-8 md:aspect-auto md:min-h-[22rem]">
            <Image
              src={about.tertiaryImage}
              alt={about.tertiaryImageAlt}
              fill
              sizes="66vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.12} className="panel-lux relative p-9 md:col-span-4 md:p-11">
            <div className="grain opacity-[0.06]" />
            <p className="eyebrow eyebrow-light">Dambulla</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-warm-white xl:text-[1.95rem]">
              An escape beyond ordinary living — where trees and birdsong set the rhythm.
            </p>
            <p className="mt-6 text-sm font-light leading-relaxed text-warm-white/65">
              {about.paragraphs[2]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
