'use client';

import React, { useState } from 'react';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import Navbar from '../dashboard/Navbar';
import { Footer } from '../dashboard/Footer';

const ApplianceManagementPage = () => {
  const [appliances, setAppliances] = useState([]);
  const [editingAppliance, setEditingAppliance] = useState(null);

  const addOrUpdateAppliance = (appliance) => {
    if (appliance.id) {
      // Update existing appliance
      setAppliances((prev) =>
        prev.map((a) => (a.id === appliance.id ? appliance : a))
      );
      setEditingAppliance(null);
    } else {
      // Add new appliance, generate an id
      const newAppliance = { ...appliance, id: Date.now().toString() };
      setAppliances((prev) => [...prev, newAppliance]);
    }
  };

  const handleEdit = (appliance) => {
    setEditingAppliance(appliance);
  };

  const handleCancelEdit = () => {
    setEditingAppliance(null);
  };

  const handleDelete = (id) => {
    setAppliances((prev) => prev.filter((a) => a.id !== id));
    if (editingAppliance && editingAppliance.id === id) {
      setEditingAppliance(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full"> 
     <Navbar />
    <div className="container mx-auto px-4 py-8 max-w-4xl ">
      <header className="mb-8 ">
   
          <h2 className="text-xl  text-gray-600">Appliance Management</h2>
        </header>
      <ApplianceForm
        onSubmit={addOrUpdateAppliance}
        editingAppliance={editingAppliance}
        onCancel={handleCancelEdit}
      />
      <ApplianceList appliances={appliances} onEdit={handleEdit} onDelete={handleDelete} />
      
    </div>
    <Footer />
</div>
  );
};

export default ApplianceManagementPage;
