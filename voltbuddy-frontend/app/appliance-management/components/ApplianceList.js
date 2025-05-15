'use client';
import React from 'react';
import { ApplianceCard } from './ApplianceCard';

// ApplianceList component accepts `appliances`, `onEdit`, and `onDelete` as props
export const ApplianceList = ({ appliances, onEdit, onDelete }) => {
  if (appliances.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          No appliances added yet. Add your first appliance above!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Appliances</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliances.map((appliance) => (
          <ApplianceCard
            key={appliance.id}
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
