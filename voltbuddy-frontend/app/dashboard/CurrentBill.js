'use client';

import React, { useState, useEffect } from "react";

export default function CurrentBill() {

  const [startReading, setStartReading] = useState(0);
  const [endReading, setEndReading] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("March");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [statusColor, setStatusColor] = useState("bg-yellow-200"); 

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

  const calculateDueDate = () => {
    const endMonth = new Date();
    const dueDate = new Date(endMonth.setMonth(endMonth.getMonth() + 1));
    dueDate.setDate(25);
    return dueDate.toLocaleDateString();
  };

 
  const calculateBillingPeriod = () => {
    const endMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    return endMonth;
  };

  useEffect(() => {
    
    setDueDate(calculateDueDate());
  }, [month]);

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
    <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Pending Bills</h2>
        <div className="flex justify-between space-x-2 items-center mb-4">
          <div className={`${statusColor} text-xs text-black font-bold px-3 py-1 rounded-full`}>
            {status === "Pending" ? "Due in " + Math.max(0, new Date(dueDate).getDate() - new Date().getDate()) + " days" : status}
          </div>
        </div>
      </div>

      {/* Pending Bills Section */}
      <div className="mb-6">
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {Array(5).fill().map((_, index) => (
              <div
                key={index}
                className="flex-none w-64 p-4 bg-gray-100 border rounded-md skeleton"
              >
                <div className="h-6 bg-gray-300 mb-2 skeleton"></div>
                <div className="h-4 bg-gray-300 mb-2 skeleton"></div>
                <div className="h-4 bg-gray-300 mb-2 skeleton"></div>
                <div className="h-4 bg-gray-300 skeleton"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {pendingBills.length === 0 ? (
              <div className="flex-none w- p-4 bg-gray-100 border rounded-md">
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                    ✓
                  </div>
                  <span className="text text-gray-500">
                    No Pending Bills | All Bills Are Paid.
                  </span>
                </div>
              </div>
            ) : (
              pendingBills.map((bill) => (
                <div
                  key={bill._id}
                  className="flex-none w-64 p-4 bg-gray-100 border rounded-md"
                >
                  <p className="font-semibold text-gray-600">{bill.month} {bill.year}</p>
                  <p className="text-gray-500">Amount Due: LKR {bill.billAmount}</p>
                  <p className="text-gray-500">Due Date: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  <p className="text-gray-500">Status: <span className="text-red-600">Pending</span></p>
                  <button
                    onClick={() => handleMarkAsPaid(bill._id)}
                    className="bg-green-500 cursor-pointer text-white font-bold px-4 py-2 rounded-md text-sm hover:bg-green-600 mt-2"
                  >
                    {loading ? (
                      <div className="animate-spin inline-block w-5 h-5 border-4 border-t-blue-600 border-gray-200 rounded-full"></div> // Spin animation
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

      {/* Pay Now Button & All Bills Paid Message */}
      <div className="mt-4">
        {areAllBillsPaid ? (
          <div className="bg-green-200 text-center text-gray-700 font-semibold py-2 rounded-md">
            All Bills are Paid.
          </div>
        ) : (
          <a
            href="https://payment.ceb.lk/instantpay"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-200"
          >
            Pay Now
          </a>
        )}
      </div>





      {/* Form for calculating the bill */}
      <br></br>
      <h2 className="text-xl font-semibold text-gray-800">Calculate Monthly Bill Amount</h2>
      <br></br>
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
              className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200"
            >
              {loading ? (
                <div className="animate-spin inline-block w-5 h-5 border-4 border-t-blue-600 border-gray-200 rounded-full"></div>
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

        

          {/* Mark as Paid Button */}
         
        </div>
      </div>
    </div>
  );
}
