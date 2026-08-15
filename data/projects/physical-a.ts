import type { Project } from "./types";

import flux1 from "@/public/img/physical/in-constant-flux/male_model_sits_on_couch_next_to_flowers.webp";
import flux2 from "@/public/img/physical/in-constant-flux/male_model_sit_on_window.webp";
import flux3 from "@/public/img/physical/in-constant-flux/male_model_lean_on_window.webp";
import flux4 from "@/public/img/physical/in-constant-flux/model_with_hands_on_chin_looking_up.webp";
import flux5 from "@/public/img/physical/in-constant-flux/model_sitting_on_top_of_arm_chair.webp";
import flux6 from "@/public/img/physical/in-constant-flux/model_leaning_against_the_window.webp";
import flux7 from "@/public/img/physical/in-constant-flux/model_sits_on_office_chair.webp";
import flux8 from "@/public/img/physical/in-constant-flux/male_model_laying_on_chair.webp";
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
import marie1 from "@/public/img/physical/marie-claire/model_stands_infront_of_field.webp";
import marie2 from "@/public/img/physical/marie-claire/2hands_holding_flowes_towards_the_sky.webp";
import marie3 from "@/public/img/physical/marie-claire/model_in_flower_field.webp";
import marie4 from "@/public/img/physical/marie-claire/model_photographed_from_bottom_armes_on_her_back.webp";
import marie5 from "@/public/img/physical/marie-claire/model_holding_scarf_floating_in_the_wind.webp";
import marieLogo from "@/public/img/physical/marie-claire/marie_claire_magazine_logo.webp";
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

export const firstPhysicalProjects = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
] as const satisfies readonly Project[];
