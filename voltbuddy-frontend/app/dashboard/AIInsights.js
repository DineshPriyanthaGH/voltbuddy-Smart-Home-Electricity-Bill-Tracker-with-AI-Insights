import React from "react";

export default function AIInsights() {
  const insights = [
    {
      id: 1,
      icon: "lightbulb",
      title: "Switch to LED bulbs",
      description:
        "Replace your traditional bulbs with energy-efficient LED bulbs to save up to 15% on lighting costs.",
      color: "yellow",
    },
    {
      id: 2,
      icon: "ac",
      title: "Off-peak AC usage",
      description:
        "Running your air conditioner during off-peak hours (10 PM - 6 AM) can reduce your electricity bill by up to 20%.",
      color: "green",
    },
    {
      id: 3,
      icon: "refrigerator",
      title: "Refrigerator efficiency",
      description:
        "Keep your refrigerator at least 10cm away from walls to improve efficiency and reduce energy consumption.",
      color: "blue",
    },
    {
      id: 4,
      icon: "schedule",
      title: "Scheduled appliance usage",
      description:
        "Run high-power appliances like washing machines and dishwashers during off-peak hours to save on electricity costs.",
      color: "purple",
    },
  ];

  const renderIcon = (iconType, color) => {
    const colorClasses = {
      yellow: "text-yellow-500 bg-yellow-100",
      green: "text-green-500 bg-green-100",
      blue: "text-blue-500 bg-blue-100",
      purple: "text-purple-500 bg-purple-100",
    };

    const bgClass = colorClasses[color] || "text-gray-500 bg-gray-100";

    switch (iconType) {
      case "lightbulb":
        return (
          <div className={`p-2 rounded-full ${bgClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
        );
      case "ac":
        return (
          <div className={`p-2 rounded-full ${bgClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 17l6-6 4 4 8-8"
              />
            </svg>
          </div>
        );
      case "refrigerator":
        return (
          <div className={`p-2 rounded-full ${bgClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        );
      case "schedule":
        return (
          <div className={`p-2 rounded-full ${bgClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`p-2 rounded-full ${bgClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">AI Insights</h2>
        <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
          4 New Tips
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition duration-200"
          >
            <div className="flex items-start mb-2">
              {renderIcon(insight.icon, insight.color)}
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">{insight.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="inline-flex items-center text-blue-600 text-sm hover:text-blue-800">
          <a href="/ai-insights" className="text-sm text-blue-600 hover:text-blue-800 mt-2">
            Learn More
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
