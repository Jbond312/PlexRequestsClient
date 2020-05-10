import AuthStatus from '../../../enums/authStatus';

export const getAuthStatus = (state) =>
  getState(state).authStatus || AuthStatus.NOT_AUTHENTICATED;
export const getIsLoggedIn = (state) =>
  getAuthStatus(state) === AuthStatus.LOGGED_IN;
export const getIsNotAuthenticated = (state) =>
  getAuthStatus(state) === AuthStatus.NOT_AUTHENTICATED;

const getState = (state) => state.auth || {};
