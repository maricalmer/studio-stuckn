// Carousel.jsx
'use client';
import Image from 'next/image'
import Link from 'next/link'
import marionPic from '../public/img/marion_big.webp'
import gangstaPic from '../public/img/gangsta.webp'
import alienBagPic from '../public/img/alien_bag.webp'

function Carousel(props) {
  return (
    <div className="carousel h-[60vh] flex mt-20 ml-64 gap-3 overflow-scroll overscroll-contain pr-40 relative">
      <svg width="120" height="66" viewBox="0 0 120 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[66px] w-[120px] sticky top-1/2 left-full mr-10">
        <path d="M0.799996 28.6L92.8 28.6C89.8 24 83 9 83 4C83 2.4 84 0.799995 85.8 0.799995C87.6 0.799995 89.2 3.59999 90 4.8C96.2 14 105.4 23.8 115 29.4C116.2 30 119.2 31.4 119.2 33C119.2 34.6 116.2 36 115 36.6C105.4 42.2 96.2 52 90 61.2C89.2 62.4 87.6 65.2 85.8 65.2C84 65.2 83 63.6 83 62C83 57 89.8 42 92.8 37.4L0.799996 37.4L0.799996 28.6Z" fill="white"/>
      </svg>
      <Image
        src={marionPic}
        alt="3d avatar earings"
        style={{
          width: 'auto',
          height: '100%',
        }}
      />
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
    </div>
  );
}

export default Carousel;
