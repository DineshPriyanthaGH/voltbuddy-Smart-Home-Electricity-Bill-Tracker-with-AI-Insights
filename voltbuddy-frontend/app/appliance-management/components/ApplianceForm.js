'use client';
import React, { useState, useEffect } from 'react';
import { PlusIcon, SaveIcon, XIcon, InfoIcon } from 'lucide-react';

// Default watts per appliance type and their info descriptions
const defaultWattsByType = {
  refrigerator: 150,
  'air-conditioner': 1200,
  tv: 100,
  'washing-machine': 500,
  microwave: 1100,
  light: 15,
  other: 100,
};

const defaultWattsInfo = {
  refrigerator: 'Typical refrigerator consumes about 150 Watts.',
  'air-conditioner': 'Typical air conditioner consumes about 1200 Watts.',
  tv: 'Typical TV consumes about 100 Watts.',
  'washing-machine': 'Typical washing machine consumes about 500 Watts.',
  microwave: 'Typical microwave consumes about 1100 Watts.',
  light: 'Typical LED bulb consumes about 15 Watts.',
  other: 'Typical appliance consumes about 100 Watts.',
};

export const ApplianceForm = ({ onSubmit, editingAppliance, onCancel }) => {
  const [name, setName] = useState('');
  const [usedHoursPerDay, setUsedHoursPerDay] = useState('');
  const [powerRating, setPowerRating] = useState('');
  const [type, setType] = useState('other');
  const [showPowerInfo, setShowPowerInfo] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (editingAppliance) {
      setName(editingAppliance.name);
      setUsedHoursPerDay(editingAppliance.usedHoursPerDay.toString());
      setPowerRating(editingAppliance.powerRating.toString());
      setType(editingAppliance.type);
    } else {
      // reset form if not editing
      setName('');
      setUsedHoursPerDay('');
      setType('other');
      setPowerRating(defaultWattsByType['other']);
    }
  }, [editingAppliance]);

  // When type changes, update power rating default if user hasn't manually edited powerRating
  useEffect(() => {
    if (!editingAppliance) {
      setPowerRating(defaultWattsByType[type] || defaultWattsByType['other']);
    }
  }, [type, editingAppliance]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usedHours = parseFloat(usedHoursPerDay);
    const watts = parseFloat(powerRating);

    if (isNaN(usedHours) || isNaN(watts) || usedHours < 0 || watts < 0) {
      alert('Please enter valid positive numbers for used hours and power rating.');
      return;
    }

    // Calculate estimated monthly usage (kWh)
    const monthlyUsage = ((watts * usedHours * 30) / 1000).toFixed(2);

    const applianceData = {
      name,
      usedHoursPerDay: usedHours,
      powerRating: watts,
      type,
      monthlyUsage: parseFloat(monthlyUsage),
    };

    if (editingAppliance) {
      onSubmit({ ...applianceData, id: editingAppliance.id });
    } else {
      onSubmit(applianceData);
      // Reset form for next add
      setName('');
      setUsedHoursPerDay('');
      setPowerRating(defaultWattsByType['other']);
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

          {/* Power Rating with Info Icon and Tooltip */}
          <div className="mb-4 relative">
            <label
              htmlFor="powerRating"
              className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              Power Rating (Watts)
              <InfoIcon
                size={16}
                className="ml-2 text-gray-500 text-blue-500 cursor-pointer"
                tabIndex={0}
                aria-describedby="powerRatingInfo"
                onMouseEnter={() => setShowPowerInfo(true)}
                onMouseLeave={() => setShowPowerInfo(false)}
                onFocus={() => setShowPowerInfo(true)}
                onBlur={() => setShowPowerInfo(false)}
              />
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
            {showPowerInfo && (
              <div
                id="powerRatingInfo"
                role="tooltip"
                className="absolute bg-gray-100 text-gray-700 p-2 rounded shadow-md text-sm mt-1 max-w-xs z-10"
                style={{ top: '100%', left: 0 }}
              >
                {defaultWattsInfo[type]}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
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
