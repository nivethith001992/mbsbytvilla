"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { experiences, experiencesIntro } from "@/lib/content";
import { Reveal } from "./Reveal";

function ExperiencePanel({
  item,
  index,
}: {
  item: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [1, 1, 1] : [1.16, 1.02, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [48, -32]);
  const reverse = index % 2 === 1;

  return (
    <article
      ref={ref}
      className="group media-frame relative min-h-[72svh] overflow-hidden md:min-h-[78svh] md:!rounded-[2.5rem]"
    >
      <div className="absolute inset-0">
        <motion.div style={{ scale, y }} className="absolute inset-[-10%]">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="100vw"
            className="object-cover transition duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
        <div
          className={`absolute inset-0 ${
            reverse
              ? "bg-gradient-to-l from-deep-charcoal/82 via-deep-charcoal/42 to-deep-charcoal/18"
              : "bg-gradient-to-r from-deep-charcoal/82 via-deep-charcoal/42 to-deep-charcoal/18"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/55 via-transparent to-transparent" />
        <div className="grain" />
      </div>

      <div className="relative z-10 flex min-h-[72svh] items-end md:min-h-[78svh]">
        <div
          className={`w-full px-8 pb-14 pt-28 md:px-14 md:pb-20 md:pt-36 lg:px-16 ${
            reverse ? "md:flex md:justify-end" : ""
          }`}
        >
          <motion.div style={{ y: copyY }} className="max-w-xl">
            <Reveal variant={reverse ? "right" : "left"} y={40} duration={1.1}>
              <p className="text-[0.68rem] uppercase tracking-[0.35em] text-sand-beige">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-serif text-[clamp(2.8rem,7vw,5.25rem)] leading-[0.95] text-warm-white">
                {item.title}
              </h3>
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-sand-beige/90 md:text-2xl">
                {item.story}
              </p>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-warm-white/68 md:text-base">
                {item.description}
              </p>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-warm-white">
      <div className="container-lux section-pad pb-12 md:pb-16">
        <Reveal variant="clip" y={44}>
          <p className="eyebrow">{experiencesIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">{experiencesIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {experiencesIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            {experiencesIntro.support}
          </p>
        </Reveal>
      </div>

      <div className="space-y-5 px-[max(1.25rem,calc((100%-1180px)/2))] pb-16 md:space-y-6 md:pb-24">
        {experiences.map((item, index) => (
          <ExperiencePanel key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
