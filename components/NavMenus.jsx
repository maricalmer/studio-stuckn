// NavMenus.jsx
'use client';
import Image from 'next/image'
import Link from 'next/link'
import heelsPic from '../public/img/digital/alien-accessories/3d_silver_boots_detail.webp'
import lucyPic from '../public/img/digital/etherea-part-one/3d_elf_red_front_zoom.webp'
import marionPic from '../public/img/digital/etherea-part-two/marion.webp'
import coatPic from '../public/img/physical/excessive-minimal/coat_with_belt_detail_view_black_and_white.webp'
import hanselPic from '../public/img/physical/flanelle/2_models_posing_togehter_sitting.webp'
import fluxPic from '../public/img/physical/in-constant-flux/male_model_sit_on_window.webp'
import elbowOnChairPic from '../public/img/about/elbow_on_chair.webp'
import lowHandsPic from '../public/img/about/low_hands.webp'
import profilePic from '../public/img/about/profile.webp'

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
        <div className="navmenu__digital navmenu__digital--lucy max-w-[28%] ml-[8%] absolute bottom-[210px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-200" >
          <Image
            src={lucyPic}
            alt="3d avatar 1"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__digital navmenu__digital--heels max-w-[21%] ml-[42%] absolute bottom-[15px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-300" >
          <Image
            src={heelsPic}
            alt="3d heels"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__digital navmenu__digital--marion max-w-[21%] ml-[75%] absolute bottom-[60px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-500" >
          <Image
            src={marionPic}
            alt="3d avatar earings"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__physical navmenu__physical--lucy max-w-[28%] ml-[8%] absolute bottom-[210px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-200" >
          <Image
            src={hanselPic}
            alt="couple"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__physical navmenu__physical--heels max-w-[21%] ml-[42%] absolute bottom-[15px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-300" >
          <Image
            src={coatPic}
            alt="coat"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__physical navmenu__physical--marion max-w-[21%] ml-[75%] absolute bottom-[60px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-500" >
          <Image
            src={fluxPic}
            alt="model window"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__about navmenu__about--lucy max-w-[28%] ml-[8%] absolute bottom-[210px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-200" >
          <Image
            src={elbowOnChairPic}
            alt="ronja with crossed arms"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__about navmenu__about--heels max-w-[21%] ml-[42%] absolute bottom-[15px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-300" >
          <Image
            src={profilePic}
            alt="ronja profile"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="navmenu__about navmenu__about--marion max-w-[21%] ml-[75%] absolute bottom-[60px] opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300] delay-500" >
          <Image
            src={lowHandsPic}
            alt="ronja hand on chin"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default NavMenus;
