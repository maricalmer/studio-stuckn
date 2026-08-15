import type { Project } from "./types";

import purpleElfDetail from "@/public/img/digital/3d_elf_purple_detail.webp";
import purpleElfBottom from "@/public/img/digital/etherea-part-three/3d_elf_purple_bottom.webp";
import purpleElfFace from "@/public/img/digital/etherea-part-three/3d_elf_purple_face.webp";
import purpleElfFullBody from "@/public/img/digital/etherea-part-three/3d_elf_purple_full_body.webp";
import purpleGrass from "@/public/img/digital/etherea-part-three/3d_elf_purple_grass_detail.webp";
import purpleElfProfile from "@/public/img/digital/etherea-part-three/3d_elf_purple_profile.webp";
import purpleElfSide from "@/public/img/digital/etherea-part-three/3d_elf_purple_side.webp";

export const ethereaPartThree = {
  slug: "etherea-part-three",
  category: "digital",
  title: "Etherea",
  subtitle: { text: "Part 3", cyrillic: false },
  description:
    "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.",
  softwares:
    "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.",
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
} as const satisfies Project;
