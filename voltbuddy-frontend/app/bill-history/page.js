"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/Navbar";
import BillHistoryPage from "../bill-history/components/BillHistory";
import { Footer } from "../dashboard/Footer";

export default function Page() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Track the loading state for BillHistoryPage

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    // Simulate loading delay to show skeleton animation
    if (savedToken) {
      setTimeout(() => setLoading(false), 2000); // 2 seconds delay for loading
    }
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your bill history.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* If loading, show skeleton loader, else show BillHistoryPage */}
        {loading ? (
          <div className="flex flex-col space-y-6 p-4">
            <div className="skeleton h-12 w-48 mb-4"></div> {/* Skeleton for header */}
            <div className="skeleton h-6 w-64 mb-4"></div> {/* Skeleton for topic */}
            <div className="skeleton h-6 w-80 mb-4"></div> {/* Skeleton for content */}

            {/* Skeleton for card-like loading */}
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
          </div>
        ) : (
          <BillHistoryPage token={token} />
        )}
      </main>
      <Footer />
    </div>
  );
}
