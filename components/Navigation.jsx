"use client";

import { useEffect, useState } from "react";

import NavButton from "@/components/NavButton";
import NavMenus from "@/components/NavMenus";
import NavMenusMobile from "@/components/NavMenusMobile";
import NavList from "@/components/NavList";
import StaticBrand from "@/components/StaticBrand";

export default function Navigation({ isBigScreen, categories = [], settings }) {
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
    <nav
      className={`fixed z-50 h-0 w-full top-0 left-0 bg-[#A7BE81] transition-[height] duration-500 delay-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]${isMenuOpen ? " navbar-active" : ""}`}
      style={{
        "--navbar-open-background": settings?.navbarOpenBackgroundColor || "#261b26",
        "--navbar-open-text": settings?.navbarOpenTextColor || "#b4b4b4",
        "--navbar-digital-background": settings?.navbarDigitalBackgroundColor || "#131313",
        "--navbar-digital-text": settings?.navbarDigitalTextColor || "#0a063e",
        "--navbar-demo-reel-background": settings?.navbarDemoReelBackgroundColor || "#261b26",
        "--navbar-demo-reel-text": settings?.navbarDemoReelTextColor || "#b4b4b4",
        "--navbar-physical-background": settings?.navbarPhysicalBackgroundColor || "#a6a08f",
        "--navbar-physical-text": settings?.navbarPhysicalTextColor || "#011e0f",
        "--navbar-about-background": settings?.navbarAboutBackgroundColor || "#efebe6",
        "--navbar-about-text": settings?.navbarAboutTextColor || "#482d65",
      }}
    >
      <NavButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      />
      {isBigScreen && <NavList settings={settings} />}
      {isBigScreen ? <NavMenus isOpen={isMenuOpen} categories={categories} settings={settings} /> : <NavMenusMobile categories={categories} />}
      <StaticBrand
        title={isBigScreen ? settings?.siteTitle : "Demo Reel"}
        href={!isBigScreen ? "/demo-reel" : undefined}
        extraStyling="opacity-0 md:translate-y-[200px] border-black"
      />
    </nav>
  );
};
