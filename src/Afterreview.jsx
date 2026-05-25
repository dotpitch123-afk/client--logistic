import React from 'react';

import simplebox from './images/gla.png'
const REviewSection = () => {
  return (
   <div className="bg-[#1e3570] py-8 px-6 my-10 flex justify-center">
    


          <div
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl rounded-2xl px-6 py-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] border border-white/10 bg-[#1e3570]"
        style={{
          backgroundImage: `url(${simplebox})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* <h2 className="text-white text-2xl font-semibold font-outfit text-center md:text-left mb-4 md:mb-0">
          Want to make your shipping <br /> smart and stress-free?
        </h2> */}
<h2 className="text-white font-outfit font-semibold text-[45px] leading-[52.9px] w-[610px] h-[106px] text-center md:text-left">
  Want to make your shipping <br /> smart and stress-free?
</h2>
<button
  className="text-white font-poppins font-bold text-[15px] leading-[150%] text-center px-6 py-2 rounded-lg shadow hover:opacity-90 transition flex items-center justify-center"
  style={{
    background:
      "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
  }}
>
  Start Free Trial
</button>

        {/* <button className=" text-white  font-medium px-6 py-2 rounded-lg text-sm shadow hover:opacity-90 transition"
                        style={{
    background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
  }}
       
       >
          Start Free Trial
        </button> */}
      </div>
    </div>
  
  );
};

export default REviewSection;
