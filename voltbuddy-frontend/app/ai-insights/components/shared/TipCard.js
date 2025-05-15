import React from 'react'
export function TipCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
        Learn More
        <svg
          className="w-4 h-4 ml-1"
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
export default TipCard