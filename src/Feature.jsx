
import React from 'react';
import track from './images/track.png'
export default function Features() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-0">
      <div className="grid lg:grid-cols-5 h-full">
        <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center text-black relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>
          <div className="relative z-10  ml-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Features
            </h1>
            <p className="text-lg lg:text-xl text-black mb-8 max-w-md leading-relaxed">
            Powerful Features to Maximize Your Container Space
            </p>
            <p className="text-sm lg:text-base text-black mb-8 leading-relaxed">
  From dynamic container dimensioning to instant 3D visualisations, our cargo calculator simplifies your logistics planning. Whether you’re preparing a single shipment or scaling across multiple departments we’ve got you covered.
</p>
 
            <button className=" text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{
    background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
  }} >Get Started →
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
