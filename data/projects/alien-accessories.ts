import type { Project } from "./types";

import blueBagFront from "@/public/img/digital/3d_blue_bag_front.webp";
import blackBootsBack from "@/public/img/digital/alien-accessories/3d_black_boots_back.webp";
import blackBootsProfile from "@/public/img/digital/alien-accessories/3d_black_boots_profile.webp";
import blueBagProfile from "@/public/img/digital/alien-accessories/3d_blue_bag_profile.webp";
import greenBagProfile from "@/public/img/digital/alien-accessories/3d_green_bag_profile.webp";
import greenBagSide from "@/public/img/digital/alien-accessories/3d_green_bag_side.webp";
import greenBagTop from "@/public/img/digital/alien-accessories/3d_green_bag_top.webp";
import orangeSneakerDetail from "@/public/img/digital/alien-accessories/3d_orange_sneaker_detail.webp";
import orangeSneakerSide from "@/public/img/digital/alien-accessories/3d_orange_sneaker_side.webp";
import orangeSneakerTop from "@/public/img/digital/alien-accessories/3d_orange_sneaker_top.webp";
import silverBootsDetail from "@/public/img/digital/alien-accessories/3d_silver_boots_detail.webp";
import silverBootsFront from "@/public/img/digital/alien-accessories/3d_silver_boots_front.webp";
import silverBootsTop from "@/public/img/digital/alien-accessories/3d_silver_boots_top.webp";
import whiteBagDetail from "@/public/img/digital/alien-accessories/3d_white_bag_detail.webp";
import whiteBagFront from "@/public/img/digital/alien-accessories/3d_white_bag_front.webp";

export const alienAccessories = {
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
} as const satisfies Project;
