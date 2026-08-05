"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { gallery, galleryIntro } from "@/lib/content";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll";
import { LuxImage } from "./LuxImage";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const openRef = useRef(false);

  useEffect(() => {
    if (active === null) {
      if (openRef.current) {
        unlockBodyScroll();
        previouslyFocused.current?.focus({ preventScroll: true });
        previouslyFocused.current = null;
        openRef.current = false;
      }
      return;
    }

    if (!openRef.current) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      openRef.current = true;
      lockBodyScroll();
      const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }
  }, [active]);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((current) =>
          current === null ? current : (current + 1) % gallery.length,
        );
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((current) =>
          current === null ? current : (current - 1 + gallery.length) % gallery.length,
        );
      }
      if (event.key === "Tab") {
        const dialog = document.getElementById("gallery-lightbox");
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    return () => {
      if (openRef.current) {
        unlockBodyScroll();
        openRef.current = false;
      }
    };
  }, []);

  // Warm the next/prev full-size images while lightbox is open
  useEffect(() => {
    if (active === null) return;
    const warm = [active, (active + 1) % gallery.length, (active - 1 + gallery.length) % gallery.length];
    for (const i of warm) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = gallery[i].src;
    }
  }, [active]);

  return (
    <section id="gallery" className="section-pad-lg section-atmosphere relative overflow-hidden">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-3xl text-center" variant="up" y={32}>
          <p className="eyebrow">{galleryIntro.eyebrow}</p>
          <h2 className="display-lg mt-6 text-deep-charcoal">
            <span className="block">{galleryIntro.title[0]}</span>
            <span className="mt-1 block italic text-earth-brown/90">
              {galleryIntro.title[1]}
            </span>
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-soft-grey md:text-lg">
            {galleryIntro.support}
          </p>
        </Reveal>

        <div className="gallery-masonry mt-16 md:mt-24">
          {gallery.map((item, index) => (
            <Reveal
              key={`${item.src}-${index}`}
              delay={0}
              variant="up"
              y={16}
              duration={0.45}
              fade={false}
              className="gallery-item"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`gallery-thumb image-reveal group relative block w-full bg-surface-deep text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-earth-brown ${
                  index % 5 === 2
                    ? "!rounded-[2.25rem_2.25rem_42%_2.25rem]"
                    : index % 5 === 4
                      ? "!rounded-[2.5rem_1.25rem_2.5rem_1.25rem]"
                      : ""
                }`}
                aria-label={`Open image: ${item.caption}`}
              >
                <span
                  className={`relative block w-full overflow-hidden ${
                    item.span === "tall"
                      ? "aspect-[3/4]"
                      : item.span === "wide"
                        ? "aspect-[5/3]"
                        : "aspect-[4/3]"
                  }`}
                >
                  <LuxImage
                    src={item.thumb}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    quality={70}
                    loading={index < 8 ? "eager" : undefined}
                    preloadMargin={1200}
                    className="object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <span className="gallery-caption-veil absolute inset-0 bg-deep-charcoal/0 transition duration-500 group-hover:bg-deep-charcoal/28" />
                  <span className="gallery-caption absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                    <span className="block font-serif text-xl text-warm-white md:text-2xl">
                      {item.caption}
                    </span>
                    <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.24em] text-warm-white/75">
                      View
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            id="gallery-lightbox"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-deep-charcoal/96 p-3 sm:p-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={() => setActive(null)}
          >
            <button
              ref={closeRef}
              type="button"
              className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 min-h-11 min-w-11 rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-warm-white/80 transition hover:bg-white/10 hover:text-warm-white sm:right-5 sm:top-5"
              onClick={() => setActive(null)}
            >
              Close
            </button>

            <button
              type="button"
              className="absolute left-1 top-1/2 z-10 flex min-h-12 min-w-11 -translate-y-1/2 items-center justify-center rounded-full px-3 py-6 text-warm-white/65 transition hover:bg-white/10 hover:text-warm-white sm:left-2 sm:px-4 sm:py-8 md:left-6"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((current) =>
                  current === null ? current : (current - 1 + gallery.length) % gallery.length,
                );
              }}
            >
              ←
            </button>

            <motion.div
              key={active}
              initial={false}
              animate={{ opacity: 1 }}
              className="relative flex w-full max-w-5xl flex-col items-center px-8 sm:px-12"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[min(58svh,28rem)] w-full overflow-hidden rounded-[1.25rem] bg-deep-charcoal sm:h-[62vh] sm:rounded-[1.75rem] md:h-[72vh] md:rounded-[2.25rem]">
                <LuxImage
                  src={gallery[active].src}
                  alt={gallery[active].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  quality={70}
                  loading="eager"
                  fetchPriority="high"
                  className="object-contain"
                />
              </div>
              <p
                id={titleId}
                className="mt-4 px-2 text-center font-serif text-xl text-warm-white sm:mt-6 sm:text-2xl md:text-3xl"
              >
                {gallery[active].caption}
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.28em] text-warm-white/55">
                {active + 1} / {gallery.length}
              </p>
            </motion.div>

            <button
              type="button"
              className="absolute right-1 top-1/2 z-10 flex min-h-12 min-w-11 -translate-y-1/2 items-center justify-center rounded-full px-3 py-6 text-warm-white/65 transition hover:bg-white/10 hover:text-warm-white sm:right-2 sm:px-4 sm:py-8 md:right-6"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((current) =>
                  current === null ? current : (current + 1) % gallery.length,
                );
              }}
            >
              →
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
