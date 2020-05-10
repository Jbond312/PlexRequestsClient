import {
  setToken,
  setRefreshToken,
  clearCookies,
} from '../../../utils/cookieHelper';
import apiClient from '../../apiClient';
import ActionTypes from './index';
import endpoints from '../../../endpoints';
const baseUrl = process.env.API_URL;

export function loginRequested(username, password) {
  return {
    type: ActionTypes.LOGIN_REQUESTED,
    credentials: { username, password },
  };
}

export function loginSuccess() {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
  };
}

export function loginFailed(errors) {
  return {
    type: ActionTypes.LOGIN_FAILED,
    errors: errors,
  };
}

export function getAuthStatus() {
  return {
    type: ActionTypes.GET_AUTH_STATUS,
  };
}

export function logoutSuccess() {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
}

export function login(username, password) {
  return function (dispatch) {
    dispatch(loginRequested(username, password));
    const uri = baseUrl + endpoints.login();
    return apiClient
      .post(uri, {
        username,
        password,
      })
      .then(
        (response) => {
          if (
            response.data.accessToken.length > 0 &&
            response.data.refreshToken.length > 0
          ) {
            setToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            return dispatch(loginSuccess());
          } else {
            return dispatch(loginFailed('Unexpected exception'));
          }
        },
        (errors) => dispatch(loginFailed(errors)),
      );
  };
}

export function logout() {
  return function (dispatch) {
    clearCookies();
    return dispatch(logoutSuccess());
  };
}
