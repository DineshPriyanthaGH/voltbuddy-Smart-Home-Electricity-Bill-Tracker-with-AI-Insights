"use client";

import React from "react";
export const HeroSection = () => {
  return (
    <div
      className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24"
      id="home"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold">VoltBuddy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Track Your Bills, Save with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Efficiently manage your bills, track consumption patterns, and
              receive AI-driven insights to reduce electricity costs.
            </p>
            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 shadow-lg transition-all">
                Get Started
              </button>
              <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium px-6 py-3 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-[600px] lg:w-[700px] flex items-center justify-center">
            {/* Main 3D Character Image */}
            <img
              src="/images/homeimage.png"
              alt="Smart home electricity management"
              className="w-[300px] md:w-[300px] lg:w-[300px] z-10 relative "
            />

            {/* Logo positioned behind or beside */}
            <img
              src="/images/logo.png"
              alt="VoltBuddy Logo"
              className="absolute -top-6 right-10 md:-top-14 md:right-16 md:left-40 w-240 h-240 md:w-100 md:h-100 opacity-90 z-0"
            />
          </div>
        </div>
      </div>
    </div>
  
  );
};
