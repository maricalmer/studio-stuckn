import type { Project } from "./types";

import flux1 from "@/public/img/physical/in-constant-flux/male_model_sits_on_couch_next_to_flowers.webp";
import flux2 from "@/public/img/physical/in-constant-flux/male_model_sit_on_window.webp";
import flux3 from "@/public/img/physical/in-constant-flux/male_model_lean_on_window.webp";
import flux4 from "@/public/img/physical/in-constant-flux/model_with_hands_on_chin_looking_up.webp";
import flux5 from "@/public/img/physical/in-constant-flux/model_sitting_on_top_of_arm_chair.webp";
import flux6 from "@/public/img/physical/in-constant-flux/model_leaning_against_the_window.webp";
import flux7 from "@/public/img/physical/in-constant-flux/model_sits_on_office_chair.webp";
import flux8 from "@/public/img/physical/in-constant-flux/male_model_laying_on_chair.webp";

export const inConstantFlux = {
  slug: "in-constant-flux",
  category: "physical",
  title: "In Constant Flux",
  description:
    "A short fashion film project depicting a gender non- conforming odyssey in which the collection blurs clothing norms and gendered dress in the age of pandemic isolation.",
  credits: [
    ["All Fashion", "Studio.Stuckn"],
    ["Styling", "Studio.Stuckn"],
    ["Director", "Vigdís Erla Guttormsdóttir"],
    ["Film & Edit", "Vigdís Erla Guttormsdóttir"],
    ["Analog Photo", "Ronja Stucken & Vigdís Erla Guttormsdóttir"],
    ["Idea", "Ronja Stucken"],
    ["Music", "Kerr Wilson"],
    ["Model", "Julian Eide"],
  ],
  listing: { image: flux2, alt: "male model sits on window", title: "In Constant Flux" },
  media: [
    {
      type: "youtube",
      src: "https://www.youtube-nocookie.com/embed/hxwX9xJGz_4?si=ZkVKlG47pFwtBvZL&rel=0",
      title: "In Constant Flux by Ronja Stucken",
    },
    { type: "image", image: flux1, alt: "male model sits on couch next to flowers" },
    { type: "image", image: flux2, alt: "male model sits on window" },
    { type: "image", image: flux3, alt: "male model leans on window" },
    { type: "image", image: flux4, alt: "model with hands on chin looking up" },
    { type: "image", image: flux5, alt: "model leaning against the window" },
    { type: "image", image: flux6, alt: "model sitting on top of arm chair" },
    { type: "image", image: flux7, alt: "model sits on office chair" },
    { type: "image", image: flux8, alt: "male model laying on chair" },
  ],
} as const satisfies Project;
