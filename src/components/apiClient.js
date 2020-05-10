import axios from 'axios';

import {
  setToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
} from '../utils/cookieHelper';
import endpoints from '../endpoints';
import AuthStatus from '../enums/authStatus';

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

export const tokenSelector = (state) => state.auth.authStatus;

export const setAuthHeader = (authStatus) => {
  if (authStatus == AuthStatus.LOGGED_IN) {
    const token = getToken();
    if (token && token.length > 0) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  } else {
    apiClient.defaults.headers.common.Authorization = '';
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
              accessToken: getToken(),
              refreshToken: getRefreshToken(),
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setToken(res.accessToken);
              setRefreshToken(res.refreshToken);
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
