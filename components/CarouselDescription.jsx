// CarouselDescription.jsx
import React from 'react';
import Link from 'next/link'

const CarouselDescription = ({ title, subtitle, details, softwares, credits, previousProject, nextProject }) => {
  return (
    <div className="w-[220px] h-[60vh] fixed left-[100px]">
      <div className="quella text-4xl mt-5 relative z-20 p-3">{title}</div>
      {subtitle && <div className={subtitle.cyrillic ? "helvetica text-sm mb-3 relative z-20 leading-4 px-3 font-bold" : "helvetica text-sm mb-3 relative z-20 leading-4 px-3"}>{subtitle.text}</div>}
      <div className="helvetica text-sm mb-3 relative z-20 leading-4 px-3">{details}</div>
      {softwares && <div className="helvetica text-sm relative z-20 leading-4 px-3">{softwares}</div>}
      {credits && credits.map((credit, index) => {
        return(
          <div className="helvetica relative leading-3 z-20 px-3" key={index}>
            <span className="text-[0.6rem] leading-3">{credit[0]}</span>
            <span className="text-xs ml-1 leading-3">{credit[1]}</span>
          </div>
        )
      })}
      <div className="flex w-full justify-center absolute bottom-2">
        {previousProject && <Link href={`${previousProject}`} className="helvetica text-sm relative z-20 leading-4 mx-3 underline decoration-2">Previous</Link>}
        {nextProject && <Link href={`${nextProject}`} className="helvetica text-sm relative z-20 leading-4 mx-3 underline decoration-2">Next</Link>}
      </div>
      <div className="w-full h-full bg-white top-0 opacity-70 absolute z-10 px-3"></div>
    </div>
  );
};

export default CarouselDescription;
