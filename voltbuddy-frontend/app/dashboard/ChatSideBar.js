import React, { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../../utils/api';

export default function ChatSidebar({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  // Predefined quick messages for comprehensive energy and tax queries
  const quickMessages = [
    "Which appliance is costing me the most?",
    "How much will my bill be this month?",
    "Explain Sri Lankan electricity tax structure",
    "How can I reduce my highest energy costs?",
    "Show me my bill history trends",
    "What are the domestic tariff blocks?",
    "How do peak hours affect my bill?",
    "What government energy programs are available?"
  ];

  // Scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle quick message selection
  const handleQuickMessage = (message) => {
    setShowWelcome(false);
    setInput(message);
    sendMessageWithText(message);
  };

  // Start conversation with comprehensive greeting
  const startChat = () => {
    setShowWelcome(false);
    setMessages([
      { sender: 'bot', text: 'Hello! I\'m your VoltBuddy AI Assistant with complete access to your energy profile, appliances, bills, notifications, and Sri Lankan electricity tariff information. Ask me anything about your data or electricity policies!' }
    ]);
  };

  // Send user message and get reply from backend
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;
    sendMessageWithText(trimmedInput);
  };

  const sendMessageWithText = async (messageText) => {
    setLoading(true);
    setShowWelcome(false);
    
    // Add user message immediately
    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    setInput('');

    try {
      // Use the data-aware chatbot endpoint
      const res = await chatAPI.askQuestion(messageText);
      const botReply = res.data.response || 'Sorry, I could not get an answer.';
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Error contacting chatbot service.';
      if (error.response?.status === 401) {
        errorMessage = 'Please log in to access your personalized energy data.';
      } else if (error.response?.status === 404) {
        errorMessage = 'User data not found. Please make sure you have some appliances registered.';
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format bot messages with modern styling
  const formatBotMessage = (text) => {
    // Convert markdown-style formatting to HTML
    let formattedText = text
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points
      .replace(/^• (.*$)/gim, '<div class="flex items-start mb-2"><span class="text-blue-600 mr-2">•</span><span>$1</span></div>')
      // Convert emojis and headers
      .replace(/^([🏠💡📊💰⚡🔧])\s*\*\*(.*?)\*\*/gim, '<div class="mb-3 mt-3"><span class="text-2xl mr-2">$1</span><strong class="text-lg text-gray-800">$2</strong></div>')
      // Add line breaks for better formatting
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    
    return formattedText;
  };

  return (
    <div className="fixed top-20 right-0 w-96 h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl z-40 flex flex-col animate-slide-in-right border-l border-white/20 backdrop-blur-xl"
         style={{ maxHeight: 'calc(100vh - 5rem)' }}>
      {/* Header */}
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-bl-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">VoltBuddy AI</h2>
              <p className="text-blue-100 text-sm">Your Smart Energy Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Animated wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 animate-pulse"></div>
      </header>

      {/* Chat Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {showWelcome ? (
          /* Welcome Screen */
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Welcome to VoltBuddy AI!</h3>
              <p className="text-gray-600 leading-relaxed">
                I'm your modern AI assistant with professional formatting and complete data access:
              </p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Modern **bold formatting** with bullet points</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">🏠 Emoji-organized structured responses</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Complete energy data + Sri Lankan tariff expertise</span>
              </div>
            </div>

            <div className="space-y-3 w-full">
              <p className="text-sm font-medium text-gray-700">Quick Start:</p>
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickMessage(msg)}
                  className="w-full p-3 text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-md text-sm text-gray-700 hover:text-gray-800"
                >
                  💡 {msg}
                </button>
              ))}
            </div>

            <button
              onClick={startChat}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Chatting 🚀
            </button>
          </div>
        ) : (
          /* Chat Messages */
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-appear`}
              >
                <div
                  className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.text) }}
                    />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Footer - only show when not on welcome screen */}
      {!showWelcome && (
        <footer className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <textarea
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={loading ? 'AI is thinking...' : 'Ask me anything about your energy usage...'}
              disabled={loading}
              className="flex-1 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`px-4 py-3 rounded-xl transition-all duration-200 ${
                loading || !input.trim() 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105'
              } text-white font-medium`}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </footer>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-message-appear {
          animation: message-appear 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
