# Step 6D checkpoint — implemented locally on 2026-09-06

Published Sanity queries now use `useCdn: true` and the Next.js Data Cache. Each query receives
shared `sanity:all` coverage plus tags for projects, categories, navigation, metadata, About,
settings, or sitemap data. The one-hour revalidation TTL is a fallback for a delayed webhook.
Draft perspective queries remain `no-store` and continue to use the server-only Viewer token.

`POST /api/revalidate` accepts only a signed Sanity webhook. It fails closed when the webhook secret
is absent, rejects malformed JSON, missing or invalid signatures, wrong project/dataset values,
unknown document types, draft/version IDs, and impossible create/update/delete state transitions.
Structured completion/rejection logs contain no payload, signature, token, or secret values.

The webhook projection in `lib/sanity/webhook.ts` preserves before/after IDs, slugs, category IDs and
slugs, and referenced asset IDs. Project slug renames invalidate both old and new paths; redirect
history is intentionally not created because slug redirects remain disabled during the initial
cutover. Unpublish/delete events use the before state, and new publications use the after state.
Asset events use the shared all-content tag and layout invalidation because reverse ownership cannot
be determined safely in a webhook projection. Repeated deliveries perform the same idempotent
operations and are safe for Sanity retries.

Validation covered:

- malformed payloads, missing secrets, invalid signatures, and environment mismatch;
- create/new publication, update, project slug rename, project category move, category changes,
  About, site settings, asset fallback, unpublish, and delete plans;
- repeated plan application with duplicate tags/paths removed and Next 16's `revalidateTag(tag,
  "max")` profile.

No dataset writes, webhook registration, or deployments were performed from this workspace.
