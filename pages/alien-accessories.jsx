import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import blackBootsProfileImg from '../public/img/digital/alien-accessories/3d_black_boots_profile.webp';
import greenBagProfileImg from '../public/img/digital/alien-accessories/3d_green_bag_profile.webp';
import whiteBagDetailImg from '../public/img/digital/alien-accessories/3d_white_bag_detail.webp';
import silverBootsTopImg from '../public/img/digital/alien-accessories/3d_silver_boots_top.webp';
import silverBootsDetailImg from '../public/img/digital/alien-accessories/3d_silver_boots_detail.webp';
import greenBagTopImg from '../public/img/digital/alien-accessories/3d_green_bag_top.webp';
import blueBagFrontImg from '../public/img/digital/3d_blue_bag_front.webp';
import blackBootsBackImg from '../public/img/digital/alien-accessories/3d_black_boots_back.webp';
import blueBagProfileImg from '../public/img/digital/alien-accessories/3d_blue_bag_profile.webp';
import orangeSneakerSideImg from '../public/img/digital/alien-accessories/3d_orange_sneaker_side.webp';
import whiteBagFrontImg from '../public/img/digital/alien-accessories/3d_white_bag_front.webp';
import silverBootsFrontImg from '../public/img/digital/alien-accessories/3d_silver_boots_front.webp';
import greenBagSideImg from '../public/img/digital/alien-accessories/3d_green_bag_side.webp';
import orangeSneakerTopImg from '../public/img/digital/alien-accessories/3d_orange_sneaker_top.webp';
import orangeSneakerDetailImg from '../public/img/digital/alien-accessories/3d_orange_sneaker_detail.webp';
import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: blackBootsProfileImg, alt: '3d black boots profile' },
  { type: "image", src: greenBagProfileImg, alt: '3d black bag blue background' },
  { type: "image", src: whiteBagDetailImg, alt: '3d white bag white background' },
  { type: "image", src: silverBootsTopImg, alt: '3d silver boots' },
  { type: "image", src: silverBootsDetailImg, alt: '3d silver leather boots close up' },
  { type: "image", src: greenBagTopImg, alt: '3d black bag top' },
  { type: "image", src: blueBagFrontImg, alt: '3d black bag top green background' },
  { type: "image", src: blackBootsBackImg, alt: '3d black boots back' },
  { type: "image", src: blueBagProfileImg, alt: '3d black bag profile' },
  { type: "image", src: orangeSneakerSideImg, alt: '3d black shoes side' },
  { type: "image", src: whiteBagFrontImg, alt: '3d white bag orange background' },
  { type: "image", src: silverBootsFrontImg, alt: '3d silver boots front' },
  { type: "image", src: greenBagSideImg, alt: '3d green bag open' },
  { type: "image", src: orangeSneakerTopImg, alt: '3d black shoes orange top' },
  { type: "image", src: orangeSneakerDetailImg, alt: '3d black shoes orange sole' }
];

const title = "Alien Accessories";
const details = "In this collection of 3D fashion sculptures, organic curves are combined with geometric precision, redefining the conventional perception of shapes. The deliberate choice of materials with vibrant color tones paired with deep black and shiny surfaces gives the digital sculptures a special fascination and brings them to life. Let yourself be inspired to rethink reality and appreciate the extraordinary.";
const softwares = "Using ZBrush, Blender, CLO3D, Substance Painter, and Photoshop.";
const previousProject = "etherea-part-three";
const description = { title: title, details: details, softwares: softwares, previousProject: previousProject };

export default function AlienAccessories() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
};
