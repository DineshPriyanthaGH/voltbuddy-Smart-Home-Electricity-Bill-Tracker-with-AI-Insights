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
    <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-transparent" 
              style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                      WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            View Bill History
          </h2>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto"
          ref={ref}
        >
          {/* Modern Month Selector Button */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between sm:justify-start text-white px-4 py-3 text-sm w-full sm:w-auto rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <Calendar size={16} className="mr-2" />
              <span className="font-medium">{options.find((opt) => opt.value === selected)?.label}</span>
              <ChevronDown size={16} className="ml-2" />
            </button>

            {open && (
              <ul className="absolute top-14 right-0 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl shadow-2xl w-48 z-10 overflow-hidden">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    className={`cursor-pointer px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 flex items-center transition-all duration-200 ${
                      selected === opt.value 
                        ? "font-bold text-white" 
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={selected === opt.value ? {background: 'linear-gradient(to right, #2441E1, #3B82F6)'} : {}}
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

          {/* Modern More Button */}
          <button className="flex items-center bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 text-gray-700 hover:text-gray-900 rounded-2xl px-4 py-3 text-sm w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <MoreHorizontal size={16} className="mr-2" />
            <span className="font-medium">More</span>
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        View and analyze your past energy bills with interactive charts and insights
      </p>

      {/* Pass dateRange and token props to BillChart */}
      <BillChart dateRange={selected} token={token} />
    </div>
  );
}
