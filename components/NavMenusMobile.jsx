import Link from 'next/link';

export default function NavMenusMobile({ categories = [] }) {
  const menuCategories = categories.filter((category) => category.slug === "digital" || category.slug === "physical");
  const menuItems = menuCategories.flatMap((category) =>
    category.slug === "physical"
      ? [{id: "demo-reel", slug: "demo-reel", title: "Demo Reel"}, category]
      : [category],
  );
  return (
    <ul className="navmenu__container translate-y-[-150%] w-full m-auto pt-[40vh] helvetica text-5xl transition-[transform] delay-300">
      {menuItems.map((item) => (
        <li key={item.id} className="w-fit navmenu__item w-full text-left mb-3 ml-6 opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2]">
          <Link href={`/${item.slug}`}>{item.title}</Link>
        </li>
      ))}
      <li className="w-fit navmenu__item w-full text-left ml-6 opacity-0 transition-[opacity] duration-200 ease-in hover:text-[#C9D1D2] ">
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
};
