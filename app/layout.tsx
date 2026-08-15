import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontVariables } from "./fonts";
import "./globals.css";

const description =
  "Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design.";
const socialImage =
  "https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ronjastucken.com"),
  title: "Studio.Stuckn, 3D artist based in Berlin",
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
