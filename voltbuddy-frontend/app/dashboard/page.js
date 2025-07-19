"use client";

import React, { useEffect, useState } from "react";
import BillHistory from "./BillHistory";
// import other dashboard components as needed
import Navbar from "./Navbar";
import ApplianceUsage from "./ApplianceUsage";
import DashboardEnergyTips from "./DashboardEnergyTips";
import DashboardPredictionTable from "./DashboardPredictionTable";
import CurrentBill from "./CurrentBill";
import { Footer } from "./Footer";
import ChatSidebar from "./ChatSideBar";
import ChatbotIcon from "./ChatbotIcon";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true); // State for welcome card visibility

  const toggleChat = () => setChatOpen(!chatOpen);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="container mx-auto px-6 py-8 flex-grow">
        {/* Enhanced Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-transparent mb-2" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Monitor your energy consumption and insights</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg shadow-blue-100/50">
                <span className="text-sm font-medium text-gray-600">Today</span>
                <p className="text-lg font-bold text-blue-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Welcome Card */}
            {showWelcomeCard && (
              <div className="relative overflow-hidden rounded-3xl shadow-2xl" 
                   style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                           boxShadow: '0 25px 50px -12px rgba(36, 65, 225, 0.25)'}}>
                <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(36, 65, 225, 0.2), rgba(59, 130, 246, 0.2))'}}></div>
                <div className="relative p-8 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-2xl">Welcome to VoltBuddy!</h3>
                      </div>
                      <p className="text-blue-100 text-lg mb-4 leading-relaxed">
                        The CEB automatic amount retrieval service is not yet developed. You can manually enter your meter readings for now.
                      </p>
                      <p className="text-blue-200 text-sm">We hope this tool helps you track and manage your electricity bills efficiently.</p>
                    </div>
                    <button
                      onClick={() => setShowWelcomeCard(false)}
                      className="ml-4 p-2 hover:bg-white/20 rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              </div>
            )}

            <CurrentBill />
            <BillHistory token={token} />
            <DashboardPredictionTable />
          </div>

          <div className="space-y-8">
            <ApplianceUsage />
            <DashboardEnergyTips />
          </div>
        </div>
      </div>

      <ChatbotIcon onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}

      <Footer />
      
      {/* Toast Container for refresh notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
