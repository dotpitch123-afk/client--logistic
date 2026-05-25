
// // import React, { useState } from "react";
// // import track from './images/track.png'
// // const cards = [
// //   {
// //     id: 1,
// //     title: "Dynamic Container Sizing",
// //     description: "Customize container dimensions on the go — no fixed templates, no limitations.",
// //   },
// //   {
// //     id: 2,
// //     title: "Bulk Box Upload",
// //     description: "Add multiple boxes manually or upload a CSV with box names, dimensions, and quantities. Perfect for large-scale shipments.",
// //   },
// //   {
// //     id: 3,
// //     title: "3D Load Visualization",
// //     description: "Instantly visualize how boxes fit inside containers — box-by-box based on quantity or automatically filled to full capacity for optimal space usage.",
// //   },
// //   {
// //     id: 4,
// //     title: "Capacity Optimization",
// //     description: "See your container filled to the max with smart fitment. Reduce shipping costs by improving space efficiency.",
// //   },
// //   {
// //     id: 5,
// //     title: "Downloadable PDFs",
// //     description: "Generate shareable PDF reports with box layouts, quantities, and container fill stats — great for logistics and internal approvals.",
// //   },
// //   {
// //     id: 6,
// //     title: "Step-by-Step Video View",
// //     description: "Watch how boxes are placed inside the container with minimal steps — step-by-step visuals ideal for training or operational review.",
// //   },
// // ];

// // export default function FeatureSection() {
// //   const [activeIndex, setActiveIndex] = useState(0);

// //   const isLast = activeIndex === cards.length - 1;
// //   const currentCard = cards[activeIndex];
// //   const nextCard = cards[activeIndex + 1];

// //   return (
// //     <section className="w-full px-4 pr-0 py-16 bg-white "   >
// //       <div className="max-w-7xl mx-auto mr-0 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
// //         <div className="space-y-6">
// //           <h2 className="text-4xl font-bold text-gray-900">Features</h2>
// //           <p className="text-lg text-gray-600">
// //             Powerful Features to Maximize Your Container Space
// //           </p>
// //           <p className="text-sm text-gray-500 max-w-md">
// //             From dynamic container dimensioning to instant 3D visualizations, our cargo calculator simplifies logistics planning.
// //           </p>
// //           <button className="mt-4 px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition">
// //             Explore More Feature
// //           </button>
// //         </div>



// //         <div className="relative w-full h-[420px]">
         
// //           <img
// //             src={track}
// //             alt="Containers"
// //             className="w-full h-full object-cover rounded-lg"
// //           />

// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] pl-8 overflow-hidden">
// //             <div className="flex space-x-4">
            
// //               <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] h-[200px] shrink-0 z-10">
// //                 <h3 className="text-lg font-bold mb-2">
// //                   {currentCard.id}. {currentCard.title}
// //                 </h3>
// //                 <p className="text-sm text-gray-600">{currentCard.description}</p>
// //               </div>

         
// //               {!isLast && nextCard && (
// //                 <div
// //                   className="bg-white rounded-lg shadow-lg p-6 w-[300px] h-[200px] shrink-0 relative z-0"
// //                   style={{
// //                     clipPath: 'inset(0 30% 0 0)',
// //                   }}
// //                 >
// //                   <h3 className="text-lg font-bold mb-2">
// //                     {nextCard.id}. {nextCard.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-600">{nextCard.description}</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Pagination Dots */}
// //           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
// //             {cards.map((_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setActiveIndex(i)}
// //                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
// //                   i === activeIndex ? "bg-blue-600" : "bg-gray-300"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// import React, { useState } from "react";
// import track from "./images/track.png";

// const cards = [
//   {
//     id: 1,
//     title: "Dynamic Container Sizing",
//     description:
//       "Customize container dimensions on the go — no fixed templates, no limitations.",
//   },
//   {
//     id: 2,
//     title: "Bulk Box Upload",
//     description:
//       "Add multiple boxes manually or upload a CSV with box names, dimensions, and quantities. Perfect for large-scale shipments.",
//   },
//   {
//     id: 3,
//     title: "3D Load Visualization",
//     description:
//       "Instantly visualize how boxes fit inside containers — box-by-box based on quantity or automatically filled to full capacity for optimal space usage.",
//   },
//   {
//     id: 4,
//     title: "Capacity Optimization",
//     description:
//       "See your container filled to the max with smart fitment. Reduce shipping costs by improving space efficiency.",
//   },
//   {
//     id: 5,
//     title: "Downloadable PDFs",
//     description:
//       "Generate shareable PDF reports with box layouts, quantities, and container fill stats — great for logistics and internal approvals.",
//   },
//   {
//     id: 6,
//     title: "Step-by-Step Video View",
//     description:
//       "Watch how boxes are placed inside the container with minimal steps — step-by-step visuals ideal for training or operational review.",
//   },
// ];

