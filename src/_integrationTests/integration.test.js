import { storeFactory } from "../../test/testUtils";
import { guessWord, setSecretWord } from "../actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";

  describe("no words guessed", () => {
    let store;
    const initialState = { secretWord };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("should update state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }],
      };
      expect(newState).toEqual(expect.objectContaining(expectedState));
    });

    test("should update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
      };
      expect(newState).toEqual(expect.objectContaining(expectedState));
    });
  });

  describe("some words guessed", () => {
    let store;
    const guessedWords = [{ guessedWord: "run", letterMatchCount: 1 }];
    const initialState = {
      secretWord,
      guessedWords,
    };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("should update state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
        ],
      };
      expect(newState).toEqual(expect.objectContaining(expectedState));
    });

    test("should update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 },
        ],
      };
      expect(newState).toEqual(expect.objectContaining(expectedState));
    });
  });
});

describe("setSecretWord action dispatcher", () => {
  test("should update state correctly", () => {
    const initialState = {
      secretWord: "party",
      enterSecretWord: true,
    };
    const userSecretWord = "train";
    const store = storeFactory(initialState);

    store.dispatch(setSecretWord(userSecretWord));
    const newState = store.getState();
    // expect(newState.secretWord).toBe(userSecretWord);
    // expect(newState.enterSecretWord).toBe(false);
    expect(newState).toEqual(
      expect.objectContaining({
        secretWord: userSecretWord,
        enterSecretWord: false,
      })
    );
  });
});
