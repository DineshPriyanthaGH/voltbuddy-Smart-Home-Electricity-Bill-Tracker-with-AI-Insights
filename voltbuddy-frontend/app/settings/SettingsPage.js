"use client";

import React, { useState } from "react";
import { Bell, Save, Settings, Shield, AlertCircle } from "lucide-react";

import NavBar from "../dashboard/Navbar"; // Adjust path if needed

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    billReminders: true,
    billIncrease: true,
    energyTips: false,
    systemUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    locationTracking: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    currency: "LKR",
    dateFormat: "DD/MM/YYYY",
  });

  const [feedback, setFeedback] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationChange = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePrivacyChange = (key) =>
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePreferenceChange = (key, value) =>
    setPreferences((prev) => ({ ...prev, [key]: value }));

  const handleSaveSettings = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted! Thank you.");
    setFeedback("");
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-gray-200"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const SettingSection = ({ title, icon, children }) => (
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

  const SettingItem = ({ label, description, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="font-medium text-gray-800">{label}</div>
        {description && (
          <div className="text-sm text-gray-600 mt-1">{description}</div>
        )}
      </div>
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
          <p className="text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </div>

        {/* Preferences */}
        <SettingSection
          title="Preferences"
          icon={<Settings className="text-purple-600" size={18} />}
        >
          <SettingItem label="Language">
            <select
              disabled
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-500 cursor-not-allowed focus:ring-blue-500"
            >
              <option>English</option>
            </select>
          </SettingItem>

          <SettingItem label="Currency">
            <select
              value={preferences.currency}
              onChange={(e) =>
                handlePreferenceChange("currency", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-blue-500"
            >
              <option value="LKR">LKR (Sri Lankan Rupee)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </SettingItem>

          <SettingItem label="Date Format">
            <select
              value={preferences.dateFormat}
              onChange={(e) =>
                handlePreferenceChange("dateFormat", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </SettingItem>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          title="Notifications"
          icon={<Bell className="text-blue-600" size={18} />}
        >
          {Object.entries(notifications).map(([key, value]) => (
            <SettingItem
              key={key}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            >
              <ToggleSwitch
                enabled={value}
                onChange={() => handleNotificationChange(key)}
              />
            </SettingItem>
          ))}
        </SettingSection>

        {/* Privacy */}
        <SettingSection
          title="Privacy & Data"
          icon={<Shield className="text-green-600" size={18} />}
        >
          {Object.entries(privacy).map(([key, value]) => (
            <SettingItem
              key={key}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            >
              <ToggleSwitch enabled={value} onChange={() => handlePrivacyChange(key)} />
            </SettingItem>
          ))}
        </SettingSection>

        {/* Feedback & Support */}
        <SettingSection
          title="Feedback & Support"
          icon={<AlertCircle className="text-yellow-600" size={18} />}
        >
          <form onSubmit={handleFeedbackSubmit} className="w-full">
            <textarea
              placeholder="Tell us what you think or report an issue..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </form>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md"
          >
            <Save size={16} />
            <span>Save All Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
