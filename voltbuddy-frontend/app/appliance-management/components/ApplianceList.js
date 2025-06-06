'use client';
import React, { useState, useEffect } from 'react';
import { ApplianceCard } from './ApplianceCard';

export const ApplianceList = ({ onEdit, onDelete }) => {
  const [appliances, setAppliances] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch appliances from the backend on component mount
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/appliances', {
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
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!appliances.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No appliances added yet. Add your first appliance above!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Appliances</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliances.map((appliance) => (
          <ApplianceCard
            key={appliance._id} // Ensure the appliance _id is used as the unique key
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
