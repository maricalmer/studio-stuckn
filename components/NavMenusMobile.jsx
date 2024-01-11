// NavMenusMobile.jsx
'use client';
import React from "react";
import Link from 'next/link'

function NavMenusMobile() {
  return (
    <ul className="navmenu__container translate-y-[-150%] w-full m-auto pt-[40vh] helvetica text-4xl transition-[transform] delay-300">
      <li className="w-fit navmenu__item w-full text-center mb-10 opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
        <Link href="/digital">Digital</Link>
      </li>
      <li className="w-fit navmenu__item w-full text-center mb-10 opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
        <Link href="/physical">Physical</Link>
      </li>
      <li className="w-fit navmenu__item w-full text-center opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2] ">
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}

export default NavMenusMobile;
