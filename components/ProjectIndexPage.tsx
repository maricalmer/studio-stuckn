import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";
import type { CategoryViewModel } from "@/lib/content/types";

export default function ProjectIndexPage({
  category,
}: {
  category: CategoryViewModel;
}) {
  const elements = category.projects.map((project) => ({
    type: "link" as const,
    key: project.id,
    src: project.listing.image,
    alt: project.listing.alt,
    title: project.listing.title,
    href: `/${project.slug}`,
  }));
  const activeItem = category.title;

  return (
    <PageContainer backgroundColor={undefined}>
      <Breadcrumb
        bgColor={undefined}
        textColor={category.slug === "digital" ? "text-black" : undefined}
        activeItem={activeItem}
      />
      <Carousel elements={elements} />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
}
