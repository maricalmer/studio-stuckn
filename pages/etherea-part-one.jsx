'use client';
import redElfFrontZoom from '../public/img/digital/etherea-part-one/3d_elf_red_front_zoom.webp'
import redElfDress from '../public/img/digital/etherea-part-one/3d_elf_red_dress_detail.webp'
import redElfProfile from '../public/img/digital/3d_elf_red_profile.webp'
import redElfFace from '../public/img/digital/etherea-part-one/3d_elf_red_face_zoom.webp'
import tree from '../public/img/digital/etherea-part-one/3d_elf_red_tree.webp'
import redElfFront from '../public/img/digital/etherea-part-one/3d_elf_red_front.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: redElfFrontZoom, alt: '3d avatar lucy front face' },
  { src: redElfDress, alt: '3d avatar lucy side distance' },
  { src: redElfProfile, alt: '3d avatar lucy face side' },
  { src: redElfFace, alt: '3d avatar lucy front distance' },
  { src: tree, alt: '3d tree' },
  { src: redElfFront, alt: '3d avatar lucy front distance' }

];

const descriptionText = "Step into a realm where elven creatures awaken in the embrace of a misty atmosphere. Every element, from the modeled facial features and tailored knitwear collection to the unique jewelry and accessory sculptures, is a product that creates a world that unfolds from the depths of the imagination.";
const creditsText = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const description = { title: "Etherea", subtitle: 'Part 1', text: descriptionText, credits: creditsText, nextProject: "etherea-part-two" };

function EthereaPartOne() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default EthereaPartOne;
