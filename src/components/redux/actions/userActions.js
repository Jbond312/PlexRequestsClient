import axios from 'axios';
import ActionTypes from './index';
import endpoints from '../../../endpoints';
const baseUrl = process.env.API_URL;

export function getUsersRequested() {
  return {
    type: ActionTypes.GET_USERS_REQUESTED,
  };
}

export function getUsersReceived(users) {
  return {
    type: ActionTypes.GET_USERS_RECEIVED,
    users: users,
  };
}

export function getUsersFailed(errors) {
  return {
    type: ActionTypes.GET_USERS_FAILED,
    errors: errors,
  };
}

export function updateUserRequested(user) {
  return {
    type: ActionTypes.UPDATE_USER_REQUESTED,
    user: user,
  };
}

export function updateUserSuccess() {
  return {
    type: ActionTypes.UPDATE_USER_SUCCESS,
  };
}

export function updateUserFailed(data) {
  return {
    type: ActionTypes.UPDATE_USER_FAILED,
    data: data,
  };
}

export function getUsers() {
  return function (dispatch) {
    dispatch(getUsersRequested());
    const uri = baseUrl + endpoints.getUsers();
    return axios.get(uri).then(
      (response) => dispatch(getUsersReceived(response.data)),
      (errors) => dispatch(getUsersFailed(errors)),
    );
  };
}

export function updateUser(user) {
  return function (dispatch) {
    dispatch(updateUserRequested(user));
    const uri = baseUrl + endpoints.upateUser(user);
    return axios.put(uri, user).then(
      () => dispatch(updateUserSuccess(user)),
      (errors) => dispatch(updateUserFailed({ errors, user })),
    );
  };
}
