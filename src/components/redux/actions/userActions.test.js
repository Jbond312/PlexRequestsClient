import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import axios from 'axios';

import * as userActions from './userActions';
import ActionTypes from './index';
import usersMock from '../mocks/usersList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('axios');

describe('Actions > GetUsers', () => {
  it('should create an action when users are requested', () => {
    const expected = {
      type: ActionTypes.GET_USERS_REQUESTED,
    };

    expect(userActions.getUsersRequested()).toEqual(expected);
  });

  it('should create an action when users request fails', () => {
    const errors = 'Something went wrong!';
    const expected = {
      type: ActionTypes.GET_USERS_FAILED,
      errors: errors,
    };

    expect(userActions.getUsersFailed(errors)).toEqual(expected);
  });

  it('should create an action when users received', () => {
    const expected = {
      type: ActionTypes.GET_USERS_RECEIVED,
      users: usersMock,
    };

    expect(userActions.getUsersReceived(usersMock)).toEqual(expected);
  });

  it('should fetchUsersList', () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: usersMock }),
    );

    const expectedActions = [
      { type: ActionTypes.GET_USERS_REQUESTED },
      { type: ActionTypes.GET_USERS_RECEIVED, users: usersMock },
    ];

    const store = mockStore({ usersList: {} });

    return store.dispatch(userActions.getUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Actions > UpdateUser', () => {
  it('should create an action when update user is requested', () => {
    const user = usersMock[0];
    const expected = {
      type: ActionTypes.UPDATE_USER_REQUESTED,
      user,
    };

    expect(userActions.updateUserRequested(user)).toEqual(expected);
  });

  it('should create an action when update user request fails', () => {
    const user = usersMock[0];
    const errors = 'Something went wrong!';
    const failedData = { errors, user };
    const expected = {
      type: ActionTypes.UPDATE_USER_FAILED,
      data: failedData,
    };

    expect(userActions.updateUserFailed(failedData)).toEqual(expected);
  });

  it('should create an action when update user succeeds', () => {
    const expected = {
      type: ActionTypes.UPDATE_USER_SUCCESS,
    };

    expect(userActions.updateUserSuccess()).toEqual(expected);
  });

  it('should updateUser', () => {
    const user = usersMock[0];
    axios.put.mockImplementationOnce(() =>
      Promise.resolve({ data: usersMock }),
    );

    const expectedActions = [
      { type: ActionTypes.UPDATE_USER_REQUESTED, user },
      { type: ActionTypes.UPDATE_USER_SUCCESS },
    ];

    const store = mockStore({ usersList: {} });

    return store.dispatch(userActions.updateUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
