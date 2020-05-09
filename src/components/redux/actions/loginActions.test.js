import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import apiClient from '../../apiClient';
import * as loginActions from './loginActions';
import ActionTypes from './index';
import loginSuccessMock from '../mocks/loginSuccess';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../apiClient');

const expectedCredentials = {
  username: 'Joe Bloggs',
  password: 'superSecret',
};

describe('Actions > Login', () => {
  it('should create an action when login is requested', () => {
    const expected = {
      type: ActionTypes.LOGIN_REQUESTED,
      credentials: expectedCredentials,
    };

    expect(loginActions.loginRequested('Joe Bloggs', 'superSecret')).toEqual(
      expected,
    );
  });

  it('should create an action when login fails', () => {
    const errors = 'Something went wrong!';
    const expected = {
      type: ActionTypes.LOGIN_FAILED,
      errors: errors,
    };

    expect(loginActions.loginFailed(errors)).toEqual(expected);
  });

  it('should create an action when login successful', () => {
    const expected = {
      type: ActionTypes.LOGIN_SUCCESS,
      authData: loginSuccessMock,
    };

    expect(loginActions.loginSuccess(loginSuccessMock)).toEqual(expected);
  });

  it('should call login endpoint', () => {
    apiClient.post.mockImplementationOnce(() =>
      Promise.resolve({ data: loginSuccessMock }),
    );

    const expectedActions = [
      { type: ActionTypes.LOGIN_REQUESTED, credentials: expectedCredentials },
      { type: ActionTypes.LOGIN_SUCCESS, authData: { ...loginSuccessMock } },
    ];

    const store = mockStore({ usersList: {} });

    return store
      .dispatch(loginActions.login('Joe Bloggs', 'superSecret'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
