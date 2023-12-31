// CarouselCredits.jsx
import React from 'react';
import Image from 'next/image';

const CarouselCredits = (props) => {
  return (
      <div className="relative min-w-[400px] h-[60vh] ml-4">
        <div className="absolute bottom-0">
          <Image
            src={props.credits.logo}
            alt={props.credits.alt}
            className='carousel-item'
            style={{
              width: '30%',
              height: 'auto'
            }}
          />
          <div className="helvetica text-sm mt-4 mb-2">Fashion Credits</div>
          {Object.entries(props.credits.creditsPieces).map(([key, value]) => (
            <div key={key} className="helvetica text-xs">{key}. {value}</div>
          ))}
        </div>
      </div>
  );
};

export default CarouselCredits;
