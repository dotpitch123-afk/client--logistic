// import React,{useState,useEffect} from "react";

// const testimonials = [
//   {
//     id: 1,
//     text: "Box arrangements used to take a full day. Now it's done in minutes.",
//     name: "Alan. D",
//     title: "Supply Chain Head",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 2,
//     text: "Our packing is now faster and smarter. CalcCargo gives accurate box plans in seconds, and the animations help train new staff easily.",
//     name: "Raksha Patel",
//     title: "Warehouse Supervisor",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     id: 3,
//     text: "Clients love that we can promise and deliver on time moves without wasting space.",
//     name: "Anil Sen",
//     title: "Projects & Move Lead",
//     avatar: "https://randomuser.me/api/portraits/men/65.jpg",
//   },
//   {
//     id: 4,
//     text: "The ability to upload a CSV and see exactly how everything fits has saved us hours every week.",
//     name: "Raj Kumar",
//     title: "Logistics Manager",
//     avatar: "https://randomuser.me/api/portraits/men/22.jpg",
//   },
//   {
//     id: 5,
//     text: "Love the 3D view and PDF export. It's easy to share plans with other teams.",
//     name: "Meera Sharma",
//     title: "Warehouse Ex-Coordinator",
//     avatar: "https://randomuser.me/api/portraits/women/21.jpg",
//   },
//   {
//     id: 6,
//     text: "The 3D cargo view is a game-changer. I can visualize exactly how my containers will look before shipping.",
//     name: "David Liu",
//     title: "Export Manager",
//     avatar: "https://randomuser.me/api/portraits/men/56.jpg",
//   },
// ];

// const styleConfig = {
//   1: {
//     className: "rounded-[31px]",
//     style: { width: "320px", height: "200px" },
//     topAvatar: true,
//     starsTopRight: true,  
//   },
//   2: {
//     className: "rounded-b-[31px]",
//     style: { width: "278px", height: "341px" },
//     starsAfterText: true,
//   },
//   3: {
//     className: "rounded-b-[31px]",
//     style: { width: "240px", height: "238px" },
//   },
//   4: {
//     className: "rounded-b-[31px]",
//     style: { width: "277px", height: "320px" },
//     starsAfterText: true,
//   },
//   5: {
//     className: "rounded-b-[31px]",
//     style: { width: "277px", height: "238px" },
//   },
//   6: {
//     className: "rounded-[31px]",
//     style: { width: "320px", height: "282px" },
//     topAvatar: true,
//     starsTopRight: true,
//   },
// };

// const Stars = () => (
//   <div className="flex space-x-1">
//     {[...Array(5)].map((_, i) => (
//       <svg
//         key={i}
//         className="w-4 h-4 text-blue-500"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.963c.3.921-.755 1.688-1.54 1.118l-3.378-2.455a1 1 0 00-1.176 0l-3.377 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.05 9.39c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.963z" />
//       </svg>
//     ))}
//   </div>
// );

// // const TestimonialCard = ({ testimonial }) => {
// //   const config = styleConfig[testimonial.id] || {};
// //   const { className = "", style = {}, topAvatar, starsTopRight, starsAfterText } = config;

// //   return (
// //     <div
// //       className={`bg-white shadow-md p-6 relative flex flex-col ${className}`}
// //       style={style}
// //     >
// //       {topAvatar && (
// //         <img
// //           src={testimonial.avatar}
// //           className="w-14 h-14 rounded-full absolute -top-6 left-6 border-4 border-white shadow-md"
// //           alt={testimonial.name}
// //         />
// //       )}

// //       {!starsAfterText && (
// //         <div className={starsTopRight ? "flex justify-end mb-4" : "flex mb-4"}>
// //           <Stars />
// //         </div>
// //       )}

// //       <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
// //         {testimonial.text}
// //       </p>

// //       {starsAfterText && (
// //         <div className="flex justify-center mb-3">
// //           <Stars />
// //         </div>
// //       )}



