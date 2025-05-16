import { useEffect, useRef } from 'react';
import { initializeBeforeAfterSlider } from '@/lib/utils';

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
};

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt
}: BeforeAfterSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sliderRef.current) {
      initializeBeforeAfterSlider(sliderRef.current);
    }
  }, []);
  
  return (
    <div ref={sliderRef} className="before-after-slider h-72 relative overflow-hidden">
      <img 
        src={afterImage} 
        alt={afterAlt} 
        className="block w-full h-full object-cover"
      />
      <div className="before-image absolute top-0 left-0 w-1/2 h-full overflow-hidden">
        <img 
          src={beforeImage} 
          alt={beforeAlt} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="slider-handle absolute top-0 bottom-0 left-1/2 w-1 bg-white cursor-ew-resize z-10 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-10 after:h-10 after:bg-white after:rounded-full after:flex after:justify-center after:items-center before:content-['↔'] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:text-primary before:text-lg before:font-bold before:z-[11]">
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
