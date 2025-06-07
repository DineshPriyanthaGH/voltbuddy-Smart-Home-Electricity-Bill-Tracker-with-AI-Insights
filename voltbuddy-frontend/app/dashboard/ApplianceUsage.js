'use client';
import React, { useState, useEffect } from 'react';
import {
  RefrigeratorIcon,
  AirVentIcon,
  TvIcon,
  MicrowaveIcon,
  LightbulbIcon,
  PackageIcon,
} from 'lucide-react';

// Appliance Usage Component
export default function ApplianceUsage() {
  const [appliances, setAppliances] = useState([]);

  // Fetch recently added appliances from the backend (limit to 5)
  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/appliances', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Pass the JWT token
          },
        });

        const result = await response.json();
        if (response.ok) {
          // Get only the last 5 appliances from the result
          setAppliances(result.appliances.slice(-5));  // Show last 5 appliances
        } else {
          console.error('Error fetching appliances:', result.message);
        }
      } catch (error) {
        console.error('Error fetching appliances:', error);
      }
    };

    fetchAppliances();
  }, []); // Fetch appliances only when the component mounts

  // Calculate the width percentage for the usage bar
  const getWidthPercentage = (usage) => {
    const maxUsage = Math.max(...appliances.map((a) => a.usage)); // get max usage value
    return (usage / maxUsage) * 100;  // calculate width percentage
  };

  // Get appliance icon based on appliance name (or type)
  const getApplianceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'air-conditioner':
        return <AirVentIcon size={24} className="text-blue-500" />;
      case 'refrigerator':
        return <RefrigeratorIcon size={24} className="text-blue-500" />;
      case 'tv':
        return <TvIcon size={24} className="text-purple-500" />;
      case 'washing-machine':
        return <MicrowaveIcon size={24} className="text-orange-500" />;
      case 'light':
        return <LightbulbIcon size={24} className="text-yellow-500" />;
      default:
        return <PackageIcon size={24} className="text-gray-500" />;
    }
  };

  // Get the color class for the usage progress bar based on appliance type
  const getColorClass = (applianceName) => {
    switch (applianceName.toLowerCase()) {
      case 'air-conditioner':
        return 'bg-red-500';
      case 'refrigerator':
        return 'bg-blue-500';
      case 'tv':
        return 'bg-purple-500';
      case 'washing-machine':
        return 'bg-orange-500';
      case 'light':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          Recently Added Appliances
        </h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <a
            href="/appliance-management"
            className="text-sm text-blue-600 hover:text-blue-800 mt-2"
          >
            Add Appliance
          </a>
        </button>
      </div>

      <div className="space-y-4">
        {appliances.map((appliance) => (
          <div
            key={appliance._id}  // Use _id as the unique key
            className="bg-gray-50 rounded-lg p-4 border border-blue-300 border-r-3 hover:bg-blue-100 hover:border-blue-700 transition duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="mr-3">{getApplianceIcon(appliance.type)}</div>
              <div>
                <h3 className="font-medium text-gray-700">{appliance.name}</h3>
                <p className="text-xs text-gray-500">{appliance.powerRating} Watts</p>
              </div>
              <div className="ml-auto text-sm font-semibold text-gray-900">
                {appliance.monthlyUsage} kWh
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div
                className={`${getColorClass(
                  appliance.type
                )} h-1.5 rounded-full`}
                style={{ width: `${getWidthPercentage(appliance.monthlyUsage)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button
        href="/appliance-management"
        className="w-full mt-10 mb-2 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
      >
        <a href="/appliance-management" className="text-sm  mt-2">
          Manage Appliances
        </a>
      </button>
    </div>
  );
}
