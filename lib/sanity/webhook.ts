/**
 * Configure a Sanity GROQ-powered webhook with these two values.
 *
 * The projection deliberately keeps both document states. A delete has no
 * `after()` value and a rename/move needs the old route as well as the new
 * route so the receiver can invalidate both sides of the change.
 */
export const revalidationWebhookFilter =
  '_type in ["project", "category", "aboutPage", "homePage", "siteSettings", "sanity.imageAsset"]';

export const revalidationAssetIdsProjection = /* groq */ `array::compact(
  [listing.image.asset._ref] +
  coalesce(gallery[].image.asset._ref, []) +
  [fashionCredits.logo.asset._ref] +
  coalesce(images[].image.asset._ref, []) +
  [
    seo.socialImage.asset._ref,
    defaultSeo.socialImage.asset._ref,
    representativeImage.asset._ref
  ]
)`;

export const revalidationWebhookProjection = /* groq */ `{
  "projectId": sanity::projectId(),
  "dataset": sanity::dataset(),
  "documentId": _id,
  "documentType": _type,
  "operation": delta::operation(),
  "before": before() {
    _id,
    _type,
    "slug": slug.current,
    "categoryId": category._ref,
    "categorySlug": category->slug.current,
    "assetIds": ${revalidationAssetIdsProjection}
  },
  "after": after() {
    _id,
    _type,
    "slug": slug.current,
    "categoryId": category._ref,
    "categorySlug": category->slug.current,
    "assetIds": ${revalidationAssetIdsProjection}
  }
}`;
