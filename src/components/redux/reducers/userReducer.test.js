import reducer from './userReducer';
import * as Actions from '../actions/userActions';
import usersMock from '../mocks/usersList';

let initialState;

describe('Reducers > UsersList', () => {
  beforeEach(() => {
    initialState = {
      users: [],
      loading: false,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USERS_REQUESTED', () => {
    const reducerUnderTest = reducer(undefined, Actions.getUsersRequested());

    const expected = {
      ...initialState,
      loading: true,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle GET_USERS_RECEIVED', () => {
    const reducerUnderTest = reducer(
      undefined,
      Actions.getUsersReceived(usersMock),
    );

    const expected = {
      ...initialState,
      users: usersMock,
      loading: false,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle GET_USERS_FAILED', () => {
    const reducerUnderTest = reducer(undefined, Actions.getUsersFailed());

    const expected = {
      ...initialState,
      loading: false,
    };

    expect(reducerUnderTest).toEqual(expected);
  });
});

describe('Reducers > UpdateUser', () => {
  beforeEach(() => {
    initialState = {
      users: [],
      loading: false,
    };
  });

  it('should handle UPDATE_USER_REQUESTED', () => {
    const updatedUser = { ...usersMock[0], isDisabled: true };
    const reducerUnderTest = reducer(
      { ...initialState, users: usersMock },
      Actions.updateUserRequested(updatedUser),
    );

    const expectedUsers = [updatedUser, ...usersMock.slice(1)];
    const expected = {
      ...initialState,
      users: expectedUsers,
    };
    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const reducerUnderTest = reducer(
      { ...initialState, users: usersMock },
      Actions.updateUserSuccess(usersMock),
    );

    const expected = {
      ...initialState,
      users: usersMock,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it('should handle UPDATE_USER_FAILED', () => {
    const invalidUserUpdated = { ...usersMock[0], isDisabled: true };
    const errors = 'ERROR';
    const reducerUnderTest = reducer(
      { ...initialState, users: usersMock },
      Actions.updateUserFailed({ errors, user: invalidUserUpdated }),
    );

    const expected = {
      ...initialState,
      users: usersMock,
    };

    expect(reducerUnderTest).toEqual(expected);
  });
});
