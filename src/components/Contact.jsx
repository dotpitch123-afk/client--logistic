 
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


    <div className="w-full bg-[#EAEFFD]   max-w-5xl  m-auto  flex flex-col md:flex-row items-stretch gap-8 rounded-2xl relative"
   
     
   >

    
      <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden min-h-[300px]">
        <img
          src={contact}
          alt="Contact"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6 sm:p-8 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Us</h2>
          <p className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-base sm:text-lg">
            <Mail size={18} /> calcargo@gmail.com
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
            <Phone size={18} /> +91 9191919191
          </p>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex flex-col justify-center  rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">Get in Touch</h2>
        <form className="flex flex-col gap-4">
          <input
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
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full h-28 border rounded-[17px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full sm:w-28 py-2 rounded-md text-white font-medium bg-gradient-to-r from-blue-600 to-pink-400 hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Decorative Box Image */}
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
