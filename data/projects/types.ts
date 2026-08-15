import type { StaticImageData } from "next/image";

export const projectSlugs = [
  "etherea-part-one",
  "etherea-part-two",
  "etherea-part-three",
  "alien-accessories",
  "in-constant-flux",
  "flanelle",
  "marie-claire",
  "seefashion",
  "reboot",
  "excessive-minimal",
  "page",
  "escapism",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
export type ProjectCategory = "digital" | "physical";

export interface ProjectSubtitle {
  text: string;
  cyrillic: boolean;
}

export type Credit = readonly [label: string, value: string];

export interface ImageMedia {
  type: "image";
  image: StaticImageData;
  alt: string;
}

export interface YoutubeMedia {
  type: "youtube";
  src: string;
  title: string;
}

export type ProjectMedia = ImageMedia | YoutubeMedia;

export interface ProjectListing {
  image: StaticImageData;
  alt: string;
  title: string;
}

export interface FashionCredits {
  logo: StaticImageData;
  alt: string;
  creditsPieces: Readonly<Record<number, string>>;
}

export interface Project {
  slug: ProjectSlug;
  category: ProjectCategory;
  title: string;
  subtitle?: ProjectSubtitle;
  description: string | readonly string[];
  softwares?: string;
  credits?: readonly Credit[];
  media: readonly ProjectMedia[];
  listing: ProjectListing;
  fashionCredits?: FashionCredits;
}
