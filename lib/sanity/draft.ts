const redirectParamNames = [
  "sanity-preview-secret",
  "sanity-preview-pathname",
  "sanity-preview-perspective",
  "sanity-preview-variant",
  "x-vercel-protection-bypass",
  "x-vercel-set-bypass-cookie",
];

/**
 * Only allow redirects to this application. Preview secrets and perspective
 * parameters never belong in the resulting browser URL.
 */
export function sanitizePreviewRedirect(value: string | null | undefined) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return "/";
  }

  try {
    const url = new URL(value, "https://preview.invalid");
    if (url.origin !== "https://preview.invalid") return "/";
    for (const name of redirectParamNames) url.searchParams.delete(name);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export const draftCookieNames = {
  bypass: "__prerender_bypass",
  partitioned: "sanity-preview-partitioned",
  perspective: "sanity-preview-perspective",
  variant: "sanity-preview-variant",
} as const;

export const draftRefreshPath = "/api/draft-mode/refresh";
