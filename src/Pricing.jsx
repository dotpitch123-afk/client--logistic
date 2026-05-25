

import React, { useState } from 'react';
import price from './images/linesofpricing.png'

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isMonthly, setIsMonthly] = useState(true);

  const toggleBilling = () => setIsMonthly(!isMonthly);

  return (
    <>
      {/* Global CSS for card hover effects */}
      <style jsx global>{`
        .pricing-card {
          transition: all 0.3s ease-in-out;
        }
        
        .pricing-card:hover {
          background: linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%) !important;
          box-shadow: 2px 2px 4px 0px #00000040;
          transform: translateY(-32px);
        }
        
        .pricing-card:hover .card-button {
          background: white !important;
          color: black !important;
        }
      `}</style>

      <div className="bg-white text-center font-inter mt-10">
        <h2 className="font-outfit font-semibold text-[60px] leading-[24px] text-center text-black " style={{marginBottom:"26px"}}>
  Pricing
</h2>

        {/* <h2 className="font-outfit font-semibold text-[60px] leading-[24px] text-center text-black mb-6">
          Pricing
        </h2> */}
<h3 className="font-outfit font-medium text-[28px] leading-[1] text-center" style={{ marginBottom: "8px" }}>
  Plans That Scale with Your Shipping Needs
</h3>

        {/* <h3 className="font-outfit  font-medium text-[28px] leading-[1] text-center "  style={{marginBottom:"8px"}}>
          Plans That Scale with Your Shipping Needs
        </h3> */}


<p className="font-inter font-medium text-[26px] leading-[1] text-center text-[#181059] " style={{marginBottom:"41px"}}>
  Affordable for startups. Powerful for enterprise. 
  <br />
  Choose a plan that fits your workflow.
</p>

        {/* <p className="font-inter font-medium text-[26px] leading-[1] text-center text-[#181059] mb-8">
          Affordable for startups. Powerful for enterprise. 
          <br />
          Choose a plan that fits your workflow.
        </p> */}

        <div className="justify-center items-stretch bg-cover bg-center h-[689px]" style={{ backgroundImage: `url(${price})` }}>

          <div className="flex items-center justify-center gap-4">
        

  <span className={`font-inter font-bold text-[16px] leading-[16px] ${isMonthly ? 'text-[#181059]' : 'text-gray-500'}`}>
    Bill Monthly
  </span>
            <div
              onClick={toggleBilling}
              className="w-[52px] h-[24px] flex items-center rounded-full px-1 cursor-pointer"
              style={{ backgroundColor: '#181059' }}
            >
              <div
                className={`w-[16px] h-[16px] rounded-full transition-all duration-300`}
                style={{
                  backgroundColor: '#FFC700',
                  transform: isMonthly ? 'translateX(0)' : 'translateX(28px)',
                }}
              ></div>
            </div>
{/* <span className={`font-semibold ${!isMonthly ? 'text-[#181059]' : 'text-[#181059]'}`}>
  Bill Annually
</span> */}


<span className={` font-inter ${!isMonthly ? 'text-[#181059]' : 'text-[#181059]'}`}>
  Bill Annually
</span>


            {/* <span className={`font-semibold ${!isMonthly ? 'text-[#181059]' : 'text-gray-500'}`}>
              Bill Annually
            </span> */}
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-x-8 gap-y-6 bg-cover bg-center mt-[80px]">

            {/* Starter Card */}
            <div className="pricing-card w-[260px] rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white group"
              style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
              <div className="p-6 text-left space-y-4">
             

                <h3
  className="text-[24px] font-[700] leading-[24px] tracking-[0px] font-inter text-[#181059] group-hover:text-white transition"
>
  Starter
</h3>

                <ul className="text-sm text-[#181059]  space-y-2">
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>Access to Basic Cargo Calculator</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>Up to 10 box Shipment</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>3D View</span>
                  </li>
                  
          <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
>
  CSV Upload
</li>

                  <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                      // style={{ color: '#717171' }}
                      >
                    Container customization
                  </li>
                   <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                      >
                    PDF Export
                  </li>
               <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                      >
                    Unlimited boxes
                  </li>
                  <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                      >
                    Advanced Optimization
                  </li>
                 <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                      >
                    Animated Visualizer
                  </li>
                 <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                      >
                    Premium support
                  </li>
                </ul>
              </div>
              
              <div className="text-center py-4 rounded-b-[24px]">
                <p className="text-xl font-semibold text-[#181059] group-hover:text-white transition text-left px-6">
                  ₹199
                  <span className="text-sm font-normal text-[#181059] group-hover:text-gray-200 transition">/month</span>
                </p>

                <button className="card-button mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300">
                  Choose
                </button>
              </div>
            </div>

            {/* Pro Card */}
            <div className="pricing-card w-[260px] h-full rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white group"
            style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
              <div className="p-6 text-left space-y-4">
                {/* <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter group-hover:text-white transition">
                  Pro
                </h3> */}

                       <h3
  className="text-[24px] font-[700] leading-[24px] tracking-[0px] font-inter text-[#181059] group-hover:text-white transition"
>
                    Pro
</h3>
                <ul className="text-sm text-[#181059] space-y-2">
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>Access to Basic Cargo Calculator</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>Up to 10 box Shipment</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>3D View</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>CSV Upload</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>Container customization</span>
                  </li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">
                    <span>✓</span><span>PDF Export</span>
                  </li>
                  <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                  >
                   
                    <span>Unlimited boxes</span>
                  </li>
                <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    
                  >
                    <span>Advanced Optimization</span>
                  </li>
                <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    > <span>Animated Visualizer</span>
                  </li>
                 <li className="flex items-start gap-1  text-[#717171] ml-4 group-hover:text-black transition"
                    >  <span>Premium support</span>
                  </li>
                </ul>
              </div>

              <div className="text-center py-4 rounded-b-[24px]">
                <p className="text-xl font-semibold text-[#181059] group-hover:text-white transition text-left px-6">
                  ₹299
                  <span className="text-sm font-normal text-[#181059] group-hover:text-gray-200 transition">/month</span>
                </p>

                <button className="card-button mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300">
                  Choose
                </button>
              </div>
            </div>

            <div className="pricing-card w-[260px] h-full rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white group" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}> 
              <div className="p-6 text-left space-y-4">
                <div className="flex justify-between items-center w-full">
                  

                                 <h3
  className="text-[24px] font-[700] leading-[24px] tracking-[0px] font-inter text-[#181059] group-hover:text-white transition"
>
     Exclusive 
</h3>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded group-hover:bg-white group-hover:text-blue-600 transition"> 
                    Save ₹60
                  </span>
                </div>

                <ul className="text-sm text-[#181059] space-y-2 ">
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Access to Basic Cargo Calculator</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Up to 100 box Shipment</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>3D Views</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>CSV Upload</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Container customization</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>PDF Export</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Unlimited boxes</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Advanced Optimization</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Animated Visualizer</span></li>
                  <li className="flex items-start gap-1 group-hover:text-white transition">✓ <span>Premium support</span></li>
                </ul>
              </div>

              <div className="py-4 rounded-b-[24px]">
                <p className="text-xl font-semibold text-[#181059]  group-hover:text-white transition text-left px-6">
                  ₹499
                  <span className="text-sm font-normal text-[#181059] group-hover:text-gray-200 transition">
                    /month
                  </span>
                </p>

                <div className="text-center">
                  <button className="card-button mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300">
                    Try 1 month
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default PricingSection;