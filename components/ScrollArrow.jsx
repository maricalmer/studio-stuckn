const handleArrowSizing = (scrollY) => {
  const factor = 2500;
  return 1 - scrollY/factor < 0.3 ? 0.3 : 1 - scrollY/factor;
};

const handleArrowDirection = (scrollYProgress) => {
  return scrollYProgress > 0.85 ? 180 : 0;
};

function ScrollArrow({scrollY, scrollYProgress}) {
  return (
    <>
      <svg width="66" height="120" viewBox="0 0 66 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block sticky top-1/2 left-full mr-10 mix-blend-difference">
        <path d="M37.4 0.799996V92.8C42 89.8 57 83 62 83C63.6 83 65.2 84 65.2 85.8C65.2 87.6 62.4 89.2 61.2 90C52 96.2 42.2 105.4 36.6 115C36 116.2 34.6 119.2 33 119.2C31.4 119.2 30 116.2 29.4 115C23.8 105.4 14 96.2 4.8 90C3.6 89.2 0.800003 87.6 0.800003 85.8C0.800003 84 2.4 83 4 83C9 83 24 89.8 28.6 92.8V0.799996H37.4Z" fill="#A1BF79"/>
      </svg>
      <style jsx>{`
        svg {
          transform: scale(${handleArrowSizing(scrollY.current)}) rotate(${handleArrowDirection(scrollYProgress.current)}deg);
        }
      `}</style>
    </>
  );
}

export default ScrollArrow;
