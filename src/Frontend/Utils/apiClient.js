import axios from 'axios';

let externalNavigate = null;
let externalToast = null;

export const setupApiClient = ({ navigate, toast }) => {
  externalNavigate = navigate;
  externalToast = toast;
};

// Function to get the appropriate base URL based on environment
const getBaseUrl = () => {
  // For local development on the same machine
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }

  // When accessing from another device on the network, use the same hostname but different port
  return `http://${window.location.hostname}:8080`;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(), // change to your API base URL
  timeout: 10000,                     // optional: request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export function createUrl(endpoint) {
  if (!endpoint || typeof endpoint !== 'string') {
    throw new Error('Endpoint must be a non-empty string');
  }

  const baseUrl = apiClient.defaults.baseURL.replace(/\/$/, '');
  const cleanedEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanedEndpoint}`;
};



apiClient.interceptors.response.use(
  (response) => {
    const { redirect, url, message } = response.data;
    externalToast.success(message);
    if (redirect) {
      externalNavigate(url);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 && data?.redirect && externalNavigate) {
        if (externalToast) {
          externalToast.error(data.message || 'Unauthorized');
        }
        localStorage.clear();
        externalNavigate(data.url || '/');
      } else if (data?.message && externalToast) {
        externalToast.error(data.message);
      }
    } else {
      if (externalToast) {
        externalToast.error('An unexpected error occurred.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
