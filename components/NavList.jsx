import Link from 'next/link'

function NavList() {
  return (
    <ul className="navlist__container translate-y-[-150%] flex items-baseline helvetica place-content-between w-[80%] pt-8 pl-14 leading-none transition-[transform] delay-300">
      <li className="navlist__item opacity-0 transition-[opacity] duration-1000 ease">Ronja Stucken</li>
      <li className="my-2"><a href="https://www.instagram.com/studio.stuckn" target="_blank" className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">Instagram</a></li>
      <li><a href="https://de.linkedin.com/in/ronja-stucken" target="_blank" className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">LinkedIn</a></li>
      <li><Link href="mailto:info@mailgo.dev" className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">studio@ronjastucken.com</Link></li>
    </ul>
  );
}

export default NavList;
