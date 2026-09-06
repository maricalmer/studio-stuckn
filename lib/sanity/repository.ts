import "server-only";

import { createHash } from "node:crypto";
import { draftMode } from "next/headers";

import { getDraftClient, getMetadataClient, getPublishedClient } from "./client";
import {
  ABOUT_QUERY,
  CATEGORIES_QUERY,
  DRAFT_REVISION_QUERY,
  PROJECTS_QUERY,
  PROJECT_SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import { mapAbout, mapPortfolio, mapSettings } from "./mappers";

export interface RepositoryOptions {
  /** Force published reads for routes such as the sitemap. */
  draft?: boolean;
  /** Keep Stega markers for rendered draft content; disable them for metadata. */
  stega?: boolean;
}

async function getContentClient(options: RepositoryOptions = {}) {
  const isDraft = options.draft ?? (await draftMode()).isEnabled;
  const client = isDraft ? getDraftClient() : getPublishedClient();
  return {
    isDraft,
    client: client.withConfig({ stega: isDraft && options.stega !== false }),
  };
}

export async function getSanityPortfolio(options: RepositoryOptions = {}) {
  const { client } = await getContentClient(options);
  const [projects, categories, about, settings] = await Promise.all([
    client.fetch(PROJECTS_QUERY, {}, { cache: "no-store" }),
    client.fetch(CATEGORIES_QUERY, {}, { cache: "no-store" }),
    client.fetch(ABOUT_QUERY, {}, { cache: "no-store" }),
    client.fetch(SITE_SETTINGS_QUERY, {}, { cache: "no-store" }),
  ]);
  return mapPortfolio(projects, categories, about, settings);
}

export async function getSanityCatalog(options: RepositoryOptions = {}) {
  const { client } = await getContentClient(options);
  const [projects, categories] = await Promise.all([
    client.fetch(PROJECTS_QUERY, {}, { cache: "no-store" }),
    client.fetch(CATEGORIES_QUERY, {}, { cache: "no-store" }),
  ]);
  const portfolio = mapPortfolio(projects, categories, null, null);
  return { projects: portfolio.projects, categories: portfolio.categories };
}

export async function getSanityAbout(options: RepositoryOptions = {}) {
  const { client } = await getContentClient(options);
  const about = await client.fetch(
    ABOUT_QUERY,
    {},
    { cache: "no-store" },
  );
  return mapAbout(about);
}

export async function getSanitySettings(options: RepositoryOptions = {}) {
  const { client } = await getContentClient(options);
  const settings = await client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    { cache: "no-store" },
  );
  return mapSettings(settings);
}

export async function getSanityProjectMetadata(slug: string) {
  const { isDraft } = await getContentClient({ stega: false });
  return getMetadataClient(isDraft).fetch(
    PROJECT_SEO_QUERY,
    { slug },
    { cache: "no-store", stega: false },
  );
}

/**
 * Return a server-computed revision for the draft refresh endpoint. The
 * browser sees only this digest, never document revisions or the read token.
 */
export async function getSanityDraftRevision() {
  const revisions = await getDraftClient()
    .withConfig({ stega: false })
    .fetch(DRAFT_REVISION_QUERY, {}, { cache: "no-store", stega: false });
  return createHash("sha256")
    .update(JSON.stringify(revisions))
    .digest("hex");
}
