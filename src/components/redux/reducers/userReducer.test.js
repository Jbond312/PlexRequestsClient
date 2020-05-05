import reducer from "./userReducer";
import * as Actions from "../actions/userActions";
import usersMock from "../mocks/usersList";

let initialSate;

describe("Reducers > UsersList", () => {
  beforeEach(() => {
    initialSate = {
      users: [],
      loading: false,
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialSate);
  });

  it("should handle GET_USERS_REQUESTED", () => {
    const reducerUnderTest = reducer(undefined, Actions.getUsersRequested());

    const expected = {
      ...initialSate,
      loading: true,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it("should handle GET_USERS_RECEIVED", () => {
    const reducerUnderTest = reducer(
      undefined,
      Actions.getUsersReceived(usersMock)
    );

    const expected = {
      ...initialSate,
      users: usersMock,
      loading: false,
    };

    expect(reducerUnderTest).toEqual(expected);
  });

  it("should handle GET_USERS_FAILED", () => {
    const reducerUnderTest = reducer(undefined, Actions.getUsersFailed());

    const expected = {
      ...initialSate,
      loading: false,
    };

    expect(reducerUnderTest).toEqual(expected);
  });
});
