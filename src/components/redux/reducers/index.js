import { combineReducers } from "redux";
import users from "./userReducer";

const rootReducer = combineReducers({
  usersList: users,
});

export default rootReducer;
