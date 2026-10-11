import Link from 'next/link';

export default function NavList({ settings }) {
  const socialLinks = settings?.socialLinks ?? [
    {key: "linkedin", label: "LinkedIn", href: "https://de.linkedin.com/in/ronja-stucken"},
    {key: "artstation", label: "Artstation", href: "https://www.artstation.com/ronja_stucken"},
    {key: "instagram", label: "Instagram", href: "https://www.instagram.com/studio.stuckn"},
    {key: "email", label: "Email", href: `mailto:${settings?.contactEmail || "info@mailgo.dev"}`},
  ];
  const emailIsInSocialLinks = socialLinks.some((link) => link.href.startsWith("mailto:"));
  return (
    <ul className="navlist__container translate-y-[-150%] flex items-baseline helvetica place-content-between w-[80%] pt-8 pl-14 leading-none transition-[transform] delay-300">
      <li className="navlist__item opacity-0 transition-[opacity] duration-1000 ease">{settings?.siteTitle || "Ronja Stucken"}</li>
      {socialLinks.map((link, index) => (
        <li key={link.key} className={index === 0 ? "my-2" : undefined}><a href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">{link.label}</a></li>
      ))}
      {!emailIsInSocialLinks && <li><Link href={`mailto:${settings?.contactEmail || "info@mailgo.dev"}`} className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">{settings?.contactEmail || "studio@ronjastucken.com"}</Link></li>}
    </ul>
  );
};
