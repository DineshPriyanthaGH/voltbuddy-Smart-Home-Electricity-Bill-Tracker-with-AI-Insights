"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, CheckCircle, XCircle } from "lucide-react";

export default function BillTable({ token }) {
  const [billHistory, setBillHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5001/api/bills/bill-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setBillHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillHistory();
  }, [token]);

  const handleMarkAsPaid = async (billId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/bills/mark-paid/${billId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBillHistory((prevBills) =>
          prevBills.map((bill) =>
            bill._id === billId ? { ...bill, status: "Paid" } : bill
          )
        );
      }
    } catch (error) {
      console.error("Error marking bill as paid:", error);
    }
  };

  if (loading) return <div className="p-6">Loading bill history...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!billHistory.length) return <div className="p-6 text-gray-600">No bill data available.</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10 mt-10 sm:mx-20 mx-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Billing Period</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Consumption</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billHistory.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.month} {bill.year}</td>
                <td>{bill.billAmount}</td>
                <td>{bill.consumption}</td>
                <td>
                  {bill.status === "Paid" ? (
                    <CheckCircle size={16} className="mr-1" />
                  ) : (
                    <XCircle size={16} className="mr-1" />
                  )}
                  {bill.status}
                </td>
                <td>
                  {bill.status !== "Paid" && (
                    <button
                      onClick={() => handleMarkAsPaid(bill._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
