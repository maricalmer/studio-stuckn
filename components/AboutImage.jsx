// Brand.jsx
'use client';

import Image from 'next/image'
import profilePic from '../public/img/about/elbow_on_chair.webp'



const handleImageSizing = (scrollValue, baseImgHeight) => {
  if (baseImgHeight) {
    const factor = 2;
    if (baseImgHeight + scrollValue / factor < baseImgHeight * 1.1) {
      return baseImgHeight * 1.1;
    } else if (baseImgHeight + scrollValue / factor > baseImgHeight * 2) {
      return baseImgHeight * 2;
    } else {
      return baseImgHeight + scrollValue/factor
    }
  };
};

function AboutImage(props) {
  return (
    <Image
      src={profilePic}
      alt="ronja stuckn"
      className="about-image h-[40vh] min-h-[100px] w-auto sticky top-[4rem] mt-12"
      style={{
        height: `${handleImageSizing(props.scrollValue, props.baseImgHeight)}px`,
      }}
    />
  );
}

export default AboutImage;
