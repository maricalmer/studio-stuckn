# Studio.Stuckn Sanity Studio

This directory contains the standalone Sanity Studio for the Studio.Stuckn portfolio. It has its
own npm dependencies and deploys through Sanity rather than Netlify.

## Local development

Run the Next.js frontend from the repository root:

```bash
npm run dev
```

Run the Studio in a second terminal:

```bash
cd studio
npm run dev
```

The frontend runs at `http://localhost:3000` and the Studio at `http://localhost:3333`.
`SANITY_STUDIO_PREVIEW_URL` can override the frontend shown by the Presentation Tool; see
`.env.example`.

## Automated validation

```bash
npm ci
npm run check
npm run validate:documents
```

- `check` runs TypeScript, Studio lint, a production build, and compiled-schema validation.
- `validate:documents` validates documents in the configured `production` dataset without changing
  them.

## Editor-experience checklist

Before deploying a schema change, confirm in the local Studio that:

- Projects are grouped into All, Digital, and Physical lists and sorted by display order.
- About Page and Site Settings open as singletons and are absent from the global Create menu.
- A project can contain ordered image and YouTube gallery items.
- Images without alternative text and YouTube items without accessible titles are rejected.
- Non-YouTube video URLs, reserved project slugs, duplicate slugs, and duplicate category positions
  are rejected.
- Fashion-credit gallery positions cannot be duplicated.
- Presentation links resolve projects to `/{slug}`, categories to `/digital` or `/physical`, and the
  About Page to `/about`.

Use unpublished drafts for manual validation and discard them when the checks are complete.
