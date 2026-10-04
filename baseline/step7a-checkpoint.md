# Step 7A checkpoint — cutover preparation started on 2026-10-04

## Dataset backup

- Source: Sanity project `35ex4ltc`, dataset `production`.
- Export: `/private/tmp/studio-stuckn-cutover/sanity-production-2026-10-04.tar.gz`.
- The export is outside the repository, public assets, and version control.
- Archive size: 130 MB.
- Verification: extracted successfully into
  `/private/tmp/studio-stuckn-cutover/restore-check`.
- Contents: 16 documents (12 `project`, 2 `category`, 1 `aboutPage`, 1
  `siteSettings`) and 126 asset records. The export completed without writes to
  the dataset.

The temporary backup directory is local machine state and must be retained until
the promotion and rollback window has ended. Copy it to the approved secure
backup location before that temporary directory is cleaned up.

## Local-versus-live comparison status

The migration candidate set now explicitly excludes the nine legacy navigation
thumbnails under `public/img/nav`; they remain local application assets. The
read-only `npm run migration:validate` comparison passed on 2026-10-04:

- local source validation is clean with 125 candidates and 126 expected assets;
- live contains all 16 expected documents and 126 expected assets;
- no missing documents/assets, semantic document mismatches, or unresolved
  references were found;
- no draft documents or draft-vs-published changes were found.

The validator now records field-level document diffs and draft state in the live
report. No `migration:import` or other dataset write was run.

## SEO warning acceptance

`npm run validate:documents` completed with zero errors and eight warning
markers across seven unique projects. The extra marker is the draft of
`project-etherea-part-three`; no draft content changes were found by the
local-versus-live comparison.

The warnings are accepted for the initial cutover because they reflect the
existing editorial descriptions and title, and changing them would alter
published copy without an editorial decision:

- descriptions: Etherea Part One (277 characters), Etherea Part Two (277),
  Etherea Part Three (277), Alien Accessories (404), In Constant Flux (169),
  and Reboot (348), against the 160-character advisory limit;
- title: Flanelle (66 characters), against the 60-character advisory limit.

The schema warnings remain intentionally enabled so future editorial changes
surface the same review prompt.

## Deployment readiness audit

The repository configuration was audited on 2026-10-04 at commit
`8ce8114` on branch `feat/cutover`:

- production frontend origin: `https://www.ronjastucken.com`;
- deployed Studio origin: `https://ronjastucken.sanity.studio`;
- local frontend/Studio origins: `http://localhost:3000` and
  `http://localhost:3333`;
- Presentation trust and frontend `frame-ancestors` use explicit origin
  allowlists; no deployment wildcard is configured;
- Netlify uses Node `24.18.0`, npm `11.16.0`, and the pinned Next adapter
  `5.15.13`.

Local production checks passed with network access:

- `npm run check` in `studio/` — typecheck, lint, Studio build, and schema
  validation; zero schema errors or warnings;
- `npm run build` at the repository root — Next.js 16.2.12 production build.

At the time of this audit, the final freeze, Studio deployment, exact
production/preview environment values, restricted Viewer/webhook credentials,
and production-equivalent preview exit gate were still pending. The completed
items are recorded below.

## Freeze and Studio deployment

The source-of-truth freeze was declared at `2026-10-04T16:07:41Z`. From that
time, no local content edits or Studio dataset edits should be made until the
production-equivalent preview comparison is complete.

The validated Studio was deployed successfully at:

`https://ronjastucken.sanity.studio/`

The Sanity API CORS list was inspected after deployment and contains exactly:

- `http://localhost:3333`
- `http://localhost:3000`
- `https://www.ronjastucken.com`

No wildcard origin was added. The deployed Studio returned its expected HTTP
redirect and the current production frontend returned HTTP 200 in read-only
smoke checks.

## Netlify preview exit gate

Netlify authentication was completed and the checkout was linked to the
existing site `gleeful-dasik-21eb4f` for `https://www.ronjastucken.com`.
Required production variable names were verified without printing values:
project ID, dataset, Studio URL, restricted Viewer token, revalidation secret,
and npm version. The existing production revalidation webhook remains the
`POST /api/revalidate` endpoint; no webhook or dataset content was changed.

The frozen checkout was deployed as a draft preview:

- deploy ID: `6ac27aa64e7ec928ab75cb0d`;
- preview URL: `https://6ac27aa64e7ec928ab75cb0d--gleeful-dasik-21eb4f.netlify.app`;
- Netlify runtime: Node `24.x`;
- Next adapter: `@netlify/plugin-nextjs@5.15.13`;
- rollback reference: prior production deploy
  `6ac277b95518270008d0ca27`.

The complete 24-test Playwright exit gate passed against the preview on desktop
and mobile, including routes, metadata/navigation, visual baselines, Sanity CDN
image transfer checks, and published credential/Stega isolation. Reports are
stored under `baseline/reports/step7a-preview-*.json`.

## Import guard

`migration:import` now fails unless `MIGRATION_ALLOW_REPLACE=1` is explicitly
provided. Do not provide that override until the image-count discrepancy and the
full local-versus-live comparison, including drafts, have been reviewed.
