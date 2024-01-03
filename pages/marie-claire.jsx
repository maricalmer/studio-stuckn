'use client';
import marieClairePic1 from '../public/img/physical/marie-claire/model_stands_infront_of_field.webp'
import marieClairePic2 from '../public/img/physical/marie-claire/2hands_holding_flowes_towards_the_sky.webp'
import marieClairePic3 from '../public/img/physical/marie-claire/model_in_flower_field.webp'
import marieClairePic4 from '../public/img/physical/marie-claire/model_photographed_from_bottom_armes_on_her_back.webp'
import marieClairePic5 from '../public/img/physical/marie-claire/model_holding_scarf_floating_in_the_wind.webp'
import marieClaireLogo from '../public/img/physical/marie-claire/marie_claire_magazine_logo.webp'

import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";

import "../public/stylesheets/projects.css";

const images = [
  { src: marieClairePic1, alt: 'model stands in front of field' },
  { src: marieClairePic2, alt: '2 hands holding flowers towards the sky' },
  { src: marieClairePic3, alt: 'model in flower field' },
  { src: marieClairePic4, alt: 'model photographed from bottom arms on her back' },
  { src: marieClairePic5, alt: 'model holding scarf floating in the wind' }
];

const subtitle = "'ВЗЯТИ ГОРУ'";
const descriptionText = "Print Issue Marie Claire Ukraine, 09/2021";
const creditsText = "Photo Christiane Baumgart Styling Chiara Bottin Makeup Adina Hensel Model (Spin) Irene Opoku Retouche Irene Velweiss";
const description = { title: "Marie Claire Magazine", subtitle: subtitle, text: descriptionText, credits: creditsText, previousProject: "flanelle", nextProject: "seefashion" };
const credits = {logo: marieClaireLogo, alt: "Marie Claire Magazine logo", creditsPieces: {1: "Shirt, Vest & Trousers Studio.Stuckn, Tie & Belt Gucci, Shoes Prada, Glasses Neubau Eyewear", 2: "Shirt Studio.Stuckn", 3: "Coat Truongii, Bag Burberry, Top Alina Wotschel, Trousers Acne Studios, Earrings Stephanie Kahnau", 4: "Dress Karl Lagerfeld", 5: "Orange Blouse Soeur, Striped Blouse Sessùn, Scarf Hermés"}};

function MarieClaire() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel images={images} description={description} credits={credits}/>
      <StaticBrand opacity={"opacity-1"} />
    </PageContainer>
  );
}

export default MarieClaire;
