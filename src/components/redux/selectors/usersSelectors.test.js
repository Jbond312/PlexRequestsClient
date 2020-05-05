import * as Selectors from "./usersSelectors";
import usersMock from "../mocks/usersList";

describe("Selectors > Users", () => {
  it("getUsers defaults to empty array", () => {
    const state = {
      usersList: {
        users: undefined,
      },
    };
    expect(Selectors.getUsers(state)).toEqual([]);
  });

  it("getUsers", () => {
    const state = {
      usersList: {
        users: usersMock,
      },
    };
    expect(Selectors.getUsers(state)).toEqual(usersMock);
  });

  it("getIsLoading defaults to false", () => {
    const state = {
      usersList: {},
    };

    expect(Selectors.getIsLoading(state)).toEqual(false);
  });

  it("getIsLoading", () => {
    const state = {
      usersList: {
        loading: true,
      },
    };

    expect(Selectors.getIsLoading(state)).toEqual(true);
  });
});
