import Link from 'next/link'

import AboutImage from "@/components/AboutImage";
import Breadcrumb from "@/components/Breadcrumb";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";
import "../public/stylesheets/about.css";
import { useState, useEffect } from "react";

export default function About() {
  const [ scrollValue, setScrollValue ] = useState(0);
  const [ baseImgHeight, setBaseImgHeight ] = useState(null);

  useEffect(() => {
    window.addEventListener('scroll', function() {
      setScrollValue(window.scrollY);
    })
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      const img = document.querySelector(".about-image");
      const imgHeight = parseInt(window.getComputedStyle(img).height);
      setBaseImgHeight(imgHeight);
    };

    // const handleMediaChange = (event, imgHeightValue) => {
    //   if (event.matches) {
    //     setBaseImgHeight(imgHeightValue);
    //   }
    // };

    window.addEventListener('onload', handleLoad());

    // const smallScreenMediaQuery = window.matchMedia('(max-width:767px)');
    // smallScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 100));

    // const mediumScreenMediaQuery = window.matchMedia('(min-width:768px) and (max-width:1023px)');
    // mediumScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 200));

    // const largeScreenMediaQuery = window.matchMedia('(min-width:1024px) and (max-width:1279px)');
    // largeScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 300));

    // const extraLargeScreenMediaQuery = window.matchMedia('(min-width:1280px)');
    // extraLargeScreenMediaQuery.addEventListener('change', (event) => handleMediaChange(event, 400));

    // return () => {
    //   window.removeEventListener('load', handleLoad);
    //   smallScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 100));
    //   mediumScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 200));
    //   largeScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 300));
    //   extraLargeScreenMediaQuery.removeEventListener('change', (event) => handleMediaChange(event, 400));
    // };
  }, []);

  return (
    <>
      <PageContainer>
        <Breadcrumb textColor="text-[#4A2E69]" bgColor="bg-[#EFEBE6]" activeItem="About"/>
        <div className="ml-14 mt-24 helvetica text-[#4A2E69] relative h-[200vh]">
          <div className="flex flex-col h-[calc(100vh-6rem)]">
            <div className="grow">
              <h1 className="text-3xl">Say Hello</h1>
              <ul className="my-6">
                <li><Link href="mailto:info@mailgo.dev" className="text-xl 2xl:text-2xl underline">Email</Link></li>
                <li className="my-2"><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="text-xl 2xl:text-2xl underline">Instagram</a></li>
                <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="text-xl 2xl:text-2xl underline">LinkedIn</a></li>
              </ul>
              <div className="w-7/12 min-w-[600px] text-xl 2xl:text-2xl my-6">Ronja Stucken, a Berlin-based 3D Artist, fashion designer and creative mind, showcases her works under the synonym Studio.Stuckn.</div>
              <div className="w-7/12 min-w-[600px] text-xl 2xl:text-2xl mb-4">Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.</div>
            </div>
            <div className="shrink-0 sticky top-[4000px]">
              <AboutImage scrollValue={scrollValue} baseImgHeight={baseImgHeight} />
            </div>
          </div>
        </div>
        <StaticBrand opacity={"opacity-1"} />
      </PageContainer>
      <style jsx global>{`
        body {
          background-color: #EFEBE6;
        }
      `}</style>
    </>
  )
}
