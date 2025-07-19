import React, { useState } from 'react';
import { Bot, MessageCircle, Sparkles, Lightbulb } from 'lucide-react';

export default function ChatbotIcon({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Open VoltBuddy AI Assistant"
      className="fixed bottom-6 right-6 z-40 group"
      title="Chat with VoltBuddy AI Assistant"
    >
      {/* Main Button Container */}
      <div className="relative">
        {/* Animated Background Rings */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse opacity-20"></div>
        <div className="absolute inset-1 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-ping opacity-30"></div>
        
        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transform transition-all duration-300 hover:scale-110 flex items-center justify-center">
          
          {/* AI Brain Icon with Animation */}
          <div className="relative">
            {isHovered ? (
              <Sparkles className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Bot className="w-8 h-8 text-white group-hover:animate-bounce" />
            )}
            
            {/* Big Yellow Lightbulb Icon */}
           
            
            {/* Small Yellow Lightbulb Icon */}
         
          </div>

          {/* Active Status Indicator */}
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
          
          {/* Notification Badge */}
           <div className="absolute -top-2 -right-2">
              <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg animate-pulse">
                <Lightbulb className="w-5 h-5 text-yellow-900" fill="currentColor" />
              </div>
            </div>
        </div>

        {/* Interactive Tooltip */}
        <div className={`absolute bottom-full right-0 mb-4 transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-xl text-gray-800 px-4 py-3 rounded-2xl shadow-xl border border-white/20 whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">VoltBuddy AI Assistant</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Click to get instant help!</p>
            
            {/* Tooltip Arrow */}
            <div className="absolute top-full right-6 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/95"></div>
          </div>
        </div>

        {/* Floating Action Hints */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Energy Wave Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-indigo-400/20 animate-pulse"></div>
        </div>
      </div>

      {/* Professional Branding Strip */}
      <div className={`absolute bottom-full right-2 mb-2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
       
      </div>
    </button>
  );
}
