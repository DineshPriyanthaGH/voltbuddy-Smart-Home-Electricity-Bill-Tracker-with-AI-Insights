'use client';
import React, { useState, useEffect } from 'react';
import { PlusIcon, SaveIcon, XIcon } from 'lucide-react';

export const ApplianceForm = ({ onSubmit, editingAppliance, onCancel }) => {
  const [name, setName] = useState('');
  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [powerRating, setPowerRating] = useState('');
  const [type, setType] = useState('other');

  // If editing an appliance, pre-fill the form with existing appliance data
  useEffect(() => {
    if (editingAppliance) {
      setName(editingAppliance.name);
      setMonthlyUsage(editingAppliance.monthlyUsage.toString());
      setPowerRating(editingAppliance.powerRating.toString());
      setType(editingAppliance.type);
    }
  }, [editingAppliance]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create appliance data
    const applianceData = {
      name,
      monthlyUsage: parseFloat(monthlyUsage),
      powerRating: parseFloat(powerRating),
      type,
    };

    // If editing, update the appliance; otherwise, add a new one
    if (editingAppliance) {
      onSubmit({ ...applianceData, id: editingAppliance.id });
    } else {
      onSubmit(applianceData);
    }

    // Reset form if adding a new appliance
    if (!editingAppliance) {
      setName('');
      setMonthlyUsage('');
      setPowerRating('');
      setType('other');
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Monthly Usage */}
          <div className="mb-4">
            <label htmlFor="monthlyUsage" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Monthly Usage (kWh)
            </label>
            <input
              id="monthlyUsage"
              type="number"
              value={monthlyUsage}
              onChange={(e) => setMonthlyUsage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        </div>

        {/* Submit/Cancel Buttons */}
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
