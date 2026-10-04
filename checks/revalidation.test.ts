import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { evaluate, parse } from "groq-js";
import { NextRequest } from "next/server";

import { POST } from "../app/api/revalidate/route";
import {
  categorySlugTag,
  draftQueryOptions,
  publishedCacheRevalidate,
  publishedQueryOptions,
  projectSlugTag,
  projectTag,
  sanityCacheTags,
} from "../lib/sanity/cache";
import {
  invalidateRevalidationPlan,
  planRevalidation,
  type RevalidationDocumentState,
  type RevalidationPayload,
  validateRevalidationPayload,
} from "../lib/sanity/revalidation";
import {
  revalidationAssetIdsProjection,
  revalidationWebhookFilter,
  revalidationWebhookProjection,
} from "../lib/sanity/webhook";

const environment = {
  projectId: "35ex4ltc",
  dataset: "production",
};

function state(
  type: RevalidationDocumentState["_type"],
  id: string,
  overrides: Partial<RevalidationDocumentState> = {},
): RevalidationDocumentState {
  return { _id: id, _type: type, assetIds: [], ...overrides };
}

function payload(
  operation: RevalidationPayload["operation"],
  documentType: RevalidationPayload["documentType"],
  before: RevalidationPayload["before"],
  after: RevalidationPayload["after"],
): RevalidationPayload {
  return {
    ...environment,
    documentId: "project-flanelle",
    documentType,
    operation,
    before,
    after,
  };
}

test("webhook projection retains delta states and route dependencies", () => {
  assert.match(revalidationWebhookFilter, /project/);
  assert.match(revalidationWebhookFilter, /sanity\.imageAsset/);
  for (const field of ["before()", "after()", "categorySlug", "assetIds"]) {
    assert.match(revalidationWebhookProjection, new RegExp(field.replace("()", "\\(\\)")));
  }
  assert.match(revalidationWebhookProjection, /category->slug\.current/);
});

test("webhook asset projection produces one flat string array", async () => {
  const query = parse(/* groq */ `
    *[_type == "project"]{
      "assetIds": ${revalidationAssetIdsProjection}
    }
  `);
  const result = await evaluate(query, {
    dataset: [
      {
        _type: "project",
        listing: { image: { asset: { _ref: "image-listing" } } },
        gallery: [
          { image: { asset: { _ref: "image-gallery-one" } } },
          { _type: "youtubeEmbed" },
          { image: { asset: { _ref: "image-gallery-two" } } },
        ],
        seo: { socialImage: { asset: { _ref: "image-seo" } } },
      },
      { _type: "project" },
    ],
  });

  assert.deepEqual(await result.get(), [
    {
      assetIds: [
        "image-listing",
        "image-gallery-one",
        "image-gallery-two",
        "image-seo",
      ],
    },
    { assetIds: [] },
  ]);
});

test("published query options are cached and draft options are not", () => {
  const published = publishedQueryOptions([sanityCacheTags.projects]);
  assert.equal(published.cache, "force-cache");
  assert.equal(published.next.revalidate, publishedCacheRevalidate);
  assert.deepEqual(published.next.tags, [sanityCacheTags.all, sanityCacheTags.projects]);
  assert.deepEqual(draftQueryOptions(), {cache: "no-store"});
});

test("create, rename, move, unpublish and delete use both document states", () => {
  const created = validateRevalidationPayload(
    {
      ...payload(
        "create",
        "project",
        null,
        state("project", "project-flanelle", {
          slug: "new-project",
          categoryId: "category-digital",
          categorySlug: "digital",
          assetIds: ["image-new"],
        }),
      ),
    },
    environment,
  );
  assert.equal(created.ok, true);
  if (!created.ok) return;
  const createdPlan = planRevalidation(created.value);
  assert.ok(createdPlan.paths.includes("/new-project"));
  assert.ok(createdPlan.paths.includes("/digital"));
  assert.ok(createdPlan.tags.includes(projectTag("project-flanelle")));

  const renamedAndMoved = validateRevalidationPayload(
    {
      ...payload(
        "update",
        "project",
        state("project", "project-flanelle", {
          slug: "old-project",
          categoryId: "category-physical",
          categorySlug: "physical",
        }),
        state("project", "project-flanelle", {
          slug: "new-project",
          categoryId: "category-digital",
          categorySlug: "digital",
        }),
      ),
    },
    environment,
  );
  assert.equal(renamedAndMoved.ok, true);
  if (!renamedAndMoved.ok) return;
  const movedPlan = planRevalidation(renamedAndMoved.value);
  for (const path of ["/old-project", "/new-project", "/physical", "/digital", "/sitemap.xml"]) {
    assert.ok(movedPlan.paths.includes(path), path);
  }
  for (const tag of [
    projectSlugTag("old-project"),
    projectSlugTag("new-project"),
    categorySlugTag("physical"),
    categorySlugTag("digital"),
    sanityCacheTags.navigation,
  ]) {
    assert.ok(movedPlan.tags.includes(tag), tag);
  }
  assert.equal(new Set(movedPlan.tags).size, movedPlan.tags.length);
  assert.equal(new Set(movedPlan.paths).size, movedPlan.paths.length);

  const deleted = validateRevalidationPayload(
    {
      ...payload(
        "delete",
        "project",
        state("project", "project-flanelle", {
          slug: "old-project",
          categoryId: "category-physical",
          categorySlug: "physical",
        }),
        null,
      ),
    },
    environment,
  );
  assert.equal(deleted.ok, true);
  if (!deleted.ok) return;
  const deletedPlan = planRevalidation(deleted.value);
  assert.ok(deletedPlan.paths.includes("/old-project"));
  assert.ok(deletedPlan.paths.includes("/physical"));
});

