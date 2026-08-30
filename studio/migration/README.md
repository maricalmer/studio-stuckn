# Existing-content migration

This migration converts the committed local portfolio content into the deployed Sanity schema. It
does not change the frontend or remove local images.

## Source and mapping

- `data/projects/*.ts` supplies the 12 project documents, credits, gallery order, alternative text,
  fashion credits, and YouTube embeds.
- `data/projects/index.ts` supplies category and project display order.
- `app/about/page.tsx`, `app/layout.tsx`, and the three `public/img/about` images supply the About and
  site-settings singletons.
- All 125 WebP files under `public/img` are image candidates. The historical `marion.webp`
  navigation image represents the Digital category; reused listing/navigation paths map to one
  Sanity asset reference.
- The existing Cloudinary social image is uploaded separately for default SEO.

Document IDs are deterministic (`project-{slug}`, `category-{slug}`, `aboutPage`, and
`siteSettings`). Array keys derive from stable source content. Assets are keyed by SHA-256 in their
Sanity `source` metadata, allowing reruns to reuse uploads.

## Commands

Run commands from `studio/`:

```bash
npm run migration:dry-run
npm run migration:import
npm run migration:validate
npm run validate:documents
```

`migration:dry-run` performs no Sanity writes. It regenerates:

- `migration/extracted/existing-content.json`
- `migration/extracted/transformed-document-preview.json`
- `migration/reports/existing-content-dry-run.json`

`migration:import` uses the authenticated Sanity CLI user, uploads missing assets, and applies
`createOrReplace` in reference-safe order. Run it a second time to prove idempotency: the second
report should show zero uploaded assets, all assets reused, and the same 16 document IDs.

## Cutover boundary

The Next.js frontend continues to use `data/projects` and the repository images after this import.
Do not delete local images until the Sanity-powered frontend has passed route, content, image, SEO,
and visual-regression checks in a production-like preview.
