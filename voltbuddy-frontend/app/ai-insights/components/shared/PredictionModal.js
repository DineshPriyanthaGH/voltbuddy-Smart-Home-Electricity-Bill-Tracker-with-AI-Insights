import React from 'react'

export default function PredictionModal({ data, insights, onClose }) {
  const totalCurrent = data.reduce((s, d) => s + (d.current || 0), 0)
  const totalPred = data.reduce((s, d) => s + (d.predicted || 0), 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full relative">
        <button
          className="absolute top-2 right-2 text-black hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Predicted Consumption (12 Months)</h3>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left px-2 py-1 text-xs text-gray-500">Month</th>
                <th className="text-left px-2 py-1 text-xs text-gray-500">Current</th>
                <th className="text-left px-2 py-1 text-xs text-black">Predicted</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td className="text-black px-2 py-1">{row.month}</td>
                  <td className="text-black px-2 py-1">{row.current ?? '-'}</td>
                  <td className="text-black px-2 py-1">{row.predicted ?? '-'}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-2 py-1 text-black font-medium">Total</td>
                <td className="px-2 py-1 font-medium">{totalCurrent}</td>
                <td className="px-2 py-1 font-medium">{totalPred}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-black mb-2">Full AI Insights & Recommendations</h4>
          {insights && insights.map((ins, i) => (
            <div key={i} className="mb-2">
              <span className="text-black font-semibold">{ins.title}: </span>
              <span className="text-black">{ins.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
