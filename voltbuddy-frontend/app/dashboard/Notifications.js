import React from "react";
import { FileText, AlertTriangle, Zap, Info, Bell } from "lucide-react";

const NotificationIcon = ({ type }) => {
  const iconClasses = "w-6 h-6";

  const iconMap = {
    bill: <FileText className={iconClasses} />,
    warning: <AlertTriangle className={iconClasses} />,
    alert: <Zap className={iconClasses} />,
    default: <Info className={iconClasses} />,
  };

  const gradientMap = {
    bill: "from-blue-500 to-indigo-600",
    warning: "from-amber-500 to-orange-600",
    alert: "from-red-500 to-rose-600",
    default: "from-gray-500 to-gray-600",
  };

  const icon = iconMap[type] || iconMap.default;
  const gradient = gradientMap[type] || gradientMap.default;

  return (
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white 
                    shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
      {icon}
    </div>
  );
};

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "bill",
      title: "Bill due soon",
      message: "Your electricity bill is due in 7 days",
      time: "2 hours ago",
      isUnread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Unusual increase detected",
      message: "Your electricity usage is 15% higher than last month",
      time: "1 day ago",
      isUnread: true,
    },
    {
      id: 3,
      type: "alert",
      title: "Usage Spike Detected",
      message: "Your daily usage exceeded 15 kWh yesterday.",
      time: "2 days ago",
      isUnread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 
                    transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] 
                    bg-gradient-to-br from-white/80 to-blue-50/50 relative">
      <div className="absolute top-8 right-8">
        <div className="relative">
          <div className="p-3 rounded-xl text-white shadow-lg" 
               style={{background: 'linear-gradient(to bottom right, #2441E1, #3B82F6)'}}>
            <Bell className="h-6 w-6" />
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-rose-600 
                           text-white text-xs font-bold w-6 h-6 rounded-full flex items-center 
                           justify-center shadow-lg animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-transparent mb-8" 
          style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                  WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
        Recent Notifications
      </h2>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="group relative bg-gradient-to-r from-white/90 to-blue-50/80 
                       backdrop-blur-sm rounded-2xl p-6 border border-white/30 
                       shadow-lg hover:shadow-2xl transform transition-all duration-300 
                       hover:scale-[1.02] hover:from-white hover:to-indigo-50/80 
                       before:absolute before:inset-0 before:rounded-2xl 
                       before:bg-gradient-to-r before:from-transparent before:to-indigo-50/20 
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <NotificationIcon type={notification.type} />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 
                                transition-colors duration-300 mb-2">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 
                               transition-colors duration-300 mb-3">
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 
                                   rounded-full">{notification.time}</span>
                    {notification.isUnread && (
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 
                                     rounded-full flex items-center space-x-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span>New</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {notification.isUnread && (
                <button className="group/btn p-2 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  <svg
                    className="h-5 w-5 text-gray-400 group-hover/btn:text-red-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="group w-full mt-8 relative overflow-hidden">
        <div className="block w-full py-4 px-6 rounded-2xl text-lg font-bold text-white
                       shadow-lg hover:shadow-2xl transform transition-all duration-300 
                       hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 
                       before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                       before:translate-x-[-100%] hover:before:translate-x-[100%] 
                       before:transition-transform before:duration-700"
               style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}>
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4 19v-7a3 3 0 013-3h1m0-4a2 2 0 012-2h6.5a2 2 0 011.5.8l3.5 4.2H11v7a1 1 0 01-1 1H4z"
              />
            </svg>
            <span>View All Notifications</span>
          </span>
        </div>
      </button>
    </div>
  );
}
