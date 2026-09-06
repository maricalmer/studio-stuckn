import "server-only";
import { getMetadataClient, getPublishedClient } from "./client";
import {
  ABOUT_QUERY,
  CATEGORIES_QUERY,
  PROJECTS_QUERY,
  PROJECT_SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import { mapAbout, mapPortfolio, mapSettings } from "./mappers";

// Published, read-only adapter. Cache tags and authenticated Draft Mode
// selection are added in 6C/6D.
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

export async function getSanityCatalog() {
  const client = getPublishedClient();
  const [projects, categories] = await Promise.all([
    client.fetch(PROJECTS_QUERY, {}, { cache: "no-store" }),
    client.fetch(CATEGORIES_QUERY, {}, { cache: "no-store" }),
  ]);
  const portfolio = mapPortfolio(projects, categories, null, null);
  return { projects: portfolio.projects, categories: portfolio.categories };
}

export async function getSanityAbout() {
  const about = await getPublishedClient().fetch(
    ABOUT_QUERY,
    {},
    { cache: "no-store" },
  );
  return mapAbout(about);
}

export async function getSanitySettings() {
  const settings = await getPublishedClient().fetch(
    SITE_SETTINGS_QUERY,
    {},
    { cache: "no-store" },
  );
  return mapSettings(settings);
}

export function getSanityProjectMetadata(slug: string) {
  return getMetadataClient().fetch(
    PROJECT_SEO_QUERY,
    { slug },
    { cache: "no-store", stega: false },
  );
}
