/* eslint-disable @next/next/no-img-element */

import { preload } from "react-dom";
import { forwardRef, type ImgHTMLAttributes } from "react";

import type { ImageViewModel } from "@/lib/content/types";
import {
  getImageCandidates,
  getImageDisplayDimensions,
  getImageSrc,
} from "@/lib/sanity/image";

interface CmsImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    | "alt"
    | "height"
    | "loading"
    | "src"
    | "srcSet"
    | "width"
  > {
  image: ImageViewModel;
  alt: string;
  sizes: string;
  priority?: boolean;
}

const CmsImage = forwardRef<HTMLImageElement, CmsImageProps>(
  function CmsImage(
    { image, alt, sizes, priority = false, style, ...props },
    ref,
  ) {
    const candidates = getImageCandidates(image);
    const src = getImageSrc(image, candidates);
    const dimensions = getImageDisplayDimensions(image);
    const srcSet = candidates.length
      ? candidates.map(({ url, width }) => `${url} ${width}w`).join(", ")
      : undefined;

    if (priority && srcSet) {
      preload(src, {
        as: "image",
        fetchPriority: "high",
        imageSizes: sizes,
        imageSrcSet: srcSet,
      });
    }

    return (
      <img
        {...props}
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={candidates.length ? sizes : undefined}
        width={dimensions.width}
        height={dimensions.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{
          ...(image.blurDataURL
            ? {
                backgroundImage: `url(${JSON.stringify(image.blurDataURL)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}),
          ...style,
        }}
      />
    );
  },
);

export default CmsImage;
