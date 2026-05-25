import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

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
      answer:
        "Yes, you can upload multiple boxes simultaneously using our batch upload feature...",
    },
    {
      id: 1,
      question: "Can I visualise how boxes are arranged?",
      answer:
        "Absolutely. Our 3D engine shows how each box fits step-by-step or as a complete view.",
    },
    {
      id: 2,
      question: "Can I download a summary or report?",
      answer:
        "Yes, you can generate and download detailed reports including packing efficiency...",
    },
    {
      id: 3,
      question: "Is there a limit to how many boxes I can add?",
      answer:
        "There's no strict limit on the number of boxes. However, for optimal performance...",
    },
    {
      id: 4,
      question: "Can I share the visual with my team?",
      answer:
        "Certainly! You can share visualizations with your team members through secure links...",
    },
  ];

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    window.addEventListener("resize", updateAnswerPosition);
    return () => window.removeEventListener("resize", updateAnswerPosition);
  }, [selectedQuestion, isMobile]);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
  };

  return (
    <div className=" bg-white py-12 px-6 font-inter font-medium">
      <div className="max-w-7xl mx-auto">
       
<h1
  className="font-outfit font-semibold text-[60px] leading-[24px] text-black text-center align-middle mb-24"
>
  Frequently Asked Questions
</h1>

        <div
          ref={containerRef}
          className={`relative ${isMobile ? "flex flex-col" : "flex"} gap-6`}
        >
          <div className={`${isMobile ? "w-full" : "w-1/2 pr-8"}`}>
            {faqData.map((item) => {
              return (

                <div
                  key={item.id}
                  ref={(el) => (questionRefs.current[item.id] = el)}
                  onClick={() => handleQuestionClick(item.id)}
                  className={`
    z-20 relative
    flex items-center justify-between rounded-md cursor-pointer 
    transition-all duration-300 ease-in-out group
    ${selectedQuestion === item.id
                      ? "border-2 border-blue-200 shadow-lg bg-[#FAFBFF]"
                      : "border border-gray-200 bg-white hover:bg-[#FAFBFF]"}
  `}
                  style={{
                    height: 62,
                    paddingTop: 24,
                    paddingBottom: 24,
                    paddingLeft: 16,
                    paddingRight: 16,
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-6 h-6 rounded-full transition-all duration-300"
                      style={{
                        background: selectedQuestion === item.id
                          ? "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)"
                          : "linear-gradient(90deg, rgba(72, 74, 230, 0.4) 0%, rgba(41, 96, 234, 0.4) 49.52%, rgba(218, 172, 185, 0.4) 100%)",
                      }}
                       />

                    <span
                      className={`transition-all duration-300 font-inter text-[16px] leading-[24px] ${selectedQuestion === item.id
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-700"}`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-300 ${selectedQuestion === item.id
                        ? "text-blue-600 transform rotate-90"
                        : "text-gray-400 group-hover:text-blue-500"}`} />
                </div>

              );
            })}

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

          {!isMobile && (
            <div
              className="absolute left-1/2 -ml-20 transition-all duration-500 ease-out z-10"
              style={{ top: `${answerPosition}px`, width: "592.48px" }}
            >
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 pl-16 shadow-lg">
                {/* <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
                  {faqData[selectedQuestion]?.question}
                </h3> */}

                <h3
  className="
    font-inter font-semibold text-[18px] leading-[28px] 
    text-[#18191F] mb-3
  "
>
  {faqData[selectedQuestion]?.question}
</h3>

               
                  <p
  className="
    font-inter font-normal text-[16px] leading-[24px] 
    text-black
  "
>
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
