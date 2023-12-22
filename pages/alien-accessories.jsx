'use client';

import blackBootsProfile from '../public/img/digital/alien-accessories/3d_black_boots_profile.webp'
import greenBagProfile from '../public/img/digital/alien-accessories/3d_green_bag_profile.webp'
import whiteBagDetail from '../public/img/digital/alien-accessories/3d_white_bag_detail.webp'
import silverBootsTop from '../public/img/digital/alien-accessories/3d_silver_boots_top.webp'
import silverBootsDetail from '../public/img/digital/alien-accessories/3d_silver_boots_detail.webp'
import greenBagTop from '../public/img/digital/alien-accessories/3d_green_bag_top.webp'
import blueBagFront from '../public/img/digital/3d_blue_bag_front.webp'
import blackBootsBack from '../public/img/digital/alien-accessories/3d_black_boots_back.webp'
import blueBagProfile from '../public/img/digital/alien-accessories/3d_blue_bag_profile.webp'
import orangeSneakerSide from '../public/img/digital/alien-accessories/3d_orange_sneaker_side.webp'
import whiteBagFront from '../public/img/digital/alien-accessories/3d_white_bag_front.webp'
import silverBootsFront from '../public/img/digital/alien-accessories/3d_silver_boots_front.webp'
import greenBagSide from '../public/img/digital/alien-accessories/3d_green_bag_side.webp'
import orangeSneakerTop from '../public/img/digital/alien-accessories/3d_orange_sneaker_top.webp'
import orangeSneakerDetail from '../public/img/digital/alien-accessories/3d_orange_sneaker_detail.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

const images = [
  { src: blackBootsProfile, alt: '3d black boots profile' },
  { src: greenBagProfile, alt: '3d black bag blue background' },
  { src: whiteBagDetail, alt: '3d white bag white background' },
  { src: silverBootsTop, alt: '3d silver boots' },
  { src: silverBootsDetail, alt: '3d silver leather boots close up' },
  { src: greenBagTop, alt: '3d black bag top' },
  { src: blueBagFront, alt: '3d black bag top green background' },
  { src: blackBootsBack, alt: '3d black boots back' },
  { src: blueBagProfile, alt: '3d black bag profile' },
  { src: orangeSneakerSide, alt: '3d black shoes side' },
  { src: whiteBagFront, alt: '3d white bag orange background' },
  { src: silverBootsFront, alt: '3d silver boots front' },
  { src: greenBagSide, alt: '3d green bag open' },
  { src: orangeSneakerTop, alt: '3d black shoes orange top' },
  { src: orangeSneakerDetail, alt: '3d black shoes orange sole' }
];

const descriptionText = "In this collection of 3D fashion sculptures, organic curves are combined with geometric precision, redefining the conventional perception of shapes. The deliberate choice of materials with vibrant color tones paired with deep black and shiny surfaces gives the digital sculptures a special fascination and brings them to life. Let yourself be inspired to rethink reality and appreciate the extraordinary.";
const creditsText = "Using ZBrush, Blender, CLO3D, Substance Painter, and Photoshop.";
const description = { title: "Alien Accessories", subtitle: descriptionText, text: creditsText, credits: "" };

function AlienAccessories() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable} absolute top-0 h-full`}>
      <Breadcrumb textColor="text-black" />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  );
}

export default AlienAccessories;
