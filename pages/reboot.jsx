import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import rebootImg1 from '../public/img/physical/reboot/female_model_hiding_head_in_front_of_arms.webp';
import rebootImg2 from '../public/img/physical/reboot/male_model_looks_into_tilted_camera.webp';
import rebootImg3 from '../public/img/physical/reboot/full_body_view_of_female_model_from_the_front.webp';
import rebootImg4 from '../public/img/physical/reboot/female_and_male_face_close_up.webp';
import rebootImg5 from '../public/img/physical/reboot/male_model_shown_from_the_back_infront_of_sunreflection.webp';
import rebootImg6 from '../public/img/physical/reboot/female_model_bust_shot.webp';
import rebootImg7 from '../public/img/physical/reboot/male_model_in_motion.webp';
import rebootImg8 from '../public/img/physical/reboot/male_model_full_body_half_profile.webp';
import rebootImg9 from '../public/img/physical/reboot/male_model_bust_shot.webp';
import rebootImg10 from '../public/img/physical/reboot/female_model_from_half_profile_full_body.webp';
import rebootImg11 from '../public/img/physical/reboot/2_models_shown_full_body_looking_into_camera.webp';
import rebootImg12 from '../public/img/physical/reboot/male_model_turning_photographed_from_the_back.webp';
import rebootImg13 from '../public/img/physical/reboot/detail_view_of_trousrs_on_male_model.webp';
import rebootImg14 from '../public/img/physical/reboot/full_body_view_of_female_model_from_the_back.webp';
import rebootImg15 from '../public/img/physical/reboot/male_model_full_body_view.webp';
import rebootImg16 from '../public/img/physical/reboot/female_model_looks_into_tilted_camera.webp';
import rebootImg17 from '../public/img/physical/reboot/female_model_photographed_from_the_side_profile.webp';
import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: rebootImg1, alt: 'female model hiding head in front of arms' },
  { type: "image", src: rebootImg2, alt: 'male model looks into tilted camera' },
  { type: "image", src: rebootImg3, alt: 'full body view of female model from the front' },
  { type: "image", src: rebootImg4, alt: 'female and male face close up' },
  { type: "image", src: rebootImg5, alt: 'male model shown from the back in front of sun reflection' },
  { type: "image", src: rebootImg6, alt: 'female model bust shot' },
  { type: "image", src: rebootImg7, alt: 'male model in motion' },
  { type: "image", src: rebootImg8, alt: 'male model full body half profile' },
  { type: "image", src: rebootImg9, alt: 'male model bust shot' },
  { type: "image", src: rebootImg10, alt: 'female model from half profile full body' },
  { type: "image", src: rebootImg11, alt: '2 models shown full body looking into camera' },
  { type: "image", src: rebootImg12, alt: 'male model turning photographed from the back' },
  { type: "image", src: rebootImg13, alt: 'detail view of trousers on male model' },
  { type: "image", src: rebootImg14, alt: 'full body view of female model from the back' },
  { type: "image", src: rebootImg15, alt: 'male model full body view' },
  { type: "image", src: rebootImg16, alt: 'female model looks into tilted camera' },
  { type: "image", src: rebootImg17, alt: 'female model photographed from the side profile' }
];

const title = "Reboot";
const details = "Just as a computer may crash due to overload or software glitches, humans may face personal crises or challenges that necessitate a restart or reevaluation of their lives. The act of rebooting in the human context implies a deliberate and conscious effort to initiate change, discard outdated patterns, and embrace a revitalized version of oneself.";
const credits = [["All Fashion", "Studio.Stuckn"], ["Styling", "Studio.Stuckn"], ["Photo", "Jaap Bräutigam"], ["Models", "Lea Rösch & Ringo Lukas"], ["Makeup", "Ekaterina Igonina"]];
const previousProject = "seefashion";
const nextProject = "excessive-minimal";
const description = { title: title, details: details, credits: credits, previousProject: previousProject, nextProject: nextProject };

export default function Reboot() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel description={description} elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
};
