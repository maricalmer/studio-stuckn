import Image from 'next/image'

function NavImage({src, alt, extraClass}) {
  return (
    <div className={`${extraClass} absolute opacity-0 translate-y-[100px] transition-[opacity,transform] duration-[100,300]`} >
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
}

export default NavImage;
