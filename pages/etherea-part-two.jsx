'use client';
import roseElfEar from '../public/img/digital/etherea-part-two/3d_elf_rose_ear.webp'
import roseElfBottom from '../public/img/digital/etherea-part-two/3d_elf_rose_bottom.webp'
import tree from '../public/img/digital/etherea-part-two/3d_elf_rose_tree_detail.webp'
import roseElfFace from '../public/img/digital/etherea-part-two/3d_elf_rose_face.webp'
import roseElfSide from '../public/img/digital/etherea-part-two/3d_elf_rose_side.webp'
import roseElfFront from '../public/img/digital/etherea-part-two/3d_elf_rose_front.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: roseElfEar, alt: '3d avatar marion face side' },
  { type: "image", src: roseElfBottom, alt: '3d avatar marion front body bottom' },
  { type: "image", src: tree, alt: '3d tree' },
  { type: "image", src: roseElfFace, alt: '3d avatar marion face side' },
  { type: "image", src: roseElfSide, alt: '3d avatar marion side body' },
  { type: "image", src: roseElfFront, alt: '3d avatar marion front body top' }
];

const descriptionText = "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.";
const creditsText = "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";
const description = { title: "Etherea", subtitle: 'Part 2', text: descriptionText, credits: creditsText, previousProject: "etherea-part-one", nextProject: "etherea-part-three" };

function EthereaPartTwo() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" />
      <Carousel elements={elements} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default EthereaPartTwo;
