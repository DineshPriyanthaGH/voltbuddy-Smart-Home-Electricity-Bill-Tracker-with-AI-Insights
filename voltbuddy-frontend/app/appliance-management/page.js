    'use client';
// app/appliance-management/page.js
import React, { useState } from 'react';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';




export default function ApplianceManagementPage() {
  const [appliances, setAppliances] = useState([
    {
      id: '1',
      name: 'Refrigerator',
      monthlyUsage: 150,
      powerRating: 150,
      type: 'refrigerator',
    },
    {
      id: '2',
      name: 'Air Conditioner',
      monthlyUsage: 300,
      powerRating: 1500,
      type: 'air-conditioner',
    },
    {
      id: '3',
      name: 'LED TV',
      monthlyUsage: 80,
      powerRating: 100,
      type: 'tv',
    },
  ]);

  const [editingAppliance, setEditingAppliance] = useState(null);

  const handleAddAppliance = (appliance) => {
    const newAppliance = {
      ...appliance,
      id: Date.now().toString(),
    };
    setAppliances([...appliances, newAppliance]);
  };

  const handleUpdateAppliance = (updatedAppliance) => {
    setAppliances(
      appliances.map((appliance) =>
        appliance.id === updatedAppliance.id ? updatedAppliance : appliance
      )
    );
    setEditingAppliance(null);
  };

  const handleDeleteAppliance = (id) => {
    setAppliances(appliances.filter((appliance) => appliance.id !== id));
  };

  const handleEditAppliance = (appliance) => {
    setEditingAppliance(appliance);
  };

  const cancelEdit = () => {
    setEditingAppliance(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">VoltBuddy</h1>
          <h2 className="text-xl text-gray-600">Appliance Management</h2>
        </header>
        <ApplianceForm
          onSubmit={editingAppliance ? handleUpdateAppliance : handleAddAppliance}
          editingAppliance={editingAppliance}
          onCancel={cancelEdit}
        />
        <ApplianceList
          appliances={appliances}
          onEdit={handleEditAppliance}
          onDelete={handleDeleteAppliance}
        />
      </div>
    </div>
  );
}
