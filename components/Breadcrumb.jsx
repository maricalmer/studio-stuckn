import BreadcrumbItem from "@/components/BreadcrumbItem";

function Breadcrumb({textColor, bgColor, activeItem}) {
  return (
    <div className={`w-full ${bgColor} z-10 pb-2 md:pb-8 md:pb-6 h-fit fixed`}>
      <ul className={`${textColor} navlist__container md:flex helvetica text-right md:justify-between w-full md:w-[80%] pt-2 md:pt-8 px-3 md:pl-14 leading-none`}>
        <BreadcrumbItem activeItem={activeItem} itemName="Digital" />
        <BreadcrumbItem activeItem={activeItem} itemName="Physical" />
        <BreadcrumbItem activeItem={activeItem} itemName="About" />
        <BreadcrumbItem activeItem={activeItem} itemName="Home" />
      </ul>
    </div>
  );
};

export default Breadcrumb;
