'use client';
import alienPic1 from '../public/img/alien_carousel_1.webp'
import alienPic2 from '../public/img/alien_carousel_2.webp'
import alienPic3 from '../public/img/alien_carousel_3.webp'
import alienPic4 from '../public/img/alien_carousel_4.webp'
import alienPic5 from '../public/img/alien_carousel_5.webp'
import alienPic6 from '../public/img/alien_carousel_6.webp'
import alienPic7 from '../public/img/alien_carousel_7.webp'
import alienPic8 from '../public/img/alien_carousel_8.webp'
import alienPic9 from '../public/img/alien_carousel_9.webp'
import alienPic10 from '../public/img/alien_carousel_10.webp'
import alienPic11 from '../public/img/alien_carousel_11.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

const images = [
  { src: alienPic1, alt: '3d boots' },
  { src: alienPic2, alt: '3d black bag white background' },
  { src: alienPic3, alt: '3d white bag white background' },
  { src: alienPic4, alt: '3d silver boots' },
  { src: alienPic5, alt: '3d black leather boots close up' },
  { src: alienPic6, alt: '3d black bag side' },
  { src: alienPic7, alt: '3d white bag orange background' },
  { src: alienPic8, alt: '3d black boots front' },
  { src: alienPic9, alt: '3d black bag open' },
  { src: alienPic10, alt: '3d black shoes top' },
  { src: alienPic11, alt: '3d black shoes orange sole' }
];

const descriptionText = "In this collection of 3D fashion sculptures, organic curves are combined with geometric precision, redefining the conventional perception of shapes. The deliberate choice of materials with vibrant color tones paired with deep black and shiny surfaces gives the digital sculptures a special fascination and brings them to life. Let yourself be inspired to rethink reality and appreciate the extraordinary.";
const creditsText = "Using ZBrush, Blender, CLO3D, Substance Painter, and Photoshop.";
const description = { title: "Alien Accessories", subtitle: descriptionText, text: creditsText, credits: "" };

function AlienAccessories() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <Breadcrumb />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  );
}

export default AlienAccessories;
