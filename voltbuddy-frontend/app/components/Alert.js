import React from 'react';

export default function Alert({ type = "info", icon, children, onClose }) {
  const alertColors = {
    warning: "bg-amber-50 border-amber-200 text-amber-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`flex items-center p-4 mb-4 border-l-4 rounded-md ${alertColors[type]}`}>
      {icon && <div className="mr-3">{icon}</div>}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="ml-auto text-gray-400 hover:text-gray-900"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
