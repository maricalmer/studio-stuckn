import CmsImage from '@/components/CmsImage';

export default function CarouselImage({ src, alt, index }) {
  return (
    <div className="my-10 w-full md:my-0 md:w-auto md:min-w-fit md:h-full">
      <CmsImage
        image={src}
        alt={alt}
        className='carousel-item'
        sizes="(max-width: 767px) 100vw, 33vw"
        priority={index === 0}
      />
    </div>
  );
};
