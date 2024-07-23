// apiService.ts

import axios from 'axios';
import apiClient from './apiManager';

// Define your API functions

// Example: Get a list of items
export const getServiceListItems = async () => {

    try {
        const response = await apiClient.get('/SRList');
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
};