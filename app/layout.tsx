import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import DraftModeTools from "@/components/DraftModeTools";
import { fontVariables } from "./fonts";
import "./globals.css";
import { getSanitySettings } from "@/lib/sanity/repository";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSanitySettings({ stega: false });
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
  return <RootLayoutContent>{children}</RootLayoutContent>;
}

async function RootLayoutContent({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className={fontVariables}>
      <body>
        {children}
        {isEnabled && <DraftModeTools />}
      </body>
    </html>
  );
}
