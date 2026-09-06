# Step 6C checkpoint — implemented locally on 2026-09-06

Draft Mode now has custom enable/disable handlers. Enabling validates the Sanity Presentation
preview secret with the server-only Viewer token, preserves the Presentation perspective cookie,
uses partitioned cookies for a cross-site iframe, and redirects only to a sanitized same-origin
path. Disabling turns Draft Mode off and clears the Next and Sanity preview cookies.

Draft requests select the authenticated `drafts` perspective and retain Stega markers for rendered
content. Metadata requests explicitly disable Stega. The root layout mounts `VisualEditing`, an
exit-preview link, and the same-origin `DraftModeRefresh` client only while Draft Mode is enabled.
That client polls a server-computed revision digest; it never opens a browser Sanity connection and
the read token is never configured as a browser token. Published pages do not mount the refresh
client and the refresh endpoint returns 403 without Draft Mode.

Presentation uses the explicit frontend origins `http://localhost:3000` and
`https://www.ronjastucken.com`, with `/api/draft-mode/enable` and `/api/draft-mode/disable` wired
as its preview-mode handlers. Frontend CSP permits only the deployed Studio origin and the explicit
local Studio origin as `frame-ancestors`. Sanity API CORS is documented as a separate Manage
configuration with credentials enabled for the exact frontend origins.

Validation passed:

- root lint and typecheck
- Studio `npm run check` (including build and schema validation; auto-update warns that runtime
  Sanity/Vision are 6.12.0 while local packages are 6.11.0)
- Sanity TypeGen freshness check (7 queries)
- 11 content tests and 2 server/security tests
- CMS-configured Next.js production build
- browser-asset scan: no `SANITY_API_READ_TOKEN` or token value in `.next/static`
- published HTTP smoke check: `/` returned 200 with the expected CSP and no draft tooling in HTML
- unauthenticated draft-refresh HTTP smoke check: 403 with `Cache-Control: no-store`

The final authenticated-preview browser/network check remains pending a deployed preview and a
real Presentation secret. Sanity API CORS changes are external configuration and were not written
from this workspace. No dataset writes or deployments were performed.
