// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronRight } from 'lucide-react';

// const FAQSection = () => {
//   const [selectedQuestion, setSelectedQuestion] = useState(1); // Second question selected by default
//   const [answerPosition, setAnswerPosition] = useState(0);
//   const questionRefs = useRef({});
//   const containerRef = useRef(null);

//   const faqData = [
//     {
//       id: 0,
//       question: "Can I upload multiple boxes at once?",
//       answer: "Yes, you can upload multiple boxes simultaneously using our batch upload feature. Simply select all the boxes you want to upload and drag them into the upload area for processing."
//     },
//     {
//       id: 1,
//       question: "Can I visualise how boxes are arranged?",
//       answer: "Absolutely. Our 3D engine shows how each box fits step-by-step or as a complete view."
//     },
//     {
//       id: 2,
//       question: "Can I download a summary or report?",
//       answer: "Yes, you can generate and download detailed reports including packing efficiency, box arrangements, and optimization suggestions in multiple formats including PDF and Excel."
//     },
//     {
//       id: 3,
//       question: "Is there a limit to how many boxes I can add?",
//       answer: "There's no strict limit on the number of boxes. However, for optimal performance, we recommend processing up to 1000 boxes at a time for the best user experience."
//     },
//     {
//       id: 4,
//       question: "Can I share the visual with my team?",
//       answer: "Certainly! You can share visualizations with your team members through secure links, export images, or collaborate in real-time using our team workspace features."
//     }
//   ];

//   useEffect(() => {
//   const updateAnswerPosition = () => {
//     const questionElement = questionRefs.current[selectedQuestion];
//     const containerElement = containerRef.current;

//     if (questionElement && containerElement) {
//       const containerRect = containerElement.getBoundingClientRect();
//       const questionRect = questionElement.getBoundingClientRect();

//       // ✅ Position answer card 20px ABOVE the selected question
//       const relativeTop = questionRect.top - containerRect.top - 20;
//       setAnswerPosition(relativeTop);
//     }
//   };

//   updateAnswerPosition();
//   window.addEventListener('resize', updateAnswerPosition);
//   return () => window.removeEventListener('resize', updateAnswerPosition);
// }, [selectedQuestion]);

//   const handleQuestionClick = (questionId) => {
//     setSelectedQuestion(questionId);
//   };

//   return (
//     <div className="min-h-screen bg-white py-12 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-16 text-center">
//           Frequently asked Questions
//         </h1>
        
//         <div ref={containerRef} className="relative flex">
          
//           <div className="w-1/2 pr-8">
//             {faqData.map((item) => (
//               <div
//   key={item.id}
//   ref={el => questionRefs.current[item.id] = el}
//   onClick={() => handleQuestionClick(item.id)}
//   className={`
//     z-20 relative
//     flex items-center justify-between p-4 rounded-md cursor-pointer 
//     transition-all duration-300 ease-in-out hover:shadow-md group
//     ${selectedQuestion === item.id 
//       ? 'bg-blue-100 border-2 border-blue-200 shadow-lg' 
//       : 'bg-white border border-gray-200 hover:bg-blue-50'
//     }
//   `}


//   style={{
        
//         height: 62,
//         opacity: 1,
//         paddingTop: 24,
//         paddingRight: 16,
//         paddingBottom: 24,
//         paddingLeft: 16,
      
//         transform: 'rotate(0deg)'
//       }}
// >

//                 <div className="flex items-center space-x-4">
//                   <div className={`
//                     w-3 h-3 rounded-full transition-colors duration-300
//                     ${selectedQuestion === item.id ? 'bg-blue-600' : 'bg-blue-300'}
//                   `} />
//                   <span className={`
//                     text-sm transition-all duration-300
//                     ${selectedQuestion === item.id 
//                       ? 'font-bold text-gray-900' 
//                       : 'font-medium text-gray-700'
//                     }
//                   `}>
//                     {item.question}
//                   </span>
//                 </div>
//                 <ChevronRight 
//                   className={`
//                     w-5 h-5 transition-all duration-300
//                     ${selectedQuestion === item.id 
//                       ? 'text-blue-600 transform rotate-90' 
//                       : 'text-gray-400 group-hover:text-blue-500'
//                     }
//                   `} 
//                 />
//               </div>
//             ))}
//           </div>

//           <div 
//             className="absolute left-1/2 -ml-20  transition-all duration-500 ease-out z-10"
//             style={{ top: `${answerPosition}px`,   width: '592.48px',  }}
//           >
//             <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 pl-16 shadow-lg">
//               <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
//                 {faqData[selectedQuestion]?.question}
//               </h3>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 {faqData[selectedQuestion]?.answer}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQSection;









// // Create a responsive feature section UI layout using React and Tailwind CSS.

// // **Layout Overview:**
// // - Split the section into two columns:
// //   - **Left column:** Feature heading, description text, and a button
// //   - **Right column:** Full-width background image with feature cards overlaid on top

