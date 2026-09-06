import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontVariables } from "./fonts";
import "./globals.css";
import { getSanitySettings } from "@/lib/sanity/repository";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSanitySettings();
  const title =
    settings?.defaultSeo.title ?? settings?.siteTitle ?? "Studio.Stuckn";
  const description = settings?.defaultSeo.description;
  const socialImage = settings?.defaultSeo.socialImage?.url;

  return {
    metadataBase: new URL("https://www.ronjastucken.com"),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    verification: { google: "KSG4ALn4wQN7SBpS0FrUDlyIa7-nYg3vfHvPGznHx2k" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
