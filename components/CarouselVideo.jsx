// CarouselItem.jsx
import React from 'react';

const CarouselVideo = ({ src, title }) => {
  return (
    <iframe
      width="560"
      height="315"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
    </iframe>
  );
};

export default CarouselVideo;
