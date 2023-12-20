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
      <div className="pl-14">
        <h1 className="text-2xl">Say Hello</h1>
        <ul>
          <li><Link href="mailto:info@mailgo.dev" className="text-xl">Email</Link></li>
          <li><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="text-xl">Instagram</a></li>
          <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="text-xl">LinkedIn</a></li>
        </ul>
      </div>
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
