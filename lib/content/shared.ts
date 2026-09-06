import type { CategoryViewModel, ProjectViewModel, RichText } from "./types";

// Legacy content has no array keys. Derive stable identities from its content,
// not array positions; CMS arrays retain their authored _key instead.
export function localKey(value: string) {
  let hash = 2166136261;
  for (const character of value)
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return `local-${(hash >>> 0).toString(16)}`;
}
export function textBlocks(value: string | readonly string[]): RichText {
  return (typeof value === "string" ? [value] : value).map((text) => ({
    key: localKey(text),
    style: "normal",
    level: 1,
    spans: [{ key: localKey(text), text, marks: [] }],
  }));
}
export function plainText(body: RichText) {
  return body
    .map((block) => block.spans.map((span) => span.text).join(""))
    .join(" ");
}
export function safeHref(value: string | null | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol)
      ? value
      : undefined;
  } catch {
    return undefined;
  }
}
export function orderPortfolio(
  projects: ProjectViewModel[],
  categories: CategoryViewModel[],
) {
  const orderedCategories = [...categories].sort(
    (a, b) => a.order - b.order || a.id.localeCompare(b.id),
  );
  const linkedCategories = orderedCategories.map((category) => {
    const members = projects
      .filter((project) => project.category === category.slug)
      .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
    return {
      ...category,
      projects: members.map((project, index) => ({
        ...project,
        previousProject: members[index - 1]?.slug,
        nextProject: members[index + 1]?.slug,
      })),
    };
  });
  return {
    categories: linkedCategories,
    projects: linkedCategories.flatMap((category) => category.projects),
  };
}
