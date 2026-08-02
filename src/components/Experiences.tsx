"use client";

import Image from "next/image";
import { experiences } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-warm-white">
      <div className="container-lux section-pad pb-12 md:pb-16">
        <Reveal>
          <p className="eyebrow">Experiences</p>
          <h2 className="display-lg mt-6 max-w-4xl text-deep-charcoal">
            <span className="block">Ways to return</span>
            <span className="mt-1 block italic text-earth-brown/90">to yourself</span>
          </h2>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-soft-grey md:text-lg">
            Yoga, meditation, nature, and simple living — quiet rituals that restore mind, body, and soul.
          </p>
        </Reveal>
      </div>

      <div className="space-y-5 px-[max(1.25rem,calc((100%-1180px)/2))] pb-16 md:space-y-6 md:pb-24">
        {experiences.map((item, index) => {
          const reverse = index % 2 === 1;
          return (
            <article
              key={item.title}
              className="group media-frame relative min-h-[72svh] overflow-hidden md:min-h-[78svh] md:!rounded-[2.35rem]"
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover transition duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                />
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
                  <Reveal className="max-w-xl">
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
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
