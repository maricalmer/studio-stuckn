"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageViewModel } from "@/lib/content/types";
import CmsImage from "@/components/CmsImage";

const handleImageSizing = (
  scrollValue: number,
  baseImgHeight: number | null,
) => {
  if (baseImgHeight) {
    const factor = 2;
    if (baseImgHeight + scrollValue / factor < baseImgHeight * 1.1) {
      return baseImgHeight * 1.1;
    } else if (baseImgHeight + scrollValue / factor > baseImgHeight * 2) {
      return baseImgHeight * 2;
    } else {
      return baseImgHeight + scrollValue / factor;
    }
  }
};

export default function AboutImage({
  image,
  alt,
}: {
  image: ImageViewModel;
  alt: string;
}) {
  const [scrollValue, setScrollValue] = useState(0);
  const [baseImgHeight, setBaseImgHeight] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollValue(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const imageHeight = parseInt(window.getComputedStyle(image).height);
    setBaseImgHeight(imageHeight);
  }, []);

  return (
    <CmsImage
      ref={imageRef}
      image={image}
      alt={alt}
      className="about-image object-cover h-[180px] md:h-[40vh] min-h-[100px] w-auto sticky top-[8rem] mt-12"
      sizes="(max-width: 767px) 180px, 33vw"
      priority={true}
      style={{
        width: "auto",
        height: `${handleImageSizing(scrollValue, baseImgHeight)}px`,
      }}
    />
  );
}
