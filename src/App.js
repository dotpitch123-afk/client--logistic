
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CargoCalcHeader from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import ShippingLandingPage from "./ShippingLandingPage";
import Features from "./Feature";
import ContainerCalculator from "./Works";
import ContactSection from "./Contact";
import Faqs from "./Faqs";
import ProductPage from "./Product";
import TestimonialSection from "./Review";
import PricingSection from "./Pricing";
import FeaturesSection from "./Features";
import HeroSection from "./Dark";
import NewsletterSubscription from "./Footer";
import REviewSection from "./Afterreview";
import ContainerPackingPlatform from "./Track";

const PageLayout = () => {
  const location = useLocation();

  const showHeaderAndLanding = location.pathname === '/'; 

  return (
    <>
    
      {showHeaderAndLanding && (
        <>
         <CargoCalcHeader />
          <ShippingLandingPage />
      <div id="features">
        <FeaturesSection />
      </div>
      <HeroSection />
      <div id="industry">
        <ProductPage />
      </div>
      <ContainerCalculator />
      <div id="pricing">
        <PricingSection />
      </div>
      <TestimonialSection />
      <REviewSection />
      <Faqs />
      <div id="contact">
        <ContactSection />
      </div>
      <NewsletterSubscription />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <PageLayout />
      <Routes>
        <Route path="/track" element={<ContainerPackingPlatform />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
