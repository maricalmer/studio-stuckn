import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import fluxImg1 from '../public/img/physical/in-constant-flux/male_model_sits_on_couch_next_to_flowers.webp';
import fluxImg2 from '../public/img/physical/in-constant-flux/male_model_sit_on_window.webp';
import fluxImg3 from '../public/img/physical/in-constant-flux/male_model_lean_on_window.webp';
import fluxImg4 from '../public/img/physical/in-constant-flux/model_with_hands_on_chin_looking_up.webp';
import fluxImg5 from '../public/img/physical/in-constant-flux/model_sitting_on_top_of_arm_chair.webp';
import fluxImg6 from '../public/img/physical/in-constant-flux/model_leaning_against_the_window.webp';
import fluxImg7 from '../public/img/physical/in-constant-flux/model_sits_on_office_chair.webp';
import fluxImg8 from '../public/img/physical/in-constant-flux/male_model_laying_on_chair.webp';
import "../public/stylesheets/projects.css";

const elements = [
  { type: "video", src: "https://www.youtube-nocookie.com/embed/hxwX9xJGz_4?si=ZkVKlG47pFwtBvZL&rel=0", title: 'In Constant Flux by Ronja Stucken' },
  { type: "image", src: fluxImg1, alt: 'male model sits on couch next to flowers' },
  { type: "image", src: fluxImg2, alt: 'male model sits on window' },
  { type: "image", src: fluxImg3, alt: 'male model leans on window' },
  { type: "image", src: fluxImg4, alt: 'model with hands on chin looking up' },
  { type: "image", src: fluxImg5, alt: 'model leaning against the window' },
  { type: "image", src: fluxImg6, alt: 'model sitting on top of arm chair' },
  { type: "image", src: fluxImg7, alt: 'model sits on office chair' },
  { type: "image", src: fluxImg8, alt: 'male model laying on chair' }
];

const title = "In Constant Flux";
const details = "A short fashion film project depicting a gender non- conforming odyssey in which the collection blurs clothing norms and gendered dress in the age of pandemic isolation.";
const credits = [["All Fashion", "Studio.Stuckn"], ["Styling", "Studio.Stuckn"], ["Director", "Vigdís Erla Guttormsdóttir"], ["Film & Edit", "Vigdís Erla Guttormsdóttir"], ["Analog Photo", "Ronja Stucken & Vigdís Erla Guttormsdóttir"], ["Idea", "Ronja Stucken"], ["Music", "Kerr Wilson"], ["Model", "Julian Eide"]];
const nextProject = "flanelle";
const description = { title: title, details: details, credits: credits, nextProject: nextProject };

export default function InConstantFlux() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
};
