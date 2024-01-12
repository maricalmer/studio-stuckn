"use client";
import { Canvas } from "@react-three/fiber";

import Navigation from "@/components/Navigation";
import BagModel from "@/components/BagModel";
import Brand from "@/components/Brand";
import ScrollArrow from "@/components/ScrollArrow";
import StaticBrand from "@/components/StaticBrand";

import { skewRevealText } from "@/utils/gsap";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export default function Home() {
  const [ scrollValue, setScrollValue ] = useState(0);
  const [ baseFontSize, setBaseFontSize ] = useState(null);
  const { scrollYProgress, scrollY } = useScroll();
  const [ isBigScreen, setIsBigScreen ] = useState(false);
  const textRef = useRef();
  const textRefTwo = useRef();
  const textRefThree = useRef();
  const textRefFour = useRef();

  useLayoutEffect(() => {
    skewRevealText(textRef);
    skewRevealText(textRefTwo);
    skewRevealText(textRefThree);
    skewRevealText(textRefFour);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', function() {
      setScrollValue(window.scrollY);
    })
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      const title = document.querySelector(".brand-text");
      if (title) {
        const fontSize = parseInt(window.getComputedStyle(title).fontSize);
        setBaseFontSize(fontSize);
      }
    };

    const handleMediaChange = (event, fontSizeValue) => {
      if (event.matches) {
        setBaseFontSize(fontSizeValue);
      }
    };

    window.addEventListener('onload', handleLoad());

    const smallScreenMediaQuery = window.matchMedia('(max-width:767px)');
    smallScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 80));

    const mediumScreenMediaQuery = window.matchMedia('(min-width:768px) and (max-width:1023px)');
    mediumScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 100));

    const largeScreenMediaQuery = window.matchMedia('(min-width:1024px) and (max-width:1279px)');
    largeScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 130));

    const extraLargeScreenMediaQuery = window.matchMedia('(min-width:1280px)');
    extraLargeScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 160));

    return () => {
      window.removeEventListener('load', handleLoad);
      smallScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 80));
      mediumScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 100));
      largeScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 130));
      extraLargeScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 160));
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (e) => {
      setIsBigScreen(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsBigScreen(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [])

  const sizeBag = (property) => {
    // if (property == "position") {return isBigScreen ? [0, -2, 0] : [-3, -2, -0.2]};
    if (property == "position") {return isBigScreen ? [0, -2, 0] : [-2, -2.5, -0.2]};
  };


  return (
    <>
      {
        isBigScreen ? <Navigation pictures={true}/> : <Navigation pictures={false}/>
      }
      <main className="relative">
        <canvas id="homepage-background" className="absolute block w-full h-full top-0 right-0 left-0 bottom-0"/>
        <div className="min-h-full h-full w-full fixed top-0 left-0 lg:ml-64 bg-hero-gradient bg-right bg-no-repeat bg-cover bg-blend-normal z-0">
          <Canvas>
            <BagModel
              scale={0.1}
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
          {
            isBigScreen && <ScrollArrow
            scrollY={scrollY}
            scrollYProgress={scrollYProgress}
          />
          }
          {
            isBigScreen ? <Brand
            scrollValue={scrollValue}
            baseFontSize={baseFontSize}
          /> : <StaticBrand opacity={"opacity-1"} transform={"translate-x-[-70px] translate-y-[80vh] rotate-[-90deg]"} color={"mix-blend-difference"}/>
          }
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
