import Actions from '../actions';

export const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS_REQUESTED:
      return { ...state, loading: true };
    case Actions.GET_USERS_RECEIVED:
      return { ...state, users: action.users, loading: false };
    case Actions.GET_USERS_FAILED:
      return { ...state, users: [], loading: false };
    case Actions.UPDATE_USER_REQUESTED: {
      const updatedUsers = state.users.map((user) =>
        user.id === action.user.id ? action.user : user,
      );
      return { ...state, users: updatedUsers };
    }
    case Actions.UPDATE_USER_SUCCESS: {
      return state;
    }
    case Actions.UPDATE_USER_FAILED: {
      let updatedUsers = state.users.map((user) =>
        user.id === action.data.user.id
          ? { ...action.data.user, isDisabled: !action.data.user.isDisabled }
          : user,
      );
      return { ...state, users: updatedUsers };
    }
    default:
      return state;
  }
}
