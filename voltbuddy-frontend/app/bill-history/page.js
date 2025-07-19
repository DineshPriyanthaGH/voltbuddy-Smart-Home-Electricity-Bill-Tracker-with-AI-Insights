"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/Navbar";
import BillHistoryPage from "../bill-history/components/BillHistory";
import BillHistoryExportButton from "../bill-history/components/BillHistoryExportButton";
import { Footer } from "../dashboard/Footer";
import ChatbotIcon from "../dashboard/ChatbotIcon";
import ChatSidebar from "../dashboard/ChatSideBar";

export default function Page() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Track the loading state for BillHistoryPage
  const [chatOpen, setChatOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [billHistory, setBillHistory] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    // Fetch user email
    const fetchUserEmail = async () => {
      if (savedToken) {
        try {
          const response = await fetch('http://localhost:5001/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUserEmail(userData.email);
          }
        } catch (error) {
          console.error('Error fetching user email:', error);
        }
      }
    };

    // Fetch bill history data
    const fetchBillHistory = async () => {
      if (savedToken) {
        try {
          const response = await fetch('http://localhost:5001/api/bills/bill-history', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setBillHistory(data);
          }
        } catch (error) {
          console.error('Error fetching bill history:', error);
        }
      }
    };

    fetchUserEmail();
    fetchBillHistory();

    // Simulate loading delay to show skeleton animation
    if (savedToken) {
      setTimeout(() => setLoading(false), 2000); // 2 seconds delay for loading
    }
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your bill history.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10 flex-grow">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl shadow-lg" 
                 style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                Bill History
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track your electricity consumption patterns and monitor your energy usage trends over time.
          </p>
          
          {/* Export Button */}
          {!loading && billHistory.length > 0 && (
            <div className="mt-8 flex justify-center">
              <BillHistoryExportButton 
                billHistory={billHistory} 
                userEmail={userEmail} 
              />
            </div>
          )}
        </div>

        {/* If loading, show modern skeleton loader */}
        {loading ? (
          <div className="space-y-8">
            {/* Modern Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill().map((_, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-2xl animate-pulse"
                >
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-3"></div>
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <BillHistoryPage 
            token={token} 
            onBillHistoryUpdate={setBillHistory} 
          />
        )}
      </div>

      <ChatbotIcon onClick={() => setChatOpen(true)} />

      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}

      <Footer />
    </div>
  );
}
