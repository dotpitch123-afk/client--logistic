

 
import { Mail, Phone } from "lucide-react";
import contactbbox from "./images/contactbox.png";
import contact from "./images/Rectangle.png";
import imageUrl  from "./images/Background.png";
export default function ContactUs() {
  return (

<div
  className="   py-28"  
  style={{
 

   
    transform: 'rotate(0deg)',
    opacity: 1,
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center',
  
    backgroundSize: 'cover',

  }}
>

<div
  className="w-full max-w-[1206px] h-[580px] m-auto flex flex-col md:flex-row items-stretch gap-8 rounded-[21px] bg-[#EAEFFD] relative font-inter"
>
  {/* Left Side Image */}
<div className="relative w-full md:w-[511px] h-full rounded-[21px] overflow-hidden">
  <img
    src={contact}
    alt="Contact"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6 sm:p-8 text-white">
    <h2
      className="mb-4 sm:mb-6"
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        fontSize: '60px',
        lineHeight: '24px',
        letterSpacing: '0%',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}
    >
      Contact Us
    </h2>
    <p
  className="flex items-center gap-2 sm:gap-3 mb-0 sm:mb-3 text-[25px] leading-[32px] font-normal text-white"
  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0%' }}
>
  <Mail size={18} /> calcargo@gmail.com
</p>

    {/* <p className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-base sm:text-lg">
      <Mail size={18} /> calcargo@gmail.com
    </p> */}
    {/* <p className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
      <Phone size={18} /> +91 9191919191
    </p> */}
<p className="flex items-center gap-2 sm:gap-3 text-[25px] leading-[32px]  font-normal text-white" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0%' }}>
  <Phone size={18} /> +91 9191919191
</p>

    
  </div>
</div>

  {/* Right Side Form */}
  <div className="w-full md:flex-1 flex flex-col justify-center rounded-[21px] p-6  sm:p-8">
    {/* <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 px-20">
      Get in Touch
    </h2> */}



  <h2
  className="text-[28px] leading-[24px] font-semibold text-center text-gray-900 px-20"
  style={{
    fontFamily: 'Outfit, sans-serif',
    letterSpacing: '0%',
    width: '345px',
    height: '49px',
    opacity: 1,
    transform: 'rotate(0deg)'
  }}
>
  Get in Touch
</h2>


    <form className="flex flex-col gap-4 px-20">


      <input
  type="text"
  placeholder="Your Name"
  className="w-[353px] h-[54px] rounded-[17px] border border-[#E8E8E8] px-[20px] py-[19px] bg-[#F5F5F5]  text-[#18171D] focus:outline-none"
/>
<input
  type="email"
  placeholder="Your Email"
  className="w-[353px] h-[54px] rounded-[17px] border border-[#E8E8E8] px-[20px] py-[19px] bg-[#F5F5F5]  text-[#18171D] focus:outline-none"
/>
<input
  type="tel"
  placeholder="Your Phone No."
  className="w-[353px] h-[54px] rounded-[17px] border border-[#E8E8E8] px-[20px] py-[19px] bg-[#F5F5F5]  text-[#18171D]  focus:outline-none"
/>

      {/* <input
        type="text"
        placeholder="Your Name"
        className="w-full h-12 border rounded-[17px] px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full h-12 border rounded-[17px] px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Your Phone No."
        className="w-full h-12 border rounded-[17px] px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
     <textarea
  placeholder="Your Message"
  className="w-[353px] h-[145px] rounded-[17px] border border-[#E8E8E8]  bg-[#F5F5F5]  text-[#18171D] px-[20px] py-[23px] resize-none focus:outline-none"

></textarea>

      <button
        type="submit"
        className="w-full sm:w-28 py-3 rounded-md text-white font-medium hover:opacity-90 transition"
        style={{
          background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
        }}
      >
        Send
      </button>
    </form>
  </div>

  {/* Decorative Box */}
  <div className="absolute bottom-[-24px] right-[-24px] w-16 sm:w-24 md:w-32">
    <img
      src={contactbbox}
      alt="Boxes"
      className="w-full h-full object-contain"
    />
  </div>
</div>

   
    </div>
  );
}

