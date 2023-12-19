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
      <h1>Say Hello</h1>
      <Link href="mailto:info@mailgo.dev" className="">Email</Link>
      <Link href="www.instagram.com" className="">Instagram</Link>
      <Link href="www.linkedin.com" className="">LinkedIn</Link>
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
