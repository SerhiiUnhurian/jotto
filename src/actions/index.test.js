import moxios from 'moxios';
import { getSecretWord, correctGuess } from '.';
import { actionTypes } from './index';
import store from '../configureStore';

// TODO: remove
describe('correctGuess', () => {
  test('should return action with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
});

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should return secret word', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    // TODO: Update to test App in Redux / Context sections
    return store.dispatch(getSecretWord()).then(() => {
      const { secretWord } = store.getState();
      expect(secretWord).toBe('party');
    });
  });
});
