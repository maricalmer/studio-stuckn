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

## Import guard

`migration:import` now fails unless `MIGRATION_ALLOW_REPLACE=1` is explicitly
provided. Do not provide that override until the image-count discrepancy and the
full local-versus-live comparison, including drafts, have been reviewed.
