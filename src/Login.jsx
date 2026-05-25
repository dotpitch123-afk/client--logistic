import React from "react";
import  logo from './images/justgo.png'
import  search from './images/search.png'
import  loginimage from './images/Screenshot.png'
function Login() {
  return (
    <div className="flex     ">
   
      <div className="hidden md:block  w-[683px]">
        <img 
          src={loginimage}
          alt="Login Visual"
          className="w-full h-full object-container"
        />
      </div>


      <div className="w-full md:w-1/2 flex items-center justify-center bg-white"
      >
        <div className="w-full max-w-md p-8 ">
   <div
  className="absolute top-8 right-16"
>
      <img
  src={logo}
  alt="Logo"
  className="object-contain"
  style={{
    width: '120px',
    height: '30px',
    transform: 'rotate(0deg)',
    opacity: 1
  }}
/>

    </div>
<div
  className="border rounded-xl shadow-sm p-8  font-inter"
>
  <h2 className="text-2xl font-bold text-center mb-2 font">Hello Again!</h2>
  <p className="text-gray-500 text-center mb-6">Welcome Back</p>

  <form className="space-y-4">



    
<div className="relative">
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
   <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
  />
</svg>

  </div>
  <input
    type="email"
    placeholder="Email Address"
    className="w-full pl-10 pr-4 py-3 border rounded-md bg-white focus:outline-none focus:ring-2"
  />
</div>

<div className="relative mt-4">
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-6a4 4 0 00-4 4v2h8V9a4 4 0 00-4-4zm-6 8a6 6 0 0112 0v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z"
      />
    </svg>
  </div>
  <input
    type="password"
    placeholder="Password"
    className="w-full pl-10 pr-4 py-3 border rounded-md bg-white focus:outline-none focus:ring-2"
  />
</div>
    <button
      type="submit"
      className="w-full text-white px-4 py-2 rounded-md transition shadow-sm"
      style={{
        background: "#333333",
      }}
    >
      Login
    </button>
  </form>

  <div className="mt-6  text-center">
    <a href="#" className="text-sm text-blue-600 hover:underline ">
      Forgot Password?
    </a>
  </div>

  <button className="mt-8  w-full flex items-center bg-white  justify-center border rounded-md py-2 hover:bg-gray-50 transition">
    <img
      src={search}
      alt="Google"
      className="w-5 h-5 mr-2"
    />
    Sign In with Google
  </button>

  <p className="mt-8 text-center text-sm text-gray-600">
    Don’t have an account?{" "}
    <a href="/register" className="text-blue-600 hover:underline">
      Signup Now.
    </a>
  </p>
</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
