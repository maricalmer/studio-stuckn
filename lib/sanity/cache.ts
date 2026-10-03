import "server-only";

import { createHash } from "node:crypto";

/**
 * Published content is safe to cache for a bounded period because the Sanity
 * webhook invalidates these entries after a publish. The TTL is also a safety
 * net if the webhook is delayed or unavailable.
 */
export const publishedCacheRevalidate = 60 * 60;

export const sanityCacheTags = {
  all: "sanity:all",
  projects: "sanity:projects",
  categories: "sanity:categories",
  navigation: "sanity:navigation",
  about: "sanity:about",
  settings: "sanity:settings",
  metadata: "sanity:metadata",
  sitemap: "sanity:sitemap",
} as const;

function dynamicTag(kind: string, value: string) {
  const encoded = encodeURIComponent(value);
  // Next cache tags have a bounded length. Normal Sanity IDs/slugs are much
  // shorter, but hash an unexpected long URL segment instead of letting one
  // request fail while constructing its cache key.
  const safeValue =
    encoded.length <= 200
      ? encoded
      : `sha256-${createHash("sha256").update(value).digest("hex")}`;
  return `sanity:${kind}:${safeValue}`;
}

export function projectTag(id: string) {
  return dynamicTag("project", id);
}

export function projectSlugTag(slug: string) {
  return dynamicTag("project-slug", slug);
}

export function categoryTag(id: string) {
  return dynamicTag("category", id);
}

export function categorySlugTag(slug: string) {
  return dynamicTag("category-slug", slug);
}

/** Options for a published Sanity query backed by the Next.js Data Cache. */
export function publishedQueryOptions(tags: readonly string[]) {
  return {
    cache: "force-cache" as const,
    next: {
      revalidate: publishedCacheRevalidate,
      // Every published entry can be invalidated conservatively when a
      // reverse asset dependency cannot be determined from a webhook event.
      tags: [...new Set([sanityCacheTags.all, ...tags])],
    },
  };
}

/** Draft perspective reads must never enter the published cache. */
export function draftQueryOptions() {
  return { cache: "no-store" as const };
}
