import React from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { billHistoryData } from "../components/BillHistoryData";

export default function BillTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10 mt-10 sm:ml-20 sm:mr-20 ml-4 mr-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-800">
          Bill History Records
        </h2>
        <button className="flex items-center bg-blue-600 hover:bg-indigo-700 text-white rounded px-4 py-2 text-sm">
          <span>More Filters</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">
                Billing Period
              </th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">
                Consumption
              </th>
              <th className="px-4 py-3 text-left text-lm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {billHistoryData.map((bill, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-4 py-4 text-sm text-gray-800">
                  {bill.period}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {bill.amount}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {bill.consumption}
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex items-center text-green-500">
                    <CheckCircle size={16} className="mr-1" />
                    <span>{bill.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
