import React from 'react';

export default function ChatbotIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chatbot"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      title="Open VoltBuddy Assistant"
    >
      {/* Animated pulse rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-75"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse opacity-50"></div>
      
      {/* Chat icon */}
      <div className="relative">
        <svg
          className="w-7 h-7 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 16c0 1-1 1-1 1H5.5l-3.5-4 3.5-4H20s1 0 1 1v6z"
          />
        </svg>
        
        {/* Typing dots animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with AI Assistant
        <div className="absolute top-full right-3 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
}
