"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BillHistory({ token }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Map full month names from backend to 3-letter abbreviations for chart
  const monthShortNames = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  useEffect(() => {
    if (!token) {
      setError("Authentication token missing");
      return;
    }

    const fetchBills = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5001/api/bills/bill-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch bills: ${res.statusText}`);
        }

        const data = await res.json();

        // Sort by year & month ascending
        const monthOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ];
        data.sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        // Map to chart format
        const formattedData = data.map((bill) => ({
          month: monthShortNames[bill.month] || bill.month,
          amount: bill.billAmount,
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [token]);

  // Compute stats if data available
  const amounts = chartData.map((item) => item.amount);
  const average = amounts.length
    ? (amounts.reduce((sum, val) => sum + val, 0) / amounts.length).toFixed(2)
    : 0;
  const highest = amounts.length ? Math.max(...amounts) : 0;
  const lowest = amounts.length ? Math.min(...amounts) : 0;

  if (loading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Bill History</h2>
        <Link href="/bill-history">
          <button className="text-sm text-green-600 bg-green-50 px-4 py-1 rounded-full hover:bg-blue-100 transition duration-200">
            View All
          </button>
        </Link>
      </div>

      <div className="h-64 w-full relative mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, Math.max(highest * 1.2, 3000)]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#fff", stroke: "#3b82f6", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-md p-3 text-center">
          <div className="text-sm text-gray-600">Average</div>
          <div className="font-semibold text-blue-800">LKR {average}</div>
        </div>
        <div className="bg-blue-50 rounded-md p-3 text-center">
          <div className="text-sm text-gray-600">Highest</div>
          <div className="font-semibold text-blue-800">LKR {highest}</div>
        </div>
        <div className="bg-blue-50 rounded-md p-3 text-center">
          <div className="text-sm text-gray-600">Lowest</div>
          <div className="font-semibold text-blue-800">LKR {lowest}</div>
        </div>
      </div>
    </div>
  );
}
