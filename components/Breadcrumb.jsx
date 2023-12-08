// Breadcrumb.jsx
'use client';
import React from "react";
import BreadcrumbItem from "@/components/BreadcrumbItem";

function Breadcrumb() {
  return (
    <ul className="navlist__container flex helvetica place-content-between w-[80%] pt-8 pl-14 leading-none">
      <BreadcrumbItem isActive={true} itemName={"Digital"} />
      <BreadcrumbItem isActive={false} itemName={"Physical"} />
      <BreadcrumbItem isActive={false} itemName={"About"} />
      <BreadcrumbItem isActive={false} itemName={"Home"} />
    </ul>
  );
}

export default Breadcrumb;
