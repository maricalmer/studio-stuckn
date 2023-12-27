"use client";
import { Canvas } from "@react-three/fiber";

import BagModel from "@/components/BagModel";
import Brand from "@/components/Brand";
import ScrollArrow from "@/components/ScrollArrow";

import { skewRevealText } from "@/utils/gsap";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export default function Home() {
  const [ scrollValue, setScrollValue ] = useState(0);
  const [ baseFontSize, setBaseFontSize ] = useState(null);
  const { scrollYProgress, scrollY } = useScroll();
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
      const fontSize = parseInt(window.getComputedStyle(title).fontSize);
      setBaseFontSize(fontSize);
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


  return (
    <main className="relative">
      <canvas id="granim-canvas" className="absolute block w-full h-full top-0 right-0 left-0 bottom-0"/>
      <div className="h-full w-full fixed top-0 left-0 lg:ml-64 bg-hero-gradient bg-right bg-no-repeat bg-cover bg-blend-normal z-0">
        <Canvas>
          <BagModel
            scale={0.1}
            position={[0, -2, 0]}
            rotation={[0, 5, 0]}
            scrollY={scrollY}
            scrollYProgress={scrollYProgress}
          />
        </Canvas>
      </div>
      <div className="relative z-2 text-[#a1bf79]">
        <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mix-blend-difference fixed right-16 top-8">
          <rect width="60" height="28" fill="#A1BF79"/>
        </svg>
        <svg width="60" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mix-blend-difference fixed right-16 top-16">
          <rect width="60" height="28" fill="#A1BF79"/>
        </svg>
        <ScrollArrow
          scrollValue={scrollValue}
        />
        <Brand
          scrollValue={scrollValue}
          baseFontSize={baseFontSize}
        />
        <div className="absolute top-[100vh]">marker</div>
        <p className="text-paragraph w-5/12 text-2xl helvetica mb-10 mx-14 mix-blend-difference">
          The digital and physical worlds are no longer separate entities; they intertwine and dance in a seamless choreography of existence.
        </p>
        <p className="text-paragraph w-5/12 text-2xl helvetica mt-48 mb-10 mx-14 mix-blend-difference">
          Reality is no longer limited to what we touch and see, but forms a new landscape in which the tangible and the virtual merge into one another.
        </p>
        <div className="h-[100vh] flex items-center">
          <div className="overflow-hidden">
            <h2
              className="text-5xl font-bold font-headline opacity-0"
            >
              H2 title
            </h2>
            <p
              className="text-paragraph max-w-[307px] opacity-0"
              ref={textRefThree}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
          </div>
        </div>
        <div className="h-[100vh] flex items-center">
          <div className="overflow-hidden">
            <h2
              className="text-5xl font-bold font-headline opacity-0"
            >
              H2 title
            </h2>
            <p
              className="text-paragraph max-w-[307px] opacity-0"
              ref={textRefFour}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
          </div>
        </div>
        <div className="h-[100vh] flex items-center"></div>
        <div className="mb-7 text-sm text-right mr-10 mix-blend-difference font-bold">© 2024 All Rights Reserved</div>
      </div>
    </main>
  );
}
