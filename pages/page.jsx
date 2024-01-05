'use client';
import pageImg1 from '../public/img/physical/page/female_model_standing_on_sand_dune.webp'
import pageImg2 from '../public/img/physical/page/reflection_of_a_female_model_from_the_bottom_holding_gemstone.webp'
import pageImg3 from '../public/img/physical/page/sand_dune_with_round_mirror.webp'
import pageImg4 from '../public/img/physical/page/female_model_laying_in_sand.webp'
import pageImg5 from '../public/img/physical/page/sand_patterns.webp'
import pageImg6 from '../public/img/physical/page/detail_view_of_hand_in_the_sand.webp'
import pageImg7 from '../public/img/physical/page/female_model_standing_in_front_of_hill.webp'
import pageImg8 from '../public/img/physical/page/female_model_with_yellow_glasses.webp'
import pageImg9 from '../public/img/physical/page/sand_shapes_top_view.webp'
import pageImg10 from '../public/img/physical/page/female_model_tilted_view_with_smoke_in_front.webp'
import pageImg11 from '../public/img/physical/page/stone_dune_with_wires.webp'
import pageLogo from '../public/img/physical/page/page_magazine_logo.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: pageImg1, alt: 'female model standing on sand dune' },
  { type: "image", src: pageImg2, alt: 'reflection of a female model from the bottom holding gemstone' },
  { type: "image", src: pageImg3, alt: 'sand dune with round mirror' },
  { type: "image", src: pageImg4, alt: 'female model laying in sand' },
  { type: "image", src: pageImg5, alt: 'sand patterns' },
  { type: "image", src: pageImg6, alt: 'detail view of hand in the sand' },
  { type: "image", src: pageImg7, alt: 'female model standing in front of hill' },
  { type: "image", src: pageImg8, alt: 'female model with yellow glasses' },
  { type: "image", src: pageImg9, alt: 'sand shapes top view' },
  { type: "image", src: pageImg10, alt: 'female model tilted view with smoke in front' },
  { type: "image", src: pageImg11, alt: 'stone dune with wires' }
];

const title = "Page Magazine";
const details = "'Desert Gates: A Near Future Of Perpetual Drylands' Online Issue, 01/2021";
const credits = [["Photo", "Chiara Bonetti"], ["Photo Assistant", "Pietro Groff"], ["Styling", "Halla Farhat"], ["Hair & Makeup", "Christin Sperlich"], ["Set Design", "Sandro de Mauro"], ["Model (M4)", "Verna Reini"]];
const previousProject = "excessive-minimal";
const nextProject = "escapism";
const description = { title: title, details: details, credits: credits, previousProject: previousProject, nextProject: nextProject };
const fashionCredits = {logo: pageLogo, alt: "Page Magazine logo", creditsPieces: {1: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", 2: "Earrings, Leather Trousers Studio.Stuckn, Top Kuntz", 4: "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", 6: "Top Studio.Stuckn", 7: "Leather Trousers Studio.Stuckn, Vest, Glasses Stylist's own", 8: "Necklace & Earcuff NUW'D, Glasses Stylist's own", 10: "Leather Trousers Studio.Stuckn"}};


function Page() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel elements={elements} description={description} fashionCredits={fashionCredits}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Page;
