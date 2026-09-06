import assert from "node:assert/strict";
import test from "node:test";
import {
  getDraftClient,
  getMetadataClient,
  getPublishedClient,
} from "../lib/sanity/client";
import { getReadToken, getWebhookSecret } from "../lib/sanity/secrets";

test("only draft clients receive a read token; metadata stega is always disabled", () => {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "35ex4ltc";
  process.env.NEXT_PUBLIC_SANITY_DATASET = "production";
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL = "https://example.sanity.studio";
  process.env.SANITY_API_READ_TOKEN = "test-viewer-token";
  process.env.SANITY_REVALIDATE_SECRET = "test-webhook-secret";
  const published = getPublishedClient().config();
  const draft = getDraftClient().config();
  assert.equal(published.token, undefined);
  assert.equal(published.perspective, "published");
  assert.equal(published.stega.enabled, false);
  assert.equal(draft.token, "test-viewer-token");
  assert.equal(draft.perspective, "drafts");
  assert.equal(draft.useCdn, false);
  assert.equal(draft.stega.enabled, true);
  assert.equal(draft.stega.studioUrl, "https://example.sanity.studio");
  assert.equal(getMetadataClient().config().stega.enabled, false);
  assert.equal(getMetadataClient(true).config().stega.enabled, false);
  assert.equal(getWebhookSecret(), "test-webhook-secret");

  delete process.env.SANITY_API_READ_TOKEN;
  assert.throws(getReadToken, /SANITY_API_READ_TOKEN/);
  assert.throws(getDraftClient, /SANITY_API_READ_TOKEN/);
  assert.doesNotThrow(getPublishedClient);
  process.env.SANITY_REVALIDATE_SECRET = "invalid secret";
  assert.throws(getWebhookSecret, (error) => {
    assert.ok(error instanceof Error);
    assert.ok(!error.message.includes("invalid secret"));
    return true;
  });
});
