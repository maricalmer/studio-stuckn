// Brand.jsx
'use client';

const handleFontSizing = (scrollValue, baseFontSize) => {
  if (baseFontSize) {
    const factor = 7;
    return baseFontSize - scrollValue / factor < (baseFontSize / 2) ? (baseFontSize / 2) : baseFontSize - scrollValue/factor;
  }
};

function Brand(props) {
  return (
    <h1 className="brand-text text-[80px] md:text-[100px] lg:text-[130px] xl:text-[160px] min-[2000px]:text-[195px] font-headline quella border-solid border-b-2 border-[#a1bf79] mt-[70vh] lg:mt-[66vh] xl:mt-[62vh] 2xl:mt-[64vh] min-[2000px]:mt-[66vh] mb-80 mx-14 leading-none w-10/12 sticky top-6 mix-blend-difference">
      <span className="tracking-tight">Stu</span>di<span className="tracking-tight">o.Stuckn</span>
      <style jsx>{`
        h1 {
          font-size: ${handleFontSizing(props.scrollValue, props.baseFontSize)}px;
        }
      `}</style>
    </h1>
  );
}

export default Brand;
