import * as Selectors from './loginSelectors';

describe('Selectors > Login', () => {
  it('getIsAuthenticated defaults to false', () => {
    const state = {
      auth: {
        isAuthenticated: undefined,
      },
    };
    expect(Selectors.getIsAuthenticated(state)).toEqual(false);
  });

  it('getIsAuthenticated returns correctly', () => {
    const state = {
      auth: {
        isAuthenticated: true,
      },
    };
    expect(Selectors.getIsAuthenticated(state)).toEqual(true);
  });

  it('getAccessToken defaults to undefined', () => {
    const state = {
      auth: {},
    };
    expect(Selectors.getAccessToken(state)).toEqual(undefined);
  });

  it('getAccessToken returns correctly', () => {
    const accessToken = 'ABC123';
    const state = {
      auth: { accessToken },
    };
    expect(Selectors.getAccessToken(state)).toEqual(accessToken);
  });

  it('getRefreshToken defaults to undefined', () => {
    const state = {
      auth: {},
    };
    expect(Selectors.getRefreshToken(state)).toEqual(undefined);
  });

  it('getRefreshToken returns correctly', () => {
    const refreshToken = 'ABC123';
    const state = {
      auth: { refreshToken },
    };
    expect(Selectors.getRefreshToken(state)).toEqual(refreshToken);
  });
});
