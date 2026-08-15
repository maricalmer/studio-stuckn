import type { Project } from "./types";

import redElfProfile from "@/public/img/digital/3d_elf_red_profile.webp";
import roseElfEarCropped from "@/public/img/digital/3d_elf_rose_ear_cropped.webp";
import purpleElfDetail from "@/public/img/digital/3d_elf_purple_detail.webp";
import blueBagFront from "@/public/img/digital/3d_blue_bag_front.webp";
import redElfFrontZoom from "@/public/img/digital/etherea-part-one/3d_elf_red_front_zoom.webp";
import redElfDress from "@/public/img/digital/etherea-part-one/3d_elf_red_dress_detail.webp";
import redElfFace from "@/public/img/digital/etherea-part-one/3d_elf_red_face_zoom.webp";
import redTree from "@/public/img/digital/etherea-part-one/3d_elf_red_tree.webp";
import redElfFront from "@/public/img/digital/etherea-part-one/3d_elf_red_front.webp";
import roseElfEar from "@/public/img/digital/etherea-part-two/3d_elf_rose_ear.webp";
import roseElfBottom from "@/public/img/digital/etherea-part-two/3d_elf_rose_bottom.webp";
import roseTree from "@/public/img/digital/etherea-part-two/3d_elf_rose_tree_detail.webp";
import roseElfFace from "@/public/img/digital/etherea-part-two/3d_elf_rose_face.webp";
import roseElfSide from "@/public/img/digital/etherea-part-two/3d_elf_rose_side.webp";
import roseElfFront from "@/public/img/digital/etherea-part-two/3d_elf_rose_front.webp";
import purpleElfFace from "@/public/img/digital/etherea-part-three/3d_elf_purple_face.webp";
import purpleElfBottom from "@/public/img/digital/etherea-part-three/3d_elf_purple_bottom.webp";
import purpleElfProfile from "@/public/img/digital/etherea-part-three/3d_elf_purple_profile.webp";
import purpleElfSide from "@/public/img/digital/etherea-part-three/3d_elf_purple_side.webp";
import purpleGrass from "@/public/img/digital/etherea-part-three/3d_elf_purple_grass_detail.webp";
import purpleElfFullBody from "@/public/img/digital/etherea-part-three/3d_elf_purple_full_body.webp";
import blackBootsProfile from "@/public/img/digital/alien-accessories/3d_black_boots_profile.webp";
import greenBagProfile from "@/public/img/digital/alien-accessories/3d_green_bag_profile.webp";
import whiteBagDetail from "@/public/img/digital/alien-accessories/3d_white_bag_detail.webp";
import silverBootsTop from "@/public/img/digital/alien-accessories/3d_silver_boots_top.webp";
import silverBootsDetail from "@/public/img/digital/alien-accessories/3d_silver_boots_detail.webp";
import greenBagTop from "@/public/img/digital/alien-accessories/3d_green_bag_top.webp";
import blackBootsBack from "@/public/img/digital/alien-accessories/3d_black_boots_back.webp";
import blueBagProfile from "@/public/img/digital/alien-accessories/3d_blue_bag_profile.webp";
import orangeSneakerSide from "@/public/img/digital/alien-accessories/3d_orange_sneaker_side.webp";
import whiteBagFront from "@/public/img/digital/alien-accessories/3d_white_bag_front.webp";
import silverBootsFront from "@/public/img/digital/alien-accessories/3d_silver_boots_front.webp";
import greenBagSide from "@/public/img/digital/alien-accessories/3d_green_bag_side.webp";
import orangeSneakerTop from "@/public/img/digital/alien-accessories/3d_orange_sneaker_top.webp";
import orangeSneakerDetail from "@/public/img/digital/alien-accessories/3d_orange_sneaker_detail.webp";

const ethereaDescription =
  "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.";

const ethereaSoftwares =
  "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.";

