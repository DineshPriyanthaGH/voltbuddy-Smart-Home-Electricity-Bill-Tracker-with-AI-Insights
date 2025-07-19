"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, CheckCircle, XCircle } from "lucide-react";
import { useDataRefresh } from "../../context/DataRefreshContext";

export default function BillTable({ token }) {
  const [billHistory, setBillHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { triggerBillRefresh } = useDataRefresh();

  useEffect(() => {
    const fetchBillHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5001/api/bills/bill-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBillHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillHistory();
  }, [token]);

  const handleMarkAsPaid = async (billId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/bills/mark-paid/${billId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBillHistory((prevBills) =>
          prevBills.map((bill) =>
            bill._id === billId ? { ...bill, status: "Paid" } : bill
          )
        );
        
        // Trigger dashboard refresh for energy tips and predictions
        console.log('🔄 Triggering bill refresh after status update...');
        triggerBillRefresh();
      }
    } catch (error) {
      console.error("Error marking bill as paid:", error);
    }
  };

  if (loading) return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-1/3"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-full"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-full"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-full"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
        <span className="text-red-700 font-medium text-lg">Error: {error}</span>
      </div>
    </div>
  );
  
  if (!billHistory.length) return (
    <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">i</span>
        </div>
        <span className="text-blue-700 font-medium text-lg">No bill data available.</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 rounded-2xl shadow-lg" 
             style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-transparent" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          Bill Details
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Modern Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 mb-4 rounded-2xl" 
               style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}>
            <div className="text-white font-bold text-sm">Billing Period</div>
            <div className="text-white font-bold text-sm">Amount</div>
            <div className="text-white font-bold text-sm">Consumption</div>
            <div className="text-white font-bold text-sm">Status</div>
            <div className="text-white font-bold text-sm">Actions</div>
          </div>

          {/* Modern Table Body */}
          <div className="space-y-3">
            {billHistory.map((bill, index) => (
              <div key={bill._id} className="grid grid-cols-5 gap-4 p-4 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group">
                <div className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {bill.month} {bill.year}
                </div>
                <div className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">
                  ${bill.billAmount}
                </div>
                <div className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {bill.consumption} kWh
                </div>
                <div className="flex items-center">
                  {bill.status === "Paid" ? (
                    <div className="flex items-center text-green-600 font-medium">
                      <div className="p-1 rounded-full bg-green-100 mr-2">
                        <CheckCircle size={16} />
                      </div>
                      Paid
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 font-medium">
                      <div className="p-1 rounded-full bg-red-100 mr-2">
                        <XCircle size={16} />
                      </div>
                      Unpaid
                    </div>
                  )}
                </div>
                <div>
                  {bill.status !== "Paid" && (
                    <button
                      onClick={() => handleMarkAsPaid(bill._id)}
                      className="px-4 py-2 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      style={{background: 'linear-gradient(to right, #10B981, #059669)'}}
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
