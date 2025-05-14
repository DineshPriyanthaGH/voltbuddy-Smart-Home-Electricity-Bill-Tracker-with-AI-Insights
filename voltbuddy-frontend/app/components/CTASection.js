import React from 'react'
export const CTASection = () => {
  return (
    <div className="w-full bg-blue-600 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Saving on Your Electricity Bills?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already reducing their energy costs
          with Ceylon Power Tracker.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg px-8 py-3 shadow-lg transition-all">
            Get Started Now
          </button>
          <button className="border border-white text-white hover:bg-blue-700 font-medium rounded-lg px-8 py-3 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}