'use client';
import fluxPic1 from '../public/img/flux_carousel_1.webp'
import fluxPic2 from '../public/img/physical/in-constant-flux/male_model_sits_on_couch_next_to_flowers.webp'
import fluxPic3 from '../public/img/physical/in-constant-flux/male_model_sit_on_window.webp'
import fluxPic4 from '../public/img/physical/in-constant-flux/male_model_lean_on_window.webp'
import fluxPic5 from '../public/img/physical/in-constant-flux/model_with_hands_on_chin_looking_up.webp'
import fluxPic6 from '../public/img/physical/in-constant-flux/model_sitting_on_top_of_arm_chair.webp'
import fluxPic7 from '../public/img/physical/in-constant-flux/model_leaning_against_the_window.webp'
import fluxPic8 from '../public/img/physical/in-constant-flux/model_sits_on_office_chair.webp'
import fluxPic9 from '../public/img/physical/in-constant-flux/male_model_laying_on_chair.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: fluxPic1, alt: 'video on window' },
  { src: fluxPic2, alt: 'male model sits on couch next to flowers' },
  { src: fluxPic3, alt: 'male model sits on window' },
  { src: fluxPic4, alt: 'male model leans on window' },
  { src: fluxPic5, alt: 'model with hands on chin looking up' },
  { src: fluxPic6, alt: 'model leaning against the window' },
  { src: fluxPic7, alt: 'model sitting on top of arm chair' },
  { src: fluxPic8, alt: 'model sits on office chair' },
  { src: fluxPic9, alt: 'male model laying on chair' }
];

const descriptionText = "A short fashion film project depicting a gender non- conforming odyssey in which the collection blurs clothing norms and gendered dress in the age of pandemic isolation.";
const creditsText = "Fashion & Styling Studio.Stuckn Director Vigdís Erla Guttormsdóttir Film & Edit Vigdís Erla Guttormsdóttir Analog Photo Ronja Stucken & Vigdís Erla Guttormsdóttir Idea Ronja Stucken Music Kerr Wilson Model Julian Eide";
const description = { title: "In Constant Flux", subtitle: descriptionText, text: creditsText, credits: "" };

function InConstantFlux() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default InConstantFlux;
