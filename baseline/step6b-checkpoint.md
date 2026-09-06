# Step 6B checkpoint — implemented locally on 2026-09-06

The route-facing project/category/About reads now use the published Sanity
repository. The project route is on-demand (`dynamicParams = true` with forced
dynamic rendering), published-only queries cause missing/unpublished projects
to reach the custom `app/not-found.tsx`, and the sitemap is generated from the
published CMS catalog.

`components/CmsImage.tsx` renders explicit `<img>` elements. Its Sanity image
builder candidates use the configured project and dataset with the fixed
`https://cdn.sanity.io` origin, preserve crop/hotspot data, request
`auto=format&q=80`, cap widths at the original asset width, and expose
layout-specific `sizes` values. Priority is limited to the first image-led
carousel/About image; other CMS images are lazy-loaded. Local navigation
montage assets remain application assets and are outside the CMS image path.

Validation passed:

- `npm run lint`
- `npm run typecheck`
- `npm run sanity:typegen:check`
- `npm run test:content` (11 content tests and 1 server-client test)
- CMS-configured `npm run build`
- server-render smoke check for one preload, CDN `srcset`, intrinsic dimensions
  and lazy loading

The browser baseline against a Netlify preview and live dataset remains part of
the 6 exit gate. No dataset writes, redirects, or deployments were performed.
