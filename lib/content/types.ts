// Component contracts: no Sanity document types or local slug unions.
export interface ImageViewModel {
  source: "local" | "sanity";
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  assetId?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
}
export interface TextBlock {
  key: string;
  style: "normal" | "h2" | "h3";
  list?: "bullet" | "number";
  level: number;
  spans: {
    key: string;
    text: string;
    marks: string[];
    href?: string;
    linkKey?: string;
  }[];
}
export type RichText = readonly TextBlock[];
export interface SeoViewModel {
  title?: string;
  description?: string;
  socialImage?: { url: string; alt: string; image?: ImageViewModel };
}
export interface CreditViewModel {
  key: string;
  label: string;
  value: string;
  href?: string;
}
export type MediaViewModel =
  | { key: string; type: "image"; image: ImageViewModel; alt: string }
  | { key: string; type: "youtube"; src: string; title: string };
export interface FashionCreditsViewModel {
  logo: ImageViewModel;
  alt: string;
  entries: {
    key: string;
    position: number;
    mediaKey: string;
    details: string;
  }[];
}
export interface ProjectViewModel {
  id: string;
  slug: string;
  category: string;
  order: number;
  title: string;
  subtitle?: { text: string; cyrillic: boolean };
  body: RichText;
  description: string;
  softwares?: string;
  credits: CreditViewModel[];
  media: MediaViewModel[];
  listing: { image: ImageViewModel; alt: string; title: string };
  fashionCredits?: FashionCreditsViewModel;
  previousProject?: string;
  nextProject?: string;
  seo: SeoViewModel;
}
export interface CategoryViewModel {
  id: string;
  slug: string;
  title: string;
  order: number;
  image?: { image: ImageViewModel; alt: string };
  projects: ProjectViewModel[];
}
export interface AboutViewModel {
  heading: string;
  body: RichText;
  images: { key: string; image: ImageViewModel; alt: string }[];
  seo: SeoViewModel;
}
export interface SiteSettingsViewModel {
  siteTitle: string;
  contactEmail: string;
  socialLinks: { key: string; label: string; href: string }[];
  defaultSeo: SeoViewModel;
}
export interface PortfolioViewModel {
  projects: ProjectViewModel[];
  categories: CategoryViewModel[];
  about: AboutViewModel | null;
  settings: SiteSettingsViewModel | null;
}