// export default function FeatureSection() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const isLast = activeIndex === cards.length - 1;
//   const currentCard = cards[activeIndex];
//   const nextCard = cards[activeIndex + 1];

//   return (
//     // <section className="w-full  py-16  bg-blue-300">
//     //   {/* 🔹 Split into 2 equal halves */}
//     //   <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//     //     {/* LEFT SIDE (Text) */}
//     //     <div className="space-y-6">
//     //       <h2 className="text-4xl font-bold text-gray-900">Features</h2>
//     //       <p className="text-lg text-gray-600">
//     //         Powerful Features to Maximize Your Container Space
//     //       </p>
//     //       <p className="text-sm text-gray-500">
//     //         From dynamic container dimensioning to instant 3D visualizations,
//     //         <br />
//     //         our cargo calculator simplifies logistics planning.
//     //       </p>
//     //       <button className="mt-4 px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition">
//     //         Explore More Feature
//     //       </button>
//     //     </div>

//     //     {/* RIGHT SIDE (Image + Floating Cards) */}
//     //     <div className="relative w-full h-[420px]">
//     //       <img
//     //         src={track}
//     //         alt="Containers"
//     //         className="w-full h-full object-cover rounded-lg"
//     //       />

//     //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] pl-8 overflow-hidden">
//     //         <div className="flex space-x-4">
//     //           {/* Current Card */}
//     //           <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] h-[200px] shrink-0 z-10">
//     //             <h3 className="text-lg font-bold mb-2">
//     //               {currentCard.id}. {currentCard.title}
//     //             </h3>
//     //             <p className="text-sm text-gray-600">
//     //               {currentCard.description}
//     //             </p>
//     //           </div>

//     //           {/* Next Card (clipped) */}
//     //           {!isLast && nextCard && (
//     //             <div
//     //               className="bg-white rounded-lg shadow-lg p-6 w-[300px] h-[200px] shrink-0 relative z-0"
//     //               style={{
//     //                 clipPath: "inset(0 30% 0 0)",
//     //               }}
//     //             >
//     //               <h3 className="text-lg font-bold mb-2">
//     //                 {nextCard.id}. {nextCard.title}
//     //               </h3>
//     //               <p className="text-sm text-gray-600">
//     //                 {nextCard.description}
//     //               </p>
//     //             </div>
//     //           )}
//     //         </div>
//     //       </div>

//     //       {/* Pagination Dots */}
//     //       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//     //         {cards.map((_, i) => (
//     //           <button
//     //             key={i}
//     //             onClick={() => setActiveIndex(i)}
//     //             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//     //               i === activeIndex ? "bg-blue-600" : "bg-gray-300"
//     //             }`}
//     //           />
//     //         ))}
//     //       </div>
//     //     </div>
//     //   </div>
//     // </section>
// <section className="w-full py-16 ">
//   {/* 🔹 Split like ShippingLandingPage: 2 columns left, 3 columns right */}
//   <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
    
//     {/* LEFT SIDE (Text, span 2 cols) */}
//     {/* <div className="lg:col-span-2 space-y-6">
//       <h2 className="text-4xl font-bold text-gray-900">Features</h2>
//       <p className="text-lg text-gray-600">
//         Powerful Features to Maximize Your Container Space
//       </p>
//       <p className="text-sm text-gray-500">
//         From dynamic container dimensioning to instant 3D visualizations,
//         <br />
//         our cargo calculator simplifies logistics planning.
//       </p>
//       <button className="mt-4 px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition">
//         Explore More Feature
//       </button>
//     </div> */}

//     <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center text-black relative">
//   {/* Decorative circles */}
//   <div className="absolute inset-0 opacity-10">
//     <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
//     <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
//     <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
//   </div>

//   {/* Text content */}
//   <div className="relative z-10">
//     {/* Heading with underline */}
//     <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 relative inline-block">
//       Features
//       {/* <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span> */}
//     </h2>

//     {/* Sub heading */}
//     <h3 className="text-xl font-semibold mb-4">
//       Powerful Features to Maximize Your Container Space
//     </h3>

//     {/* Paragraph */}
//     <p className="text-lg text-black mb-6 max-w-md leading-relaxed">
//       From dynamic container dimensioning to instant 3D visualisations,
//       our cargo calculator simplifies your logistics planning. Whether
//       you’re preparing a single shipment or scaling across multiple
//       departments we’ve got you covered.
//     </p>

