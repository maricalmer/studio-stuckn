import type { Project } from "./types";

import minimal1 from "@/public/img/physical/excessive-minimal/coat_with_belt_detail_view_black_and_white.webp";
import minimal2 from "@/public/img/physical/excessive-minimal/female_model_hiding_her_face_with_her_arms.webp";
import minimal3 from "@/public/img/physical/excessive-minimal/female_model_turning_in_motion_black_and_white.webp";
import minimal4 from "@/public/img/physical/excessive-minimal/view_on_sun_reflections_on_the_floor_and_model_making_a_big_step.webp";
import minimal5 from "@/public/img/physical/excessive-minimal/female_model_standing_with_her_hands_in_pockets.webp";
import minimal6 from "@/public/img/physical/excessive-minimal/abstract_projection_on_female_model_on_the_floor.webp";
import minimal7 from "@/public/img/physical/excessive-minimal/female_model_leaning_on_wood_black_and_white.webp";
import minimal8 from "@/public/img/physical/excessive-minimal/female_model_tilted_camera_with_hand_on_hip.webp";
import minimal9 from "@/public/img/physical/excessive-minimal/female_model_wrapped_in_scarf_and_coat_black_and_white.webp";
import minimal10 from "@/public/img/physical/excessive-minimal/female_model_with_arms_above_her_head.webp";
import minimal11 from "@/public/img/physical/excessive-minimal/abstract_projection_on_female_model_upper_body.webp";

export const excessiveMinimal = {
  slug: "excessive-minimal",
  category: "physical",
  title: "Excessive Minimal",
  description:
    "Harmony in versatility: elegance from the contrasts of dynamism and calm, the complexity of modesty.",
  credits: [
    ["All Fashion", "Studio.Stuckn"],
    ["Styling", "Studio.Stuckn"],
    ["Photo", "Ruben Jacob Fees"],
    ["Model", "Stella Fath"],
  ],
  listing: { image: minimal1, alt: "coat with belt detail view black and white", title: "Excessive Minimal" },
  media: [
    { type: "image", image: minimal1, alt: "coat with belt detail view black and white" },
    { type: "image", image: minimal2, alt: "female model hiding her face with her arms" },
    { type: "image", image: minimal3, alt: "female model turning in motion black and white" },
    { type: "image", image: minimal4, alt: "view on sun reflections on the floor and model making a big step" },
    { type: "image", image: minimal5, alt: "female model standing with her hands in pockets" },
    { type: "image", image: minimal6, alt: "abstract projection on female model on the floor" },
    { type: "image", image: minimal7, alt: "female model leaning on wood black and white" },
    { type: "image", image: minimal8, alt: "female model tilted camera with hand on hip" },
    { type: "image", image: minimal9, alt: "female model wrapped in scarf and coat black and white" },
    { type: "image", image: minimal10, alt: "female model with arms above her head" },
    { type: "image", image: minimal11, alt: "abstract projection on female model upper body" },
  ],
} as const satisfies Project;
