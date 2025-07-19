"use client";

import React, { useState } from "react";
import { Bell, Save, Settings, Globe } from "lucide-react";
import NavBar from "../dashboard/Navbar"; // Adjust path as needed

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    billReminders: true,
    systemUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const preferences = {
    currency: "LKR",
    dateFormat: "DD/MM/YYYY",
    language: "English",
  };

  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveSettings = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  const Item = ({ label, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="font-medium text-gray-800">{label}</div>
      <div className="ml-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Save size={16} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>

        {/* Preferences Section */}
        <Section title="Preferences" icon={<Settings className="text-purple-600" size={18} />}>
          {Object.entries(preferences).map(([key, value]) => (
            <Item key={key} label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}>
              <div className="px-3 py-2 border border-gray-200 rounded-lg text-gray-500">{value}</div>
            </Item>
          ))}
        </Section>

        {/* Notifications Section */}
        <Section title="Notifications" icon={<Bell className="text-blue-600" size={18} />}>
          {Object.entries(notifications).map(([key, value]) => (
            <Item
              key={key}
              label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            >
              <ToggleSwitch
                enabled={value}
                onToggle={() => handleNotificationToggle(key)}
              />
            </Item>
          ))}
        </Section>

        {/* About Section */}
        <Section title="About" icon={<Globe className="text-gray-600" size={18} />}>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="font-medium">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium">July 19, 2025</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex space-x-6">
                <button className="text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</button>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">Terms of Service</button>
                <button className="text-blue-600 hover:text-blue-700 transition-colors">Help Center</button>
              </div>
            </div>
          </div>
        </Section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md"
          >
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
