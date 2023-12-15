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
              width: 'auto',
              height: '10%'
            }}
          />
          <div className="helvetica text-sm mt-4 mb-2">Fashion Credits</div>
          {props.credits.creditsPieces.map((credit, index) => (
            <div key={index} className="helvetica text-xs">{index}. {credit}</div>
          ))}
        </div>
      </div>
  );
};

export default CarouselCredits;
