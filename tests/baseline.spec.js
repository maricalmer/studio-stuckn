const { expect, test } = require("@playwright/test");
const fs = require("node:fs/promises");
const path = require("node:path");

// This suite captures the site's behavior before the framework and routing
// migrations. It can run against production, a Netlify preview, or the local
// production server through Playwright's configurable baseURL.

// Every currently public route is treated as part of the compatibility
// contract. The route audit below checks all of them, even though only a
// representative subset needs visual snapshots and image measurements.
const ROUTES = [
  "/",
  "/about",
  "/alien-accessories",
  "/digital",
  "/escapism",
  "/etherea-part-one",
  "/etherea-part-three",
  "/etherea-part-two",
  "/excessive-minimal",
  "/flanelle",
  "/in-constant-flux",
  "/marie-claire",
  "/page",
  "/physical",
  "/reboot",
  "/seefashion",
];

// Each tuple is [stable snapshot name, public route]. These pages cover the
// main layouts: home, category, about, image project, credits, and video.
const SCREENSHOT_ROUTES = [
  ["home", "/"],
  ["digital", "/digital"],
  ["physical", "/physical"],
  ["about", "/about"],
  ["etherea-part-one", "/etherea-part-one"],
  ["flanelle", "/flanelle"],
  ["in-constant-flux", "/in-constant-flux"],
];

// Measuring a representative subset keeps the audit reasonably fast while
// still covering the main image-heavy page shapes.
const IMAGE_AUDIT_ROUTES = [
  ["home", "/"],
  ["digital", "/digital"],
  ["physical", "/physical"],
  ["etherea-part-one", "/etherea-part-one"],
  ["flanelle", "/flanelle"],
];

// BASELINE_LABEL keeps reports from different environments separate, e.g.
// "production" and "netlify-preview". Sanitize it before using it as a name.
const reportLabel = (process.env.BASELINE_LABEL || "local").replace(
  /[^a-z0-9_-]/gi,
  "-",
);
const reportDirectory = path.join(process.cwd(), "baseline", "reports");

// Reports are intentionally plain JSON so they can be committed, diffed, and
// inspected without Playwright-specific tooling.
async function writeReport(name, projectName, data) {
  await fs.mkdir(reportDirectory, { recursive: true });
  const filename = `${reportLabel}-${name}-${projectName}.json`;
  await fs.writeFile(
    path.join(reportDirectory, filename),
    `${JSON.stringify(data, null, 2)}\n`,
  );
}

// Collect browser console errors and uncaught page exceptions while one route
// is loading. They are recorded as baseline evidence rather than immediately
// failing the test, so known legacy issues can be distinguished from new ones.
function observePage(page) {
  const consoleErrors = [];
  const pageErrors = [];

  const handleConsole = (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  };
  const handlePageError = (error) => pageErrors.push(error.message);

  page.on("console", handleConsole);
  page.on("pageerror", handlePageError);

  return {
    consoleErrors,
    pageErrors,
    stop() {
      // A single Page visits many routes in the audit. Detaching these handlers
      // prevents errors from later routes leaking into an earlier observation.
      page.off("console", handleConsole);
      page.off("pageerror", handlePageError);
    },
  };
}

// Resource Timing can omit cross-origin byte counts unless the server exposes
// timing headers. Response events give us a dependable inventory and HTTP
// content length; the timing data is merged in when the browser provides it.
function observeImageResponses(page) {
  const responses = new Map();

  const handleResponse = (response) => {
    if (response.request().resourceType() !== "image") return;

    const headers = response.headers();
    responses.set(response.url(), {
      url: response.url(),
      status: response.status(),
      contentType: headers["content-type"] || null,
      contentLength: Number(headers["content-length"]) || null,
    });
  };

  page.on("response", handleResponse);

  return {
    responses,
    stop() {
      page.off("response", handleResponse);
    },
  };
}

// Wait for deterministic rendering before measuring or taking a screenshot.
// Fonts always need to be ready; image-heavy visual checks additionally need
// lazy images to be requested and decoded.
async function settlePage(page, { loadAllImages = false } = {}) {
  await page.waitForLoadState("load");
  await page.evaluate(() => document.fonts.ready);

  if (loadAllImages) {
    // Next/Image loads off-screen images lazily. Moving through the full page
    // and any horizontal galleries triggers those requests before returning to
    // the initial position.
    await page.evaluate(async () => {
      // Native lazy loading can otherwise leave the last image as its blur
      // placeholder when a full-page screenshot starts. The baseline wants the
      // finished page, so request every image eagerly for this test only.
      for (const image of document.images) image.loading = "eager";

      const step = Math.max(window.innerHeight * 0.8, 400);
      for (
        let position = 0;
        position < document.body.scrollHeight;
        position += step
      ) {
        window.scrollTo(0, position);
        await new Promise((resolve) => setTimeout(resolve, 75));
      }

      // The loop's last increment can stop just short of the current bottom.
      // Visit it explicitly so the final lazy image enters the viewport.
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise((resolve) => setTimeout(resolve, 150));

      for (const scroller of document.querySelectorAll(".carousel")) {
        const horizontalStep = Math.max(scroller.clientWidth * 0.8, 300);
        for (
          let position = 0;
          position < scroller.scrollWidth;
          position += horizontalStep
        ) {
          scroller.scrollLeft = position;
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        scroller.scrollLeft = 0;
      }

      window.scrollTo(0, 0);
    });

    // A broken or permanently lazy image must not hang the whole suite. Wait up
    // to 15 seconds for requests, then decode whichever images did complete.
    await page
      .waitForFunction(
        () => [...document.images].every((image) => image.complete),
        undefined,
        { timeout: 15_000 },
      )
      .catch(() => {});

    await page.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images
          .filter((image) => image.complete && image.naturalWidth > 0)
          .map((image) => image.decode?.().catch(() => {})),
      );
    });
  }

  await page.waitForTimeout(250);
}