// //       {!topAvatar ? (
// //   <div className="flex items-center bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px]">
// //     <img
// //       src={testimonial.avatar}
// //       className="w-12 h-12 rounded-full mr-4"
// //       alt={testimonial.name}
// //     />
// //     <div>
// //       <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
// //       <p className="text-gray-500 text-xs">{testimonial.title}</p>
// //     </div>
// //   </div>
// // ) : (
// //   <div className="bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px] text-center">
// //     <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
// //     <p className="text-gray-500 text-xs">{testimonial.title}</p>
// //   </div>
// // )}

// //     </div>
// //   );
// // };
// const TestimonialCard = ({ testimonial }) => {
//   const config = styleConfig[testimonial.id] || {};
//   const { className = "", style = {}, topAvatar, starsTopRight, starsAfterText } = config;

//   return (
//     <div
//       className={`bg-white shadow-md p-6 relative flex flex-col ${className}`}
//       style={style}
//     >
//       {/* 🔹 Blue line only for cards 2,3,4,5 */}
//       {[2, 3, 4, 5].includes(testimonial.id) && (
//         <div className="absolute top-0 left-0 w-12 h-1 bg-blue-500"></div>
//       )}

//       {topAvatar && (
//         <img
//           src={testimonial.avatar}
//           className="w-14 h-14 rounded-full absolute -top-6 left-6 border-4 border-white shadow-md"
//           alt={testimonial.name}
//         />
//       )}

//       {!starsAfterText && (
//         <div className={starsTopRight ? "flex justify-end mb-4" : "flex mb-4"}>
//           <Stars />
//         </div>
//       )}

//       <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
//         {testimonial.text}
//       </p>

//       {starsAfterText && (
//         <div className="flex justify-center mb-3">
//           <Stars />
//         </div>
//       )}

//       {!topAvatar ? (
//         <div className="flex items-center bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px]">
//           <img
//             src={testimonial.avatar}
//             className="w-12 h-12 rounded-full mr-4"
//             alt={testimonial.name}
//           />
//           <div>
//             <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
//             <p className="text-gray-500 text-xs">{testimonial.title}</p>
//           </div>
//         </div>
//       ) : (
//         <div className="bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px] text-center">
//           <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
//           <p className="text-gray-500 text-xs">{testimonial.title}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function TestimonialSection() {
//   return (
//     <div className="py-16 px-4 bg-white min-h-screen">
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-gray-900 mb-2">Testimonial</h2>
//         <p className="text-gray-600 text-lg">What our Users Say</p>
      
//       </div>

//       <div className="max-w-5xl mx-auto">
//         <div className="grid grid-cols-3 gap-0">

//           <div className="space-y-8 space-x-8">

//             <TestimonialCard testimonial={testimonials[0]} />
            
//             <TestimonialCard testimonial={testimonials[3]} />
            
//           </div>

//           <div className="space-y-8">
      
//             <div className="-mt-12">
//         <TestimonialCard testimonial={testimonials[1]} />
//       </div>
        
//             <TestimonialCard testimonial={testimonials[4]} />
            
//           </div>

//           <div className="space-y-10 space-x-8">

