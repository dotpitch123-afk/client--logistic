import React, { useState } from 'react';
import price from './images/linesofpricing.png'

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

   const [isMonthly, setIsMonthly] = useState(true);

  const toggleBilling = () => setIsMonthly(!isMonthly);


  return (
    <div className="bg-white py-16  text-center">
      
      <h2 className="text-4xl font-bold font-outfit font-semibold  text-black mb-2 text-[32px] leading-[24px]">Pricing</h2>


      <h3 className="text-gray-600 text-lg mb-2 font-semibold  text-[20px]">
        Plans That Scale with Your Shipping Needs
      </h3>
      
   
   <p className="font-inter font-medium text-[20px] leading-[100%] text-center text-[#181059] mb-8">
  Affordable for startups. Powerful for enterprise. 
  <br />
  Choose a plan that fits your workflow.
</p>

   <div className=" justify-center items-stretch  bg-cover bg-center  h-[789px]"    style={{ backgroundImage: `url(${price})` }}>



   <div className="flex items-center justify-center gap-4">
      <span className={`font-semibold ${isMonthly ? 'text-[#181059]' : 'text-gray-500'}`}>
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

      <span className={`font-semibold ${!isMonthly ? 'text-[#181059]' : 'text-gray-500'}`}>
        Bill Annually
      </span>
    </div>
 <div className="flex flex-wrap justify-center items-stretch gap-x-8 gap-y-6 bg-cover bg-center mt-[80px]" >

     {/* <div className="w-[260px]  rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white  transform transition duration-300 ease-in-out    hover:-translate-y-8"  >
    <div className="p-6 text-left space-y-4">
      <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter">Starter</h3>
      <ul className="text-sm text-[#181059] space-y-2">
        <li className="flex items-start gap-1"><span>✓</span><span>Access to Basic Cargo Calculator</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Up to 10 box Shipment</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>3D View</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>CSV Upload</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>Container customization</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>PDF Export</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>Unlimited boxes</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>Advanced Optimization</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>Animated Visualizer</span></li>
        <li className="flex items-start gap-1 text-gray-400 ml-4"><span>Premium support</span></li>
      </ul>
    </div>
    <div className="text-center py-4 rounded-b-[24px]">
      <p className="text-xl font-semibold text-gray-800">
        ₹199<span className="text-sm font-normal text-gray-500">/month</span>
      </p>
      <button
        className="mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter"
        style={{
          background: 'linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)',
          boxShadow: '2px 2px 4px 0px #00000040',
        }}
      >
        Choose
      </button>
    </div>
  </div> */}


  <div className="w-[260px] rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white transform transition duration-300 ease-in-out hover:-translate-y-8 group">
  <div className="p-6 text-left space-y-4">
    <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter group-hover:text-white transition">
      Starter
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
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        CSV Upload
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        Container customization
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        PDF Export
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        Unlimited boxes
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        Advanced Optimization
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        Animated Visualizer
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        Premium support
      </li>
    </ul>
  </div>

  <div className="text-center py-4 rounded-b-[24px]">
    <p className="text-xl font-semibold text-gray-800 group-hover:text-white transition">
      ₹199
      <span className="text-sm font-normal text-gray-500 group-hover:text-gray-200 transition">/month</span>
    </p>
    {/* <button
      className="mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter 
                 bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300
                 hover:bg-white hover:text-black"
    >
      Choose
    </button> */}


    <button
  className="mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] font-inter
             transition duration-300 group-hover:bg-white group-hover:text-black"
>
  Choose
</button>

  </div>

  {/* Gradient Background on Hover */}
  <style jsx>{`
    .group:hover {
      background: linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%);
      box-shadow: 2px 2px 4px 0px #00000040;
    }
  `}</style>
</div>

<div className="w-[260px] h-full rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white transform transition duration-300 ease-in-out hover:-translate-y-8 group">
  {/* Content */}
  <div className="p-6 text-left space-y-4">
    <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter group-hover:text-white transition">
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
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        <span>Unlimited boxes</span>
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        <span>Advanced Optimization</span>
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        <span>Animated Visualizer</span>
      </li>
      <li className="flex items-start gap-1 text-gray-400 ml-4 group-hover:text-gray-200 transition">
        <span>Premium support</span>
      </li>
    </ul>
  </div>

  {/* Price & Button */}
  <div className="text-center py-4 rounded-b-[24px]">
    <p className="text-xl font-semibold text-gray-800 group-hover:text-white transition">
      ₹299<span className="text-sm font-normal text-gray-500 group-hover:text-gray-200 transition">/month</span>
    </p>


    <button
  className="mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter 
             bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300
             hover:bg-white hover:text-black"
>
  Choose

</button>
  </div>

  {/* Gradient Background on Hover */}
  <style jsx>{`
    .group:hover {
      background: linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%);
      box-shadow: 2px 2px 4px 0px #00000040;
    }
  `}</style>
</div>


  {/* <div
    className="w-[260px] h-full rounded-[24px] shadow-lg text-white flex flex-col justify-between    transform transition duration-300 ease-in-out    hover:-translate-y-8"
    style={{
      background: 'linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)',
      boxShadow: '2px 2px 4px 0px #00000040',
    }}
  >
    <div className="p-6 text-left space-y-4">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter">Exclusive</h3>
        <span className="bg-white text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">Save ₹60</span>
      </div>
      <ul className="text-sm space-y-2">
        <li className="flex items-start gap-1"><span>✓</span><span>Access to Basic Cargo Calculator</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Up to 100 box Shipment</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>3D Views</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>CSV Upload</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Container customization</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>PDF Export</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Unlimited boxes</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Advanced Optimization</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Animated Visualizer</span></li>
        <li className="flex items-start gap-1"><span>✓</span><span>Premium support</span></li>
      </ul>
    </div>
    <div className="text-center py-4 rounded-b-[24px]">
      <p className="text-xl font-semibold text-white">
        ₹499<span className="text-sm font-normal text-white">/month</span>
      </p>
      <button
        className="mt-3 w-[212px] py-2.5 text-black text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md bg-white font-inter"
      >
        Try 1 month
      </button>
    </div>
  </div> */}







<div className="w-[260px] h-full rounded-[24px] shadow-md border border-gray-100 flex flex-col justify-between bg-white transform transition duration-300 ease-in-out hover:-translate-y-8 group"> 
  <div className="p-6 text-left space-y-4">
    <div className="flex justify-between items-center w-full">
      <h3 className="font-bold text-[24px] leading-[24px] tracking-normal font-inter group-hover:text-white transition">
        Exclusive  
      </h3>
      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded group-hover:bg-white group-hover:text-blue-600 transition"> 
        Save ₹60
      </span>
    </div>

    <ul className="text-sm text-[#181059] space-y-2">
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

  <div className="text-center py-4 rounded-b-[24px]">
    <p className="text-xl font-semibold text-gray-800 group-hover:text-white transition">
      ₹499
      <span className="text-sm font-normal text-gray-500 group-hover:text-gray-200 transition">
        /month
      </span>
    </p>

    {/* Only bottom button */}
    <button
      className="mt-3 w-[212px] py-2.5 text-white text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md font-inter 
                 bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] transition duration-300
                 group-hover:bg-white group-hover:text-black"
    >
      Try 1 month
    </button>
  </div>

  {/* Hover Gradient Background */}
  <style jsx>{`
    .group:hover {
      background: linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%);
      box-shadow: 2px 2px 4px 0px #00000040;
    }
  `}</style>
</div>


</div>
</div>

    </div>
  );
};

export default PricingSection;



    // <button
    //     className="mt-3 w-[212px] py-2.5 text-black text-center text-[18px] leading-[18px] tracking-normal font-bold rounded-md shadow-md bg-white font-inter"
    //   >
    //     Try 1 month
    //   </button>