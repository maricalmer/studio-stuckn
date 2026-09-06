# Sanity frontend integration and cutover

The critical additions refine steps 6 and 7; they are not a separate sequence
to finish before repeating those steps. Only the framework checkpoint precedes
step 6. Tests are exit gates throughout, not a final phase after deployment.

## Current evidence

- Frontend upgraded from Next.js 15.5.23 to 16.2.12; React/React DOM 19.2.8,
  npm 11.16.0 and Node 24.18.0 retained. next-sanity 13.1.5 is installed;
  typed frontend Sanity clients, queries and adapters are implemented in step 6A.
- App Router and the shared project slug route already exist. The 6B route
  cutover now reads published Sanity data and permits on-demand project slugs.
- Studio and import reports exist. Treat the populated production dataset as
  potentially edited: another `createOrReplace` import can overwrite edits.
- The App Router sitemap now reads published Sanity projects, and the custom
  404 is implemented in `app/not-found.tsx`.
- The pre-upgrade run passed all committed screenshots. Earlier documented
  production drift is historical; preserve references and compare fresh evidence.
- Existing visual tests mask the GLB canvas. The requested model compatibility
  check must therefore be added independently before promotion.

## 5.5 Framework checkpoint — critical addition 1

- [x] Verify registry availability and peer compatibility for exact versions:
  Next.js 16.2.12, React/React DOM 19.2.8, and next-sanity 13.1.5 (or record
  an exact compatible replacement if necessary). Pin matching ESLint config.
- [x] Pin Netlify runtime 5.15.13 in the root package/lockfile and Netlify config.
- [ ] Validate actual runtime behavior in a Netlify preview, not just a local build.
- [x] Capture pre-upgrade install, lint, production build and full browser baseline.
- [x] Run the official Next.js upgrade codemod, review its changes, and keep
  frontend data local during this checkpoint.
- [x] Repeat clean install, lint, typecheck, production build and full baseline;
  record exact versions, failures and existing visual drift.

Exit: framework behavior is verified independently of CMS changes. An existing
visual discrepancy is not automatically accepted for production promotion.
See [checkpoint evidence](baseline/framework-checkpoint.md) for exact versions,
validation results and remaining deployment/dependency gates.

## 6A Data boundary — critical addition 2 and TypeGen additions

- [x] Add public project/dataset/Studio URL environment validation, server-only
  read-token/webhook-secret validation, and a root `.env.example`.
- [x] Add typed clients and explicit GROQ projections. Configure Studio TypeGen
  to scan frontend queries, emit frontend types, and fail CI on stale output.
- [x] Introduce `GROQ result → mapper → view model → component` and a local
  adapter first. Include projects, categories/order, About and site settings
  (email, social links, default SEO and social image).
- [x] Map `software` to the component contract, Portable Text, stable `_key`
  values, image dimensions/crop/hotspot/LQIP, fashion-credit gallery positions,
  and previous/next links derived from category/project ordering.
- [x] Preserve the single visible About image initially; retain all three CMS
  images so changing presentation can be an explicit later design decision.

Completed locally on 2026-09-06. See [step 6A evidence](baseline/step6a-checkpoint.md)
and the [data boundary guide](lib/content/README.md). No dataset writes or
deployments were performed.

## 6B Images and route migration — critical additions 3 and 4

- [x] Implement `CmsImage` with explicit Sanity `<img>`/`srcset` candidates,
  intrinsic dimensions and layout-specific `sizes`. Generate transforms using
  the Sanity image builder so crop/hotspot are respected; use `auto=format&q=80`.
- [x] Ensure all CMS candidates use `cdn.sanity.io`, bypass `/_next/image` and
  legacy Sharp/IPX, and avoid sources larger than the original asset.
- [x] Give each image-led route one appropriate LCP preload; lazy-load the
  remaining images. Do not force an image preload onto a route without an image LCP.
- [x] Switch one route family at a time: categories, projects, About, then global
  settings/metadata. Keep components dependent on view models.
- [x] Allow on-demand project rendering and return the custom 404 for missing,
  unpublished or deleted content. Keep all existing public URLs.
- [x] Preserve published slugs for the initial cutover; slug renames remain
  disabled until durable redirect history with collision/loop/reserved-route
  checks is implemented.
- [x] Generate sitemap entries from published CMS documents and clean metadata
  queries (`stega: false`), including canonical URLs and social images.

## 6C Draft preview — critical additions 5 and 8

