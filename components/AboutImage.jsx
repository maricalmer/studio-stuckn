// Brand.jsx
'use client';

import Image from 'next/image'
import profilePic from '../public/img/low_hands.webp'



const handleImageSizing = (scrollValue, baseImgHeight) => {
  console.log(baseImgHeight);
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
      className="about-image sticky top-40 h-[30vh] min-h-[100px]"
      style={{
        width: 'auto',
        height: `${handleImageSizing(props.scrollValue, props.baseImgHeight)}px`,
      }}
    />
  );
}

export default AboutImage;
