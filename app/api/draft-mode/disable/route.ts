import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import {
  draftCookieNames,
  sanitizePreviewRedirect,
} from "@/lib/sanity/draft";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const draftModeStore = await draftMode();
  draftModeStore.disable();

  const cookieStore = await cookies();
  for (const name of [
    draftCookieNames.bypass,
    draftCookieNames.partitioned,
    draftCookieNames.perspective,
    draftCookieNames.variant,
  ]) {
    cookieStore.delete(name);
  }

  const redirectTo = new URL(request.url).searchParams.get("redirect");
  redirect(sanitizePreviewRedirect(redirectTo));
}
