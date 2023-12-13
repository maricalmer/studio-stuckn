'use client';
import marionPic1 from '../public/img/marion_purple_carousel_1.webp'
import marionPic2 from '../public/img/marion_purple_carousel_2.webp'
import marionPic3 from '../public/img/marion_purple_carousel_3.webp'
import marionPic4 from '../public/img/marion_purple_carousel_4.webp'
import marionPic5 from '../public/img/marion_purple_carousel_5.webp'
import marionPic6 from '../public/img/marion_purple_carousel_6.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

const images = [
  { src: marionPic1, alt: '3d boots' },
  { src: marionPic2, alt: '3d avatar marion front face' },
  { src: marionPic3, alt: '3d avatar marion bottom back' },
  { src: marionPic4, alt: '3d avatar marion body side' },
  { src: marionPic5, alt: '3d grass' },
  { src: marionPic6, alt: '3d avatar marion body front' }
];

const descriptionText = "Step into a realm where elven creatures awaken in the embrace of a misty atmosphere. Every element, from the modeled facial features and tailored knitwear collection to the unique jewelry and accessory sculptures, is a product that creates a world that unfolds from the depths of the imagination.";
const creditsText = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const description = { title: "Etherea", subtitle: 'Part 3', text: descriptionText, credits: creditsText };

function EthereaPartThree() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  );
}

export default EthereaPartThree;
