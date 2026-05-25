import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import socialsImg from "./images/Frames.png"; 


import footer from './images/sip.png';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email.trim()) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="">
     
     
      <div className="relative w-full h-[300px] overflow-hidden font-inter font-medium">

  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
  
     style={{
    backgroundImage: `url(${footer})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    
  }}
  />


  <div className="absolute bottom-0 left-0 w-full  z-10">

    <h1> </h1>
    <svg
      className="w-full h-[100px]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
        fill="white"
      />
    </svg>
  </div>
</div>

      <div className="relative z-10  flex flex-col">

        
<div className="flex-1 flex items-center justify-center px-4 pt-4  relative -top-24">

   
        <div className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-6xl mx-auto
                shadow-[0_10px_15px_-5px_rgba(0,0,0,0.2)]">
  <div className="flex flex-col lg:flex-row items-center ml-10  gap-6 lg:gap-8">
    {/* Heading */}
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium font-outfit text-gray-900 whitespace-nowrap">
      Subscribe Newsletters
    </h2>

    {/* Input + Button */}
    <div className="relative w-full lg:w-auto mt-4 lg:mt-0">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-[536px] max-w-full h-[72px] pl-6 pr-40 text-gray-700 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-semibold px-6 md:px-8 h-12 rounded-lg transition-colors duration-200"
        style={{
          background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
        }}
      >
        Subscribe Now
      </button>
    </div>
  </div>
</div>

        </div>

    
        <footer className="relative bg-white text-[#0A142F]">
        <div className=" px-4 py-8    w-full max-w-6xl mx-auto">
      
          <div className="flex flex-col md:flex-row justify-between items-center " style={{marginBottom:"40px"}}>
            <div className="flex flex-wrap gap-6 md:gap-8">
              <a href="#" className="text-lg font-medium text-[#0A142F] hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#" className="text-lg font-medium text-[#0A142F] hover:text-gray-900 transition-colors">
                Industry
              </a>
              <a href="#" className="text-lg font-medium text-[#0A142F] hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-lg font-medium text-[#0A142F] hover:text-gray-900 transition-colors">
                Contact Us
              </a>
            </div>
 <div className="flex gap-4">
      <a href="#" className="transition-transform hover:scale-105">
        <img
          src={socialsImg}
          alt="All social icons"
          className="h-6 w-auto"
        />
      </a>
    </div>
          
            
          </div>
   <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-[#2B3D51]">

            <div className="flex items-center gap-3">
              

              <div className="relative">
  <svg
    className="align-middle"
    width="32"
    height="32"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9987 1.33301V24.6663M21.2483 4.7501L4.74912 21.2493M24.6654 12.9997H1.33203M21.2483 21.2493L4.74912 4.7501"
      stroke="#2563eb"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

              <span className="text-2xl font-bold text-blue-600 font-sans">
                CargoCalc
              </span>
            </div>

   
            <span className=" text-center font-medium  text-[#0A142F]">
              © 2025 Calcargo. All rights reserved.
            </span>

          
            <div className="flex gap-6 font-medium">
              <a href="#" className="text-[#0A142F] hover:text-gray-800 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[#0A142F] hover:text-gray-800 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
              </footer>
      </div>
    </div>
  );
}