//                       <div className="-mt-6">
//             <TestimonialCard testimonial={testimonials[2]} />
//             </div>
//             <TestimonialCard testimonial={testimonials[5]} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const testimonials = [
  {
    id: 1,
    text: "Box arrangements used to take a full day. Now it's done in minutes.",
    name: "Alan. D",
    title: "Supply Chain Head",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    text: "Our packing is now faster and smarter. CalcCargo gives accurate box plans in seconds, and the animations help train new staff easily.",
    name: "Raksha Patel",
    title: "Warehouse Supervisor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    text: "Clients love that we can promise and deliver on time moves without wasting space.",
    name: "Anil Sen",
    title: "Projects & Move Lead",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    text: "The ability to upload a CSV and see exactly how everything fits has saved us hours every week.",
    name: "Raj Kumar",
    title: "Logistics Manager",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 5,
    text: "Love the 3D view and PDF export. It's easy to share plans with other teams.",
    name: "Meera Sharma",
    title: "Warehouse Ex-Coordinator",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 6,
    text: "The 3D cargo view is a game-changer. I can visualize exactly how my containers will look before shipping.",
    name: "David Liu",
    title: "Export Manager",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

const styleConfig = {
  1: {
    className: "rounded-[31px]",
    style: { width: "320px", height: "200px" },
    topAvatar: true,
    starsTopRight: true,
  },
  2: {
    className: "rounded-b-[31px]",
    style: { width: "278px", height: "341px" },
    starsAfterText: true,
  },
  3: {
    className: "rounded-b-[31px]",
    style: { width: "240px", height: "238px" },
  },
  4: {
    className: "rounded-b-[31px]",
    style: { width: "277px", height: "320px" },
    starsAfterText: true,
  },
  5: {
    className: "rounded-b-[31px]",
    style: { width: "277px", height: "238px" },
  },
  6: {
    className: "rounded-[31px]",
    style: { width: "320px", height: "282px" },
    topAvatar: true,
    starsTopRight: true,
  },
};

const Stars = () => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.963c.3.921-.755 1.688-1.54 1.118l-3.378-2.455a1 1 0 00-1.176 0l-3.377 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.05 9.39c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.963z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => {
  const config = styleConfig[testimonial.id] || {};
  const { className = "", style = {}, topAvatar, starsTopRight, starsAfterText } = config;

  return (
    <div
      className={`bg-white shadow-md p-6 relative flex flex-col ${className}`}
      style={style}
    >
      {/* 🔹 Blue line only for cards 2,3,4,5 */}
      {[2, 3, 4, 5].includes(testimonial.id) && (
        <div className="absolute top-0 left-0 w-12 h-1 bg-blue-500"></div>
      )}

      {topAvatar && (
        <img
          src={testimonial.avatar}
          className="w-14 h-14 rounded-full absolute -top-6 left-6 border-4 border-white shadow-md"
          alt={testimonial.name}
        />
      )}

      {!starsAfterText && (
        <div className={starsTopRight ? "flex justify-end mb-4" : "flex mb-4"}>
          <Stars />
        </div>
      )}

      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
        {testimonial.text}
      </p>

      {starsAfterText && (
        <div className="flex justify-center mb-3">
          <Stars />
        </div>
      )}

      {!topAvatar ? (
        <div className="flex items-center bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px]">
          <img
            src={testimonial.avatar}
            className="w-12 h-12 rounded-full mr-4"
            alt={testimonial.name}
          />
          <div>
            <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
            <p className="text-gray-500 text-xs">{testimonial.title}</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#EAEFFD] px-4 py-2 -mx-6 -mb-6 rounded-b-[31px] text-center">
          <p className="text-blue-600 font-bold text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.title}</p>
        </div>
      )}
    </div>
  );
};

export default function TestimonialSection() {
  return (
    <div className="py-16 px-4 bg-white min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Testimonial</h2>
        <p className="text-gray-600 text-lg">What our Users Say</p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* 🔹 Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="space-y-8 space-x-8">
            <TestimonialCard testimonial={testimonials[0]} />
            <TestimonialCard testimonial={testimonials[3]} />
          </div>

          <div className="space-y-8">
            <div className="-mt-12">
              <TestimonialCard testimonial={testimonials[1]} />
            </div>
            <TestimonialCard testimonial={testimonials[4]} />
          </div>

          <div className="space-y-10 space-x-8">
            <div className="-mt-6">
              <TestimonialCard testimonial={testimonials[2]} />
            </div>
            <TestimonialCard testimonial={testimonials[5]} />
          </div>

        </div>
      </div>
    </div>
  );
}
