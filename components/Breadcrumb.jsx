// Breadcrumb.jsx
'use client';
import React from "react";
import Link from 'next/link'

function Breadcrumb(props) {
  return (
    <ul className="navlist__container flex helvetica place-content-between w-[80%] pt-8 pl-14 leading-none">
      <li className={`${props.active} navlist__item`}>
        Digital
      </li>
      <li className="navlist__item hover:text-[#C9D1D2]">
        <Link href="/physical">Physical</Link>
      </li>
      <li className="navlist__item hover:text-[#C9D1D2]">
        <Link href="/about">About</Link>
      </li>
      <li className="navlist__item hover:text-[#C9D1D2]">
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
}

export default Breadcrumb;
