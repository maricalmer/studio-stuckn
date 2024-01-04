// CarouselItem.jsx
import React from 'react';
import Image from 'next/image';

const CarouselImage = ({ src, alt }) => {
  return (
    <div className="min-w-fit h-full">
      <Image
        src={src}
        alt={alt}
        className='carousel-item'
        placeholder="blur"
        style={{
          width: 'auto',
          height: '100%'
        }}
      />
    </div>
  );
};

export default CarouselImage;
