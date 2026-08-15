import { alienAccessories } from "./alien-accessories";
import { escapism } from "./escapism";
import { ethereaPartOne } from "./etherea-part-one";
import { ethereaPartThree } from "./etherea-part-three";
import { ethereaPartTwo } from "./etherea-part-two";
import { excessiveMinimal } from "./excessive-minimal";
import { flanelle } from "./flanelle";
import { inConstantFlux } from "./in-constant-flux";
import { marieClaire } from "./marie-claire";
import { page } from "./page";
import { reboot } from "./reboot";
import { seefashion } from "./seefashion";
import {
  projectSlugs,
  type Project,
  type ProjectCategory,
  type ProjectSlug,
} from "./types";

export type {
  Credit,
  FashionCredits,
  ImageMedia,
  Project,
  ProjectCategory,
  ProjectListing,
  ProjectMedia,
  ProjectSlug,
  ProjectSubtitle,
  YoutubeMedia,
} from "./types";

export { projectSlugs };

export const categoryProjectSlugs = {
  digital: [
    "etherea-part-one",
    "etherea-part-two",
    "etherea-part-three",
    "alien-accessories",
  ],
  physical: [
    "in-constant-flux",
    "flanelle",
    "marie-claire",
    "seefashion",
    "reboot",
    "excessive-minimal",
    "page",
    "escapism",
  ],
} as const satisfies Record<ProjectCategory, readonly ProjectSlug[]>;

export const projects: readonly Project[] = [
  ethereaPartOne,
  ethereaPartTwo,
  ethereaPartThree,
  alienAccessories,
  inConstantFlux,
  flanelle,
  marieClaire,
  seefashion,
  reboot,
  excessiveMinimal,
  page,
  escapism,
];

const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;

export function getProject(slug: ProjectSlug): Project {
  return projectsBySlug[slug];
}

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return projectSlugs.includes(slug as ProjectSlug);
}

export function getAllProjectSlugs(): readonly ProjectSlug[] {
  return projectSlugs;
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return categoryProjectSlugs[category].map(getProject);
}

export interface AdjacentProjects {
  previousProject?: ProjectSlug;
  nextProject?: ProjectSlug;
}

export function getAdjacentProjects(slug: ProjectSlug): AdjacentProjects {
  const project = getProject(slug);
  const orderedSlugs = categoryProjectSlugs[project.category];
  const projectIndex = orderedSlugs.findIndex((projectSlug) => projectSlug === slug);

  return {
    previousProject: orderedSlugs[projectIndex - 1],
    nextProject: orderedSlugs[projectIndex + 1],
  };
}
