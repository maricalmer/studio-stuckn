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

const elements = [
  { type: "image", src: redElfFrontZoom, alt: '3d avatar lucy front face' },
  { type: "image", src: redElfDress, alt: '3d avatar lucy side distance' },
  { type: "image", src: redElfProfile, alt: '3d avatar lucy face side' },
  { type: "image", src: redElfFace, alt: '3d avatar lucy front distance' },
  { type: "image", src: tree, alt: '3d tree' },
  { type: "image", src: redElfFront, alt: '3d avatar lucy front distance' }

];

const title = "Etherea";
const subtitle = "Part 1";
const details = "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.";
const credits = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const nextProject = "etherea-part-two";
const description = { title: title, subtitle: subtitle, details: details, credits: credits, nextProject: nextProject };

function EthereaPartOne() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel elements={elements} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default EthereaPartOne;
