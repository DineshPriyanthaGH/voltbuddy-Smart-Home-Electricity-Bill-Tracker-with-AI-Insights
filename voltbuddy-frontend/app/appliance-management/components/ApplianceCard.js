'use client';
import React, { useState } from 'react';
import {
  EditIcon,
  TrashIcon,
  ZapIcon,
  InfoIcon,
  RefrigeratorIcon,
  AirVentIcon,
  TvIcon,
  LightbulbIcon,
  MicrowaveIcon,
  PackageIcon,
} from 'lucide-react';
import { Tooltip } from './Tooltip';

export const ApplianceCard = ({ appliance, onEdit, onDelete }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getApplianceIcon = () => {
    switch (appliance.type) {
      case 'refrigerator':
        return <RefrigeratorIcon size={24} style={{color: '#2441E1'}} />;
      case 'air-conditioner':
        return <AirVentIcon size={24} style={{color: '#2441E1'}} />;
      case 'tv':
        return <TvIcon size={24} style={{color: '#2441E1'}} />;
      case 'washing-machine':
        return <div size={24} style={{color: '#2441E1'}} />; // No icon imported; consider adding one
      case 'microwave':
        return <MicrowaveIcon size={24} style={{color: '#2441E1'}} />;
      case 'light':
        return <LightbulbIcon size={24} className="text-yellow-400" />;
      default:
        return <PackageIcon size={24} style={{color: '#2441E1'}} />;
    }
  };

  const getEnergyTip = () => {
    switch (appliance.type) {
      case 'refrigerator':
        return 'Set your refrigerator to 37-40°F to optimize energy usage.';
      case 'air-conditioner':
        return 'Each degree below 78°F can increase energy consumption by 3-5%.';
      case 'tv':
        return 'LED TVs use up to 75% less energy than plasma TVs.';
      case 'washing-machine':
        return 'Washing clothes in cold water can save up to 90% of the energy used.';
      case 'microwave':
        return 'Microwaves use 70-80% less energy than conventional ovens.';
      case 'light':
        return 'LED bulbs use up to 80% less energy than traditional incandescent bulbs.';
      default:
        return 'Unplug devices when not in use to prevent phantom energy drain.';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group relative">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            {getApplianceIcon()}
          </div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
            {appliance.name}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(appliance)}
            className="p-2 rounded-2xl bg-blue-50 hover:bg-blue-100 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Edit appliance"
          >
            <EditIcon size={18} style={{color: '#2441E1'}} />
          </button>
          <button
            onClick={() => onDelete(appliance.id)}
            className="p-2 rounded-2xl bg-red-50 hover:bg-red-100 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Delete appliance"
          >
            <TrashIcon size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Monthly Usage */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <ZapIcon size={16} className="text-green-600" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">Monthly Usage</span>
          </div>
          <span className="text-sm font-bold text-green-700">{appliance.monthlyUsage} kWh</span>
        </div>

        {/* Power Rating */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100">
              <ZapIcon size={16} className="text-yellow-600" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">Power Rating</span>
          </div>
          <span className="text-sm font-bold text-yellow-700">{appliance.powerRating} W</span>
        </div>

        {/* Used Hours Per Day */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <ZapIcon size={16} style={{color: '#2441E1'}} />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">Daily Usage</span>
          </div>
          <span className="text-sm font-bold" style={{color: '#2441E1'}}>{appliance.usedHoursPerDay} hrs</span>
        </div>
      </div>

      <div className="mt-6 relative">
        <button
          className="flex items-center w-full p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <div className="p-1 rounded-full bg-indigo-100 mr-3">
            <InfoIcon size={14} style={{color: '#2441E1'}} />
          </div>
          <span className="text-sm font-medium" style={{color: '#2441E1'}}>
            Energy saving tip
          </span>
        </button>
        {showTooltip && <Tooltip text={getEnergyTip()} />}
      </div>
    </div>
  );
};

export default ApplianceCard;
