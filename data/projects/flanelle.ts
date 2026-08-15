import type { Project } from "./types";

import flanelle1 from "@/public/img/physical/flanelle/2_models_posing_togehter_sitting.webp";
import flanelle2 from "@/public/img/physical/flanelle/male_model_hold_glove_in_the_camera.webp";
import flanelle3 from "@/public/img/physical/flanelle/female_model_looking_downinto_camera.webp";
import flanelle4 from "@/public/img/physical/flanelle/male_model_grabbing_female_model.webp";
import flanelle5 from "@/public/img/physical/flanelle/model_from_profile_view_with_hat_hiding_the_face.webp";
import flanelle6 from "@/public/img/physical/flanelle/female_model_with_sunglasses_laying_on_the_floor_one_leg_angled.webp";
import flanelle7 from "@/public/img/physical/flanelle/detail_shot_of_print_top_laying_on_chair.webp";
import flanelle8 from "@/public/img/physical/flanelle/model_wearing_a_hat_and_a_scarf.webp";
import flanelle9 from "@/public/img/physical/flanelle/2_models_laying_on_the_floor_looking_up.webp";
import flanelle10 from "@/public/img/physical/flanelle/detail_view_of_print_top_on_model.webp";
import flanelle11 from "@/public/img/physical/flanelle/detail_view_of_female_model_under_mesh_garment.webp";
import flanelle12 from "@/public/img/physical/flanelle/print_scarf_floating_in_the_wind.webp";
import flanelle13 from "@/public/img/physical/flanelle/male_model_kneeing_above_camera.webp";
import flanelle14 from "@/public/img/physical/flanelle/male_model_holds_hands_in_front_of_his_face.webp";
import flanelle15 from "@/public/img/physical/flanelle/view_into_the_sky_with_sun_behind_clouds.webp";
import flanelle16 from "@/public/img/physical/flanelle/male_model_laying_on_floor.webp";
import flanelleLogo from "@/public/img/physical/flanelle/flanelle_magazine_logo.webp";

export const flanelle = {
  slug: "flanelle",
  category: "physical",
  title: "Flanelle Magazine",
  subtitle: { text: "'Sunday Off, It's Raining Today'", cyrillic: false },
  description: "Print Issue No. 19 - The Softness Edition",
  credits: [
    ["Photo", "Charlotte Hansel"],
    ["Styling", "Mercedes Quirante"],
    ["Makeup", "Claudia Fisher"],
    ["Models (Izaio)", "Aura Ell & Lin Novak"],
  ],
  listing: {
    image: flanelle5,
    alt: "model from profile view with hat hiding the face",
    title: "Flanelle Magazine",
  },
  media: [
    { type: "image", image: flanelle1, alt: "2 models posing together sitting" },
    { type: "image", image: flanelle2, alt: "male model holds glove in the camera" },
    { type: "image", image: flanelle3, alt: "female model looking down into camera" },
    { type: "image", image: flanelle4, alt: "man holding woman on shoulder" },
    { type: "image", image: flanelle5, alt: "model from profile view with hat hiding the face" },
    { type: "image", image: flanelle6, alt: "female model with sunglasses laying on the floor one leg angled" },
    { type: "image", image: flanelle7, alt: "detail shot of print top laying on chair" },
    { type: "image", image: flanelle8, alt: "model wearing a hat and a scarf" },
    { type: "image", image: flanelle9, alt: "2 models laying on the floor looking up" },
    { type: "image", image: flanelle10, alt: "detail view of print top on model" },
    { type: "image", image: flanelle11, alt: "detail view of female model under mesh garment" },
    { type: "image", image: flanelle12, alt: "print scarf floating in the wind" },
    { type: "image", image: flanelle13, alt: "male model kneeing above camera" },
    { type: "image", image: flanelle14, alt: "male model holds hands in front of his face" },
    { type: "image", image: flanelle15, alt: "view into the sky with sun behind clouds" },
    { type: "image", image: flanelle16, alt: "male model laying on floor" },
  ],
  fashionCredits: {
    logo: flanelleLogo,
    alt: "Flanelle Magazine logo",
    creditsPieces: {
      1: "Aura - Hat & Shorts Taskin Goec, Top & Longsleeve Studio.Stuckn Lin - Shirt Studio.Stuckn, Jacket Stylist's own, Vest Taskin Goec",
      2: "Overall & Earrings Studio.Stuckn, Gloves Klara Pichler",
      3: "Top Studio.Stuckn, Coat Elisabeth v.d. Thannen, Shirt Taskin Goec, Earrings Charlotte Hansel",
      4: "Coat Elisabeth v.d. Thannen, Overall & Earrings Studio.Stuckn, Gloves Klara Pichler",
      5: "Glasses & Headscarf Studio.Stuckn, Anorak Dress Alexandru Plesco, Heels Taskin Goec, Tights Stylist's own",
      6: "Print jersey & Trousers Studio.Stuckn",
      7: "Veil Klara Pichler",
      8: "Silkscarf Studio.Stuckn",
      9: "Overall Studio.Stuckn",
      10: "Shirt Studio.Stuckn, Jacket Stylist's own, Vest Taskin Goec",
      12: "Overall Studio.Stuckn, Gloves Klara Pichler, Earrings Charlotte Hansel, Shoes Fila",
    },
  },
} as const satisfies Project;
