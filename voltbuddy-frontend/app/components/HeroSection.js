'use client'

import React from 'react'
export const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24">
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
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1592833159057-6facceb4d3be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Smart home electricity management"
              className="rounded-xl shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
