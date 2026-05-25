
import React, { useState } from "react";
import track from "./images/trackapp.png";


const cards = [
  { id: 1, title: "Dynamic Container Sizing", description: "Customize container dimensions on the go — no fixed templates, no limitations." },
  { id: 2, title: "Bulk Box Upload", description: "Add multiple boxes manually or upload a CSV..." },
  { id: 3, title: "3D Load Visualization", description: "Instantly visualize how boxes fit inside containers..." },
  { id: 4, title: "Capacity Optimization", description: "See your container filled to the max with smart fitment..." },
  { id: 5, title: "Downloadable PDFs", description: "Generate shareable PDF reports..." },
  { id: 6, title: "Step-by-Step Video View", description: "Watch how boxes are placed inside the container..." },
];

const GradientButton = ({ text }) => (
  <div className="p-[2px] rounded-[10px] bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] inline-block cursor-pointer">
    <div className="bg-white rounded-[10px] flex items-center justify-center h-[59px]">
      <span className="text-[18px] font-[500] bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9] bg-clip-text text-transparent px-4">
        {text}
      </span>
    </div>
  </div>
);

export default function FeatureSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  const cardWidth = 342;
  const halfCardWidth = cardWidth / 2;
  const gap = 20;

  const getVisibleCards = () => {
    if (slideIndex === 0) {
      return [
        { ...cards[0], width: cardWidth, isHalf: false },
        { ...cards[1], width: cardWidth, isHalf: false },  
        { ...cards[2], width: halfCardWidth, isHalf: true } 
      ];
    }
    if (slideIndex === 1) {
      return [
        { ...cards[2], width: cardWidth, isHalf: false },
        { ...cards[3], width: cardWidth, isHalf: false },
        { ...cards[4], width: halfCardWidth, isHalf: true } 
      ];
    }
    if (slideIndex === 2) {
      return [
        { ...cards[4], width: cardWidth, isHalf: false }, 
        { ...cards[5], width: cardWidth, isHalf: false } // Card 6 - full
      ];
    }
    return [];
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="w-full py-16 font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
       
        <div className="lg:col-span-2 p-8 lg:p-12  ml-10">
          <h2 className="text-4xl lg:text-5xl font-medium mb-2 font-outfit">
            Features
          </h2>

          <h3 className="w-[419px] h-[58px] text-[28px] leading-[28px] font-medium font-outfit text-black opacity-100 mb-2">
            Powerful Features to Maximize Your Container Space
          </h3>

          <p className="w-[423px] h-[136px] mb-4 text-black text-[18px] leading-[24px] font-medium font-inter opacity-100">
            From dynamic container dimensioning to instant 3D visualisations,
            our cargo calculator simplifies your logistics planning. Whether
            you're preparing a single shipment or scaling across multiple
            departments we've got you covered.
          </p>

          <GradientButton text="Explore More Feature" />
        </div>

       
     


<div className="lg:col-span-3 relative h-[494px] overflow-hidden rounded-[17px]">
  {/* Background Image */}
  {/* <img  
    src={track}
    alt="Container"
    className="absolute inset-0 w-full h-full object-cover"
  /> */}
<img
  src={track}
  alt="Container"
  style={{
    position: 'absolute',
    width: '900px',
    height: '494px',
   
    opacity: 1,
    transform: 'rotate(0deg)',
    borderRadius: '17px',
    objectFit: 'cover',
  }}
/>

  {/* Overlay content on top of image */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pl-10 z-10">
    <div className="flex transition-all duration-700 ease-in-out overflow-hidden">
      {visibleCards.map((card, index) => (
        <div
          key={`${slideIndex}-${card.id}`}
          className={`bg-white shadow-lg flex-shrink-0 overflow-hidden ${
            card.isHalf && index === 2
              ? 'rounded-tl-[17px] rounded-bl-[17px] rounded-tr-none rounded-br-none'
              : 'rounded-[17px]'
          }`}
          style={{
            width: `${card.width}px`,
            height: "320px",
            padding: card.isHalf ? "20px 10px 20px 20px" : "20px",
            marginRight: index < visibleCards.length - 1 ? `${gap}px` : "0px",
          }}
        >
          <div
            style={{
              width: card.isHalf ? "calc(200% - 30px)" : "100%",
              overflow: "hidden",
            }}
          >
            <h2 className="text-[28px] leading-[32px] mt-6 mb-8 font-medium text-black font-outfit">
              {card.id}. {card.title}
            </h2>
            <p className="text-[18px] leading-[24px] font-medium text-black font-inter">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Navigation Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
    {[0, 1, 2].map((dot) => (
      <button
        key={dot}
        onClick={() => setSlideIndex(dot)}
        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
          slideIndex === dot
            ? "bg-gradient-to-r from-[#484AE6] via-[#2960EA] to-[#DAACB9]"
            : "bg-white"
        }`}
      />
    ))}
  </div>
</div>



      </div>
    </section>
  );
}