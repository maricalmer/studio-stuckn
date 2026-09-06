import Link from 'next/link';
import CmsImage from '@/components/CmsImage';

export default function CarouselLink({ src, alt, title, href, index }) {
  return (
    <Link href={`${href}`} className="carousel-item__link block w-full h-fit my-10 md:my-0 md:w-auto md:min-w-fit md:h-full relative transition-opacity ease-in-out">
      <CmsImage
        image={src}
        alt={alt}
        className='carousel-item'
        sizes="(max-width: 767px) 100vw, 33vw"
        priority={index === 0}
      />
      <h2 className="carousel-item__title md:opacity-0 absolute bottom-0 md:top-auto quella text-white pl-1 md:pl-3 pb-3 text-4xl transition-opacity ease-in-out">{title}</h2>
    </Link>
  );
};
