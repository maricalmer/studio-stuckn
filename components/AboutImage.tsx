"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImageViewModel } from "@/lib/content/types";

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
    <Image
      ref={imageRef}
      src={image}
      alt={alt}
      className="about-image object-cover h-[180px] md:h-[40vh] min-h-[100px] w-auto sticky top-[8rem] mt-12"
      sizes="33vw"
      quality={100}
      priority={true}
      style={{
        width: "auto",
        height: `${handleImageSizing(scrollValue, baseImgHeight)}px`,
      }}
    />
  );
}
