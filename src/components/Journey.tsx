"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { journeyIntro, journeySteps } from "@/lib/content";
import { Reveal } from "./Reveal";

const PIN_MQ = "(min-width: 1024px)";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add(PIN_MQ, () => {
      const getDistance = () =>
        Math.max(track.scrollWidth - pin.clientWidth, 0);

      // Single track tween only — nested per-panel scrub was a major jank source
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          start: "top top",
          end: () =>
            `+=${Math.max(getDistance() * 0.92, window.innerWidth * 0.55)}`,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 180);
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 320);

      return () => {
        window.clearTimeout(refreshTimer);
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
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
      className="relative overflow-x-clip bg-surface"
      aria-label="On the grounds"
    >
      <div className="container-lux relative z-10 pt-24 md:pt-32 lg:pb-4">
        <Reveal variant="up" y={32}>
          <p className="eyebrow">{journeyIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 max-w-3xl text-deep-charcoal">
            <span className="block">{journeyIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {journeyIntro.title[1]}
            </span>
          </h2>
        </Reveal>
      </div>

      <div
        ref={pinRef}
        className="journey-pin relative mt-12 w-full lg:mt-10 lg:h-[100svh] lg:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="journey-track flex w-full flex-col gap-8 px-[max(1.25rem,calc((100%-1180px)/2))] pb-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-7 lg:px-0 lg:pb-0 lg:pl-[max(1.25rem,calc((100%-1180px)/2))] lg:pr-[12vw]"
        >
          {journeySteps.map((step) => (
            <article
              key={step.id}
              className="journey-panel relative w-full shrink-0 lg:h-[min(78svh,720px)] lg:w-[min(78vw,980px)]"
            >
              <div className="journey-frame relative h-[56vh] overflow-hidden lg:h-full">
                <div className="absolute inset-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 78vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/78 via-deep-charcoal/28 to-transparent" />
                <div className="grain" />

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-14">
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
      </div>
    </section>
  );
}
