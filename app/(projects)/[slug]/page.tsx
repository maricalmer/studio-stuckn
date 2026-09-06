import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectPage from "@/components/ProjectPage";
import {
  getSanityCatalog,
  getSanityProjectMetadata,
} from "@/lib/sanity/repository";

interface ProjectRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;

  const metadata = await getSanityProjectMetadata(slug);
  if (!metadata?.slug) notFound();
  const projectTitle = metadata.title ?? "Untitled project";
  const title = metadata.subtitle?.text
    ? `${projectTitle} ${metadata.subtitle.text} | Studio.Stuckn`
    : `${projectTitle} | Studio.Stuckn`;
  const description = metadata.seo?.metaDescription ?? metadata.description;
  const socialImage =
    metadata.seo?.socialImage?.asset?.url ??
    metadata.listing?.image?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/${metadata.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/${metadata.slug}`,
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;

  const { projects } = await getSanityCatalog();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
