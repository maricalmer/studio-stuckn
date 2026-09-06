import type { Metadata } from "next";

import ProjectIndexPage from "@/components/ProjectIndexPage";
import { getLocalCategory } from "@/lib/content/local";

export const metadata: Metadata = {
  title: "Digital | Studio.Stuckn",
  description:
    "Digital fashion, avatars, accessories, and 3D work by Studio.Stuckn.",
  alternates: {
    canonical: "/digital",
  },
};

export default function DigitalPage() {
  return <ProjectIndexPage category={getLocalCategory("digital")!} />;
}
