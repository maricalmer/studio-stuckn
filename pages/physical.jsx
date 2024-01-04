import "../public/stylesheets/projects.css";

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import fluxPic from '../public/img/physical/in-constant-flux/male_model_sit_on_window.webp'
import flanellePic from '../public/img/physical/flanelle/model_from_profile_view_with_hat_hiding_the_face.webp'
import marieClairePic from '../public/img/physical/marie-claire/model_stands_infront_of_field.webp'
import seefashionPic from '../public/img/physical/seefashion/detail_shot_of_a_green_suit.webp'
import rebootPic from '../public/img/physical/reboot/female_model_bust_shot.webp'
import minimalPic from '../public/img/physical/excessive-minimal/coat_with_belt_detail_view_black_and_white.webp'
import pagePic from '../public/img/physical/page/reflection_of_a_female_model_from_the_bottom_holding_gemstone.webp'
import escapismPic from '../public/img/physical/escapism/model_in_wide_trousers_taking_big_step.webp'

const elements = [
  { type: "link", src: fluxPic, alt: 'male model sits on window', title: 'In Constant Flux', href: '/in-constant-flux' },
  { type: "link", src: flanellePic, alt: 'model from profile view with hat hiding the face', title: 'Flanelle Magazine', href: '/flanelle' },
  { type: "link", src: marieClairePic, alt: 'model stands in front of field', title: 'Marie Claire Magazine', href: '/marie-claire' },
  { type: "link", src: seefashionPic, alt: 'detail shot of a green suit', title: 'Seefashion', href: '/seefashion' },
  { type: "link", src: rebootPic, alt: 'female model bust shot', title: 'Reboot', href: '/reboot' },
  { type: "link", src: minimalPic, alt: 'coat with belt detail view black and white', title: 'Excessive Minimal', href: '/excessive-minimal' },
  { type: "link", src: pagePic, alt: 'reflection of a female model from the bottom holding gemstone', title: 'Page Magazine', href: '/page' },
  { type: "link", src: escapismPic, alt: 'model in wide trousers taking big step', title: 'Escapism', href: '/escapism' }
];

export default function Physical() {
  return (
    <PageContainer>
      <Breadcrumb activeItem="Physical"/>
      <Carousel elements={elements} />
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  )
}
