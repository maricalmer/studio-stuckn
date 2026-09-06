import "server-only";
import { getMetadataClient, getPublishedClient } from "./client";
import {
  ABOUT_QUERY,
  CATEGORIES_QUERY,
  PROJECT_SEO_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import { mapPortfolio } from "./mappers";

// Preparatory, read-only adapter. Routes still use content/local.ts.
// Cache tags and authenticated Draft Mode selection are added in 6C/6D.
export async function getSanityPortfolio() {
  const client = getPublishedClient();
  const [projects, categories, about, settings] = await Promise.all([
    client.fetch(PROJECTS_QUERY, {}, { cache: "no-store" }),
    client.fetch(CATEGORIES_QUERY, {}, { cache: "no-store" }),
    client.fetch(ABOUT_QUERY, {}, { cache: "no-store" }),
    client.fetch(SITE_SETTINGS_QUERY, {}, { cache: "no-store" }),
  ]);
  return mapPortfolio(projects, categories, about, settings);
}
export function getSanityProjectMetadata(slug: string) {
  return getMetadataClient().fetch(
    PROJECT_SEO_QUERY,
    { slug },
    { cache: "no-store", stega: false },
  );
}
