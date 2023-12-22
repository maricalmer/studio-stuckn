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
  useEffect(() => {
    window.addEventListener('scroll', function() {
      setScrollValue(window.scrollY);
    })
  }, [])

  return (
    <PageContainer backgroundColor={"bg-[#EFEBE6]"}>
      <Breadcrumb textColor="text-[#4A2E69]" activeItem="About"/>
      <div className="ml-14 mt-40 helvetica text-[#4A2E69] relative h-[200vh]">
        <h1 className="text-3xl">Say Hello</h1>
        <ul className="my-6">
          <li><Link href="mailto:info@mailgo.dev" className="text-2xl underline">Email</Link></li>
          <li className="my-2"><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="text-2xl underline">Instagram</a></li>
          <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="text-2xl underline">LinkedIn</a></li>
        </ul>
        <div className="w-7/12 text-2xl my-6">Ronja Stucken, a Berlin-based 3D Artist, fashion designer and creative mind, showcases her works under the synoym Studio.Stuckn.</div>
        <div className="w-7/12 text-2xl mb-4">Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.</div>
        <AboutImage scrollValue={scrollValue} />
      </div>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  )
}
