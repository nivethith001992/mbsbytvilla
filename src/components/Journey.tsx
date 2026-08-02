"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { journeySteps } from "@/lib/content";
import { Reveal } from "./Reveal";

const PIN_MQ = "(min-width: 1024px)";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(PIN_MQ, () => {
      const panels = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".journey-panel"),
      );
      if (panels.length === 0) return;

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth, window.innerWidth);

      const tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      const nested: ScrollTrigger[] = [];

      panels.forEach((panel) => {
        const image = panel.querySelector(".journey-image");
        const copy = panel.querySelector(".journey-copy");

        if (image) {
          nested.push(
            ScrollTrigger.create({
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
              onUpdate: (self) => {
                gsap.set(image, { scale: 1.1 - self.progress * 0.1 });
              },
            }),
          );
        }

        if (copy) {
          nested.push(
            ScrollTrigger.create({
              trigger: panel,
              containerAnimation: tween,
              start: "left 70%",
              end: "center center",
              scrub: true,
              onUpdate: (self) => {
                gsap.set(copy, {
                  y: 28 * (1 - self.progress),
                  opacity: 0.4 + self.progress * 0.6,
                });
              },
            }),
          );
        }
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      // Refresh after images/layout settle
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);

      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener("resize", onResize);
        nested.forEach((st) => st.kill());
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(panels, { clearProps: "transform" });
        panels.forEach((panel) => {
          const image = panel.querySelector(".journey-image");
          const copy = panel.querySelector(".journey-copy");
          if (image) gsap.set(image, { clearProps: "transform" });
          if (copy) gsap.set(copy, { clearProps: "transform,opacity" });
        });
      };
    });

    return () => {
      mm.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface"
      aria-label="Your journey begins"
    >
      <div className="container-lux relative z-10 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">Your Journey Begins</p>
          <h2 className="display-lg mt-6 max-w-3xl text-deep-charcoal">
            <span className="block">Arrive. Explore.</span>
            <span className="mt-1 block italic text-earth-brown/90">Relax. Reconnect.</span>
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="mt-14 flex flex-col gap-8 px-[max(1.25rem,calc((100%-1180px)/2))] pb-24 lg:mt-16 lg:flex-row lg:gap-6 lg:overflow-visible lg:pb-28 lg:pr-0"
      >
        {journeySteps.map((step) => (
          <article
            key={step.id}
            className="journey-panel relative w-full shrink-0 lg:h-[70svh] lg:w-[78vw] lg:max-w-[980px] xl:w-[68vw]"
          >
            <div className="journey-frame relative h-[58vh] lg:h-full">
              <div className="journey-image absolute inset-0 will-change-transform">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/78 via-deep-charcoal/28 to-transparent" />
              <div className="grain" />

              <div className="journey-copy absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-14">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-sand-beige">
                  {step.step}
                </p>
                <h3 className="mt-4 font-serif text-4xl text-warm-white md:text-5xl lg:text-6xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-warm-white/75 md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
