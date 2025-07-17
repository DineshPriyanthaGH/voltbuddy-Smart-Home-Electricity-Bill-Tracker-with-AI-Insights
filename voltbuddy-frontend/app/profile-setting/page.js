'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../dashboard/Navbar';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    address: '',
    contactNo: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;
        setProfile({
          username: data.username || '',
          address: data.address || '',
          contactNo: data.contactNo || '',
          email: data.email || '',
          password: '', // Never fetch/display existing password
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        setMessage('Failed to load profile.');
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setMessage('');
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');

    try {
      const updatedData = { ...profile };
      if (!updatedData.password) delete updatedData.password; // Don't send empty password

      const res = await axios.put('/api/user/profile', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile({ ...res.data.data, password: '' });
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-8 ml-35 mr-35">
        <div className="mb-6">
          <div className="flex items-center text-center text-sm text-gray-500 mb-1">
            <span>Pages</span>
            <span className="mx-2">/</span>
            <span>Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-indigo-900">Profile</h1>
          <p className="text-blue-800">Anuradhapura Branch</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="bg-indigo-500 h-32 relative">
            <h2 className="text-2xl font-semibold text-white absolute bottom-4 left-8">Your Profile</h2>
            <div className="absolute -bottom-20 right-8">
              <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden">
                <img
                  src="/images/profileimg.jpg"
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <form className="p-8 pt-16 max-w-2xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Name */}
              <Field
                label="Name:"
                name="username"
                value={profile.username}
                editMode={editMode}
                handleChange={handleChange}
              />

              {/* Address */}
              <Field
                label="Address:"
                name="address"
                value={profile.address}
                editMode={editMode}
                handleChange={handleChange}
              />

              {/* Contact No */}
              <Field
                label="Contact No.:"
                name="contactNo"
                value={profile.contactNo}
                editMode={editMode}
                handleChange={handleChange}
              />

              {/* Email */}
              <Field
                label="Email:"
                name="email"
                type="email"
                value={profile.email}
                editMode={editMode}
                handleChange={handleChange}
              />

              {/* Password */}
              <Field
                label="Password:"
                name="password"
                type="password"
                value={profile.password}
                editMode={editMode}
                handleChange={handleChange}
                placeholder="Leave blank to keep unchanged"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              {editMode ? (
                <>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-6 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-200"
                >
                  Edit
                </button>
              )}
            </div>

            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

// Reusable Field component
const Field = ({ label, name, value, type = 'text', editMode, handleChange, placeholder }) => (
  <div className="flex items-center">
    <div className="w-1/3 text-gray-500">{label}</div>
    <div className="w-2/3 font-medium text-indigo-900">
      {editMode ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || ''}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      ) : (
        name === 'password' ? '********' : value
      )}
    </div>
  </div>
);
