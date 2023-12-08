// BreadcrumbItem.jsx
'use client';

import Link from 'next/link'

const formatUrl = (string) => {
  return string === "Home" ? "" : string.toLowerCase();
}

function BreadcrumbItem(props) {
  let { isActive, itemName } = props;

  if (isActive) {
    return (
      <li className={"navlist__item text-[#C9D1D2]"}>
        {itemName}
      </li>
    );
  } else {
    return (
      <li className="navlist__item hover:text-[#C9D1D2]">
        <Link href={`/${formatUrl(itemName)}`}>{itemName}</Link>
      </li>
    );
  }
}

export default BreadcrumbItem;
