import axios from 'axios';

import { setCookie, getCookie } from '../utils/cookieHelper';
import endpoints from '../endpoints';

const baseUrl = process.env.API_URL;

// global axios configurations
const apiClient = axios.create(() => {
  return {
    baseURL: baseUrl,
    headers: {
      post: {
        'Content-Type': 'application/json',
      },
    },
  };
});

export const tokenSelector = (state) => state.auth.accessToken;

export const setAuthHeader = () => {
  const token = getCookie('token');
  if (token && token.length > 0) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export function setApiInterceptors() {
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve) => {
        const originalReq = err.config;
        if (err.response.status === 401) {
          let res = fetch(baseUrl + endpoints.refreshToken(), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
              accessToken: getCookie('token'),
              refreshToken: getCookie('refreshToken'),
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setCookie('token', res.accessToken, 10);
              setCookie('refreshToken', res.refreshToken, 60 * 24 * 30);
              originalReq.headers[
                'Authorization'
              ] = `Bearer ${res.accessToken}`;

              return apiClient(originalReq);
            });

          resolve(res);
        }

        return Promise.reject(err);
      });
    },
  );
}

export default apiClient;

module.exports = apiClient;
