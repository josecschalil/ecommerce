"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturesSection from "./components/label";
import NewArrivals from "./components/new-arrival";
import ProductShowcase from "./components/featured";
import CategorySelector from "./components/category";
import ClientHappiness from "./components/review";
import OfferDisplay from "./components/offer";
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Next generation Virtual reality",
      subtitle: "DISCOUNT UPTO 75%, HURRY UP!",
      description:
        "VR is the most quick access to notifications, calls, messages, apps right on your wrist, reducing the constantly check.",
      image: "🥽", // VR headset emoji as placeholder
      bgText: "VR 01",
    },
    {
      title: "Nice Gaming Experience",
      subtitle: "NEW ARRIVAL - LIMITED EDITION",
      description:
        "Experience gaming like never before with our premium VR headsets featuring ultra-high resolution displays and spatial audio.",
      image: "🎮",
      bgText: "VR 02",
    },
    {
      title: "Professional VR Solutions",
      subtitle: "ENTERPRISE GRADE - 50% OFF",
      description:
        "Built for professionals who demand the highest quality virtual reality experience for training, design, and collaboration.",
      image: "💼",
      bgText: "VR 03",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="= min-h-screen bg-gradient-to-br from-[#000000] via-[#223943] to-[#000000] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden ">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2a1f1c] rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#363a3f] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content - Text */}
            <div className="space-y-8 lg:pr-8">
              {/* Discount Badge */}
              <div className="inline-flex items-center px-2 mb-1">
                <span className="text-[#b4976c] text-md font-semibold tracking-wider uppercase">
                  {slides[currentSlide].subtitle}
                </span>
              </div>

              <div className="mt-3">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-none mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 leading-tight bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="px-5 py-3 bg-white hover:from-blue-700 hover:to-purple-700 text-black font-semibold rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  Buy Now
                </button>
                <button className="px-6 py-3 border-2 border-slate-600 hover:border-slate-400 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/50 backdrop-blur-sm">
                  View More
                </button>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="md:block hidden relative z-10 flex items-center justify-center">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl scale-150 animate-pulse"></div>

                {/* Product Image Placeholder */}
                <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center border border-slate-600/50 backdrop-blur-sm transform rotate-12 hover:rotate-6 transition-transform duration-700 hover:scale-105">
                  <div className="text-8xl md:text-9xl transform -rotate-12">
                    {slides[currentSlide].image}
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            <button
              onClick={prevSlide}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-full text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-full text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <NewArrivals />
      <ProductShowcase />
      <CategorySelector />
      <OfferDisplay />
      <ClientHappiness />
    </>
  );
};

export default Home;