//     {/* Outline gradient button */}
//     <button
//       className="px-6 py-3 rounded-lg font-medium text-lg border transition-all duration-300"
//       style={{
//         border: "2px solid #E0E0E0",
//         background: "transparent",
//         backgroundClip: "text",
//         WebkitBackgroundClip: "text",
//         color: "transparent",
//         WebkitTextFillColor: "transparent",
//         backgroundImage:
//           "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
//       }}
//     >
//       Explore More Feature →
//     </button>
//   </div>
// </div>

 
//     {/* RIGHT SIDE (Image + Floating Cards, span 3 cols) */}
//     <div className="lg:col-span-3 relative w-full "   style={{
  
//     height: "494px",
//     borderRadius: "17px",
   
   
//   }}>
//       <img
//         src={track}
//         alt="Containers"
//         className="w-full h-full object-cover rounded-lg"
//       />

//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] pl-8 overflow-hidden">
//         <div className="flex space-x-4">
//           {/* Current Card */}
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] h-[200px] shrink-0 z-10">
//             <h3 className="text-lg font-bold mb-2">
//               {currentCard.id}. {currentCard.title}
//             </h3>
//             <p className="text-sm text-gray-600">{currentCard.description}</p>
//           </div>

//           {/* Next Card (clipped) */}
//           {!isLast && nextCard && (
//             <div
//               className="bg-white rounded-lg shadow-lg p-6 w-[300px] h-[200px] shrink-0 relative z-0"
//               style={{
//                 clipPath: "inset(0 30% 0 0)",
//               }}
//             >
//               <h3 className="text-lg font-bold mb-2">
//                 {nextCard.id}. {nextCard.title}
//               </h3>
//               <p className="text-sm text-gray-600">{nextCard.description}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Pagination Dots */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//         {cards.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setActiveIndex(i)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               i === activeIndex ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// </section>

    
//   );
// }
// import React, { useState } from "react";
// import track from "./images/track.png";

// const cards = [
//   {
//     id: 1,
//     title: "Dynamic Container Sizing",
//     description:
//       "Customize container dimensions on the go — no fixed templates, no limitations.",
//   },
//   {
//     id: 2,
//     title: "Bulk Box Upload",
//     description:
//       "Add multiple boxes manually or upload a CSV with box names, dimensions, and quantities. Perfect for large-scale shipments.",
//   },
//   {
//     id: 3,
//     title: "3D Load Visualization",
//     description:
//       "Instantly visualize how boxes fit inside containers — box-by-box based on quantity or automatically filled to full capacity for optimal space usage.",
//   },
//   {
//     id: 4,
//     title: "Capacity Optimization",
//     description:
//       "See your container filled to the max with smart fitment. Reduce shipping costs by improving space efficiency.",
//   },
//   {
//     id: 5,
//     title: "Downloadable PDFs",
//     description:
//       "Generate shareable PDF reports with box layouts, quantities, and container fill stats — great for logistics and internal approvals.",
//   },
//   {
//     id: 6,
//     title: "Step-by-Step Video View",
//     description:
//       "Watch how boxes are placed inside the container with minimal steps — step-by-step visuals ideal for training or operational review.",
//   },
// ];

// export default function FeatureSection() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Show 3 cards (2 full + 1 half)
//   const visibleCards = cards.slice(activeIndex, activeIndex + 3);

//   // Number of "pages" = ceil(totalCards / 2)
//   const totalDots = Math.ceil(cards.length / 2);

//   return (
//     <section className="w-full py-16">
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
//         {/* LEFT SIDE */}
//         <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center text-black relative">
//           <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
//             Features
//           </h2>
//           <h3 className="text-xl font-semibold mb-4">
//             Powerful Features to Maximize Your Container Space
//           </h3>
//           <p className="text-lg text-black mb-6 max-w-md leading-relaxed">
//             From dynamic container dimensioning to instant 3D visualisations,
//             our cargo calculator simplifies your logistics planning.
//           </p>
//           <button className="px-6 py-3 rounded-lg font-medium text-lg border border-gray-300 hover:bg-gray-100 transition">
//             Explore More Feature →
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div
//           className="lg:col-span-3 relative w-full"
//           style={{ height: "494px", borderRadius: "17px" }}
//         >
//           <img
//             src={track}
//             alt="Containers"
//             className="w-full h-full object-cover rounded-lg"
//           />

