
import React, { useState } from "react";
import NewsletterSubscription from "./Footer";
import manish from "./images/manivisul.gif";
import manishbox from "./box.GIF";
import manishcontainer from "./trackbox.gif";
import videoimage from "./images/videoimage.png";
import ero from "./images/ero.png";
import product from "./images/product.png";
import animation from "./images/animation.mp4";
import GradientInput from "./GradientInput";
import { useNavigate } from "react-router-dom"; 

export default function ContainerCalculator() {
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "Food Box",
    length: "500",
    width: "700",
    height: "300",
    weight: "20",
    quantity: "80",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    console.log("Calculating with data:", formData);

    navigate('/track');
  };

  return (
    <>
      <div className="App my-10 ">
        <img
          src={videoimage}
          alt="Custom"
          className="w-full h-[621px] relative left-[-2px] rotate-[0deg] opacity-100 "
        />
      </div>
      <div className="min-h-screen bg-white py-6 font-inter">
        <div className="">
          <div className="text-center mb-12 px-10">
            <h1
              className="text-[50px] font-[600] text-center text-[#000000] "
              style={{
                fontFamily: "Outfit, sans-serif",
                lineHeight: "50px",
                letterSpacing: "0%",
                marginBottom: "8px",
              }}
            >
              How It Works
            </h1>

            <p
              className="text-[22px] font-[600] text-center  text-[#000000]"
              style={{
                fontFamily: "Outfit, sans-serif",
                lineHeight: "32px",
                letterSpacing: "0%",
              }}
            >
              Our interface makes it easy for everyone no technical knowledge
              required.
            </p>
          </div>

          <div className="px-32 mb-16">
            <div className="flex flex-col items-center space-y-6">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[240px] object-cover rounded-lg"
              >
                <source src={animation} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="grid md:grid-cols-3 gap-12 w-full max-w-6xl">
                <div className="text-center">
                  <h3
                    className="text-[24px] font-[700] text-center text-[#3A3B7B] mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                    }}
                  >
                    Define Your Container
                  </h3>
                  <p
                    className="text-[15px] font-[500] text-center"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "20px",
                      letterSpacing: "0%",
                      color: "#878787",
                    }}
                  >
                    Set container dimensions manually or select from presets.
                  </p>
                </div>

                <div className="text-center">
                  <h3
                    className="text-[24px] font-[700] text-center text-[#3A3B7B] mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                    }}
                  >
                    Add Your Boxes
                  </h3>
                  <p
                    className="text-[15px] font-[500] text-center"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "20px",
                      letterSpacing: "0%",
                      color: "#878787",
                    }}
                  >
                    Input box details or upload a CSV—we support any number of
                    boxes.
                  </p>
                </div>

                <div className="text-center">
                  <h3
                    className="text-[24px] font-[700] text-center text-[#3A3B7B] mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                    }}
                  >
                    Visualize & Optimize
                  </h3>
                  <p
                    className="text-[15px] font-[500] text-center"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "20px",
                      letterSpacing: "0%",
                      color: "#878787",
                    }}
                  >
                    Watch the boxes fill your container in 3D, download the PDF,
                    or view the loading animation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-purple-100 to-blue-100 h-[326px] p-auto flex justify-center items-center"
            style={{
              backgroundImage: `url(${product})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
          <div className="p-10 h-auto">
  <div className="flex items-start mb-8 flex-wrap">


    <div className="flex flex-col items-center" style={{ marginRight: '56px' }}>
      <div
        className="w-[185px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97" ,marginBottom:"30px" }}
      >
        Product Name
      </div>
      <GradientInput
        placeholder="Enter product name"
        value={formData.productName}
        onChange={(e) => handleInputChange("productName", e.target.value)}
        style={{ width: "185px" }}
      />
    </div>


    <div className="flex flex-col items-center" style={{ marginRight: '25px' }}>
      <div
        className="w-[145px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97" ,marginBottom:"30px"}}
      >
        Length
      </div>
      <div className="relative">
        <GradientInput
          placeholder="Enter length"
          value={formData.length}
          onChange={(e) => handleInputChange("length", e.target.value)}
          style={{ width: "145px" }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]  text-sm font-medium">mm</span>
      </div>
    </div>

    {/* Width */}
    <div className="flex flex-col items-center" style={{ marginRight: '25px' }}>
      <div
        className="w-[145px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97",marginBottom:"30px" }}
      >
        Width
      </div>
      <div className="relative">
        <GradientInput
          placeholder="Enter width"
          value={formData.width}
          onChange={(e) => handleInputChange("width", e.target.value)}
          style={{ width: "145px" }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] text-sm font-medium">mm</span>
      </div>
    </div>


    <div className="flex flex-col items-center" style={{ marginRight: '25px' }}>
      <div
        className="w-[145px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97",marginBottom:"30px" }}
      >
        Height
      </div>
      <div className="relative">
        <GradientInput
          placeholder="Enter height"
          value={formData.height}
          onChange={(e) => handleInputChange("height", e.target.value)}
          style={{ width: "145px" }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]  text-sm font-medium">mm</span>
      </div>
    </div>


    <div className="flex flex-col items-center" style={{ marginRight: '25px' }}>
      <div
        className="w-[145px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97",marginBottom:"30px" }}
      >
        Weight
      </div>
      <div className="relative">
        <GradientInput
          placeholder="Enter weight"
          value={formData.weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
          style={{ width: "145px", }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] text-sm font-medium">kg</span>
      </div>
    </div>

    {/* Quantity (no margin right on last one) */}
    <div className="flex flex-col items-center">
      <div
        className="w-[145px] h-[50px] rounded-[7px] font-inter font-medium text-[16px] text-white text-center flex items-center justify-center mb-2"
        style={{ background: "#5B5F97" ,marginBottom:"30px"}}
      >
        Quantity
      </div>
      <div className="relative">
        <GradientInput
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={(e) => handleInputChange("quantity", e.target.value)}
          type="number"
          style={{ width: "145px", borderRadius: "7px" }}
        />
      </div>
    </div>
  </div>

  {/* Calculate Button */}
  <div className="text-center mt-6">
    <button
      onClick={handleCalculate}
      className="text-white text-[15px] font-bold px-6 py-2.5 rounded-md shadow-md font-poppins flex items-center justify-center mx-auto transition-transform duration-200 hover:scale-105"
      style={{
        background: "linear-gradient(90deg, #484AE6 0%, #2960EA 49.52%, #DAACB9 100%)",
      }}
    >
      Lets Calculate 
      <span className="transform transition-transform duration-300 group-hover:translate-x-1 ml-2">
        <img src={ero} alt="arrow" className="w-[30px] h-auto" />
      </span>
    </button>
  </div>
</div>

          </div>

        
        </div>
      </div>
    </>
  );
}
