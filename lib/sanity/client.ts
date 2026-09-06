import "server-only";
import { createClient } from "next-sanity";
import { getPublicEnvironment } from "./env";
import { getReadToken } from "./secrets";

// Match the API contract already used by the Studio/importer.
export const apiVersion = "2026-08-01";

export function getPublishedClient() {
  const { projectId, dataset, studioUrl } = getPublicEnvironment();
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    stega: { enabled: false, studioUrl },
  });
}

export function getDraftClient() {
  return getPublishedClient().withConfig({
    token: getReadToken(),
    perspective: "drafts",
    useCdn: false,
    stega: { enabled: true },
  });
}

// Metadata must never contain invisible editing markers, including in drafts.
export function getMetadataClient(draft = false) {
  return (draft ? getDraftClient() : getPublishedClient()).withConfig({
    stega: false,
  });
}
