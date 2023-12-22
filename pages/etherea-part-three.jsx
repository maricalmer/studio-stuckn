'use client';
import purpleElfDetail from '../public/img/digital/3d_elf_purple_detail.webp'
import purpleElfFace from '../public/img/digital/etherea-part-three/3d_elf_purple_face.webp'
import purpleElfBottom from '../public/img/digital/etherea-part-three/3d_elf_purple_bottom.webp'
import purpleElfProfile from '../public/img/digital/etherea-part-three/3d_elf_purple_profile.webp'
import purpleElfSide from '../public/img/digital/etherea-part-three/3d_elf_purple_side.webp'
import grass from '../public/img/digital/etherea-part-three/3d_elf_purple_grass_detail.webp'
import purpleElfFullBody from '../public/img/digital/etherea-part-three/3d_elf_purple_full_body.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: purpleElfDetail, alt: '3d boots' },
  { src: purpleElfFace, alt: '3d avatar marion front face' },
  { src: purpleElfBottom, alt: '3d avatar marion bottom back' },
  { src: purpleElfProfile, alt: '3d avatar marion profile face' },
  { src: purpleElfSide, alt: '3d avatar marion body side' },
  { src: grass, alt: '3d grass' },
  { src: purpleElfFullBody, alt: '3d avatar marion body front' },
];

const descriptionText = "Step into a realm where elven creatures awaken in the embrace of a misty atmosphere. Every element, from the modeled facial features and tailored knitwear collection to the unique jewelry and accessory sculptures, is a product that creates a world that unfolds from the depths of the imagination.";
const creditsText = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const description = { title: "Etherea", subtitle: 'Part 3', text: descriptionText, credits: creditsText };

function EthereaPartThree() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default EthereaPartThree;
