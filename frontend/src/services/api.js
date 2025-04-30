import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sneh-food-donation.onrender.com/api'
  : 'http://localhost:5000/api';

// Create axios instance for regular requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Create axios instance for file uploads
const fileUploadApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
});

// Add token to requests if it exists
const addTokenToRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add request interceptors
api.interceptors.request.use(addTokenToRequest);
fileUploadApi.interceptors.request.use(addTokenToRequest);

// Add response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      let errorMessage = 'An error occurred';

      if (status === 400) {
        errorMessage = data.message || 'Invalid request data';
      } else if (status === 401) {
        errorMessage = data.message || 'Unauthorized access';
        // Clear token and redirect to login if unauthorized
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (status === 404) {
        errorMessage = data.message || 'Resource not found';
      } else if (status === 500) {
        errorMessage = data.message || 'Server error';
      }

      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request');
    }
  }
);

fileUploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = 'An error occurred';

      if (status === 400) {
        errorMessage = data.message || 'Invalid file or request data';
      } else if (status === 401) {
        errorMessage = data.message || 'Unauthorized access';
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (status === 413) {
        errorMessage = 'File size too large. Maximum size is 5MB';
      } else if (status === 500) {
        errorMessage = data.message || 'Server error';
      }

      throw new Error(errorMessage);
    }
    throw error;
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      // Use fileUploadApi for registration since it might include file uploads
      const response = await fileUploadApi.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data && response.data.token) {
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/users/logout');
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error(error.message || 'Logout failed');
    }
  }
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

// Food Donation API
export const foodDonationAPI = {
  createDonation: (donationData) => fileUploadApi.post('/food-donations', donationData),
  getDonations: (params) => api.get('/food-donations', { params }),
  getMyDonations: () => api.get('/food-donations/my'),
  updateDonation: (id, donationData) => api.put(`/food-donations/${id}`, donationData),
  deleteDonation: (id) => api.delete(`/food-donations/${id}`),
};

// Organization API
export const organizationAPI = {
  getOrganizations: (params) => api.get('/organizations', { params }),
  getOrganization: (id) => api.get(`/organizations/${id}`),
  createOrganization: (orgData) => api.post('/organizations', orgData),
  updateOrganization: (id, orgData) => api.put(`/organizations/${id}`, orgData),
};

// Donation Transaction API
export const transactionAPI = {
  createTransaction: (transactionData) => api.post('/transactions', transactionData),
  getMyTransactions: () => api.get('/transactions/my'),
  updateTransaction: (id, transactionData) => api.put(`/transactions/${id}`, transactionData),
};

// Admin API
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getAllDonations: () => api.get('/admin/donations'),
  getAllOrganizations: () => api.get('/admin/organizations'),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getAllVolunteers: () => api.get('/volunteers'),
};

// Volunteer API
export const volunteerAPI = {
  register: (volunteerData) => api.post('/volunteers/register', volunteerData),
  getProfile: () => api.get('/volunteers/profile'),
  updateProfile: (profileData) => api.put('/volunteers/profile', profileData),
  completeTask: (taskId) => api.post(`/volunteers/complete-task/${taskId}`),
};

export default api; 