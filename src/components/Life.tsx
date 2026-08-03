"use client";

import Image from "next/image";
import {
  community,
  excursions,
  lifeIntro,
  wellness,
} from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Life() {
  return (
    <section
      id="life"
      className="section-pad-lg section-atmosphere relative overflow-hidden"
    >
      <div className="container-lux">
        <Reveal variant="up" y={32}>
          <p className="eyebrow">{lifeIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">{lifeIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {lifeIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            {lifeIntro.support}
          </p>
        </Reveal>

        {/* Wellness & Activities */}
        <div className="mt-16 grid items-start gap-12 md:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="relative lg:col-span-6" variant="up" y={36}>
            <div className="image-reveal relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Image
                src={wellness.image}
                alt={wellness.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pt-8">
            <Reveal variant="up" delay={0.08}>
              <p className="eyebrow">{wellness.eyebrow}</p>
              <h3 className="mt-5 font-serif text-3xl text-deep-charcoal md:text-4xl">
                {wellness.title}
              </h3>
              <p className="mt-6 text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]">
                {wellness.intro}
              </p>
              <p className="mt-4 text-sm font-light text-soft-grey">
                Guests can enjoy:
              </p>
            </Reveal>

            <Stagger
              className="mt-6 grid gap-3 sm:grid-cols-2"
              delay={0.1}
              stagger={0.04}
            >
              {wellness.activities.map((activity) => (
                <StaggerItem key={activity} y={16}>
                  <div className="flex items-baseline gap-3 text-sm text-deep-charcoal/85">
                    <span
                      aria-hidden
                      className="h-px w-3 shrink-0 bg-earth-brown/50"
                    />
                    {activity}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.14} variant="up" className="mt-10">
              <p className="border-l border-sand-beige pl-6 text-base font-light leading-relaxed text-soft-grey md:text-[1.05rem]">
                {wellness.relaxation}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Community */}
        <div className="mt-24 border-t border-[color:var(--line)] pt-16 md:mt-32 md:pt-20">
          <Reveal variant="up" y={28}>
            <p className="eyebrow">{community.eyebrow}</p>
            <h3 className="mt-5 max-w-2xl font-serif text-3xl text-deep-charcoal md:text-4xl">
              {community.title}
            </h3>
            <div className="mt-7 max-w-3xl space-y-5">
              {community.paragraphs.map((paragraph) => (
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

        {/* Excursions */}
        <div className="mt-20 md:mt-28">
          <Reveal variant="up" y={28}>
            <p className="eyebrow">{excursions.eyebrow}</p>
            <h3 className="mt-5 max-w-2xl font-serif text-3xl text-deep-charcoal md:text-4xl">
              {excursions.title}
            </h3>
            <p className="mt-6 max-w-2xl text-base font-light leading-[1.95] text-soft-grey md:text-[1.08rem]">
              {excursions.intro}
            </p>
            <p className="mt-4 text-sm font-light text-soft-grey">
              {excursions.listIntro}
            </p>
          </Reveal>

          <Stagger
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            delay={0.08}
            stagger={0.05}
          >
            {excursions.destinations.map((destination, index) => (
              <StaggerItem key={destination} y={18}>
                <div className="flex items-baseline gap-4 border-b border-[color:var(--line)] py-4">
                  <span className="text-[0.65rem] tracking-[0.22em] text-sand-beige">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl text-deep-charcoal md:text-2xl">
                    {destination}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} variant="up" className="mt-8">
            <p className="max-w-2xl text-base font-light leading-relaxed text-soft-grey">
              {excursions.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
