
import React from 'react';
import box1 from './images/box1.jpg'
import box2 from './images/box2.jpg'
import box3 from './images/box3.png'
import box4 from './images/box4.jpg'
import box5 from './images/box5.jpg'
import box6 from './images/box6.jpg'
import box7 from './images/box7.jpg'
import box8 from './images/box8.jpg'
import box9 from './images/box9.jpg'
import box10 from './images/box10.jpg'
import ind from './images/ind.png'
export default function LogisticsIndustries() {
  const topRowIndustries = [
    { 
      name: 'Freight & Cargo', 
      image: box3,
    },
    { 
      name: 'Courier & Parcel', 
      image: box8,
    },
    { 
      name: 'Sea & Ocean Freight', 
      image: box9
    }
  ];

  const bottomRowIndustries = [
    { 
      name: 'Rail Freight', 
      image: box10
    },
    { 
      name: 'Road Transport', 
     
         image: box6,
    },
    { 
      name: 'Warehousing & Distribution', 
      
       image: box7,
     
    },
    { 
      name: 'E-commerce & Retail Logistics', 
      
       image: box5,
    }
  ];

  const IndustryCard = ({ industry }) => (
  //   <div className=" rounded-[7px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"  style={{
  //    backgroundImage:`url(${ind})`
  // }}>
  <div 
    className="rounded-[7px] font-inter  bg-[#EAEFFD] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-cover bg-center"  
   
  >
      {/* <div className="bg-[#EAEFFD]  px-4 py-3"> */}
<div className=" px-4 bg-[#EAEFFD] py-4">
               {/* <h3 className="font-medium text-gray-800 text-center text-sm sm:text-base">{industry.name}</h3> */}
     <h3 className="font-inter font-medium text-[18px] leading-[28px] text-black text-center">
  {industry.name}
</h3>

      </div>
      <div className="h-32 sm:h-40 overflow-hidden"  >
        <img 
          src={industry.image} 
          alt={industry.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          // onError={(e) => {
          //   e.target.style.display = 'none';
          //   e.target.parentElement.className += ' bg-gray-200 flex items-center justify-center';
          //   e.target.parentElement.innerHTML = '<span class="text-gray-500 text-sm">Image not available</span>';
          // }}
        />
      </div>
    </div>
  );


const IndustriesTitle = () => (
  // <div className=" overflow-hidden flex items-center justify-center ">
   
  //     <span className="text-lg font-outfit  font-semibold text-gray-800 text-center   font-[600] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] leading-[68px] font-outfit ">
  //       Industries
  //     </span>
    
  // </div>

  <div className="flex items-center justify-center py-10 ">
  <span className="font-outfit font-semibold text-center text-[#1B2128] 
    text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] leading-[68px]">
    Industries
  </span>
</div>

);





  return (
 
    <div 
  className="  bg-[#fff] p-8 mt-10 mb-10 sm:p-6 lg:p-8 bg-cover bg-center" 
  style={{ backgroundImage: `url(${ind})` }}
>

      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <IndustriesTitle />
          {topRowIndustries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} />
          ))}
        </div>
        

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {bottomRowIndustries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} />
          ))}
        </div>
      </div>
    </div>
  );


  
}