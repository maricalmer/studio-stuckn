import type { MetadataRoute } from "next";

import { getSanityCatalog } from "@/lib/sanity/repository";

const siteUrl = "https://www.ronjastucken.com";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/digital", priority: 0.8 },
  { path: "/physical", priority: 0.8 },
  { path: "/about", priority: 0.8 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getSanityCatalog();
  const staticEntries = staticRoutes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    priority,
  }));
  const projectEntries = projects.map(({ slug }) => ({
    url: new URL(`/${slug}`, siteUrl).toString(),
    priority: 0.64,
  }));

  return [...staticEntries, ...projectEntries];
}
