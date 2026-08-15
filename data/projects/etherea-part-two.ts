import type { Project } from "./types";

import roseElfEarCropped from "@/public/img/digital/3d_elf_rose_ear_cropped.webp";
import roseElfBottom from "@/public/img/digital/etherea-part-two/3d_elf_rose_bottom.webp";
import roseElfEar from "@/public/img/digital/etherea-part-two/3d_elf_rose_ear.webp";
import roseElfFace from "@/public/img/digital/etherea-part-two/3d_elf_rose_face.webp";
import roseElfFront from "@/public/img/digital/etherea-part-two/3d_elf_rose_front.webp";
import roseElfSide from "@/public/img/digital/etherea-part-two/3d_elf_rose_side.webp";
import roseTree from "@/public/img/digital/etherea-part-two/3d_elf_rose_tree_detail.webp";

export const ethereaPartTwo = {
  slug: "etherea-part-two",
  category: "digital",
  title: "Etherea",
  subtitle: { text: "Part 2", cyrillic: false },
  description:
    "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.",
  softwares:
    "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.",
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
} as const satisfies Project;
