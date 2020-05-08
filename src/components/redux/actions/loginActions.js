import axios from 'axios';
import ActionTypes from './index';
import endpoints from '../../../endpoints';
const baseUrl = process.env.API_URL;

export function loginRequested(username, password) {
  return {
    type: ActionTypes.LOGIN_REQUESTED,
    credentials: { username, password },
  };
}

export function loginSuccess(authData) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    authData: authData,
  };
}

export function loginFailed(errors) {
  return {
    type: ActionTypes.LOGIN_FAILED,
    errors: errors,
  };
}

export function login(username, password) {
  return function (dispatch) {
    dispatch(loginRequested(username, password));
    const uri = baseUrl + endpoints.login();
    return axios
      .post(uri, {
        username,
        password,
      })
      .then(
        (response) => {
          if (
            response.data.accessToken.length > 0 &&
            response.data.refreshToken > 0
          ) {
            return dispatch(loginSuccess(response.data));
          } else {
            return dispatch(loginFailed('Unexpected exception'));
          }
        },
        (errors) => dispatch(loginFailed(errors)),
      );
  };
}
