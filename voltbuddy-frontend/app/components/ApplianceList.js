// components/ApplianceList.js
import React from 'react';
import ApplianceCard from '../appliance-management/components/ApplianceCard';

export default function ApplianceList({ appliances, onEdit, onDelete }) {
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
}
