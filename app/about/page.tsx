import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import AboutImage from "@/components/AboutImage";
import Breadcrumb from "@/components/Breadcrumb";
import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";
import AboutBody from "@/components/AboutBody";
import { getSanityAbout, getSanitySettings } from "@/lib/sanity/repository";

export const dynamic = "force-dynamic";

async function getAboutPageData(stega = true) {
  return Promise.all([
    getSanityAbout({ stega }),
    getSanitySettings({ stega }),
  ]);
}

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await getAboutPageData(false);
  if (!about) notFound();
  const title = about.seo.title ?? "About | Studio.Stuckn";
  const socialImage =
    about.seo.socialImage?.url ?? settings?.defaultSeo.socialImage?.url;
  return {
    title,
    description: about.seo.description ?? settings?.defaultSeo.description,
    alternates: { canonical: "/about" },
    openGraph: {
      type: "website",
      url: "/about",
      title,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function AboutPage() {
  const [about, settings] = await getAboutPageData();
  if (!about) notFound();
  return (
    <PageContainer backgroundColor="about-page bg-[#EFEBE6]">
      <Breadcrumb
        textColor="text-[#4A2E69]"
        bgColor="bg-[#EFEBE6]"
        activeItem="About"
      />
      <div className="mx-3 md:ml-14 mt-32 helvetica text-[#4A2E69] relative h-[150vh] md:h-[200vh]">
        <h1 className="text-2xl md:text-4xl 2xl:text-5xl min-[1950px]:text-6xl">
          {about.heading}
        </h1>
        <ul className="my-6">
          <li>
            <Link
              href={`mailto:${settings?.contactEmail ?? ""}`}
              className="text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl underline"
            >
              Email
            </Link>
          </li>
          {settings?.socialLinks.map((link) => (
            <li
              key={link.key}
              className={link.key === "instagram" ? "my-2" : undefined}
            >
              <a
                href={link.href}
                target="_blank"
                className="text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <AboutBody blocks={about.body} />
        {about.images[0] && (
          <AboutImage image={about.images[0].image} alt={about.images[0].alt} />
        )}
      </div>
      <StaticBrand extraStyling="opacity-1 text-[#4A2E69] border-[#4A2E69] md:text-[unset] md:mix-blend-soft-light" />
    </PageContainer>
  );
}
