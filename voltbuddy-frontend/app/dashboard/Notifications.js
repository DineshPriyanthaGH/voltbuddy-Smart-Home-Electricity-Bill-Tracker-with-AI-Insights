import React from "react";
import { FileText, AlertTriangle, Zap, Info, Bell } from "lucide-react";

const NotificationIcon = ({ type }) => {
  const iconClasses = "w-5 h-5";

  const iconMap = {
    bill: <FileText className={iconClasses} />,
    warning: <AlertTriangle className={iconClasses} />,
    alert: <Zap className={iconClasses} />,
    default: <Info className={iconClasses} />,
  };

  const bgMap = {
    bill: "bg-[#E0EDFF] text-[#007BFF]",
    warning: "bg-[#FFF8DB] text-[#F59E0B]",
    alert: "bg-[#FFE5E5] text-[#EF4444]",
    default: "bg-gray-100 text-gray-500",
  };

  const icon = iconMap[type] || iconMap.default;
  const bg = bgMap[type] || bgMap.default;

  return (
    <div className={`p-2 rounded-full ${bg} flex items-center justify-center`}>
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
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      <div className="absolute top-6 right-4">
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-blue-50 border mb-6 mt-4 border-gray-100 rounded-lg p-3 flex items-start justify-between shadow-sm  hover:bg-blue-200 hover:border-blue-500 hover:border-2 border-blue-900"
          >
            <div className="flex items-start space-x-3">
              <NotificationIcon type={notification.type} />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
            {notification.isUnread && (
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="h-4 w-4"
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
        ))}
      </div>

      <button className="w-full mt-6 mb-4 bg-[#5C3BFE] text-white py-2 rounded-md text-sm font-medium hover:bg-[#472cd6] transition duration-200">
        View All Notifications
      </button>
    </div>
  );
}
