# Existing-content migration

This migration converts the committed local portfolio content into the deployed Sanity schema. It
does not change the frontend or remove local images.

## Source and mapping

- `data/projects/*.ts` supplies the 12 project documents, credits, gallery order, alternative text,
  fashion credits, and YouTube embeds.
- `data/projects/index.ts` supplies category and project display order.
- `app/about/page.tsx`, `app/layout.tsx`, and the three `public/img/about` images supply the About and
  site-settings singletons. Homepage copy is defined in `migration/source.ts` and imported as the
  `homePage` singleton.
- The 125 WebP files used by migrated content under `public/img` are image candidates. Legacy
  navigation thumbnails under `public/img/nav` remain local and are not uploaded as orphan
  Sanity assets. The historical `marion.webp` navigation image represents the Digital category;
  reused listing/navigation paths map to one Sanity asset reference.
- The existing Cloudinary social image is uploaded separately for default SEO.

Document IDs are deterministic (`project-{slug}`, `category-{slug}`, `aboutPage`, `homePage`, and
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
`createOrReplace` in reference-safe order. Replacement is deliberately guarded during cutover;
only run it after reviewing the final local-versus-live diff and explicitly setting
`MIGRATION_ALLOW_REPLACE=1`:

```bash
MIGRATION_ALLOW_REPLACE=1 npm run migration:import
```

Run it a second time only when the reviewed diff establishes that replacement is required. The
second report should show zero uploaded assets, all assets reused, and the same 17 document IDs.

## Cutover boundary

The Next.js frontend continues to use `data/projects` and the repository images after this import.
Do not delete local images until the Sanity-powered frontend has passed route, content, image, SEO,
and visual-regression checks in a production-like preview.
