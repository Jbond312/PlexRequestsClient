import * as Selectors from './authSelectors';
import AuthStatus from '../../../enums/authStatus';

describe('Selectors > Login', () => {
  it('getAuthStatus defaults to NOT_AUTHENTICATED', () => {
    const state = {
      auth: {
        authStatus: undefined,
      },
    };
    expect(Selectors.getAuthStatus(state)).toEqual(
      AuthStatus.NOT_AUTHENTICATED,
    );
  });

  it('getAuthStatus returns correctly', () => {
    const state = {
      auth: {
        authStatus: AuthStatus.LOGGED_IN,
      },
    };
    expect(Selectors.getAuthStatus(state)).toEqual(AuthStatus.LOGGED_IN);
  });

  it('getIsLoggedIn defaults to false', () => {
    const state = {
      auth: {
        authStatus: undefined,
      },
    };
    expect(Selectors.getIsLoggedIn(state)).toEqual(false);
  });

  it('getIsLoggedIn returns correctly', () => {
    const state = {
      auth: {
        authStatus: AuthStatus.LOGGED_IN,
      },
    };
    expect(Selectors.getIsLoggedIn(state)).toEqual(true);
  });

  it('getIsNotAuthenticated defaults to false', () => {
    const state = {
      auth: {
        authStatus: undefined,
      },
    };
    expect(Selectors.getIsNotAuthenticated(state)).toEqual(true);
  });

  it('getIsNotAuthenticated returns correctly', () => {
    const state = {
      auth: {
        authStatus: AuthStatus.LOGGED_IN,
      },
    };
    expect(Selectors.getIsNotAuthenticated(state)).toEqual(false);
  });
});
