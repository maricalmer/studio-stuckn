import Link from 'next/link';
import avatar1Pic from '../public/img/nav/digital-avatar.webp';
import heelsPic from '../public/img/nav/digital-boots.webp';
import avatar2Pic from '../public/img/nav/digital-avatar-earrings.webp';
import physicalFirstPic from '../public/img/physical/flanelle/2_models_posing_togehter_sitting.webp';
import coatPic from '../public/img/nav/physical-coat.webp';
import windowPic from '../public/img/nav/physical-window.webp';
import elbowOnChairPic from '../public/img/nav/about-elbow.webp';
import profilePic from '../public/img/nav/about-profile.webp';
import lowHandsPic from '../public/img/nav/about-hands.webp';
import NavImage from '@/components/NavImage';

const localElements = {
  digital: [
    { src: avatar1Pic, alt: '3d avatar short hair', extraStyling: "max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
    { src: heelsPic, alt: '3d sliver boots close shot', extraStyling: "max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
    { src: avatar2Pic, alt: '3d avatar wearing earings', extraStyling: "max-w-[21%] ml-[75%] bottom-[60px] delay-500"},
  ],
  physical: [
    { src: physicalFirstPic, alt: '2 models posing together sitting', extraStyling: "max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
    { src: coatPic, alt: 'white coat', extraStyling: "max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
    { src: windowPic, alt: 'front picture of model seating at the window', extraStyling: "max-w-[21%] ml-[75%] bottom-[60px] delay-500"},
  ],
  about: [
    { src: elbowOnChairPic, alt: 'ronja seats with elbow up', extraStyling: "max-w-[28%] ml-[8%] bottom-[210px] delay-200"},
    { src: profilePic, alt: 'ronja seats with closed eyes', extraStyling: "max-w-[21%] ml-[42%] bottom-[15px] delay-300"},
    { src: lowHandsPic, alt: 'ronja seats with low hands', extraStyling: "max-w-[21%] ml-[75%] bottom-[60px] delay-500"},
  ],
};

function menuElements(category, settings) {
  const local = localElements[category.slug] ?? [];
  const navbarImages = {
    digital: settings?.navbarDigitalImages,
    physical: settings?.navbarPhysicalImages,
  }[category.slug] ?? [];
  const legacyNavbarImage = {
    digital: settings?.navbarDigitalImage,
    physical: settings?.navbarPhysicalImage,
  }[category.slug];
  return local.map((element, index) => ({
    ...element,
    src: navbarImages[index]?.image?.src
      ? navbarImages[index].image
      : index === 0 && legacyNavbarImage?.image?.src
        ? legacyNavbarImage.image
        : element.src,
    alt: navbarImages[index]?.alt
      ? navbarImages[index].alt
      : index === 0 && legacyNavbarImage?.alt
        ? legacyNavbarImage.alt
        : element.alt,
    extraStyling: `navmenu__${category.slug} ${element.extraStyling}`,
  }));
}

function aboutMenuElements(settings) {
  const navbarImages = settings?.navbarAboutImages ?? [];
  const legacyNavbarImage = settings?.navbarAboutImage;
  return localElements.about.map((element, index) => ({
    ...element,
    src: navbarImages[index]?.image?.src
      ? navbarImages[index].image
      : index === 0 && legacyNavbarImage?.image?.src
        ? legacyNavbarImage.image
        : element.src,
    alt: navbarImages[index]?.alt
      ? navbarImages[index].alt
      : index === 0 && legacyNavbarImage?.alt
        ? legacyNavbarImage.alt
        : element.alt,
    extraStyling: `navmenu__about ${element.extraStyling}`,
  }));
}

function optionalMenuElements(slug, navbarImages, legacyNavbarImage) {
  const configuredImages = navbarImages?.length
    ? navbarImages
    : legacyNavbarImage
      ? [legacyNavbarImage]
      : [];
  const positions = [
    "max-w-[28%] ml-[8%] bottom-[210px] delay-200",
    "max-w-[21%] ml-[42%] bottom-[15px] delay-300",
    "max-w-[21%] ml-[75%] bottom-[60px] delay-500",
  ];
  return configuredImages.slice(0, 3).flatMap((navbarImage, index) =>
    navbarImage?.image?.src
      ? [{
          src: navbarImage.image,
          alt: navbarImage.alt || `${slug} menu image ${index + 1}`,
          extraStyling: `navmenu__${slug} ${positions[index]}`,
        }]
      : [],
  );
}

export default function NavMenus({ isOpen, categories = [], settings }) {
  const menuCategories = categories.filter((category) => localElements[category.slug]);
  const menuItems = menuCategories.flatMap((category) =>
    category.slug === "physical"
      ? [{id: "demo-reel", slug: "demo-reel", title: "Demo Reel"}, category]
      : [category],
  );
  const handleHover = (e) => {
    const navbar = e.currentTarget.parentNode.parentNode;
    const className = e.currentTarget.dataset.slug;
    navbar.classList.toggle(`navbar__bg--${className}`);
  };

  return (
    <>
      <ul className="navmenu__container translate-y-[-150%] pl-[65%] pt-[120px] helvetica text-4xl transition-[transform] delay-300">
        {menuItems.map((item) => (
          <li key={item.id} data-slug={item.slug} onMouseOver={handleHover} onMouseOut={handleHover} className="w-fit navmenu__item mb-1 cursor-pointer opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
            <Link href={`/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
        <li data-slug="about" onMouseOver={handleHover} onMouseOut={handleHover} className="w-fit navmenu__item cursor-pointer opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2] ">
          <Link href="/about">About</Link>
        </li>
      </ul>
      {isOpen && (
        <div className="navmenu__images h-full w-full absolute top-0 left-0 flex absolute z-[-1]">
          {menuCategories.flatMap((category) => menuElements(category, settings))
            .concat(optionalMenuElements(
              "demo-reel",
              settings?.navbarDemoReelImages,
              settings?.navbarDemoReelImage,
            ))
            .concat(aboutMenuElements(settings))
            .map((element, index) => (
            <NavImage {...element} key={`${element.extraStyling}-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};
