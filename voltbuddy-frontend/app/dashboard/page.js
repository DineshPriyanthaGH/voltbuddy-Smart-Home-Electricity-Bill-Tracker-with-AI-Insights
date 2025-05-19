import React from "react";
import BillHistory from "./BillHistory";
import ApplianceUsage from "./ApplianceUsage";
import Notifications from "./Notifications";
import Navbar from "./Navbar";
import AIInsights from "./AIInsights";
import CurrentBill from "./CurrentBill";
import { Footer } from "./Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-7 mt-2">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentBill />
            <BillHistory />
            <AIInsights />
          </div>

          <div className="space-y-6">
            <ApplianceUsage />
            <Notifications />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
