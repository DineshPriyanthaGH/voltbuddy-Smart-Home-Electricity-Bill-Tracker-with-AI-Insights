'use client';

import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import { useDataRefresh } from "../context/DataRefreshContext";

export default function CurrentBill() {
  const { fetchNotifications, addBillCalculationNotification } = useNotifications();
  const { triggerBillRefresh } = useDataRefresh();

  console.log('🏗️ CurrentBill component initializing...');

  const [startReading, setStartReading] = useState(0);
  const [endReading, setEndReading] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("March");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [statusColor, setStatusColor] = useState("bg-yellow-200"); 

  console.log('📅 Current month state:', month);
  console.log('📅 Current dueDate state:', dueDate); 

  const [fixedCharge, setFixedCharge] = useState(0);
  const [energyCharge, setEnergyCharge] = useState(0);
  const [sscl, setSscl] = useState(0);

  const [pendingBills, setPendingBills] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem("token");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calculateDueDate = (billingMonth = month) => {
    // Safety check - if no month provided, use current month
    if (!billingMonth) {
      billingMonth = "March"; // Default fallback
    }
    
    // Get the index of the selected month
    const selectedMonthIndex = months.indexOf(billingMonth);
    const currentYear = new Date().getFullYear();
    
    // Create date for the selected month
    const selectedMonthDate = new Date(currentYear, selectedMonthIndex, 1);
    
    // Calculate due date as 25th of the next month
    const dueDate = new Date(selectedMonthDate);
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(25);
    
    // Format as YYYY-MM-DD for consistency with backend
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(dueDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Format due date for display
  const formatDueDateForDisplay = (dateString) => {
    if (!dateString) return 'Calculating...';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      const monthName = date.toLocaleString('default', { month: 'long' });
      return `${monthName} 25, ${date.getFullYear()}`;
    } catch (error) {
      console.error('Error formatting due date:', error);
      return 'Date Error';
    }
  };

 
  const calculateBillingPeriod = () => {
    const endMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    return endMonth;
  };

  useEffect(() => {
    if (month) { // Only calculate if month is initialized
      const newDueDate = calculateDueDate(month);
      setDueDate(newDueDate);
      console.log(`📅 Due date calculated for ${month}: ${formatDueDateForDisplay(newDueDate)}`);
    }
  }, [month]);

  // Initialize due date on component mount
  useEffect(() => {
    if (!dueDate && month) {
      setDueDate(calculateDueDate(month));
    }
  }, []);

  // Initialize due date when component mounts with default month
  useEffect(() => {
    if (month && !dueDate) {
      const initialDueDate = calculateDueDate(month);
      setDueDate(initialDueDate);
      console.log(`🎯 Initial due date set for ${month}: ${formatDueDateForDisplay(initialDueDate)}`);
    }
  }, [month, dueDate]);

  useEffect(() => {
   
    const fetchPendingBills = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/bills/bill-history', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        if (response.ok) {
       
          const pendingBills = data.filter((bill) => bill.status === 'Pending');
          setPendingBills(pendingBills);
        } else {
          console.error('Error fetching bills:', data.message);
        }
      } catch (error) {
        console.error('Error fetching pending bills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBills();
  }, [token]);

  const calculateBill = async () => {
    setStatus("Pending");  
    setStatusColor("bg-yellow-500"); 
    setLoading(true); 

    setTimeout(async () => {
      const consumption = endReading - startReading;

      
      let calculatedEnergyCharge = 0;
      let calculatedFixedCharge = 0;

      
      if (consumption <= 60) {
        calculatedEnergyCharge = consumption <= 30 ? consumption * 4 : (30 * 4) + ((consumption - 30) * 6);
        calculatedFixedCharge = 75;
      } else if (consumption <= 90) {
        calculatedEnergyCharge = (60 * 11) + ((consumption - 60) * 14);
        calculatedFixedCharge = 400;
      } else if (consumption <= 120) {
        calculatedEnergyCharge = (60 * 11) + (30 * 14) + ((consumption - 90) * 20);
        calculatedFixedCharge = 1000;
      } else if (consumption <= 180) {
        calculatedEnergyCharge = (60 * 11) + (30 * 14) + (30 * 20) + ((consumption - 120) * 33);
        calculatedFixedCharge = 1500;
      } else {
        calculatedEnergyCharge = (60 * 11) + (30 * 14) + (30 * 20) + (60 * 33) + ((consumption - 180) * 52);
        calculatedFixedCharge = 2000;
      }

     
      const subtotal = calculatedEnergyCharge + calculatedFixedCharge;
      const calculatedSscl = subtotal * 0.025;  
      const totalAmount = subtotal + calculatedSscl;

      
      setEnergyCharge(calculatedEnergyCharge);
      setFixedCharge(calculatedFixedCharge);
      setSscl(calculatedSscl);
      setAmount(totalAmount);

    
      await saveBillToDatabase(totalAmount, consumption);

      setLoading(false);
    }, 10000); 
  };

 
  const saveBillToDatabase = async (totalAmount, consumption) => {
    const billData = {
      month: month,
      year: 2025,
      billAmount: totalAmount,
      consumption: consumption,
      // Include detailed breakdown for email
      energyCharge: energyCharge,
      fixedCharge: fixedCharge,
      sscl: sscl
    };
     console.log('💾 Sending bill data to backend:', billData);

    try {
      const response = await fetch('http://localhost:5001/api/bills/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('✅ Bill updated successfully:', data.newBill || data.updatedBill);
        
        // Add local bill calculation notification
        const billInfo = data.newBill || data.updatedBill;
        addBillCalculationNotification(
          billInfo.totalAmount || amount, 
          billInfo.dueDate || dueDate
        );
        
        // Trigger dashboard refresh for energy tips and predictions
        console.log('🔄 Triggering bill refresh after bill creation/update...');
        triggerBillRefresh();
        
        // Refresh notifications to show the new bill notification
        console.log('🔄 Refreshing notifications...');
        setTimeout(() => {
          fetchNotifications();
          console.log('📱 Notifications refresh triggered');
        }, 2000); // Increased delay to ensure backend notification is created
        
      } else {
        console.error('❌ Error updating bill:', data.message);
      }
    } catch (error) {
      console.error('❌ Error saving bill:', error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBill();
  };

  
  const handleMarkAsPaid = async (billId) => {
    setStatus("Done");
    setStatusColor("bg-green-200"); 

    try {
      const response = await fetch(`http://localhost:5001/api/bills/mark-paid/${billId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Bill marked as paid:', data.updatedBill);
       
        setPendingBills((prevBills) => prevBills.filter(bill => bill._id !== billId));
        
        // Trigger dashboard refresh for energy tips and predictions
        console.log('🔄 Triggering bill refresh after marking as paid...');
        triggerBillRefresh();
      } else {
        console.error('Error marking bill as paid:', data.message);
      }
    } catch (error) {
      console.error('Error marking bill as paid:', error);
    }
  };


  const getProgressBarWidth = (value, total) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

    const areAllBillsPaid = pendingBills.length === 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-900/10 p-8 border border-gray-200/50">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-transparent mb-2" 
              style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                      WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            Your Pending Bills
          </h2>
          <p className="text-gray-600">Monitor and manage your electricity bills</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`${statusColor} text-xs text-black font-bold px-4 py-2 rounded-2xl shadow-md backdrop-blur-sm`}>
            {status === "Pending" ? "Due in " + Math.max(0, new Date(dueDate).getDate() - new Date().getDate()) + " days" : status}
          </div>
        </div>
      </div>

      {/* Enhanced Pending Bills Section */}
      <div className="mb-8">
        {loading ? (
          <div className="flex flex-wrap gap-6">
            {Array(5).fill().map((_, index) => (
              <div
                key={index}
                className="flex-none w-72 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl animate-pulse"
              >
                <div className="h-6 bg-gray-300 mb-4 rounded-lg"></div>
                <div className="h-4 bg-gray-300 mb-3 rounded"></div>
                <div className="h-4 bg-gray-300 mb-3 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {pendingBills.length === 0 ? (
              <div className="flex-none w-full p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-700">All Bills Are Paid!</p>
                    <p className="text-green-600">No pending bills at the moment</p>
                  </div>
                </div>
              </div>
            ) : (
              pendingBills.map((bill) => (
                <div
                  key={bill._id}
                  className="flex-none w-72 p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">{bill.month} {bill.year}</h3>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Due:</span>
                      <span className="font-semibold text-red-600">LKR {bill.billAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="text-gray-800">{new Date(bill.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-red-600 font-medium">Pending</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkAsPaid(bill._id)}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? (
                      <div className="animate-spin inline-block w-5 h-5 border-4 border-t-white border-green-300 rounded-full"></div>
                    ) : (
                      "Mark as Paid"
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Enhanced Pay Now Section */}
      <div className="mt-8">
        {areAllBillsPaid ? (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 text-center py-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-700 font-bold text-lg">All Bills are Paid!</span>
            </div>
          </div>
        ) : (
          <a
            href="https://payment.ceb.lk/instantpay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Pay Now</span>
          </a>
        )}
      </div>

      {/* Enhanced Bill Calculation Section */}
      <div className="mt-12 pt-8 border-t-2 border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" 
               style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-transparent" 
                style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                        WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
              Calculate Monthly Bill Amount
            </h2>
            <p className="text-gray-600">Enter your meter readings to calculate the bill</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  required
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 bg-indigo-50 p-3 rounded-lg mt-2">
                  💡 <strong>Tip:</strong> Please add reading from 01 of the selected month to 30 of the month.
                </p>
                
                {/* Due Date Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Bill Due Date</h4>
                      <p className="text-sm text-blue-700">
                        <strong>{month}</strong> bill will be due on <strong>{dueDate ? formatDueDateForDisplay(dueDate) : 'Calculating...'}</strong>
                        <br />
                        <span className="text-blue-600">All bills are due on the 25th of the following month</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Start Meter Reading (kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={startReading}
                    onChange={(e) => setStartReading(Number(e.target.value))}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    placeholder="Enter start reading"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    End Meter Reading (kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={endReading}
                    onChange={(e) => setEndReading(Number(e.target.value))}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-700 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    placeholder="Enter end reading"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-4 border-t-white border-indigo-300 rounded-full"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>Calculate Bill</span>
                  </div>
                )}
              </button>
            </form>

            {/* Enhanced Bill Amount Display */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold">Total Amount</span>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  LKR {parseFloat(amount).toFixed(2)}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Due Date: {dueDate ? formatDueDateForDisplay(dueDate) : 'Calculating...'}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">
                      Status: <span className="text-green-600 font-semibold">{status}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Enhanced Usage Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Usage Breakdown</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Fixed Charges</span>
                    <span className="font-bold text-blue-600">LKR {parseFloat(fixedCharge).toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-2xl h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-2xl transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${getProgressBarWidth(fixedCharge, amount)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Energy Charges</span>
                    <span className="font-bold text-green-600">LKR {parseFloat(energyCharge).toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-2xl h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-2xl transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${getProgressBarWidth(energyCharge, amount)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">SSCL (2.5%)</span>
                    <span className="font-bold text-red-600">LKR {parseFloat(sscl).toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-2xl h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-2xl transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${getProgressBarWidth(sscl, amount)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Bill Structure Info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-amber-800">Bill Structure</h4>
              </div>
              <div className="space-y-2 text-sm text-amber-700">
                <div className="flex justify-between">
                  <span>0-60 kWh:</span>
                  <span className="font-medium">Rs. 4.00/kWh, Rs. 75/month</span>
                </div>
                <div className="flex justify-between">
                  <span>61-90 kWh:</span>
                  <span className="font-medium">Rs. 14.00/kWh, Rs. 400/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Above 180 kWh:</span>
                  <span className="font-medium">Rs. 52.00/kWh, Rs. 2000/month</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-2xl">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-indigo-700 font-medium">Billing Period: {month}</span>
              </div>
            </div>
          </div>
          
          {/* Test Notification Button - Remove this in production */}
          
        </div>
      </div>
    </div>
    </div>
  );
}
