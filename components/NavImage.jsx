import Image from 'next/image';

export default function NavImage({src, alt, extraStyling}) {
  return (
    <div className={`${extraStyling} absolute opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300]`} >
      <Image
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};
