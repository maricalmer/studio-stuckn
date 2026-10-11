import type {Metadata} from "next";

import {getSanityDemoReel} from "@/lib/sanity/repository";

const FALLBACK_VIMEO_URL = "https://player.vimeo.com/video/1158825291";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Demo Reel | Ronja Stucken",
  description: "Ronja Stucken demo reel.",
  alternates: {canonical: "/demo-reel"},
};

export default async function DemoReelPage() {
  const demoReel = await getSanityDemoReel();
  const vimeoUrl = demoReel?.vimeoUrl ?? FALLBACK_VIMEO_URL;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="aspect-video w-full max-w-6xl">
        <iframe
          className="h-full w-full"
          src={vimeoUrl}
          title="Ronja Stucken demo reel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </main>
  );
}
