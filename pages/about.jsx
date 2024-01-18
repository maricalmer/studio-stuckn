import { useState, useEffect } from "react";
import Link from 'next/link';
import AboutImage from "@/components/AboutImage";
import Breadcrumb from "@/components/Breadcrumb";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import "../public/stylesheets/projects.css";

function About() {
  const [ scrollValue, setScrollValue ] = useState(0);
  const [ baseImgHeight, setBaseImgHeight ] = useState(null);

  useEffect(() => {
    window.addEventListener('scroll', function() {
      setScrollValue(window.scrollY);
    })
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      const img = document.querySelector(".about-image");
      const imgHeight = parseInt(window.getComputedStyle(img).height);
      setBaseImgHeight(imgHeight);
    };
    window.addEventListener('onload', handleLoad());
  }, []);

  return (
    <>
      <PageContainer>
        <Breadcrumb textColor="text-[#4A2E69]" bgColor="bg-[#EFEBE6]" activeItem="About"/>
        <div className="mx-3 md:ml-14 mt-32 helvetica text-[#4A2E69] relative h-[150vh] md:h-[200vh]">
          <h1 className="text-2xl md:text-4xl 2xl:text-5xl min-[1950px]:text-6xl">Say Hello</h1>
          <ul className="my-6">
            <li><Link href="mailto:info@mailgo.dev" className="text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl underline">Email</Link></li>
            <li className="my-2"><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl underline">Instagram</a></li>
            <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl underline">LinkedIn</a></li>
          </ul>
          <div className="w-full md:w-9/12 md:min-w-[600px] text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl my-6">Ronja Stucken, a Berlin-based 3D Artist, fashion designer and creative mind, showcases her works under the synonym Studio.Stuckn.</div>
          <div className="w-full md:w-9/12 md:min-w-[600px] text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl mb-4">Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.</div>
          <AboutImage scrollValue={scrollValue} baseImgHeight={baseImgHeight} />
        </div>
        <StaticBrand extraStyling={"opacity-1 text-[#4A2E69] border-[#4A2E69] md:text-[unset] md:mix-blend-soft-light"}/>
      </PageContainer>
      <style jsx global>{`
        body {
          background-color: #EFEBE6;
        }
      `}</style>
    </>
  );
};

export default About;
