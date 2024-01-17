// Breadcrumb.jsx
'use client';
import BreadcrumbItem from "@/components/BreadcrumbItem";

function Breadcrumb(props) {
  return (
    <div className={`w-full ${props.bgColor} z-10 pb-2 md:pb-8 md:pb-6 h-fit fixed`}>
      <ul className={`${props.textColor} navlist__container md:flex helvetica text-right md:justify-between w-full md:w-[80%] pt-2 md:pt-8 px-3 md:pl-14 leading-none`}>
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Digital"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Physical"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"About"} />
        <BreadcrumbItem activeItem={props.activeItem} itemName={"Home"} />
      </ul>
    </div>
  );
}

export default Breadcrumb;
