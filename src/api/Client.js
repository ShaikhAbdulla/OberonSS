// src/api/client.js

import axios from "axios";
import { BASE_URL } from "./Endpoint";
import { getToken, removeToken, removeUserData } from "./TokenManager";
import { ToastMessage } from "../Utils";
import { resetToLogin } from "../navigation/NavigationService";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token
client.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
client.interceptors.response.use(
  (response) => response,


  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        if (data.message == 'Invalid username or password.') {
          ToastMessage(data.message)

        } else {
          await removeToken();
          await removeUserData()
          resetToLogin();
          ToastMessage('session expired');
          ToastMessage('logged out');
        }
        // Optional: Redirect to Login
      } else if (status >= 400 && status < 500) {
        ToastMessage(data.message || 'Request failed');
      } else {
        ToastMessage('Something went wrong. Please try again.');
      }
    } else {
      ToastMessage('Network error. Please check your internet.');
    }
    return Promise.reject(error);
  }
);

export default client;
