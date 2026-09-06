import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectIndexPage from "@/components/ProjectIndexPage";
import { getSanityCatalog, getSanitySettings } from "@/lib/sanity/repository";

export const dynamic = "force-dynamic";

async function getCategory(stega = true) {
  const { categories } = await getSanityCatalog({ stega });
  return categories.find((category) => category.slug === "physical");
}

export async function generateMetadata(): Promise<Metadata> {
  const [category, settings] = await Promise.all([
    getCategory(false),
    getSanitySettings({ stega: false }),
  ]);
  if (!category) notFound();
  const title = `${category.title} | Studio.Stuckn`;
  const socialImage = category.image?.image.src;
  return {
    title,
    description:
      settings?.defaultSeo.description ??
      "Physical fashion projects, editorials, and collections by Studio.Stuckn.",
    alternates: { canonical: "/physical" },
    openGraph: {
      type: "website",
      url: "/physical",
      title,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function PhysicalPage() {
  const category = await getCategory();
  if (!category) notFound();
  return <ProjectIndexPage category={category} />;
}
