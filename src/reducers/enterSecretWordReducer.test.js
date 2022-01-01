import { actionTypes } from "../actions/index";
import enterSecretWordReducer from "./enterSecretWordReducer";

describe("enterSecretWordReducer", () => {
  test("should return default state", () => {
    const newState = enterSecretWordReducer(undefined, {});
    expect(newState).toBe(false);
  });

  test("should return previous state for unknown action", () => {
    const newState = enterSecretWordReducer(false, { type: "UNKNOWN" });
    expect(newState).toBe(false);
  });

  test("should return `true` for `ENTERING_SECRET_WORD` action", () => {
    const newState = enterSecretWordReducer(false, {
      type: actionTypes.ENTERING_SECRET_WORD,
      payload: true,
    });
    expect(newState).toBe(true);
  });

  test("should return `false` for `ENTERING_SECRET_WORD` action", () => {
    const newState = enterSecretWordReducer(true, {
      type: actionTypes.ENTERING_SECRET_WORD,
      payload: false,
    });
    expect(newState).toBe(false);
  });

  test("should return `false` for `RESET_GAME` action", () => {
    const newState = enterSecretWordReducer(true, {
      type: actionTypes.RESET_GAME,
    });
    expect(newState).toBe(false);
  });
});
