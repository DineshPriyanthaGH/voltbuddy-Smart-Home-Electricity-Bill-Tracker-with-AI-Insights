import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, MoreHorizontal } from "lucide-react";
import { BillChart } from "./BillChart";

export default function BillSummaryCard({ token }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(3); 
  const ref = useRef();

  const options = [
    { label: "Last 3 Months", value: 3 },
    { label: "Last 6 Months", value: 6 },
    { label: "Last 9 Months", value: 9 },
  ];

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10 sm:mx-20 mx-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-4 gap-2">
        <h2 className="text-lg font-bold text-gray-800">View Bill History</h2>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto"
          ref={ref}
        >
          {/* Month Selector Button */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between sm:justify-start text-gray-600 border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto"
              aria-haspopup="true"
              aria-expanded={open}
            >
              <Calendar size={14} className="mr-1" />
              <span>{options.find((opt) => opt.value === selected)?.label}</span>
              <ChevronDown size={14} className="ml-1" />
            </button>

            {open && (
              <ul className="absolute top-10 right-0 bg-white border border-gray-300 text-gray-600 rounded shadow-md w-44 z-10">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    className={`cursor-pointer px-4 py-2 hover:bg-blue-100 flex items-center ${
                      selected === opt.value ? "font-semibold text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelected(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* More Button */}
          <button className="flex items-center hover:border-indigo-500 text-gray-600 border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto">
            <MoreHorizontal size={14} className="mr-1" />
            <span>More</span>
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        View and analyze your past energy bills
      </p>

      {/* Pass dateRange and token props to BillChart */}
      <BillChart dateRange={selected} token={token} />
    </div>
  );
}
