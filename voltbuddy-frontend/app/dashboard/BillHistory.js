"use client";

import { useState } from "react";
import {
  DollarSign,
  AlertCircle,
  ChevronRight,
  Home,
  Settings,
  PieChart,
  Info,
  Bell,
  Plus,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

export default function BillHistory() {
  const chartData = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 950 },
    { month: "Mar", amount: 1400 },
    { month: "Apr", amount: 2100 },
    { month: "May", amount: 2400 },
    { month: "Jun", amount: 1800 },
  ];

  const amounts = chartData.map((item) => item.amount);
  const average = (
    amounts.reduce((sum, val) => sum + val, 0) / amounts.length
  ).toFixed(2);
  const highest = Math.max(...amounts);
  const lowest = Math.min(...amounts);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Bill History</h2>
        <button className="text-sm text-green-600 bg-green-50 px-4 py-1 rounded-full hover:bg-blue-100 transition duration-200">
          View All
        </button>
      </div>

      <div className="h-64 w-full relative mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 3000]} />
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
