# Step 6A checkpoint — finalized 2026-09-06

The frontend now has typed view models and local/Sanity adapters for projects,
category ordering, About, contact/social settings and SEO. Project/category
components receive view models instead of looking up local project data. About
and layout read the local adapter. Modified presentation components are TypeScript.

Six explicit GROQ queries have generated result types. Studio TypeGen extracts
`studio/schema.json` and emits `lib/sanity/types.generated.ts`. The GitHub Actions
workflow installs both apps and checks generated-file freshness, lint, types,
content tests and the frontend build. The workflow is configured; its hosted CI
run is not claimed as part of this local validation.

## Validation results

| Check | Result |
| --- | --- |
| Root and Studio clean `npm ci` | Passed |
| Root and Studio typecheck/lint | Passed |
| Six-query TypeGen and freshness check | Passed |
| Deliberately stale generated output | Correctly rejected with exit 1; expected output restored |
| Content tests | 11 passed after review fixes |
| Server-only client configuration tests | 1 passed |
| Frontend production build (Turbopack) | Passed as part of the browser baseline |
| Studio production build | Passed |
| Desktop/mobile browser baseline | 20 passed; screenshot references unchanged |
| Route audit | All 16 routes returned 200 on both viewports; no console/page errors |
| Unknown project, metadata, client navigation and sitemap | Existing contract passed |

Browser reports use `baseline/reports/step6a-*.json`. The tests compare all 12
imported projects, their gallery/credit/category/navigation data, and the three
About images using committed migration fixtures and synthetic asset documents.
Additional cases cover partial drafts, image dimensions/crop/hotspot/LQIP,
rich-text formatting and links, stable keys, unsafe embed rejection, environment
validation, token-free published clients and stega-free metadata clients.

The four subsequent review findings are fixed and covered by rendered-HTML and
URL regression tests: CMS paragraph boundaries, About numbered/nested lists,
shared links across differently formatted spans, and YouTube timestamp conversion.
After those fixes, all 12 content/client tests, typecheck, lint, and all 20
production-build browser checks passed. The new browser reports use the
`step6a-review` prefix; screenshot references remain unchanged.

## Scope and remaining work

Routes still render local content without CMS environment variables. No dataset
was changed and no deployment was made. The Sanity reader is preparatory and
uses uncached reads; live content and real dataset parity are not verified here.
CMS image delivery/route migration belongs to 6B; authenticated Draft Mode and
cache/webhook behavior belong to 6C/6D. The existing navigation menu's local
image composition and contact literals remain part of that later migration.

The dependency audit remains at 12 findings for the frontend (4 high, 8 moderate)
and 9 for Studio (1 high, 8 moderate); this step does not resolve those findings.
Studio's build also reports auto-update runtime 6.12.0 versus installed Sanity/
Vision 6.11.0. Verify the deployed runtime before the later Studio cutover.
Netlify preview validation and production promotion remain pending.
