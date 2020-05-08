import reducer from './loginReducer';
import * as Actions from '../actions/loginActions';
import loginSuccessMock from '../mocks/loginSuccess';
import loginResetMock from '../mocks/loginResetMock';

let initialSate;

describe('Reducers > Login', () => {
  beforeEach(() => {
    initialSate = {
      accessToken: undefined,
      refreshToken: undefined,
      isAuthenticated: false,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialSate);
  });

  it('should handle LOGIN_REQUESTED', () => {
    const reducerUnderTest = reducer(undefined, Actions.loginRequested());

    const expected = {
      ...initialSate,
      isAuthenticated: false,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const reducerUnderTest = reducer(
      undefined,
      Actions.loginSuccess(loginSuccessMock),
    );

    const expected = {
      ...initialSate,
      ...loginSuccessMock,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle LOGIN_FAILED', () => {
    const reducerUnderTest = reducer(undefined, Actions.loginFailed());

    const expected = {
      ...initialSate,
      ...loginResetMock,
    };

    expect(reducerUnderTest).toEqual(expected);
  });
});
