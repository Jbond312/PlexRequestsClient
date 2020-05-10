import * as Selectors from './usersSelectors';
import usersMock from '../mocks/usersList';
import userRolesMock from '../mocks/userRoles';

describe('Selectors > Users', () => {
  it('getUsers defaults to empty array', () => {
    const state = {
      usersList: {
        users: undefined,
      },
    };
    expect(Selectors.getUsers(state)).toEqual([]);
  });

  it('getUsers', () => {
    const state = {
      usersList: {
        users: usersMock,
      },
    };
    expect(Selectors.getUsers(state)).toEqual(usersMock);
  });

  it('getUserRoles defaults to empty array', () => {
    const state = {
      usersList: {
        userRoles: undefined,
      },
    };
    expect(Selectors.getUserRoles(state)).toEqual([]);
  });

  it('getUserRoles', () => {
    const state = {
      usersList: {
        userRoles: userRolesMock,
      },
    };
    expect(Selectors.getUserRoles(state)).toEqual(userRolesMock);
  });

  it('getIsLoading defaults to false', () => {
    const state = {
      usersList: {},
    };

    expect(Selectors.getIsLoading(state)).toEqual(false);
  });

  it('getIsLoading', () => {
    const state = {
      usersList: {
        loading: true,
      },
    };

    expect(Selectors.getIsLoading(state)).toEqual(true);
  });
});
