'use client';
import seeFashionImg1 from '../public/img/physical/seefashion/model_bust_shot_looking_into_the_camera.webp'
import seeFashionImg2 from '../public/img/physical/seefashion/diverse_model_indress.webp'
import seeFashionImg3 from '../public/img/physical/seefashion/diverse_model_looking_to_the_side.webp'
import seeFashionImg4 from '../public/img/physical/seefashion/3_model_looking_into_the_camera.webp'
import seeFashionImg5 from '../public/img/physical/seefashion/runway_shot_of_model_walking.webp'
import seeFashionImg6 from '../public/img/physical/seefashion/diverse_model_in_dress_and_vest.webp'
import seeFashionImg7 from '../public/img/physical/seefashion/runway_shot_of_2_models_walking.webp'
import seeFashionImg8 from '../public/img/physical/seefashion/detail_shot_of_a_green_suit.webp'
import seeFashionImg9 from '../public/img/physical/seefashion/4_model_full_body_shot.webp'
import seeFashionImg10 from '../public/img/physical/seefashion/diverse_model_in_draped_top.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const elements = [
  { type: "video", src: "https://www.youtube-nocookie.com/embed/DX26uejAMs4?si=1vpGJCE8qizqMnIV", title: 'SeeFashion Runway by Ronja Stucken' },
  { type: "image", src: seeFashionImg1, alt: 'model bust shot looking into the camera' },
  { type: "image", src: seeFashionImg2, alt: 'diverse model indress' },
  { type: "image", src: seeFashionImg3, alt: 'diverse model looking to the side' },
  { type: "image", src: seeFashionImg4, alt: '3 models looking into the camera' },
  { type: "image", src: seeFashionImg5, alt: 'runway shot of model walking' },
  { type: "image", src: seeFashionImg6, alt: 'diverse model in dress and vest' },
  { type: "image", src: seeFashionImg7, alt: 'runway shot of 2 models walking' },
  { type: "image", src: seeFashionImg8, alt: 'detail shot of a green suit' },
  { type: "image", src: seeFashionImg9, alt: '4 models full body shot' },
  { type: "image", src: seeFashionImg10, alt: 'diverse model in draped top' }
];

const subtitle = "Hybrid Runway show in 21 - openair showcased at 'Haus der Statistik', Alexanderplatz, Berlin and online as livestream.";
const descriptionText = "Runway video Fashion & Styling Studio.Stuckn Video Petandflo Location Cinegate Set photography Tiffany Chaves Backstage photography Tabi Charaf Hair & Makeup Mud Studio Berlin Models Viva Models In cooperation with Bluescope Berlin and Kathi Kaeppel Runway soundtrack Cleon";
const description = { title: "See Fashion", subtitle: subtitle, text: descriptionText, previousProject: "marie-claire", nextProject: "reboot" };

function Seefashion() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel elements={elements} description={description}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Seefashion;
