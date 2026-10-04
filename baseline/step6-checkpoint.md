# Step 6 exit-gate checkpoint — 2026-10-04

## Exit decision

**Status: Passed. Browser interactions, authenticated Presentation, token isolation, and the
deployed create/publish/delete lifecycle all passed.**

Step 7A may begin.

## Deployment under test

| Item | Value |
| --- | --- |
| Netlify preview | `https://deploy-preview-16--gleeful-dasik-21eb4f.netlify.app` |
| Deploy ID | `6ac23aa8e03dca000813c064` |
| Deploy state | Ready; Next.js plugin state successful |
| Branch | `feat/sanitiy-draft` |
| Commit | `ad5ce2fd76830873119a47a0d11e5ee060a37fbe` |
| Origin parity | Local `HEAD` and `origin/feat/sanitiy-draft` matched the deployed commit |

The Netlify deploy API was checked after the final commit and reported the deploy ready at
2026-10-04T11:39:14Z. The full browser suite was then rerun against the preview alias.

## Runtime and tooling

| Component | Version |
| --- | --- |
| Node.js | `24.18.0` (`.nvmrc`; package contract `>=24.18.0 <25`) |
| npm | `11.16.0` in Netlify configuration |
| Next.js | `16.2.12` |
| React / React DOM | `19.2.8` |
| Netlify Next.js plugin | `5.15.13` |
| Playwright | `1.62.1` |
| Sanity Studio / Vision | `6.17.0` |

The application and tool versions above are locked in the repository. Netlify accepted the pinned
configuration and completed the deploy successfully.

## Browser baseline and route checks

The following command passed against the final deploy:

```sh
BASE_URL="https://deploy-preview-16--gleeful-dasik-21eb4f.netlify.app" \
BASELINE_LABEL="step6-netlify" \
npm run baseline:test
```

Result: **24/24 Playwright tests passed** in approximately 1.5 minutes.

- All 16 public routes returned 200 at 1440 px and 390 px viewports.
- The route reports contain no console errors or uncaught page errors.
- The phone viewport rendered at 390 px with the expected viewport metadata and no horizontal
  overflow recorded by the route audit.
- Seven representative routes matched their committed full-page references on both viewports.
- Homepage, category and project metadata passed; canonical URLs use
  `https://www.ronjastucken.com`.
- Internal project navigation remained client-side, and an unknown project returned 404.

Evidence:

- `baseline/reports/step6-netlify-routes-desktop.json`
- `baseline/reports/step6-netlify-routes-mobile.json`
- committed Playwright screenshot references under `tests/baseline.spec.js-snapshots/`

Additional deployed-browser interaction verification passed on 2026-10-04:

- Carousel controls moved the horizontal viewport from `0` to `600` and back to `0`.
- About scrolling reached `scrollY=900`; the responsive image expanded from 396 px to 720 px.
- The GLB route returned 200 and rendered one visible WebGL canvas with no browser errors.

## CMS image, source and `srcset` checks

The CMS image contract passed on `/digital`, `/physical`, `/etherea-part-one` and `/about` for both
viewports.

- All rendered CMS image sources and responsive candidates use `https://cdn.sanity.io` directly;
  none are routed through `/_next/image`.
- Every audited CMS image has non-empty `srcset` and `sizes` attributes.
- Candidate widths are positive, ordered and bounded by the source-image dimensions.
- Each audited route emits at most one LCP image preload, and its source is on the Sanity CDN.
- The resource reports contain 35 representative image responses per viewport; all 70 responses
  returned 200 and all use the Sanity CDN.

Evidence:

- `baseline/reports/step6-netlify-images-desktop.json`
- `baseline/reports/step6-netlify-images-mobile.json`

## SEO and sitemap checks

- `/sitemap.xml` returned 200 with `application/xml` on the final deploy.
- The sitemap contains exactly the 16 expected canonical production URLs.
- The obsolete `www.studiostuckn.com` origin and unsupported `<lastmod>` values are absent.
- Priority values remain one homepage at `1`, three section pages at `0.8`, and twelve project
  pages at `0.64`.
- Published metadata contains a title, description and production canonical URL and is free of
  Draft Mode credentials and Stega metadata.

## Draft Mode, Presentation and Visual Editing

The deployed Draft Mode boundary behaved correctly in server probes:

- `GET /api/draft-mode/enable` without a Presentation secret returned 401.
- `GET /api/draft-mode/refresh` without an authenticated Draft Mode session returned 403.
- A valid temporary Presentation secret was previously accepted by the deployed enable handler
  and produced the expected redirect without exposing the server read token.
- The local standalone Studio was configured to frame the exact deploy-preview origin. The earlier
  nested Sanity Dashboard framing failure was avoided by opening the Studio directly at
  `http://localhost:3333`.

Authenticated Playwright verification passed on 2026-10-04:

- `__prerender_bypass`, `sanity-preview-perspective=drafts` and
  `sanity-preview-partitioned=1` were present, Secure, SameSite=None and partitioned.
- Visual Editing rendered five interactive overlay nodes; clicking the title overlay focused the
  exact Studio field.
- A disposable draft title update appeared in the embedded preview without publication.
- The disposable project was published and appeared at its on-demand route and category listing.
- All disposable draft and published documents were removed after each run; the final Content Lake
  cleanup count was zero.

The delete phase exposed the remaining exit-gate defect: the signed delete webhook returned 200,
but the project route continued returning stale HTTP 200 content for more than 60 seconds. A fresh
request showed `age: 0`, `Cache-Control: private,no-cache,no-store` and the deleted project body,
which ruled out a stale browser or Netlify edge response. The published Sanity client was still
using the Sanity API CDN, so regeneration could refill Next's Data Cache with a Content Lake CDN
response predating the delete. `lib/sanity/client.ts` now uses `useCdn: false`, as required for
webhook/tag revalidation; this local fix must be deployed and the full lifecycle rerun.

## Publish and webhook revalidation

The temporary deploy-preview webhook initially returned 400 because its `assetIds` projection
produced nested arrays. The projection was changed to concatenate scalar arrays and compact the
result. A `groq-js` regression test now proves that the projection always produces one flat string
array, including when optional image fields are absent.

After the projection was corrected, the Sanity webhook delivery at
2026-10-04T11:13:44.893Z returned **200 success**. The earlier 400 delivery at
2026-10-04T11:07:04.804Z is retained as historical diagnostic evidence and is not the final result.
An unsigned/invalid-signature POST to the final deployed `/api/revalidate` endpoint returned 401,
confirming that the endpoint fails closed.

The later lifecycle run generated both create and delete deliveries at 2026-10-04T15:05Z. Both
returned HTTP 200 (approximately six seconds each), proving signed webhook acceptance. The delete
delivery also provided the old slug and category required by the invalidation plan. The temporary
preview webhook was removed after diagnosis; the production revalidation webhook remains in place.

The post-fix deployed lifecycle was rerun on 2026-10-04 with disposable slug
`step-6-cache-check`. The project route returned 200 after publication and the project appeared in
the `/physical` listing. After deletion, the Sanity query returned `null`, the signed preview
webhook returned 200 with `{"revalidated":true,"tags":9,"paths":3}`, the project route returned
404, and the project was absent from `/physical`. The temporary preview webhook was then removed;
the production webhook remains in place.

## Token isolation

Published-page automation passed on desktop and mobile:

- no `sanity-preview-secret` in HTML;
- no `SANITY_API_READ_TOKEN` identifier or configured token value in HTML;
- no configured read token in observed request URLs; and
- the unauthenticated refresh endpoint returned 403.

The authenticated draft HTML supplied during the review was also compared with the locally
configured secret values without printing them. It contained neither the read token nor the
webhook secret, no `Authorization`/Bearer credential, no preview-secret parameter and no direct
`api.sanity.io` URL. Public `cdn.sanity.io` image URLs were expected and present.

The authenticated Presentation scan covered 52 frontend response bodies and 98 preview-frame
requests. No configured read token, webhook secret or CLI credential appeared; no preview request
carried an Authorization header or directly accessed `*.api.sanity.io`. Studio-parent Sanity API
traffic was intentionally excluded from the frontend isolation boundary.

Do not export or commit a HAR containing cookies, Presentation secrets or Studio credentials.

## Supporting validation

The branch's CI was reported green. Before the final deploy, local validation also passed lint,
typecheck and the content/server/revalidation test suites. The final deployed-browser rerun did not
change the committed route or image reports, demonstrating that the recorded results are
reproducible on the exact deployed commit.

## Closure rule

Step 6 is complete. The CDN-bypass change was deployed and the disposable lifecycle confirmed
route/listing creation and removal after signed webhook delivery. Proceed to Step 7A's dataset
backup and local-versus-live content diff.
