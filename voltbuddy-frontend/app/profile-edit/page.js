"use client";

import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';

const App = () => {
  const [profileData, setProfileData] = useState({
    name: 'K.S Fernando',
    branch: 'Anuradhapura Branch',
    address: 'No:6, Main Street, Anuradhapura',
    contactNo: '0713495446',
    email: 'ksfernando99@gmail.com',
    password: 'secretpassword',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Profile updated successfully!
        </div>
      )}

      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-8">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                ) : (
                  <img src="/images/profileimg.jpg" alt="Profile" className="object-cover w-full h-full" />
                )}
              </div>
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-md transition">
                📷
                <input type="file" id="photo-upload" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" id="name" value={profileData.name} handleChange={handleInputChange} />
            <InputField label="Branch" id="branch" value={profileData.branch} handleChange={handleInputChange} />
            <InputField label="Address" id="address" value={profileData.address} handleChange={handleInputChange} />
            <InputField label="Contact Number" id="contactNo" value={profileData.contactNo} handleChange={handleInputChange} />
            <InputField label="Email Address" id="email" type="email" value={profileData.email} handleChange={handleInputChange} />

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const InputField = ({ label, id, type = "text", value, handleChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default App;
