import { stegaClean } from "next-sanity";
import type {
  ABOUT_QUERY_RESULT,
  CATEGORIES_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "./types.generated";
import type {
  AboutViewModel,
  CategoryViewModel,
  ImageViewModel,
  MediaViewModel,
  ProjectViewModel,
  RichText,
  SeoViewModel,
  SiteSettingsViewModel,
} from "../content/types";
import { orderPortfolio, plainText, safeHref } from "../content/shared";

type ProjectResult = PROJECTS_QUERY_RESULT[number];
type ImageResult = NonNullable<NonNullable<ProjectResult["listing"]>["image"]>;
type TextResult = ProjectResult["description"];

export function mapImage(
  image: ImageResult | null | undefined,
): ImageViewModel | undefined {
  const asset = image?.asset;
  const dimensions = asset?.metadata?.dimensions;
  if (
    !asset?.url ||
    !dimensions?.width ||
    !dimensions.height ||
    dimensions.width <= 0 ||
    dimensions.height <= 0
  )
    return undefined;
  const crop = image?.crop;
  const hotspot = image?.hotspot;
  return {
    source: "sanity",
    src: stegaClean(asset.url),
    assetId: asset._id,
    width: dimensions.width,
    height: dimensions.height,
    blurDataURL: asset.metadata?.lqip ?? undefined,
    crop:
      crop &&
      crop.top != null &&
      crop.bottom != null &&
      crop.left != null &&
      crop.right != null
        ? {
            top: crop.top,
            bottom: crop.bottom,
            left: crop.left,
            right: crop.right,
          }
        : undefined,
    hotspot:
      hotspot &&
      hotspot.x != null &&
      hotspot.y != null &&
      hotspot.width != null &&
      hotspot.height != null
        ? {
            x: hotspot.x,
            y: hotspot.y,
            width: hotspot.width,
            height: hotspot.height,
          }
        : undefined,
  };
}

export function mapRichText(blocks: TextResult): RichText {
  return (blocks ?? []).map((block) => ({
    key: block._key,
    style: (() => {
      const style = stegaClean(block.style);
      return style === "h2" || style === "h3" ? style : "normal";
    })(),
    list: (() => {
      const listItem = stegaClean(block.listItem);
      return listItem === "bullet" || listItem === "number"
        ? listItem
        : undefined;
    })(),
    level: block.level ?? 1,
    spans: (block.children ?? []).map((span) => {
      const link = block.markDefs?.find((mark) =>
        span.marks?.includes(mark._key),
      );
      const href = safeHref(stegaClean(link?.href));
      return {
        key: span._key,
        text: span.text ?? "",
        marks: stegaClean(span.marks ?? []),
        href,
        linkKey: href ? link?._key : undefined,
      };
    }),
  }));
}

function mapSeo(seo: ProjectResult["seo"]): SeoViewModel {
  const image = mapImage(seo?.socialImage);
  return {
    title: seo?.metaTitle ?? undefined,
    description: seo?.metaDescription ?? undefined,
    socialImage: image
      ? { url: image.src, alt: seo?.socialImage?.alt ?? "", image }
      : undefined,
  };
}

function timestampSeconds(value: string | null): number | undefined {
  if (!value) return undefined;
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  const seconds = /^\d+$/.test(value)
    ? Number(value)
    : match
      ? Number(match[1] ?? 0) * 3600 +
        Number(match[2] ?? 0) * 60 +
        Number(match[3] ?? 0)
      : undefined;
  return seconds !== undefined && Number.isSafeInteger(seconds)
    ? seconds
    : undefined;
}

export function youtubeEmbed(value: string | null | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(stegaClean(value));
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return undefined;
    const host = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);
    let id: string | null | undefined;
    if (host === "youtu.be" && parts.length === 1) id = parts[0];
    if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
    ) {
      if (url.pathname === "/watch" && host !== "youtube-nocookie.com")
        id = url.searchParams.get("v");
      else if (
        ["embed", "shorts", "live"].includes(parts[0]) &&
        parts.length === 2
      )
        id = parts[1];
    }
    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return undefined;
    // Preserve existing embed parameters (e.g. start time) on trusted embeds.
    if (parts[0] === "embed") return url.href;
    const embed = new URL(`https://www.youtube.com/embed/${id}`);
    const start = [
      url.searchParams.get("start"),
      url.searchParams.get("t"),
      new URLSearchParams(url.hash.slice(1)).get("t"),
    ]
      .map(timestampSeconds)
      .find((value) => value !== undefined);
    if (start !== undefined) embed.searchParams.set("start", String(start));
    return embed.href;
  } catch {
    return undefined;
  }
}

