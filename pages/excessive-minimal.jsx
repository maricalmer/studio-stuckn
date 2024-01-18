'use client';
import minimalImg1 from '../public/img/physical/excessive-minimal/coat_with_belt_detail_view_black_and_white.webp'
import minimalImg2 from '../public/img/physical/excessive-minimal/female_model_hiding_her_face_with_her_arms.webp'
import minimalImg3 from '../public/img/physical/excessive-minimal/female_model_turning_in_motion_black_and_white.webp'
import minimalImg4 from '../public/img/physical/excessive-minimal/view_on_sun_reflections_on_the_floor_and_model_making_a_big_step.webp'
import minimalImg5 from '../public/img/physical/excessive-minimal/female_model_standing_with_her_hands_in_pockets.webp'
import minimalImg6 from '../public/img/physical/excessive-minimal/abstract_projection_on_female_model_on_the_floor.webp'
import minimalImg7 from '../public/img/physical/excessive-minimal/female_model_leaning_on_wood_black_and_white.webp'
import minimalImg8 from '../public/img/physical/excessive-minimal/female_model_tilted_camera_with_hand_on_hip.webp'
import minimalImg9 from '../public/img/physical/excessive-minimal/female_model_wrapped_in_scarf_and_coat_black_and_white.webp'
import minimalImg10 from '../public/img/physical/excessive-minimal/female_model_with_arms_above_her_head.webp'
import minimalImg11 from '../public/img/physical/excessive-minimal/abstract_projection_on_female_model_upper_body.webp'
import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: minimalImg1, alt: 'coat with belt detail view black and white' },
  { type: "image", src: minimalImg2, alt: 'female model hiding her face with her arms' },
  { type: "image", src: minimalImg3, alt: 'female model turning in motion black and white' },
  { type: "image", src: minimalImg4, alt: 'view on sun reflections on the floor and model making a big step' },
  { type: "image", src: minimalImg5, alt: 'female model standing with her hands in pockets' },
  { type: "image", src: minimalImg6, alt: 'abstract projection on female model on the floor' },
  { type: "image", src: minimalImg7, alt: 'female model leaning on wood black and white' },
  { type: "image", src: minimalImg8, alt: 'female model tilted camera with hand on hip' },
  { type: "image", src: minimalImg9, alt: 'female model wrapped in scarf and coat black and white' },
  { type: "image", src: minimalImg10, alt: 'female model with arms above her head' },
  { type: "image", src: minimalImg11, alt: 'abstract projection on female model upper body' }
];

const title = "Excessive Minimal";
const details = "Harmony in versatility: elegance from the contrasts of dynamism and calm, the complexity of modesty.";
const credits = [["All Fashion", "Studio.Stuckn"], ["Styling", "Studio.Stuckn"], ["Photo", "Ruben Jacob Fees"], ["Model", "Stella Fath"]];
const previousProject = "reboot";
const nextProject = "page";
const description = { title: title, details: details, credits: credits, previousProject: previousProject, nextProject: nextProject };

function ExcessiveMinimal() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling={"opacity-1 border-black"} />
    </PageContainer>
  );
}

export default ExcessiveMinimal;
