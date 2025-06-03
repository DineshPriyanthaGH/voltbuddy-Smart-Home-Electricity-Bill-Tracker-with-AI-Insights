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
        return <RefrigeratorIcon size={24} className="text-blue-500" />;
      case 'air-conditioner':
        return <AirVentIcon size={24} className="text-blue-500" />;
      case 'tv':
        return <TvIcon size={24} className="text-blue-500" />;
      case 'washing-machine':
        return <div size={24} className="text-blue-500" />; // No icon imported; consider adding one
      case 'microwave':
        return <MicrowaveIcon size={24} className="text-blue-500" />;
      case 'light':
        return <LightbulbIcon size={24} className="text-blue-500" />;
      default:
        return <PackageIcon size={24} className="text-blue-500" />;
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
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {getApplianceIcon()}
          <h3 className="text-lg font-medium ml-2">{appliance.name}</h3>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(appliance)}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Edit appliance"
          >
            <EditIcon size={18} className="text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(appliance.id)}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Delete appliance"
          >
            <TrashIcon size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {/* Monthly Usage */}
        <div className="flex items-center text-gray-600">
          <ZapIcon size={16} className="mr-2 text-green-500" />
          <span className="text-sm">{appliance.monthlyUsage} kWh/month</span>
        </div>

        {/* Power Rating */}
        <div className="flex items-center text-gray-600">
          <ZapIcon size={16} className="mr-2 text-yellow-500" />
          <span className="text-sm">{appliance.powerRating} Watts</span>
        </div>

        {/* Used Hours Per Day */}
        <div className="flex items-center text-gray-600">
          <ZapIcon size={16} className="mr-2 text-blue-500" />
          <span className="text-sm">{appliance.usedHoursPerDay} hours/day</span>
        </div>
      </div>

      <div className="mt-3 relative">
        <button
          className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <InfoIcon size={14} className="mr-1" />
          Energy saving tip
        </button>
        {showTooltip && <Tooltip text={getEnergyTip()} />}
      </div>
    </div>
  );
};

export default ApplianceCard;
