# Migration baseline

The Playwright suite records the behavior of the site before the framework,
routing, and CMS migrations.

## Capture the production reference

```bash
npm run baseline:production
```

This updates the committed screenshots and writes compact route and image
reports under `baseline/reports/`.

Running `npm run baseline:test` without `BASE_URL` first creates and serves a
local Next.js production build, then compares it with the committed reference.

The suite also verifies the App Router contract: route metadata, client-side
internal navigation without a document reload, and a 404 response for an
unregistered project slug.

Netlify's build command and npm version are committed in `netlify.toml`. This
overrides any older `yarn build` command left in the Netlify project UI, while
`.nvmrc` selects Node 24.18.0.

## Compare another deployment

```bash
BASE_URL="https://deploy-preview.example.netlify.app" \
BASELINE_LABEL="netlify-preview" \
npm run baseline:test
```

The React Three Fiber canvas is hidden before screenshots are taken because the
GLB homepage experience is scheduled for removal. The CSS gradient canvas with
the `homepage-background` ID remains visible. YouTube iframes are masked to keep
third-party content from making screenshots unstable.

Console errors and uncaught page errors are recorded in the route reports. They
are not automatically treated as failures, which lets the baseline document
pre-existing problems without expanding this migration step.

## Historical production drift

Earlier production and local builds did not render identically. The historical
route reports recorded these differences:

- `https://www.ronjastucken.com` has no viewport meta tag and renders every
  mobile route with a 980px layout viewport.
- The current repository build emits viewport metadata and renders those routes
  at the configured 390px mobile width.
- Home, About, and In Constant Flux also have desktop screenshot differences,
  which indicates that the public deployment is not visually identical to a
  fresh build of the current `master` commit.

On 2026-09-05, the pre-Next.js-16 checkpoint passed all 20 desktop/mobile tests,
including all committed screenshot comparisons, on Next.js 15.5.23 and React
19.2.8. Its reports use the `pre-next16` prefix. Historical drift should no longer
be assumed to explain a new failure. Do not update the committed screenshots
from a local build: production remains the reference URL. A Netlify Deploy
Preview must still be compared before promotion.
