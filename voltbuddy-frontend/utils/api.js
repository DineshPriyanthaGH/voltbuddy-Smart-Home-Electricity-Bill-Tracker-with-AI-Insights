import axios from 'axios';

// Import centralized API configuration
import { API_BASE_URL } from '../config/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/Authentication';
    }
    return Promise.reject(error);
  }
);

export default api;

// Specific API functions
export const chatAPI = {
  // Comprehensive data-aware chatbot that accesses ALL user data and electricity information
  askQuestion: (query) => api.post('/chat/ask', { query }),
  
  // General AI chat (original)
  generalChat: (message) => api.post('/chat/gemini', { message }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getBills: () => api.get('/bills'),
  getNotifications: () => api.get('/notifications'),
};

export const applianceAPI = {
  getAppliances: () => api.get('/appliances'),
  addAppliance: (data) => api.post('/appliances', data),
  updateAppliance: (id, data) => api.put(`/appliances/${id}`, data),
  deleteAppliance: (id) => api.delete(`/appliances/${id}`),
};

export const energyAPI = {
  getTips: () => api.get('/energy-tips'),
  getInsights: () => api.get('/insights'),
  getBillHistory: () => api.get('/bills'),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/Authentication';
  },
};
