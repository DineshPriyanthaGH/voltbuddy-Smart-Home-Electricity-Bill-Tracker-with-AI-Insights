'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('voltbuddy_notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        console.log('📱 Loaded', parsed.length, 'notifications from localStorage');
      } catch (error) {
        console.error('❌ Error parsing saved notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('voltbuddy_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ No token found, using offline mode');
      setIsOfflineMode(true);
      return;
    }

    console.log('🔄 Fetching notifications from backend...');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Notifications fetched:', data.notifications?.length || 0, 'notifications');
        
        // Log the structure of the first notification for debugging
        if (data.notifications && data.notifications.length > 0) {
          console.log('📋 First notification structure:', {
            hasId: !!data.notifications[0].id,
            has_id: !!data.notifications[0]._id,
            keys: Object.keys(data.notifications[0])
          });
        }
        
        setNotifications(data.notifications || []);
        setIsOfflineMode(false);
      } else {
        if (response.status === 404) {
          console.error('❌ Backend server not running - switching to offline mode');
          setIsOfflineMode(true);
        } else {
          console.error('❌ Failed to fetch notifications:', response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
      console.error('🔧 Backend server not available - using offline mode');
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    console.log(`🔄 Attempting to mark notification as read: ${notificationId}`);

    try {
      const response = await fetch(`http://localhost:5001/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`✅ Successfully marked notification as read: ${notificationId}`);
        setNotifications(prev => 
          prev.map(notification => 
            notification._id === notificationId 
              ? { ...notification, read: true }
              : notification
          )
        );
      } else {
        const errorData = await response.json();
        console.error(`❌ Failed to mark notification as read. Status: ${response.status}`, errorData);
      }
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
    }
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationTime) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return notificationTime.toLocaleDateString();
    }
  };

  // Add notification color based on type
  const getNotificationColor = (type) => {
    switch (type) {
      case 'bill_due':
        return 'blue';
      case 'reminder':
        return 'yellow';
      case 'system':
        return 'green';
      case 'ai-tip':
        return 'purple';
      case 'appliance':
        return 'orange';
      default:
        return 'gray';
    }
  };

  // Add appliance notification
  const addApplianceNotification = (applianceName) => {
    const newNotification = {
      id: Date.now().toString(),
      type: 'appliance',
      title: 'New Appliance Added',
      message: `${applianceName} has been successfully added to your appliances`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    console.log('✅ Appliance notification added:', newNotification);
  };

  // Add appliance update notification
  const addApplianceUpdateNotification = (applianceName) => {
    const newNotification = {
      id: Date.now().toString(),
      type: 'appliance',
      title: 'Appliance Updated',
      message: `${applianceName} has been successfully updated`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    console.log('✅ Appliance update notification added:', newNotification);
  };

  // Add appliance delete notification
  const addApplianceDeleteNotification = (applianceName) => {
    const newNotification = {
      id: Date.now().toString(),
      type: 'appliance',
      title: 'Appliance Removed',
      message: `${applianceName} has been successfully removed from your appliances`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    console.log('✅ Appliance delete notification added:', newNotification);
  };

  // Add bill calculation notification
  const addBillCalculationNotification = (billAmount, dueDate) => {
    // Format the due date for display
    const dueDateObj = new Date(dueDate);
    const dueDateFormatted = dueDateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const newNotification = {
      id: Date.now().toString(),
      type: 'bill_due',
      title: 'New Bill Calculated',
      message: `Your electricity bill of LKR ${billAmount} has been calculated. Due date: ${dueDateFormatted}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    console.log('✅ Bill calculation notification added:', newNotification);
  };

  // Transform notifications with additional properties
  const transformedNotifications = notifications.map(notification => ({
    ...notification,
    color: getNotificationColor(notification.type)
  }));

  // Auto-refresh notifications every 5 minutes
  useEffect(() => {
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications: transformedNotifications,
    loading,
    isOfflineMode,
    fetchNotifications,
    markAsRead,
    getUnreadCount,
    formatTimeAgo,
    addApplianceNotification,
    addApplianceUpdateNotification,
    addApplianceDeleteNotification,
    addBillCalculationNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
