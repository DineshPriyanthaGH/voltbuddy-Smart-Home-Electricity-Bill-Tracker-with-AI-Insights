// profile-setting/page.js
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../dashboard/Navbar';  // Ensure correct path
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    address: '',
    contactNo: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    setMessage('You must be logged in.');
    setLoading(false);
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },  // Ensure token is passed here
      });

      // Check the response structure
      console.log("Profile Response:", res);

      const data = res.data.data;
      setProfile({
        username: data.username || '',
        address: data.address || '',
        contactNo: data.contactNo || '',
        email: data.email || '',
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
    try {
      const res = await axios.put('/api/user/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.data);
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-8 ml-35 mr-35">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-900">Profile</h1>
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
              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Name:</div>
                <div className="w-2/3 font-medium text-indigo-900">
                  {editMode ? (
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      required
                    />
                  ) : (
                    profile.username
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Address:</div>
                <div className="w-2/3 font-medium text-indigo-900">
                  {editMode ? (
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profile.address
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Contact No.:</div>
                <div className="w-2/3 font-medium text-indigo-900">
                  {editMode ? (
                    <input
                      type="text"
                      name="contactNo"
                      value={profile.contactNo}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profile.contactNo
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Email:</div>
                <div className="w-2/3 font-medium text-indigo-900">{profile.email}</div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Password:</div>
                <div className="w-2/3 font-medium text-indigo-900">*******</div>
              </div>
            </div>

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
 