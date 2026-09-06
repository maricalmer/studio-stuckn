"use client";

import { useEffect, useState } from "react";

import NavButton from "@/components/NavButton";
import NavMenus from "@/components/NavMenus";
import NavMenusMobile from "@/components/NavMenusMobile";
import NavList from "@/components/NavList";
import StaticBrand from "@/components/StaticBrand";

export default function Navigation(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.setProperty("--nav-cross-color", "#232620");
      return;
    }

    const timeout = window.setTimeout(() => {
      document.documentElement.style.setProperty(
        "--nav-cross-color",
        "transparent",
      );
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [isMenuOpen]);

  return (
    <nav className={`fixed z-50 h-0 w-full top-0 left-0 bg-[#A7BE81] transition-[height] duration-500 delay-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]${isMenuOpen ? " navbar-active" : ""}`}>
      <NavButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      />
      {props.isBigScreen && <NavList />}
      {props.isBigScreen ? <NavMenus isOpen={isMenuOpen} /> : <NavMenusMobile />}
      <StaticBrand extraStyling="opacity-0 md:translate-y-[200px] border-black"/>
    </nav>
  );
};
