'use client'

import React, { useState } from "react";

export default function CurrentBill() {
  // State for controlled inputs
  const [amount, setAmount] = useState("1240.75");
  const [month, setMonth] = useState("May 2023");
  const [dueDate, setDueDate] = useState("June 28, 2023");
  const [status, setStatus] = useState("Pending");

  // Handle form submit (for demo, just prevents reload)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add code to save this info to backend or context/store
    alert(`Bill updated: ${amount} LKR for ${month}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Bill</h2>
        <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
          Due in 7 days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Form and Display */}
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bill Amount (LKR)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Billing Month
              </label>
              <input
                type="text"
                placeholder="e.g. May 2023"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(new Date(e.target.value).toLocaleDateString())
                }
                className="w-full border text-gray-500 border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
            >
              Update Bill
            </button>
          </form>

          {/* Display updated bill info */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-l text-gray-600">Total Amount</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 ml-10">
              LKR {parseFloat(amount).toFixed(2)}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Due Date: {dueDate}</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                  ✓
                </div>
                <span className="text-sm text-gray-500">
                  Status: <span className="text-green-500">{status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Usage Breakdown (static example, can be dynamic later) */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Usage Breakdown</h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Electricity</span>
                <span>LKR 890.40</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Taxes & Fees</span>
                <span>LKR 350.00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-10">
            <span>Billing Period: {month}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
