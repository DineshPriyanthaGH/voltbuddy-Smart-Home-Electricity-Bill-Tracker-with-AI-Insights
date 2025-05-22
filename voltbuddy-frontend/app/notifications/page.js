"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../dashboard/Navbar';
import { Footer } from '../components/Footer';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your electricity bill is due in 3 days", read: false, type: "reminder" },
    { id: 2, message: "Bill payment confirmed", read: true, type: "notification" },
    { id: 3, message: "You've reduced consumption by 15% this month", read: false, type: "notification" },
    { id: 4, message: "Reminder: Update your appliance information", read: false, type: "reminder" },
  ]);
  
  const [activeTab, setActiveTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(note => 
      note.id === id ? {...note, read: true} : note
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(note => note.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(note => ({...note, read: true})));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(note => note.type === activeTab);

  const unreadCount = notifications.filter(note => !note.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Component */}
      <Navbar />


      {/* Main Content */}
      <main className="flex-grow container mt-20 mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl text-black font-bold pt-5 mb-6">Notifications & Reminders</h1>
          
          {/* Tabs */}
          <div className="flex space-x-4 border-b mb-6">
            <button 
              className={`pb-2 px-1 ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`pb-2 px-1 ${activeTab === 'notification' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('notification')}
            >
              Notifications
            </button>
            <button 
              className={`pb-2 px-1 ${activeTab === 'reminder' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reminder')}
            >
              Reminders
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between mb-6">
            <div>
              <span className="text-sm text-gray-500">
                {filteredNotifications.length} {filteredNotifications.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="space-x-2">
              <button 
                onClick={markAllAsRead} 
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Mark all as read
              </button>
              <button 
                onClick={clearAll} 
                className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded"
              >
                Clear all
              </button>
            </div>
          </div>
          
          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border rounded-lg p-4 flex justify-between ${!notification.read ? 'bg-blue-50 border-blue-100' : 'bg-white'}`}
                >
                  <div>
                    <div className="flex items-center">
                      <div className={`mr-3 p-2 rounded-full ${notification.type === 'reminder' ? 'bg-orange-100' : 'bg-green-100'}`}>
                        {notification.type === 'reminder' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">Today at 10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-gray-500 mt-4">No {activeTab === 'all' ? 'notifications or reminders' : activeTab + 's'} found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
