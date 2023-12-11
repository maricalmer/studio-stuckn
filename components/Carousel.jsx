// Carousel.jsx
'use client';
import Image from 'next/image'
import marionPic from '../public/img/marion_big.webp'
import gangstaPic from '../public/img/gangsta.webp'
import alienBagPic from '../public/img/alien_bag.webp'

const handleClick = (event, direction) => {
  const carousel = event.currentTarget.parentElement.parentElement;
  let newScrollPosition;
  direction == "left" ? newScrollPosition = carousel.scrollLeft - 400 : newScrollPosition = carousel.scrollLeft + 400;
  carousel.scrollTo({left: newScrollPosition, behavior: "smooth"});
};

function Carousel(props) {
  return (
    <div className="carousel h-[60vh] flex mt-20 gap-3 overflow-scroll overscroll-contain relative">
      <svg width="66" height="36" viewBox="0 0 66 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[66px] fixed left-0 ml-10 h-[inherit] z-10">
        <path onClick={e=>handleClick(e, "left")} d="M65.16 20.42L14.56 20.42C16.21 22.95 19.95 31.2 19.95 33.95C19.95 34.83 19.4 35.71 18.41 35.71C17.42 35.71 16.54 34.17 16.1 33.51C12.69 28.45 7.63 23.06 2.35 19.98C1.69 19.65 0.0400003 18.88 0.0400003 18C0.0400003 17.12 1.69 16.35 2.35 16.02C7.63 12.94 12.69 7.55 16.1 2.49C16.54 1.83 17.42 0.290001 18.41 0.290001C19.4 0.290001 19.95 1.17 19.95 2.05C19.95 4.8 16.21 13.05 14.56 15.58L65.16 15.58V20.42Z" fill="white" className="cursor-pointer"/>
      </svg>
      <svg width="66" height="36" viewBox="0 0 66 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[66px] fixed right-0 mr-10 h-[inherit] z-10">
        <path onClick={e=>handleClick(e, "right")} d="M0.839998 15.58L51.44 15.58C49.79 13.05 46.05 4.8 46.05 2.05C46.05 1.17 46.6 0.289997 47.59 0.289997C48.58 0.289997 49.46 1.83 49.9 2.49C53.31 7.55 58.37 12.94 63.65 16.02C64.31 16.35 65.96 17.12 65.96 18C65.96 18.88 64.31 19.65 63.65 19.98C58.37 23.06 53.31 28.45 49.9 33.51C49.46 34.17 48.58 35.71 47.59 35.71C46.6 35.71 46.05 34.83 46.05 33.95C46.05 31.2 49.79 22.95 51.44 20.42L0.839998 20.42V15.58Z" fill="white" className="cursor-pointer"/>
      </svg>
      <div className="min-w-[275px] h-full "></div>
      <div className="project-container min-w-fit h-full relative cursor-pointer transition-opacity ease-in-out">
        <Image
          src={marionPic}
          alt="3d avatar earings"
          className='project'
          placeholder="blur"
          style={{
            width: 'auto',
            height: '100%'
          }}
        />
        <div className="project-title opacity-0 absolute bottom-0 quella text-white pl-3 pb-3 text-4xl transition-opacity ease-in-out">Etherea Part I</div>
      </div>
      <Image
        src={gangstaPic}
        alt="3d avatar gangsta pose"
        style={{
          width: 'auto',
          height: '100%',
        }}
      />
      <Image
        src={alienBagPic}
        alt="3d alien bag with green background"
        style={{
          width: 'auto',
          height: '100%',
        }}
      />
      <div className="min-w-[275px] h-full "></div>
    </div>
  );
}

export default Carousel;
