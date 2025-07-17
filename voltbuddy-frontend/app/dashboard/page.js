"use client";

import React, { useEffect, useState } from "react";
import BillHistory from "./BillHistory";
// import other dashboard components as needed
import Navbar from "./Navbar";
import ApplianceUsage from "./ApplianceUsage";
import Notifications from "./Notifications";
import AIInsights from "./AIInsights";
import CurrentBill from "./CurrentBill";
import { Footer } from "./Footer";
import ChatSidebar from "./ChatSideBar";
import ChatbotIcon from "./ChatbotIcon";

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
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-7 mt-2">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Display the Welcome Card */}
            {showWelcomeCard && (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-6 rounded-md shadow-md">
                <h3 className="font-semibold text-xl">Welcome to Ceylon Power Tracker!</h3>
                <p className="mt-2">
                  The CEB automatic amount retrieval service is not yet developed. You can manually enter your meter readings for now.
                </p>
                <p className="mt-2 text-sm">We hope this tool helps you track and manage your electricity bills efficiently.</p>
              </div>
            )}

            <CurrentBill />
            <BillHistory token={token} />
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
        {/* Chat icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h3l4 4 4-4h3a2 2 0 002-2z"
          />
        </svg>
      </button>

      <ChatbotIcon onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}

      <Footer />
    </div>
  );
}
