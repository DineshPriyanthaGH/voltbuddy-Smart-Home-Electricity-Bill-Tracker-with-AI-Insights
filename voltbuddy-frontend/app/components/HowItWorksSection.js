import React from 'react'
import { UserPlusIcon, Calculator, BrainCircuitIcon } from 'lucide-react'

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UserPlusIcon className="h-10 w-10" />,
      title: 'Sign Up',
      description: 'Create your VoltBuddy account with email registration for quick and secure setup.',
    },
    {
      icon: <Calculator className="h-10 w-10" />,
      title: 'Enter Meter Readings',
      description: 'Manually input your electricity meter readings for accurate bill calculation without hardware dependency.',
    },
    {
      icon: <BrainCircuitIcon className="h-10 w-10" />,
      title: 'Get AI Insights',
      description: 'Receive personalized AI-powered insights and predictions to optimize your electricity usage and reduce costs.',
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-6">
            Getting Started with VoltBuddy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start tracking and predicting your electricity bills with our simple three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/60 transition-all duration-500 border border-white/50 group-hover:scale-105">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-2xl mb-6 inline-block">
                  <div className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to take control of your electricity costs?</p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}
