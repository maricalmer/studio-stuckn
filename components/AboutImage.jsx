import Image from 'next/image';
import profilePic from '../public/img/about/elbow_on_chair.webp';

const handleImageSizing = (scrollValue, baseImgHeight) => {
  if (baseImgHeight) {
    const factor = 2;
    if (baseImgHeight + scrollValue / factor < baseImgHeight * 1.1) {
      return baseImgHeight * 1.1;
    } else if (baseImgHeight + scrollValue / factor > baseImgHeight * 2) {
      return baseImgHeight * 2;
    } else {
      return baseImgHeight + scrollValue/factor;
    }
  };
};

export default function AboutImage({scrollValue, baseImgHeight}) {
  return (
    <Image
      src={profilePic}
      alt="picture of ronja stuckn"
      className="about-image object-cover h-[180px] md:h-[40vh] min-h-[100px] w-auto sticky top-[8rem] mt-12"
      sizes="33vw"
      quality={100}
      priority={true}
      style={{
        width: 'auto',
        height: `${handleImageSizing(scrollValue, baseImgHeight)}px`,
      }}
    />
  );
};
