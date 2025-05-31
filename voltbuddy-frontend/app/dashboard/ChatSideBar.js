import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatSidebar({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Ask me about your electricity bills, taxes, and more.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send user message and get reply from backend
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setLoading(true);
    // Add user message immediately
    setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5001/api/chat/gemini', { message: trimmedInput });
      const botReply = res.data.reply || 'Sorry, I could not get an answer.';
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error contacting chatbot service.' }]);
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

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">VoltBuddy Chatbot</h2>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
        >
          &times;
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs rounded-lg p-2 whitespace-pre-wrap ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-300 text-gray-900 self-start'
            }`}
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
          placeholder={loading ? 'Waiting for response...' : 'Type your question...'}
          disabled={loading}
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className={`mt-2 w-full py-2 rounded text-white ${
            loading || !input.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </footer>
    </div>
  );
}