// The React Three Fiber/GLB experience is scheduled for removal and is not a
// compatibility requirement. Hide that canvas while retaining the CSS gradient
// drawn by the explicitly identified homepage background canvas.
async function stabilizeScreenshot(page) {
  await page.locator("canvas:not(#homepage-background)").evaluateAll((canvases) => {
    for (const canvas of canvases) canvas.style.visibility = "hidden";
  });
}

test.describe("route baseline", () => {
  test("records all public routes", async ({ page }, testInfo) => {
    const results = [];

    for (const route of ROUTES) {
      const observations = observePage(page);
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      await settlePage(page);
      observations.stop();

      // These values make responsive mismatches diagnosable. In particular, a
      // missing viewport meta tag makes a phone render a roughly 980px desktop
      // layout even though the browser window itself is only 390px wide.
      const rendering = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        viewportMeta:
          document.querySelector('meta[name="viewport"]')?.content || null,
      }));

      results.push({
        route,
        status: response?.status() ?? null,
        finalUrl: page.url(),
        rendering,
        consoleErrors: observations.consoleErrors,
        pageErrors: observations.pageErrors,
      });

      // Console errors are reported above, but HTTP failures are always a hard
      // regression because every listed route is expected to remain public.
      expect(response, `${route} should return a document response`).not.toBeNull();
      expect(response.status(), `${route} should not return an error`).toBeLessThan(400);
    }

    await writeReport("routes", testInfo.project.name, results);
  });
});

test.describe("App Router contract", () => {
  test("serves metadata, navigates client-side, and rejects unknown projects", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Studio.Stuckn, 3D artist based in Berlin");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.ronjastucken.com",
    );

    await page.goto("/digital", { waitUntil: "domcontentloaded" });
    await settlePage(page);
    await expect(page).toHaveTitle("Digital | Studio.Stuckn");

    const documentRequests = [];
    page.on("request", (request) => {
      if (request.resourceType() === "document") documentRequests.push(request.url());
    });

    await page.locator('a[href="/etherea-part-one"]').click();
    await expect(page).toHaveURL(/\/etherea-part-one$/);
    await expect(page).toHaveTitle("Etherea Part 1 | Studio.Stuckn");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.ronjastucken.com/etherea-part-one",
    );
    expect(documentRequests, "internal navigation should not reload the document").toEqual([]);

    const unknownResponse = await page.goto("/not-a-registered-project", {
      waitUntil: "domcontentloaded",
    });
    expect(unknownResponse?.status()).toBe(404);

    const sitemapResponse = await page.request.get("/sitemap.xml");
    expect(sitemapResponse.status()).toBe(200);

    const sitemap = await sitemapResponse.text();
    const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    const expectedUrls = ROUTES.map(
      (route) => new URL(route, "https://www.ronjastucken.com").href,
    );

    expect(sitemapUrls).toHaveLength(16);
    expect(sitemapUrls.toSorted()).toEqual(expectedUrls.toSorted());
    expect(sitemap).not.toContain("www.studiostuckn.com");
    expect(sitemap).not.toContain("<lastmod>");
    expect(sitemap.match(/<priority>1<\/priority>/g)).toHaveLength(1);
    expect(sitemap.match(/<priority>0.8<\/priority>/g)).toHaveLength(3);
    expect(sitemap.match(/<priority>0.64<\/priority>/g)).toHaveLength(12);
  });
});

test.describe("visual baseline", () => {
  for (const [name, route] of SCREENSHOT_ROUTES) {
    test(`${name} matches its reference`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await settlePage(page, { loadAllImages: true });
      await stabilizeScreenshot(page);

      // Third-party YouTube iframe rendering changes independently of this app,
      // so mask it. A small pixel tolerance absorbs browser rasterization noise
      // while still catching meaningful layout, typography, and content shifts.
      await expect(page).toHaveScreenshot(`${name}.png`, {
        animations: "disabled",
        fullPage: true,
        maxDiffPixelRatio: 0.01,
        mask: [page.locator("iframe")],
      });
    });
  }
});

test.describe("image transfer baseline", () => {
  test("records representative image resources", async ({ page }, testInfo) => {
    const results = [];

    for (const [name, route] of IMAGE_AUDIT_ROUTES) {
      const imageResponses = observeImageResponses(page);
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await settlePage(page, { loadAllImages: true });
      imageResponses.stop();

      const resourceTimings = await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((entry) => ({
            url: entry.name,
            initiatorType: entry.initiatorType,
            // transferSize includes response headers; encodedBodySize is the
            // compressed payload; decodedBodySize is its decoded byte size.
            transferSize: entry.transferSize,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize,
          })),
      );

      const timingByUrl = new Map(
        resourceTimings.map((timing) => [timing.url, timing]),
      );
      // Response arrival order varies with network and cache timing. Sorting by
      // URL keeps committed reports stable when the measured values did not
      // actually change.
      const images = [...imageResponses.responses.values()]
        .map((response) => ({
          ...response,
          initiatorType: timingByUrl.get(response.url)?.initiatorType || null,
          transferSize: timingByUrl.get(response.url)?.transferSize ?? null,
          encodedBodySize: timingByUrl.get(response.url)?.encodedBodySize ?? null,
          decodedBodySize: timingByUrl.get(response.url)?.decodedBodySize ?? null,
        }))
        .sort((left, right) => left.url.localeCompare(right.url));

      results.push({ name, route, images });
    }

    await writeReport("images", testInfo.project.name, results);
  });
});
