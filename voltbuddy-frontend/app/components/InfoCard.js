import React from 'react';

export default function InfoCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      {title && <h3 className="font-medium text-gray-700 mb-2">{title}</h3>}
      {children}
    </div>
  );
}
