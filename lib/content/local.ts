import { categoryProjectSlugs, projects } from "../../data/projects";
import { aboutContent, siteContent } from "../../data/site";
import aboutMain from "../../public/img/about/elbow_on_chair.webp";
import aboutHands from "../../public/img/about/low_hands.webp";
import aboutProfile from "../../public/img/about/profile.webp";
import digitalImage from "../../public/img/digital/etherea-part-two/marion.webp";
import { localKey, orderPortfolio, plainText, textBlocks } from "./shared";
import type {
  AboutViewModel,
  ImageViewModel,
  ProjectViewModel,
  SiteSettingsViewModel,
} from "./types";

const image = (value: Omit<ImageViewModel, "source">): ImageViewModel => ({
  ...value,
  source: "local",
});
const mappedProjects: ProjectViewModel[] = projects.map((project) => {
  // Legacy arrays were rendered as adjacent strings. Keep that presentation
  // in one block; CMS paragraphs retain their own block boundaries.
  const body = textBlocks(
    typeof project.description === "string"
      ? project.description
      : project.description.join(""),
  );
  const media = project.media.map((item) =>
    item.type === "image"
      ? {
          ...item,
          key: localKey(`${project.slug}:${item.image.src}:${item.alt}`),
          image: image(item.image),
        }
      : { ...item, key: localKey(`${project.slug}:${item.src}`) },
  );
  return {
    ...project,
    id: project.slug,
    order: categoryProjectSlugs[project.category].findIndex(
      (slug) => slug === project.slug,
    ),
    body,
    description: plainText(textBlocks(project.description)),
    media,
    credits: (project.credits ?? []).map(([label, value]) => ({
      key: localKey(`${label}:${value}`),
      label,
      value,
    })),
    listing: { ...project.listing, image: image(project.listing.image) },
    fashionCredits: project.fashionCredits
      ? {
          logo: image(project.fashionCredits.logo),
          alt: project.fashionCredits.alt,
          entries: Object.entries(project.fashionCredits.creditsPieces).flatMap(
            ([position, details]) => {
              const item = media[Number(position) - 1];
              return item
                ? [
                    {
                      key: localKey(`${item.key}:${details}`),
                      position: Number(position),
                      mediaKey: item.key,
                      details,
                    },
                  ]
                : [];
            },
          ),
        }
      : undefined,
    seo: {},
  };
});
const portfolio = orderPortfolio(mappedProjects, [
  {
    id: "digital",
    slug: "digital",
    title: "Digital",
    order: 0,
    image: {
      image: image(digitalImage),
      alt: "3D avatar representing digital work",
    },
    projects: [],
  },
  {
    id: "physical",
    slug: "physical",
    title: "Physical",
    order: 1,
    image: mappedProjects.find((project) => project.category === "physical")
      ?.listing,
    projects: [],
  },
]);

export function getLocalProject(slug: string) {
  return portfolio.projects.find((project) => project.slug === slug);
}
export function getLocalCategory(slug: string) {
  return portfolio.categories.find((category) => category.slug === slug);
}
export function getLocalProjects() {
  return portfolio.projects;
}
export function getLocalAbout(): AboutViewModel {
  return {
    ...aboutContent,
    body: textBlocks(aboutContent.paragraphs),
    images: [
      {
        key: "about-main",
        image: image(aboutMain),
        alt: "picture of ronja stuckn",
      },
      {
        key: "about-hands",
        image: image(aboutHands),
        alt: "Ronja Stucken with crossed arms",
      },
      {
        key: "about-profile",
        image: image(aboutProfile),
        alt: "Ronja Stucken in profile",
      },
    ],
  };
}
export function getLocalSettings(): SiteSettingsViewModel {
  return siteContent;
}
