
import React from 'react';
import track from './images/track.png'
import ero from "./images/ero.png"

export default function ShippingLandingPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-0">
      <div className="grid lg:grid-cols-5 h-full">
        <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col ml-10 justify-center text-black relative">
          <div className="absolute inset-0 opacity-10">              
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>
          <div className="relative z-10">     
<h1
  className="font-outfit font-semibold text-4xl lg:text-5xl xl:text-[60px] leading-[52px] text-[#000000] max-w-[439px] mb-6"
>
  Smarter
  <br />
  Shipping Starts
  <br />
  Here
</h1>
 <p
  className="text-[28px] leading-[28px] font-medium font-outfit text-[#000000] mb-8 max-w-[459px]"
>
  Calculate, visualise, and optimise <br />
  your cargo load in minutes, no more <br />
  guesswork, no wasted space.
</p>
<button
  className="w-[180px] h-[54px] rounded-[10px] font-inter font-semibold text-lg 
             text-white flex items-center justify-center gap-2
             transition-all duration-300 transform hover:scale-105 shadow-lg
             border border-transparent hover:border-[#484AE6] group
             bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9]"
>
  Get Started
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
  <img 
    src={ero} 
    alt="arrow"
    className="w-[30px] h-auto"
  />
</span>


</button>
          </div>
        </div>
        <div className="lg:col-span-3 relative bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            src={track} 
            alt="track" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
      </div>
    </div>
  );
}
