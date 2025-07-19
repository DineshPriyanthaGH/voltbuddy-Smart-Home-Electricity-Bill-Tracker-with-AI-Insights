import React from 'react'
import { Calculator, Brain, Home, Bell, BarChart3, MessageCircle } from 'lucide-react'

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: 'Manual Bill Calculation',
      description: 'Enter meter readings and get accurate bill calculations based on Sri Lankan tariff structures without hardware dependency.',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Insights',
      description: 'Get personalized cost-saving tips and bill predictions using Google Gemini AI technology.',
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: 'Appliance Management',
      description: 'Track household appliances and their energy consumption to understand usage patterns.',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Usage Analytics',
      description: 'Visualize your consumption patterns with detailed charts and historical data analysis.',
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'AI Chatbot Support',
      description: 'Ask questions about billing, tariffs, and get instant answers from our Gemini-powered chatbot.',
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Smart Notifications',
      description: 'Receive email alerts for bill reminders, usage anomalies, and cost-saving opportunities.',
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 py-16 md:py-24 relative overflow-hidden" id="FeaturesSection">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
              Key Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-6">
            Powerful Tools for Smart Energy Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            VoltBuddy offers comprehensive features to help Sri Lankan households understand, track, and reduce their electricity costs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/60 transition-all duration-500 border border-white/50 hover:scale-105"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                  <div className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                    {feature.icon}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-indigo-600/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Energy Management?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of Sri Lankan households who are already saving money with VoltBuddy's intelligent energy tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Start Tracking Now
            </button>
            <button className="bg-white/70 backdrop-blur-sm text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-white hover:shadow-lg shadow-blue-100/50 transition-all duration-300 border border-blue-200/50">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
