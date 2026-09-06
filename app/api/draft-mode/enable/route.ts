import {
  validatePreviewUrl,
  type PreviewUrlValidateUrlResult,
} from "@sanity/preview-url-secret";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { getPublishedClient } from "@/lib/sanity/client";
import { draftCookieNames, sanitizePreviewRedirect } from "@/lib/sanity/draft";
import { getReadToken } from "@/lib/sanity/secrets";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let validation: PreviewUrlValidateUrlResult;
  try {
    validation = await validatePreviewUrl(
      getPublishedClient().withConfig({ token: getReadToken() }),
      request.url,
    );
  } catch {
    return new Response("Preview unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!validation.isValid) {
    return new Response("Invalid preview secret", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const draftModeStore = await draftMode();
  if (!draftModeStore.isEnabled) draftModeStore.enable();

  const secure = process.env.NODE_ENV === "production";
  const isPartitioned =
    secure &&
    request.headers.get("sec-fetch-dest") === "iframe" &&
    request.headers.get("sec-fetch-site") === "cross-site";
  const cookieStore = await cookies();
  const bypassCookie = cookieStore.get(draftCookieNames.bypass);
  const cookieOptions = {
    httpOnly: true,
    path: "/",
    secure,
    sameSite: secure ? ("none" as const) : ("lax" as const),
    ...(isPartitioned ? { partitioned: true } : {}),
  };

  // Next's draftMode().enable() creates the bypass cookie. Re-issue it with
  // CHIPS attributes when Presentation loads the preview cross-site.
  cookieStore.set({
    ...cookieOptions,
    name: draftCookieNames.bypass,
    value: bypassCookie?.value ?? "",
  });

  if (validation.studioPreviewPerspective) {
    cookieStore.set({
      ...cookieOptions,
      name: perspectiveCookieName,
      value: validation.studioPreviewPerspective,
    });
  }

  if (isPartitioned) {
    cookieStore.set({
      ...cookieOptions,
      name: draftCookieNames.partitioned,
      value: "1",
      secure: true,
      sameSite: "none",
      partitioned: true,
    });
  }

  redirect(sanitizePreviewRedirect(validation.redirectTo));
}
