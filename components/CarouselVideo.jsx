// CarouselItem.jsx
import React from 'react';

const CarouselVideo = ({ src, title }) => {
  return (
    <iframe
      className="h-full aspect-video focus:outline-none active:outline-none"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
    </iframe>
  );
};

export default CarouselVideo;
