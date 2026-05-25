import React, { useState } from 'react';
import NewsletterSubscription from './Footer';
import manish from './images/manivisul.gif'
import manishbox from './box.GIF'
import manishcontainer from './trackbox.gif'
import product from './images/product.png'
import animation from './images/animation.mp4'
import one  from './images/one.mp4'
import two from './images/two.mp4'
import three from './images/three.mp4'
export default function ContainerCalculator() {
  const [formData, setFormData] = useState({
    productName: 'Food Box',
    length: '500',
    width: '700',
    height: '300',
    weight: '20',
    quantity: '80'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    console.log('Calculating with data:', formData);
   
  };

  return (
    <>

    
    <div className="min-h-screen bg-{#fff} py-12 ">
      <div className=" ">
      
        <div className="text-center mb-32 px-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-lg "  style={{color: "#1B2128"}}>
            Our interface makes it easy for everyone no technical knowledge required.
          </p>
        </div>

<div className="px-32 mb-16">

 <div className="grid md:grid-cols-3  mb-8">
 
</div>

<div className="px-4 md:px-32 mb-16 relative flex items-center justify-between">

  <div className="-translate-x-10 flex flex-col items-center">
    <video
      src={one}
      autoPlay
      loop
      muted
      className="w-48 h-48 md:w-60 md:h-60 object-contain rounded-lg shadow-lg"
    />
  </div>

  {/* Animated Line */}
  <div className="absolute top-1/2 left-0 right-0 mx-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 rounded-full animate-slide"></div>

  {/* Second Video */}
  <div className="flex flex-col items-center">
    <video
      src={two}
      autoPlay
      loop
      muted
      className="w-48 h-48 md:w-60 md:h-60 object-contain rounded-lg shadow-lg"
    />
  </div>

  {/* Third Video */}
  <div className="translate-x-10 flex flex-col items-center">
    <video
      src={three}
      autoPlay
      loop
      muted
      className="w-48 h-48 md:w-60 md:h-60 object-contain rounded-lg shadow-lg"
    />
  </div>
</div>

  <div className="grid md:grid-cols-3 gap-12">
    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Define Your Container
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Set container dimensions manually or select from presets
      </p>
    </div>

    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Add Your Boxes
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Input box details or upload a CSV we support any number of boxes.
      </p>
    </div>

    <div className="text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Visualize & Optimize
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Watch the boxes fill your container in 3D, download the PDF, or view
        the loading animation.
      </p>
    </div>
  </div>
</div>
<div className=" bg-gradient-to-br from-purple-100 to-blue-100  h-[326px] p-auto flex justify-center items-center  "    style={{
    backgroundImage: `url(${product})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }} >
      
        <div className=" p-10 px-24  h-[258px] justify-center"    >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            
          
            <div className="col-span-2 md:col-span-1">
              <div className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2" style={{background: '#5B5F97'}}>
                Product Name
              </div>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
 <div className="col-span-2 md:col-span-1">
              <div className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2" style={{background: '#5B5F97'}}>
              Length
              </div>
              
              <div className="relative flex-1">
  <input
    type="text"
    value={formData.length}
    onChange={(e) => handleInputChange("length", e.target.value)}
    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder="Enter length"
  />
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
    m
  </span>
</div>
</div>

      
         
<div className="col-span-2 md:col-span-1">
  <div
    className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2"
    style={{ background: "#5B5F97" }}
  >
    Width
  </div>
  <div className="relative flex-1">
    <input
      type="text"
      value={formData.width}
      onChange={(e) => handleInputChange("width", e.target.value)}
      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      placeholder="Enter width"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
      m
    </span>
  </div>
</div>

           
<div className="col-span-2 md:col-span-1">
  <div
    className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2"
    style={{ background: "#5B5F97" }}
  >
    Height
  </div>
  <div className="relative flex-1">
    <input
      type="text"
      value={formData.height}
      onChange={(e) => handleInputChange("height", e.target.value)}
      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      placeholder="Enter height"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
      m
    </span>
  </div>
</div>

           
<div className="col-span-2 md:col-span-1">
  <div
    className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2"
    style={{ background: "#5B5F97" }}

  >
    Weight
  </div>
  <div className="relative flex-1">
    <input
      type="text"
      value={formData.weight}
      onChange={(e) => handleInputChange("weight", e.target.value)}
      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      placeholder="Enter weight"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
      kg
    </span>
  </div>
</div>

      
            <div className="col-span-2 md:col-span-1">
              <div className="text-white px-4 py-3 rounded-lg text-center font-medium mb-2" style={{background: '#5B5F97'}}>
                Qty
              </div>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-2.5 rounded-md shadow-md transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto text-sm"
            >
              Let's Calculate
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
     
    </div>

  

      </div>
    </div>

    </>
  ); 
}