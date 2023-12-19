import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import fluxPic from '../public/img/flux_main.webp'
import flanellePic from '../public/img/flanelle_main.webp'
import marieClairePic from '../public/img/marie-claire_main.webp'
import seefashionPic from '../public/img/seefashion_main.webp'
import rebootPic from '../public/img/reboot_main.webp'
import minimalPic from '../public/img/minimal_main.webp'
import pagePic from '../public/img/page_main.webp'
import escapismPic from '../public/img/escapism_main.webp'

const images = [
  { src: fluxPic, alt: 'man seating at the window', title: 'In Constant Flux', href: '/in-constant-flux' },
  { src: flanellePic, alt: 'woman wearing hat covering face', title: 'Flanelle Magazine', href: '/flanelle' },
  { src: marieClairePic, alt: 'woman standing in a grass field', title: 'MarieClaire Mag', href: '/marie-claire' },
  { src: seefashionPic, alt: 'body wearing suit', title: 'Seefashion', href: '/seefashion' },
  { src: rebootPic, alt: 'woman face', title: 'Reboot', href: '/reboot' },
  { src: minimalPic, alt: 'white coat', title: 'Excessive Minimal', href: '/excessive-minimal' },
  { src: pagePic, alt: 'mirror reflaction woman face', title: 'Page Magazine', href: '/page' },
  { src: escapismPic, alt: 'pants on legs', title: 'Escapism', href: '/escapism' }
];

export default function Physical() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb activeItem="Physical"/>
      <Carousel images={images} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
