// Brand.jsx
'use client';

import Image from 'next/image'
import profilePic from '../public/img/low_hands.webp'

const handleImageSizing = (scrollValue) => {
  const factor = 7;
  return scrollValue / factor < 200 ? '200px' : `${scrollValue / factor}`;

};

function AboutImage(props) {
  return (
    <>
      <Image
        src={profilePic}
        alt="ronja stuckn"
        className="sticky top-40 h-[200px]"
        style={{
          width: 'auto',
          height: `${handleImageSizing(props.scrollValue)}`,
        }}
      />
    </>
  );
}

export default AboutImage;