Default policy: honor the requested server-only read token. Implement an
authenticated, server-mediated refresh mechanism for drafts; do not configure
a browser read token. A direct browser live subscription would require changing
that policy explicitly.

- [ ] Add Draft Mode enable/disable handlers, validate the Presentation preview
  secret, sanitize redirect destinations and clear the draft cookie on disable.
- [ ] Add Visual Editing overlays/click-to-edit and draft-only live refresh.
  Published visitors must not run live subscriptions or draft refresh requests.
- [ ] Configure Presentation `previewMode.enable` and `previewMode.disable`.
- [ ] Restrict iframe `frame-ancestors` to the deployed Studio and explicit
  development origin. Configure Presentation trust and Sanity API CORS separately.
- [ ] Use an explicit stable preview origin; avoid broad deployment wildcards.
- [ ] Verify token absence from published and authenticated draft browser bundles,
  responses and network requests under the server-only policy.

## 6D Published cache and webhook — critical addition 6

Use cached published server reads and a signed webhook with validated payloads.
Fail closed on missing secret, reject invalid signatures, account for CDN
consistency, and provide structured logs without secrets.

| Change | Invalidate |
| --- | --- |
| Project content/order/category | Project, old/new category listings, affected project navigation, sitemap |
| Category/order | Both affected listings and project navigation |
| About | `/about` and its metadata |
| Site settings | Global layout/metadata and all dependent routes |
| Slug rename, unpublish or delete | Old/new project paths, listings/navigation, sitemap; preserve redirect history if enabled |
| Referenced asset or SEO | All owning routes and their metadata |

- [ ] Specify webhook projection with before/after dependencies so deletes and
  moved documents still identify affected routes; use conservative shared tags
  where reverse dependencies cannot be determined reliably.
- [ ] Test malformed payloads, missing secrets, bad signatures, replay/retry
  behavior, new publication, rename policy, unpublish and delete.

## 6 exit gate

- [ ] Clean install, lint, type generation freshness, typecheck, production build.
- [ ] All 16 existing URLs return 200; unknown projects render a custom 404.
- [ ] Compare homepage, category, About, image-only, credited and video project
  screenshots on desktop/mobile; exercise navigation, carousel controls, About
  scrolling, fonts and the GLB model.
- [ ] Assert CMS host/srcset/widths/sizes, preload count, lazy loading, mobile
  transfer sizes and absence of CMS optimizer requests/Sharp/IPX errors.
- [ ] Compare imported counts, slugs, gallery order, alt text, credits,
  categories and previous/next links with the source baseline.
- [ ] Verify authorized/unauthorized Draft Mode, overlays, live edits, publish
  invalidation and the full new-project lifecycle after the original build.
- [ ] Verify titles/descriptions/canonicals/OG/sitemap and token isolation.

## 7A Cutover preparation — critical addition 7

- [ ] Export a dataset backup and verify it can be inspected/restored; record
  its location outside public assets and version control.
- [ ] Declare source-of-truth transition time and freeze both local and Studio
  edits during the final comparison.
- [ ] Generate a final local-versus-live diff, including drafts. Do not rerun
  `migration:import` automatically. Preserve editorial changes; perform another
  replacement only when the reviewed diff establishes that it is required.
- [ ] Guard or retire the importer when Sanity becomes authoritative.
- [ ] Resolve the seven recorded SEO warnings or record specific acceptance.
- [ ] Deploy Studio and configure exact local/preview/production origins and
  project, dataset, restricted Viewer token, Studio URL and webhook secret.
- [ ] Run the full exit gate against a production-equivalent Netlify preview;
  record deploy ID, tested runtime version, webhook configuration and rollback ID.

## 7B Promotion and observation

- [ ] Promote the verified deploy atomically and retain the prior Netlify deploy.
- [ ] Verify production routes, CMS images, metadata and signed publication
  revalidation immediately after promotion.
- [ ] Observe for at least 48 hours and through one successful editorial publish:
  Netlify image status/latency, Core Web Vitals, Sanity request volume, webhook
  failures/retries and 404s. Extend observation for unresolved regressions.
- [ ] Generate and review an unused-asset deletion manifest. Safelist fonts,
  icons, favicons, GLB and other application assets; check imports and URL uses.
- [ ] Remove migrated local content/images only after verification, in a separate
  commit. Preserve rollback capability and retain the dataset backup.

## Reference guidance

- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Netlify Next.js support](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
