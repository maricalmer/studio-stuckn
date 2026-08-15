import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";
import { getProjectsByCategory } from "@/data/projects";

import "@/public/stylesheets/projects.css";

export default function ProjectIndexPage({ category }) {
  const elements = getProjectsByCategory(category).map((project) => ({
    type: "link",
    src: project.listing.image,
    alt: project.listing.alt,
    title: project.listing.title,
    href: `/${project.slug}`,
  }));
  const activeItem = category === "digital" ? "Digital" : "Physical";

  return (
    <PageContainer>
      <Breadcrumb
        textColor={category === "digital" ? "text-black" : undefined}
        activeItem={activeItem}
      />
      <Carousel elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
}
