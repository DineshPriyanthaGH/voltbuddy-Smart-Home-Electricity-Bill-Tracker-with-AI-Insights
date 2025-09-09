// Central API configuration
export const API_CONFIG = {
  BASE_URL: 'https://voltbuddy-smart-home-electricity-bi.vercel.app/api',
  // Fallback for development
  DEV_URL: 'http://localhost:5001/api'
};

// Get the appropriate API URL
export const getApiUrl = () => {
  // Force production URL
  return API_CONFIG.BASE_URL;
};

// Export for easy use
export const API_BASE_URL = getApiUrl();
