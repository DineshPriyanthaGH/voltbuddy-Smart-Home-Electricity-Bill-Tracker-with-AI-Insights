'use client';
import React, { useState, useEffect } from 'react';
import { PlusIcon, SaveIcon, XIcon, InfoIcon } from 'lucide-react';

const defaultWattsByType = {
  refrigerator: 150,
  'air-conditioner': 1200,
  tv: 100,
  'washing-machine': 500,
  microwave: 1100,
  light: 15,
  other: 100,
};

export const ApplianceForm = ({ onSubmit, editingAppliance, onCancel }) => {
  const [name, setName] = useState('');
  const [usedHoursPerDay, setUsedHoursPerDay] = useState('');
  const [powerRating, setPowerRating] = useState('');
  const [type, setType] = useState('refrigerator');
  const [showPowerInfo, setShowPowerInfo] = useState(false);

  useEffect(() => {
    if (editingAppliance) {
      setName(editingAppliance.name);
      setUsedHoursPerDay(editingAppliance.usedHoursPerDay.toString());
      setPowerRating(editingAppliance.powerRating.toString());
      setType(editingAppliance.type);
    } else {
      setName('');
      setUsedHoursPerDay('');
      setType('refrigerator');
      setPowerRating('');
    }
  }, [editingAppliance]);

  useEffect(() => {
    if (!editingAppliance) {
      setPowerRating(defaultWattsByType[type] || defaultWattsByType['refrigerator']);
    }
  }, [type, editingAppliance]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usedHours = parseFloat(usedHoursPerDay);
    const watts = parseFloat(powerRating);

    // Ensure all fields are valid before sending to the backend
    if (isNaN(usedHours) || isNaN(watts) || usedHours < 0 || watts < 0 || !name || !type) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Calculate monthly usage (in kWh)
    const monthlyUsage = ((watts * usedHours * 30) / 1000).toFixed(2);  // Assuming 30 days in a month

    const applianceData = {
      name,
      usedHoursPerDay: usedHours,
      powerRating: watts,
      type,
      monthlyUsage: parseFloat(monthlyUsage),  // Add monthlyUsage for backend
    };

    console.log('Appliance data to send:', applianceData);  // Log the data being sent

    if (editingAppliance) {
      await updateAppliance(editingAppliance._id, applianceData);  // Use _id for backend consistency
    } else {
      await addAppliance(applianceData);  // Add new appliance
    }
  };

  const addAppliance = async (applianceData) => {
    try {
      console.log('Sending appliance data to backend:', applianceData);  // Log the data before sending

      const response = await fetch('http://localhost:5001/api/appliances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Ensure the token is passed correctly
        },
        body: JSON.stringify(applianceData),
      });

      const result = await response.json();  // Parse the backend response
      console.log('Backend response:', result);  // Log the backend response

      if (response.ok) {
        onSubmit(result.appliances);  // Assuming appliances are returned in the response
      } else {
        console.error('Error adding appliance:', result);  // Log the error returned by the backend
        alert(result.message || 'Error adding appliance');
      }
    } catch (error) {
      console.error('Error adding appliance:', error);  // Log unexpected errors
      alert('Error adding appliance');
    }
  };

  const updateAppliance = async (id, applianceData) => {
    try {
      const response = await fetch(`/api/appliances/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Ensure the token is passed correctly
        },
        body: JSON.stringify(applianceData),
      });

      const result = await response.json();
      if (response.ok) {
        onSubmit(result.appliances);  // Pass the updated appliances list to the parent component
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error updating appliance:', error);
      alert('Error updating appliance');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        {editingAppliance ? 'Edit Appliance' : 'Add New Appliance'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Appliance Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Appliance Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Appliance Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Appliance Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="refrigerator">Refrigerator</option>
              <option value="air-conditioner">Air Conditioner</option>
              <option value="tv">TV</option>
              <option value="washing-machine">Washing Machine</option>
              <option value="microwave">Microwave</option>
              <option value="light">Light</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Used Hours Per Day */}
          <div className="mb-4">
            <label htmlFor="usedHoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
              Used Hours Per Day
            </label>
            <input
              id="usedHoursPerDay"
              type="number"
              value={usedHoursPerDay}
              onChange={(e) => setUsedHoursPerDay(e.target.value)}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.1"
            />
          </div>

          {/* Power Rating */}
          <div className="mb-4">
            <label htmlFor="powerRating" className="block text-sm font-medium text-gray-700 mb-1">
              Power Rating (Watts)
            </label>
            <input
              id="powerRating"
              type="number"
              value={powerRating}
              onChange={(e) => setPowerRating(e.target.value)}
              className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4 space-x-2">
          {editingAppliance && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <XIcon size={18} className="mr-1" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white flex items-center ${
              editingAppliance ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingAppliance ? (
              <>
                <SaveIcon size={18} className="mr-1" />
                Update Appliance
              </>
            ) : (
              <>
                <PlusIcon size={18} className="mr-1" />
                Add Appliance
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplianceForm;
