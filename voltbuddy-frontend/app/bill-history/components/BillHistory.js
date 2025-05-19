import React from "react";
import BillSummaryCard from "./BillSummaryCard";
import { BillChart } from "./BillChart";
import BillTable from "./BillTable";

export default function BillHistoryPage() {
  return (
    <>
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 ml-15 mb-3 mt-9">
          Bill History
        </h1>
        <p className="text-gray-600 text-lm ml-15 mb-10">
          Track and analyze your energy consumption over time
        </p>
      </div>

      {/* Bill History Summary Card */}
      <BillSummaryCard />

      
      {/* Bill Chart Card */}
      <BillChart />

      {/* Bill History Table */}
      <BillTable />
    </>
  );
}
