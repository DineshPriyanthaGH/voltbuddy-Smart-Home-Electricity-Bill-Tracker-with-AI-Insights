'use client';

import React, { useState, useEffect } from "react";

export default function CurrentBill() {
  // State for controlled inputs
  const [startReading, setStartReading] = useState(0);
  const [endReading, setEndReading] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("March");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [statusColor, setStatusColor] = useState("bg-yellow-200"); // Default to yellow (Pending)

  const [fixedCharge, setFixedCharge] = useState(0);
  const [energyCharge, setEnergyCharge] = useState(0);
  const [sscl, setSscl] = useState(0);

  const [pendingBills, setPendingBills] = useState([]); // New state to store pending bills
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem("token");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to calculate the due date (next month 25th)
  const calculateDueDate = () => {
    const endMonth = new Date();
    const dueDate = new Date(endMonth.setMonth(endMonth.getMonth() + 1));
    dueDate.setDate(25);
    return dueDate.toLocaleDateString();
  };

  // Set Billing Period dynamically
  const calculateBillingPeriod = () => {
    const endMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    return endMonth;
  };

  useEffect(() => {
    // Set the due date after the component mounts (Client-side only)
    setDueDate(calculateDueDate());
  }, [month]);

  useEffect(() => {
    // Fetch pending bills from the backend
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
          // Filter pending bills from fetched data
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
    setStatus("Pending");  // Reset status to Pending when Calculate Bill is clicked
    setStatusColor("bg-yellow-200");  // Reset color to yellow (Pending)
    setLoading(true); // Start loading animation

    setTimeout(async () => {
      const consumption = endReading - startReading;

      // Initialize charges
      let calculatedEnergyCharge = 0;
      let calculatedFixedCharge = 0;

      // Tariff Calculation based on consumption
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

      // Calculate total bill amount
      const subtotal = calculatedEnergyCharge + calculatedFixedCharge;
      const calculatedSscl = subtotal * 0.025;  // SSCL tax of 2.5%
      const totalAmount = subtotal + calculatedSscl;

      // Update the state with the calculated amount and breakdowns
      setEnergyCharge(calculatedEnergyCharge);
      setFixedCharge(calculatedFixedCharge);
      setSscl(calculatedSscl);
      setAmount(totalAmount);

      // Save the bill to the backend (Database)
      await saveBillToDatabase(totalAmount, consumption);

      setLoading(false); // Stop loading after 10 seconds
    }, 10000); // Simulate loading for 10 seconds
  };

  // Save the calculated bill data to the backend
  const saveBillToDatabase = async (totalAmount, consumption) => {
    const billData = {
      month: month,
      year: 2025,
      billAmount: totalAmount,
      consumption: consumption,
    };
     console.log('Sending bill data to backend:', billData);

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
        console.log('Bill updated successfully:', data.newBill);
      } else {
        console.error('Error updating bill:', data.message);
      }
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  // Handle form submission for calculating bill
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBill();
  };

  // Function to mark the bill as Paid
  const handleMarkAsPaid = async (billId) => {
    setStatus("Done");
    setStatusColor("bg-green-200"); // Change color to green (Done)

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
        // Remove the paid bill from the pending bills list
        setPendingBills((prevBills) => prevBills.filter(bill => bill._id !== billId));
      } else {
        console.error('Error marking bill as paid:', data.message);
      }
    } catch (error) {
      console.error('Error marking bill as paid:', error);
    }
  };

  // Calculate the progress bar widths based on the amounts
  const getProgressBarWidth = (value, total) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Bill</h2>
        <div className={`${statusColor} text-xs font-medium px-3 py-1 rounded-full`}>
          {status === "Pending" ? "Due in " + Math.max(0, new Date(dueDate).getDate() - new Date().getDate()) + " days" : status}
        </div>
      </div>

      {/* Pending Bills Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Pending Bills</h3>
        {loading ? (
          <p>Loading pending bills...</p>
        ) : (
          <div>
            {pendingBills.length === 0 ? (
              <p>No pending bills.</p>
            ) : (
              pendingBills.map((bill) => (
                <div key={bill._id} className="border p-4 mb-4 bg-gray-100 rounded-md">
                  <p className="font-semibold">{bill.month} {bill.year}</p>
                  <p>Amount Due: LKR {bill.billAmount}</p>
                  <p>Due Date: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  <p>Status: <span className="text-yellow-600">Pending</span></p>
                  <button
                    onClick={() => handleMarkAsPaid(bill._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 mt-2"
                  >
                    Mark as Paid
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Form for calculating the bill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                required
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <span className="text-xs text-gray-500">Tip: Please add reading from 01 of the selected month to 30 of the month.</span>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Start Meter Reading (kWh)
              </label>
              <input
                type="number"
                min="0"
                value={startReading}
                onChange={(e) => setStartReading(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Meter Reading (kWh)
              </label>
              <input
                type="number"
                min="0"
                value={endReading}
                onChange={(e) => setEndReading(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
            >
              {loading ? (
                <div className="animate-spin inline-block w-5 h-5 border-4 border-t-indigo-600 border-gray-200 rounded-full"></div>
              ) : (
                "Calculate Bill"
              )}
            </button>
          </form>

          {/* Display updated bill info */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center text-blue-600">
              <span className="text-l text-gray-600">Total Amount</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 ml-10">
              LKR {parseFloat(amount).toFixed(2)}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center text-gray-500 text-sm">
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

        {/* Right side: Usage Breakdown (dynamic progress bars) */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Usage Breakdown</h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Fixed Charges</span>
                <span>LKR {parseFloat(fixedCharge).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${getProgressBarWidth(fixedCharge, amount)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Energy Charges</span>
                <span>LKR {parseFloat(energyCharge).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${getProgressBarWidth(energyCharge, amount)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Social Security Contribution Levy (SSCL)</span>
                <span>LKR {parseFloat(sscl).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${getProgressBarWidth(sscl, amount)}%` }}
                ></div>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-6">
              <p><strong>Bill Structure:</strong></p>
              <p>0-60 kWh: Rs. 4.00/kWh, Rs. 75/month</p>
              <p>61-90 kWh: Rs. 14.00/kWh, Rs. 400/month</p>
              <p>Above 180 kWh: Rs. 52.00/kWh, Rs. 2000/month</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-10">
            <span>Billing Period: {month}</span>
          </div>

          <div className="mt-4">
            {/* Pay Now Button */}
            <a
              href="https://www.ceb.lk/payment"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
            >
              Pay Now
            </a>
          </div>

          {/* Mark as Paid Button */}
          <div className="mt-4">
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-200"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
