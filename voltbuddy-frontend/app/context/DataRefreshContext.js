"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

const DataRefreshContext = createContext();

export const useDataRefresh = () => {
  const context = useContext(DataRefreshContext);
  if (!context) {
    throw new Error('useDataRefresh must be used within a DataRefreshProvider');
  }
  return context;
};

export const DataRefreshProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastUpdated, setLastUpdated] = useState({
    bills: null,
    appliances: null,
    energyTips: null,
    predictions: null,
  });

  // Trigger refresh for all dashboard components
  const triggerGlobalRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    setLastUpdated(prev => ({
      ...prev,
      bills: new Date().toISOString(),
      appliances: new Date().toISOString(),
      energyTips: new Date().toISOString(),
      predictions: new Date().toISOString(),
    }));
  }, []);

  // Specific refresh triggers
  const triggerBillRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    setLastUpdated(prev => ({
      ...prev,
      bills: new Date().toISOString(),
      energyTips: new Date().toISOString(),
      predictions: new Date().toISOString(),
    }));
  }, []);

  const triggerApplianceRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    setLastUpdated(prev => ({
      ...prev,
      appliances: new Date().toISOString(),
      energyTips: new Date().toISOString(),
      predictions: new Date().toISOString(),
    }));
  }, []);

  // Auto-refresh energy tips and predictions after bill/appliance updates
  const triggerEnergyRefresh = useCallback(() => {
    setLastUpdated(prev => ({
      ...prev,
      energyTips: new Date().toISOString(),
      predictions: new Date().toISOString(),
    }));
  }, []);

  const value = {
    refreshTrigger,
    lastUpdated,
    triggerGlobalRefresh,
    triggerBillRefresh,
    triggerApplianceRefresh,
    triggerEnergyRefresh,
  };

  return (
    <DataRefreshContext.Provider value={value}>
      {children}
    </DataRefreshContext.Provider>
  );
};
