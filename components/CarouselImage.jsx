import Image from 'next/image';

export default function CarouselImage({ src, alt, index }) {
  return (
    <div className="my-3 w-full md:my-0 md:w-auto md:min-w-fit md:h-full">
      <Image
        src={src}
        alt={alt}
        className='carousel-item'
        placeholder="blur"
        sizes="(max-width: 767px) 100vw, 33vw"
        quality={100}
        priority={ index < 4 }
      />
    </div>
  );
};
