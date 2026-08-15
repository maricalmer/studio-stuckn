import type { Project } from "./types";

import redElfProfile from "@/public/img/digital/3d_elf_red_profile.webp";
import redElfDress from "@/public/img/digital/etherea-part-one/3d_elf_red_dress_detail.webp";
import redElfFace from "@/public/img/digital/etherea-part-one/3d_elf_red_face_zoom.webp";
import redElfFront from "@/public/img/digital/etherea-part-one/3d_elf_red_front.webp";
import redElfFrontZoom from "@/public/img/digital/etherea-part-one/3d_elf_red_front_zoom.webp";
import redTree from "@/public/img/digital/etherea-part-one/3d_elf_red_tree.webp";

export const ethereaPartOne = {
  slug: "etherea-part-one",
  category: "digital",
  title: "Etherea",
  subtitle: { text: "Part 1", cyrillic: false },
  description:
    "Step into a world where elven creatures blossom in the embrace of a misty atmosphere. Every element, from the sculpted facial features and detailed knitwear collection to the unique jewelry and accessory sculptures, are creations that spring from the depths of the imagination.",
  softwares:
    "Using CLO3D, Blender, Substance Sampler, Painter, ZBrush, DAZ Studio and Photoshop.",
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
} as const satisfies Project;
