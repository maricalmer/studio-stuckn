'use client';
import pagePic1 from '../public/img/physical/page/female_model_standing_on_sand_dune.webp'
import pagePic2 from '../public/img/physical/reflection_of_a_female_model_from_the_bottom_holding_gemstone.webp'
import pagePic3 from '../public/img/physical/page/sand_dune_with_round_mirror.webp'
import pagePic4 from '../public/img/physical/page/female_model_laying_in_sand.webp'
import pagePic5 from '../public/img/physical/page/sand_patterns.webp'
import pagePic6 from '../public/img/physical/page/detail_view_of_hand_in_the_sand.webp'
import pagePic7 from '../public/img/physical/page/female_model_standing_in_front_of_hill.webp'
import pagePic8 from '../public/img/physical/page/female_model_with_yellow_glasses.webp'
import pagePic9 from '../public/img/physical/page/sand_shapes_top_view.webp'
import pagePic10 from '../public/img/physical/page/female_model_tilted_view_with_smoke_in_front.webp'
import pagePic11 from '../public/img/physical/page/stone_dune_with_wires.webp'
import pageLogo from '../public/img/physical/page/page_magazine_logo.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: pagePic1, alt: 'female model standing on sand dune' },
  { src: pagePic2, alt: 'reflection of a female model from the bottom holding gemstone' },
  { src: pagePic3, alt: 'sand dune with round mirror' },
  { src: pagePic4, alt: 'female model laying in sand' },
  { src: pagePic5, alt: 'sand patterns' },
  { src: pagePic6, alt: 'detail view of hand in the sand' },
  { src: pagePic7, alt: 'female model standing in front of hill' },
  { src: pagePic8, alt: 'female model with yellow glasses' },
  { src: pagePic9, alt: 'sand shapes top view' },
  { src: pagePic10, alt: 'female model tilted view with smoke in front' },
  { src: pagePic11, alt: 'stone dune with wires' }
];

const descriptionText = "'Desert Gates: A Near Future Of Perpetual Drylands' Online Issue, 01/2021";
const creditsText = "Photo Chiara Bonetti Photo Assistant Pietro Groff Styling Halla Farhat Hair & Makeup Christin Sperlich Set Design Sandro de Mauro Model (M4) Verna Reini";
const description = { title: "Page Magazine", subtitle: descriptionText, text: creditsText, credits: "" };
const credits = {logo: pageLogo, alt: "Page Magazine logo", creditsPieces: {1: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", 2: "Earrings, Leather Trousers Studio.Stuckn, Top Kuntz", 4: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", 6: "Top Studio.Stuckn", 7: "Leather Trousers Studio.Stuckn, Vest, Glasses Stylist's own", 8: "Necklace & Earcuff NUW'D, Glasses Stylist's own", 10: "Leather Trousers Studio.Stuckn"}};


function Page() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description} credits={credits}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Page;
