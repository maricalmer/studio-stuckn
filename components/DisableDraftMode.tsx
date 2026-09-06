"use client";

import Link from "next/link";
import { useVisualEditingEnvironment } from "next-sanity/hooks";

export default function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();
  if (environment === "presentation-iframe" || environment === "presentation-window") {
    return null;
  }

  return (
    <Link
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[60] rounded bg-black px-3 py-2 text-xs text-white"
    >
      Exit preview
    </Link>
  );
}
