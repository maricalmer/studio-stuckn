import Link from 'next/link';
import avatar1Pic from '../public/img/digital/etherea-part-one/3d_elf_red_front_zoom.webp';
import heelsPic from '../public/img/digital/alien-accessories/3d_silver_boots_detail.webp';
import avatar2Pic from '../public/img/digital/etherea-part-two/marion.webp';
import couplePic from '../public/img/physical/flanelle/2_models_posing_togehter_sitting.webp';
import coatPic from '../public/img/physical/excessive-minimal/coat_with_belt_detail_view_black_and_white.webp';
import windowPic from '../public/img/physical/in-constant-flux/male_model_sit_on_window.webp';
import elbowOnChairPic from '../public/img/about/elbow_on_chair.webp';
import profilePic from '../public/img/about/profile.webp';
import lowHandsPic from '../public/img/about/low_hands.webp';
import NavImage from '@/components/NavImage';

const elements = [
  { src: avatar1Pic, alt: '3d avatar short hair', extraStyling: "navmenu__digital max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
  { src: heelsPic, alt: '3d sliver boots close shot', extraStyling: "navmenu__digital max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
  { src: avatar2Pic, alt: '3d avatar wearing earings', extraStyling: "navmenu__digital max-w-[21%] ml-[75%] bottom-[60px] delay-500"},
  { src: couplePic, alt: 'front picture of couple', extraStyling: "navmenu__physical max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
  { src: coatPic, alt: 'white coat', extraStyling: "navmenu__physical max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
  { src: windowPic, alt: 'front picture of model seating at the window', extraStyling: "navmenu__physical max-w-[21%] ml-[75%] bottom-[60px] delay-500"},
  { src: elbowOnChairPic, alt: 'ronja seats with elbow up', extraStyling: "navmenu__about max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
  { src: profilePic, alt: 'ronja seats with closed eyes', extraStyling: "navmenu__about max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
  { src: lowHandsPic, alt: 'ronja seats with low hands', extraStyling: "navmenu__about max-w-[21%] ml-[75%] bottom-[60px] delay-500"}
];

function NavMenus() {
  const handleHover = (e) => {
    const navbar = e.currentTarget.parentNode.parentNode;
    const className = e.currentTarget.textContent.toLowerCase();
    navbar.classList.toggle(`navbar__bg--${className}`);
  };

  return (
    <>
      <ul className="navmenu__container translate-y-[-150%] pl-[65%] pt-[120px] helvetica text-4xl transition-[transform] delay-300">
        <li onMouseOver={(e)=> {handleHover(e)}} onMouseOut={(e)=> {handleHover(e)}} className="w-fit navmenu__item mb-1 cursor-pointer opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
          <Link href="/digital">Digital</Link>
        </li>
        <li onMouseOver={(e)=> {handleHover(e)}} onMouseOut={(e)=> {handleHover(e)}} className="w-fit navmenu__item mb-1 cursor-pointer opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
          <Link href="/physical">Physical</Link>
        </li>
        <li onMouseOver={(e)=> {handleHover(e)}} onMouseOut={(e)=> {handleHover(e)}} className="w-fit navmenu__item cursor-pointer opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2] ">
          <Link href="/about">About</Link>
        </li>
      </ul>
      <div className="navmenu__images h-full w-full absolute top-0 left-0 flex absolute z-[-1]">
        {
          elements.map((element, index) => {
            return (<NavImage src={element.src} alt={element.alt} extraStyling={element.extraStyling} key={index}/>)
          })
        }
      </div>
    </>
  );
};

export default NavMenus;
