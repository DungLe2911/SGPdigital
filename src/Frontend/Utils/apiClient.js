import axios from 'axios';

let externalNavigate = null;
let externalToast = null;

export const setupApiClient = ({ navigate, toast }) => {
  externalNavigate = navigate;
  externalToast = toast;
};

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // change to your API base URL
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
        const {redirect, url, message} = response.data;
        if(redirect){
            externalToast.success(message);
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
              externalNavigate(data.url || '/login');
            } else if (data?.message && externalToast) {
              externalToast.error(data.message);
            }
          } else {
            // Handle errors without a response (e.g., network errors)
            if (externalToast) {
              externalToast.error('An unexpected error occurred.');
            }
          }
      
          return Promise.reject(error);
      
    }
);

export default apiClient;
