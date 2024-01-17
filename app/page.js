"use client";
import { Canvas } from "@react-three/fiber";

import Navigation from "@/components/Navigation";
import BagModel from "@/components/BagModel";
import Brand from "@/components/Brand";
import ScrollArrow from "@/components/ScrollArrow";
import StaticBrand from "@/components/StaticBrand";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export default function Home() {
  const [ scrollValue, setScrollValue ] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  const [ isBigScreen, setIsBigScreen ] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', function() {
      setScrollValue(window.scrollY);
    })
    return () => {
      window.removeEventListener('scroll', function() {
        setScrollValue(window.scrollY);
      })
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQuery = (e) => {
      setIsBigScreen(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQuery);
    setIsBigScreen(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQuery);
    };
  }, [isBigScreen])

  const sizeBag = (parameter) => {
    if (parameter === "scale") {
      return isBigScreen ? 0.1 : 0.06;
    }
    if (parameter === "position") {
      return isBigScreen ? [0, -2, 0] : [0, -1, 0];
    }
  };

  return (
    <>
      <Navigation isBigScreen={isBigScreen}/>
      <main className="relative">
        <canvas id="homepage-background" className="absolute block w-full h-full top-0 right-0 left-0 bottom-0"/>
        <div className="min-h-full h-full w-full fixed top-0 left-0 lg:ml-64 bg-right bg-no-repeat bg-cover bg-blend-normal z-0">
          <Canvas>
            <BagModel
              scale={sizeBag("scale")}
              position={sizeBag("position")}
              rotation={[0, 5, 0]}
              scrollY={scrollY}
              scrollYProgress={scrollYProgress}
            />
          </Canvas>
        </div>
        <div className="relative text-[#a1bf79]">
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mix-blend-difference fixed right-4 md:right-16 top-4 md:top-8">
            <rect width="60" height="28" fill="#A1BF79"/>
          </svg>
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mix-blend-difference fixed right-4 md:right-16 top-12 md:top-16">
            <rect width="60" height="28" fill="#A1BF79"/>
          </svg>
          <ScrollArrow
            scrollY={scrollY}
            scrollYProgress={scrollYProgress}
          />
          <Brand scrollY={scrollY}/>
          <StaticBrand extraStyling={"md:hidden opacity-1 mix-blend-difference border-[#a1bf79] translate-x-[-70px] translate-y-[70px] rotate-[-90deg]"}/>
          <p className="text-paragraph w-8/12 md:w-5/12 text-[2rem] helvetica pt-96 md:pt-0 mb-10 mx-14 mix-blend-difference">
            The boundaries of reality are no longer limited to the tangible and the visible; instead, the tangible and the virtual merge seamlessly, creating an entirely new landscape.
          </p>
          <p className="text-paragraph w-8/12 md:w-5/12 text-[2rem] helvetica mt-28 mb-10 mx-14 mix-blend-difference">
            The conventional boundaries of traditional design concepts are being challenged in the ever-expanding digital fashion world.
          </p>
          <p className="text-paragraph w-8/12 md:w-5/12 text-[2rem] helvetica mt-28 mb-10 mx-14 mix-blend-difference">
            Studio.Stuckn embraces the limitless possibilities of digital design and enters an inspiring cosmos where creativity is defined by passion, technology and curiosity.
          </p>
          <div className="h-[100vh] flex items-center align-baseline"></div>
          <div className="text-right md:flex align-baseline mx-2 md:mx-10 pb-3 md:pb-9 relative z-10">
            <div className="text-sm text-right md:mr-1 mix-blend-difference font-bold">Website designed by Ronja Stucken</div>
            <div className="flex justify-end">
              <div className="text-sm text-right mr-1 mix-blend-difference font-bold">& built by</div>
              <a href="https://www.maricalmer.com" target="_blank" className="text-sm text-right mix-blend-difference font-bold underline cursor-pointer">maricalmer</a>
            </div>
            <div className="text-sm text-right mix-blend-difference font-bold grow">© 2024 All Rights Reserved</div>
          </div>
        </div>
      </main>
    </>
  );
}
