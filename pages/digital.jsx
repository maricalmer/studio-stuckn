import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import StaticBrand from "@/components/StaticBrand";
import PageContainer from "@/components/PageContainer";
import redElfProfile from '../public/img/digital/3d_elf_red_profile.webp';
import roseElfEarCropped from '../public/img/digital/3d_elf_rose_ear_cropped.webp';
import purpleElfDetail from '../public/img/digital/3d_elf_purple_detail.webp';
import blueBagFront from '../public/img/digital/3d_blue_bag_front.webp';
import "../public/stylesheets/projects.css";

const elements = [
  { type: "link", src: redElfProfile, alt: '3d avatar laying', title: 'Etherea Part I', href: '/etherea-part-one' },
  { type: "link", src: roseElfEarCropped, alt: '3d avatar earings', title: 'Etherea Part II', href: '/etherea-part-two' },
  { type: "link", src: purpleElfDetail, alt: '3d avatar boots', title: 'Etherea Part III', href: '/etherea-part-three' },
  { type: "link", src: blueBagFront, alt: '3d alien bag with green background', title: 'Alien Accessories', href: '/alien-accessories' }
];

export default function Digital() {
  return (
    <PageContainer>
      <Breadcrumb textColor="text-black" activeItem="Digital" />
      <Carousel elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
};
