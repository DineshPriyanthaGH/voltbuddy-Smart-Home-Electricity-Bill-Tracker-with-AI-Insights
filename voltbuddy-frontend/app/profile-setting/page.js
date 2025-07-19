"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    address: "",
    contactNo: "",
    email: "",
    password: "",
    imgPreview: "",
    img: null,
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchProfile = async () => {
    if (!token) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      setProfile((prev) => ({
        ...prev,
        username: data.username || "",
        address: data.address || "",
        contactNo: data.contactNo || "",
        email: data.email || "",
        password: "", // avoid populating actual password
      }));
    } catch (error) {
      console.error("Error loading profile:", error);
      setMessage("Failed to load profile.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setMessage("");
  };

  const handleCancelClick = () => {
    fetchProfile(); // reset form to server data
    setEditMode(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { username, address, contactNo, email, password } = profile;

      await axios.put(
        "http://localhost:5001/api/user/profile",
        { username, address, contactNo, email, password }, // clean data
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Profile updated successfully!");
      setEditMode(false);
      fetchProfile(); // Refresh displayed data from server
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-900">Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account settings and personal information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          <div className="bg-indigo-500 h-32 relative">
            <h2 className="text-2xl font-semibold text-white absolute bottom-4 left-4 md:left-8">
              Your Profile
            </h2>
            <div className="absolute -bottom-20 right-4 md:right-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden relative group">
                <img
                  src={profile?.imgPreview || "/images/profileimg.jpg"}
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
                {editMode && (
                  <>
                    <label
                      htmlFor="profileImageUpload"
                      className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xs md:text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition"
                    >
                      Change Photo
                    </label>
                    <input
                      type="file"
                      id="profileImageUpload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imgURL = URL.createObjectURL(file);
                          setProfile((prev) => ({
                            ...prev,
                            img: file,
                            imgPreview: imgURL,
                          }));
                        }
                      }}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <form className="p-4 pt-20 md:p-8 md:pt-24" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {["username", "address", "contactNo", "email"].map((field) => (
                <div key={field} className="flex flex-col md:flex-row md:items-center">
                  <div className="text-gray-500 w-full md:w-1/3 mb-1 md:mb-0">
                    {field === "username"
                      ? "Name:"
                      : field === "contactNo"
                      ? "Contact No.:"
                      : `${field.charAt(0).toUpperCase() + field.slice(1)}:`}
                  </div>
                  <div className="font-medium text-indigo-900 w-full md:w-2/3">
                    {editMode ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={profile[field]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        required={field === "email" || field === "username"}
                      />
                    ) : (
                      profile[field]
                    )}
                  </div>
                </div>
              ))}

              <div className="flex flex-col md:flex-row md:items-center">
                <div className="text-gray-500 w-full md:w-1/3 mb-1 md:mb-0">Password:</div>
                <div className="font-medium text-indigo-900 w-full md:w-2/3">
                  {editMode ? (
                    <input
                      type="password"
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      required
                    />
                  ) : (
                    "********"
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:justify-end md:space-x-4 space-y-4 md:space-y-0">
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
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
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
