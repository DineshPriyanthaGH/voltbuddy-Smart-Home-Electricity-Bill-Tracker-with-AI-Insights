"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, CheckCircle, XCircle } from "lucide-react";

export default function BillTable({ token }) {
  const [billHistory, setBillHistory] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters state
  const [filterYear, setFilterYear] = useState(2025);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterLastNMonths, setFilterLastNMonths] = useState("All");

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2025];

  // Options for last N months filter
  const lastNMonthsOptions = ["All", 2, 3, 6, 9];

  // Map month names to indexes for filtering last N months
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format billing period string
  const formatBillingPeriod = (month, year) => {
    const monthDays = {
      January: 31,
      February: 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };
    return `01 ${month} - ${monthDays[month]} ${month} ${year}`;
  };

  useEffect(() => {
    if (!token) {
      setError("Authentication token missing");
      return;
    }

    const fetchBillHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5001/api/bills/bill-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Error fetching bills: ${res.statusText}`);
        }
        const data = await res.json();

        const sortedData = data.sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        setBillHistory(sortedData);
        setFilteredBills(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillHistory();
  }, [token]);

  // Filter bills based on year, month, and last N months
  useEffect(() => {
    let filtered = [...billHistory];

    // Filter by year
    if (filterYear) {
      filtered = filtered.filter((bill) => bill.year === filterYear);
    }

    // Filter by specific month
    if (filterMonth && filterMonth !== "All") {
      filtered = filtered.filter((bill) => bill.month === filterMonth);
    }

    // Filter by last N months (from the latest bill)
    if (filterLastNMonths !== "All") {
      const n = Number(filterLastNMonths);
      if (filtered.length > 0) {
        // Get the index of the latest month in filtered data
        const latestMonthIndex = monthOrder.indexOf(filtered[filtered.length - 1].month);
        filtered = filtered.filter((bill) => {
          const billMonthIndex = monthOrder.indexOf(bill.month);
          return billMonthIndex >= latestMonthIndex - (n - 1);
        });
      }
    }

    setFilteredBills(filtered);
  }, [filterMonth, filterYear, filterLastNMonths, billHistory]);

  if (loading) return <div className="p-6">Loading bill history...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!billHistory.length) return <div className="p-6 text-gray-600">No bill data available.</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10 mt-10 sm:mx-20 mx-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-800">Bill History Records</h2>

        <div className="flex space-x-4">
          {/* Year filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(Number(e.target.value))}
            className="border text-gray-600 border-gray-300 rounded px-2 py-1"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Month filter */}
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border text-gray-600 border-gray-300 rounded px-2 py-1"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          {/* Last N months filter */}
          <select
            value={filterLastNMonths}
            onChange={(e) => setFilterLastNMonths(e.target.value)}
            className="border text-gray-600 border-gray-300 rounded px-2 py-1"
          >
            {lastNMonthsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "All Months" : `Last ${opt} Months`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Billing Period</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Consumption</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill, index) => {
              const isJune = bill.month === "June" && bill.year === 2025;
              const status = isJune ? "Pending" : "Paid";

              return (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-800">{formatBillingPeriod(bill.month, bill.year)}</td>
                  <td className="px-4 py-4 text-sm text-gray-800">Rs. {bill.billAmount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-800">{bill.consumption} kWh</td>
                  <td className="px-4 py-4 text-sm">
                    <div
                      className={`flex items-center ${
                        status === "Paid" ? "text-green-500" : "text-yellow-600"
                      }`}
                    >
                      {status === "Paid" ? (
                        <CheckCircle size={16} className="mr-1" />
                      ) : (
                        <XCircle size={16} className="mr-1" />
                      )}
                      <span>{status}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
