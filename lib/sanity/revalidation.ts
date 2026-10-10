import {
  categorySlugTag,
  categoryTag,
  projectSlugTag,
  projectTag,
  sanityCacheTags,
} from "./cache";

export const revalidationDocumentTypes = [
  "project",
  "category",
  "aboutPage",
  "homePage",
  "siteSettings",
  "sanity.imageAsset",
] as const;

type RevalidationDocumentType = (typeof revalidationDocumentTypes)[number];
export type RevalidationOperation = "create" | "update" | "delete";

export interface RevalidationDocumentState {
  _id: string;
  _type: RevalidationDocumentType;
  slug?: string;
  categoryId?: string;
  categorySlug?: string;
  assetIds: string[];
}

export interface RevalidationPayload {
  projectId: string;
  dataset: string;
  documentId: string;
  documentType: RevalidationDocumentType;
  operation: RevalidationOperation;
  before: RevalidationDocumentState | null;
  after: RevalidationDocumentState | null;
}

export interface ValidatedPayload {
  ok: true;
  value: RevalidationPayload;
}

export interface InvalidPayload {
  ok: false;
  reason:
    | "not-object"
    | "missing-field"
    | "invalid-field"
    | "unknown-document-type"
    | "invalid-state-transition"
    | "state-mismatch"
    | "draft-document";
}

export type PayloadValidation = ValidatedPayload | InvalidPayload;

const operations = new Set<RevalidationOperation>([
  "create",
  "update",
  "delete",
]);
const documentTypes = new Set<string>(revalidationDocumentTypes);
const routeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 512;
}

const invalidOptionalString = Symbol("invalid-optional-string");

function optionalString(value: unknown): string | undefined | null | typeof invalidOptionalString {
  if (value === undefined || value === null) return value;
  return nonEmptyString(value) ? value : invalidOptionalString;
}

