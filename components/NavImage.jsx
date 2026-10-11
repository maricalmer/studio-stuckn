import Image from 'next/image';

export default function NavImage({src, alt, extraStyling}) {
  const imageSrc = typeof src === 'string' ? src : src.src;
  const dimensions = typeof src === 'object' ? {
    width: src.width,
    height: src.height,
  } : {};

  return (
    <div className={`${extraStyling} absolute opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300]`} >
      <Image
        src={imageSrc}
        alt={alt}
        loading="lazy"
        fetchPriority="low"
        {...dimensions}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};
