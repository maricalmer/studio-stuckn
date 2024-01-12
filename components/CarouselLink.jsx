// CarouselLink.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

const CarouselLink = ({ src, alt, title, href, index }) => {
  return (
    <>
      <Link href={`${href}`} className="carousel-item__link block w-full h-fit my-3 md:my-0 md:w-auto md:min-w-fit md:h-full relative transition-opacity ease-in-out">
        <Image
          src={src}
          alt={alt}
          className='carousel-item'
          placeholder="blur"
          sizes="(max-width: 767px) 100vw, 33vw"
          quality={100}
          priority={ index < 4 }
        />
        <div className="carousel-item__title md:opacity-0 absolute bottom-0 md:top-auto quella text-white pl-1 md:pl-3 pb-3 text-4xl transition-opacity ease-in-out">{title}</div>
      </Link>
    </>
  );
};

export default CarouselLink;
