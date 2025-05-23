'use client';

import React, { useEffect, useState } from 'react';

export default function CurrentBill() {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  // Get token on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  // Fetch bill once token is available
  useEffect(() => {
    if (!token) return;

    async function fetchDashboardBill() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5001/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load data');
        setBill(data.currentBill);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardBill();
  }, [token]);

  // Calculate days until due date
  const dueInDays = bill
    ? Math.max(
        0,
        Math.ceil(
          (new Date(bill.dueDate).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        )
      )
    : null;

  // Handle pay now click
  async function handlePayNow() {
    if (!bill) return;
    try {
      const res = await fetch('http://localhost:5001/api/dashboard/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ billId: bill._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to pay bill');
      alert('Bill payment successful');
      // Refresh bill data
      setBill({ ...bill, status: 'Paid' });
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading current bill...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bill) return <p>No current bill available</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Bill</h2>
        <div
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            bill.status === 'Paid'
              ? 'bg-yellow-300 text-yellow-900'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {bill.status === 'Paid' ? 'Paid' : `Due in ${dueInDays} days`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Amount */}
        <div className="space-y-4">
          <div className="space-y-2">
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
              <span className="text-lg text-gray-600">Total Amount</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 ml-10">
              LKR {bill.amount.toFixed(2)}
            </h3>
          </div>

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
              <span>Due Date: {new Date(bill.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                ✓
              </div>
              <span className="text-sm text-gray-500">
                Status:{' '}
                {bill.status === 'Paid' ? (
                  <span className="text-yellow-600">Paid</span>
                ) : (
                  <span className="text-green-500">Pending</span>
                )}
              </span>
            </div>
          </div>

          {bill.status === 'Pending' && (
            <button
              onClick={handlePayNow}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200 mt-4"
            >
              Pay Now
            </button>
          )}
        </div>

        {/* Usage Breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Usage Breakdown</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Electricity</span>
                <span>LKR {(bill.amount * 0.72).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: '72%' }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Taxes & Fees</span>
                <span>LKR {(bill.amount * 0.28).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: '28%' }}
                ></div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-10">
            <span>
              Billing Period: {new Date(bill.billDate).toLocaleDateString()} -{' '}
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
