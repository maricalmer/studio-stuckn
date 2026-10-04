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

The existing read-only validator was run with `npm run migration:validate`. It
did not contact the dataset because local source validation failed:

- local image candidates: 134; previous recorded expectation: 125;
- nine unassociated navigation images were reported under `public/img/nav/`;
- no missing files, missing alt text, duplicate slugs/orders, invalid gallery
  references, or invalid YouTube URLs were reported.

No `migration:import` or other dataset write was run. The previous live report
remains historical evidence only; it must not be treated as the final diff.

## Import guard

`migration:import` now fails unless `MIGRATION_ALLOW_REPLACE=1` is explicitly
provided. Do not provide that override until the image-count discrepancy and the
full local-versus-live comparison, including drafts, have been reviewed.
