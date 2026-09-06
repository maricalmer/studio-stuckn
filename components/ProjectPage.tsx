import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";
import type { ProjectViewModel } from "@/lib/content/types";
import RichText from "@/components/RichText";

export default function ProjectPage({
  project,
}: {
  project: ProjectViewModel;
}) {
  const { previousProject, nextProject } = project;
  const description = {
    title: project.title,
    subtitle: project.subtitle,
    details: <RichText blocks={project.body} />,
    softwares: project.softwares,
    credits: project.credits,
    previousProject,
    nextProject,
  };
  const elements = project.media.map((media) =>
    media.type === "youtube"
      ? {
          type: "video" as const,
          key: media.key,
          src: media.src,
          title: media.title,
        }
      : {
          type: "image" as const,
          key: media.key,
          src: media.image,
          alt: media.alt,
        },
  );

  return (
    <PageContainer backgroundColor={undefined}>
      <Breadcrumb
        bgColor={undefined}
        activeItem={undefined}
        textColor={project.category === "digital" ? "text-black" : undefined}
      />
      <Carousel
        description={description}
        elements={elements}
        fashionCredits={project.fashionCredits}
      />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
}
