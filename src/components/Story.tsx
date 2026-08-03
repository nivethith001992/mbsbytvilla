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
import { useLightMotion } from "@/lib/motion";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const lightMotion = useLightMotion();
  const skipParallax = Boolean(reduceMotion || lightMotion);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const slowY = useTransform(
    scrollYProgress,
    [0, 1],
    skipParallax ? [0, 0] : [-12, 14],
  );
  const floatY = useTransform(
    scrollYProgress,
    [0, 1],
    skipParallax ? [0, 0] : [14, -14],
  );

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad-lg section-atmosphere relative overflow-hidden"
    >
      <div className="container-lux">
        <div className="mb-16 md:mb-24 lg:mb-28">
          <Reveal variant="up">
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08} variant="up" y={32}>
            <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
              <span className="block">{about.displayTitle[0]}</span>
              <span className="mt-1 block italic text-earth-brown/90">
                {about.displayTitle[1]}
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-7" variant="up" y={36} duration={0.9}>
            <div className="image-reveal relative aspect-[4/5] overflow-hidden md:aspect-[5/6] lg:min-h-[44rem]">
              <motion.div style={{ y: slowY }} className="absolute inset-[-5%]">
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
              className="image-reveal relative mb-12 aspect-[4/5] w-[80%] overflow-hidden border-[12px] border-warm-white shadow-[0_20px_48px_rgba(41,41,41,0.1)] md:w-[72%] lg:absolute lg:-left-[16%] lg:top-8 lg:mb-0 lg:w-[56%] xl:-left-[20%]"
            >
              <Reveal variant="up" delay={0.1} className="absolute inset-0" y={0}>
                <Image
                  src={about.secondaryImage}
                  alt={about.secondaryImageAlt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 28vw"
                  className="object-cover"
                />
              </Reveal>
            </motion.div>

            <Stagger className="space-y-7 lg:mt-72 xl:mt-80" delay={0.08} stagger={0.08}>
              {about.paragraphs.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 48)} y={24}>
                  <p className="text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-28 grid items-stretch gap-6 md:mt-40 md:grid-cols-12 md:gap-8">
          <Reveal className="relative overflow-hidden md:col-span-5" variant="up" y={28}>
            <div className="image-reveal relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src={about.tertiaryImage}
                alt={about.tertiaryImageAlt}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            delay={0.1}
            variant="up"
            className="panel-lux relative p-9 md:col-span-7 md:p-12 lg:p-14"
          >
            <div className="grain opacity-[0.06]" />
            <p className="eyebrow eyebrow-light">{about.philosophy.eyebrow}</p>
            <h3 className="mt-5 font-serif text-3xl text-warm-white md:text-4xl">
              {about.philosophy.title}
            </h3>
            <div className="mt-6 space-y-5">
              {about.philosophy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm font-light leading-relaxed text-warm-white/65 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-8 text-sm font-light text-warm-white/55">
              {about.philosophy.missionLead}
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-sand-beige md:text-[1.9rem]">
              {about.philosophy.mission}
            </p>
          </Reveal>
        </div>

        {/* Our Story */}
        <div className="mt-20 border-t border-[color:var(--line)] pt-16 md:mt-28 md:pt-20">
          <Reveal variant="up" y={28}>
            <p className="eyebrow">{about.ourStory.eyebrow}</p>
            <h3 className="mt-5 max-w-2xl font-serif text-3xl text-deep-charcoal md:text-4xl">
              {about.ourStory.title}
            </h3>
            <div className="mt-7 max-w-3xl space-y-5">
              {about.ourStory.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
