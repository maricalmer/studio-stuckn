'use client';
import flanellePic1 from '../public/img/physical/flanelle/2_models_posing_togehter_sitting.webp'
import flanellePic2 from '../public/img/physical/flanelle/male_model_hold_glove_in_the_camera.webp'
import flanellePic3 from '../public/img/physical/flanelle/female_model_looking_downinto_camera.webp'
import flanellePic4 from '../public/img/physical/flanelle/male_model_grabbing_female_model.webp'
import flanellePic5 from '../public/img/physical/model_from_profile_view_with_hat_hiding_the_face.webp'
import flanellePic6 from '../public/img/physical/flanelle/female_model_with_sunglasses_laying_on_the_floor_one_leg_angled.webp'
import flanellePic7 from '../public/img/physical/flanelle/detail_shot_of_print_top_laying_on_chair.webp'
import flanellePic8 from '../public/img/physical/flanelle/model_wearing_a_hat_and_a_scarf.webp'
import flanellePic9 from '../public/img/physical/flanelle/2_models_laying_on_the_floor_looking_up.webp'
import flanellePic10 from '../public/img/physical/flanelle/detail_view_of_print_top_on_model.webp'
import flanellePic11 from '../public/img/physical/flanelle/detail_view_of_female_model_under_mesh_garment.webp'
import flanellePic12 from '../public/img/physical/flanelle/print_scarf_floating_in_the_wind.webp'
import flanellePic13 from '../public/img/physical/flanelle/male_model_kneeing_above_camera.webp'
import flanellePic14 from '../public/img/physical/flanelle/male_model_holds_hands_in_front_of_his_face.webp'
import flanellePic15 from '../public/img/physical/flanelle/view_into_the_sky_with_sun_behind_clouds.webp'
import flanellePic16 from '../public/img/physical/flanelle/male_model_laying_on_floor.webp'
import flanelleLogo from '../public/img/physical/flanelle/flanelle_magazine_logo.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: flanellePic1, alt: '2 models posing together sitting' },
  { src: flanellePic2, alt: 'male model holds glove in the camera' },
  { src: flanellePic3, alt: 'female model looking down into camera' },
  { src: flanellePic4, alt: 'man holding woman on shoulder' },
  { src: flanellePic5, alt: 'model from profile view with hat hiding the face' },
  { src: flanellePic6, alt: 'female model with sunglasses laying on the floor one leg angled' },
  { src: flanellePic7, alt: 'detail shot of print top laying on chair' },
  { src: flanellePic8, alt: 'model wearing a hat and a scarf' },
  { src: flanellePic9, alt: '2 models laying on the floor looking up' },
  { src: flanellePic10, alt: 'detail view of print top on model' },
  { src: flanellePic11, alt: 'detail view of female model under mesh garment' },
  { src: flanellePic12, alt: 'print scarf floating in the wind' },
  { src: flanellePic13, alt: 'male model kneeing above camera' },
  { src: flanellePic14, alt: 'male model holds hands in front of his face' },
  { src: flanellePic15, alt: 'view into the sky with sun behind clouds' },
  { src: flanellePic16, alt: 'male model laying on floor' }
];

const descriptionText = "'Sunday Off, It's Raining Today' Print Issue No. 19 The Softness Edition";
const creditsText = "Photo Charlotte Hansel Styling Mercedes Quirante Makeup Claudia Fisher Models (Izaio) Aura Ell & Lin Novak";
const description = { title: "Flanelle Magazine", subtitle: descriptionText, text: creditsText, credits: "" };
const credits = {logo: flanelleLogo, alt: "Flanelle Magazine logo", creditsPieces: ["Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", "Earrings, Leather Trousers Studio.Stuckn, Top Kuntz", "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", "Top Studio.Stuckn", "Leather Trousers Studio.Stuckn, Vest, Glasses Stylist's own", "Necklace & Earcuff NUW'D, Glasses Stylist's own", "Leather Trousers Studio.Stuckn"]};


function Flanelle() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description} credits={credits}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Flanelle;
