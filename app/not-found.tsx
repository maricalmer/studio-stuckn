import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import StaticBrand from "@/components/StaticBrand";

export default function NotFound() {
  return (
    <PageContainer backgroundColor="min-h-screen bg-[#EFEBE6] text-[#4A2E69]">
      <main className="mx-6 flex min-h-screen flex-col justify-center helvetica md:mx-14">
        <p className="text-sm uppercase">404</p>
        <h1 className="mt-3 text-4xl md:text-6xl">Page not found</h1>
        <Link href="/" className="mt-8 w-fit text-xl underline">
          Return home
        </Link>
      </main>
      <StaticBrand extraStyling="opacity-1 text-[#4A2E69] border-[#4A2E69]" />
    </PageContainer>
  );
}
