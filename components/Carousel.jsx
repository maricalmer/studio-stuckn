import CarouselLink from '@/components/CarouselLink';
import CarouselImage from '@/components/CarouselImage';
import CarouselVideo from '@/components/CarouselVideo';
import CarouselDescription from '@/components/CarouselDescription';
import CarouselFashionCredits from '@/components/CarouselFashionCredits';

const handleWheel = (event) => {
  event.currentTarget.scrollLeft += event.deltaY;
}

const handleClick = (event, direction) => {
  const carousel = event.currentTarget.parentElement.parentElement;
  let newScrollPosition;
  direction == "left" ? newScrollPosition = carousel.scrollLeft - 600 : newScrollPosition = carousel.scrollLeft + 600;
  carousel.scrollTo({left: newScrollPosition, behavior: "smooth"});
};

export default function Carousel({description, elements, fashionCredits}) {
  return (
    <div onWheel={e=>handleWheel(e)} className="carousel md:h-[60vh] md:flex px-6 md:px-0 mt-36 gap-3 md:overflow-scroll md:overscroll-contain relative">
      {description && <CarouselDescription title={description.title} subtitle={description.subtitle} details={description.details} softwares={description.softwares} credits={description.credits} previousProject={description.previousProject} nextProject={description.nextProject}/>}
      <div className="hidden md:flex h-full items-center">
        <svg onClick={e=>handleClick(e, "left")} width="66" height="36" viewBox="0 0 66 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[66px] fixed left-0 ml-3 z-10 cursor-pointer">
          <path d="M65.16 20.42L14.56 20.42C16.21 22.95 19.95 31.2 19.95 33.95C19.95 34.83 19.4 35.71 18.41 35.71C17.42 35.71 16.54 34.17 16.1 33.51C12.69 28.45 7.63 23.06 2.35 19.98C1.69 19.65 0.0400003 18.88 0.0400003 18C0.0400003 17.12 1.69 16.35 2.35 16.02C7.63 12.94 12.69 7.55 16.1 2.49C16.54 1.83 17.42 0.290001 18.41 0.290001C19.4 0.290001 19.95 1.17 19.95 2.05C19.95 4.8 16.21 13.05 14.56 15.58L65.16 15.58V20.42Z" fill="white"/>
        </svg>
      </div>
      <div className="hidden md:flex h-full items-center">
        <svg onClick={e=>handleClick(e, "right")} width="66" height="36" viewBox="0 0 66 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[66px] fixed right-0 mr-3 z-10 cursor-pointer">
          <path d="M0.839998 15.58L51.44 15.58C49.79 13.05 46.05 4.8 46.05 2.05C46.05 1.17 46.6 0.289997 47.59 0.289997C48.58 0.289997 49.46 1.83 49.9 2.49C53.31 7.55 58.37 12.94 63.65 16.02C64.31 16.35 65.96 17.12 65.96 18C65.96 18.88 64.31 19.65 63.65 19.98C58.37 23.06 53.31 28.45 49.9 33.51C49.46 34.17 48.58 35.71 47.59 35.71C46.6 35.71 46.05 34.83 46.05 33.95C46.05 31.2 49.79 22.95 51.44 20.42L0.839998 20.42V15.58Z" fill="white"/>
        </svg>
      </div>
      <div className="hidden md:block md:min-w-[310px] h-full"></div>
      {
        elements.map((element, index) => {
          if (element.type === "link") {
            return (<CarouselLink src={element.src} alt={element.alt} title={element.title} href={element.href} index={index} key={index}/>);
          } else if (element.type === "video") {
            return (<CarouselVideo src={element.src} title={element.title} key={index}/>);
          } else {
            return (<CarouselImage src={element.src} alt={element.alt} index={index} key={index}/>);
          };
        })
      }
      {fashionCredits && <CarouselFashionCredits fashionCredits={fashionCredits}/>}
      <div className="min-w-[310px] h-full"></div>
    </div>
  );
};
