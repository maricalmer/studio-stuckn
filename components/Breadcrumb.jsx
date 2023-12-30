// Breadcrumb.jsx
'use client';
import React from "react";
import BreadcrumbItem from "@/components/BreadcrumbItem";

function Breadcrumb(props) {
  return (
    <div className={`w-full ${props.bgColor} z-10 pb-6 h-fit fixed`}>
      <ul className={`${props.textColor} navlist__container flex helvetica place-content-between w-[80%] pt-8 pl-14 leading-none`}>
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Digital"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Physical"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"About"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Home"} />
      </ul>
    </div>
  );
}

export default Breadcrumb;
