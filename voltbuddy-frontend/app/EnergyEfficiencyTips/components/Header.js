import React from 'react'
import { ArrowLeftIcon, BatteryIcon } from 'lucide-react'
export const Header = () => {
  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center">
            <BatteryIcon className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-semibold text-lg text-gray-900">
              VoltBuddy
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
// export default Header