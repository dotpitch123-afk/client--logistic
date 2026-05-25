

import React from 'react';
import simplebox from './images/simplebox.jpg';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center w-full h-[222px] flex justify-center items-center font-outfit font-semibold"
      style={{
        backgroundImage: `url(${simplebox})`,
      }}
    >
<div className="bg-white/10 backdrop-blur-md rounded-[17px] h-[175px] w-[945px] text-center shadow-lg border border-white/20 mx-auto flex flex-col ">
  
  <h2 className="text-white font-outfit font-semibold text-[38px] leading-[24px] w-[916px] h-[24px] text-center mx-auto mb-10 mt-10">
    Tired of Spending Hours Calculating Cargo Box Sizes?
  </h2>

  <p className="text-white font-outfit font-semibold text-[30px] leading-[24px] w-[749px] h-[24px] text-center mx-auto">
    Skip the hustle, just a few steps your cargo is calculated!
  </p>

</div>


      
    </div>
  );
};

export default HeroSection;
