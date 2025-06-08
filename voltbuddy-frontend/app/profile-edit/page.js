"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';

const App = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

    name: 'K.S Fernando',
    branch: 'Anuradhapura Branch',
    address: 'No:6,Main Street, Anuradhapura',
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
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <div className="flex items-center space-x-2">
            <i className="fas fa-check-circle"></i>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <div className="flex items-center space-x-2">
              <i className="fas fa-building text-blue-600"></i>
              <p className="text-sm text-blue-600 font-medium">{profileData.branch}</p>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <form onSubmit={handleSubmit} className="p-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center mb-12">
                <div className="relative mb-6">
                  <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-xl ring-4 ring-blue-50">
{previewUrl ? (
<img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                     ) : (
                      <img
                        src="/images/profileimg.jpg"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 !rounded-button">
                    <i className="fas fa-camera text-lg"></i>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG. Max size: 5MB</p>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    value={profileData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNo"
                    name="contactNo"
                    value={profileData.contactNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={profileData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                    </button>
                  </div>
                </div>
              </div>


              {/* Security Settings Section */}
              <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-shield-alt text-blue-600 mr-2"></i>
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
<div className="relative inline-block w-12 mr-2 align-middle select-none">

  </label>
</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Login Notifications</h4>
                      <p className="text-xs text-gray-500">Receive alerts when someone logs into your account</p>
                    </div>
<div className="relative inline-block w-12 mr-2 align-middle select-none">

  </label>
</div>
                  </div>
                </div>
              </div>
              {/* Notification Preferences */}
              <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-bell text-blue-600 mr-2"></i>
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                      Email notifications for bill payments
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sms-notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                      SMS notifications for bill payments
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="marketing-notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketing-notifications" className="ml-3 text-sm text-gray-700">
                      Marketing communications and offers
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-10">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 !rounded-button whitespace-nowrap cursor-pointer flex items-center"
                >
                  <i className="fas fa-times mr-2"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 !rounded-button whitespace-nowrap cursor-pointer flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <style jsx>{`
        #toggle:checked + label {
          background-color: #3b82f6;
        }
        #toggle:checked + label .dot {
          transform: translateX(100%);
        }

      `}</style>
    </div>
  );
};

export default App;
