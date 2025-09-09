'use client';
import React, { useState, useEffect } from 'react';
import { ApplianceCard } from './ApplianceCard';
import { API_BASE_URL } from '../../../config/api';

export const ApplianceList = ({ onEdit, onDelete }) => {
  const [appliances, setAppliances] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch appliances from the backend on component mount
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/appliances`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Ensure the token is passed correctly
          },
        });

        const result = await response.json();
        if (response.ok) {
          setAppliances(result.appliances); // Update appliances state
          setErrorMessage(''); // Clear any previous error messages
        } else {
          setErrorMessage(result.message || 'Failed to fetch appliances');
        }
      } catch (error) {
        console.error('Error fetching appliances:', error);
        setErrorMessage('Error fetching appliances');
      }
    };

    fetchAppliances();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (errorMessage) {
    return (
      <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 shadow-2xl text-center">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <p className="text-red-700 font-medium text-lg">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!appliances.length) {
    return (
      <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 shadow-2xl text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Appliances Yet</h3>
            <p className="text-blue-700 font-medium">Add your first appliance above to start tracking energy usage!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 rounded-2xl shadow-lg" 
             style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-transparent" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          Your Appliances
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appliances.map((appliance) => (
          <ApplianceCard
            key={appliance._id}
            appliance={appliance}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplianceList;
