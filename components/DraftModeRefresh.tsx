"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { draftRefreshPath } from "@/lib/sanity/draft";

const refreshInterval = 3000;

export default function DraftModeRefresh() {
  const router = useRouter();

  useEffect(() => {
    let lastRevision: string | undefined;
    let stopped = false;
    let controller: AbortController | undefined;

    const checkForRevision = async () => {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(draftRefreshPath, {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (stopped || response.status === 403) return;
        if (!response.ok) return;

        const payload = (await response.json()) as { revision?: unknown };
        if (typeof payload.revision !== "string") return;
        if (lastRevision && lastRevision !== payload.revision) router.refresh();
        lastRevision = payload.revision;
      } catch {
        // The next poll can recover from a transient deployment or network error.
      }
    };

    void checkForRevision();
    const interval = window.setInterval(checkForRevision, refreshInterval);
    return () => {
      stopped = true;
      controller?.abort();
      window.clearInterval(interval);
    };
  }, [router]);

  return null;
}
