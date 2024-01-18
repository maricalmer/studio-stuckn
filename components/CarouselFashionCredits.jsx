import Image from 'next/image';

export default function CarouselFashionCredits({fashionCredits}) {
  return (
      <div className="relative mt-20 md:mt-0 md:min-w-[400px] h-fit md:h-[60vh] md:ml-4">
        <div className="md:absolute bottom-0 pb-10 md:pb-0">
          <Image
            src={fashionCredits.logo}
            alt={fashionCredits.alt}
            className='carousel-item'
            style={{
              width: '30%',
              height: 'auto'
            }}
          />
          <div className="helvetica text-sm mt-4 mb-2">Fashion Credits</div>
          {Object.entries(fashionCredits.creditsPieces).map(([key, value]) => (
            <div key={key} className="helvetica text-xs flex">
              <div className="w-[40px]">{key}.</div>
              <div className="w-full">{value}</div>
            </div>
          ))}
        </div>
      </div>
  );
};
