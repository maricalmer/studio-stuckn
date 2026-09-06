import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  crop {top, bottom, left, right}, hotspot {x, y, width, height},
  asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}}
`;
const textFields = /* groq */ `
  _key, _type, style, listItem, level,
  children[]{_key, _type, text, marks}, markDefs[]{_key, _type, href}
`;
const seoFields = /* groq */ `
  metaTitle, metaDescription, socialImage {alt, ${imageFields}}
`;
const projectFields = /* groq */ `
  _id, title, "slug": slug.current, order,
  category->{_id, title, "slug": slug.current, order},
  subtitle {text, isCyrillic}, description[]{${textFields}}, software,
  credits[]{_key, label, value, url},
  gallery[]{_key, _type,
    _type == "galleryImage" => {alt, image {${imageFields}}},
    _type == "youtubeEmbed" => {url, title}
  },
  listing {title, alt, image {${imageFields}}},
  fashionCredits {logoAlt, logo {${imageFields}}, entries[]{_key, lookNumber, details}},
  seo {${seoFields}}
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc, _id asc) {${projectFields}}
`);
export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {${projectFields}}
`);
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc, _id asc) {
    _id, title, "slug": slug.current, order,
    representativeImage {alt, ${imageFields}},
    representativeProject->{_id, listing {alt, image {${imageFields}}}}
  }
`);
export const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    _id, heading, content[]{${textFields}}, images[]{_key, alt, image {${imageFields}}},
    seo {${seoFields}}
  }
`);
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id, siteTitle, contactEmail, instagramUrl, linkedinUrl, defaultSeo {${seoFields}}
  }
`);
export const DRAFT_REVISION_QUERY = defineQuery(`
  *[_type in ["project", "category", "aboutPage", "siteSettings"]] | order(_id asc) {
    _id, _updatedAt, _rev
  }
`);
export const PROJECT_SEO_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    title, "slug": slug.current, subtitle {text},
    "description": pt::text(description), seo {${seoFields}},
    listing {alt, image {${imageFields}}}
  }
`);
