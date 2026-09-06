import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RichText from "../components/RichText";
import AboutBody from "../components/AboutBody";
import { evaluate, parse } from "groq-js";
import {
  ABOUT_QUERY,
  CATEGORIES_QUERY,
  PROJECT_QUERY,
  PROJECT_SEO_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanity/queries";
import {
  mapPortfolio,
  mapProject,
  mapRichText,
  youtubeEmbed,
} from "../lib/sanity/mappers";
import { validatePublicEnvironment } from "../lib/sanity/env";
import { safeHref, textBlocks } from "../lib/content/shared";
import { aboutContent, siteContent } from "../data/site";
import type {
  ABOUT_QUERY_RESULT,
  CATEGORIES_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "../lib/sanity/types.generated";

const read = (name: string) =>
  JSON.parse(
    readFileSync(
      new URL(`../studio/migration/extracted/${name}.json`, import.meta.url),
      "utf8",
    ),
  );
const imported = read("transformed-document-preview");
const source = read("existing-content");
const documents = [
  ...imported.projects,
  ...imported.categories,
  imported.aboutPage,
  imported.siteSettings,
];
// The committed import preview has references but no asset documents. Resolve
// them using deterministic test assets; no network, tokens or dataset writes.
const references = new Set<string>();
function collect(value: unknown) {
  if (!value || typeof value !== "object") return;
  if (
    "_ref" in value &&
    typeof value._ref === "string" &&
    value._ref.startsWith("image-")
  )
    references.add(value._ref);
  Object.values(value).forEach(collect);
}
collect(documents);
const assets = [...references].map((_id) => ({
  _id,
  _type: "sanity.imageAsset",
  url: `https://cdn.sanity.io/images/35ex4ltc/production/${_id}.webp`,
  metadata: {
    dimensions: { width: 800, height: 1200, aspectRatio: 2 / 3 },
    lqip: "data:image/jpeg;base64,test",
  },
}));
async function query<T>(
  groq: string,
  params = {},
  dataset = [...documents, ...assets],
): Promise<T> {
  return (await evaluate(parse(groq), { dataset, params })).get();
}
async function portfolio() {
  return mapPortfolio(
    await query<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY),
    await query<CATEGORIES_QUERY_RESULT>(CATEGORIES_QUERY),
    await query<ABOUT_QUERY_RESULT>(ABOUT_QUERY),
    await query<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
  );
}

test("GROQ projections and mapper preserve all 12 imported projects and category navigation", async () => {
  const result = await portfolio();
  assert.equal(result.projects.length, 12);
  assert.deepEqual(
    result.categories.map((category) => category.slug),
    ["digital", "physical"],
  );
  for (const project of result.projects) {
    const original = source.projects.find(
      (item: { slug: string }) => item.slug === project.slug,
    );
    assert.ok(original);
    assert.equal(project.title, original.title);
    assert.equal(
      project.description,
      Array.isArray(original.description)
        ? original.description.join(" ")
        : original.description,
    );
    assert.equal(project.softwares, original.softwares);
    assert.deepEqual(project.subtitle, original.subtitle);
    assert.deepEqual(
      project.credits.map((credit) => [credit.label, credit.value]),
      original.credits ?? [],
    );
    assert.deepEqual(
      project.media.map((item) => item.type),
      original.media.map((item: { type: string }) => item.type),
    );
    assert.deepEqual(
      project.media
        .filter((item) => item.type === "image")
        .map((item) => item.alt),
      original.media
        .filter((item: { type: string }) => item.type === "image")
        .map((item: { alt: string }) => item.alt),
    );
    assert.deepEqual(
      project.media
        .filter((item) => item.type === "youtube")
        .map((item) => item.src),
      original.media
        .filter((item: { type: string }) => item.type === "youtube")
        .map((item: { src: string }) => item.src),
    );
    const category = source.categories.find(
      (item: { slug: string }) => item.slug === project.category,
    );
    const index = category.projectSlugs.indexOf(project.slug);
    assert.equal(project.previousProject, category.projectSlugs[index - 1]);
    assert.equal(project.nextProject, category.projectSlugs[index + 1]);
    const entries = project.fashionCredits?.entries;
    assert.deepEqual(
      entries?.map((entry) => [String(entry.position), entry.details]),
      original.fashionCredits
        ? Object.entries(original.fashionCredits.creditsPieces)
        : undefined,
    );
    for (const entry of entries ?? [])
      assert.equal(entry.mediaKey, project.media[entry.position - 1].key);
    assert.equal(
      new Set(project.media.map((item) => item.key)).size,
      project.media.length,
    );
  }
});

test("About retains all three images and local contact/SEO content matches the import", async () => {
  const result = await portfolio();
  assert.equal(result.about?.images.length, 3);
  assert.equal(result.about?.images[0].alt, "picture of ronja stuckn");
  assert.deepEqual(aboutContent.paragraphs, source.aboutPage.paragraphs);
  assert.equal(result.settings?.contactEmail, siteContent.contactEmail);
  assert.deepEqual(result.settings?.socialLinks, siteContent.socialLinks);
  assert.equal(result.settings?.defaultSeo.title, siteContent.defaultSeo.title);
  assert.equal(
    result.settings?.defaultSeo.description,
    siteContent.defaultSeo.description,
  );
  assert.ok(result.settings?.defaultSeo.socialImage?.image?.assetId);
});

test("detail and SEO queries handle existing and unknown slugs", async () => {
  const detail = await query<PROJECT_QUERY_RESULT>(PROJECT_QUERY, {
    slug: "flanelle",
  });
  assert.equal(detail?.slug, "flanelle");
  assert.equal(await query(PROJECT_QUERY, { slug: "does-not-exist" }), null);
  const seo = await query<{ slug: string; description: string }>(
    PROJECT_SEO_QUERY,
    { slug: "flanelle" },
  );
  assert.equal(seo.slug, "flanelle");
  assert.equal(typeof seo.description, "string");
});

test("draft gaps do not crash mapping; image transforms and rich text survive", async () => {
  const [original] = await query<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY);
  assert.equal(mapProject({ ...original, listing: null }), null);
  const crop = { top: 0.1, bottom: 0.2, left: 0, right: 0 };
  const hotspot = { x: 0.5, y: 0.4, width: 0.3, height: 0.2 };
  const changed = mapProject({
    ...original,
    gallery: null,
    description: null,
    credits: null,
    listing: {
      ...original.listing!,
      image: { ...original.listing!.image!, crop, hotspot },
    },
  });
  assert.deepEqual(changed?.media, []);
  assert.deepEqual(changed?.listing.image.crop, crop);
  assert.deepEqual(changed?.listing.image.hotspot, hotspot);
  assert.equal(changed?.listing.image.width, 800);
  assert.equal(
    changed?.listing.image.blurDataURL,
    "data:image/jpeg;base64,test",
  );
  const body = mapRichText([
    {
      _key: "paragraph",
      _type: "block",
      style: "h2",
      listItem: "number",
      level: 2,
      children: [
        {
          _key: "span",
          _type: "span",
          text: "Linked title",
          marks: ["strong", "link"],
        },
      ],
      markDefs: [{ _key: "link", _type: "link", href: "https://example.com" }],
    },
  ]);
  assert.equal(body[0].key, "paragraph");
  assert.equal(body[0].style, "h2");
  assert.equal(body[0].level, 2);
  assert.equal(body[0].spans[0].href, "https://example.com");
  assert.ok(body[0].spans[0].marks.includes("strong"));
});

