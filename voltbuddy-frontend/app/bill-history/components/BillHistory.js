import React from "react";
import BillSummaryCard from "./BillSummaryCard";
import BillTable from "./BillTable";

export default function BillHistoryPage({ token }) {
  return (
    <div className="space-y-8">
      <BillSummaryCard token={token} />
      <BillTable token={token} />
    </div>
  );
}