test("resource plans cover category, About, settings and asset dependencies", () => {
  const cases = [
    {
      type: "category" as const,
      operation: "update" as const,
      before: state("category", "category-digital", {slug: "digital"}),
      after: state("category", "category-digital", {slug: "digital"}),
      tags: [sanityCacheTags.categories, sanityCacheTags.projects],
      paths: ["/digital", "/sitemap.xml"],
      layout: false,
    },
    {
      type: "aboutPage" as const,
      operation: "update" as const,
      before: state("aboutPage", "aboutPage"),
      after: state("aboutPage", "aboutPage"),
      tags: [sanityCacheTags.about],
      paths: ["/about"],
      layout: false,
    },
    {
      type: "siteSettings" as const,
      operation: "update" as const,
      before: state("siteSettings", "siteSettings"),
      after: state("siteSettings", "siteSettings"),
      tags: [sanityCacheTags.settings, sanityCacheTags.metadata],
      paths: [],
      layout: true,
    },
    {
      type: "sanity.imageAsset" as const,
      operation: "update" as const,
      before: state("sanity.imageAsset", "image-shared"),
      after: state("sanity.imageAsset", "image-shared"),
      tags: [sanityCacheTags.all],
      paths: [],
      layout: true,
    },
  ];

  for (const item of cases) {
    const itemPayload = {
      ...payload(item.operation, item.type, item.before, item.after),
      documentId: item.before?._id ?? item.after?._id ?? "",
    } as RevalidationPayload;
    const validation = validateRevalidationPayload(itemPayload, environment);
    assert.equal(validation.ok, true, item.type);
    if (!validation.ok) continue;
    const plan = planRevalidation(validation.value);
    for (const tag of item.tags) assert.ok(plan.tags.includes(tag), `${item.type}: ${tag}`);
    for (const path of item.paths) assert.ok(plan.paths.includes(path), `${item.type}: ${path}`);
    assert.equal(plan.revalidateLayout, item.layout, item.type);
  }
});

test("revalidation operations are retry-safe and use the Next 16 max profile", () => {
  const value = validateRevalidationPayload(
    {
      ...payload(
        "update",
        "project",
        state("project", "project-flanelle", {slug: "flanelle", categorySlug: "digital"}),
        state("project", "project-flanelle", {slug: "flanelle", categorySlug: "digital"}),
      ),
    },
    environment,
  );
  assert.equal(value.ok, true);
  if (!value.ok) return;

  const plan = planRevalidation(value.value);
  const tags: Array<[string, "max"]> = [];
  const paths: Array<[string, "layout" | "page" | undefined]> = [];
  invalidateRevalidationPlan(
    plan,
    (tag, profile) => tags.push([tag, profile]),
    (path, type) => paths.push([path, type]),
  );
  invalidateRevalidationPlan(
    plan,
    (tag, profile) => tags.push([tag, profile]),
    (path, type) => paths.push([path, type]),
  );
  assert.equal(tags.length, plan.tags.length * 2);
  assert.equal(paths.length, plan.paths.length * 2);
  assert.ok(tags.every(([, profile]) => profile === "max"));
});

test("malformed payloads are rejected before cache invalidation", () => {
  const valid = {
    ...payload(
      "update",
      "aboutPage",
      state("aboutPage", "aboutPage"),
      state("aboutPage", "aboutPage"),
    ),
    documentId: "aboutPage",
  };
  for (const [value, reason] of [
    [null, "not-object"],
    [{ ...valid, operation: "publish" }, "invalid-field"],
    [{ ...valid, documentType: "unknown" }, "unknown-document-type"],
    [{ ...valid, documentId: "drafts.aboutPage" }, "draft-document"],
    [{ ...valid, after: null }, "invalid-state-transition"],
    [{ ...valid, projectId: "other-project" }, "invalid-field"],
  ] as const) {
    const result = validateRevalidationPayload(value, environment);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, reason);
  }
});

function signedHeader(body: string, secret: string) {
  const timestamp = Date.now();
  const digest = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("base64url");
  return `t=${timestamp},v1=${digest}`;
}

function request(body: string, headers: HeadersInit = {}) {
  return new NextRequest("http://localhost:3000/api/revalidate", {
    method: "POST",
    body,
    headers,
  });
}

test("endpoint fails closed for missing secrets, bad signatures, and malformed JSON", async () => {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = environment.projectId;
  process.env.NEXT_PUBLIC_SANITY_DATASET = environment.dataset;
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL = "http://localhost:3333";

  delete process.env.SANITY_REVALIDATE_SECRET;
  const missingSecret = await POST(request("{}"));
  assert.equal(missingSecret.status, 503);

  const secret = "test-webhook-secret";
  process.env.SANITY_REVALIDATE_SECRET = secret;
  const badSignature = await POST(
    request("{}", {"sanity-webhook-signature": "t=1700000000000,v1=wrong"}),
  );
  assert.equal(badSignature.status, 401);

  const malformed = "{not-json";
  const malformedResponse = await POST(
    request(malformed, {"sanity-webhook-signature": signedHeader(malformed, secret)}),
  );
  assert.equal(malformedResponse.status, 400);
});
