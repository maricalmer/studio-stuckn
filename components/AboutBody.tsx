import RichText from "@/components/RichText";
import type { RichText as RichTextValue } from "@/lib/content/types";

export default function AboutBody({ blocks }: { blocks: RichTextValue }) {
  return (
    <div className="w-full md:w-9/12 md:min-w-[600px] text-xl md:text-3xl 2xl:text-4xl min-[1950px]:text-5xl [&>p]:mb-4 [&>p:first-child]:my-6">
      <RichText blocks={blocks} />
    </div>
  );
}
