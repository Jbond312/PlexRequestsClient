export const getUsers = (state) => getState(state).users || [];
export const getIsLoading = (state) => getState(state).loading || false;

const getState = (state) => state.usersList || {};
