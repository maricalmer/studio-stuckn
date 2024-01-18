import NavButton from "@/components/NavButton";
import NavMenus from "@/components/NavMenus";
import NavMenusMobile from "@/components/NavMenusMobile";
import NavList from "@/components/NavList";
import StaticBrand from "@/components/StaticBrand";

function Navigation(props) {
  return (
    <nav className="fixed z-50 h-0 w-full top-0 left-0 bg-[#A7BE81] transition-[height] duration-500 delay-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]">
      <NavButton />
      {props.isBigScreen && <NavList />}
      {props.isBigScreen ? <NavMenus /> : <NavMenusMobile />}
      <StaticBrand extraStyling="opacity-0 md:translate-y-[200px] border-black"/>
    </nav>
  );
};

export default Navigation;
