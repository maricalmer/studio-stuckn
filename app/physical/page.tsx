import type { Metadata } from "next";

import ProjectIndexPage from "@/components/ProjectIndexPage";
import { getLocalCategory } from "@/lib/content/local";

export const metadata: Metadata = {
  title: "Physical | Studio.Stuckn",
  description:
    "Physical fashion projects, editorials, and collections by Studio.Stuckn.",
  alternates: {
    canonical: "/physical",
  },
};

export default function PhysicalPage() {
  return <ProjectIndexPage category={getLocalCategory("physical")!} />;
}
