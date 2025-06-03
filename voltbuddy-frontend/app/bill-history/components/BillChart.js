"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

export const BillChart = ({ dateRange, token }) => {
  const [activeTab, setActiveTab] = useState("amount");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Authentication token missing");
      return;
    }

    async function fetchBills() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5001/api/bills/bill-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }

        const bills = await response.json();

        const data = bills.map((bill) => ({
          month: monthShortNames[bill.month] || bill.month,
          amount: bill.billAmount,
          consumption: bill.consumption,
        }));

        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBills();
  }, [token]);

  const filteredData = useMemo(() => {
    if (!dateRange) return chartData;
    return chartData.slice(-dateRange);
  }, [dateRange, chartData]);

  if (loading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!chartData.length) return <div className="p-6 text-gray-600">No bill data available</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:mx-20 mx-4">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "amount"
                ? "text-blue-600 bg-white"
                : "text-gray-700 bg-white hover:text-blue-600"
            } border border-gray-200 rounded-l-lg`}
            onClick={() => setActiveTab("amount")}
          >
            Amount
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "consumption"
                ? "text-blue-600 bg-white"
                : "text-gray-700 bg-white hover:text-blue-600"
            } border border-gray-200 rounded-r-lg`}
            onClick={() => setActiveTab("consumption")}
          >
            Consumption
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} barCategoryGap={20}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={activeTab === "amount" ? "amount" : "consumption"}
              fill={activeTab === "amount" ? "#3b82f6" : "#10b981"}
              name={activeTab === "amount" ? "Bill Amount" : "Consumption"}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legends */}
      <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-600">Bill Amount</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-600">Consumption</span>
        </div>
      </div>
    </div>
  );
};
