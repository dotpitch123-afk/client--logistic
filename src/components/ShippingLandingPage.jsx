
import React from 'react';
import track from './images/track.png'
export default function ShippingLandingPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-0">
      <div className="grid lg:grid-cols-5 h-full">
        <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center text-black relative">
          <div className="absolute inset-0 opacity-10">              
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-outfit  lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Smarter
              <br />
              Shipping Starts
              <br />
              Here
            </h1>
            <p className="text-lg  font-outfit lg:text-xl text-black mb-8 max-w-md leading-relaxed">
              Calculate, visualise, and optimise your cargo load in minutes, no more guesswork, no wasted space.
            </p>
      
{/* <button
  className="w-[180px] h-[54px] rounded-[10px] font-semibold text-lg 
             text-white flex items-center justify-center gap-2 
             transition-all duration-300 transform hover:scale-105 shadow-lg
             border border-transparent hover:border-[#484AE6] group relative overflow-hidden"
  style={{
    background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
    // WebkitTextStroke: "1px #000", // outer stroke effect
    // textShadow: "0px 0px 4px rgba(0,0,0,0.5)", // glowing inner effect
  }}
>
  Get Started
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</button> */}

<button
  className="w-[180px] h-[54px] rounded-[10px] font-inter font-semibold text-lg 
             text-white flex items-center justify-center gap-2 
             transition-all duration-300 transform hover:scale-105 shadow-lg
             border border-transparent hover:border-[#484AE6] group"
  style={{
    background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
  }}
>
  Get Started
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
    →
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
