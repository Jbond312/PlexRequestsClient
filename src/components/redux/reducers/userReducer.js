import Actions from "../actions";
import initialState from "./initialState";

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS_REQUESTED:
      return { ...state, loading: true };
    case Actions.GET_USERS_RECEIVED:
      return { ...state, users: action.users, loading: false };
    case Actions.GET_USERS_FAILED:
      return { ...state, users: [], loading: false };
    default:
      return state;
  }
}
