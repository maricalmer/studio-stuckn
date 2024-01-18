const handleFontScaling = (scrollY) => {
  const factor = 2500;
  return 1 - scrollY / factor < 0.8 ? 0.8 : 1 - scrollY / factor;
};

function Brand({scrollY}) {
  return (
    <h1 className="brand-text hidden md:block text-[100px] lg:text-[130px] xl:text-[160px] min-[2000px]:text-[235px] font-headline quella border-solid border-b-2 border-[#a1bf79] mt-[calc(100vh-120px-100px-10vh)] lg:mt-[calc(100vh-120px-130px-10vh)] xl:mt-[calc(100vh-120px-160px-10vh)] min-[2000px]:mt-[calc(100vh-120px-235px-10vh)] mb-80 mx-14 leading-none w-10/12 sticky top-6 mix-blend-difference origin-left transition-transform ease-linear delay-0">
      <span className="tracking-tight">Stu</span>di<span className="tracking-tight">o.Stuckn</span>
      <style jsx>{`
        h1 {
          transform: scale(${handleFontScaling(scrollY)});
        }
      `}</style>
    </h1>
  );
};

export default Brand;
