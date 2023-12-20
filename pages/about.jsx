import Link from 'next/link'

import Breadcrumb from "@/components/Breadcrumb";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import "../public/stylesheets/about.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

export default function About() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb textColor="text-[#4A2E69]" activeItem="About"/>
      <div className="ml-14 mt-14 helvetica text-[#4A2E69]">
        <h1 className="text-3xl">Say Hello</h1>
        <ul className="my-6">
          <li><Link href="mailto:info@mailgo.dev" className="text-2xl underline">Email</Link></li>
          <li className="my-2"><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="text-2xl underline">Instagram</a></li>
          <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="text-2xl underline">LinkedIn</a></li>
        </ul>
        <div className="w-7/12 text-2xl my-6">Ronja Stucken, a Berlin-based 3D Artist, fashion designer and creative mind, showcases her works under the synoym Studio.Stuckn.</div>
        <div className="w-7/12 text-2xl">Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.</div>
      </div>
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
