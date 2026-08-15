import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectPage from "@/components/ProjectPage";
import {
  getAllProjectSlugs,
  getProject,
  isProjectSlug,
  type Project,
} from "@/data/projects";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

function metadataTitle(project: Project) {
  return project.subtitle
    ? `${project.title} ${project.subtitle.text} | Studio.Stuckn`
    : `${project.title} | Studio.Stuckn`;
}

function metadataDescription(project: Project) {
  return typeof project.description === "string"
    ? project.description
    : project.description.join(" ");
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isProjectSlug(slug)) notFound();

  const project = getProject(slug);
  const description = metadataDescription(project);

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

  if (!isProjectSlug(slug)) notFound();

  return <ProjectPage slug={slug} />;
}
