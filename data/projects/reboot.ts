import type { Project } from "./types";

import reboot1 from "@/public/img/physical/reboot/female_model_hiding_head_in_front_of_arms.webp";
import reboot2 from "@/public/img/physical/reboot/male_model_looks_into_tilted_camera.webp";
import reboot3 from "@/public/img/physical/reboot/full_body_view_of_female_model_from_the_front.webp";
import reboot4 from "@/public/img/physical/reboot/female_and_male_face_close_up.webp";
import reboot5 from "@/public/img/physical/reboot/male_model_shown_from_the_back_infront_of_sunreflection.webp";
import reboot6 from "@/public/img/physical/reboot/female_model_bust_shot.webp";
import reboot7 from "@/public/img/physical/reboot/male_model_in_motion.webp";
import reboot8 from "@/public/img/physical/reboot/male_model_full_body_half_profile.webp";
import reboot9 from "@/public/img/physical/reboot/male_model_bust_shot.webp";
import reboot10 from "@/public/img/physical/reboot/female_model_from_half_profile_full_body.webp";
import reboot11 from "@/public/img/physical/reboot/2_models_shown_full_body_looking_into_camera.webp";
import reboot12 from "@/public/img/physical/reboot/male_model_turning_photographed_from_the_back.webp";
import reboot13 from "@/public/img/physical/reboot/detail_view_of_trousrs_on_male_model.webp";
import reboot14 from "@/public/img/physical/reboot/full_body_view_of_female_model_from_the_back.webp";
import reboot15 from "@/public/img/physical/reboot/male_model_full_body_view.webp";
import reboot16 from "@/public/img/physical/reboot/female_model_looks_into_tilted_camera.webp";
import reboot17 from "@/public/img/physical/reboot/female_model_photographed_from_the_side_profile.webp";

export const reboot = {
  slug: "reboot",
  category: "physical",
  title: "Reboot",
  description:
    "Just as a computer may crash due to overload or software glitches, humans may face personal crises or challenges that necessitate a restart or reevaluation of their lives. The act of rebooting in the human context implies a deliberate and conscious effort to initiate change, discard outdated patterns, and embrace a revitalized version of oneself.",
  credits: [
    ["All Fashion", "Studio.Stuckn"],
    ["Styling", "Studio.Stuckn"],
    ["Photo", "Jaap Bräutigam"],
    ["Models", "Lea Rösch & Ringo Lukas"],
    ["Makeup", "Ekaterina Igonina"],
  ],
  listing: { image: reboot6, alt: "female model bust shot", title: "Reboot" },
  media: [
    { type: "image", image: reboot1, alt: "female model hiding head in front of arms" },
    { type: "image", image: reboot2, alt: "male model looks into tilted camera" },
    { type: "image", image: reboot3, alt: "full body view of female model from the front" },
    { type: "image", image: reboot4, alt: "female and male face close up" },
    { type: "image", image: reboot5, alt: "male model shown from the back in front of sun reflection" },
    { type: "image", image: reboot6, alt: "female model bust shot" },
    { type: "image", image: reboot7, alt: "male model in motion" },
    { type: "image", image: reboot8, alt: "male model full body half profile" },
    { type: "image", image: reboot9, alt: "male model bust shot" },
    { type: "image", image: reboot10, alt: "female model from half profile full body" },
    { type: "image", image: reboot11, alt: "2 models shown full body looking into camera" },
    { type: "image", image: reboot12, alt: "male model turning photographed from the back" },
    { type: "image", image: reboot13, alt: "detail view of trousers on male model" },
    { type: "image", image: reboot14, alt: "full body view of female model from the back" },
    { type: "image", image: reboot15, alt: "male model full body view" },
    { type: "image", image: reboot16, alt: "female model looks into tilted camera" },
    { type: "image", image: reboot17, alt: "female model photographed from the side profile" },
  ],
} as const satisfies Project;
