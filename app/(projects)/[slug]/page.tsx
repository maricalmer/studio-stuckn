import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectPage from "@/components/ProjectPage";
import { getLocalProject, getLocalProjects } from "@/lib/content/local";
import type { ProjectViewModel } from "@/lib/content/types";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalProjects().map(({ slug }) => ({ slug }));
}

function metadataTitle(project: ProjectViewModel) {
  return project.subtitle
    ? `${project.title} ${project.subtitle.text} | Studio.Stuckn`
    : `${project.title} | Studio.Stuckn`;
}

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getLocalProject(slug);
  if (!project) notFound();
  const description = project.description;

  return {
    title: metadataTitle(project),
    description,
    alternates: {
      canonical: `/${project.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/${project.slug}`,
      title: metadataTitle(project),
      description,
      images: [project.listing.image.src],
    },
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;

  const project = getLocalProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
