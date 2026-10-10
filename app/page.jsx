import HomeExperience from "@/components/HomeExperience";
import { getSanityHome } from "@/lib/sanity/repository";

const fallbackHome = {
  heading: "Ronja Stucken",
  paragraphs: [
    "The boundaries of reality are no longer limited to the tangible and the visible; instead, the tangible and the virtual merge seamlessly, creating an entirely new landscape.",
    "The conventional boundaries of traditional design concepts are being challenged in the ever-expanding digital fashion world.",
    "Ronja Stucken embraces the limitless possibilities of digital design and enters an inspiring cosmos where creativity is defined by passion, technology and curiosity.",
  ].map((text, index) => ({key: `fallback-${index}`, text})),
};

export default async function Home() {
  const home = await getSanityHome();
  const heading = home?.heading || fallbackHome.heading;
  const paragraphs = home?.body.map((block) => ({
    key: block.key,
    text: block.spans.map((span) => span.text).join(""),
  })) ?? fallbackHome.paragraphs;

  return (
    <HomeExperience brandTitle={heading}>
      {paragraphs.map(({key, text}) => (
        <p key={key} className="text-paragraph w-8/12 md:w-5/12 text-[2rem] helvetica mt-28 mb-10 mx-14 mix-blend-difference">
          {text}
        </p>
      ))}
      <div className="h-[100vh] flex items-center align-baseline"></div>
      <div className="text-right md:flex align-baseline mx-2 md:mx-10 pb-3 md:pb-9 relative z-10">
        <div className="text-sm text-right md:mr-1 mix-blend-difference font-bold">
          Website designed by Ronja Stucken
        </div>
        <div className="flex justify-end">
          <div className="text-sm text-right mr-1 mix-blend-difference font-bold">& built by</div>
          <a
            href="https://www.maricalmer.com"
            target="_blank"
            className="text-sm text-right mix-blend-difference font-bold underline cursor-pointer"
          >
            maricalmer
          </a>
        </div>
        <div className="text-sm text-right mix-blend-difference font-bold grow">
          © 2024 All Rights Reserved
        </div>
      </div>
    </HomeExperience>
  );
}
