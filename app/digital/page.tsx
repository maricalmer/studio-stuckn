import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectIndexPage from "@/components/ProjectIndexPage";
import { getSanityCatalog, getSanitySettings } from "@/lib/sanity/repository";

export const dynamic = "force-dynamic";

async function getCategory() {
  const { categories } = await getSanityCatalog();
  return categories.find((category) => category.slug === "digital");
}

export async function generateMetadata(): Promise<Metadata> {
  const [category, settings] = await Promise.all([
    getCategory(),
    getSanitySettings(),
  ]);
  if (!category) notFound();
  const title = `${category.title} | Studio.Stuckn`;
  const socialImage = category.image?.image.src;
  return {
    title,
    description:
      settings?.defaultSeo.description ??
      "Digital fashion, avatars, accessories, and 3D work by Studio.Stuckn.",
    alternates: { canonical: "/digital" },
    openGraph: {
      type: "website",
      url: "/digital",
      title,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function DigitalPage() {
  const category = await getCategory();
  if (!category) notFound();
  return <ProjectIndexPage category={category} />;
}
