import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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
     
     
      <div className="relative w-full h-[300px] overflow-hidden">

  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
    }}
  />


  <div className="absolute bottom-0 left-0 w-full z-10">
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

   
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
        
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 whitespace-nowrap">
                Subscribe Newsletters
              </h2>

      
              <div className="relative w-full max-w-2xl">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 md:h-16 pl-6 pr-40 md:pr-48 text-gray-700 placeholder-gray-400 bg-[#FFFFFF] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white font-semibold px-6 md:px-8 h-10 md:h-12 rounded-lg transition-colors duration-200"
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
        </div>

    
        <footer className="relative z-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
      
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex flex-wrap gap-6 md:gap-8">
              <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Industry
              </a>
              <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Contact Us
              </a>
            </div>

          
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

         
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-100">
   
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#2563eb" />
                  <path
                    d="M16 6v20M24 10L8 22M26 16H6M24 22L8 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                CargoCalc
              </span>
            </div>

   
            <span className="text-gray-600 text-center">
              © 2025 Calcargo. All rights reserved.
            </span>

          
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
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