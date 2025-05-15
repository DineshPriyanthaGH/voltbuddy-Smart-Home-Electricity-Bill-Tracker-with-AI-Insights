// components/Tooltip.js
import React from 'react';

export const Tooltip = ({ text }) => {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-60 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-lg z-10">
      {text}
      <div className="absolute top-full left-4 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  );
};
