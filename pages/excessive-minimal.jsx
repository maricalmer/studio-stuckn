'use client';
import minimal1 from '../public/img/physical/coat_with_belt_detail_view_black_and_white.webp'
import minimal2 from '../public/img/physical/excessive-minimal/female_model_hiding_her_face_with_her_arms.webp'
import minimal3 from '../public/img/physical/excessive-minimal/female_model_turning_in_motion_black_and_white.webp'
import minimal4 from '../public/img/physical/excessive-minimal/view_on_sun_reflections_on_the_floor_and_model_making_a_big_step.webp'
import minimal5 from '../public/img/physical/excessive-minimal/female_model_standing_with_her_hands_in_pockets.webp'
import minimal6 from '../public/img/physical/excessive-minimal/abstract_projection_on_female_model_on_the_floor.webp'
import minimal7 from '../public/img/physical/excessive-minimal/female_model_leaning_on_wood_black_and_white.webp'
import minimal8 from '../public/img/physical/excessive-minimal/female_model_tilted_camera_with_hand_on_hip.webp'
import minimal9 from '../public/img/physical/excessive-minimal/female_model_wrapped_in_scarf_and_coat_black_and_white.webp'
import minimal10 from '../public/img/physical/excessive-minimal/female_model_with_arms_above_her_head.webp'
import minimal11 from '../public/img/physical/excessive-minimal/abstract_projection_on_female_model_upper_body.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: minimal1, alt: 'coat with belt detail view black and white' },
  { src: minimal2, alt: 'female model hiding her face with her arms' },
  { src: minimal3, alt: 'female model turning in motion black and white' },
  { src: minimal4, alt: 'view on sun reflections on the floor and model making a big step' },
  { src: minimal5, alt: 'female model standing with her hands in pockets' },
  { src: minimal6, alt: 'abstract projection on female model on the floor' },
  { src: minimal7, alt: 'female model leaning on wood black and white' },
  { src: minimal8, alt: 'female model tilted camera with hand on hip' },
  { src: minimal9, alt: 'female model wrapped in scarf and coat black and white' },
  { src: minimal10, alt: 'female model with arms above her head' },
  { src: minimal11, alt: 'abstract projection on female model upper body' }
];

const subtitle = "Harmony in versatility: elegance from the contrasts of dynamism and calm, the complexity of modesty.";
const descriptionText = "Fashion & Styling Studio.Stuckn Photo Ruben Jacob Fees Model Stella Fath";
const description = { title: "Excessive Minimal", subtitle: subtitle, text: descriptionText };

function ExcessiveMinimal() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default ExcessiveMinimal;
