import React from 'react';

import simplebox from './images/gla.png'
const REviewSection = () => {
  return (
   <div className="bg-[#1e3570] py-8 px-6 my-10 flex justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl rounded-2xl px-6 py-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] border border-white/10"
      >
        
       
        <h2 className="text-white text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
          Want to make your shipping <br /> smart and stress-free?
        </h2>

        <button className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-medium px-6 py-2 rounded-lg text-sm shadow hover:opacity-90 transition">
          Start Free Trial
        </button>
      </div>
    </div>
  
  );
};

export default REviewSection;
