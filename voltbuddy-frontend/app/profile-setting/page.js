// pages/profile.js
import React from 'react';
import Navbar from "../dashboard/Navbar";
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
       <div className="flex flex-col min-h-screen">
            <Navbar />
      
      {/* Main Content */}
      <main className="p-8 ml-35 mr-35">
        {/* Breadcrumb and Title */}
        <div className="mb-6">
          <div className="flex items-center text-center text-sm text-gray-500 mb-1">
            <span>Pages</span>
            <span className="mx-2 items-center">/</span>
            <span>Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-indigo-900 ">Profile</h1>
          <p className="text-blue-800">Anuradhapura Branch</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
          {/* Banner */}
          <div className="bg-indigo-500 h-32 relative">
            <h2 className="text-2xl font-semibold text-white absolute bottom-4 left-8">
              Your Profile
            </h2>
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

          {/* Details */}
          <div className="p-8 pt-16">
            <div className="grid grid-cols-2 gap-8 max-w-2xl">
              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Name:</div>
                <div className="w-2/3 font-medium text-indigo-900">Adela Parkson</div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Address:</div>
                <div className="w-2/3 font-medium text-indigo-900">Khumaltar, Lalitpur</div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Contact No.:</div>
                <div className="w-2/3 font-medium text-indigo-900">9841236978</div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Email:</div>
                <div className="w-2/3 font-medium text-indigo-900">Adela98@gmail.com</div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-gray-500">Password:</div>
                <div className="w-2/3 font-medium text-indigo-900">*******</div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-200">
                Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
