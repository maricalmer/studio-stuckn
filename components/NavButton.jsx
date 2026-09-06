export default function NavButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="menu button"
      aria-expanded={isOpen}
      className="h-[60px] w-[60px] cursor-pointer hover:opacity-70 z-30 transition ease-linear delay-0 duration-300 absolute right-4 md:right-16 top-4 md:top-8"
    >
      <span className="nav__cross"></span>
    </button>
  );
}
