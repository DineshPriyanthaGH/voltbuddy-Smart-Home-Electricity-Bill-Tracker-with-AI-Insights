import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatSidebar({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Ask me about your electricity bills, taxes, and more.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send user message and get Gemini API response
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Call backend endpoint that calls Gemini API
      const res = await axios.post('/api/chat/gemini', { message: input.trim() });
      const botReply = res.data.reply || 'Sorry, I could not get an answer.';

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting chatbot service.' }]);
    }
  };

  // Send message on Enter key
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Electricity Chatbot</h2>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs rounded-lg p-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-gray-900 self-start'}`}
            style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t">
        <textarea
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
