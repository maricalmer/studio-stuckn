import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import lucyPic from '../public/img/lucy_main.webp'
import marionPic from '../public/img/marion_main.webp'
import marionBootsPic from '../public/img/marion_boots_main.webp'
import alienBagPic from '../public/img/alien_bag.webp'

const images = [
  { src: lucyPic, alt: '3d avatar laying', title: 'Etherea Part I', href: '/etherea-part-one' },
  { src: marionPic, alt: '3d avatar earings', title: 'Etherea Part II', href: '/etherea-part-two' },
  { src: marionBootsPic, alt: '3d avatar boots', title: 'Etherea Part III', href: '/etherea-part-three' },
  { src: alienBagPic, alt: '3d alien bag with green background', title: 'Alien Accessories', href: '/alien-accessories' },
];

export default function Digital() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb />
      <Carousel images={images} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