// // **Right Column Behavior:**
// // - On top of the image, add two floating feature cards side by side (slightly spaced)
// // - Below the cards, add pagination dots (indicating 3 sets of cards total)
// // - On clicking a dot, the card content slides (carousel-like)
// // - For each dot:
// //   - Show two cards:
// //     - One card with **100% width**
// //     - One card with **70% width**, slightly smaller and offset to the side
// //   - On next dot, swap the sizes (the second becomes 100%, the first becomes 70%)
// // - Cards should have:
// //   - White background
// //   - Rounded corners
// //   - Drop shadow
// //   - Responsive padding and spacing
// // - Card content should include:
// //   - Number (e.g. "1", "2", "3")
// //   - Bold title
// //   - Smaller paragraph description

// // **General Design Requirements:**
// // - Smooth card transitions using Tailwind animation utilities
// // - Button in left column with a subtle gradient or border
// // - Section should look clean, minimal, and professional

// // Use Tailwind CSS for all styling. Use React state to manage the active dot and card transitions.



import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const FAQSection = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [answerPosition, setAnswerPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const questionRefs = useRef({});
  const containerRef = useRef(null);

  const faqData = [
    {
      id: 0,
      question: "Can I upload multiple boxes at once?",
      answer: "Yes, you can upload multiple boxes simultaneously using our batch upload feature..."
    },
    {
      id: 1,
      question: "Can I visualise how boxes are arranged?",
      answer: "Absolutely. Our 3D engine shows how each box fits step-by-step or as a complete view."
    },
    {
      id: 2,
      question: "Can I download a summary or report?",
      answer: "Yes, you can generate and download detailed reports including packing efficiency..."
    },
    {
      id: 3,
      question: "Is there a limit to how many boxes I can add?",
      answer: "There's no strict limit on the number of boxes. However, for optimal performance..."
    },
    {
      id: 4,
      question: "Can I share the visual with my team?",
      answer: "Certainly! You can share visualizations with your team members through secure links..."
    }
  ];

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateAnswerPosition = () => {
      const questionElement = questionRefs.current[selectedQuestion];
      const containerElement = containerRef.current;

      if (questionElement && containerElement) {
        const containerRect = containerElement.getBoundingClientRect();
        const questionRect = questionElement.getBoundingClientRect();
        const relativeTop = questionRect.top - containerRect.top - 20;
        setAnswerPosition(relativeTop);
      }
    };

    updateAnswerPosition();
    window.addEventListener('resize', updateAnswerPosition);
    return () => window.removeEventListener('resize', updateAnswerPosition);
  }, [selectedQuestion, isMobile]);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-16 text-center">
         
          Frequently asked Questions
        </h1>

        <div
          ref={containerRef}
          className={`relative ${isMobile ? 'flex flex-col' : 'flex'} gap-6`}
        >
         
          <div className={`${isMobile ? 'w-full' : 'w-1/2 pr-8'}`}>
            {faqData.map((item) => (
              <div
                key={item.id}
                ref={el => (questionRefs.current[item.id] = el)}
                onClick={() => handleQuestionClick(item.id)}
                className={`
                  z-20 relative
                  flex items-center justify-between p-4 rounded-md cursor-pointer 
                  transition-all duration-300 ease-in-out hover:shadow-md group
                  ${selectedQuestion === item.id
                    ? 'bg-blue-100 border-2 border-blue-200 shadow-lg'
                    : 'bg-white border border-gray-200 hover:bg-blue-50'}
                `}
                style={{
                  height: 62,
                  paddingTop: 24,
                  paddingBottom: 24,
                  paddingLeft: 16,
                  paddingRight: 16
                }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      selectedQuestion === item.id
                        ? 'bg-blue-600'
                        : 'bg-blue-300'
                    }`}
                  />
                  <span
                    className={`text-sm transition-all duration-300 ${
                      selectedQuestion === item.id
                        ? 'font-bold text-gray-900'
                        : 'font-medium text-gray-700'
                    }`}
                  >
                    {item.question}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-all duration-300 ${
                    selectedQuestion === item.id
                      ? 'text-blue-600 transform rotate-90'
                      : 'text-gray-400 group-hover:text-blue-500'
                  }`}
                />
              </div>
            ))}

            {/* On mobile: render answer below question list */}
            {isMobile && (
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
                  {faqData[selectedQuestion]?.question}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faqData[selectedQuestion]?.answer}
                </p>
              </div>
            )}
          </div>

          {/* Desktop-only floating answer box */}
          {!isMobile && (
            <div
              className="absolute left-1/2 -ml-20 transition-all duration-500 ease-out z-10"
              style={{ top: `${answerPosition}px`, width: '592.48px' }}
            >
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 pl-16 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
                  {faqData[selectedQuestion]?.question}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faqData[selectedQuestion]?.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
