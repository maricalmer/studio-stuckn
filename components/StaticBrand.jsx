// StaticBrand.jsx
'use client';

function StaticBrand(props) {
  return (
    <div className={`${props.extraStyling} navbrand text-2xl md:text-7xl 2xl:text-8xl min-[1800px]:text-9xl quella border-solid border-b-2 ml-3 md:ml-9 pl-3 md:pl-5 leading-none w-fit md:w-11/12 fixed z-10 top-[20px] md:top-auto md:bottom-[35px] transition-[opacity] duration-200 ease`}>
      <span className="tracking-tight">Stu</span>di<span className="tracking-tight">o.Stuckn</span>
    </div>
  );
}

export default StaticBrand;
