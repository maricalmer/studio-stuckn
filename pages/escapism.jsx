'use client';
import escapismImg1 from '../public/img/physical/escapism/detail_view_of_a_lasercutted_garment.webp'
import escapismImg2 from '../public/img/physical/escapism/model_full_body_view_hand_on_face.webp'
import escapismImg3 from '../public/img/physical/escapism/female_model_infront_of_brown_wall_and_light_reflection.webp'
import escapismImg4 from '../public/img/physical/escapism/model_in_wide_trousers_taking_big_step.webp'
import escapismImg5 from '../public/img/physical/escapism/model_headshot_from_back_view.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: escapismImg1, alt: 'detail view of a lasercutted garment' },
  { type: "image", src: escapismImg2, alt: 'model full body view hand on face' },
  { type: "image", src: escapismImg3, alt: 'female model in front of brown wall and light reflection' },
  { type: "image", src: escapismImg4, alt: 'model in wide trousers taking big step' },
  { type: "image", src: escapismImg5, alt: 'model headshot from back view' }
];

const title = "Escapism";
const details = "A departure from the norm into a realm of timeless elegance and modern practicality.";
const credits = [["All Fashion", "Studio.Stuckn"], ["Styling", "Studio.Stuckn"], ["Photo", "Charlotte Hansel"], ["Assistant", "Max Zimmermann"], ["Models (TFM)", "Zihern & Luca"], ["Hair & makeup", "Vivi Totemist & Prinz Basil"]];
const previousProject = "page";
const description = { title: title, details: details, credits: credits, previousProject: previousProject };

function Escapism() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling={"opacity-1 border-black"} />
    </PageContainer>
  );
}

export default Escapism;
