import React from 'react'

export function TipCard({ icon, title, description, learnMore }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group">
      <div className="flex items-start mb-4">
        <div className="p-2 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>
        <h3 className="ml-4 text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed text-sm">{description}</p>
      {learnMore && (
        <a
          href={learnMore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
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
        </a>
      )}
    </div>
  )
}
export default TipCard
