import React from 'react';

import simplebox from './images/simplebox.jpg'
const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-20 px-6 flex justify-center items-center"
      style={{
        backgroundImage: `url(${simplebox})`,
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-12 py-6 text-center max-w-4xl shadow-lg border border-white/20">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-5">
          Tired of Spending Hours Calculating Cargo Box Sizes?
        </h2>
        <p className="text-white text-base md:text-lg">
          Skip the hustle, just a few steps your cargo is calculated!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
