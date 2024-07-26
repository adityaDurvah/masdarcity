// apiManager.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://masdarcity--preprod.sandbox.my.salesforce-sites.com/DocumentVerification/services/apexrest/V1/API_MobileAPP', // Replace with your API base URL
  timeout: 10000, // Set a timeout limit
  headers: {
    // 'Content-Type': 'application/json',
  },
});

// Request interceptor to add headers like Authorization
// apiClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // Modify config before sending the request
//     // Example: Add an Authorization token
//     const token = 'your-auth-token'; // Replace with logic to get the token
//     if (token) {
//       // config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// Response interceptor to handle responses and errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data if needed
    return response;
  },
  (error) => {
    // Handle response error
    console.log('error', error);
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getApiData = <T,>(path: string, params: any) => {
  const [data, setData] = useState<T | null>(null);
  const getData = async () => {
    try {
      const response = await apiClient.get(path, { params });
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return { data, getData };
};

export default apiClient;