test("keys and navigation survive reordered input; gallery keys follow content", async () => {
  const projects = await query<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY);
  const categories = await query<CATEGORIES_QUERY_RESULT>(CATEGORIES_QUERY);
  const original = mapPortfolio(projects, categories, null, null);
  const reversed = mapPortfolio(
    [...projects].reverse(),
    [...categories].reverse(),
    null,
    null,
  );
  assert.deepEqual(reversed, original);
  assert.equal(
    textBlocks(["one", "two"])[0].key,
    textBlocks(["two", "one"])[1].key,
  );
  const withGallery = projects.find(
    (project) => (project.gallery?.length ?? 0) > 1,
  )!;
  const before = mapProject(withGallery)!;
  const after = mapProject({
    ...withGallery,
    gallery: [...withGallery.gallery!].reverse(),
  })!;
  assert.deepEqual(
    after.media.map((item) => item.key),
    before.media.map((item) => item.key).reverse(),
  );
});

test("environment validation is fail-closed without exposing values", () => {
  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "35ex4ltc",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_STUDIO_URL: "http://localhost:3333",
  };
  assert.equal(validatePublicEnvironment(env).dataset, "production");
  assert.throws(
    () => validatePublicEnvironment({}),
    /NEXT_PUBLIC_SANITY_PROJECT_ID/,
  );
  for (const url of [
    "http://example.com",
    "https://user:password@example.com",
    "javascript:alert(1)",
    "https://example.com?token=secret",
  ]) {
    assert.throws(() =>
      validatePublicEnvironment({ ...env, NEXT_PUBLIC_SANITY_STUDIO_URL: url }),
    );
  }
});

