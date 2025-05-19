import React from "react";

export default function ApplianceUsage() {
  const appliances = [
    {
      id: 1,
      name: "Air Conditioner",
      power: "1200W",
      usage: 450,
      color: "blue",
    },
    { id: 2, name: "Refrigerator", power: "150W", usage: 120, color: "indigo" },
    { id: 3, name: "Television", power: "120W", usage: 65, color: "purple" },
    {
      id: 4,
      name: "Washing Machine",
      power: "500W",
      usage: 90,
      color: "orange",
    },
    { id: 5, name: "Lighting", power: "60W", usage: 45, color: "yellow" },
  ];

  const getWidthPercentage = (usage) => {
    const maxUsage = Math.max(...appliances.map((a) => a.usage));
    return (usage / maxUsage) * 100;
  };

  const getApplianceIcon = (name) => {
    switch (name.toLowerCase()) {
      case "air conditioner":
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      case "refrigerator":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        );

      case "television":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round "
              strokeWidth={2}
              d="M3 5h18v12H3V5zM8 21h8m-4-4v4"
            />
          </svg>
        );
      case "washing machine":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        );
      case "lighting":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
    }
  };

  const getColorClass = (applianceName) => {
    switch (applianceName.toLowerCase()) {
      case "air conditioner":
        return "bg-red-500";
      case "refrigerator":
        return "bg-blue-500";
      case "television":
        return "bg-purple-500";
      case "washing machine":
        return "bg-orange-500";
      case "lighting":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          Appliance Usage
        </h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <a
            href="/appliance-management"
            className="text-sm text-blue-600 hover:text-blue-800 mt-2"
          >
            Add Appliance
          </a>
        </button>
      </div>

      <div className="space-y-4">
        {appliances.map((appliance) => (
          <div
            key={appliance.id}
            className="bg-gray-50 rounded-lg p-4 border border-blue-300 border-r-3 hover:bg-blue-100 hover:border-blue-700 transition duration-200"
          >
            <div className="flex items-center mb-2">
              <div className="mr-3">{getApplianceIcon(appliance.name)}</div>
              <div>
                <h3 className="font-medium text-gray-700">{appliance.name}</h3>
                <p className="text-xs text-gray-500">{appliance.power}</p>
              </div>
              <div className="ml-auto text-sm font-semibold text-gray-900">
                {appliance.usage} kWh
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div
                className={`${getColorClass(
                  appliance.name
                )} h-1.5 rounded-full`}
                style={{ width: `${getWidthPercentage(appliance.usage)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button
        href="/appliance-management"
        className="w-full mt-10 mb-2 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
      >
        <a href="/appliance-management" className="text-sm  mt-2">
          Manage Appliances
        </a>
      </button>
    </div>
  );
}
