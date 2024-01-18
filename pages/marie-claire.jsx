import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import marieClaireImg1 from '../public/img/physical/marie-claire/model_stands_infront_of_field.webp';
import marieClaireImg2 from '../public/img/physical/marie-claire/2hands_holding_flowes_towards_the_sky.webp';
import marieClaireImg3 from '../public/img/physical/marie-claire/model_in_flower_field.webp';
import marieClaireImg4 from '../public/img/physical/marie-claire/model_photographed_from_bottom_armes_on_her_back.webp';
import marieClaireImg5 from '../public/img/physical/marie-claire/model_holding_scarf_floating_in_the_wind.webp';
import marieClaireLogo from '../public/img/physical/marie-claire/marie_claire_magazine_logo.webp';
import "../public/stylesheets/projects.css";

const elements = [
  { type: "image", src: marieClaireImg1, alt: 'model stands in front of field' },
  { type: "image", src: marieClaireImg2, alt: '2 hands holding flowers towards the sky' },
  { type: "image", src: marieClaireImg3, alt: 'model in flower field' },
  { type: "image", src: marieClaireImg4, alt: 'model photographed from bottom arms on her back' },
  { type: "image", src: marieClaireImg5, alt: 'model holding scarf floating in the wind' }
];

const title = "Marie Claire Magazine";
const subtitle = {text: 'ВЗЯТИ ГОРУ', cyrillic: true};
const details = "Print Issue Marie Claire Ukraine, 09/2021";
const credits = [["Photo", "Christiane Baumgart"], ["Styling", "Chiara Bottin"], ["Makeup", "Adina Hensel"], ["Model (Spin)", "Irene Opoku"], ["Retouche", "Irene Velweiss"]];
const previousProject = "flanelle";
const nextProject = "seefashion";
const description = { title: title, subtitle: subtitle, details: details, credits: credits, previousProject: previousProject, nextProject: nextProject };
const fashionCredits = {logo: marieClaireLogo, alt: "Marie Claire Magazine logo", creditsPieces: {1: "Shirt, Vest & Trousers Studio.Stuckn, Tie & Belt Gucci, Shoes Prada, Glasses Neubau Eyewear", 2: "Shirt Studio.Stuckn", 3: "Coat Truongii, Bag Burberry, Top Alina Wotschel, Trousers Acne Studios, Earrings Stephanie Kahnau", 4: "Dress Karl Lagerfeld", 5: "Orange Blouse Soeur, Striped Blouse Sessùn, Scarf Hermés"}};

export default function MarieClaire() {
  return (
    <PageContainer>
      <Breadcrumb />
      <Carousel description={description} elements={elements} fashionCredits={fashionCredits} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
};
