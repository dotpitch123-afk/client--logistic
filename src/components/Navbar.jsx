import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from "react-router-dom";
import simplebox from './images/simplebox.jpg'
export default function CargoCalcHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
      
          <div className="flex items-center space-x-2">
            <div className="text-blue-500 flex items-center">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9987 1.33301V24.6663M21.2483 4.7501L4.74912 21.2493M24.6654 12.9997H1.33203M21.2483 21.2493L4.74912 4.7501" stroke="#2274D4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
            </div>
            <span className="text-xl font-semibold text-blue-600 tracking-tight">
              CargoCalc
            </span>
             <nav className="hidden md:flex items-center space-x-12 ">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium ml-5"
            >
              Features
            </a>
            <a
              href="#industry"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              Industry
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              Contact Us
            </a>
          </nav>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
            
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3763 21.9519H3.19714C3.13967 21.9519 3.08456 21.9291 3.04393 21.8884C3.0033 21.8478 2.98047 21.7927 2.98047 21.7352V20.1644C2.98047 19.2642 3.62289 18.4712 4.61305 17.7973C6.38105 16.5905 9.24214 15.83 12.4596 15.83C12.9905 15.83 13.5116 15.8517 14.0207 15.8917C14.1284 15.9026 14.2371 15.8918 14.3405 15.8601C14.4439 15.8284 14.5399 15.7763 14.623 15.7069C14.706 15.6376 14.7743 15.5524 14.824 15.4563C14.8736 15.3602 14.9036 15.2551 14.9121 15.1473C14.9206 15.0394 14.9075 14.931 14.8736 14.8283C14.8396 14.7256 14.7855 14.6307 14.7144 14.5491C14.6432 14.4676 14.5565 14.4011 14.4594 14.3536C14.3622 14.306 14.2566 14.2783 14.1486 14.2722C13.5867 14.2271 13.0233 14.2047 12.4596 14.205C8.8608 14.205 5.67472 15.1052 3.69655 16.454C2.18747 17.4832 1.35547 18.7907 1.35547 20.1633V21.7352C1.35576 22.2235 1.54991 22.6917 1.89526 23.0368C2.24061 23.3819 2.70888 23.5758 3.19714 23.5758L11.3763 23.5769C11.5918 23.5769 11.7985 23.4913 11.9508 23.3389C12.1032 23.1866 12.1888 22.9799 12.1888 22.7644C12.1888 22.5489 12.1032 22.3423 11.9508 22.1899C11.7985 22.0375 11.5918 21.9519 11.3763 21.9519ZM12.4596 1.35449C9.17064 1.35449 6.5013 4.02383 6.5013 7.31283C6.5013 10.6018 9.17064 13.2712 12.4596 13.2712C15.7486 13.2712 18.418 10.6018 18.418 7.31283C18.418 4.02383 15.7486 1.35449 12.4596 1.35449ZM12.4596 2.97949C14.8516 2.97949 16.793 4.92083 16.793 7.31283C16.793 9.70483 14.8516 11.6462 12.4596 11.6462C10.0676 11.6462 8.1263 9.70483 8.1263 7.31283C8.1263 4.92083 10.0676 2.97949 12.4596 2.97949Z" fill="#1C1C1E"/>
<path d="M19.6634 21.8918C20.3959 22.0028 21.1447 21.9243 21.8383 21.6637C22.5319 21.4032 23.1471 20.9693 23.6254 20.4034C24.1037 19.8375 24.4289 19.1585 24.5702 18.4312C24.7115 17.7039 24.6641 16.9525 24.4325 16.2487C24.2009 15.5449 23.7929 14.9122 23.2473 14.4109C22.7017 13.9096 22.0368 13.5564 21.316 13.3851C20.5951 13.2138 19.8424 13.23 19.1296 13.4322C18.4168 13.6345 17.7678 14.0159 17.2443 14.5403C16.764 15.0201 16.4032 15.6061 16.1911 16.251C15.9791 16.8959 15.9216 17.5816 16.0234 18.2529L13.5079 20.7673C13.4323 20.8428 13.3723 20.9325 13.3314 21.0312C13.2905 21.1299 13.2695 21.2357 13.2695 21.3425V23.8331C13.2695 24.2816 13.6335 24.6456 14.082 24.6456H16.5726C16.6795 24.6457 16.7853 24.6246 16.884 24.5837C16.9827 24.5428 17.0724 24.4829 17.1479 24.4073L19.6634 21.8918ZM19.607 20.2234C19.4695 20.1868 19.3248 20.1869 19.1873 20.2238C19.0499 20.2607 18.9245 20.333 18.8238 20.4336L16.2368 23.0206H14.8945V21.6784L17.4815 19.0914C17.5821 18.9906 17.6544 18.8653 17.6913 18.7278C17.7282 18.5904 17.7283 18.4456 17.6917 18.3081C17.5387 17.7321 17.5797 17.1217 17.8083 16.5712C18.037 16.0208 18.4405 15.561 18.9566 15.2629C19.4727 14.9648 20.0727 14.8449 20.6637 14.9219C21.2547 14.9988 21.804 15.2683 22.2265 15.6886C22.6469 16.1112 22.9163 16.6604 22.9933 17.2514C23.0702 17.8425 22.9504 18.4424 22.6522 18.9585C22.3541 19.4746 21.8943 19.8781 21.3439 20.1068C20.7935 20.3354 20.1831 20.3764 19.607 20.2234Z" fill="#CC0001"/>
<path d="M19.4806 18.4364C19.3673 18.3282 19.2768 18.1984 19.2144 18.0547C19.152 17.911 19.119 17.7562 19.1173 17.5996C19.1155 17.4429 19.1451 17.2875 19.2043 17.1424C19.2635 16.9973 19.3511 16.8656 19.462 16.7549C19.5729 16.6441 19.7047 16.5567 19.8499 16.4977C19.995 16.4387 20.1505 16.4093 20.3071 16.4112C20.4638 16.4132 20.6185 16.4464 20.7621 16.509C20.9058 16.5716 21.0354 16.6622 21.1435 16.7757C21.3553 16.9979 21.4717 17.2941 21.4679 17.6011C21.4641 17.908 21.3404 18.2013 21.1232 18.4182C20.906 18.6352 20.6126 18.7585 20.3056 18.7619C19.9987 18.7653 19.7026 18.6485 19.4806 18.4364Z" fill="#CC0001"/>
</svg>
              </div>
               <div className="text-sm font-medium space-x-1">
      <Link
        to="/register"
        className="hover:underline text-blue-600"
      >
        Register
      </Link>
      <span className="text-gray-400">/</span>
      <Link
        to="/login"
        className="hover:underline text-blue-600"
      >
        Login
      </Link>
    </div>
            </div>
            <button className=" text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"  
             style={{
    background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
  }} 
  >
              Try a Demo
            </button>
          </div>         
          <div className="md:hidden" >
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 mt-0 pt-4 pb-4 space-y-4">
            <a
              href="#features"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            >
              Features
            </a>
            <a
              href="#industry"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            >
              Industry
            </a>
            <a
              href="#pricing"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
            >
              Contact Us
            </a>           
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center space-x-2 text-gray-700 py-2">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="font-medium">Register / Login</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors duration-200 shadow-sm">
                Try a Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>



   
    {/* <div className="bg-[#1e3570] py-8 px-6 flex justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-[#1e3570] rounded-2xl px-6 py-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] border border-white/10">
        
       
        <h2 className="text-white text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
          Want to make your shipping <br /> smart and stress-free?
        </h2>

        <button className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-medium px-6 py-2 rounded-lg text-sm shadow hover:opacity-90 transition">
          Start Free Trial
        </button>
      </div>
    </div>
   */}



    {/* <div
      className="relative bg-cover bg-center py-20 px-6 flex justify-center items-center"
     style={{
        backgroundImage: `url(${simplebox})`,
      }}
    >
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-12 py-6 text-center max-w-4xl shadow-lg border border-white/20">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-5">
          Tired of Spending Hours Calculating Cargo Box Sizes?
        </h2>
        <p className="text-white text-base md:text-lg">
          Skip the hustle, just a few steps your cargo is calculated!
        </p>
     </div>
    </div>
   */}


    </>
  );
}
