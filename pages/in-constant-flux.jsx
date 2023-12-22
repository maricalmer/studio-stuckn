'use client';
import fluxPic1 from '../public/img/flux_carousel_1.webp'
import fluxPic2 from '../public/img/flux_carousel_2.webp'
import fluxPic3 from '../public/img/flux_carousel_3.webp'
import fluxPic4 from '../public/img/flux_carousel_4.webp'
import fluxPic5 from '../public/img/flux_carousel_5.webp'
import fluxPic6 from '../public/img/flux_carousel_6.webp'
import fluxPic7 from '../public/img/flux_carousel_7.webp'
import fluxPic8 from '../public/img/flux_carousel_8.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";

import "../public/stylesheets/projects.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

const images = [
  { src: fluxPic1, alt: 'video on window' },
  { src: fluxPic2, alt: 'man in a couch' },
  { src: fluxPic3, alt: 'man seating at the window' },
  { src: fluxPic4, alt: 'man standing at the window' },
  { src: fluxPic5, alt: 'man looking up' },
  { src: fluxPic6, alt: 'man seating on a armchair' },
  { src: fluxPic7, alt: 'man seating on a chair' },
  { src: fluxPic8, alt: 'man seating on armchair side' }
];

const descriptionText = "A short fashion film project depicting a gender non- conforming odyssey in which the collection blurs clothing norms and gendered dress in the age of pandemic isolation.";
const creditsText = "Fashion & Styling Studio.Stuckn Director Vigdís Erla Guttormsdóttir Film & Edit Vigdís Erla Guttormsdóttir Analog Photo Ronja Stucken & Vigdís Erla Guttormsdóttir Idea Ronja Stucken Music Kerr Wilson Model Julian Eide";
const description = { title: "In Constant Flux", subtitle: descriptionText, text: creditsText, credits: "" };

function InConstantFlux() {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable} absolute top-0 h-full`}>
      <Breadcrumb />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </div>
  );
}

export default InConstantFlux;
