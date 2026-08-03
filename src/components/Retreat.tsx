"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { careIntro, careSpaces } from "@/lib/content";
import { useLightMotion } from "@/lib/motion";
import { LuxImage } from "./LuxImage";
import { Reveal } from "./Reveal";

function CareRow({
  space,
  index,
}: {
  space: (typeof careSpaces)[number];
  index: number;
}) {
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const lightMotion = useLightMotion();
  const skipParallax = Boolean(reduceMotion || lightMotion);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    skipParallax ? ["0%", "0%"] : ["-3%", "3%"],
  );
  // Even indices (01, 03): text left / image right + scoop BR (screenshot pattern)
  // Odd indices (02, 04): image left / text right + scoop BL (mirrored)
  const imageRight = index % 2 === 0;
  const aspectClass =
    index % 3 === 0
      ? "aspect-[16/10]"
      : index % 3 === 1
        ? "aspect-[5/4]"
        : "aspect-[16/11]";
  const maskClass = imageRight ? "image-mask-soft" : "image-mask-soft-flip";

  return (
    <article
      ref={rowRef}
      className="grid items-center gap-10 border-t border-white/10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12"
    >
      <Reveal
        className={`relative lg:col-span-7 ${imageRight ? "lg:order-2" : ""}`}
        variant={imageRight ? "right" : "left"}
        y={20}
        duration={0.55}
        fade={false}
      >
        <div
          className={`image-reveal relative overflow-hidden bg-deep-charcoal/40 ${aspectClass} ${maskClass}`}
        >
          <motion.div style={{ y: imageY }} className="absolute inset-[-6%]">
            <LuxImage
              src={space.image}
              alt={space.imageAlt}
              fill
              priority={index === 0}
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={75}
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/35 via-transparent to-transparent" />
        </div>
      </Reveal>

      <div
        className={`lg:col-span-5 ${imageRight ? "lg:order-1 lg:pr-4" : "lg:pl-2 xl:pl-8"}`}
      >
        <Reveal delay={0.1} variant="up" y={28}>
          <p className="text-[0.7rem] tracking-[0.35em] text-sand-beige/80">
            {space.label}
          </p>
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.28em] text-sand-beige/70">
            {space.subtitle}
          </p>
          <h3 className="mt-3 font-serif text-4xl text-warm-white md:text-5xl">
            {space.title}
          </h3>
          <p className="mt-7 max-w-md text-base font-light leading-[1.9] text-warm-white/68">
            {space.description}
          </p>
          {space.features.length > 0 ? (
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-1">
              {space.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-baseline gap-3 text-sm text-warm-white/78"
                >
                  <span
                    aria-hidden
                    className="h-px w-3 shrink-0 bg-sand-beige/70"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </article>
  );
}

export function Retreat() {
  return (
    <section
      id="care"
      className="section-pad-lg relative overflow-hidden bg-deep-charcoal text-warm-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, rgba(220,203,184,0.14), transparent 42%), radial-gradient(ellipse at 90% 80%, rgba(138,106,74,0.2), transparent 40%)",
        }}
      />
      <div className="grain opacity-[0.05]" />

      <div className="container-lux relative">
        <Reveal variant="up" y={36}>
          <p className="eyebrow eyebrow-light">{careIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-4xl text-warm-white">
            <span className="block">{careIntro.title[0]}</span>
            <span className="mt-1 block italic text-sand-beige/90">
              {careIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-warm-white/68 md:text-lg">
            {careIntro.support}
          </p>
        </Reveal>

        <div className="mt-16 space-y-0 md:mt-24">
          {careSpaces.map((space, index) => (
            <CareRow key={space.id} space={space} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
