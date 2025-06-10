"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../dashboard/Navbar";
import BillHistoryPage from "../bill-history/components/BillHistory";
import { Footer } from "../dashboard/Footer";

export default function Page() {
  const [token, setToken] = useState(null);

  useEffect(() => {
   
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
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
        <BillHistoryPage token={token} />
      </main>
      <Footer />
    </div>
  );
}
