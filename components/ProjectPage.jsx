import Breadcrumb from "@/components/Breadcrumb";
import Carousel from "@/components/Carousel";
import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";
import { getAdjacentProjects, getProject } from "@/data/projects";

import "@/public/stylesheets/projects.css";

export default function ProjectPage({ slug }) {
  const project = getProject(slug);
  const { previousProject, nextProject } = getAdjacentProjects(slug);
  const description = {
    title: project.title,
    subtitle: project.subtitle,
    details: project.description,
    softwares: project.softwares,
    credits: project.credits,
    previousProject,
    nextProject,
  };
  const elements = project.media.map((media) =>
    media.type === "youtube"
      ? { type: "video", src: media.src, title: media.title }
      : { type: "image", src: media.image, alt: media.alt },
  );

  return (
    <PageContainer>
      <Breadcrumb textColor={project.category === "digital" ? "text-black" : undefined} />
      <Carousel
        description={description}
        elements={elements}
        fashionCredits={project.fashionCredits}
      />
      <StaticBrand extraStyling="opacity-1 border-black" />
    </PageContainer>
  );
}
