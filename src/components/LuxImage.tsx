"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type LuxImageProps = ImageProps & {
  /**
   * Soft LQIP while decoding. Off by default — blur placeholders read as
   * soft/blurry images during fast scroll before the full asset arrives.
   */
  lqip?: boolean;
  /** How far ahead of the viewport to start fetching (px). */
  preloadMargin?: number;
};

/**
 * Site-wide next/image defaults: sharp decode, no blur LQIP, early preload.
 */
export function LuxImage({
  src,
  alt,
  lqip = false,
  quality = 70,
  placeholder,
  blurDataURL,
  decoding = "async",
  loading,
  priority,
  preload,
  preloadMargin = 1100,
  sizes,
  ...rest
}: LuxImageProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  // Next 16: `priority` is deprecated in favor of `preload`.
  const shouldPreload = Boolean(preload ?? priority);
  const forceEager = shouldPreload || loading === "eager";
  const [ready, setReady] = useState(forceEager);

  useEffect(() => {
    if (forceEager) {
      setReady(true);
      return;
    }

    const node = anchorRef.current;
    if (!node) {
      setReady(true);
      return;
    }

    const target = node.parentElement ?? node;
    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: `${preloadMargin}px 0px`, threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [forceEager, preloadMargin]);

  const useBlur = Boolean(lqip && blurDataURL && placeholder !== "empty");

  if (!ready) {
    return (
      <span
        ref={anchorRef}
        aria-hidden
        className="absolute inset-0 block bg-inherit"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      decoding={decoding}
      preload={shouldPreload || undefined}
      sizes={sizes}
      loading={shouldPreload ? undefined : (loading ?? "eager")}
      placeholder={useBlur ? "blur" : (placeholder ?? "empty")}
      blurDataURL={useBlur ? blurDataURL : undefined}
      {...rest}
    />
  );
}
