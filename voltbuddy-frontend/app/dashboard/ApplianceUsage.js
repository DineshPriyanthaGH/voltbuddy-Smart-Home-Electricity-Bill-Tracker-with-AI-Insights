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

  // Get gradient class for modern progress bars
  const getGradientClass = (applianceName) => {
    switch (applianceName.toLowerCase()) {
      case 'air-conditioner':
        return 'from-red-400 to-red-600';
      case 'refrigerator':
        return 'from-blue-400 to-blue-600';
      case 'tv':
        return 'from-purple-400 to-purple-600';
      case 'washing-machine':
        return 'from-orange-400 to-orange-600';
      case 'light':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-blue-50/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-transparent" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          Recently Added Appliances
        </h2>
        <button className="group flex items-center px-4 py-2 rounded-xl text-sm font-medium
                          text-white shadow-lg hover:shadow-xl transform transition-all duration-300 
                          hover:scale-105" 
                style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)',
                        ':hover': {background: 'linear-gradient(to right, #1e3a8a, #2563eb)'}}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300"
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
          <a href="/appliance-management" className="text-white">
            Add Appliance
          </a>
        </button>
      </div>

      <div className="space-y-6">
        {appliances.map((appliance) => (
          <div
            key={appliance._id}
            className="group relative bg-gradient-to-r from-white/90 to-blue-50/80 
                       backdrop-blur-sm rounded-2xl p-6 border border-white/30 
                       shadow-lg hover:shadow-2xl transform transition-all duration-300 
                       hover:scale-[1.02] hover:from-white hover:to-indigo-50/80 
                       before:absolute before:inset-0 before:rounded-2xl 
                       before:bg-gradient-to-r before:from-transparent before:to-indigo-50/20 
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 
                               shadow-lg group-hover:shadow-xl transition-all duration-300 
                               group-hover:scale-110">{getApplianceIcon(appliance.type)}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 
                                transition-colors duration-300">{appliance.name}</h3>
                  <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 
                              rounded-full inline-block mt-1">{appliance.powerRating} Watts</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                               bg-clip-text text-transparent">{appliance.monthlyUsage}</div>
                <div className="text-sm font-medium text-gray-500">kWh/month</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 
                             shadow-inner overflow-hidden">
                <div
                  className={`h-3 rounded-full shadow-lg transition-all duration-500 ease-out
                            bg-gradient-to-r ${getGradientClass(appliance.type)}`}
                  style={{ width: `${getWidthPercentage(appliance.monthlyUsage)}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between items-center text-xs font-medium text-gray-600">
                <span>Usage Level</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {getWidthPercentage(appliance.monthlyUsage)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="group w-full mt-8 relative overflow-hidden">
        <a 
          href="/appliance-management" 
          className="block w-full py-4 px-6 rounded-2xl text-lg font-bold text-white
                    shadow-lg hover:shadow-2xl transform transition-all duration-300 
                    hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 
                    before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                    before:translate-x-[-100%] hover:before:translate-x-[100%] 
                    before:transition-transform before:duration-700"
          style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
        >
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Manage All Appliances</span>
          </span>
        </a>
      </button>
    </div>
  );
}
