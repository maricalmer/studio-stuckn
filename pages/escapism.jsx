'use client';
import escapism1 from '../public/img/physical/escapism/detail_view_of_a_lasercutted_garment.webp'
import escapism2 from '../public/img/physical/escapism/model_full_body_view_hand_on_face.webp'
import escapism3 from '../public/img/physical/escapism/female_model_infront_of_brown_wall_and_light_reflection.webp'
import escapism4 from '../public/img/physical/escapism/model_in_wide_trousers_taking_big_step.webp'
import escapism5 from '../public/img/physical/escapism/model_headshot_from_back_view.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: escapism1, alt: 'detail view of a lasercutted garment' },
  { src: escapism2, alt: 'model full body view hand on face' },
  { src: escapism3, alt: 'female model in front of brown wall and light reflection' },
  { src: escapism4, alt: 'model in wide trousers taking big step' },
  { src: escapism5, alt: 'model headshot from back view' }
];

const subtitle = "A departure from the norm into a realm of timeless elegance and modern practicality.";
const descriptionText = "Fashion & Styling Studio.Stuckn Photo Charlotte Hansel Assistant Max Zimmermann Models Zihern & Luca (TFM) Hair & makeup Vivi Totemist & Prinz Basil";
const description = { title: "Escapism", subtitle: subtitle, text: descriptionText };

function Escapism() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Escapism;
