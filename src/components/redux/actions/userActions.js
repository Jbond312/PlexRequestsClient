import axios from "axios";
import ActionTypes from "./index";
import endpoints from "../../../endpoints";
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

export function getUsers() {
  return function (dispatch) {
    dispatch(getUsersRequested());
    const uri = baseUrl + endpoints.getUsers();
    return axios.get(uri).then(
      (response) => dispatch(getUsersReceived(response.data)),
      (errors) => dispatch(getUsersFailed(errors))
    );
  };
}
