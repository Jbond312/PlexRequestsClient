import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import apiClient from '../../apiClient';
import * as userActions from './userActions';
import ActionTypes from './index';
import usersMock from '../mocks/usersList';
import userRoles from '../mocks/userRoles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../apiClient');

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
    apiClient.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { users: usersMock } }),
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

describe('Actions > GetUserRoles', () => {
  it('should create an action when users roles are requested', () => {
    const expected = {
      type: ActionTypes.GET_USERROLES_REQUESTED,
    };

    expect(userActions.getUserRolessRequested()).toEqual(expected);
  });

  it('should create an action when user roles request fails', () => {
    const errors = 'Something went wrong!';
    const expected = {
      type: ActionTypes.GET_USERROLES_FAILED,
      errors: errors,
    };

    expect(userActions.getUserRolesFailed(errors)).toEqual(expected);
  });

  it('should create an action when user roles received', () => {
    const expected = {
      type: ActionTypes.GET_USERROLES_RECEIVED,
      userRoles: userRoles,
    };

    expect(userActions.getUserRolesReceived(userRoles)).toEqual(expected);
  });

  it('should fetchUserRoles', () => {
    apiClient.get.mockImplementationOnce(() =>
      Promise.resolve({ data: userRoles }),
    );

    const expectedActions = [
      { type: ActionTypes.GET_USERROLES_REQUESTED },
      { type: ActionTypes.GET_USERROLES_RECEIVED, userRoles: userRoles },
    ];

    const store = mockStore({ usersList: {} });

    return store.dispatch(userActions.getUserRoles()).then(() => {
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
    apiClient.put.mockImplementationOnce(() =>
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
