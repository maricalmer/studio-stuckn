# Next.js 16 checkpoint — 2026-09-05

This checkpoint changes the framework/dependency stack while the frontend still
reads local content. The merged CMS/cutover sequence is in
[`IMPLEMENTATION_PLAN.md`](../IMPLEMENTATION_PLAN.md).

## Exact versions

| Package/runtime | Before | After |
| --- | --- | --- |
| Node | 24.18.0 | 24.18.0 |
| npm | 11.16.0 | 11.16.0 |
| Next.js | 15.5.23 | 16.2.12 |
| React / React DOM | 19.2.8 | 19.2.8 |
| eslint-config-next | 15.5.23 | 16.2.12 |
| next-sanity | Not installed | 13.1.5 |
| @netlify/plugin-nextjs | Automatic selection | 5.15.13 pinned |
| @types/react | 19.2.18 | 19.2.18 |
| @types/react-dom | 19.2.4 | 19.2.7 |

The npm registry confirms next-sanity 13.1.5 requires Next.js 16 and React
19.2.3 or later. Its peer dependency tree is recorded in the root lockfile;
the separately hosted Studio retains its own package/lockfile.

## Upgrade changes

Ran the official versioned codemod:

```sh
npm exec --yes --package=@next/codemod@16.2.12 -- codemod upgrade 16.2.12
```

Accepted its three recommended transforms: `remove-experimental-ppr`,
`remove-unstable-prefix`, and `middleware-to-proxy`. They found no applicable
source changes. The upgrade changed package pins and React type overrides.

Replaced FlatCompat with Next.js 16's native ESLint flat config. Two existing
browser-initialization effects in AboutImage and HomeExperience retain a scoped
`react-hooks/set-state-in-effect` exception; all other files keep the new rule.
Next.js updated TypeScript JSX mode and included generated development types.
Added an explicit `typecheck` script because Next.js 16 builds do not run ESLint.

The build now uses Next.js 16's default Turbopack. Local portfolio image delivery
remains unoptimized during this checkpoint; responsive Sanity images belong to
step 6, where image behavior can be verified separately.

## Validation

Pre-upgrade: clean `npm ci`, ESLint and production build passed. All 20
Playwright checks passed, including desktop/mobile screenshots, route audit,
metadata/navigation/404/sitemap contract and image reports. Reports use the
`pre-next16` prefix. No screenshot references were updated.

Post-upgrade: clean `npm ci`, `npm run lint`, `npm run typecheck`, production
build (Turbopack) and all 20 Playwright checks passed. Reports use the `next16`
prefix. All 16 public routes return 200 on both viewports; unknown projects
return 404. All 14 screenshot comparisons passed with the existing 1% tolerance.
No screenshot references were updated. `npm ls` confirms the exact top-level
versions above and `git diff --check` passes.

The unknown-slug test logs Next.js `NoFallbackError` on both framework versions
while returning the expected 404; on-demand slug behavior remains step 6 work.

## Remaining gates

- Actual Netlify preview build/runtime validation remains required. Pinning the
  adapter and passing a local Next.js build do not demonstrate deployment success.
- The existing suite hides the GLB canvas and records image/console observations;
  it does not yet enforce all step 6 interaction, image and draft-security checks.
- npm audit reports 12 dependency findings (4 high, 8 moderate) after adding
  next-sanity and its peers, compared with 3 high before the upgrade. They require
  dependency/reachability review before promotion; no forced major downgrade or
  blanket override was applied to hide them.

## Sources

- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Netlify Next.js support and adapter pinning](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)

Netlify recommends automatic adapter updates. This checkpoint deliberately pins
the adapter to satisfy the reproducible-version requirement; revisit that pin
after cutover so future compatibility/security updates are not missed.
