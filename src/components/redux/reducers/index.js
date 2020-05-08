import { combineReducers } from 'redux';
import users from './userReducer';
import auth from './loginReducer';

const rootReducer = combineReducers({
  usersList: users,
  auth: auth,
});

export default rootReducer;
