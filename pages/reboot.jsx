'use client';
import reboot1 from '../public/img/physical/reboot/female_model_hiding_head_in_front_of_arms.webp'
import reboot2 from '../public/img/physical/reboot/male_model_looks_into_tilted_camera.webp'
import reboot3 from '../public/img/physical/reboot/full_body_view_of_female_model_from_the_front.webp'
import reboot4 from '../public/img/physical/reboot/female_and_male_face_close_up.webp'
import reboot5 from '../public/img/physical/reboot/male_model_shown_from_the_back_infront_of_sunreflection.webp'
import reboot6 from '../public/img/physical/reboot/female_model_bust_shot.webp'
import reboot7 from '../public/img/physical/reboot/male_model_in_motion.webp'
import reboot8 from '../public/img/physical/reboot/male_model_full_body_half_profile.webp'
import reboot9 from '../public/img/physical/reboot/male_model_bust_shot.webp'
import reboot10 from '../public/img/physical/reboot/female_model_from_half_profile_full_body.webp'
import reboot11 from '../public/img/physical/reboot/2_models_shown_full_body_looking_into_camera.webp'
import reboot12 from '../public/img/physical/reboot/male_model_turning_photographed_from_the_back.webp'
import reboot13 from '../public/img/physical/reboot/detail_view_of_trousrs_on_male_model.webp'
import reboot14 from '../public/img/physical/reboot/full_body_view_of_female_model_from_the_back.webp'
import reboot15 from '../public/img/physical/reboot/male_model_full_body_view.webp'
import reboot16 from '../public/img/physical/reboot/female_model_looks_into_tilted_camera.webp'
import reboot17 from '../public/img/physical/reboot/female_model_photographed_from_the_side_profile.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: reboot1, alt: 'female model hiding head in front of arms' },
  { src: reboot2, alt: 'male model looks into tilted camera' },
  { src: reboot3, alt: 'full body view of female model from the front' },
  { src: reboot4, alt: 'female and male face close up' },
  { src: reboot5, alt: 'male model shown from the back in front of sun reflection' },
  { src: reboot6, alt: 'female model bust shot' },
  { src: reboot7, alt: 'male model in motion' },
  { src: reboot8, alt: 'male model full body half profile' },
  { src: reboot9, alt: 'male model bust shot' },
  { src: reboot10, alt: 'female model from half profile full body' },
  { src: reboot11, alt: '2 models shown full body looking into camera' },
  { src: reboot12, alt: 'male model turning photographed from the back' },
  { src: reboot13, alt: 'detail view of trousers on male model' },
  { src: reboot14, alt: 'full body view of female model from the back' },
  { src: reboot15, alt: 'male model full body view' },
  { src: reboot16, alt: 'female model looks into tilted camera' },
  { src: reboot17, alt: 'female model photographed from the side profile' }
];

const subtitle = "Just as a computer may crash due to overload or software glitches, humans may face personal crises or challenges that necessitate a restart or reevaluation of their lives. The act of rebooting in the human context implies a deliberate and conscious effort to initiate change, discard outdated patterns, and embrace a revitalized version of oneself.";
const descriptionText = "Fashion & Styling Studio.Stuckn Photo Jaap Bräutigam Models Lea Rösch & Ringo Lukas Makeup Ekaterina Igonina";
const description = { title: "Reboot", subtitle: subtitle, text: descriptionText, previousProject: "seefashion", nextProject: "excessive-minimal" };

function Reboot() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Reboot;