//           {/* Floating Cards */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
//                           w-full max-w-[720px] overflow-hidden">
//             <div className="flex gap-4">
//               {visibleCards.map((card, i) => (
//                 <div
//                   key={card.id}
//                   className={`bg-white rounded-lg shadow-lg p-6 shrink-0 transition-all duration-300 ${
//                     i < 2
//                       ? "w-[320px] h-[200px]" // full width for 1st two cards
//                       : "w-[160px] h-[200px]" // half width for 3rd card
//                   }`}
//                 >
//                   <h3 className="text-lg font-bold mb-2">
//                     {card.id}. {card.title}
//                   </h3>
//                   <p className="text-sm text-gray-600">{card.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//             {Array.from({ length: totalDots }).map((_, dotIndex) => (
//               <button
//                 key={dotIndex}
//                 onClick={() => setActiveIndex(dotIndex * 2)} // move by 2
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   activeIndex / 2 === dotIndex
//                     ? "bg-blue-600"
//                     : "bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState } from "react";
import track from "./images/track.png";

const cards = [
  {
    id: 1,
    title: "Dynamic Container Sizing",
    description:
      "Customize container dimensions on the go — no fixed templates, no limitations.",
  },
  {
    id: 2,
    title: "Bulk Box Upload",
    description:
      "Add multiple boxes manually or upload a CSV with box names, dimensions, and quantities. Perfect for large-scale shipments.",
  },
  {
    id: 3,
    title: "3D Load Visualization",
    description:
      "Instantly visualize how boxes fit inside containers — box-by-box based on quantity or automatically filled to full capacity for optimal space usage.",
  },
  {
    id: 4,
    title: "Capacity Optimization",
    description:
      "See your container filled to the max with smart fitment. Reduce shipping costs by improving space efficiency.",
  },
  {
    id: 5,
    title: "Downloadable PDFs",
    description:
      "Generate shareable PDF reports with box layouts, quantities, and container fill stats — great for logistics and internal approvals.",
  },
  {
    id: 6,
    title: "Step-by-Step Video View",
    description:
      "Watch how boxes are placed inside the container with minimal steps — step-by-step visuals ideal for training or operational review.",
  },
];

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Show 3 full cards
  const visibleCards = cards.slice(activeIndex, activeIndex + 3);

  // Number of "pages" = ceil(totalCards / 3)
  const totalDots = Math.ceil(cards.length / 3);

  return (
    <section className="w-full py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center text-black relative">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Features
          </h2>
          <h3 className="text-xl font-semibold mb-4">
            Powerful Features to Maximize Your Container Space
          </h3>
          <p className="text-lg text-black mb-6 max-w-md leading-relaxed">
            From dynamic container dimensioning to instant 3D visualisations,
            our cargo calculator simplifies your logistics planning.
          </p>
          <button className="px-6 py-3 rounded-lg font-medium text-lg border border-gray-300 hover:bg-gray-100 transition">
            Explore More Feature →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="lg:col-span-3 relative w-full"
          style={{ height: "494px", borderRadius: "17px" }}
        >
          <img
            src={track}
            alt="Containers"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Floating Cards */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-full max-w-[900px] overflow-hidden">
            <div className="flex gap-6 justify-between pl-5">
              {visibleCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-lg p-6 w-[280px] h-[200px] shrink-0"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {card.id}. {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div> */}
{/* Floating Cards */}
{/* <div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-fit overflow-hidden"  // 👈 fit-content width
>
  <div className="flex pl-5">
    {visibleCards.map((card, i) => (
      <div
        key={card.id}
        className={`bg-white rounded-lg shadow-lg p-6 pr-0 shrink-0 transition-all duration-300 ${
          i < 2 ? "w-[300px] h-[200px] mr-4" : "w-[150px] h-[200px]"
        }`}
      >
        <h3 className="text-lg font-bold mb-2">
          {card.id}. {card.title}
        </h3>
        <p className="text-sm text-gray-600">{card.description}</p>
      </div>
    ))}
  </div>
</div> */}


{/* Floating Cards */}
<div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             w-fit overflow-hidden"
>
  <div className="flex pl-5 pr-0">  {/* 👈 left padding 20px, right padding 0 */}
    {visibleCards.map((card, i) => (
      <div
        key={card.id}
        className={`bg-white rounded-lg shadow-lg p-6 shrink-0 transition-all duration-300 ${
          i < 2
            ? "w-[340px] h-[220px] mr-4"  // 👈 bigger width for 1st 2 cards
            : "w-[170px] h-[220px]"       // 👈 3rd card = 50% of full card
        }`}
      >
        <h3 className="text-lg font-bold mb-2">
          {card.id}. {card.title}
        </h3>
        <p className="text-sm text-gray-600">{card.description}</p>
      </div>
    ))}
  </div>
</div>


{/* Floating Cards */}  



          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalDots }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setActiveIndex(dotIndex * 3)} // move by 3
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(activeIndex / 3) === dotIndex
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
