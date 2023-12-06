// StaticBrand.jsx
'use client';
import React from "react";

function StaticBrand(props) {
  return (
    <div className={`${props.opacity} navbrand text-7xl quella border-solid border-b-2 ml-9 pl-5 border-black leading-none w-11/12 absolute bottom-[35px]  transition-[opacity] duration-200 ease`}>
      <span className="tracking-tight">Stu</span>di<span className="tracking-tight">o.Stuckn</span>
    </div>
  );
}

export default StaticBrand;
