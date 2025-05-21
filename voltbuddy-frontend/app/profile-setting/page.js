// pages/profile.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm flex flex-col justify-between">
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-600">
                <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-indigo-900">VOLTBUDDY</h1>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 mt-10">
          <div className="space-y-2">
            <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            
            <Link href="/reports" className="flex items-center px-6 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Reports
            </Link>
            
            <Link href="/manage-user" className="flex items-center px-6 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Manage User
            </Link>
            
            <Link href="/generate-bill" className="flex items-center px-6 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Bill
            </Link>
            
            <Link href="/profile" className="flex items-center px-6 py-3 text-white bg-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-6">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition duration-200">
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="py-4 px-8">
          {/* Breadcrumb and Header */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span>Pages</span>
              <span className="mx-2">/</span>
              <span>Profile</span>
            </div>
            <h1 className="text-2xl font-bold text-indigo-900">Profile</h1>
            <p className="text-emerald-500">Anuradhapura Branch</p>
          </div>
          
          {/* Search and User Menu */}
          <div className="absolute top-4 right-4 flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="/images/avatar1.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
                // onError={(e) => {
                //   e.target.onerror = null;
                //   e.target.src = 'https://via.placeholder.com/40';
                // }}
              />
            </div>
          </div>
          
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            {/* Profile Banner */}
            <div className="bg-indigo-500 h-32 relative">
              <h2 className="text-2xl font-semibold text-white absolute bottom-4 left-8">
                Your Profile
              </h2>
              
              {/* Profile Image */}
              <div className="absolute -bottom-20 right-8">
                <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src="/images/avatar1.jpeg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    // onError={(e) => {
                    //   e.target.onerror = null;
                    //   e.target.src = 'https://via.placeholder.com/150';
                    // }}
                  />
                </div>
              </div>
            </div>
            
            {/* Profile Details */}
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
        </div>
      </div>
    </div>
  );
}
