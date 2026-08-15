import type { Project } from "./types";

import page1 from "@/public/img/physical/page/female_model_standing_on_sand_dune.webp";
import page2 from "@/public/img/physical/page/reflection_of_a_female_model_from_the_bottom_holding_gemstone.webp";
import page3 from "@/public/img/physical/page/sand_dune_with_round_mirror.webp";
import page4 from "@/public/img/physical/page/female_model_laying_in_sand.webp";
import page5 from "@/public/img/physical/page/sand_patterns.webp";
import page6 from "@/public/img/physical/page/detail_view_of_hand_in_the_sand.webp";
import page7 from "@/public/img/physical/page/female_model_standing_in_front_of_hill.webp";
import page8 from "@/public/img/physical/page/female_model_with_yellow_glasses.webp";
import page9 from "@/public/img/physical/page/sand_shapes_top_view.webp";
import page10 from "@/public/img/physical/page/female_model_tilted_view_with_smoke_in_front.webp";
import page11 from "@/public/img/physical/page/stone_dune_with_wires.webp";
import pageLogo from "@/public/img/physical/page/page_magazine_logo.webp";

export const page = {
  slug: "page",
  category: "physical",
  title: "Page Magazine",
  description: "'Desert Gates: A Near Future Of Perpetual Drylands' Online Issue, 01/2021",
  credits: [
    ["Photo", "Chiara Bonetti"],
    ["Photo Assistant", "Pietro Groff"],
    ["Styling", "Halla Farhat"],
    ["Hair & Makeup", "Christin Sperlich"],
    ["Set Design", "Sandro de Mauro"],
    ["Model (M4)", "Verna Reini"],
  ],
  listing: {
    image: page2,
    alt: "reflection of a female model from the bottom holding gemstone",
    title: "Page Magazine",
  },
  media: [
    { type: "image", image: page1, alt: "female model standing on sand dune" },
    { type: "image", image: page2, alt: "reflection of a female model from the bottom holding gemstone" },
    { type: "image", image: page3, alt: "sand dune with round mirror" },
    { type: "image", image: page4, alt: "female model laying in sand" },
    { type: "image", image: page5, alt: "sand patterns" },
    { type: "image", image: page6, alt: "detail view of hand in the sand" },
    { type: "image", image: page7, alt: "female model standing in front of hill" },
    { type: "image", image: page8, alt: "female model with yellow glasses" },
    { type: "image", image: page9, alt: "sand shapes top view" },
    { type: "image", image: page10, alt: "female model tilted view with smoke in front" },
    { type: "image", image: page11, alt: "stone dune with wires" },
  ],
  fashionCredits: {
    logo: pageLogo,
    alt: "Page Magazine logo",
    creditsPieces: {
      1: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo",
      2: "Earrings, Leather Trousers Studio.Stuckn, Top Kuntz",
      4: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo",
      6: "Top Studio.Stuckn",
      7: "Leather Trousers Studio.Stuckn, Vest, Glasses Stylist's own",
      8: "Necklace & Earcuff NUW'D, Glasses Stylist's own",
      10: "Leather Trousers Studio.Stuckn",
    },
  },
} as const satisfies Project;
