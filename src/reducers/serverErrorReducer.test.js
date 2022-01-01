import { actionTypes } from "../actions";
import serverErrorReducer from "./serverErrorReducer";

describe("serverErrorReducer", () => {
  test("should return default state", () => {
    const newState = serverErrorReducer(undefined, {});
    expect(newState).toBeNull();
  });

  test("should return error for `SERVER_ERROR` action", () => {
    const newState = serverErrorReducer(undefined, {
      type: actionTypes.SERVER_ERROR,
      payload: "server is not responding",
    });
    expect(newState).toBe("server is not responding");
  });
});
