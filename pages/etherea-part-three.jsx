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

const elements = [
  { type: "image", src: purpleElfDetail, alt: '3d boots' },
  { type: "image", src: purpleElfFace, alt: '3d avatar marion front face' },
  { type: "image", src: purpleElfBottom, alt: '3d avatar marion bottom back' },
  { type: "image", src: purpleElfProfile, alt: '3d avatar marion profile face' },
  { type: "image", src: purpleElfSide, alt: '3d avatar marion body side' },
  { type: "image", src: grass, alt: '3d grass' },
  { type: "image", src: purpleElfFullBody, alt: '3d avatar marion body front' },
];

const title = "Etherea";
const subtitle = {text: 'Part 3', cyrillic: false};
const details = "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.";
const softwares = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const previousProject = "etherea-part-two";
const nextProject = "alien-accessories";
const description = { title: title, subtitle: subtitle, details: details, softwares: softwares, previousProject: previousProject, nextProject: nextProject };

function EthereaPartThree() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling={"opacity-1 border-black"} />
    </PageContainer>
  );
}

export default EthereaPartThree;
