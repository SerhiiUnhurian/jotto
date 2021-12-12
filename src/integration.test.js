import { storeFactory } from '../test/testUtils';
import { guessWord, setSecretWord } from './actions';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no words guessed', () => {
    let store;
    const initialState = { secretWord, gaveUp: false, enterSecretWord: false };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('should update state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 }],
      };
      expect(newState).toEqual(expectedState);
    });

    test('should update state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('some words guessed', () => {
    let store;
    const guessedWords = [{ guessedWord: 'run', letterMatchCount: 1 }];
    const initialState = {
      secretWord,
      guessedWords,
      gaveUp: false,
      enterSecretWord: false,
    };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('should update state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });

    test('should update state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});

// describe('setSecretWord action dispatcher', () => {
//   let store;
//   const userSecretWord = 'train';
//   const initialState = { secretWord: 'party', enterSecretWord: true };
//   let newState;

//   beforeEach(() => {
//     store = storeFactory(initialState);
//     store.dispatch(setSecretWord(userSecretWord));
//     newState = store.getState();
//   });

//   test('should update `secretWord` state correctly', () => {
//     expect(newState.secretWord).toBe(userSecretWord);
//   });

//   test('should update `enterSecretWord` state correctly', () => {
//     expect(newState.enterSecretWord).toBe(false);
//   });
// });

describe('setSecretWord action dispatcher', () => {
  test('should update state correctly', () => {
    const initialState = {
      secretWord: 'party',
      enterSecretWord: true,
      gaveUp: false,
      guessedWords: [],
      success: false,
    };
    const userSecretWord = 'train';
    const store = storeFactory(initialState);

    store.dispatch(setSecretWord(userSecretWord));
    const newState = store.getState();
    // expect(newState.secretWord).toBe(userSecretWord);
    // expect(newState.enterSecretWord).toBe(false);
    expect(newState).toEqual({
      ...initialState,
      secretWord: userSecretWord,
      enterSecretWord: false,
    });
  });
});
