// NavButton.jsx
'use client';

const handleClick = (e) => {
  const navbar = e.currentTarget.parentNode;
  navbar.classList.toggle("navbar-active");
  if (getComputedStyle(document.documentElement).getPropertyValue('--nav-cross-color') == "transparent") {
    document.documentElement.style.setProperty('--nav-cross-color', "#232620");
  } else {
    setTimeout(() => {
      document.documentElement.style.setProperty('--nav-cross-color', "transparent");
    }, 500);
  }
};
//
function NavButton() {
  return (
    <button onClick={(e)=> {handleClick(e)}} aria-label="menu button" className="h-[60px] w-[60px] cursor-pointer hover:opacity-70 z-30 transition ease-linear delay-0 duration-300 absolute right-4 md:right-16 top-4 md:top-8">
      <span className="nav__cross"></span>
    </button>
  );
}

export default NavButton;
