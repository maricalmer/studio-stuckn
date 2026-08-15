import type { Project } from "./types";

import marie1 from "@/public/img/physical/marie-claire/model_stands_infront_of_field.webp";
import marie2 from "@/public/img/physical/marie-claire/2hands_holding_flowes_towards_the_sky.webp";
import marie3 from "@/public/img/physical/marie-claire/model_in_flower_field.webp";
import marie4 from "@/public/img/physical/marie-claire/model_photographed_from_bottom_armes_on_her_back.webp";
import marie5 from "@/public/img/physical/marie-claire/model_holding_scarf_floating_in_the_wind.webp";
import marieLogo from "@/public/img/physical/marie-claire/marie_claire_magazine_logo.webp";

export const marieClaire = {
  slug: "marie-claire",
  category: "physical",
  title: "Marie Claire Magazine",
  subtitle: { text: "ВЗЯТИ ГОРУ", cyrillic: true },
  description: "Print Issue Marie Claire Ukraine, 09/2021",
  credits: [
    ["Photo", "Christiane Baumgart"],
    ["Styling", "Chiara Bottin"],
    ["Makeup", "Adina Hensel"],
    ["Model (Spin)", "Irene Opoku"],
    ["Retouche", "Irene Velweiss"],
  ],
  listing: { image: marie1, alt: "model stands in front of field", title: "Marie Claire Magazine" },
  media: [
    { type: "image", image: marie1, alt: "model stands in front of field" },
    { type: "image", image: marie2, alt: "2 hands holding flowers towards the sky" },
    { type: "image", image: marie3, alt: "model in flower field" },
    { type: "image", image: marie4, alt: "model photographed from bottom arms on her back" },
    { type: "image", image: marie5, alt: "model holding scarf floating in the wind" },
  ],
  fashionCredits: {
    logo: marieLogo,
    alt: "Marie Claire Magazine logo",
    creditsPieces: {
      1: "Shirt, Vest & Trousers Studio.Stuckn, Tie & Belt Gucci, Shoes Prada, Glasses Neubau Eyewear",
      2: "Shirt Studio.Stuckn",
      3: "Coat Truongii, Bag Burberry, Top Alina Wotschel, Trousers Acne Studios, Earrings Stephanie Kahnau",
      4: "Dress Karl Lagerfeld",
      5: "Orange Blouse Soeur, Striped Blouse Sessùn, Scarf Hermés",
    },
  },
} as const satisfies Project;
