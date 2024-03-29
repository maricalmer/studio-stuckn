export default function CarouselVideo({ src, title }) {
  return (
    <iframe
      className="w-full md:w-auto md:h-full aspect-video focus:outline-none active:outline-none"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
    </iframe>
  );
};
