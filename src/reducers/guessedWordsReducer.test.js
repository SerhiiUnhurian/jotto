import { actionTypes } from "../actions";
import guessedWordsReducer from "./guessedWordsReducer";

describe("guessedWordsReducer", () => {
  test("should return default state", () => {
    const newState = guessedWordsReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  test("should return empty array for `RESET_GAME` action", () => {
    const initialState = [{ guessedWord: "train", letterMatchCount: 3 }];
    const newState = guessedWordsReducer(initialState, {
      type: actionTypes.RESET_GAME,
    });
    expect(newState).toEqual([]);
  });

  test("should add guessed word to array for `GUESS_WORD` action", () => {
    const initialState = [{ guessedWord: "train", letterMatchCount: 3 }];
    const guessedWord = "party";
    const newState = guessedWordsReducer(initialState, {
      type: actionTypes.GUESS_WORD,
      payload: guessedWord,
    });
    expect(newState).toEqual([...initialState, guessedWord]);
  });
});
