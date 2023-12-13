'use client';
import lucyPic1 from '../public/img/lucy_carousel_1.webp'
import lucyPic2 from '../public/img/lucy_carousel_2.webp'
import lucyPic3 from '../public/img/lucy_carousel_3.webp'
import lucyPic4 from '../public/img/lucy_carousel_4.webp'
import lucyPic5 from '../public/img/lucy_carousel_5.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

const images = [
  { src: lucyPic1, alt: '3d avatar lucy front face' },
  { src: lucyPic2, alt: '3d avatar lucy side distance' },
  { src: lucyPic3, alt: '3d avatar lucy face side' },
  { src: lucyPic4, alt: '3d tree' },
  { src: lucyPic5, alt: '3d avatar lucy front distance' }
];

const descriptionText = "Step into a realm where elven creatures awaken in the embrace of a misty atmosphere. Every element, from the modeled facial features and tailored knitwear collection to the unique jewelry and accessory sculptures, is a product that creates a world that unfolds from the depths of the imagination.";
const creditsText = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const description = { title: "Etherea", subtitle: 'Part 1', text: descriptionText, credits: creditsText };

function EthereaPartOne() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  );
}

export default EthereaPartOne;
