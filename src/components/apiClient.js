import axios from 'axios';
const baseUrl = process.env.API_URL;

// global axios configurations
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

export const tokenSelector = (state) => state.auth.accessToken;

export const setAuthHeader = (token) => {
  if (token && token.length > 0) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export default apiClient;
