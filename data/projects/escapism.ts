import type { Project } from "./types";

import escapism1 from "@/public/img/physical/escapism/detail_view_of_a_lasercutted_garment.webp";
import escapism2 from "@/public/img/physical/escapism/model_full_body_view_hand_on_face.webp";
import escapism3 from "@/public/img/physical/escapism/female_model_infront_of_brown_wall_and_light_reflection.webp";
import escapism4 from "@/public/img/physical/escapism/model_in_wide_trousers_taking_big_step.webp";
import escapism5 from "@/public/img/physical/escapism/model_headshot_from_back_view.webp";

export const escapism = {
  slug: "escapism",
  category: "physical",
  title: "Escapism",
  description: "A departure from the norm into a realm of timeless elegance and modern practicality.",
  credits: [
    ["All Fashion", "Studio.Stuckn"],
    ["Styling", "Studio.Stuckn"],
    ["Photo", "Charlotte Hansel"],
    ["Assistant", "Max Zimmermann"],
    ["Models (TFM)", "Zihern & Luca"],
    ["Hair & makeup", "Vivi Totemist & Prinz Basil"],
  ],
  listing: { image: escapism4, alt: "model in wide trousers taking big step", title: "Escapism" },
  media: [
    { type: "image", image: escapism1, alt: "detail view of a lasercutted garment" },
    { type: "image", image: escapism2, alt: "model full body view hand on face" },
    { type: "image", image: escapism3, alt: "female model in front of brown wall and light reflection" },
    { type: "image", image: escapism4, alt: "model in wide trousers taking big step" },
    { type: "image", image: escapism5, alt: "model headshot from back view" },
  ],
} as const satisfies Project;