export function mapProject(project: ProjectResult): ProjectViewModel | null {
  const slug = stegaClean(project.slug);
  const category = stegaClean(project.category?.slug);
  const listingImage = mapImage(project.listing?.image);
  // Incomplete drafts must not crash consumers or manufacture broken routes.
  if (!slug || !category || !listingImage) return null;
  const body = mapRichText(project.description);
  const media: MediaViewModel[] = (project.gallery ?? []).flatMap(
    (item): MediaViewModel[] => {
      if (item._type === "galleryImage") {
        const image = mapImage(item.image);
        return image
          ? [{ key: item._key, type: "image", image, alt: item.alt ?? "" }]
          : [];
      }
      const src = youtubeEmbed(item.url);
      return src
        ? [
            {
              key: item._key,
              type: "youtube",
              src,
              title: item.title ?? "Video",
            },
          ]
        : [];
    },
  );
  const logo = mapImage(project.fashionCredits?.logo);
  return {
    id: stegaClean(project._id),
    slug,
    category,
    order: project.order ?? Number.MAX_SAFE_INTEGER,
    title: project.title ?? "Untitled project",
    subtitle: project.subtitle?.text
      ? {
          text: project.subtitle.text,
          cyrillic: project.subtitle.isCyrillic ?? false,
        }
      : undefined,
    body,
    description: plainText(body),
    softwares: project.software ?? undefined,
    credits: (project.credits ?? []).map((credit) => ({
      key: credit._key,
      label: credit.label ?? "",
      value: credit.value ?? "",
      href: safeHref(stegaClean(credit.url)),
    })),
    media,
    listing: {
      image: listingImage,
      alt: project.listing?.alt ?? "",
      title: project.listing?.title ?? project.title ?? "Untitled project",
    },
    fashionCredits: logo
      ? {
          logo,
          alt: project.fashionCredits?.logoAlt ?? "",
          entries: (project.fashionCredits?.entries ?? [])
            .flatMap((entry) => {
              const position = entry.lookNumber;
              const mediaKey =
                position && Number.isInteger(position) && position > 0
                  ? project.gallery?.[position - 1]?._key
                  : undefined;
              return mediaKey && media.some((item) => item.key === mediaKey)
                ? [
                    {
                      key: entry._key,
                      position: position!,
                      mediaKey,
                      details: entry.details ?? "",
                    },
                  ]
                : [];
            })
            .sort((a, b) => a.position - b.position),
        }
      : undefined,
    seo: mapSeo(project.seo),
  };
}

export function mapCategory(
  category: CATEGORIES_QUERY_RESULT[number],
): CategoryViewModel | null {
  const slug = stegaClean(category.slug);
  if (!slug) return null;
  const override = mapImage(category.representativeImage);
  const image =
    override ?? mapImage(category.representativeProject?.listing?.image);
  return {
    id: category._id,
    slug,
    title: category.title ?? slug,
    order: category.order ?? Number.MAX_SAFE_INTEGER,
    image: image
      ? {
          image,
          alt:
            (override
              ? category.representativeImage?.alt
              : category.representativeProject?.listing?.alt) ?? "",
        }
      : undefined,
    projects: [],
  };
}
export function mapAbout(about: ABOUT_QUERY_RESULT): AboutViewModel | null {
  return about
    ? {
        heading: about.heading ?? "",
        body: mapRichText(about.content),
        images: (about.images ?? []).flatMap((item) => {
          const image = mapImage(item.image);
          return image ? [{ key: item._key, image, alt: item.alt ?? "" }] : [];
        }),
        seo: mapSeo(about.seo),
      }
    : null;
}
export function mapSettings(
  settings: SITE_SETTINGS_QUERY_RESULT,
): SiteSettingsViewModel | null {
  return settings
    ? {
        siteTitle: settings.siteTitle ?? "",
        contactEmail: stegaClean(settings.contactEmail ?? ""),
        socialLinks: [
          { key: "instagram", label: "Instagram", url: settings.instagramUrl },
          { key: "linkedin", label: "LinkedIn", url: settings.linkedinUrl },
        ].flatMap((item) => {
          const href = safeHref(stegaClean(item.url));
          return href ? [{ key: item.key, label: item.label, href }] : [];
        }),
        defaultSeo: mapSeo(settings.defaultSeo),
      }
    : null;
}
export function mapPortfolio(
  projects: PROJECTS_QUERY_RESULT,
  categories: CATEGORIES_QUERY_RESULT,
  about: ABOUT_QUERY_RESULT,
  settings: SITE_SETTINGS_QUERY_RESULT,
) {
  return {
    ...orderPortfolio(
      projects.map(mapProject).filter((item) => item !== null),
      categories.map(mapCategory).filter((item) => item !== null),
    ),
    about: mapAbout(about),
    settings: mapSettings(settings),
  };
}
