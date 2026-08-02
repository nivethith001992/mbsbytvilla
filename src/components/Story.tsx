"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, -70]);
  const slowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-40, 50]);
  const mainScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [1.12, 1, 1.06]);
  const tertiaryY = useTransform(scrollYProgress, [0.35, 1], reduceMotion ? [0, 0] : [60, -30]);
  const titleX = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [0, 0] : [40, 0]);

  return (
    <section id="story" ref={ref} className="section-pad-lg section-atmosphere relative overflow-hidden">
      <div className="container-lux">
        <div className="mb-16 md:mb-24 lg:mb-28">
          <Reveal variant="blur">
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>
          <motion.div style={{ x: titleX }}>
            <Reveal delay={0.1} variant="clip" y={48}>
              <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
                <span className="block">{about.displayTitle[0]}</span>
                <span className="mt-1 block italic text-earth-brown/90">{about.displayTitle[1]}</span>
              </h2>
            </Reveal>
          </motion.div>
        </div>

        <div className="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-7" variant="scale" y={48} duration={1.25}>
            <div className="image-reveal relative aspect-[4/5] overflow-hidden md:aspect-[5/6] lg:min-h-[44rem]">
              <motion.div style={{ y: slowY, scale: mainScale }} className="absolute inset-[-8%]">
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <div className="relative z-10 lg:col-span-5 lg:pt-16 xl:pt-24">
            <motion.div
              style={{ y: floatY }}
              className="image-reveal relative mb-12 aspect-[4/5] w-[80%] overflow-hidden border-[12px] border-warm-white shadow-[0_28px_70px_rgba(41,41,41,0.12)] md:w-[72%] lg:absolute lg:-left-[16%] lg:top-8 lg:mb-0 lg:w-[56%] xl:-left-[20%]"
            >
              <Reveal variant="scale" delay={0.15} className="absolute inset-0" y={0}>
                <Image
                  src={about.secondaryImage}
                  alt={about.secondaryImageAlt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 28vw"
                  className="object-cover"
                />
              </Reveal>
            </motion.div>

            <Stagger className="space-y-7 lg:mt-72 xl:mt-80" delay={0.12} stagger={0.12}>
              {about.paragraphs.slice(0, 2).map((paragraph) => (
                <StaggerItem key={paragraph} y={32}>
                  <p className="text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.22} variant="left" className="mt-14 border-l border-sand-beige pl-7">
              <p className="font-serif text-2xl italic leading-snug text-deep-charcoal md:text-[1.9rem]">
                “{about.pullQuote}”
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 grid items-stretch gap-6 md:mt-40 md:grid-cols-12 md:gap-8">
          <Reveal className="relative overflow-hidden md:col-span-8" variant="scale" y={40}>
            <div className="image-reveal relative aspect-[16/9] md:aspect-auto md:min-h-[23rem]">
              <motion.div style={{ y: tertiaryY }} className="absolute inset-[-10%]">
                <Image
                  src={about.tertiaryImage}
                  alt={about.tertiaryImageAlt}
                  fill
                  sizes="66vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
          <Reveal delay={0.14} variant="right" className="panel-lux relative p-9 md:col-span-4 md:p-12">
            <div className="grain opacity-[0.06]" />
            <p className="eyebrow eyebrow-light">{about.sidePanelEyebrow}</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-warm-white xl:text-[1.95rem]">
              {about.sidePanelTitle}
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