export const digitalProjects = [
  {
    slug: "etherea-part-one",
    category: "digital",
    title: "Etherea",
    subtitle: { text: "Part 1", cyrillic: false },
    description: ethereaDescription,
    softwares: ethereaSoftwares,
    listing: {
      image: redElfProfile,
      alt: "3d avatar laying",
      title: "Etherea Part I",
    },
    media: [
      { type: "image", image: redElfFrontZoom, alt: "3d avatar lucy front face" },
      { type: "image", image: redElfDress, alt: "3d avatar lucy side distance" },
      { type: "image", image: redElfProfile, alt: "3d avatar lucy face side" },
      { type: "image", image: redElfFace, alt: "3d avatar lucy front distance" },
      { type: "image", image: redTree, alt: "3d tree" },
      { type: "image", image: redElfFront, alt: "3d avatar lucy front distance" },
    ],
  },
  {
    slug: "etherea-part-two",
    category: "digital",
    title: "Etherea",
    subtitle: { text: "Part 2", cyrillic: false },
    description: ethereaDescription,
    softwares: ethereaSoftwares,
    listing: {
      image: roseElfEarCropped,
      alt: "3d avatar earings",
      title: "Etherea Part II",
    },
    media: [
      { type: "image", image: roseElfEar, alt: "3d avatar marion face side" },
      { type: "image", image: roseElfBottom, alt: "3d avatar marion front body bottom" },
      { type: "image", image: roseTree, alt: "3d tree" },
      { type: "image", image: roseElfFace, alt: "3d avatar marion face side" },
      { type: "image", image: roseElfSide, alt: "3d avatar marion side body" },
      { type: "image", image: roseElfFront, alt: "3d avatar marion front body top" },
    ],
  },
  {
    slug: "etherea-part-three",
    category: "digital",
    title: "Etherea",
    subtitle: { text: "Part 3", cyrillic: false },
    description: ethereaDescription,
    softwares: ethereaSoftwares,
    listing: {
      image: purpleElfDetail,
      alt: "3d avatar boots",
      title: "Etherea Part III",
    },
    media: [
      { type: "image", image: purpleElfDetail, alt: "3d boots" },
      { type: "image", image: purpleElfFace, alt: "3d avatar marion front face" },
      { type: "image", image: purpleElfBottom, alt: "3d avatar marion bottom back" },
      { type: "image", image: purpleElfProfile, alt: "3d avatar marion profile face" },
      { type: "image", image: purpleElfSide, alt: "3d avatar marion body side" },
      { type: "image", image: purpleGrass, alt: "3d grass" },
      { type: "image", image: purpleElfFullBody, alt: "3d avatar marion body front" },
    ],
  },
  {
    slug: "alien-accessories",
    category: "digital",
    title: "Alien Accessories",
    description:
      "In this collection of 3D fashion sculptures, organic curves are combined with geometric precision, redefining the conventional perception of shapes. The deliberate choice of materials with vibrant color tones paired with deep black and shiny surfaces gives the digital sculptures a special fascination and brings them to life. Let yourself be inspired to rethink reality and appreciate the extraordinary.",
    softwares: "Using ZBrush, Blender, CLO3D, Substance Painter, and Photoshop.",
    listing: {
      image: blueBagFront,
      alt: "3d alien bag with green background",
      title: "Alien Accessories",
    },
    media: [
      { type: "image", image: blackBootsProfile, alt: "3d black boots profile" },
      { type: "image", image: greenBagProfile, alt: "3d black bag blue background" },
      { type: "image", image: whiteBagDetail, alt: "3d white bag white background" },
      { type: "image", image: silverBootsTop, alt: "3d silver boots" },
      { type: "image", image: silverBootsDetail, alt: "3d silver leather boots close up" },
      { type: "image", image: greenBagTop, alt: "3d black bag top" },
      { type: "image", image: blueBagFront, alt: "3d black bag top green background" },
      { type: "image", image: blackBootsBack, alt: "3d black boots back" },
      { type: "image", image: blueBagProfile, alt: "3d black bag profile" },
      { type: "image", image: orangeSneakerSide, alt: "3d black shoes side" },
      { type: "image", image: whiteBagFront, alt: "3d white bag orange background" },
      { type: "image", image: silverBootsFront, alt: "3d silver boots front" },
      { type: "image", image: greenBagSide, alt: "3d green bag open" },
      { type: "image", image: orangeSneakerTop, alt: "3d black shoes orange top" },
      { type: "image", image: orangeSneakerDetail, alt: "3d black shoes orange sole" },
    ],
  },
] as const satisfies readonly Project[];
