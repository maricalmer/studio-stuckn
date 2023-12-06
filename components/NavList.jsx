// NavList.jsx
'use client';
import React from "react";

function NavList() {
  return (
    <ul className="navlist__container translate-y-[-150%] flex helvetica place-content-between w-[80%] pt-8 pl-14 leading-none transition-[transform] delay-300">
      <li className="navlist__item opacity-0 transition-[opacity] duration-1000 ease">Ronja Stucken</li>
      <li className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">Instagram</li>
      <li className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">Linkedin</li>
      <li className="navlist__item cursor-pointer hover:text-[#C9D1D2] opacity-0 transition-[opacity] duration-200 ease">studio@ronjastucken.com</li>
    </ul>
  );
}

export default NavList;
