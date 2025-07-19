import React from 'react'
import { CheckCircleIcon } from 'lucide-react'

export function StrategyCard({ icon, title, description, tips, onLearnMore }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>
        <h3 className="ml-4 text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <ul className="mb-6 space-y-3">
        {tips && tips.map((tip, index) => (
          <li key={index} className="flex items-start group/item">
            <div className="p-1 rounded-full mr-3 mt-1 shadow-sm" 
                 style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
              <CheckCircleIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-700 text-sm leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
              {tip}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="inline-flex items-center px-6 py-3 rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
        onClick={onLearnMore}
      >
        Learn More
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}
export default StrategyCard
