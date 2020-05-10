import reducer from './authReducer';
import * as Actions from '../actions/authActions';
import AuthStatus from '../../../enums/authStatus';
import * as cookieHelpersMock from '../../../utils/cookieHelper.js';

let initialSate;

jest.mock('../../../utils/cookieHelper.js');

describe('Reducers > Auth', () => {
  beforeEach(() => {
    initialSate = {
      authStatus: AuthStatus.NOT_AUTHENTICATED,
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialSate);
  });

  it('should handle LOGIN_REQUESTED', () => {
    const reducerUnderTest = reducer(undefined, Actions.loginRequested());

    const expected = {
      ...initialSate,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const reducerUnderTest = reducer(undefined, Actions.loginSuccess());

    const expected = {
      ...initialSate,
      authStatus: AuthStatus.LOGGED_IN,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle LOGIN_FAILED', () => {
    const reducerUnderTest = reducer(undefined, Actions.loginFailed());

    const expected = {
      ...initialSate,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle GET_AUTH_STATUS as LOGGED_IN when token returned', () => {
    jest
      .spyOn(cookieHelpersMock, 'getToken')
      .mockReturnValue('accessTokenMocked');

    const reducerUnderTest = reducer(undefined, Actions.getAuthStatus());

    const expected = {
      ...initialSate,
      authStatus: AuthStatus.LOGGED_IN,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle GET_AUTH_STATUS as NOT_AUTHENTICATED when no token returned', () => {
    jest.spyOn(cookieHelpersMock, 'getToken').mockReturnValue();

    const reducerUnderTest = reducer(undefined, Actions.getAuthStatus());

    const expected = {
      ...initialSate,
      authStatus: AuthStatus.NOT_AUTHENTICATED,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  //   jest
  //   .spyOn(cookieHelpersMock, 'getToken')
  // .mockReturnValue('accessTokenMocked');
});
