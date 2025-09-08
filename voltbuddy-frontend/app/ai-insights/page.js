// app/ai-insights/page.js
"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../dashboard/Navbar';
import { EnergyTips } from './components/EnergyTips';
import { CostStrategies } from './components/CostStrategies';
import PredictionModels from './components/PredictionModels';
import InsightsPDFExport from './components/InsightsPDFExport';
import CompactExportButton from './components/CompactExportButton';
import { Footer } from '../dashboard/Footer';
import ChatbotIcon from '../dashboard/ChatbotIcon';
import ChatSidebar from '../dashboard/ChatSideBar';

export default function AiInsightsPage() {
  const [token, setToken] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // State to collect insights data for PDF
  const [insightsData, setInsightsData] = useState({
    energyTips: [],
    costStrategies: [],
    predictionData: []
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    
    // Get user email from localStorage or make API call
    const fetchUserEmail = async () => {
      try {
        // First try to get from localStorage
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          if (userData.email) {
            setUserEmail(userData.email);
            console.log('User email from localStorage:', userData.email);
            return;
          }
        }

        // If not in localStorage, fetch from API
        if (savedToken) {
          const response = await fetch('http://localhost:5001/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            const userData = result.data; // API returns data in 'data' field
            setUserEmail(userData.email || '');
            console.log('User email from API:', userData.email);
            
            // Save to localStorage for future use
            localStorage.setItem("userData", JSON.stringify(userData));
          } else {
            console.error('Failed to fetch user profile:', response.status);
          }
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  // Function to update insights data when components load their data
  const updateInsightsData = (type, data) => {
    setInsightsData(prev => ({
      ...prev,
      [type]: data
    }));
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view AI insights.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-10 flex-grow">
        {/* Enhanced Header Section with Export Button */}
        <div className="relative text-center mb-12">
          {/* Compact Export Button - Top Right (responsive) */}
          <div className="absolute top-0 right-0 md:right-0 sm:right-2">
            <CompactExportButton 
              energyTips={insightsData.energyTips}
              costStrategies={insightsData.costStrategies}
              predictionData={insightsData.predictionData}
              userEmail={userEmail}
            />
          </div>

          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl shadow-lg" 
                 style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                AI Smart Insights
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of artificial intelligence to optimize your energy consumption. 
            Get personalized recommendations, cost-saving strategies, and predictive insights 
            to reduce your electricity bills.
          </p>
        </div>
        
        <div className="space-y-8">
          <EnergyTips onDataLoad={(data) => updateInsightsData('energyTips', data)} />
          <CostStrategies onDataLoad={(data) => updateInsightsData('costStrategies', data)} />
          <PredictionModels onDataLoad={(data) => updateInsightsData('predictionData', data)} />
          
          {/* Compact PDF Export Section - Minimized */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              💡 <strong>Tip:</strong> Use the &quot;Export Report&quot; button above to download or email your complete AI insights report.
            </p>
          </div>
        </div>
      </div>

      <ChatbotIcon onClick={() => setChatOpen(true)} />

      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}

      <Footer />
    </div>
  );
}
