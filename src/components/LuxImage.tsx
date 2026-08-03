import Image, { type ImageProps } from "next/image";
import { blurFor } from "@/lib/image-blur";

type LuxImageProps = ImageProps & {
  /** Soft LQIP while the full image decodes. Default true for string srcs. */
  lqip?: boolean;
};

/**
 * Site-wide next/image defaults: blur LQIP, tuned quality, sensible decoding.
 */
export function LuxImage({
  src,
  alt,
  lqip = true,
  quality = 65,
  placeholder,
  blurDataURL,
  decoding = "async",
  ...rest
}: LuxImageProps) {
  const path = typeof src === "string" ? src : undefined;
  const blur = blurDataURL ?? (path ? blurFor(path) : undefined);
  const useBlur = lqip && Boolean(blur) && placeholder !== "empty";

  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      decoding={decoding}
      placeholder={useBlur ? "blur" : placeholder}
      blurDataURL={useBlur ? blur : blurDataURL}
      {...rest}
    />
  );
}
