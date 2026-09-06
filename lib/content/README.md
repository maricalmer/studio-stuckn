# Frontend data boundary (step 6A)

Routes read `local.ts` and pass view models to components. The Sanity reader in
`../sanity/repository.ts` is available for step 6B but is not called by routes.
No importer or dataset mutation is part of this layer.

```
local project/site data → local adapter ──┐
                                       ├→ view models → components
GROQ queries → generated types → mapper ─┘
```

`types.ts` owns the component contracts. They use ordinary string slugs, keyed
rich-text blocks, credits and media. Image models preserve intrinsic dimensions
and local blur data or Sanity asset ID/crop/hotspot/LQIP. The `source` field will
let `CmsImage` select the CDN path in step 6B. Existing image components still
serve local assets during this step.

Both adapters order projects within their category, derive previous/next links
without wrapping or crossing categories, and link fashion credits to the keyed
gallery item at the authored one-based position. CMS `_key` values are retained;
local keys derive from content. Incomplete projects without a slug, category or
usable listing image are omitted; incomplete gallery assets are skipped while
fashion positions still refer to the original gallery. Missing singletons return
null. These behaviors keep partial drafts from creating broken components.

Rich text keeps paragraph boundaries and shared link annotation identities.
About renders its complete body in one pass so numbered and nested lists retain
their structure. The local project adapter combines legacy description arrays
into one display block to preserve the existing layout; their SEO description
still uses spaces between entries. CMS paragraphs remain separate blocks.
YouTube watch/share timestamps are converted to embed `start` seconds, while
existing validated embed URLs retain their parameters.

About retains all three images in order; the route renders only the first.
Local About/contact/default SEO values live in `data/site.ts`. Homepage copy,
canonical origin, social title branding and verification remain code-managed.

## Environment and client boundaries

Copy `.env.example` to `.env.local` when using the Sanity reader. Public project,
dataset and Studio URL values validate when a client is constructed, so a local
build works without credentials. Published clients are token-free; draft clients
read a Viewer token through a `server-only` module. Webhook secrets validate
separately on access. Validation errors name variables without revealing values.
The draft-client factory is internal infrastructure, not an authorization check;
6C must authenticate Draft Mode before using it.

Metadata clients and the SEO fetch helper disable stega. The preparatory reader
bypasses the API CDN and Next fetch cache. Published caching/webhook tags and
authenticated draft refresh must be implemented in 6C/6D before CMS cutover.

## Generate and verify types

Install both apps with npm, then run from the repository root:

```sh
npm run sanity:typegen
npm run sanity:typegen:check
npm run test:content
npm run typecheck
npm run lint
npm run baseline:test
```

Studio TypeGen scans the frontend query module and generates
`lib/sanity/types.generated.ts` from `studio/schema.json`. Commit both generated
files. Required-field enforcement is deliberately off because draft content may
be incomplete. TypeGen also runs during Studio development/build.

The freshness check compares files before and after regeneration and fails on
missing or changed output without relying on a git diff. GitHub Actions
runs this check after installing both lockfiles, then lint, types, content tests
and the production build. Screenshot comparisons remain a separate macOS/Netlify
baseline because the committed screenshots were captured on macOS.

Content tests execute the actual GROQ against the committed import preview with
synthetic asset documents. They compare the result against the extracted local
baseline and exercise partial drafts, ordering, rich text, image transforms,
environment validation and token/metadata client configuration. They do not
claim to verify live dataset contents or Draft Mode authorization.
