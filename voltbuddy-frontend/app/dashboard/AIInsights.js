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
    yellow: "from-yellow-400 to-amber-500",
    green: "from-emerald-400 to-green-500", 
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-violet-500",
  };

  const gradientClass = colorClasses[color] || "from-gray-400 to-gray-500";    switch (iconType) {
      case "lightbulb":
        return (
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white 
                          shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white 
                          shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white 
                          shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white 
                          shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white 
                          shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-purple-50/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-transparent flex items-center space-x-3" 
            style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                    WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
          <div className="p-2 rounded-xl text-white shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span>AI Smart Insights</span>
        </h2>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 
                       text-emerald-700 text-sm font-bold px-4 py-2 rounded-full border border-emerald-200
                       shadow-lg transform transition-all duration-300 hover:scale-105">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>4 New Tips</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="group relative bg-gradient-to-br from-white/90 to-gray-50/80 
                       backdrop-blur-sm rounded-2xl p-6 border border-white/30 
                       shadow-lg hover:shadow-2xl transform transition-all duration-300 
                       hover:scale-[1.03] hover:from-white hover:to-indigo-50/80 
                       before:absolute before:inset-0 before:rounded-2xl 
                       before:bg-gradient-to-br before:from-transparent before:to-indigo-50/20 
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <div className="relative z-10 flex items-start space-x-4">
              {renderIcon(insight.icon, insight.color)}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 
                              transition-colors duration-300 mb-2">{insight.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 
                             transition-colors duration-300">
                  {insight.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    Energy Tip
                  </span>
                  <button className="group/btn p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                    <svg className="w-4 h-4 text-indigo-600 group-hover/btn:translate-x-1 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="group inline-flex items-center px-8 py-4 rounded-2xl text-lg font-bold text-white
                          shadow-lg hover:shadow-2xl transform transition-all duration-300 
                          hover:scale-105 relative overflow-hidden before:absolute before:inset-0 
                          before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                          before:translate-x-[-100%] hover:before:translate-x-[100%] 
                          before:transition-transform before:duration-700"
                style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}>
          <a href="/ai-insights" className="flex items-center space-x-3 relative z-10">
            <span>Explore All AI Insights</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </button>
      </div>
    </div>
  );
}
