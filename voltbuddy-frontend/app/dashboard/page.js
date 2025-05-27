'use client';

import React from "react";
import BillHistory from "./BillHistory";
import ApplianceUsage from "./ApplianceUsage";
import Notifications from "./Notifications";
import Navbar from "./Navbar";
import AIInsights from "./AIInsights";
import CurrentBill from "./CurrentBill";
import { Footer } from "./Footer";
import { useState } from 'react';

import ChatSidebar from "./ChatSideBar";

export default function Dashboard() {
   const [chatOpen, setChatOpen] = useState(false);
    const toggleChat = () => setChatOpen(!chatOpen);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-7 mt-2">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentBill />
            <BillHistory />
            <AIInsights />
          </div>

          <div className="space-y-6">
            <ApplianceUsage />
            <Notifications />
          </div>
        </div>
      </div>
       <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        aria-label="Open chat"
        title="Chat with Assistant"
      >
        {/* Use an SVG icon or emoji for chat */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h3l4 4 4-4h3a2 2 0 002-2z" />
        </svg>
      </button>
      {chatOpen && <ChatSidebar onClose={toggleChat} />}



      <Footer />
    </div>
  );
}
