"use client";

import React from "react";

export const HeroSection = () => {
  return (
    <div
      className="w-full py-20 md:py-28 relative overflow-hidden"
      id="home"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-8">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg shadow-blue-100/50">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                VoltBuddy AI
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text">
                Track Your Bills,
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Save with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              Efficiently manage your bills, track consumption patterns, and
              receive <span className="font-semibold text-blue-600">AI-driven insights</span> to reduce electricity costs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="/Authentication"
                className="group bg-gradient-to-r from-yellow-300 to-yellow-300 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold cursor-pointer rounded-2xl px-8 py-4 shadow-xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white/70 backdrop-blur-sm hover:bg-white cursor-pointer text-blue-600 hover:text-blue-700 font-bold rounded-2xl px-8 py-4 shadow-lg shadow-blue-100/50 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h10a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v5a2 2 0 002 2z" />
                  </svg>
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">Energy</div>
                <div className="text-sm text-gray-600 font-medium"> Tips</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">AI</div>
                <div className="text-sm text-gray-600 font-medium">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center">
            {/* Floating Cards Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-10 left-10 bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl shadow-blue-100/50 transform rotate-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-10 right-10 bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl shadow-blue-100/50 transform -rotate-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative z-10">
              <img
                src="/images/homeimage.png"
                alt="Smart home electricity management"
                className="w-[320px] md:w-[380px] lg:w-[420px] drop-shadow-2xl"
              />
            </div>

            {/* Logo positioned behind */}
            <img
              src="/images/logo.png"
              alt="VoltBuddy Logo"
              className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-20 z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
