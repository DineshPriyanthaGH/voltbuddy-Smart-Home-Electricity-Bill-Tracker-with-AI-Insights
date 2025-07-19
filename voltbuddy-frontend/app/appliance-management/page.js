'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import Navbar from '../dashboard/Navbar';
import { Footer } from '../dashboard/Footer';
import ChatbotIcon from '../dashboard/ChatbotIcon';
import ChatSidebar from '../dashboard/ChatSideBar';
import { useNotifications } from '../context/NotificationContext';
import { useDataRefresh } from '../context/DataRefreshContext';

const ApplianceManagementPage = () => {
  const [appliances, setAppliances] = useState([]);
  const [editingAppliance, setEditingAppliance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  
  // Use notification context
  const { addApplianceNotification, addApplianceUpdateNotification, addApplianceDeleteNotification } = useNotifications();
  
  // Use data refresh context
  const { triggerApplianceRefresh } = useDataRefresh();

  // Test function to add a notification
  const testNotification = () => {
    addApplianceNotification("Test Appliance");
  };

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
      
      // Add in-app notification for appliance update
      addApplianceUpdateNotification(appliance.name);
      
      // Trigger dashboard refresh for energy tips and predictions
      console.log('🔄 Triggering appliance refresh after update...');
      triggerApplianceRefresh();
    } else {
      // Add new appliance
      setAppliances((prev) => [...prev, appliance]);
      toast.success('Appliance added successfully!');  // Show success toast
      
      // Add in-app notification for new appliance
      addApplianceNotification(appliance.name);
      
      // Trigger dashboard refresh for energy tips and predictions
      console.log('🔄 Triggering appliance refresh after add...');
      triggerApplianceRefresh();
    }
  };

  const handleEdit = (appliance) => {
    setEditingAppliance(appliance);
  };

  const handleCancelEdit = () => {
    setEditingAppliance(null);
  };

  const handleDelete = async (id) => {
    // Find the appliance name before deleting
    const applianceToDelete = appliances.find(a => a._id === id);
    const applianceName = applianceToDelete ? applianceToDelete.name : 'Appliance';
    
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
        
        // Add in-app notification for appliance deletion
        addApplianceDeleteNotification(applianceName);
        
        // Trigger dashboard refresh for energy tips and predictions
        console.log('🔄 Triggering appliance refresh after delete...');
        triggerApplianceRefresh();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10 flex-grow">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl shadow-lg" 
                 style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                Appliance Management
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Manage your home appliances and track their energy consumption to optimize efficiency.
          </p>
          
          {/* Test Notification Button */}
        
        </div>

        <div className="space-y-8">
          <ApplianceForm
            onSubmit={addOrUpdateAppliance}
            editingAppliance={editingAppliance}
            onCancel={handleCancelEdit}
          />
          
          {errorMessage && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <span className="text-red-700 font-medium">{errorMessage}</span>
              </div>
            </div>
          )}
          
          <ApplianceList appliances={appliances} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <ChatbotIcon onClick={() => setChatOpen(true)} />

      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}

      <Footer />
    </div>
  );
};

export default ApplianceManagementPage;
