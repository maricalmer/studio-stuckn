'use client';
import flanellePic1 from '../public/img/flanelle_carousel_1.webp'
import flanellePic2 from '../public/img/flanelle_carousel_2.webp'
import flanellePic3 from '../public/img/flanelle_carousel_3.webp'
import flanellePic4 from '../public/img/flanelle_carousel_4.webp'
import flanellePic5 from '../public/img/flanelle_carousel_5.webp'
import flanellePic6 from '../public/img/flanelle_carousel_6.webp'
import flanellePic7 from '../public/img/flanelle_carousel_7.webp'
import flanellePic8 from '../public/img/flanelle_carousel_8.webp'
import flanellePic9 from '../public/img/flanelle_carousel_9.webp'
import flanellePic10 from '../public/img/flanelle_carousel_10.webp'
import flanellePic11 from '../public/img/flanelle_carousel_11.webp'
import flanellePic12 from '../public/img/flanelle_carousel_12.webp'
import flanellePic13 from '../public/img/flanelle_carousel_13.webp'
import flanellePic14 from '../public/img/flanelle_carousel_14.webp'
import flanellePic15 from '../public/img/flanelle_carousel_15.webp'
import pageLogo from '../public/img/page_logo.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: flanellePic1, alt: 'couple seated front' },
  { src: flanellePic2, alt: 'man showing glove' },
  { src: flanellePic3, alt: 'woman seated front' },
  { src: flanellePic4, alt: 'man holding woman on shoulder' },
  { src: flanellePic5, alt: 'woman laying' },
  { src: flanellePic6, alt: 'chair' },
  { src: flanellePic7, alt: 'man with hat' },
  { src: flanellePic8, alt: 'couple laying' },
  { src: flanellePic9, alt: 'man body back' },
  { src: flanellePic10, alt: 'woman close up face' },
  { src: flanellePic11, alt: 'fabric' },
  { src: flanellePic12, alt: 'man profile' },
  { src: flanellePic13, alt: 'man hiding behind hands' },
  { src: flanellePic14, alt: 'sky' },
  { src: flanellePic15, alt: 'man laying' }
];

const descriptionText = "'Sunday Off, It's Raining Today' Print Issue No. 19 The Softness Edition";
const creditsText = "Photo Charlotte Hansel Styling Mercedes Quirante Makeup Claudia Fisher Models (Izaio) Aura Ell & Lin Novak";
const description = { title: "Flanelle Magazine", subtitle: descriptionText, text: creditsText, credits: "" };
const credits = {logo: pageLogo, alt: "Page Magazine logo", creditsPieces: ["Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", "Earrings, Leather Trousers Studio.Stuckn, Top Kuntz", "Longsleeve & Denim Trousers Studio.Stuckn, Boots Buffalo", "Top Studio.Stuckn", "Leather Trousers Studio.Stuckn, Vest, Glasses Stylist's own", "Necklace & Earcuff NUW'D, Glasses Stylist's own", "Leather Trousers Studio.Stuckn"]};


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
