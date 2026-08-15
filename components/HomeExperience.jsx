"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

import BagModel from "@/components/BagModel";
import Brand from "@/components/Brand";
import Navigation from "@/components/Navigation";
import ScrollArrow from "@/components/ScrollArrow";
import StaticBrand from "@/components/StaticBrand";

export default function HomeExperience({ children }) {
  const [, setScrollValue] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollValue(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQuery = (event) => setIsBigScreen(event.matches);

    mediaQuery.addEventListener("change", handleMediaQuery);
    setIsBigScreen(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  const sizeBag = (parameter) => {
    if (parameter === "scale") return isBigScreen ? 0.1 : 0.06;
    if (parameter === "position") return isBigScreen ? [0, -2, 0] : [0, -1, 0];
  };

  return (
    <>
      <Navigation isBigScreen={isBigScreen} />
      <main className="relative">
        <canvas
          id="homepage-background"
          className="absolute block w-full h-full top-0 right-0 left-0 bottom-0"
        />
        <div className="min-h-full h-full w-full fixed top-0 left-0 lg:ml-64 bg-right bg-no-repeat bg-cover bg-blend-normal z-0">
          <Canvas>
            <BagModel
              scale={sizeBag("scale")}
              position={sizeBag("position")}
              rotation={[0, 5, 0]}
              scrollYProgress={scrollYProgress.current}
            />
          </Canvas>
        </div>
        <div className="relative text-[#a1bf79]">
          <svg
            width="60"
            height="28"
            viewBox="0 0 60 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mix-blend-difference fixed right-4 md:right-16 top-4 md:top-8"
          >
            <rect width="60" height="28" fill="#A1BF79" />
          </svg>
          <svg
            width="60"
            height="28"
            viewBox="0 0 60 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mix-blend-difference fixed right-4 md:right-16 top-12 md:top-16"
          >
            <rect width="60" height="28" fill="#A1BF79" />
          </svg>
          <ScrollArrow scrollY={scrollY.current} scrollYProgress={scrollYProgress.current} />
          <Brand scrollY={scrollY.current} />
          <StaticBrand extraStyling="md:hidden opacity-1 mix-blend-difference border-[#a1bf79] translate-x-[-70px] translate-y-[70px] rotate-[-90deg]" />
          {children}
        </div>
      </main>
    </>
  );
}
