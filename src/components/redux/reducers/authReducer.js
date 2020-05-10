import { getToken } from '../../../utils/cookieHelper';
import Actions from '../actions';
import AuthStatus from '../../../enums/authStatus';

export const initialSate = {
  authStatus: AuthStatus.NOT_AUTHENTICATED,
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case Actions.LOGIN_REQUESTED:
      return { ...initialSate };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        authStatus: AuthStatus.LOGGED_IN,
      };
    case Actions.LOGIN_FAILED:
      return { ...initialSate };
    case Actions.GET_AUTH_STATUS: {
      const token = getToken();
      return {
        ...state,
        authStatus:
          token && token.length > 0
            ? AuthStatus.LOGGED_IN
            : AuthStatus.NOT_AUTHENTICATED,
      };
    }
    case Actions.LOGOUT_SUCCESS: {
      return { ...state, authStatus: AuthStatus.NOT_AUTHENTICATED };
    }
    default:
      return state;
  }
}
