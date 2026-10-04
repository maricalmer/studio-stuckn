# Step 7B checkpoint — promoted and under observation on 2026-10-04

## Candidate verification

The frozen, production-context Netlify preview passed all 24 desktop/mobile
Playwright checks:

- deploy: `6ac27db6fbf6fb99160edd91`;
- preview: `https://step7b-prod-context--gleeful-dasik-21eb4f.netlify.app`;
- runtime: Node `24.x`;
- Next adapter: `@netlify/plugin-nextjs@5.15.13`;
- reports: `baseline/reports/step7b-prod-context-*.json`.

## Promotion and rollback

The candidate was first promoted at 2026-10-04T16:27Z, then immediately rolled
back after production smoke checks failed. The retained production deploy was:

`6ac277b95518270008d0ca27`

The failed promotion was:

`6ac27db6fbf6fb99160edd91`

The failed production-context smoke run is preserved in
`baseline/reports/step7b-production-*.json`.

## Blocking routing defect

The direct Netlify preview origin served the expected Next.js app:

- HTTP 200;
- title `Studio.Stuckn, 3D artist based in Berlin`;
- no legacy frameset;
- Sanity CDN images present.

The custom domain `https://www.ronjastucken.com` instead served a Cloudflare
response containing the legacy `<frameset>` page:

- title `Studio.Stuckn`;
- no canonical metadata;
- no Sanity CDN images;
- `/api/revalidate` was also handled by the legacy frameset path.

DNS resolution returned Cloudflare addresses (`172.67.203.245` and
`104.21.37.48`). This initially indicated that the custom-domain routing/DNS or
Cloudflare origin configuration was not directing traffic to the promoted
Netlify deploy.

The Cloudflare DNS/origin path was corrected and verified directly. The
candidate was subsequently published successfully. Post-promotion smoke checks
returned HTTP 200 and confirmed the Next.js title, canonical metadata, Sanity
CDN image URLs, and absence of the legacy `<frameset>` response.

The 24-check production baseline passed after the DNS correction and before
promotion. The 48-hour observation window begins at the successful
post-promotion check on 2026-10-04T16:40Z and ends at 2026-10-06T16:40Z,
provided no regression is observed.

## 48-hour production monitoring checklist

Run the following checks once or twice daily during the observation window and
record the timestamp and result in this checkpoint.

### Routing and legacy response

```bash
curl -fsSL https://www.ronjastucken.com \
  | grep -q '<title>Studio.Stuckn, 3D artist based in Berlin</>' \
  && echo "title: OK" \
  || echo "title: FAIL"

curl -fsSL https://www.ronjastucken.com \
  | grep -qi frameset \
  && echo "frameset: FAIL" \
  || echo "frameset: OK"
```

### Main routes

```bash
for path in / /about /digital /physical; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://www.ronjastucken.com$path")
  echo "$status $path"
done
```

Each expected route should return `200`.

### Full regression and image check

```bash
BASE_URL="https://www.ronjastucken.com" \
BASELINE_LABEL="step7b-observation" \
npm run baseline:test
```

This checks routes, metadata, navigation, visual behavior, and Sanity CDN
image loading.

### Revalidation and runtime errors

Do not send an unsigned or synthetic `POST /api/revalidate`; the endpoint
requires a valid Sanity webhook signature and payload. Inspect Netlify runtime
logs instead, searching for:

- `sanity_revalidation_completed`
- `sanity_revalidation_failed`
- `sanity_revalidation_rejected`

Also check Netlify runtime logs and Cloudflare Analytics/request logs for HTTP
5xx responses, uncaught errors, or a routing regression. No dataset content
changes should be made solely for this observation check.

No dataset content was changed during the promotion or observation setup.