test("unsafe links and non-YouTube embeds are rejected", () => {
  assert.equal(safeHref("javascript:alert(1)"), undefined);
  assert.equal(
    youtubeEmbed("https://youtube.com.evil.test/embed/abcdefghijk"),
    undefined,
  );
  assert.equal(
    youtubeEmbed("http://www.youtube.com/embed/abcdefghijk"),
    undefined,
  );
  assert.equal(
    youtubeEmbed("https://youtu.be/abcdefghijk"),
    "https://www.youtube.com/embed/abcdefghijk",
  );
  assert.equal(
    youtubeEmbed("https://www.youtube-nocookie.com/embed/abcdefghijk?start=12"),
    "https://www.youtube-nocookie.com/embed/abcdefghijk?start=12",
  );
});

function paragraph(
  key: string,
  text: string,
): NonNullable<PROJECTS_QUERY_RESULT[number]["description"]>[number] {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    listItem: null,
    level: null,
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", text, marks: [] }],
  };
}

test("rendered CMS paragraphs keep their boundaries", () => {
  const blocks = mapRichText([
    paragraph("first", "First paragraph."),
    paragraph("second", "Second paragraph."),
  ]);
  assert.equal(
    renderToStaticMarkup(createElement(RichText, { blocks })),
    "<p>First paragraph.</p><p>Second paragraph.</p>",
  );
});

test("About renders consecutive and nested items as one list", () => {
  for (const listItem of ["number", "bullet"] as const) {
    const blocks = mapRichText([
      { ...paragraph("first", "First"), listItem, level: 1 },
      { ...paragraph("second", "Second"), listItem, level: 1 },
      { ...paragraph("nested", "Nested"), listItem, level: 2 },
    ]);
    const html = renderToStaticMarkup(createElement(AboutBody, { blocks }));
    const tag = listItem === "number" ? "ol" : "ul";
    assert.equal((html.match(new RegExp(`<${tag} `, "g")) ?? []).length, 2);
    assert.ok(html.includes(`<li>First</li><li>Second<${tag}`), html);
    assert.ok(html.includes(`<li>Nested</li></${tag}></li></${tag}>`), html);
  }
});

test("a link spanning formatted text remains one anchor without merging separate links", () => {
  const block = paragraph("linked", "");
  block.markDefs = [
    { _key: "shared", _type: "link", href: "https://example.com" },
    { _key: "separate", _type: "link", href: "https://example.com" },
  ];
  block.children = [
    { _key: "first", _type: "span", text: "Read the ", marks: ["shared"] },
    {
      _key: "bold",
      _type: "span",
      text: "full article",
      marks: ["shared", "strong"],
    },
    { _key: "other", _type: "span", text: "Another link", marks: ["separate"] },
  ];
  const html = renderToStaticMarkup(
    createElement(RichText, { blocks: mapRichText([block]) }),
  );
  assert.equal(
    html,
    '<p><a href="https://example.com">Read the <strong>full article</strong></a><a href="https://example.com">Another link</a></p>',
  );
});

test("YouTube watch/share timestamps become embed start seconds", () => {
  const base = "https://www.youtube.com/embed/abcdefghijk";
  for (const [url, expected] of [
    ["https://www.youtube.com/watch?v=abcdefghijk&t=90s", "90"],
    ["https://youtu.be/abcdefghijk?t=90", "90"],
    ["https://youtu.be/abcdefghijk?t=1h2m3s", "3723"],
    ["https://www.youtube.com/shorts/abcdefghijk?start=12", "12"],
    ["https://youtu.be/abcdefghijk#t=2m", "120"],
    ["https://youtu.be/abcdefghijk?start=0&t=90", "0"],
  ])
    assert.equal(youtubeEmbed(url), `${base}?start=${expected}`);
  for (const timestamp of [
    "-2",
    "NaN",
    "Infinity",
    "1.5",
    "bad",
    "",
    "999999999999999999999999",
  ])
    assert.equal(
      youtubeEmbed(`https://youtu.be/abcdefghijk?t=${timestamp}`),
      base,
    );
  const embed = `${base}?start=90&rel=0`;
  assert.equal(youtubeEmbed(embed), embed);
});
