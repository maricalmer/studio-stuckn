# Ronja.Stucken Sanity Studio

This directory contains the standalone Sanity Studio for the Ronja Stucken portfolio. It has its
own npm dependencies and lockfile, and deploys through Sanity rather than Netlify.

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

## Deployment isolation

- Run frontend commands from the repository root and Studio commands from this directory.
- The root npm install does not install Studio dependencies; run `npm ci` here separately.
- Local Studio variables belong in `studio/.env.local`, which is ignored by Git. Do not put secrets
  in variables prefixed with `SANITY_STUDIO_`, because Studio code runs in the browser.
- Netlify builds only the Next.js frontend and skips commits that change only `studio/`.
- Deploy this Studio independently with `npm run deploy`. Its registered URL is
  `https://ronjastucken.sanity.studio`.

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
