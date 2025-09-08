'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useNotifications } from "../context/NotificationContext";

export default function Navbar() {
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  
  // Use notification context
  const { notifications, getUnreadCount, markAsRead, formatTimeAgo, isOfflineMode } = useNotifications();

  // Toggle notification ON/OFF handler
  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    if (notificationsEnabled) setBillLimit(""); // clear limit when off
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg shadow-gray-100/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Landing Page Style */}
          <div className="flex-shrink-0 flex items-center space-x-2 group">
            <img
              src="./images/logo.png"
              alt="VoltBuddy Logo"
              className="h-14 w-14"
            />
            <span className="text-2xl font-bold text-transparent" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
              VOLTBUDDY
            </span>
          </div>

          {/* Desktop Navigation Links - Enhanced */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/dashboard"
              className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                pathname === "/dashboard"
                  ? "text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
              }`}
              style={pathname === "/dashboard" ? {
                background: 'linear-gradient(to right, #2441E1, #3B82F6)',
                boxShadow: '0 10px 25px -5px rgba(36, 65, 225, 0.25)'
              } : {}}>
              <span className="relative z-10">Dashboard</span>
              {pathname !== "/dashboard" && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{background: 'linear-gradient(to right, rgba(36, 65, 225, 0.1), rgba(59, 130, 246, 0.1))'}}></div>
              )}
            </Link>

            <Link
              href="/ai-insights"
              className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                pathname === "/ai-insights"
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
              }`}
            >
              <span className="relative z-10">AI Insights</span>
              {pathname !== "/ai-insights" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>

            <Link
              href="/bill-history"
              className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                pathname === "/bill-history"
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
              }`}
            >
              <span className="relative z-10">Bill History</span>
              {pathname !== "/bill-history" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>

            <Link
              href="/appliance-management"
              className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                pathname === "/appliance-management"
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
              }`}
            >
              <span className="relative z-10">Appliances</span>
              {pathname !== "/appliance-management" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Notification Bell Icon (Mobile) - Enhanced */}
            <button
              onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
              className="relative p-2.5 text-gray-600 hover:text-blue-600 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 focus:outline-none shadow-md shadow-gray-200/50 hover:shadow-blue-200/50 group"
              title="View Notifications"
            >
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[1rem] h-4 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md shadow-red-500/30 animate-pulse ring-1 ring-white">
                {getUnreadCount()}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-gray-600 hover:text-blue-600 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 focus:outline-none shadow-md shadow-gray-200/50 hover:shadow-blue-200/50 group"
            >
              <svg
                className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Profile */}
          <div className="relative hidden md:flex items-center space-x-4">
            {/* Notification Bell Icon - Enhanced */}
            <div className="relative">
              <button
                onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
                className="relative p-3 text-gray-600 hover:text-blue-600 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg shadow-gray-200/50 hover:shadow-blue-200/50 hover:scale-105 group"
                title="View Notifications"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg
                  className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {/* Notification Badge - Enhanced */}
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/30 animate-pulse ring-2 ring-white">
                  {getUnreadCount()}
                </span>
              </button>

              {/* Notification Panel - Enhanced */}
              {notificationPanelOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-2xl shadow-gray-900/10 py-3 z-30 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-300">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Notifications</h3>
                      {isOfflineMode && (
                        <div className="flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>Offline</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Dynamic Notifications - Enhanced */}
                  <div className="space-y-1 p-2">
                    {notifications.length === 0 ? (
                      <div className="px-6 py-8 text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <p className="font-medium">No notifications yet</p>
                        <p className="text-sm mt-1">We&apos;ll notify you when something important happens</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification._id || notification.id} 
                          className={`mx-2 p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                            !notification.read 
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50' 
                              : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                          }`}
                          onClick={() => markAsRead(notification._id || notification.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`h-3 w-3 rounded-full ${
                                notification.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                notification.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                notification.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                'bg-gradient-to-r from-red-500 to-red-600'
                              } shadow-sm`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2 font-medium">{formatTimeAgo(notification.timestamp)}</p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0 mt-1">
                                <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <Link 
                      href="/notifications" 
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                      onClick={() => setNotificationPanelOpen(false)}
                    >
                      View All Notifications
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/profile-setting" className="relative group">
              <div className="h-12 w-12 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 ring-2 ring-transparent group-hover:ring-blue-400 group-hover:ring-offset-2 transition-all duration-300 shadow-lg shadow-gray-200/50 group-hover:shadow-blue-200/50 group-hover:scale-105">
                <Image
                  src="/images/profileimg.jpg"
                  alt="User profile"
                  width={48}
                  height={48}
                  className="object-cover rounded-2xl"
                />
              </div>
            </Link>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 focus:outline-none group"
            >
              <svg
                className={`h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-all duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-2xl shadow-gray-900/10 py-2 z-20 animate-in slide-in-from-top-2 duration-300">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Quick Actions</p>
                </div>
                <Link
                  href="/notifications"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group"
                >
                  <svg className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </Link>
                <Link href="/Authentication" passHref>
                  <button
                    onClick={() => alert("Logout clicked")}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 group"
                  >
                    <svg className="h-4 w-4 mr-3 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2 border-t pt-4">
            <Link
              href="/dashboard"
              className={`block px-4 py-2 rounded-md ${
                pathname === "/dashboard"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/bill-history"
              className={`block px-4 py-2 rounded-md ${
                pathname === "/bill-history"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Bill History
            </Link>

            {/* Profile Section (Mobile) */}
            <div className="px-4 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Link href="/profile-setting">
                  <div className="h-10 w-10 rounded-full overflow-hidden  bg-gray-900 ring-2 ring-transparent hover:ring-blue-600">
                    <Image
                      src="/images/profileimg.jpg"
                      alt="User profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                >
                  <svg
                    className="h-4 w-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {profileDropdownOpen && (
                <div className="mt-2 space-y-2">
                  <Link
                    href="/notifications"
                    className="block px-2 py-1 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Notifications
                  </Link>
                  <button
                    onClick={() => alert("Logout clicked")}
                    className="block w-full text-left px-2 py-1 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Notification Panel */}
        {notificationPanelOpen && (
          <div className="md:hidden mt-2 border-t pt-4 bg-gray-50">
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h3>
              
              {/* Dynamic Notifications for Mobile */}
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="bg-white p-4 rounded-lg border text-center text-gray-500">
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification._id || notification.id} 
                      className={`bg-white p-3 rounded-lg border cursor-pointer ${!notification.read ? 'ring-2 ring-blue-200' : ''}`}
                      onClick={() => markAsRead(notification._id || notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`h-2 w-2 bg-${notification.color}-600 rounded-full mt-2`}></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(notification.timestamp)}</p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <Link 
                  href="/notifications" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setNotificationPanelOpen(false)}
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
