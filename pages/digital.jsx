import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import redElfProfile from '../public/img/digital/3d_elf_red_profile.webp'
import roseElfEarCropped from '../public/img/digital/3d_elf_rose_ear_cropped.webp'
import purpleElfDetail from '../public/img/digital/3d_elf_purple_detail.webp'
import blueBagFront from '../public/img/digital/3d_blue_bag_front.webp'

const images = [
  { src: redElfProfile, alt: '3d avatar laying', title: 'Etherea Part I', href: '/etherea-part-one' },
  { src: roseElfEarCropped, alt: '3d avatar earings', title: 'Etherea Part II', href: '/etherea-part-two' },
  { src: purpleElfDetail, alt: '3d avatar boots', title: 'Etherea Part III', href: '/etherea-part-three' },
  { src: blueBagFront, alt: '3d alien bag with green background', title: 'Alien Accessories', href: '/alien-accessories' },
];

export default function Digital() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb activeItem="Digital"/>
      <Carousel images={images} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  )
}
