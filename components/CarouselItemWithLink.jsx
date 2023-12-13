// CarouselItemWithLink.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

const CarouselItemWithLink = ({ src, alt, title, href }) => {
  return (
    <>
      <Link href={`${href}`} className="carousel-item__link min-w-fit h-full relative transition-opacity ease-in-out">
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
      </Link>
      <div className="carousel-item__title opacity-0 absolute bottom-0 quella text-white pl-3 pb-3 text-4xl transition-opacity ease-in-out">{title}</div>
    </>
  );
};

export default CarouselItemWithLink;
