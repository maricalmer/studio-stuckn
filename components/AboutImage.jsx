// Brand.jsx
'use client';

import Image from 'next/image'
import profilePic from '../public/img/low_hands.webp'



const handleImageSizing = (scrollValue) => {
  const factor = 100;
  if (scrollValue + factor < 250) {
    return '250px';
  } else if (scrollValue + factor > 400) {
    return '400px';
  } else {
    return `${scrollValue + factor}px`;
  }
};

function AboutImage(props) {
  return (
    <Image
      src={profilePic}
      alt="ronja stuckn"
      className="sticky top-40 h-[250px]"
      style={{
        width: 'auto',
        height: `${handleImageSizing(props.scrollValue)}`,
      }}
    />
  );
}

export default AboutImage;
