'use client';
import seeFashion1 from '../public/img/flux_carousel_1.webp'
import seeFashion2 from '../public/img/physical/seefashion/model_bust_shot_looking_into_the_camera.webp'
import seeFashion3 from '../public/img/physical/seefashion/diverse_model_indress.webp'
import seeFashion4 from '../public/img/physical/seefashion/diverse_model_looking_to_the_side.webp'
import seeFashion5 from '../public/img/physical/seefashion/3_model_looking_into_the_camera.webp'
import seeFashion6 from '../public/img/physical/seefashion/runway_shot_of_model_walking.webp'
import seeFashion7 from '../public/img/physical/seefashion/diverse_model_in_dress_and_vest.webp'
import seeFashion8 from '../public/img/physical/seefashion/runway_shot_of_2_models_walking.webp'
import seeFashion9 from '../public/img/physical/seefashion/detail_shot_of_a_green_suit.webp'
import seeFashion10 from '../public/img/physical/seefashion/4_model_full_body_shot.webp'
import seeFashion11 from '../public/img/physical/seefashion/diverse_model_in_draped_top.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: seeFashion1, alt: 'video thumbnail' },
  { src: seeFashion2, alt: 'model bust shot looking into the camera' },
  { src: seeFashion3, alt: 'diverse model indress' },
  { src: seeFashion4, alt: 'diverse model looking to the side' },
  { src: seeFashion5, alt: '3 models looking into the camera' },
  { src: seeFashion6, alt: 'runway shot of model walking' },
  { src: seeFashion7, alt: 'diverse model in dress and vest' },
  { src: seeFashion8, alt: 'runway shot of 2 models walking' },
  { src: seeFashion9, alt: 'detail shot of a green suit' },
  { src: seeFashion10, alt: '4 models full body shot' },
  { src: seeFashion11, alt: 'diverse model in draped top' }
];

const subtitle = "Hybrid Runway show in 21 - openair showcased at 'Haus der Statistik', Alexanderplatz, Berlin and online as livestream.";
const descriptionText = "Runway video Fashion & Styling Studio.Stuckn Video Petandflo Location Cinegate Set photography Tiffany Chaves Backstage photography Tabi Charaf Hair & Makeup Mud Studio Berlin Models Viva Models In cooperation with Bluescope Berlin and Kathi Kaeppel Runway soundtrack Cleon";
const description = { title: "See Fashion", subtitle: subtitle, text: descriptionText };

function Seefashion() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default Seefashion;
