import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontVariables } from "./fonts";
import "./globals.css";
import { getLocalSettings } from "@/lib/content/local";

const settings = getLocalSettings();
const description = settings.defaultSeo.description;
const socialImage = settings.defaultSeo.socialImage!.url;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ronjastucken.com"),
  title: settings.siteTitle,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Studio.Stuckn",
    description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio.Stuckn",
    description,
    images: [socialImage],
  },
  verification: {
    google: "KSG4ALn4wQN7SBpS0FrUDlyIa7-nYg3vfHvPGznHx2k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
