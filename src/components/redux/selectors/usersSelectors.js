export const getUsers = (state) => getState(state).users || [];
export const getUserRoles = (state) => getState(state).userRoles || [];
export const getIsLoading = (state) => getState(state).loading || false;

const getState = (state) => state.usersList || {};
