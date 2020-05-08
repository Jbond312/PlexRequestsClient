import Actions from '../actions';

export const initialSate = {
  accessToken: undefined,
  refreshToken: undefined,
  isAuthenticated: false,
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case Actions.LOGIN_REQUESTED:
      return { ...initialSate };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.authData,
        isAuthenticated:
          action.authData.accessToken.length > 0 &&
          action.authData.refreshToken.length > 0,
      };
    case Actions.LOGIN_FAILED:
      return { ...initialSate };
    default:
      return state;
  }
}
