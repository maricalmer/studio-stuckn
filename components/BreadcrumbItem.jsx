// BreadcrumbItem.jsx
'use client';

import Link from 'next/link'

const formatUrl = (string) => {
  return string === "Home" ? "" : string.toLowerCase();
}

function BreadcrumbItem(props) {
  let { activeItem, itemName } = props;

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
  }
}

export default BreadcrumbItem;
