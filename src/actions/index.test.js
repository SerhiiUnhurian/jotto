import moxios from "moxios";
import { getSecretWord, correctGuess } from ".";
import { actionTypes } from "./index";
import { storeFactory } from "../../test/testUtils";

// TODO: remove
describe("correctGuess", () => {
  test("should return action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
});

describe("getSecretWord", () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = storeFactory();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("should set secret word", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const { secretWord } = store.getState();
      expect(secretWord).toBe("party");
    });
  });

  test("should set server error when server returns 4xx status", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const { serverError } = store.getState();
      expect(serverError).toBeTruthy();
    });
  });

  test("should set server error when server returns 5xx status", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const { serverError } = store.getState();
      expect(serverError).toBeTruthy();
    });
  });
});
