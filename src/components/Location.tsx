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
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Location() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-12%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.18, 1]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [36, -24]);

  return (
    <section id="location" className="relative overflow-hidden">
      <div ref={heroRef} className="relative min-h-[70svh] overflow-hidden md:min-h-[80svh]">
        <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-[-12%]">
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
          <motion.div style={{ y: copyY }} className="container-lux w-full pb-16 pt-32 md:pb-24">
            <Reveal variant="blur" y={44}>
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
          </motion.div>
        </div>
      </div>

      <div className="section-pad bg-warm-white">
        <div className="container-lux">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="relative lg:col-span-7" variant="scale" y={40} duration={1.2}>
              <div className="media-frame relative aspect-[16/11] w-full bg-surface-deep shadow-[0_20px_50px_rgba(41,41,41,0.06)] md:!rounded-[2.1rem_1.6rem_2.6rem_1.6rem]">
                <iframe
                  title="Mind Body & Soul location map"
                  src={brand.mapEmbed}
                  className="absolute inset-0 h-full w-full contrast-[1.03] saturate-[0.85]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-serif text-2xl text-deep-charcoal md:text-3xl">
                    {brand.address.line}
                  </p>
                  <p className="mt-1 text-sm text-soft-grey">
                    {brand.address.city}, {brand.address.country}
                  </p>
                </div>
                <a
                  href={brand.social.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Open in Maps
                </a>
              </div>
            </Reveal>

            <div className="flex flex-col gap-10 lg:col-span-5">
              <div>
                <Reveal variant="right">
                  <p className="eyebrow">Nearby</p>
                </Reveal>
                <Stagger className="mt-7 space-y-0" delay={0.08} stagger={0.1}>
                  {location.attractions.map((item, index) => (
                    <StaggerItem key={item.name} y={28}>
                      <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-[color:var(--line)] py-6">
                        <span className="pt-1 text-[0.65rem] tracking-[0.22em] text-sand-beige">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl text-deep-charcoal">{item.name}</h3>
                          <p className="mt-2 text-sm font-light leading-relaxed text-soft-grey">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <Reveal delay={0.1} variant="scale" className="panel-lux relative p-8 md:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(220,203,184,0.25), transparent 50%)",
                  }}
                />
                <div className="relative">
                  <p className="eyebrow eyebrow-light">Travel</p>
                  <ul className="mt-6 space-y-3.5">
                    {location.travel.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm font-light leading-relaxed text-warm-white/78"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-sand-beige" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
