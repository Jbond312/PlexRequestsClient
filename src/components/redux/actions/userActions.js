import apiClient from '../../apiClient';
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

export function getUserRolessRequested() {
  return {
    type: ActionTypes.GET_USERROLES_REQUESTED,
  };
}

export function getUserRolesReceived(userRoles) {
  return {
    type: ActionTypes.GET_USERROLES_RECEIVED,
    userRoles: userRoles,
  };
}

export function getUserRolesFailed(errors) {
  return {
    type: ActionTypes.GET_USERROLES_FAILED,
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

export function getUsers(includeDisabled = true) {
  return function (dispatch) {
    dispatch(getUsersRequested());
    const uri = baseUrl + endpoints.getUsers(includeDisabled);
    return apiClient.get(uri).then(
      (response) => dispatch(getUsersReceived(response.data.users)),
      (errors) => dispatch(getUsersFailed(errors)),
    );
  };
}

export function getUserRoles() {
  return function (dispatch) {
    dispatch(getUserRolessRequested());
    const uri = baseUrl + endpoints.getUserRoles();
    return apiClient.get(uri).then(
      (response) => dispatch(getUserRolesReceived(response.data)),
      (errors) => dispatch(getUserRolesFailed(errors)),
    );
  };
}

export function updateUser(user) {
  return function (dispatch) {
    dispatch(updateUserRequested(user));
    const uri = baseUrl + endpoints.upateUser(user);
    return apiClient.put(uri, user).then(
      () => dispatch(updateUserSuccess(user)),
      (errors) => dispatch(updateUserFailed({ errors, user })),
    );
  };
}
