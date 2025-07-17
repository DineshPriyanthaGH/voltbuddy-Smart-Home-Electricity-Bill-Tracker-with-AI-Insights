import React from 'react'

export default function InsightModal({ tip, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{tip.title}</h3>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Problem:</span>
          <div className="text-gray-700">{tip.problem}</div>
        </div>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Strategy:</span>
          <div className="text-gray-700">{tip.tip}</div>
        </div>
        <div className="mb-3">
          <span className="font-medium text-gray-700">Controls:</span>
          <ul className="list-disc list-inside text-gray-700">
            {tip.controls && tip.controls.map((ctrl, idx) => (
              <li key={idx}>{ctrl}</li>
            ))}
          </ul>
        </div>
        <div>
          <a
            href={tip.learnMore}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            More Details
          </a>
        </div>
      </div>
    </div>
  )
}
