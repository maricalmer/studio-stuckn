import Link from 'next/link';
import avatar1Pic from '../public/img/nav/digital-avatar.webp';
import heelsPic from '../public/img/nav/digital-boots.webp';
import avatar2Pic from '../public/img/nav/digital-avatar-earrings.webp';
import couplePic from '../public/img/nav/physical-couple.webp';
import coatPic from '../public/img/nav/physical-coat.webp';
import windowPic from '../public/img/nav/physical-window.webp';
import elbowOnChairPic from '../public/img/nav/about-elbow.webp';
import profilePic from '../public/img/nav/about-profile.webp';
import lowHandsPic from '../public/img/nav/about-hands.webp';
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

export default function NavMenus({ isOpen }) {
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
      {isOpen && (
        <div className="navmenu__images h-full w-full absolute top-0 left-0 flex absolute z-[-1]">
          {elements.map((element, index) => (
            <NavImage
              src={element.src}
              alt={element.alt}
              extraStyling={element.extraStyling}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
};
