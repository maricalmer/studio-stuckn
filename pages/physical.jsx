import "../public/stylesheets/projects.css";

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import fluxPic from '../public/img/physical/male_model_sit_on_window.webp'
import flanellePic from '../public/img/physical/model_from_profile_view_with_hat_hiding_the_face.webp'
import marieClairePic from '../public/img/physical/model_stands_infront_of_field.webp'
import seefashionPic from '../public/img/physical/detail_shot_of_a_green_suit.webp'
import rebootPic from '../public/img/physical/female_model_bust_shot.webp'
import minimalPic from '../public/img/physical/coat_with_belt_detail_view_black_and_white.webp'
import pagePic from '../public/img/physical/reflection_of_a_female_model_from_the_bottom_holding_gemstone.webp'
import escapismPic from '../public/img/physical/model_in_wide_trousers_taking_big_step.webp'

const images = [
  { src: fluxPic, alt: 'male model sits on window', title: 'In Constant Flux', href: '/in-constant-flux' },
  { src: flanellePic, alt: 'model from profile view with hat hiding the face', title: 'Flanelle Magazine', href: '/flanelle' },
  { src: marieClairePic, alt: 'model stands in front of field', title: 'Marie Claire Magazine', href: '/marie-claire' },
  { src: seefashionPic, alt: 'detail shot of a green suit', title: 'Seefashion', href: '/seefashion' },
  { src: rebootPic, alt: 'female model bust shot', title: 'Reboot', href: '/reboot' },
  { src: minimalPic, alt: 'coat with belt detail view black and white', title: 'Excessive Minimal', href: '/excessive-minimal' },
  { src: pagePic, alt: 'reflection of a female model from the bottom holding gemstone', title: 'Page Magazine', href: '/page' },
  { src: escapismPic, alt: 'model in wide trousers taking big step', title: 'Escapism', href: '/escapism' }
];

export default function Physical() {
  return (
    <PageContainer>
      <Breadcrumb activeItem="Physical"/>
      <Carousel images={images} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  )
}
