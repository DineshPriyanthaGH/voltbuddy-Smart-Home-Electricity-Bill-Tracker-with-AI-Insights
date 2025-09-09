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
import { API_BASE_URL } from '../../config/api';

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
        const res = await fetch(`${API_BASE_URL}/bills/bill-history`, {
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

  if (loading) return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    bg-gradient-to-br from-white/80 to-blue-50/50">
      <div className="flex items-center justify-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-200 border-t-indigo-600"></div>
        <span className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Loading chart...
        </span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    bg-gradient-to-br from-white/80 to-red-50/50">
      <div className="flex items-center space-x-3 text-red-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Error: {error}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-blue-50/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-transparent" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          Bill History Overview
        </h2>
        <Link href="/bill-history">
          <button className="group px-6 py-3 rounded-xl text-sm font-medium
                            bg-gradient-to-r from-emerald-500 to-teal-600 text-white
                            shadow-lg hover:shadow-xl transform transition-all duration-300 
                            hover:scale-105 hover:from-emerald-600 hover:to-teal-700
                            flex items-center space-x-2">
            <span>View All Details</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8 
                      border border-white/30 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 
                        rounded-2xl -z-10"></div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis 
              domain={[0, Math.max(highest * 1.2, 3000)]} 
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                fontWeight: '500'
              }}
              labelStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="url(#gradient)"
              strokeWidth={3}
              dot={{ 
                fill: '#ffffff', 
                stroke: '#4f46e5', 
                strokeWidth: 3, 
                r: 6,
                filter: 'drop-shadow(0 4px 8px rgba(79, 70, 229, 0.3))'
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#4f46e5', 
                strokeWidth: 3,
                fill: '#ffffff',
                filter: 'drop-shadow(0 4px 8px rgba(79, 70, 229, 0.4))'
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="group relative bg-gradient-to-br from-blue-50/80 to-indigo-100/60 
                        backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg
                        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                        before:absolute before:inset-0 before:rounded-2xl 
                        before:bg-gradient-to-br before:from-blue-400/10 before:to-indigo-400/10
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity">
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
                             shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-2">Average Bill</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                           bg-clip-text text-transparent">LKR {average}</div>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-emerald-50/80 to-green-100/60 
                        backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg
                        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                        before:absolute before:inset-0 before:rounded-2xl 
                        before:bg-gradient-to-br before:from-emerald-400/10 before:to-green-400/10
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity">
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 
                             shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-2">Highest Bill</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 
                           bg-clip-text text-transparent">LKR {highest}</div>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-orange-50/80 to-amber-100/60 
                        backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg
                        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                        before:absolute before:inset-0 before:rounded-2xl 
                        before:bg-gradient-to-br before:from-orange-400/10 before:to-amber-400/10
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity">
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 
                             shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-2">Lowest Bill</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 
                           bg-clip-text text-transparent">LKR {lowest}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
