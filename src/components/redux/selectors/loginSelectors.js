export const getIsAuthenticated = (state) =>
  getState(state).isAuthenticated || false;
export const getAccessToken = (state) => getState(state).accessToken;
export const getRefreshToken = (state) => getState(state).refreshToken;

const getState = (state) => state.auth || {};
