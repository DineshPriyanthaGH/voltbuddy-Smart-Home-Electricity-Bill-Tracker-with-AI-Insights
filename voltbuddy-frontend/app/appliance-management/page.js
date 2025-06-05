'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import Navbar from '../dashboard/Navbar';
import { Footer } from '../dashboard/Footer';

const ApplianceManagementPage = () => {
  const [appliances, setAppliances] = useState([]);
  const [editingAppliance, setEditingAppliance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch appliances when the page loads
    const fetchAppliances = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/appliances', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setAppliances(result.appliances);  // Update appliances state
          setErrorMessage('');  // Clear any previous error messages
        } else {
          setErrorMessage(result.message || 'Failed to fetch appliances');
        }
      } catch (error) {
        console.error('Error fetching appliances:', error);
        setErrorMessage('Error fetching appliances');
      }
    };

    fetchAppliances();
  }, []);  // Fetch appliances on component mount

  const addOrUpdateAppliance = (appliance) => {
    if (appliance._id) {
      // Update existing appliance
      setAppliances((prev) =>
        prev.map((a) => (a._id === appliance._id ? appliance : a))
      );
      setEditingAppliance(null);
      toast.success('Appliance updated successfully!');  // Show success toast
    } else {
      // Add new appliance
      setAppliances((prev) => [...prev, appliance]);
      toast.success('Appliance added successfully!');  // Show success toast
    }
  };

  const handleEdit = (appliance) => {
    setEditingAppliance(appliance);
  };

  const handleCancelEdit = () => {
    setEditingAppliance(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/appliances/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setAppliances((prev) => prev.filter((a) => a._id !== id));
        toast.success('Appliance deleted successfully!');  // Show success toast
      } else {
        setErrorMessage(result.message);
        toast.error('Error deleting appliance!');  // Show error toast
      }
    } catch (error) {
      console.error('Error deleting appliance:', error);
      setErrorMessage('Error deleting appliance');
      toast.error('Error deleting appliance!');  // Show error toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h2 className="text-xl text-gray-600">Appliance Management</h2>
        </header>
        <ApplianceForm
          onSubmit={addOrUpdateAppliance}
          editingAppliance={editingAppliance}
          onCancel={handleCancelEdit}
        />
        {errorMessage && (
          <div className="bg-red-200 text-red-600 p-4 rounded-lg mb-4">
            <p>{errorMessage}</p>
          </div>
        )}
        <ApplianceList appliances={appliances} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Footer />
    </div>
  );
};

export default ApplianceManagementPage;
