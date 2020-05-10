import { combineReducers } from 'redux';
import users from './userReducer';
import auth from './authReducer';
import ActionTypes from '../actions';

const appReducer = combineReducers({
  usersList: users,
  auth: auth,
});

const rootReducer = (state, action) => {
  //Reset the state when logout succeeds
  if (action.type === ActionTypes.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
