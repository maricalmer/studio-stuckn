import Link from 'next/link';

const formatUrl = (string) => {
  return string === "Home" ? "" : string.toLowerCase();
};

export default function BreadcrumbItem({activeItem, itemName}) {
  if (activeItem === itemName) {
    return (
      <li className={"navlist__item text-[#C9D1D2] mt-2"}>
        {itemName}
      </li>
    );
  } else {
    return (
      <li className="navlist__item hover:text-[#C9D1D2] mt-2">
        <Link href={`/${formatUrl(itemName)}`}>{itemName}</Link>
      </li>
    );
  };
};