function parseState(
  value: unknown,
  documentId: string,
  documentType: RevalidationDocumentType,
): RevalidationDocumentState | null | InvalidPayload {
  if (value === null) return null;
  if (!isRecord(value)) return { ok: false, reason: "invalid-field" };

  const id = value._id;
  const type = value._type;
  const slug = optionalString(value.slug);
  const categoryId = optionalString(value.categoryId);
  const categorySlug = optionalString(value.categorySlug);
  const assetIds = value.assetIds;

  if (
    !nonEmptyString(id) ||
    id !== documentId ||
    type !== documentType ||
    slug === invalidOptionalString ||
    categoryId === invalidOptionalString ||
    categorySlug === invalidOptionalString ||
    !Array.isArray(assetIds) ||
    !assetIds.every(nonEmptyString)
  ) {
    return { ok: false, reason: "state-mismatch" };
  }

  return {
    _id: id,
    _type: documentType,
    ...(slug ? { slug } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(categorySlug ? { categorySlug } : {}),
    assetIds: [...new Set(assetIds)],
  };
}

/**
 * Validate the signed webhook's JSON shape before it can influence cache
 * invalidation. The expected project/dataset check prevents a secret copied
 * to another Sanity project from purging this site's cache.
 */
export function validateRevalidationPayload(
  value: unknown,
  expected?: { projectId: string; dataset: string },
): PayloadValidation {
  if (!isRecord(value)) return { ok: false, reason: "not-object" };

  const projectId = value.projectId;
  const dataset = value.dataset;
  const documentId = value.documentId;
  const documentType = value.documentType;
  const operation = value.operation;

  if (
    !nonEmptyString(projectId) ||
    !nonEmptyString(dataset) ||
    !nonEmptyString(documentId) ||
    !nonEmptyString(documentType) ||
    !nonEmptyString(operation)
  ) {
    return { ok: false, reason: "missing-field" };
  }
  if (expected && (projectId !== expected.projectId || dataset !== expected.dataset)) {
    return { ok: false, reason: "invalid-field" };
  }
  if (!documentTypes.has(documentType)) {
    return { ok: false, reason: "unknown-document-type" };
  }
  if (/^(drafts|versions)\./.test(documentId)) {
    return { ok: false, reason: "draft-document" };
  }
  if (!operations.has(operation as RevalidationOperation)) {
    return { ok: false, reason: "invalid-field" };
  }

  const before = parseState(value.before, documentId, documentType as RevalidationDocumentType);
  const after = parseState(value.after, documentId, documentType as RevalidationDocumentType);
  if (before && "ok" in before && !before.ok) return before;
  if (after && "ok" in after && !after.ok) return after;

  const normalizedBefore = before as RevalidationDocumentState | null;
  const normalizedAfter = after as RevalidationDocumentState | null;
  const validTransition =
    (operation === "create" && normalizedBefore === null && normalizedAfter !== null) ||
    (operation === "update" && normalizedBefore !== null && normalizedAfter !== null) ||
    (operation === "delete" && normalizedBefore !== null && normalizedAfter === null);
  if (!validTransition) return { ok: false, reason: "invalid-state-transition" };

  return {
    ok: true,
    value: {
      projectId,
      dataset,
      documentId,
      documentType: documentType as RevalidationDocumentType,
      operation: operation as RevalidationOperation,
      before: normalizedBefore,
      after: normalizedAfter,
    },
  };
}

export interface RevalidationPlan {
  tags: string[];
  paths: string[];
  revalidateLayout: boolean;
}

function safeRouteSlug(value: string | undefined) {
  return value && value.length <= 96 && routeSlug.test(value) ? value : undefined;
}

function createPlan(): RevalidationPlan {
  return { tags: [], paths: [], revalidateLayout: false };
}

function addTag(plan: RevalidationPlan, tag: string) {
  if (!plan.tags.includes(tag)) plan.tags.push(tag);
}

function addPath(plan: RevalidationPlan, path: string) {
  if (!plan.paths.includes(path)) plan.paths.push(path);
}

function addStateTagsAndPaths(
  plan: RevalidationPlan,
  state: RevalidationDocumentState | null,
) {
  if (!state) return;
  if (state._type === "project") {
    addTag(plan, projectTag(state._id));
    const slug = safeRouteSlug(state.slug);
    if (slug) {
      addTag(plan, projectSlugTag(slug));
      addPath(plan, `/${slug}`);
    }
    if (state.categoryId) addTag(plan, categoryTag(state.categoryId));
    const categorySlug = safeRouteSlug(state.categorySlug);
    if (categorySlug) {
      addTag(plan, categorySlugTag(categorySlug));
      addPath(plan, `/${categorySlug}`);
    }
  } else if (state._type === "category") {
    addTag(plan, categoryTag(state._id));
    const slug = safeRouteSlug(state.slug);
    if (slug) {
      addTag(plan, categorySlugTag(slug));
      addPath(plan, `/${slug}`);
    }
  }
}

/**
 * Build the complete invalidation set from both sides of a Sanity event.
 * Revalidation is intentionally idempotent: Sanity may retry or replay a
 * webhook, and repeating the same tag/path operations is harmless.
 */
export function planRevalidation(payload: RevalidationPayload): RevalidationPlan {
  const plan = createPlan();

  switch (payload.documentType) {
    case "project":
      addTag(plan, sanityCacheTags.projects);
      // Categories may use a project's listing image as their representative
      // image, so keep that reverse dependency covered as well.
      addTag(plan, sanityCacheTags.categories);
      addTag(plan, sanityCacheTags.navigation);
      addTag(plan, sanityCacheTags.metadata);
      addTag(plan, sanityCacheTags.sitemap);
      addStateTagsAndPaths(plan, payload.before);
      addStateTagsAndPaths(plan, payload.after);
      addPath(plan, "/sitemap.xml");
      break;
    case "category":
      // Category references are expanded in the project projection, so a
      // category change must invalidate project pages as well as listings.
      addTag(plan, sanityCacheTags.categories);
      addTag(plan, sanityCacheTags.projects);
      addTag(plan, sanityCacheTags.navigation);
      addTag(plan, sanityCacheTags.metadata);
      addTag(plan, sanityCacheTags.sitemap);
      addStateTagsAndPaths(plan, payload.before);
      addStateTagsAndPaths(plan, payload.after);
      addPath(plan, "/sitemap.xml");
      break;
    case "aboutPage":
      addTag(plan, sanityCacheTags.about);
      addTag(plan, sanityCacheTags.metadata);
      addPath(plan, "/about");
      break;
    case "homePage":
      addTag(plan, sanityCacheTags.home);
      addPath(plan, "/");
      break;
    case "siteSettings":
      addTag(plan, sanityCacheTags.settings);
      addTag(plan, sanityCacheTags.metadata);
      plan.revalidateLayout = true;
      break;
    case "sanity.imageAsset":
      // Asset ownership cannot be queried from a webhook projection. The
      // shared tag is attached to every published query as a safe fallback.
      addTag(plan, sanityCacheTags.all);
      plan.revalidateLayout = true;
      break;
  }

  return plan;
}

export type RevalidateTag = (tag: string, profile: "max") => void;
export type RevalidatePath = (path: string, type?: "layout" | "page") => void;

export function invalidateRevalidationPlan(
  plan: RevalidationPlan,
  revalidateTag: RevalidateTag,
  revalidatePath: RevalidatePath,
) {
  for (const tag of plan.tags) revalidateTag(tag, "max");
  for (const path of plan.paths) revalidatePath(path);
  if (plan.revalidateLayout) revalidatePath("/", "layout");
}
