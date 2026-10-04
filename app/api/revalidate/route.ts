import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { getPublicEnvironment } from "@/lib/sanity/env";
import {
  invalidateRevalidationPlan,
  planRevalidation,
  validateRevalidationPayload,
} from "@/lib/sanity/revalidation";
import { getWebhookSecret } from "@/lib/sanity/secrets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store" };

function response(message: string, status: number) {
  return new Response(message, { status, headers: noStoreHeaders });
}

export async function POST(request: NextRequest) {
  let secret: string;
  try {
    secret = getWebhookSecret();
  } catch {
    // A missing secret must fail closed. Do not log the secret or the error
    // text because configuration errors can accidentally contain values.
    console.error(
      JSON.stringify({ event: "sanity_revalidation_rejected", reason: "missing-secret" }),
    );
    return response("Webhook unavailable", 503);
  }

  let parsed: Awaited<ReturnType<typeof parseBody<unknown>>>;
  try {
    // The consistency wait gives Sanity's API CDN time to expose the newly
    // published document before the next cached request regenerates it.
    parsed = await parseBody<unknown>(request, secret, true);
  } catch {
    console.warn(
      JSON.stringify({ event: "sanity_revalidation_rejected", reason: "malformed-json" }),
    );
    return response("Invalid webhook payload", 400);
  }

  if (parsed.isValidSignature !== true) {
    console.warn(
      JSON.stringify({ event: "sanity_revalidation_rejected", reason: "bad-signature" }),
    );
    return response("Invalid webhook signature", 401);
  }

  let environment: ReturnType<typeof getPublicEnvironment>;
  try {
    environment = getPublicEnvironment();
  } catch {
    console.error(
      JSON.stringify({ event: "sanity_revalidation_rejected", reason: "invalid-environment" }),
    );
    return response("Webhook unavailable", 503);
  }

  const validation = validateRevalidationPayload(parsed.body, environment);
  if (!validation.ok) {
    console.warn(
      JSON.stringify({
        event: "sanity_revalidation_rejected",
        reason: validation.reason,
      }),
    );
    return response("Invalid webhook payload", 400);
  }

  const plan = planRevalidation(validation.value);
  try {
    invalidateRevalidationPlan(plan, revalidateTag, revalidatePath);
  } catch {
    console.error(
      JSON.stringify({
        event: "sanity_revalidation_failed",
        documentType: validation.value.documentType,
        operation: validation.value.operation,
      }),
    );
    return response("Revalidation unavailable", 503);
  }

  // This is deliberately structured and contains only public event metadata;
  // never include the request body, signature, or environment secrets.
  console.info(
    JSON.stringify({
      event: "sanity_revalidation_completed",
      documentType: validation.value.documentType,
      operation: validation.value.operation,
      tags: plan.tags.length,
      paths: plan.paths.length,
      layout: plan.revalidateLayout,
    }),
  );

  return NextResponse.json(
    {
      revalidated: true,
      tags: plan.tags.length,
      paths: plan.paths.length,
    },
    { headers: noStoreHeaders },
  );
}
