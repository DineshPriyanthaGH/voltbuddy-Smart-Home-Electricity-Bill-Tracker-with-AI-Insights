"use client";

import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';

const App = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'K.S Fernando',
    address: 'No:6, Main Street, Anuradhapura',
    contactNo: '0713495446',
    email: 'ksfernando99@gmail.com',
    password: '••••••••'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <span>Profile updated successfully!</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Profile</h1>
          <p className="text-sm text-blue-600 font-medium mb-8">{profileData.branch}</p>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <form onSubmit={handleSubmit} className="p-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-12">
                <div className="relative mb-6">
                  <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-xl ring-4 ring-blue-50">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile Preview" className="h-full w-full object-cover" />
                    ) : (
                      <img src="/images/profileimg.jpg" alt="Profile" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-700">
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <i className="fas fa-camera"></i>
                  </label>
                </div>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG. Max size: 5MB</p>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {[
                  { label: 'Full Name', id: 'name', type: 'text' },
                  { label: 'Branch', id: 'branch', type: 'text' },
                  { label: 'Address', id: 'address', type: 'text' },
                  { label: 'Contact Number', id: 'contactNo', type: 'tel' },
                  { label: 'Email Address', id: 'email', type: 'email' }
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={profileData[field.id]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                ))}

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={profileData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-10">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
