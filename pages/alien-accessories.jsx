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
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: blackBootsProfile, alt: '3d black boots profile' },
  { type: "image", src: greenBagProfile, alt: '3d black bag blue background' },
  { type: "image", src: whiteBagDetail, alt: '3d white bag white background' },
  { type: "image", src: silverBootsTop, alt: '3d silver boots' },
  { type: "image", src: silverBootsDetail, alt: '3d silver leather boots close up' },
  { type: "image", src: greenBagTop, alt: '3d black bag top' },
  { type: "image", src: blueBagFront, alt: '3d black bag top green background' },
  { type: "image", src: blackBootsBack, alt: '3d black boots back' },
  { type: "image", src: blueBagProfile, alt: '3d black bag profile' },
  { type: "image", src: orangeSneakerSide, alt: '3d black shoes side' },
  { type: "image", src: whiteBagFront, alt: '3d white bag orange background' },
  { type: "image", src: silverBootsFront, alt: '3d silver boots front' },
  { type: "image", src: greenBagSide, alt: '3d green bag open' },
  { type: "image", src: orangeSneakerTop, alt: '3d black shoes orange top' },
  { type: "image", src: orangeSneakerDetail, alt: '3d black shoes orange sole' }
];

const descriptionText = "In this collection of 3D fashion sculptures, organic curves are combined with geometric precision, redefining the conventional perception of shapes. The deliberate choice of materials with vibrant color tones paired with deep black and shiny surfaces gives the digital sculptures a special fascination and brings them to life. Let yourself be inspired to rethink reality and appreciate the extraordinary.";
const creditsText = "Using ZBrush, Blender, CLO3D, Substance Painter, and Photoshop.";
const description = { title: "Alien Accessories", subtitle: descriptionText, text: creditsText, previousProject: "etherea-part-three" };

function AlienAccessories() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel elements={elements} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default AlienAccessories;
