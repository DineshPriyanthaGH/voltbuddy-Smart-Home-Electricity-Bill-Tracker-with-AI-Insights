"use client";

import React, { useState, useMemo } from "react";
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

export const BillChart = ({ dateRange }) => {
  const [activeTab, setActiveTab] = useState("amount");

  const chartData = [
    { month: "Jun", amount: 40, consumption: 5 },
    { month: "Jul", amount: 25, consumption: 3 },
    { month: "Aug", amount: 40, consumption: 5 },
    { month: "Sep", amount: 30, consumption: 4 },
    { month: "Oct", amount: 45, consumption: 5 },
    { month: "Nov", amount: 40, consumption: 5 },
    { month: "Dec", amount: 45, consumption: 5 },
  ];

  // Compute filtered data based on dateRange (last N months)
  // Assuming chartData is in chronological order from oldest to newest
  const filteredData = useMemo(() => {
    if (!dateRange) return chartData;
    return chartData.slice(-dateRange);
  }, [dateRange, chartData]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:ml-20 sm:mr-20 ml-4 mr-4">
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
