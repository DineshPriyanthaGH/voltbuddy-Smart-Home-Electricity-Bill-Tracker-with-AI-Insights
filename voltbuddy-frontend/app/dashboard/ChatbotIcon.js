import React from 'react';

export default function ChatbotIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chatbot"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        width: '40px',
        height: '40px',
      }}
      title="Open Chatbot"
    >
      <img
        src="./public/assets/handshake.gif"  // path to your gif, adjust if needed
        alt="Handshake animation"
        style={{ width: '100%', height: '100%' }}
      />
    </button>
  );
}
