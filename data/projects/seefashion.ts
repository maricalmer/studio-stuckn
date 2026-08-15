import type { Project } from "./types";

import see1 from "@/public/img/physical/seefashion/model_bust_shot_looking_into_the_camera.webp";
import see2 from "@/public/img/physical/seefashion/diverse_model_indress.webp";
import see3 from "@/public/img/physical/seefashion/diverse_model_looking_to_the_side.webp";
import see4 from "@/public/img/physical/seefashion/3_model_looking_into_the_camera.webp";
import see5 from "@/public/img/physical/seefashion/runway_shot_of_model_walking.webp";
import see6 from "@/public/img/physical/seefashion/diverse_model_in_dress_and_vest.webp";
import see7 from "@/public/img/physical/seefashion/runway_shot_of_2_models_walking.webp";
import see8 from "@/public/img/physical/seefashion/detail_shot_of_a_green_suit.webp";
import see9 from "@/public/img/physical/seefashion/4_model_full_body_shot.webp";
import see10 from "@/public/img/physical/seefashion/diverse_model_in_draped_top.webp";

export const seefashion = {
  slug: "seefashion",
  category: "physical",
  title: "See Fashion",
  description:
    "Hybrid Runway show in 21 - openair showcased at 'Haus der Statistik', Alexanderplatz, Berlin and online as livestream.",
  credits: [
    ["All Fashion", "Studio.Stuckn"],
    ["Styling", "Studio.Stuckn"],
    ["Video", "Petandflo"],
    ["Location", "Cinegate"],
    ["Set photography", "Tiffany Chaves"],
    ["Backstage photography", "Tabi Charaf"],
    ["Hair & Makeup", "Mud Studio Berlin"],
    ["Models", "Viva Models"],
    ["In cooperation with", "Bluescope Berlin and Kathi Kaeppel"],
    ["Runway soundtrack", "Cleon"],
  ],
  listing: { image: see8, alt: "detail shot of a green suit", title: "Seefashion" },
  media: [
    {
      type: "youtube",
      src: "https://www.youtube-nocookie.com/embed/PUjRE7VW98g?si=VES49p1BIMXK0i3F&rel=0",
      title: "SeeFashion Runway by Ronja Stucken",
    },
    { type: "image", image: see1, alt: "model bust shot looking into the camera" },
    { type: "image", image: see2, alt: "diverse model indress" },
    { type: "image", image: see3, alt: "diverse model looking to the side" },
    { type: "image", image: see4, alt: "3 models looking into the camera" },
    { type: "image", image: see5, alt: "runway shot of model walking" },
    { type: "image", image: see6, alt: "diverse model in dress and vest" },
    { type: "image", image: see7, alt: "runway shot of 2 models walking" },
    { type: "image", image: see8, alt: "detail shot of a green suit" },
    { type: "image", image: see9, alt: "4 models full body shot" },
    { type: "image", image: see10, alt: "diverse model in draped top" },
  ],
} as const satisfies Project;
