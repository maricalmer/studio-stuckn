import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { getSanityDraftRevision } from "@/lib/sanity/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await draftMode()).isEnabled) {
    return new Response("Draft mode is disabled", {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const revision = await getSanityDraftRevision();
    return NextResponse.json(
      { revision },
      { headers: { "Cache-Control": "no-store, private" } },
    );
  } catch {
    // Do not disclose Sanity errors or environment details to the browser.
    return new Response("Draft refresh unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
