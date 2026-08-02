"use client";

import Image from "next/image";
import { retreatSpaces } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Retreat() {
  return (
    <section
      id="retreat"
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
        <Reveal>
          <p className="eyebrow eyebrow-light">The Retreat</p>
          <h2 className="display-lg mt-6 max-w-4xl text-warm-white">
            <span className="block">Spaces shaped by</span>
            <span className="mt-1 block italic text-sand-beige/90">nature & silence</span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-warm-white/68 md:text-lg">
            Not a busy resort — a private garden sanctuary where every corner invites you deeper into calm.
          </p>
        </Reveal>

        <div className="mt-16 space-y-0 md:mt-24">
          {retreatSpaces.map((space, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={space.id}
                className="grid items-center gap-10 border-t border-white/10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12"
              >
                <Reveal
                  className={`relative lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
                >
                  <div
                    className={`image-reveal relative ${
                      index % 3 === 0
                        ? "aspect-[16/10] md:!rounded-[2.5rem_1.25rem_2.5rem_1.25rem]"
                        : index % 3 === 1
                          ? "aspect-[5/4] image-mask-soft"
                          : "aspect-[16/11]"
                    }`}
                  >
                    <Image
                      src={space.image}
                      alt={space.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/35 via-transparent to-transparent" />
                  </div>
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-4" : "lg:pl-2 xl:pl-8"}`}
                >
                  <p className="text-[0.7rem] tracking-[0.35em] text-sand-beige/80">{space.label}</p>
                  <h3 className="mt-5 font-serif text-4xl text-warm-white md:text-5xl">
                    {space.title}
                  </h3>
                  <p className="mt-4 font-serif text-xl italic text-sand-beige/85 md:text-2xl">
                    {space.subtitle}
                  </p>
                  <p className="mt-7 max-w-md text-base font-light leading-[1.9] text-warm-white/68">
                    {space.description}
                  </p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
